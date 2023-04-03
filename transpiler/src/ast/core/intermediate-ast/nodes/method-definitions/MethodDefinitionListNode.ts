import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { MethodDefinitionNode } from './MethodDefinitionNode.js';

const NAME = 'methodDefinitionList';
export class MethodDefinitionListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDefinitionMethods, metadata, NAME);
  }

  getMethodDefinitionNodes(): MethodDefinitionNode[] {
    return this.getChildren() as MethodDefinitionNode[];
  }
}
