import { FastifyRequest } from 'fastify';

export type BaseFastifyRequest = FastifyRequest<{
  Body: { [key: string]: any };
  Querystring: { [key: string]: any };
  Params: { [key: string]: any };
  Headers: { [key: string]: any };
}>;
