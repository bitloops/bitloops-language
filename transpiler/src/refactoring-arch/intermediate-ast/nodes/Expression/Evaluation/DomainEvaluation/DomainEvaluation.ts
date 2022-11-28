import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';

const NAME = 'domainEvaluation';
export class DomainEvaluationNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainEvaluation, metadata, NAME);
  }
}
