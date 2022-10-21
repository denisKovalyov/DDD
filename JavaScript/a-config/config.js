module.exports = {
  TRANSPORT: 'ws', // 'http' or 'ws'
  STATIC_PORT: 8000,
  API_PORT: 8001,
  CRYPTO: {
    SALT_SIZE: 16,
    HASH_SIZE: 64,
  },
  SANDBOX: {
    TIMEOUT: 5000,
    DISPLAY_ERRORS: true,
  },
  LOGGER: {
    LOGS_PATH: './log',
  },
  DB: {
    HOST: '127.0.0.1',
    PORT: 5432,
    DATABASE: 'example',
    USER: 'marcus',
    PASSWORD: 'marcus',
  },
};
