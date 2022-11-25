import FastifyServer, { FastifyInstance, FastifyReply } from 'fastify';
import formBodyPlugin from '@fastify/formbody';
import fastifyCors from '@fastify/cors';
import { BaseFastifyController } from './models/BaseFastifyController';
import { BaseFastifyRequest } from './models/BaseFastifyRequest';

namespace Fastify {
  export type Instance = FastifyInstance;
  export type Reply = FastifyReply;
  export type Request = BaseFastifyRequest;
  export const Server = FastifyServer;

  export const BaseController = BaseFastifyController;
  export const formBody = formBodyPlugin;
  export const cors = fastifyCors;
}

export { Fastify };
