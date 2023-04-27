import { AnonymousFunctionNode } from '../nodes/AnonymousFunctionNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { AnonymousFunctionNodeBuilder } from '../builders/AnonymousFunctionNodeBuilder.js';
import { ArrowFunctionBodyNodeBuilder } from '../builders/ArrowFunctionBodyNodeBuilder.js';
import { ParameterListNodeBuilderDirector } from './parameterListNodeBuilderDirector.js';
import { ReturnStatementBuilderDirector } from './returnNodeBuilderDirector.js';
import { ExpressionBuilderDirector } from './expressionNodeBuilderDirector.js';

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
    const returnStatement = new ReturnStatementBuilderDirector(this.metadata).buildReturn(
      new ExpressionBuilderDirector().buildIdentifierExpression(errorParameterName),
    );
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder(this.metadata)
      .withBody(returnStatement)
      .build();
    return this.builder.withArrowFunctionBody(arrowFunctionBody).withParameters(parameters).build();
  }
}
