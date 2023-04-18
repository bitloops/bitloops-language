import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { TEventHandlerBusDependencies } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { EventHandleNode } from '../EventHandleNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StatementNode } from '../statements/Statement.js';
import { DomainEventHandlerIdentifierNode } from './DomainEventHandlerIdentifierNode.js';
import { EventHandlerBusDependenciesNode } from './EventHandlerBusDependenciesNode.js';

export class DomainEventHandlerDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainEventHandler;
  private static classNodeName = 'domainEventHandler';
  private isAuto = false;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainEventHandlerDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TDomainEventHandler,
      metadata,
      classNodeName: DomainEventHandlerDeclarationNode.classNodeName,
    });
  }

  get isAutoDomainEventHandler(): boolean {
    return this.isAuto;
  }

  set isAutoDomainEventHandler(isAuto: boolean) {
    this.isAuto = isAuto;
  }

  public getIdentifier(): DomainEventHandlerIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TDomainEventHandlerIdentifier,
    ) as DomainEventHandlerIdentifierNode;
    return identifier;
  }

  getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getStatements(): StatementNode[] {
    const eventHandler = this.getHandle();
    return eventHandler.getStatements();
  }

  getExtraDependencies(): string[] {
    const eventBusDependencies = this.getChildNodeByType<EventHandlerBusDependenciesNode>(
      BitloopsTypesMapping.TEventHandlerBusDependencies,
    );
    const nodeValue = eventBusDependencies.getValue() as TEventHandlerBusDependencies;
    // loop through all keys of nodeValue, and if they are true add them to the array
    const extraDependencies = Object.keys(nodeValue.eventHandlerBusDependencies).filter(
      (key) => nodeValue.eventHandlerBusDependencies[key] === true,
    );
    return extraDependencies;
  }

  getExtraDependenciesNode(): EventHandlerBusDependenciesNode | null {
    const eventBusDependencies = this.getChildNodeByType<EventHandlerBusDependenciesNode>(
      BitloopsTypesMapping.TEventHandlerBusDependencies,
    );
    return eventBusDependencies;
  }

  getParameters(): ParameterNode[] {
    const parameterListNode = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterListNode.getParameters();
  }

  getHandle(): EventHandleNode {
    const handle = this.getChildNodeByType<EventHandleNode>(
      BitloopsTypesMapping.TEventHandlerHandleMethod,
    );
    return handle;
  }

  getMethodParameters(): ParameterNode[] {
    const eventHandler = this.getHandle();

    const parameters = eventHandler.getParameters();
    if (!parameters) return [];
    return parameters;
  }
}
