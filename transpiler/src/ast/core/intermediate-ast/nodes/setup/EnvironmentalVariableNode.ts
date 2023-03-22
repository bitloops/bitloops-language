import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

const classNodeName = 'environmentVariable';
export class EnvironmentalVariableNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = classNodeName;
    this.nodeType = BitloopsTypesMapping.TEnvironmentVariableExpression;
  }
}
