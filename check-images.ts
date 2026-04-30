import fs from 'fs';

const urls = [
  "https://images.unsplash.com/photo-1586864387722-1327429188d3",
  "https://images.unsplash.com/photo-1506526610738-95e2634d3d3a",
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866",
  "https://images.unsplash.com/photo-1519003722824-192d99a24bb1",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  "https://images.unsplash.com/photo-1616496660600-f9cc18c15ec4",
  "https://images.unsplash.com/photo-1580674684081-7617fbf3d745",
  "https://images.unsplash.com/photo-1502444330542-dba28d133dff"
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
