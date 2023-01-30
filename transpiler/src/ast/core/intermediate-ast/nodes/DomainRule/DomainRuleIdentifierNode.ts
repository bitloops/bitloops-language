import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'domainRuleIdentifier';
export class DomainRuleIdentifierNode extends IntermediateASTIdentifierNode {
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainRuleIdentifier, NAME, metadata);
  }
}
