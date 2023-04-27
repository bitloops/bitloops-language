import { AnonymousFunctionNode } from '../nodes/AnonymousFunctionNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { AnonymousFunctionNodeBuilder } from './AnonymousFunctionNodeBuilder.js';
import { ArrowFunctionBodyNodeBuilder } from './ArrowFunctionBodyNodeBuilder.js';

export class AnonymousFunctionNodeBuilderDirector {
  private builder: AnonymousFunctionNodeBuilder;
  constructor() {
    this.builder = new AnonymousFunctionNodeBuilder();
  }

  buildAnonymousFunctionNodeWithReturnStatement(
    parameters: ParameterListNode,
    returnStatementNode: ReturnStatementNode,
  ): AnonymousFunctionNode {
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder()
      .withBody(returnStatementNode)
      .build();
    return this.builder.withParameters(parameters).withArrowFunctionBody(arrowFunctionBody).build();
  }

  buildAnonymousFunctionNodeWithStatementList(
    parameters: ParameterListNode,
    statementNode: StatementListNode,
  ): AnonymousFunctionNode {
    const arrowFunctionBody = new ArrowFunctionBodyNodeBuilder().withBody(statementNode).build();
    return this.builder.withParameters(parameters).withArrowFunctionBody(arrowFunctionBody).build();
  }
}
