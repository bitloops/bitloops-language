import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { BuiltInFunctionNode } from './BuiltinFunctionNode.js';

const classNodeName = 'applyRules';
export class ApplyRulesNode extends BuiltInFunctionNode {
  constructor(metadata: TNodeMetadata) {
    super(metadata);
    this.setClassNodeName(classNodeName);
    this.setNodeType(BitloopsTypesMapping.TApplyRules);
  }
}
