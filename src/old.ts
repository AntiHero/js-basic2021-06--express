import http from 'http';
import fs from 'fs';

const homePage = fs.readFileSync('./public/index.html');
const image = fs.readFileSync('./public/images/tom-and-jerry-dancing.gif');
const styles = fs.readFileSync('./public/style.css');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homePage);
  } else if (req.url === '/images/tom-and-jerry-dancing.gif') {
    res.writeHead(200, {
      'content-type': 'image/gif',
    });
    res.write(image);
  } else if (req.url === '/style.css') {
    res.write(styles);
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
