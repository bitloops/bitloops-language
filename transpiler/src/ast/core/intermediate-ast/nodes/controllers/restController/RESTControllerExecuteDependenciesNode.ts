import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RESTControllerExecuteDependenciesNode extends IntermediateASTNode {
  private static classNodeName = 'dependencies';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRESTControllerExecuteDependencies,
      metadata,
      RESTControllerExecuteDependenciesNode.classNodeName,
    );
  }
}
