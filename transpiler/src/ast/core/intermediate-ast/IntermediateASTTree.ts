import { TBitloopsTypesValues, BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { ExpressionNode } from './nodes/Expression/ExpressionNode.js';
import { IntermediateASTNode } from './nodes/IntermediateASTNode.js';
import { IntermediateASTRootNode } from './nodes/RootNode.js';
import { StatementNode } from './nodes/statements/Statement.js';
import { isArray, isObject } from '../../../helpers/typeGuards.js';
import { IdentifierExpressionNode } from './nodes/Expression/IdentifierExpression.js';
import { TControllerUseCaseExecuteNodeType, TVariableDeclarationStatement } from '../types.js';
import { MethodCallExpressionNode } from './nodes/Expression/MethodCallExpression.js';
import { ConstDeclarationNode } from './nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './nodes/variableDeclaration.js';
import { EntityEvaluationNode } from './nodes/Expression/Evaluation/EntityEvaluation.js';
import { ValueObjectEvaluationNode } from './nodes/Expression/Evaluation/ValueObjectEvaluation.js';

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

  public getClassTypeNodes(nodeType: TBitloopsTypesValues): IntermediateASTNode[] {
    const rootChildren = this.rootNode.getChildren();
    const classTypeNodes = [];
    for (const child of rootChildren) {
      if (child.getNodeType() === nodeType) {
        classTypeNodes.push(child);
      }
    }
    return classTypeNodes;
  }

  public mergeWithTree(tree: IntermediateASTTree): IntermediateASTTree {
    tree.rootNode.getChildren().map((childNode) => {
      this.rootNode.addChild(childNode);
    });
    return this;
  }

  // private getContextNodesByType(
  //   nodeType: NODE_TYPES,
  //   contextNode: IntermediateASTNode,
  // ): IntermediateASTNode<nodeType>[] {
  //   const children = contextNode.getChildren();
  //   for (const child of children) {
  //     if (nodeType === child.getType()) {
  //     }
  //   }

  //   while (children.length != 0) {
  //     for (const child of children) {
  //       if (nodeType === child.getType()) {
  //       }
  //       children = child.getChildren();
  //     }
  //   }
  // }

  // private getNodesByType(nodeType: TBitloopsTypesValues): IntermediateASTNode[] {

  //   for (const child of children) {
  //     if (nodeType === child.getType()) {
  //     }
  //   }

  //   while (children.length != 0) {
  //     for (const child of children) {
  //       if (nodeType === child.getType()) {
  //       }
  //       children = child.getChildren();
  //     }
  //   }
  // }

  // private traverse() {
  //   // ignore root -- root acts as a container
  //   let node = this.rootNode.getFirstChild();
  //   while (node != null) {
  //     if (node.hasChildren()) {
  //       node = node.getFirstChild();
  //     } else {
  //       // leaf, find the parent level
  //       while (node.getNextSibling() == null && node != this.rootNode) {
  //         // use child-parent link to get to the parent level
  //         node = node.getParent();
  //       }
  //       node = node.getNextSibling();
  //     }
  //   }
  // }

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

  // public getAllUseCases(): IntermediateASTNode[] {
  //   return this.findNodes(NODE_TYPES.USE_CASE);
  // }

  public getAllExpressionsOfUseCase(): ExpressionNode[] {
    // Set root Node as current, or pass it to getClassTypeNodes
    const useCases = this.getClassTypeNodes(BitloopsTypesMapping.TUseCase);

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

  getIdentifiersOfDomainEvaluations(statements: StatementNode[]): string[] {
    const identifiers: string[] = [];

    const policy = (node: IntermediateASTNode): boolean => {
      const statementIsVariableDeclaration =
        node instanceof ConstDeclarationNode || node instanceof VariableDeclarationNode;
      if (!statementIsVariableDeclaration) {
        return false;
      }
      const expression = node.getExpression();
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

  getIdentifierExpressionNodesInStatements(
    statements: StatementNode[],
    identifiers: string[],
  ): IdentifierExpressionNode[] {
    const predicate = (node: IntermediateASTNode): boolean =>
      node instanceof IdentifierExpressionNode && identifiers.includes(node.identifierName);

    const nodes: IdentifierExpressionNode[] = [];
    for (const statement of statements) {
      const identifiersOfStatements = this.getNodesWithPolicy(
        statement,
        predicate,
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
    const predicate = (node: IntermediateASTNode): boolean =>
      node instanceof IdentifierExpressionNode && node.identifierName === identifierToReplace;

    const nodes: IdentifierExpressionNode[] = [];
    let nextStatement = baseStatement.getNextSibling();
    while (nextStatement !== null) {
      const identifiersOfStatements = this.getNodesWithPolicy(
        nextStatement,
        predicate,
      ) as IdentifierExpressionNode[];
      nodes.push(...identifiersOfStatements);

      nextStatement = nextStatement.getNextSibling();
    }
    nodes.forEach((node) => (node.identifierName = newIdentifier));
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

  // private getNodesAfterPolicy<T = IntermediateASTNode>(
  //   rootNode: IntermediateASTNode,
  //   predicate: (node: IntermediateASTNode) => boolean,
  // ): T[] {
  //   const resultNodes: T[] = [];
  //   let useCaseExecuteFound = false;
  //   this.traverse(rootNode, (node) => {
  //     if (predicate(node)) {
  //       useCaseExecuteFound = true;
  //       return;
  //     }
  //     if (useCaseExecuteFound) {
  //       resultNodes.push(node as T);
  //     }
  //   });
  //   return resultNodes;
  // }

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
