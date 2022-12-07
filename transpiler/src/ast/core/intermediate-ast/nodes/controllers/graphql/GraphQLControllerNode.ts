import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../../ClassTypeNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLControllerNode extends ClassTypeNode {
  private static classNodeName = 'RESTController';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ClassTypes.Controller,
      nodeType: BitloopsTypesMapping.TRESTController,
      metadata,
      classNodeName: GraphQLControllerNode.classNodeName,
    });
  }
}
