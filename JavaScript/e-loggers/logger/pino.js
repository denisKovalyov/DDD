const path = require('node:path');
const fs = require('node:fs');
const util = require('node:util');
const pino = require('pino');
const pretty = require('pino-pretty');

const levels = {
  debug: 10,
  log: 20,
  dir: 30,
  error: 50,
  system: 60,
  access: 70,
};

module.exports = ({ LOGS_PATH, LOGS_LEVEL }) => {
  const date = new Date().toISOString().substring(0, 10);
  const filePath = path.join(LOGS_PATH, `${date}.log`);

  if (!fs.existsSync(LOGS_PATH)){
    fs.mkdirSync(LOGS_PATH);
  };

  const streams = [
    { stream: pretty(), level: 'debug' },
    { stream: fs.createWriteStream(filePath, { flags: 'a' }), level: 'debug' },
  ];

  return pino({
    level: LOGS_LEVEL || 'debug',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label === 'log' ? 'info' : label };
      },
    },
    hooks: {
      logMethod (args, method) {
        const message = util.format(...args);
        return method.call(this, message);
      },
    }},
    pino.multistream(streams, { levels }),
  );
};
