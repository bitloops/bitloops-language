import FastifyServer, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import formBodyPlugin from '@fastify/formbody';
import fastifyCors from '@fastify/cors';

namespace Fastify {
  export type Instance = FastifyInstance;
  export type Reply = FastifyReply;
  export type Request = FastifyRequest;

  export const formBody = formBodyPlugin;
  export const cors = fastifyCors;
}

export { Fastify, FastifyServer };
