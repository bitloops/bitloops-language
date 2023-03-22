import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ControllerInstanceNameNode extends IntermediateASTNode {
  private static classNodeName = 'controllerInstanceName';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TControllerInstanceName,
      metadata,
      ControllerInstanceNameNode.classNodeName,
    );
  }
}
