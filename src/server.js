const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const handlePost = (request, response, reqUrl) => {
  if (reqUrl === '/addUser') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUsers(request, response, bodyParams);
    });
  }
};

const handleGet = (request, response, reqUrl) => {
  switch (reqUrl) {
    case '/':
      htmlHandler.getClient(request, response);
      break;
    case '/style.css':
      htmlHandler.getStyle(request, response);
      break;
    case '/getUsers':
      jsonHandler.getUsers(request, response, false);
      break;
    case '/notReal':
      jsonHandler.notReal(request, response, false);
      break;
    default:
      jsonHandler.notReal(request, response, false);
      break;
  }
};

const handleHead = (request, response, reqUrl) => {
  switch (reqUrl) {
    case '/getUsers':
      jsonHandler.getUsers(request, response, true);
      break;
    case '/notReal':
      jsonHandler.notReal(request, response, true);
      break;
    default:
      jsonHandler.notReal(request, response, false);
      break;
  }
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'POST':
      handlePost(request, response, parsedUrl.pathname);
      break;
    case 'GET':
      handleGet(request, response, parsedUrl.pathname);
      break;
    case 'HEAD':
      handleHead(request, response, parsedUrl.pathname);
      break;
    default:
      break;
  }
};

http.createServer(onRequest).listen(port);
