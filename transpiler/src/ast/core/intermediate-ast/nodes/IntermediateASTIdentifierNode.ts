import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

export abstract class IntermediateASTIdentifierNode extends IntermediateASTNode {
  constructor(nodeType: string, classNodeName: string, metadata?: TNodeMetadata) {
    super(nodeType, metadata, classNodeName);
  }

  public getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const useCaseIdentifierName: string = identifierValue[identifierClassNodeName];
    return useCaseIdentifierName;
  }
}
