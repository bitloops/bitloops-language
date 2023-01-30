import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { TGraphQLController } from '../../../../../../types.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ControllerNode } from '../ControllerNode.js';

export class GraphQLControllerNode extends ControllerNode {
  private static classNodeName = 'GraphQLController';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ClassTypes.Controller,
      nodeType: BitloopsTypesMapping.TGraphQLController,
      metadata,
      classNodeName: GraphQLControllerNode.classNodeName,
    });
  }

  public getName(): string {
    const value: TGraphQLController = this.getValue();
    return value.GraphQLController.graphQLControllerIdentifier;
  }
}
