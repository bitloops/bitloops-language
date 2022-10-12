import FastifyServer, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import formBodyPlugin from '@fastify/formbody';
import fastifyCors from '@fastify/cors';
import { BaseFastifyController } from './models/BaseFastifyController';

namespace Fastify {
  export type Instance = FastifyInstance;
  export type Reply = FastifyReply;
  export type Request = FastifyRequest;
  export const Server = FastifyServer;

  export const BaseController = BaseFastifyController;
  export const formBody = formBodyPlugin;
  export const cors = fastifyCors;
}

export { Fastify };
