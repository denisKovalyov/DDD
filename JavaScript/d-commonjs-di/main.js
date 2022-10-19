'use strict';

const { framework, transport, staticPort, apiPort, ...config } = require('./config');
const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require(framework === 'native' ? `./transport/${transport}.js` : `./${framework}.js`);
const staticServer = require('./static.js');
const db = require('./db.js')(config.db);
const hash = require('./hash.js')(config.crypto);
const logger = require('./logger.js')(config.logger);

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
    routing[serviceName] = require(filePath)(sandbox);
  }

  staticServer('./static', staticPort, logger);
  server(routing, apiPort, logger);
})();
