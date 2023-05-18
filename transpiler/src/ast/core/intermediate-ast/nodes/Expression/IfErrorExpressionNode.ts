import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { MethodCallSymbolEntry } from '../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
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
import { MemberDotExpressionNode } from './MemberDot/MemberDotExpressionNode.js';

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

  getMemberDotExpression(): MemberDotExpressionNode {
    const expression = this.getExpressionValues();
    if (expression.isMethodCallExpression()) {
      return expression.getMemberDotExpression();
    }
    if (!expression.isMemberDotExpression()) {
      return null;
    }
    return expression;
  }

  public getInferredTypeOfParameter(symbolTable: SymbolTable): string {
    const leftExpression = this.getExpressionValues();
    const leftExpressionString = leftExpression.getStringValue();
    const leftExpressionType = symbolTable.lookup(leftExpressionString);
    const { type: leftType } = leftExpressionType;
    return StringUtils.getSubstringsBetweenStrings(leftType, 'Errors(', ')')[0];
  }

  public getInferredType(symbolTableManager: SymbolTableManager): string {
    const symbolTable = symbolTableManager.getSymbolTable();
    const leftExpression = this.getExpressionValues();
    const leftExpressionString = leftExpression.getStringValue();
    const leftExpressionType = symbolTable.lookup(leftExpressionString);
    const { type: leftType } = leftExpressionType;
    return StringUtils.getSubstringsBetweenStrings(leftType, 'OK(', ')')[0];
  }

  private joinIfErrorToKey(key: string): string {
    return key + '.ifError()';
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const leftIfErrorExpression = this.getExpression();
    leftIfErrorExpression.addToSymbolTable(symbolTableManager);

    const key = this.joinIfErrorToKey(this.getStringValue());
    const symbolTable = symbolTableManager.getSymbolTable();
    symbolTable.insert(key, new MethodCallSymbolEntry(this.getInferredType(symbolTableManager)));
    const ifErrorCounter = symbolTableManager.increaseIfErrorCounter();
    const ifErrorScopeName = SymbolTableManager.SCOPE_NAMES.IF_ERROR + ifErrorCounter;
    //set new scope
    symbolTableManager.createSymbolTableChildScope(ifErrorScopeName, this);

    const parameter = this.getParameter();
    if (parameter) {
      parameter.addToSymbolTable(symbolTableManager);
    }
    const statementList = this.getStatementListNode();
    if (statementList) {
      statementList.addToSymbolTable(symbolTableManager);
    }
  }
}
