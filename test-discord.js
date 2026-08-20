import dotenv from 'dotenv';
dotenv.config();

export default async function test() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const payload = {
    username: "Job Application Bot",
    embeds: [
      {
        title: "Test Application",
        color: 0x064e3b,
      }
    ]
  };

  const formData = new FormData();
  formData.append("payload_json", JSON.stringify(payload));

  const blob = new Blob(["dummy pdf content"], { type: "application/pdf" });
  formData.append("file[0]", blob, "resume.pdf");

  const res = await fetch(webhookUrl, {
    method: "POST",
    body: formData
  });

  console.log("Status:", res.status);
  console.log("Body:", await res.text());
}
test();
