import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { PropsIdentifierKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class PropsIdentifierNode extends IntermediateASTNode {
  private static classNodeName = PropsIdentifierKey; //'PropsIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPropsIdentifier, metadata, PropsIdentifierNode.classNodeName);
  }

  getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const propsIdentifierName: string = identifierValue[identifierClassNodeName];
    return propsIdentifierName;
  }
}
