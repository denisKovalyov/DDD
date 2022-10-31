const getFilesCollection = require('./utils/getFilesCollection');

const currentDir = process.cwd();

module.exports = async ({ framework, transport, routing, port, console }) => {
  if (framework !== 'native') {
    const frameworks = await getFilesCollection(currentDir, './framework');
    const frameworkPath = frameworks[framework];
    if (!frameworkPath) {
      console.error(`Framework ${framework} not found`);
    } else {
      require(frameworkPath)(routing, port, console);
      return;
    }
  }

  const transports = await getFilesCollection(currentDir, './transport');
  const transportPath = transports[transport];
  if (!transportPath) {
    console.error(`Transport ${transport} not found`);
    process.exit(1);
  }
  require(transportPath)(routing, port, console);
};
