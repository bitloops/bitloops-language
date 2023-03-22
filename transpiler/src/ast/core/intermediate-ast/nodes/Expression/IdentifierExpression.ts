import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';
import { InstanceOfExpressionNode } from './InstanceOfExpression.js';

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
}
