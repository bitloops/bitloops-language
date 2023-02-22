import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { TGraphQLController } from '../../../../../../types.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ParameterListNode } from '../../ParameterList/ParameterListNode.js';
import { StatementNode } from '../../statements/Statement.js';
import { ControllerNode } from '../ControllerNode.js';
import { GraphQLControllerExecuteNode } from './GraphQLControllerExecuteNode.js';
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

  public getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getStatements(): StatementNode[] {
    const useCaseExecute = this.getChildNodeByType<GraphQLControllerExecuteNode>(
      BitloopsTypesMapping.TGraphQLControllerExecute,
    );
    return useCaseExecute.getStatements();
  }
}
