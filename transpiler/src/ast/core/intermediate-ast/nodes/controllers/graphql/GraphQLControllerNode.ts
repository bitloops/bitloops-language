import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { TGraphQLController } from '../../../../../../types.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ControllerNode } from '../ControllerNode.js';
import { GraphQLControllerIdentifierNode } from './GraphQLControllerIdentifierNode.js';

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

  public getIdentifier(): GraphQLControllerIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TGraphQLControllerIdentifier,
    ) as GraphQLControllerIdentifierNode;
    return identifier;
  }
}
