'use strict';

const crypto = require('node:crypto');

const hash = (options) => (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(options.saltSize).toString('base64');
  crypto.scrypt(password, salt, options.hashSize, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString('base64'));
  });
});

module.exports = hash;
