module.exports = {
  TRANSPORT: 'http', // 'http' or 'ws'
  FRAMEWORK: 'fastify', // 'native' or 'fastify'
  STATIC_PORT: 8000,
  API: {
    PORT: 8001,
    HOST: '127.0.0.1',
  },
  CRYPTO: {
    SALT_SIZE: 16,
    HASH_SIZE: 64,
  },
  SANDBOX: {
    TIMEOUT: 5000,
    DISPLAY_ERRORS: true,
  },
  LOGGER: {
    NAME: 'pino', // 'native', 'logger' or 'pino'
    LOGS_PATH: './log',
    LOGS_LEVEL: 'debug',
  },
  DB: {
    HOST: '127.0.0.1',
    PORT: 5432,
    DATABASE: 'example',
    USER: 'marcus',
    PASSWORD: 'marcus',
  },
};
