import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'errorEvaluation';
export class ErrorEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TErrorEvaluation;
    this.classNodeName = NAME;
  }
}
