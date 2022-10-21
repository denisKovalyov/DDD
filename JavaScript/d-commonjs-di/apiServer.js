const fsp = require('node:fs').promises;
const path = require('node:path');

const currentDir = process.cwd();

const getFilesCollection = async (dirPath) => {
  const absolutePath = path.join(currentDir, dirPath);
  const files = await fsp.readdir(absolutePath);
  return files.reduce((acc, fileName) => ({
    ...acc,
    [path.basename(fileName, '.js')]: path.join(absolutePath, fileName),
  }), {});
};

module.exports = async ({ framework, transport, routing, port, console }) => {
  if (framework !== 'native') {
    const frameworks = await getFilesCollection('./framework');
    const frameworkPath = frameworks[framework];
    if (!frameworkPath) {
      console.error('Framework not found');
    } else {
      require(frameworkPath)(routing, port, console);
      return;
    }
  };

  const transports = await getFilesCollection('./transport');
  const transportPath = transports[transport];
  if (!transportPath) {
    console.error('Transport not found');
    return;
  }
  require(transportPath)(routing, port, console);
};
