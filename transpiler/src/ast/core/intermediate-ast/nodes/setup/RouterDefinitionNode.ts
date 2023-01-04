import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RouterDefinitionNode extends IntermediateASTNode {
  private static classNodeName = 'routerDefinition';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterDefinition, metadata, RouterDefinitionNode.classNodeName);
  }
}
