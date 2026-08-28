const http = require('http');
const fs = require('fs');
const path = require('path');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

http.createServer((request, response) => {
  let requestPath = decodeURIComponent(request.url.split('?')[0]);
  if (requestPath === '/') requestPath = '/index.html';

  const filePath = path.join(__dirname, requestPath);
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
    });
    response.end(data);
  });
}).listen(8000, '127.0.0.1', () => {
  console.log('http://127.0.0.1:8000');
});
