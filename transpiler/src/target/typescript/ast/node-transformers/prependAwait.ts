import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { MethodCallExpressionNode } from '../../../../ast/core/intermediate-ast/nodes/Expression/MethodCallExpression.js';
import { IntermediateASTNode } from '../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { StatementNode } from '../../../../ast/core/intermediate-ast/nodes/statements/Statement.js';

interface NodeWithDependencies extends IntermediateASTNode {
  getAllDependenciesIdentifiers(): string[];
  getStatements(): StatementNode[];
}

export class PrependAwaitNodeTSTransformer {
  constructor(private node: NodeWithDependencies, private tree: IntermediateASTTree) {}

  run(): void {
    this.prependAwaitToAllDependencyCalls();
  }

  private prependAwaitToAllDependencyCalls(): void {
    const useCaseDependencies = this.node.getAllDependenciesIdentifiers();
    if (!useCaseDependencies.length) {
      return;
    }
    this.prependAwaitToDependencies(useCaseDependencies);
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
}
