const getFilesCollection = require('../utils/getFilesCollection');
const currentDir = process.cwd();

module.exports = async ({ NAME, ...options }) => {
  if (NAME === 'native') return console;

  const loggers = await getFilesCollection(currentDir, './logger');
  const loggerPath = loggers[NAME];
  if (!loggerPath) {
    console.error(`Logger ${NAME} not found`);
    return console;
  }

  return require(loggerPath)(options);
};
