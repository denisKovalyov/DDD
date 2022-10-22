'use strict';

const { FRAMEWORK, TRANSPORT, STATIC_PORT, API, LOGGER, ...CONFIG } = require('./config');

const fsp = require('node:fs').promises;
const path = require('node:path');
const apiServer = require('./apiServer');
const staticServer = require('./static.js');
const load = require('./load.js')(CONFIG.SANDBOX);
const db = require('./db.js')(CONFIG.DB);
const hash = require('./hash.js')(CONFIG.CRYPTO);
const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const logger = await require('./logger/index.js')(LOGGER);

  const sandbox = {
    console: Object.freeze(logger),
    db: Object.freeze(db),
    common: { hash },
  };

  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, sandbox);
  }

  const API_ORIGIN = `${TRANSPORT}://${API.HOST}:${API.PORT}`;
  staticServer('./static', STATIC_PORT, API_ORIGIN, logger);
  apiServer({
    framework: FRAMEWORK,
    transport: TRANSPORT,
    routing,
    port: API.PORT,
    console: logger,
  });
})();
