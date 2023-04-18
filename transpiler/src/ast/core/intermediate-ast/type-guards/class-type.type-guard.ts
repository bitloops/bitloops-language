import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ClassTypeNode } from '../nodes/ClassTypeNode.js';
import { DomainEventDeclarationNode } from '../nodes/DomainEvent/DomainEventDeclarationNode.js';
import { DomainEventHandlerDeclarationNode } from '../nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { DomainRuleNode } from '../nodes/DomainRule/DomainRuleNode.js';
import { EntityDeclarationNode } from '../nodes/Entity/EntityDeclarationNode.js';
import { RootEntityDeclarationNode } from '../nodes/RootEntity/RootEntityDeclarationNode.js';
import { CommandHandlerNode } from '../nodes/command/CommandHandlerNode.js';
import { DomainServiceNode } from '../nodes/domain-service/DomainServiceNode.js';
import { IntegrationEventHandlerDeclarationNode } from '../nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventNode } from '../nodes/integration-event/IntegrationEventNode.js';
import { QueryHandlerNode } from '../nodes/query/QueryHandlerNode.js';
import { ReadModelNode } from '../nodes/readModel/ReadModelNode.js';
import { ValueObjectDeclarationNode } from '../nodes/valueObject/ValueObjectDeclarationNode.js';

export class ClassTypeNodeTypeGuards {
  static isCommandHandler(node: ClassTypeNode): node is CommandHandlerNode {
    return node.getNodeType() === BitloopsTypesMapping.TCommandHandler;
  }

  static isQueryHandler(node: ClassTypeNode): node is QueryHandlerNode {
    return node.getNodeType() === BitloopsTypesMapping.TQueryHandler;
  }

  static isRootEntity(node: ClassTypeNode): node is RootEntityDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TRootEntity;
  }

  static isEntity(node: ClassTypeNode): node is EntityDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TEntity;
  }

  static isValueObject(node: ClassTypeNode): node is ValueObjectDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TValueObject;
  }

  static isDomainEvent(node: ClassTypeNode): node is DomainEventDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TDomainEvent;
  }

  static isIntegrationEvent(node: ClassTypeNode): node is IntegrationEventNode {
    return node.getNodeType() === BitloopsTypesMapping.TIntegrationEvent;
  }

  static isDomainEventHandler(node: ClassTypeNode): node is DomainEventHandlerDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TDomainEventHandler;
  }

  static isIntegrationEventHandler(
    node: ClassTypeNode,
  ): node is IntegrationEventHandlerDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TIntegrationEventHandler;
  }

  static isDomainService(node: ClassTypeNode): node is DomainServiceNode {
    return node.getNodeType() === BitloopsTypesMapping.TDomainService;
  }

  static isReadModel(node: ClassTypeNode): node is ReadModelNode {
    return node.getNodeType() === BitloopsTypesMapping.TReadModel;
  }

  static isDomainRule(node: ClassTypeNode): node is DomainRuleNode {
    return node.getNodeType() === BitloopsTypesMapping.TDomainRule;
  }
}
