module.exports = {
  transport: 'ws', // 'http' or 'ws'
  framework: 'fastify', // 'native' or 'fastify'
  staticPort: 8000,
  apiPort: 8001,
  crypto: {
    saltSize: 16,
    hashSize: 64,
  },
  sandbox: {
    timeout: 5000,
    displayErrors: true,
  },
  logger: {
    logsPath: './log',
  },
  db: {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  },
};
