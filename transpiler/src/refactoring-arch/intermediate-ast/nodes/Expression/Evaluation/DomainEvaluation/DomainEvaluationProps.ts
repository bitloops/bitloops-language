import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';

const NAME = 'props';
export class DomainEvaluationPropsNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainEvaluationProps, metadata, NAME);
  }
}
