import fs from 'fs';

async function searchWiki(query: string) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=images&titles=${query}&gimlimit=20&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data.query.pages;
  for (const key in pages) {
    if (pages[key].imageinfo && pages[key].imageinfo[0].url) {
      console.log(pages[key].title, pages[key].imageinfo[0].url);
    }
  }
}
searchWiki('Freight_transport');
searchWiki('Semi-trailer_truck');
