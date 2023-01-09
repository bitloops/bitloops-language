import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ControllerResolverBindKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ControllerResolverBindNode extends IntermediateASTNode {
  private static classNodeName = ControllerResolverBindKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TControllerResolverBind,
      metadata,
      ControllerResolverBindNode.classNodeName,
    );
  }
}
