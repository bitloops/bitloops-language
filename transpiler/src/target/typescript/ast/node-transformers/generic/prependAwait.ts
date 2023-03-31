import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
// import { IdentifierExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { MethodCallExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/MethodCallExpression.js';
import { IntermediateASTNode } from '../../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { StatementNode } from '../../../../../ast/core/intermediate-ast/nodes/statements/Statement.js';

interface NodeWithDependencies extends IntermediateASTNode {
  getAllDependenciesIdentifiers(): string[];
  getStatements(): StatementNode[];
}

export class PrependAwaitNodeTSTransformer {
  constructor(private node: NodeWithDependencies, private tree: IntermediateASTTree) {}

  public prependAwaitToAllDependencyCalls(extraDependencies: string[] = []): void {
    const methodDependencies = this.node.getAllDependenciesIdentifiers();
    methodDependencies.push(...extraDependencies);
    if (!methodDependencies.length) {
      return;
    }
    this.prependAwaitToDependencies(methodDependencies);
  }

  private prependAwaitToDependencies(dependencies: string[]): void {
    const statements = this.node.getStatements();
    const methodCallNodes = this.tree.getMethodCallsThatUseThisDependencies(
      dependencies,
      statements,
    );
    methodCallNodes.forEach((node) => this.prependAwaitToMethodCallNode(node));
  }

  private prependAwaitToMethodCallNode(node: MethodCallExpressionNode): void {
    const thisNode = node.getThisNode();
    thisNode.updateValue('await this');
  }

  public prependAwaitToDomainServiceEvaluationNode(): void {
    const statements = this.node.getStatements();
    const identifiersToBeUpdated = this.tree.getIdentifiersOfDomainServiceEvaluations(statements);
    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );
    identifierExpressionNodes.forEach((node) => {
      node.identifierName = this.prependAwait(node.identifierName);
    });
  }

  private prependAwait(str: string): string {
    return `await ${str}`;
  }
}
