'use strict';

const { TRANSPORT, STATIC_PORT, API, ...CONFIG} = require('./config');

const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require(`./transport/${TRANSPORT}.js`);
const staticServer = require('./static.js');
const load = require('./load.js')(CONFIG.SANDBOX);
const db = require('./db.js')(CONFIG.DB);
const hash = require('./hash.js')(CONFIG.CRYPTO);
const logger = require('./logger.js')(CONFIG.LOGGER);

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};
const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  const API_ORIGIN = `${TRANSPORT}://${API.HOST}:${API.PORT}`;
  staticServer('./static', STATIC_PORT, API_ORIGIN, logger);
  server(routing, API.PORT, logger);
})();
