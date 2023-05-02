import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { StatementListNodeBuilder } from '../../builders/statements/StatementListNodeBuilder.js';
import { AnonymousFunctionNode } from '../AnonymousFunctionNode.js';
import { ArrowFunctionBodyNode } from '../ArrowFunctionBodyNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { ReturnStatementNode } from '../statements/ReturnStatementNode.js';
import { StatementListNode } from '../statements/StatementList.js';
import { ExpressionNode } from './ExpressionNode.js';

export class IfErrorExpressionNode extends ExpressionNode {
  private static NAME = 'ifErrorExpression';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = IfErrorExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TIfErrorExpression;
  }

  getExpression(): ExpressionNode {
    return this.getChildNodeByType<ExpressionNode>(BitloopsTypesMapping.TExpression);
  }

  getAnonymousFunction(): AnonymousFunctionNode | null {
    return this.getChildNodeByType<AnonymousFunctionNode>(BitloopsTypesMapping.TAnonymousFunction);
  }

  getArrowFunctionBody(): ArrowFunctionBodyNode | null {
    const anonymousFunction = this.getAnonymousFunction();
    if (!anonymousFunction) return null;
    return anonymousFunction.getArrowFunctionBody();
  }

  getStatements(): StatementListNode | null {
    const arrowFunctionBody = this.getArrowFunctionBody();
    if (!arrowFunctionBody) return null;
    return arrowFunctionBody.getStatements();
  }

  getReturnStatement(): ReturnStatementNode | null {
    const arrowFunctionBody = this.getArrowFunctionBody();
    if (!arrowFunctionBody) return null;
    return arrowFunctionBody.getReturnStatement();
  }

  getStatementListNode(): StatementListNode | null {
    const nodeStatementList = this.getStatements();
    const returnStatementNode = this.getReturnStatement();

    if (nodeStatementList) {
      return nodeStatementList;
    } else if (returnStatementNode) {
      return new StatementListNodeBuilder().withStatements([returnStatementNode]).build();
    }
    return null;
  }

  getParameter(): ParameterNode | null {
    const anonymousFunction = this.getAnonymousFunction();
    if (!anonymousFunction) return null;
    return anonymousFunction.getParameters()[0];
  }
}
