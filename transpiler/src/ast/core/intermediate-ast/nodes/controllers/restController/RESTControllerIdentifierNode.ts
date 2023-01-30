import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class RESTControllerIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'RESTControllerIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRESTControllerIdentifier,
      RESTControllerIdentifierNode.classNodeName,
      metadata,
    );
  }
}
