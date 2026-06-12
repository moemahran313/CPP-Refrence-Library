import * as https from 'https';

https.get('https://www.youtube.com/playlist?list=PLB_OssZ9SA7K4wKxpZYvGEA4KlGF7RA_5', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const regex = /"videoId":"([\w-]+)"/g;
    let matches;
    const ids = [];
    while ((matches = regex.exec(body)) !== null) {
      if(!ids.includes(matches[1])) ids.push(matches[1]);
    }
    console.log(JSON.stringify(ids));
  });
});
