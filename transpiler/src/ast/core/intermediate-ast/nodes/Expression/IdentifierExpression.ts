import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TInferredTypes } from '../../../../../semantic-analysis/type-inference/types.js';
import { MissingIdentifierError } from '../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';
import { InstanceOfExpressionNode } from './InstanceOfExpression.js';
import { MemberDotExpressionNode } from './MemberDot/MemberDotExpressionNode.js';

export class IdentifierExpressionNode extends ExpressionNode {
  private static identifierExpressionNodeName = 'identifier';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TIdentifierExpression;
    this.classNodeName = IdentifierExpressionNode.identifierExpressionNodeName;
  }

  public getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const identifierName: string = identifierValue[identifierClassNodeName];
    return identifierName;
  }

  get identifierName(): string {
    return this.getValue()[IdentifierExpressionNode.identifierExpressionNodeName];
  }

  set identifierName(value: string) {
    this.setValue({ [IdentifierExpressionNode.identifierExpressionNodeName]: value });
  }

  public isUsedByIsInstanceOfExpression(): boolean {
    // If we were used by IsInstanceOfExpression, we would have a grandParent
    // that is IsInstanceOfExpression
    const parent = this.getParent();
    if (!parent) {
      return false;
    }
    const grandParent = parent.getParent();
    if (!grandParent) {
      return false;
    }

    if (grandParent instanceof InstanceOfExpressionNode) {
      return true;
    }
    return false;
  }

  /**
   * if its the right part of a member dot expression, then its parent is a member dot expression
   *  If its the left part of a member dot expression, then its grandParent is a member dot expression
   * ... and so on
   */
  public isUsedByMemberDotExpression(): boolean {
    let parent = this.getParent();
    while (parent) {
      if (parent instanceof MemberDotExpressionNode) {
        return true;
      }
      parent = parent.getParent();
    }
    return false;
  }

  // MemberDotExpressions can be nested, so i could have title.props.name
  public isLeftMostPartOfMemberDotExpression(): boolean {
    const parent = this.getParent();
    if (!parent) {
      return false;
    }
    if (parent instanceof MemberDotExpressionNode && !parent.isUsedByMemberDotExpression()) {
      return false;
    }
    return true;
  }

  public getStringValue(): string {
    return this.getIdentifierName();
  }

  public override typeCheck(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const identifierName = this.getIdentifierName();
    const identifierType = symbolTable.lookup(identifierName);
    if (!identifierType) {
      throw new MissingIdentifierError(identifierName, this.getMetadata());
    }
  }

  public getInferredType(symbolTableManager: SymbolTableManager): TInferredTypes {
    const symbolTable = symbolTableManager.getSymbolTable();
    const identifierType = symbolTable.lookup(this.getIdentifierName());
    if (!identifierType) {
      throw new MissingIdentifierError(this.getIdentifierName(), this.getMetadata());
    }

    return identifierType.type;
  }
}
