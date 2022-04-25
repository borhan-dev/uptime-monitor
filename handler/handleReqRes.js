const url = require('url');
const routes = require('../routes');
const notFound = require('../controller/notFound');
const { StringDecoder } = require('string_decoder');

const handler = {};

const decoder = new StringDecoder('utf-8');

handler.handleReqRes = (req, res) => {
  const parsedPath = url.parse(req.url, true);

  const path = parsedPath.pathname.replace(/^\/+|\/+$/g, '');
  const query = parsedPath.query;
  const method = req.method.toLowerCase();
  const headers = req.headers;

  const requestProperties = { path, method, query, headers };

  const choosenHandler = routes[path] ? routes[path] : notFound;

  let data = '';

  req.on('data', buffer => {
    data += decoder.write(buffer);
  });

  req.on('end', () => {
    data += decoder.end();

    requestProperties['body'] = JSON.parse(data);
      choosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      payload = JSON.stringify(payload);
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payload);
    });
  });
};

module.exports = handler;
