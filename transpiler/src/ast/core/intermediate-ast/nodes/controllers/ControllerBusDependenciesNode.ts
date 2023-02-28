import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ControllerBusDependenciesNode extends IntermediateASTNode {
  private static NAME = 'controllerBusDependencies';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TControllerBusDependencies,
      metadata,
      ControllerBusDependenciesNode.NAME,
    );
  }
}
