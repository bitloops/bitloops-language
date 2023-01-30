import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { routers } from './api';

const corsOptions = {
  origin: '*',
};

const fastify = Fastify.Server({
  logger: true,
});
fastify.register(Fastify.cors, corsOptions);
fastify.register(Fastify.formBody);
fastify.register(routers, {
  prefix: '/api',
});

const port = process.env.env.FASTIFY_PORT || 5001;

const start = async () => {
  try {
    await fastify.listen({ port: +port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
