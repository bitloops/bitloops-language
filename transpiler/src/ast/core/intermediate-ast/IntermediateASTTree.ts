import { TBitloopsTypesValues, BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './nodes/IntermediateASTNode.js';
import { IntermediateASTRootNode } from './nodes/RootNode.js';
import { StatementNode } from './nodes/statements/Statement.js';
import { ReturnStatementNode } from './nodes/statements/ReturnStatementNode.js';
import { isArray, isObject } from '../../../helpers/typeGuards/typeGuards.js';
import { IdentifierExpressionNode } from './nodes/Expression/IdentifierExpression.js';
import { MemberDotExpressionNode } from './nodes/Expression/MemberDot/MemberDotExpressionNode.js';
import { TVariableDeclarationStatement } from '../types.js';
import { MethodCallExpressionNode } from './nodes/Expression/MethodCallExpression.js';
import { ConstDeclarationNode } from './nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './nodes/statements/variableDeclaration.js';
import { EntityEvaluationNode } from './nodes/Expression/Evaluation/EntityEvaluation.js';
import { ValueObjectEvaluationNode } from './nodes/Expression/Evaluation/ValueObjectEvaluation.js';
import { RootEntityDeclarationNode } from './nodes/RootEntity/RootEntityDeclarationNode.js';
import { EntityIdentifierNode } from './nodes/Entity/EntityIdentifierNode.js';
import { TBitloopsPrimaryType, TBitloopsPrimitives } from '../../../types.js';
import { PropsNode } from './nodes/Props/PropsNode.js';
import { EntityDeclarationNode } from './nodes/Entity/EntityDeclarationNode.js';
import { ValueObjectDeclarationNode } from './nodes/valueObject/ValueObjectDeclarationNode.js';
import { FieldListNode } from './nodes/FieldList/FieldListNode.js';
import { ReadModelNode } from './nodes/readModel/ReadModelNode.js';
import { ParameterNode } from './nodes/ParameterList/ParameterNode.js';
import { DomainServiceEvaluationNode } from './nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { RepoPortNode } from './nodes/repo-port/RepoPortNode.js';
import { ClassTypeNode } from './nodes/ClassTypeNode.js';
import { QueryDeclarationNode } from './nodes/query/QueryDeclarationNode.js';
import { QueryHandlerNode } from './nodes/query/QueryHandlerNode.js';
import { BitloopsPrimaryTypeNode } from './nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ReturnOkErrorTypeNode } from './nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { CommandDeclarationNode } from './nodes/command/CommandDeclarationNode.js';
import { DomainEventDeclarationNode } from './nodes/DomainEvent/DomainEventDeclarationNode.js';
import { IntegrationEventNode } from './nodes/integration-event/IntegrationEventNode.js';
import { StructNode } from './nodes/struct/StructNode.js';

type Policy = (node: IntermediateASTNode) => boolean;

type EntityVariableIdentifier = { identifier: string; entityIdentifier: string };

export class IntermediateASTTree {
  private currentNode: IntermediateASTNode;
  private rootNode: IntermediateASTRootNode;

  constructor(rootNode: IntermediateASTRootNode) {
    this.rootNode = rootNode;
    this.currentNode = rootNode;
  }

  /**
   * It inserts its child to currentNode
   * and makes it the new currentNode
   */
  public insertChild(childNode: IntermediateASTNode): void {
    this.currentNode.addChild(childNode);
    this.currentNode = childNode;
  }

  /**
   * It inserts the node as child to the parent of the currentNode
   * and makes it the new currentNode
   */
  public insertSibling(siblingNode: IntermediateASTNode): void {
    const parentNode = this.currentNode.getParent();
    parentNode.addChild(siblingNode);
    this.currentNode = siblingNode;
  }

  /**
   * Sets the CurrentNode back to RootNode
   */
  public setCurrentNodeToRoot() {
    this.currentNode = this.rootNode;
  }

  public getCurrentNode(): IntermediateASTNode {
    return this.currentNode;
  }

  public getRootNode(): IntermediateASTNode {
    return this.rootNode;
  }

  public getRootChildrenNodesByType<T extends IntermediateASTNode = IntermediateASTNode>(
    nodeType: TBitloopsTypesValues,
  ): T[] {
    const rootChildren = this.rootNode.getChildren();
    const classTypeNodes = [];
    for (const child of rootChildren) {
      if (child.getNodeType() === nodeType) {
        classTypeNodes.push(child);
      }
    }
    return classTypeNodes as T[];
  }

  public getRootChildrenNodesValueByType<T = any>(nodeType: TBitloopsTypesValues): T[] {
    const nodes = this.getRootChildrenNodesByType(nodeType);
    return nodes.map((node) => node.getValue());
  }

  public mergeWithTree(tree: IntermediateASTTree): IntermediateASTTree {
    tree.rootNode.getChildren().map((childNode) => {
      this.rootNode.addChild(childNode);
    });
    return this;
  }

  /**    A
   *  B -   F
   * C-E   G-H-I
   * D          K
   */
  public traverse(currentNode: IntermediateASTNode, cb?: (node: IntermediateASTNode) => any): void {
    if (currentNode.isLeaf()) {
      return cb(currentNode);
    }
    cb(currentNode);
    const nodeChildren = currentNode.getChildren();

    for (const child of nodeChildren) {
      this.traverse(child, cb);
    }
  }

  public validateParentRefs(): void {
    this.traverse(this.rootNode, (node) => {
      const nodeChildren = node.getChildren();
      for (const child of nodeChildren) {
        if (child.getParent() !== node) {
          throw new Error('Invalid parent ref for child');
        }
      }
    });
  }

  public traverseBFS(
    currentNode: IntermediateASTNode,
    cb?: (node: IntermediateASTNode) => any,
  ): void {
    if (currentNode.isLeaf()) {
      return cb(currentNode);
    }
    cb(currentNode);
    const nodeChildren = currentNode.getChildren();
    for (const child of nodeChildren) {
      cb(child);
    }
    for (const child of nodeChildren) {
      this.traverseBFS(child, cb);
    }
  }

  // TODO implement this
  public copy(): IntermediateASTTree {
    return this;
  }

  public buildValueRecursiveBottomUp(currentNode: IntermediateASTNode): void {
    if (currentNode.isLeaf()) {
      return this.buildNodeValue(currentNode);
    }
    const nodeChildren = currentNode.getChildren();
    for (const child of nodeChildren) {
      this.buildValueRecursiveBottomUp(child);
    }
    this.buildNodeValue(currentNode);
  }

  private buildNodeValue(node: IntermediateASTNode): void {
    if (node.isRoot()) return;
    const nodeValue = node.getValue()[node.getClassNodeName()];
    if (node.isLeaf()) {
      return node.buildLeafValue(nodeValue);
    }

    if (isArray(nodeValue)) {
      return node.buildArrayValue();
    }

    if (isObject(nodeValue)) {
      return node.buildObjectValue();
    }

    return node.buildLeafValue(nodeValue);
  }

  public getClassTypeNodes(): ClassTypeNode[] {
    return this.getRootNode().getChildren() as ClassTypeNode[];
  }
  public getClassTypeByIdentifier(identifier: string): ClassTypeNode | null {
    const classTypeNodes = this.getClassTypeNodes();
    return (
      classTypeNodes.find((classTypeNode) => classTypeNode.getClassName() === identifier) || null
    );
  }

  public getAggregateIdentifier(identifier: string): EntityIdentifierNode | null {
    return this.getNodeWithPolicy(
      this.rootNode,
      (node: IntermediateASTNode): node is EntityIdentifierNode => {
        return (
          node.IsEntityIdentifierNode() &&
          (node as EntityIdentifierNode).getValue()?.entityIdentifier == identifier
        );
      },
    ) as EntityIdentifierNode;
  }

  public getAggregateNodeWithIdentifier(identifier: string): RootEntityDeclarationNode | null {
    const rootEntityNodes = this.getRootChildrenNodesByType(BitloopsTypesMapping.TRootEntity);

    const isEntityIdentifierNode = (node: IntermediateASTNode): node is EntityIdentifierNode =>
      node.getNodeType() === BitloopsTypesMapping.TEntityIdentifier;

    const isRootEntityNode = (node: IntermediateASTNode): node is RootEntityDeclarationNode =>
      node.getNodeType() === BitloopsTypesMapping.TRootEntity;

    let rootEntityFound: RootEntityDeclarationNode = null;
    for (const rootEntityNode of rootEntityNodes) {
      this.traverse(rootEntityNode, (node) => {
        if (
          isEntityIdentifierNode(node) &&
          identifier === node.getValue().entityIdentifier &&
          isRootEntityNode(rootEntityNode)
        ) {
          rootEntityFound = rootEntityNode;
        }
      });
    }
    return rootEntityFound;
  }

  public getReadModelByIdentifier(identifier: string): ReadModelNode | null {
    const readModelNodes = this.getRootChildrenNodesByType<ReadModelNode>(
      BitloopsTypesMapping.TReadModel,
    );
    return (
      readModelNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier) || null
    );
  }

  public getEntityByIdentifier = (identifier: string): EntityDeclarationNode => {
    const entityNodes = this.getRootChildrenNodesByType(
      BitloopsTypesMapping.TEntity,
    ) as EntityDeclarationNode[];

    let entityFound: EntityDeclarationNode = null;
    for (const entityNode of entityNodes) {
      const entityIdentifier = entityNode.getIdentifier();

      if (identifier === entityIdentifier.getValue().entityIdentifier) {
        entityFound = entityNode;
      }
    }

    return entityFound;
  };

  public getRootEntityByIdentifier = (identifier: string): RootEntityDeclarationNode => {
    const rootEntityNodes = this.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRootEntity,
    ) as RootEntityDeclarationNode[];

    return (
      rootEntityNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier) ??
      null
    );
  };

  public getValueObjectByIdentifier = (identifier: string): ValueObjectDeclarationNode => {
    const valueObjectDeclarationNodes = this.getRootChildrenNodesByType<ValueObjectDeclarationNode>(
      BitloopsTypesMapping.TValueObject,
    );

    return (
      valueObjectDeclarationNodes.find((node) => node.getIdentifierValue() === identifier) ?? null
    );
  };

  public getRepoPortByIdentifier = (identifier: string): RepoPortNode => {
    const repoPortNodes = this.getRootChildrenNodesByType<RepoPortNode>(
      BitloopsTypesMapping.TRepoPort,
    );
    return repoPortNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier);
  };

  public getQueryByIdentifier = (identifier: string): QueryDeclarationNode => {
    const queryNodes = this.getRootChildrenNodesByType<QueryDeclarationNode>(
      BitloopsTypesMapping.TQuery,
    );
    return queryNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier);
  };

  public getCommandByIdentifier = (identifier: string): CommandDeclarationNode => {
    const commandNodes = this.getRootChildrenNodesByType<CommandDeclarationNode>(
      BitloopsTypesMapping.TCommand,
    );
    return commandNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier);
  };

  public getQueryHandlerByIdentifier = (identifier: string): QueryHandlerNode => {
    const queryHandlerNodes = this.getRootChildrenNodesByType<QueryHandlerNode>(
      BitloopsTypesMapping.TQueryHandler,
    );
    return queryHandlerNodes.find(
      (node) => node.getIdentifier().getIdentifierName() === identifier,
    );
  };

  public getDomainEventByIdentifier = (identifier: string): DomainEventDeclarationNode => {
    const domainEventNodes = this.getRootChildrenNodesByType<DomainEventDeclarationNode>(
      BitloopsTypesMapping.TDomainEvent,
    );
    return domainEventNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier);
  };

  public getIntegrationEventByIdentifier = (identifier: string): IntegrationEventNode => {
    const integrationEventNodes = this.getRootChildrenNodesByType<IntegrationEventNode>(
      BitloopsTypesMapping.TIntegrationEvent,
    );
    return integrationEventNodes.find(
      (node) => node.getIdentifier().getIdentifierName() === identifier,
    );
  };

  public getStructByIdentifier = (identifier: string): StructNode => {
    const structNodes = this.getRootChildrenNodesByType<StructNode>(BitloopsTypesMapping.TStruct);
    return structNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier);
  };

  public getPropsByIdentifier = (identifier: string): PropsNode => {
    const propsNodes = this.getRootChildrenNodesByType<PropsNode>(BitloopsTypesMapping.TProps);
    return propsNodes.find((node) => node.getIdentifier().getIdentifierName() === identifier);
  };

  public getPropsFieldTypeOfDomainCreateByFieldIdentifier(
    parameterNode: ParameterNode,
    identifier: string,
  ): TBitloopsPrimaryType | null {
    const propsNodes = this.getRootChildrenNodesByType(BitloopsTypesMapping.TProps);

    const typeNode = parameterNode.getType();
    const identifierTypeNode = typeNode.getBitloopsIdentifierTypeNode();
    const propsTypeNodeValue = identifierTypeNode.getIdentifierName();

    const isPropsNode = (node: IntermediateASTNode): node is PropsNode =>
      node.getNodeType() === BitloopsTypesMapping.TProps;

    for (const propsNode of propsNodes) {
      if (isPropsNode(propsNode) && propsNode.getIdentifierValue() === propsTypeNodeValue) {
        const fieldsListNode = propsNode.getFieldListNode();
        const fieldNodes = fieldsListNode.getFieldNodes();
        for (const fieldNode of fieldNodes) {
          const fieldIdentifier = fieldNode.getIdentifierNode();
          if (fieldIdentifier.getValue().identifier === identifier) {
            return fieldNode.getTypeNode().getValue();
          }
        }
      }
    }
    return null;
  }

  getMemberDotExpressions(intermediateASTNode: IntermediateASTNode): MemberDotExpressionNode[] {
    const policy = (node: IntermediateASTNode): boolean => node instanceof MemberDotExpressionNode;

    return this.getNodesWithPolicy(intermediateASTNode, policy) as MemberDotExpressionNode[];
  }

  getIdentifiersOfDomainEvaluations(statements: StatementNode[]): string[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (!expression || !expression.isEvaluation()) {
        return false;
      }
      const evaluation = expression.getEvaluationChild();

      const evaluationIsDomainEvaluation =
        evaluation instanceof EntityEvaluationNode ||
        evaluation instanceof ValueObjectEvaluationNode;
      if (!evaluationIsDomainEvaluation) {
        return false;
      }
      return true;
    };
    return this.getIdentifierOfVariableConstDeclaration(statements, policy);
  }

  getIdentifiersOfThisMethodCallExpressionsWithTwoMemberDots(
    statements: StatementNode[],
  ): string[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (!expression) {
        return false;
      }
      if (expression.isThisMethodCallExpressionWithTwoMemberDots()) {
        return true;
      }
      return false;
    };
    return this.getIdentifierOfVariableConstDeclaration(statements, policy);
  }

  getIdentifiersOfDomainServiceResults(statements: StatementNode[]): string[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (expression.isDomainServiceEvaluationExpression()) {
        return true;
      }
      return false;
    };
    return this.getIdentifierOfVariableConstDeclaration(statements, policy);
  }

  getIdentifiersOfPackageEvaluations(statements: StatementNode[]): string[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (!expression) {
        return false;
      }
      if (expression.isPackageEvaluationExpression()) {
        return true;
      }
      return false;
    };
    return this.getIdentifierOfVariableConstDeclaration(statements, policy);
  }

  getIdentifiersOfAggregates(
    statements: StatementNode[],
    parameters: ParameterNode[],
  ): EntityVariableIdentifier[] {
    return [
      ...this.getIdentifiersOfAggregatesFromRepoGetById(statements, parameters),
      ...this.getIdentifiersOfAggregatesFromEntityEvaluation(statements),
    ];
  }

  private getIdentifiersOfAggregatesFromRepoGetById(
    statements: StatementNode[],
    parameters: ParameterNode[],
  ): EntityVariableIdentifier[] {
    const repoGetterMethod = 'getById';
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (!expression.isThisMethodCallExpressionWithTwoMemberDots()) {
        return false;
      }
      const { methodName } = expression.getIdentifierAndMethodNameOfThisMethodCall();
      if (methodName !== repoGetterMethod) {
        return false;
      }
      return true;
    };
    const result: EntityVariableIdentifier[] = [];
    for (const statement of statements) {
      const nodes = this.getNodesWithPolicy(statement, policy) as TVariableDeclarationStatement[];

      for (const node of nodes) {
        const identifier = node.getIdentifier()?.getIdentifierName();
        // Based on our policy, these should be variable declarations with getById method calls on some repos,
        // By finding the repo, we can find the entity identifier
        const expression = node.getExpressionValues();
        const { identifier: dependencyIdentifier, methodName } =
          expression.getIdentifierAndMethodNameOfThisMethodCall();

        if (methodName !== repoGetterMethod) {
          continue;
        }

        const dependency = parameters.find(
          (parameter) => parameter.getIdentifier() === dependencyIdentifier,
        );
        if (!dependency) {
          continue;
        }
        if (!dependency.hasRepoPortType()) {
          continue;
        }
        const repoPortDependencyIdentifier = dependency
          .getType()
          .getBitloopsIdentifierTypeNode()
          .getIdentifierName();
        const reportNode = this.getRepoPortByIdentifier(repoPortDependencyIdentifier);
        if (!reportNode) {
          continue;
        }
        const entityIdentifierNode = reportNode.getEntityIdentifier();
        const isEntityRepo = entityIdentifierNode !== null;
        if (!isEntityRepo) {
          continue;
        }
        const entityIdentifier = entityIdentifierNode.getIdentifierName();
        if (identifier && entityIdentifier) {
          result.push({ identifier, entityIdentifier });
        }
      }
    }

    return result;
  }

  private getIdentifiersOfAggregatesFromEntityEvaluation(
    statements: StatementNode[],
  ): EntityVariableIdentifier[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (expression.isAggregateEvaluationExpression()) {
        return true;
      }
      return false;
    };
    const result: EntityVariableIdentifier[] = [];
    for (const statement of statements) {
      const nodes = this.getNodesWithPolicy(statement, policy) as TVariableDeclarationStatement[];

      for (const node of nodes) {
        const identifier = node.getIdentifier()?.getIdentifierName();
        // Based on our policy, these should be variable declarations with aggregate evaluation as expressions
        const expression = node.getExpressionValues();
        if (!expression.isAggregateEvaluationExpression()) {
          throw new Error('This should not happen');
        }
        const evaluation = expression.getEvaluation();
        if (!evaluation.isEntityEvaluation()) {
          throw new Error('This should not happen');
        }
        const entityIdentifier = (evaluation as EntityEvaluationNode).getEntityIdentifier();
        if (identifier && entityIdentifier) {
          result.push({ identifier, entityIdentifier });
        }
      }
    }

    return result;
  }

  getResultsOfDomainServiceMethods(
    statements: StatementNode[],
    domainServiceIdentifiers: string[],
  ): string[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (expression.isMethodCallOnIdentifier(domainServiceIdentifiers)) {
        return true;
      }
      return false;
    };

    return this.getIdentifierOfVariableConstDeclaration(statements, policy);
  }

  getResultOfAggregateMethodsThatReturnOkError(
    statements: StatementNode[],
    aggregateIdentifiers: EntityVariableIdentifier[],
  ): string[] {
    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      const entityIdentifiers = aggregateIdentifiers.map((i) => i.identifier);
      if (!expression.isMethodCallOnIdentifier(entityIdentifiers)) {
        return false;
      }
      // Now we need to find whether the method returns an OK,Error
      const { entityName, methodName } = expression.getEntityMethodCallInfo();
      const entityType = aggregateIdentifiers.find((i) => i.identifier === entityName);
      const rootEntity = this.getRootEntityByIdentifier(entityType.entityIdentifier);
      if (!rootEntity) {
        throw new Error(
          `Could not find root entity with identifier ${entityType.entityIdentifier}`,
        );
      }
      const publicMethod = rootEntity?.findPublicMethodByName(methodName);
      return publicMethod?.returnsOkError();
    };
    return this.getIdentifierOfVariableConstDeclaration(statements, policy);
  }

  getIdentifierOfVariableConstDeclaration(statements: StatementNode[], policy: Policy): string[] {
    const identifiers: string[] = [];

    for (const statement of statements) {
      const nodes = this.getNodesWithPolicy(statement, policy) as TVariableDeclarationStatement[];

      for (const node of nodes) {
        const identifier = node.getIdentifier()?.getIdentifierName();
        if (identifier) {
          identifiers.push(identifier);
        }
      }
    }

    return identifiers;
  }

  getIdentifiersOfDomainTypes(parameters: ParameterNode[]): string[] {
    const identifiers: string[] = [];

    for (const parameter of parameters) {
      const typeNode = parameter.getType();
      if (
        typeNode.isBitloopsIdentifierType() ||
        typeNode.isPrimaryWithBitloopsIdentifierTypeChild()
      ) {
        const identifierTypeNode = typeNode.getBitloopsIdentifierTypeNode();
        if (
          identifierTypeNode.isValueObjectIdentifier() ||
          identifierTypeNode.isEntityIdentifier()
        ) {
          identifiers.push(parameter.getIdentifier());
        }
      }
    }

    return identifiers;
  }

  getIdentifierExpressionNodesInStatements(
    statements: StatementNode[],
    identifiers: string[],
  ): IdentifierExpressionNode[] {
    const getIdentifierPredicate = (node: IntermediateASTNode): boolean =>
      node instanceof IdentifierExpressionNode && identifiers.includes(node.identifierName);

    const nodes: IdentifierExpressionNode[] = [];
    for (const statement of statements) {
      const identifiersOfStatements = this.getNodesWithPolicy(
        statement,
        getIdentifierPredicate,
      ) as IdentifierExpressionNode[];
      nodes.push(...identifiersOfStatements);
    }
    return nodes;
  }

  updateIdentifierExpressionNodesAfterStatement(
    baseStatement: StatementNode,
    identifierToReplace: string,
    newIdentifier: string,
  ): void {
    const nodeIsOurIdentifierPredicate = (node: IntermediateASTNode): boolean =>
      node instanceof IdentifierExpressionNode &&
      node.identifierName === identifierToReplace &&
      node.isUsedByIsInstanceOfExpression() === false;

    const nodes: IdentifierExpressionNode[] = [];
    let nextStatement = baseStatement.getNextSibling();
    while (nextStatement !== null) {
      const identifiersOfStatements = this.getNodesWithPolicy(
        nextStatement,
        nodeIsOurIdentifierPredicate,
      ) as IdentifierExpressionNode[];
      nodes.push(...identifiersOfStatements);

      nextStatement = nextStatement.getNextSibling();
    }
    nodes.forEach((node) => (node.identifierName = newIdentifier));
  }

  getReturnStatementsOfNode(intermediateASTNode: IntermediateASTNode): ReturnStatementNode[] {
    const policy = (node: IntermediateASTNode): boolean => node instanceof ReturnStatementNode;
    return this.getNodesWithPolicy(intermediateASTNode, policy) as ReturnStatementNode[];
  }

  public getMethodCallsThatUseThisDependencies(
    dependencies: string[],
    statements: StatementNode[],
  ): MethodCallExpressionNode[] {
    const policy = (node: IntermediateASTNode): boolean =>
      node instanceof MethodCallExpressionNode &&
      dependencies.some((dep) => node.isThisDependencyMethodCall(dep));

    const result = statements.reduce((acc, statement) => {
      const methodCalls = this.getNodesWithPolicy(statement, policy) as MethodCallExpressionNode[];
      return [...acc, ...methodCalls];
    }, [] as MethodCallExpressionNode[]);
    return result;
  }

  public getDomainCreateOfEntity(
    entityNode: RootEntityDeclarationNode | EntityDeclarationNode,
  ): ParameterNode {
    const domainCreate = entityNode.getDomainCreateNode();
    const propsNode = domainCreate.getParameterNode();
    return propsNode;
  }

  public getDomainCreateOfValueObject(
    valueObjectDeclarationNode: ValueObjectDeclarationNode,
  ): ParameterNode {
    const domainCreate = valueObjectDeclarationNode.getCreateNode();
    const propsNode = domainCreate.getParameterNode();
    return propsNode;
  }

  public getPropsNodeOfEntity(
    entityNode: EntityDeclarationNode | RootEntityDeclarationNode,
  ): PropsNode | null {
    const domainCreate = this.getDomainCreateOfEntity(entityNode);
    const typeNode = domainCreate.getType();
    const identifierTypeNode = typeNode.getBitloopsIdentifierTypeNode();
    const propsIdentifier = identifierTypeNode.getIdentifierName();

    const propsNodes = this.getRootChildrenNodesByType(BitloopsTypesMapping.TProps);

    const isPropsNode = (node: IntermediateASTNode): node is PropsNode =>
      node.getNodeType() === BitloopsTypesMapping.TProps;

    for (const propsNode of propsNodes) {
      if (isPropsNode(propsNode) && propsNode.getIdentifierValue() === propsIdentifier) {
        return propsNode;
      }
    }
    return null;
  }

  public getPropsNodeOfValueObject(valueObjectNode: ValueObjectDeclarationNode): PropsNode | null {
    const domainCreate = this.getDomainCreateOfValueObject(valueObjectNode);
    const typeNode = domainCreate.getType();
    const identifierTypeNode = typeNode.getBitloopsIdentifierTypeNode();
    const propsIdentifier = identifierTypeNode.getIdentifierName();

    const propsNodes = this.getRootChildrenNodesByType(BitloopsTypesMapping.TProps);

    const isPropsNode = (node: IntermediateASTNode): node is PropsNode =>
      node.getNodeType() === BitloopsTypesMapping.TProps;

    for (const propsNode of propsNodes) {
      if (isPropsNode(propsNode) && propsNode.getIdentifierValue() === propsIdentifier) {
        return propsNode;
      }
    }
    return null;
  }

  public getValueObjectFieldsWithOnePrimitiveProperty(
    fieldListNode: FieldListNode,
  ): Array<{ fieldValue: string; fieldType: TBitloopsPrimitives }> {
    const valueObjectFieldsOfProp = fieldListNode.getValueObjectFields();

    const valueObjectNodes = this.getRootChildrenNodesByType<ValueObjectDeclarationNode>(
      BitloopsTypesMapping.TValueObject,
    );
    const result: Array<{ fieldValue: string; fieldType: TBitloopsPrimitives }> = [];
    const propsNodes = this.getRootChildrenNodesByType<PropsNode>(BitloopsTypesMapping.TProps);
    const fieldsWithOnePrimitiveProperty = valueObjectFieldsOfProp.reduce((acc, field) => {
      const valueObjectIdentifier = field.fieldType;
      const valueObjectNode = this.findValueObject(valueObjectNodes, valueObjectIdentifier);
      if (!valueObjectNode) {
        throw new Error(`ValueObject ${field.fieldType} not found`);
      }
      const propsIdentifier = valueObjectNode.getPropsIdentifier();
      const valueObjectPropsNode = this.findProps(propsNodes, propsIdentifier);
      if (!valueObjectPropsNode) {
        throw new Error(`Props ${propsIdentifier} not found`);
      }
      const hasOnlyOnePrimField = valueObjectPropsNode.hasOnlyOnePrimitiveField();
      if (hasOnlyOnePrimField.result === false) {
        return acc;
      }
      const initialPropIdentifier = field.fieldValue;

      return [...acc, { fieldValue: initialPropIdentifier, fieldType: hasOnlyOnePrimField.type }];
    }, result);
    return fieldsWithOnePrimitiveProperty;
  }

  private findValueObject(
    valueObjectNodes: ValueObjectDeclarationNode[],
    identifier: string,
  ): ValueObjectDeclarationNode {
    return valueObjectNodes.find((node) => node.getIdentifierValue() === identifier);
  }

  private findProps(propsNodes: PropsNode[], identifier: string): PropsNode {
    return propsNodes.find((node) => node.getIdentifierValue() === identifier);
  }

  private getNodesWithPolicy(
    rootNode: IntermediateASTNode,
    predicate: (node: IntermediateASTNode) => boolean,
  ): IntermediateASTNode[] {
    const resultNodes: IntermediateASTNode[] = [];
    this.traverse(rootNode, (node) => {
      if (predicate(node)) {
        resultNodes.push(node);
        return;
      }
    });
    return resultNodes ?? null;
  }

  private getNodeWithPolicy(
    rootNode: IntermediateASTNode,
    predicate: (node: IntermediateASTNode) => boolean,
  ): IntermediateASTNode {
    let resultNode: IntermediateASTNode;
    this.traverse(rootNode, (node) => {
      if (predicate(node)) {
        resultNode = node;
        return;
      }
    });
    return resultNode ?? null;
  }

  getIdentifiersOfDomainServiceEvaluations(statements: StatementNode[]): string[] {
    const identifiers: string[] = [];

    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpressionValues();
      if (!expression.isEvaluation()) {
        return false;
      }
      const evaluation = expression.getEvaluationChild();

      const evaluationIsDomainServiceEvaluation = evaluation instanceof DomainServiceEvaluationNode;
      if (!evaluationIsDomainServiceEvaluation) {
        return false;
      }
      return true;
    };
    for (const statement of statements) {
      const nodes = this.getNodesWithPolicy(statement, policy) as TVariableDeclarationStatement[];

      for (const node of nodes) {
        const identifier = node.getIdentifier()?.getIdentifierName();
        if (identifier) {
          identifiers.push(identifier);
        }
      }
    }

    return identifiers;
  }

  public getMethodDefinitionTypesOfRepoPort(
    repoPortNode: RepoPortNode,
  ): Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> {
    let methodTypes: Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> = {};

    const methodDefinitionNodes = repoPortNode.getMethodDefinitionNodes();
    for (const methodDefinitionNode of methodDefinitionNodes) {
      const identifierNode = methodDefinitionNode.getIdentifierNode();
      const typeNode = methodDefinitionNode.getTypeNode();
      methodTypes[identifierNode.getIdentifierName()] = typeNode;
    }
    if (repoPortNode.isReadRepoPort()) {
      if (repoPortNode.extendsCRUDReadRepoPort) {
        const readMethodTypes = repoPortNode.getReadMethodTypes();
        methodTypes = { ...methodTypes, ...readMethodTypes };
      }
    } else if (repoPortNode.isWriteRepoPort()) {
      if (repoPortNode.extendsCRUDWriteRepoPort) {
        const writeMethodTypes = repoPortNode.getWriteMethodTypes();
        methodTypes = { ...methodTypes, ...writeMethodTypes };
      }
    }
    const extendIdentifiers = repoPortNode.getExtendsRepoPortIdentifiersExcludingCRUDOnes();
    for (const extendIdentifier of extendIdentifiers) {
      const extendedRepoPortNode = this.getRepoPortByIdentifier(extendIdentifier);
      return { ...methodTypes, ...this.getMethodDefinitionTypesOfRepoPort(extendedRepoPortNode) };
    }

    return methodTypes;
  }
}
