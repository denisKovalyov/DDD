'use strict';

const fastify = require('fastify')({ logger: false });
const cors = require('@fastify/cors');

const configureCORS = async () => {
  await fastify.register(cors, {});
};

const adapter = (routing, console) => {
  const services = Object.keys(routing);
  for (let serviceName of services) {
    const service = routing[serviceName];
    const methods = Object.keys(service);

    for (const methodName of methods) {
      const handler = routing[serviceName][methodName];
      const src = handler.toString();
      const signature = src.substring(0, src.indexOf(')'));
      const hasId = signature.includes('(id');
      const route = `/${serviceName}/${methodName}` + (hasId  ? '*' : '');

      console.log('route', route);

      fastify.route({
        url: route,
        method: 'POST',
        prefixTrailingSlash: 'both',
        handler: async (req, reply) => {
          const args = [];
          if (hasId) args.push(req.params['*'].slice(1));
          if (signature.includes('{')) args.push(req.body);
          const result = await handler(...args);
          return result;
        },
      });
    }
  };
};

module.exports = async (routing, port, console) => {
  await configureCORS();
  adapter(routing, console);

  try {
    await fastify.listen({ port });
    console.log(`API on port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
