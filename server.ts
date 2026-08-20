import express from "express";
import path from "path";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Use memory storage for multer since we just want to forward the file to Discord
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing for other potential API routes
  app.use(express.json());

  function logToFile(msg: string) {
    fs.appendFileSync("server-debug.log", new Date().toISOString() + " - " + msg + "\n");
  }

  // API Route for Job Applications
  app.post("/api/apply", upload.single("attachment"), async (req, res) => {
    try {
      logToFile("Received application request.");
      console.log("Received application request.");
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (!webhookUrl) {
        logToFile("Missing webhook URL");
        console.error("Missing webhook URL");
        return res.status(500).json({ error: "Discord webhook URL is not configured." });
      }

      logToFile("Body: " + JSON.stringify(req.body));
      logToFile("File: " + (req.file ? req.file.originalname : "No file"));
      console.log("Body:", req.body);
      console.log("File:", req.file ? req.file.originalname : "No file");

      const { name, email, phone, state, zipcode, role } = req.body;
      const file = req.file;

      if (!file) {
        logToFile("No CV/Resume provided.");
        console.error("No CV/Resume provided.");
        return res.status(400).json({ error: "No CV/Resume provided." });
      }

      // Build Discord Embed
      const payload = {
        username: "Job Application Bot",
        embeds: [
          {
            title: "New Job Application Received",
            color: 0x064e3b, // Brand green
            fields: [
              { name: "Name", value: name || "N/A", inline: true },
              { name: "Email", value: email || "N/A", inline: true },
              { name: "Phone", value: phone || "N/A", inline: true },
              { name: "Role", value: role || "N/A", inline: false },
              { name: "State", value: state || "N/A", inline: true },
              { name: "Zip Code", value: zipcode || "N/A", inline: true },
            ],
            footer: {
              text: "Airva Green Logistics Application System",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      };

      // Create FormData to send to Discord
      const formData = new FormData();
      formData.append("payload_json", JSON.stringify(payload));

      // Append the file using Blob
      const blob = new Blob([file.buffer], { type: file.mimetype });
      formData.append("file[0]", blob, file.originalname);

      logToFile("Sending to Discord...");
      console.log("Sending to Discord...");
      // Send to Discord
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        logToFile("Discord Error: " + errorText);
        console.error("Discord Error:", errorText);
        return res.status(500).json({ error: "Discord rejected the application: " + errorText });
      }

      logToFile("Successfully sent to Discord.");
      console.log("Successfully sent to Discord.");
      res.status(200).json({ success: true });
    } catch (error: any) {
      logToFile("Application Error: " + error.message);
      console.error("Application Error:", error);
      res.status(500).json({ error: "Server Error: " + error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
