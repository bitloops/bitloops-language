import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'valueObject';
export class ValueObjectEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStructEvaluation;
    this.classNodeName = NAME;
  }
}
