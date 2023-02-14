import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { StatementNode } from '../statements/Statement.js';
import { DomainEventHandleNode } from './DomainEventHandleNode.js';

export class DomainEventHandlerDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainEventHandler;
  private static classNodeName = 'domainEventHandler';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainEventHandlerDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TDomainEventHandler,
      metadata,
      classNodeName: DomainEventHandlerDeclarationNode.classNodeName,
    });
  }

  getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getStatements(): StatementNode[] {
    const useCaseExecute = this.getChildNodeByType<DomainEventHandleNode>(
      BitloopsTypesMapping.TDomainEventHandlerHandleMethod,
    );
    return useCaseExecute.getStatements();
  }
}
