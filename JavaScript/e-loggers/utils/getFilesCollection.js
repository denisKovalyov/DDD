const path = require('node:path');
const fsp = require('node:fs').promises;

module.exports = async (currentDir, targetDir) => {
  const absolutePath = path.join(currentDir, targetDir);
  const files = await fsp.readdir(absolutePath);
  return files.reduce((acc, fileName) => ({
    ...acc,
    [path.basename(fileName, '.js')]: path.join(absolutePath, fileName),
  }), {});
};
