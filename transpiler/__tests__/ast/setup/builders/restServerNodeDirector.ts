import { RestServerNodeBuilder } from '../../../../src/ast/setup/intermediate-ast/builders/RestServerNodeBuilder.js';

export class RestServerNodeDirector {
  private builder: RestServerNodeBuilder;
  constructor() {
    this.builder = new RestServerNodeBuilder();
  }
  buildRestServer(): void {
    return;
  }
}
