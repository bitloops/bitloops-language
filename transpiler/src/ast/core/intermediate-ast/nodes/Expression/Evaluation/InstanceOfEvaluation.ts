import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'isInstanceOf';
export class InstanceOfEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TInstanceOf;
    this.classNodeName = NAME;
  }
}
