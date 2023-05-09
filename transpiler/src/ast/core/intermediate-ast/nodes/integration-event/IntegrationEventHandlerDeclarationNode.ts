import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { TEventHandlerBusDependencies } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { EventHandlerBusDependenciesNode } from '../DomainEventHandler/EventHandlerBusDependenciesNode.js';
import { EvaluationFieldNode } from '../Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StatementNode } from '../statements/Statement.js';
import { IntegrationEventHandlerHandleMethodNode } from './IntegrationEventHandlerHandleMethodNode.js';
import { IntegrationEventParameterNode } from './IntegrationEventParameterNode.js';

export class IntegrationEventHandlerDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.IntegrationEventHandler;
  private static classNodeName = 'integrationEventHandler';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: IntegrationEventHandlerDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TIntegrationEventHandler,
      metadata,
      classNodeName: IntegrationEventHandlerDeclarationNode.classNodeName,
    });
  }

  getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getStatements(): StatementNode[] {
    const eventHandlerMethod = this.getChildNodeByType<IntegrationEventHandlerHandleMethodNode>(
      BitloopsTypesMapping.TIntegrationEventHandlerHandleMethod,
    );
    return eventHandlerMethod.getStatements();
  }

  getEventBusDependencies(): string[] {
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

  getParameters(): ParameterNode[] {
    const parameterListNode = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterListNode.getParameters();
  }

  getHandle(): IntegrationEventHandlerHandleMethodNode {
    const handle = this.getChildNodeByType<IntegrationEventHandlerHandleMethodNode>(
      BitloopsTypesMapping.TIntegrationEventHandlerHandleMethod,
    );
    return handle;
  }

  getHandleParameter(): IntegrationEventParameterNode {
    const eventHandler = this.getHandle();

    const parameter = eventHandler.getParameter();
    return parameter;
  }

  getEventVersion(): EvaluationFieldNode {
    return this.getChildNodeByType<EvaluationFieldNode>(BitloopsTypesMapping.TEvaluationField);
  }

  getEventVersionValue(): string {
    const evaluationFieldNode = this.getEventVersion();
    const expression = evaluationFieldNode.getExpression();
    const literalNode = expression.getLiteralNode();
    return literalNode.getStringLiteralValue();
  }
}
