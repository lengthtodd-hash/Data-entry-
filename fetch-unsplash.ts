import fs from 'fs';

async function fetchIds() {
  const rs = await fetch('https://unsplash.com/napi/search/photos?query=logistics');
  const json = await rs.json();
  const ids = json.results.map((r: any) => r.id);
  console.log(ids);
}
fetchIds();
