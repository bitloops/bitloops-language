import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { isVO } from '../../../../../helpers/typeGuards.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class BitloopsIdentifierTypeNode extends BitloopsPrimaryTypeNode {
  private static blIdentifierClassNodeName = 'bitloopsIdentifierType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = BitloopsIdentifierTypeNode.blIdentifierClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsIdentifier;
  }
  public getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const identifierName: string = identifierValue[identifierClassNodeName];
    return identifierName;
  }

  public isDomainEventIdentifier(): boolean {
    const identifierName = this.getIdentifierName();
    if (identifierName.endsWith('DomainEvent')) {
      return true;
    }
    return false;
  }

  public isValueObjectIdentifier(): boolean {
    const identifierName = this.getIdentifierName();
    return isVO(identifierName);
  }
}
