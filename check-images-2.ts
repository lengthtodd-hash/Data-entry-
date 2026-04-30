import fs from 'fs';

const urls = [
  "https://images.unsplash.com/photo-1511512578047-dfb367046420",
  "https://images.unsplash.com/photo-1494412519320-ce1eeb50c937",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1628108488736-4c4dc2a78128", 
  "https://images.unsplash.com/photo-1506459225024-1428097a7e18",
  "https://images.unsplash.com/photo-1512626120412-faf41adb4874",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
];

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(url, res.status);
    } catch(e: any) {
      console.log(url, e.message);
    }
  }
}

check();
