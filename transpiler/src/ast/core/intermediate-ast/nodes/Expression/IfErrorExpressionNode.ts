import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { StringUtils } from '../../../../../utils/StringUtils.js';
import { StatementListNodeBuilder } from '../../builders/statements/StatementListNodeBuilder.js';
import { AnonymousFunctionNode } from '../AnonymousFunctionNode.js';
import { ArrowFunctionBodyNode } from '../ArrowFunctionBodyNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { ReturnErrorStatementNode } from '../statements/ReturnErrorStatementNode.js';
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

  getExpressionValues(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression || !expression.getChildren().length) {
      throw new Error('Expression not found');
    }
    return expression.getChildren()[0] as ExpressionNode;
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

  getParameters(): ParameterNode[] {
    const anonymousFunction = this.getAnonymousFunction();
    if (!anonymousFunction) return [];
    return anonymousFunction.getParameters();
  }

  getReturnStatement(): ReturnStatementNode | null {
    const arrowFunctionBody = this.getArrowFunctionBody();
    if (!arrowFunctionBody) return null;
    return arrowFunctionBody.getReturnStatement();
  }

  getReturnErrorStatement(): ReturnErrorStatementNode | null {
    const arrowFunctionBody = this.getArrowFunctionBody();
    if (!arrowFunctionBody) return null;
    return arrowFunctionBody.getReturnErrorStatement();
  }

  getStatementListNode(): StatementListNode | null {
    const nodeStatementList = this.getStatements();
    const returnStatementNode = this.getReturnStatement();
    const returnErrorStatementNode = this.getReturnErrorStatement();

    if (nodeStatementList) {
      return nodeStatementList;
    } else if (returnStatementNode) {
      return new StatementListNodeBuilder().withStatements([returnStatementNode]).build();
    } else if (returnErrorStatementNode) {
      return new StatementListNodeBuilder().withStatements([returnErrorStatementNode]).build();
    }
    return null;
  }

  getParameter(): ParameterNode | null {
    const anonymousFunction = this.getAnonymousFunction();
    if (!anonymousFunction) return null;
    return anonymousFunction.getParameters()[0];
  }

  public getInferredType(symbolTable?: SymbolTable): string {
    const leftExpression = this.getExpressionValues();
    const leftExpressionString = leftExpression.getStringValue();
    const leftExpressionType = symbolTable.lookup(leftExpressionString);
    const { type: leftType } = leftExpressionType;
    return StringUtils.getSubstringsBetweenStrings(leftType, 'OK(', ')')[0];
  }
}
