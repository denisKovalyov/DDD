'use strict';

const http = require('node:http');

const NOT_FOUND = 'Not found';
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'text/plain',
};

const setHeaders = (res) => {
  for (const header of Object.keys(headers)) res.setHeader(header, headers[header]);
  return res;
};

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

module.exports = (routing, port, console) => {
  http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers).end();
      return;
    }

    setHeaders(res);
    const { url, socket } = req;
    const [name, method, id] = url.substring(1).split('/');
    const entity = routing[name];
    if (!entity) return res.end(NOT_FOUND);
    const handler = entity[method];
    if (!handler) return res.end(NOT_FOUND);
    const src = handler.toString();
    const signature = src.substring(0, src.indexOf(')'));
    const args = [];
    if (signature.includes('(id')) args.push(id);
    if (signature.includes('{')) args.push(await receiveArgs(req));
    console.log(`${socket.remoteAddress} ${method} ${url} ${args}`);
    const result = await handler(...args);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.end(JSON.stringify(result));
  }).listen(port);

  console.log(`API on port ${port}`);
};
