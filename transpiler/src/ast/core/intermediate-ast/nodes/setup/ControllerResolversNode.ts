import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ControllerResolversKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ControllerResolversNode extends IntermediateASTNode {
  private static classNodeName = ControllerResolversKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TControllerResolvers,
      metadata,
      ControllerResolversNode.classNodeName,
    );
  }
}
