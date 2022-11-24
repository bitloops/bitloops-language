import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

const name = 'evaluation';
export class EvaluationNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = name;
    this.nodeType = BitloopsTypesMapping.TEvaluation;
  }

  // isErrorEvaluation(): this is  {
  //   throw new Error('Not implemeneted');
  // }

  // isDTOEvaluation(): this is  {
  //   throw new Error('Not implemeneted');
  // }
  // isValueObjectEvaluation(): this is {
  //   throw new Error('Not implemeneted');
  // }
}
