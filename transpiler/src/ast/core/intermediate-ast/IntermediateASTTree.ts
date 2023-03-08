import { TBitloopsTypesValues, BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { ExpressionNode } from './nodes/Expression/ExpressionNode.js';
import { IntermediateASTNode } from './nodes/IntermediateASTNode.js';
import { IntermediateASTRootNode } from './nodes/RootNode.js';
import { StatementNode } from './nodes/statements/Statement.js';
import { ReturnStatementNode } from './nodes/statements/ReturnStatementNode.js';
import { isArray, isObject } from '../../../helpers/typeGuards.js';
import { IdentifierExpressionNode } from './nodes/Expression/IdentifierExpression.js';
import { MemberDotExpressionNode } from './nodes/Expression/MemberDot/MemberDotExpression.js';
import { TControllerUseCaseExecuteNodeType, TVariableDeclarationStatement } from '../types.js';
import { MethodCallExpressionNode } from './nodes/Expression/MethodCallExpression.js';
import { ConstDeclarationNode } from './nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './nodes/variableDeclaration.js';
import { EntityEvaluationNode } from './nodes/Expression/Evaluation/EntityEvaluation.js';
import { ValueObjectEvaluationNode } from './nodes/Expression/Evaluation/ValueObjectEvaluation.js';
import { RootEntityDeclarationNode } from './nodes/RootEntity/RootEntityDeclarationNode.js';
import { EntityIdentifierNode } from './nodes/Entity/EntityIdentifierNode.js';
import { TBitloopsPrimaryType, TBitloopsPrimitives } from '../../../types.js';
import { PropsNode } from './nodes/Props/PropsNode.js';
import { RESTControllerNode } from './nodes/controllers/restController/RESTControllerNode.js';
import { EntityDeclarationNode } from './nodes/Entity/EntityDeclarationNode.js';
import { ValueObjectDeclarationNode } from './nodes/valueObject/ValueObjectDeclarationNode.js';
import { FieldListNode } from './nodes/FieldList/FieldListNode.js';
import { ReadModelNode } from './nodes/readModel/ReadModelNode.js';
import { ParameterNode } from './nodes/ParameterList/ParameterNode.js';

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

  public getControllerByIdentifier = (identifier: string): RESTControllerNode => {
    const restControllerNodes = this.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRESTController,
    ) as RESTControllerNode[];

    let restControllerFound: RESTControllerNode = null;
    for (const restController of restControllerNodes) {
      const restControllerIdentifier = restController.getIdentifier();

      if (identifier === restControllerIdentifier.getValue().RESTControllerIdentifier) {
        restControllerFound = restController;
      }
    }

    return restControllerFound;
  };

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

    let rootEntityFound: RootEntityDeclarationNode = null;
    for (const rootEntityNode of rootEntityNodes) {
      const entityIdentifier = rootEntityNode.getIdentifier();

      if (identifier === entityIdentifier.getValue().entityIdentifier) {
        rootEntityFound = rootEntityNode;
      }
    }

    return rootEntityFound;
  };

  public getValueObjectByIdentifier = (identifier: string): ValueObjectDeclarationNode => {
    const valueObjectDeclarationNodes = this.getRootChildrenNodesByType(
      BitloopsTypesMapping.TValueObject,
    ) as ValueObjectDeclarationNode[];

    let valueObjectFound: ValueObjectDeclarationNode = null;
    for (const valueObjectNode of valueObjectDeclarationNodes) {
      const valueObjectIdentifier = valueObjectNode.getIdentifier();

      if (identifier === valueObjectIdentifier) {
        valueObjectFound = valueObjectNode;
      }
    }

    return valueObjectFound;
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

  public getAllExpressionsOfUseCase(): ExpressionNode[] {
    // Set root Node as current, or pass it to getClassTypeNodes
    const useCases = this.getRootChildrenNodesByType(BitloopsTypesMapping.TUseCase);

    // TODO typeGuard
    const isExpressionNode = (node: IntermediateASTNode): node is ExpressionNode =>
      node.getNodeType() === BitloopsTypesMapping.TExpression;

    const expressions: ExpressionNode[] = [];
    for (const useCaseNode of useCases) {
      this.traverse(useCaseNode, (node) => isExpressionNode(node) && expressions.push(node));
    }
    return expressions;
  }

  getUseCaseExecuteStatementOf(
    rootNode: IntermediateASTNode,
  ): TControllerUseCaseExecuteNodeType | null {
    const policy = (node: IntermediateASTNode): boolean =>
      node instanceof StatementNode && node.isUseCaseExecuteStatementNode();

    const nodeResult = this.getNodeWithPolicy(rootNode, policy);
    if (!nodeResult) {
      return null;
    }
    return nodeResult as TControllerUseCaseExecuteNodeType;
  }

  getMemberDotExpressions(intermediateASTNode: IntermediateASTNode): MemberDotExpressionNode[] {
    const policy = (node: IntermediateASTNode): boolean => node instanceof MemberDotExpressionNode;

    return this.getNodesWithPolicy(intermediateASTNode, policy) as MemberDotExpressionNode[];
  }

  getIdentifiersOfDomainEvaluations(statements: StatementNode[]): string[] {
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

      const evaluationIsDomainEvaluation =
        evaluation instanceof EntityEvaluationNode ||
        evaluation instanceof ValueObjectEvaluationNode;
      if (!evaluationIsDomainEvaluation) {
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
    return valueObjectNodes.find((node) => node.getIdentifier() === identifier);
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
}
