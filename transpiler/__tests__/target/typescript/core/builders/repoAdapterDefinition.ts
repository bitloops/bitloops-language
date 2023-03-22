import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { RepoAdapterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/RepoAdapterNodeBuilder.js';
import { BoundedContextModuleNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/BoundedContextModuleNodeBuilder.js';
import { BoundedContextNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/BoundedContextNameNodeBuilder.js';
import { ModuleNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/ModuleNameNodeBuilder.js';
import { ConcretedRepoPortNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/repo/ConcretedRepoPortNodeBuilder.js';
import { DatabaseTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/repo/DatabaseTypeNodeBuilder.js';
import { RepoAdapterExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/repo/RepoAdapterExpressionNodeBuilder.js';
import { RepoAdapterOptionsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/repo/RepoAdapterOptionsNodeBuilder.js';
import { RepoConnectionExpressionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/repo/RepoConnectionExpressionNodeBuilder.js';
import { RepoConnectionOptionsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/repo/RepoConnectionOptionsNodeBuilder.js';
import { WordsWithSpacesNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/WordsWithSpacesNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { RepoAdapterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RepoAdapterNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { RepoAdapterExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/setup/repo/RepoAdapterExpressionNode.js';
import { TRepoSupportedTypes } from '../../../../../src/types.js';

export class RepoAdapterDefinitionDirector {
  private builder: RepoAdapterNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new RepoAdapterNodeBuilder(tree);
  }

  buildRepoAdapterDefinition({
    identifier,
    bcModule,
    connection,
    collection,
    connectionInfo,
    dbType,
    concretedRepoPort,
  }: {
    identifier: string;
    bcModule: {
      boundedContextName: string;
      moduleName: string;
    };
    connection: {
      name: string;
      expression: ExpressionNode;
    };
    collection: {
      name: string;
      expression: ExpressionNode;
    };
    connectionInfo: {
      database: ExpressionNode;
      host: ExpressionNode;
      port: ExpressionNode;
    };
    dbType: TRepoSupportedTypes;
    concretedRepoPort: string;
  }): RepoAdapterNode {
    const identifierNode: IdentifierNode = new IdentifierNodeBuilder().withName(identifier).build();
    const expressionNode: RepoAdapterExpressionNode = new RepoAdapterExpressionNodeBuilder()
      .withBoundedContextModule(
        new BoundedContextModuleNodeBuilder()
          .withBoundedContext(
            new BoundedContextNameNodeBuilder()
              .withName(
                new WordsWithSpacesNodeBuilder().withName(bcModule.boundedContextName).build(),
              )
              .build(),
          )
          .withModule(
            new ModuleNameNodeBuilder()
              .withName(new WordsWithSpacesNodeBuilder().withName(bcModule.moduleName).build())
              .build(),
          )
          .build(),
      )
      .withOptions(
        new RepoAdapterOptionsNodeBuilder()
          .withFields(
            new EvaluationFieldListNodeBuilder()
              .withEvaluationFields([
                new EvaluationFieldNodeBuilder()
                  .withIdentifier(new IdentifierNodeBuilder().withName(connection.name).build())
                  .withExpression(connection.expression)
                  .build(),
                new EvaluationFieldNodeBuilder()
                  .withIdentifier(new IdentifierNodeBuilder().withName(collection.name).build())
                  .withExpression(collection.expression)
                  .build(),
              ])
              .build(),
          )
          .build(),
      )
      .withDatabaseType(new DatabaseTypeNodeBuilder().withValue(dbType).build())
      .withConcretedRepoPort(
        new ConcretedRepoPortNodeBuilder().withRepoPortIdentifier(concretedRepoPort).build(),
      )
      .withConnection(
        new RepoConnectionExpressionNodeBuilder()
          .withDbType(new DatabaseTypeNodeBuilder().withValue('DB.Mongo').build())
          .withRepoConnectionOptions(
            new RepoConnectionOptionsNodeBuilder()
              .withFields(
                new EvaluationFieldListNodeBuilder()
                  .withEvaluationFields([
                    new EvaluationFieldNodeBuilder()
                      .withIdentifier(new IdentifierNodeBuilder().withName('host').build())
                      .withExpression(connectionInfo.host)
                      .build(),
                    new EvaluationFieldNodeBuilder()
                      .withIdentifier(new IdentifierNodeBuilder().withName('port').build())
                      .withExpression(connectionInfo.port)
                      .build(),
                    new EvaluationFieldNodeBuilder()
                      .withIdentifier(new IdentifierNodeBuilder().withName('database').build())
                      .withExpression(connectionInfo.database)
                      .build(),
                  ])
                  .build(),
              )
              .build(),
          )
          .build(),
      )
      .build();
    return this.builder.withIdentifier(identifierNode).withExpression(expressionNode).build();
  }
}
