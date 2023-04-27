import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { AnonymousFunctionNode } from '../AnonymousFunctionNode.js';
import { ArrowFunctionBodyNode } from '../ArrowFunctionBodyNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
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
}
