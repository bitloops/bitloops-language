import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';

export class HealthRESTController extends Fastify.BaseController {
  constructor() {
    super();
  }
  async executeImpl(_request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    this.ok(response);
  }
}
