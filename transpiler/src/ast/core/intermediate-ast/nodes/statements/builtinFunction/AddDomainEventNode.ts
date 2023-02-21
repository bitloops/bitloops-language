import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { BuiltInFunctionNode } from './BuiltinFunctionNode.js';

const classNodeName = 'addDomainEvent';
export class AddDomainEventNode extends BuiltInFunctionNode {
  constructor(metadata: TNodeMetadata) {
    super(metadata);
    this.setClassNodeName(classNodeName);
    this.setNodeType(BitloopsTypesMapping.TAddDomainEvent);
  }
}
