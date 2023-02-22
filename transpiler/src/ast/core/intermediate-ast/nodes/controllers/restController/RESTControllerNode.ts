import { BitloopsTypesMapping, ClassTypes } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ParameterListNode } from '../../ParameterList/ParameterListNode.js';
import { StatementNode } from '../../statements/Statement.js';
import { ControllerNode } from '../ControllerNode.js';
import { RESTControllerExecuteNode } from './RESTControllerExecuteNode.js';
import { RESTControllerIdentifierNode } from './RESTControllerIdentifierNode.js';

export class RESTControllerNode extends ControllerNode {
  private static classNodeName = 'RESTController';
  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ClassTypes.Controller,
      nodeType: BitloopsTypesMapping.TRESTController,
      metadata,
      classNodeName: RESTControllerNode.classNodeName,
    });
  }

  public getIdentifier(): RESTControllerIdentifierNode {
    const restServerIdentifier = this.getChildNodeByType(
      BitloopsTypesMapping.TRESTControllerIdentifier,
    ) as RESTControllerIdentifierNode;
    return restServerIdentifier;
  }

  public getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getStatements(): StatementNode[] {
    const useCaseExecute = this.getChildNodeByType<RESTControllerExecuteNode>(
      BitloopsTypesMapping.TRESTControllerExecute,
    );
    return useCaseExecute.getStatements();
  }
}
