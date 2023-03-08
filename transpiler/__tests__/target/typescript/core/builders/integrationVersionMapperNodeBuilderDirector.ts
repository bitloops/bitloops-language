import { StringLiteralBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { IntegrationVersionMapperNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationVersionMapperNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { StructIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Struct/StructIdentifierNodeBuilder.js';
import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { IntegrationVersionMapperNode } from '../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationVersionMapperNode.js';
import { ExpressionBuilderDirector } from './expression.js';
import { ConstDeclarationBuilderDirector } from './statement/constDeclaration.js';
import { ReturnStatementBuilderDirector } from './statement/returnDirector.js';

export class IntegrationVersionMapperNodeBuilderDirector {
  private builder: IntegrationVersionMapperNodeBuilder;

  constructor() {
    this.builder = new IntegrationVersionMapperNodeBuilder(null);
  }

  public buildWithReturnStructEvaluationStatement({
    versionName,
    schemaType,
    constIdentifier,
    evaluationFieldNodes,
  }: {
    versionName: string;
    schemaType: string;
    constIdentifier: string;
    evaluationFieldNodes: EvaluationFieldNode[];
  }): IntegrationVersionMapperNode {
    const constDeclarationStatement =
      new ConstDeclarationBuilderDirector().buildStructEvaluationConstDeclaration(
        constIdentifier,
        schemaType,
        evaluationFieldNodes,
      );
    const returnStatement = new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildIdentifierExpression(constIdentifier),
    );
    const statementListNode = new StatementListNodeBuilder()
      .withStatements([constDeclarationStatement, returnStatement])
      .build();

    return this.builder
      .withVersionName(new StringLiteralBuilder().withValue(versionName).build())
      .withReturnSchemaType(new StructIdentifierNodeBuilder().withName(schemaType).build())
      .withStatements(statementListNode)
      .build();
  }
}
