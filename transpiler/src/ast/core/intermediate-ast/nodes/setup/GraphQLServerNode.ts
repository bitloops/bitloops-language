import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { GraphQLServerInstanceKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ControllerResolversNode } from './ControllerResolversNode.js';

export class GraphQLServerNode extends IntermediateASTNode {
  private static classNodeName = GraphQLServerInstanceKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TGraphQLServerInstance, metadata, GraphQLServerNode.classNodeName);
  }

  getControllerResolvers(): ControllerResolversNode {
    const children = this.getChildren();
    const controllerResolvers = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TControllerResolvers,
    );
    if (!controllerResolvers) {
      throw new Error('Controller resolvers not found');
    }
    return controllerResolvers as unknown as ControllerResolversNode;
  }
}
