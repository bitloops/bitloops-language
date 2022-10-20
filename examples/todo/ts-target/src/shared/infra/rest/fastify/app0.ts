/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
// import formBodyPlugin from '@fastify/formbody';
// import fastifyCors from '@fastify/cors';
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

const port = process.env.FASTIFY_PORT || 5001;

const start = async () => {
  try {
    await fastify.listen({ port: +port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
