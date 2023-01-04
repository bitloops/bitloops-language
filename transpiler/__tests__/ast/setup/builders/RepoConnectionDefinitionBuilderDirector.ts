import { TExpression, TIdentifier, TRepoConnectionDefinition } from '../../../../src/types.js';
import { ExpressionBuilderDirector } from '../../core/builders/expressionDirector.js';
import { RepoConnectionDefinitionBuilder } from './RepoConnectionDefinitionBuilder.js';

export class RepoConnectionDefinitionBuilderDirector {
  private builder: RepoConnectionDefinitionBuilder;

  constructor() {
    this.builder = new RepoConnectionDefinitionBuilder();
  }

  buildMongoRepoConnectionDefinition({
    connectionIdentifier,
    host,
    port,
    databaseName,
  }: {
    connectionIdentifier: TIdentifier;
    host: string;
    port: number;
    databaseName: string;
  }): TRepoConnectionDefinition {
    return this.builder
      .withIdentifier(connectionIdentifier)
      .withDbType('DB.Mongo')
      .withOptions({
        options: {
          host: new ExpressionBuilderDirector().buildStringLiteralExpression(host),
          port: new ExpressionBuilderDirector().buildInt32LiteralExpression(port),
          databaseName: new ExpressionBuilderDirector().buildStringLiteralExpression(databaseName),
        },
      })
      .build();
  }

  buildCustomMongoRepoConnectionDefinition({
    connectionIdentifier,
    host,
    port,
    databaseName,
  }: {
    connectionIdentifier: TIdentifier;
    host: TExpression;
    port: TExpression;
    databaseName: TExpression;
  }): TRepoConnectionDefinition {
    return this.builder
      .withIdentifier(connectionIdentifier)
      .withDbType('DB.Mongo')
      .withOptions({
        options: {
          host,
          port,
          databaseName,
        },
      })
      .build();
  }
}
