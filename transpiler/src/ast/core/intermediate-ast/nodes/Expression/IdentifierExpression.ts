import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

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
}
