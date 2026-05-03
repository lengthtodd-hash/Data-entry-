const https = require('https');
https.get('https://postimg.cc/yDcVybRk', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.postimg\.cc\/[^\"]+/);
    console.log("LINK:", match ? match[0] : 'Not found');
  });
});
