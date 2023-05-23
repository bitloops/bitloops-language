import { AnonymousFunctionNode } from '../nodes/AnonymousFunctionNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { AnonymousFunctionNodeBuilder } from '../builders/AnonymousFunctionNodeBuilder.js';
import { ArrowFunctionBodyNodeBuilder } from '../builders/ArrowFunctionBodyNodeBuilder.js';
import { ParameterListNodeBuilderDirector } from './parameterListNodeBuilderDirector.js';
import { ExpressionBuilderDirector } from './expressionNodeBuilderDirector.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { StatementListNodeBuilder } from '../builders/statements/StatementListNodeBuilder.js';

export class AnonymousFunctionNodeBuilderDirector {
  private builder: AnonymousFunctionNodeBuilder;
  private metadata: TNodeMetadata;

  constructor(metadata?: TNodeMetadata) {
    this.builder = new AnonymousFunctionNodeBuilder();
    this.metadata = metadata;
  }

  buildAnonymousFunctionNodeWithReturnStatement(
    parameters: ParameterListNode,
    returnStatementNode: ReturnStatementNode,
  ): AnonymousFunctionNode {
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder(this.metadata)
      .withBody(returnStatementNode)
      .build();
    return this.builder.withParameters(parameters).withArrowFunctionBody(arrowFunctionBody).build();
  }

  buildAnonymousFunctionNodeWithStatementList(
    parameters: ParameterListNode,
    statementNode: StatementListNode,
  ): AnonymousFunctionNode {
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder(this.metadata)
      .withBody(statementNode)
      .build();
    return this.builder.withParameters(parameters).withArrowFunctionBody(arrowFunctionBody).build();
  }

  buildIfErrorDefaultAnonymousFunction(): AnonymousFunctionNode {
    const errorParameterName = 'error';
    const parameters = new ParameterListNodeBuilderDirector(this.metadata).buildParamWithoutType(
      errorParameterName,
    );
    const returnErrorStatement = new ReturnErrorStatementNodeBuilder(this.metadata)
      .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression(errorParameterName))
      .build();
    const statementList = new StatementListNodeBuilder()
      .withStatements([returnErrorStatement])
      .build();
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder(this.metadata)
      .withBody(statementList)
      .build();
    return this.builder.withArrowFunctionBody(arrowFunctionBody).withParameters(parameters).build();
  }

  buildIfErrorExpressionAnonymousFunction(expression: ExpressionNode): AnonymousFunctionNode {
    const errorParameterName = 'error';
    const parameters = new ParameterListNodeBuilderDirector(this.metadata).buildParamWithoutType(
      errorParameterName,
    );
    const returnErrorStatement = new ReturnErrorStatementNodeBuilder(this.metadata)
      .withExpression(expression)
      .build();
    const statementList = new StatementListNodeBuilder()
      .withStatements([returnErrorStatement])
      .build();
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder(this.metadata)
      .withBody(statementList)
      .build();
    return this.builder.withArrowFunctionBody(arrowFunctionBody).withParameters(parameters).build();
  }
}
