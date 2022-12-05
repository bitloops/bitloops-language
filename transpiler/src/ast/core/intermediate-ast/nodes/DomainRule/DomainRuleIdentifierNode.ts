import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'name';
export class DomainRuleIdentifierNode extends IntermediateASTNode {
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainRuleIdentifier, metadata, NAME);
  }

  getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
    return dtoIdentifierName;
  }
}
