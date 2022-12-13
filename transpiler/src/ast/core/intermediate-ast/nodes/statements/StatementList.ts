import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';

export class StatementListNode extends IntermediateASTNode {
  private static classNodeName = 'statements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStatements, metadata, StatementListNode.classNodeName);
  }

  get statements(): StatementNode[] {
    return this.getChildren() as StatementNode[];
  }

  getExpressionOfDeclaredIdentifier(identifierName: string): ExpressionNode | null {
    let expression: ExpressionNode = null;
    for (const statement of this.statements) {
      if (statement.isConstDeclarationNode() || statement.isVariableDeclarationNode()) {
        const identifierNode = statement.getIdentifier();
        if (identifierName === identifierNode.getIdentifierName()) {
          expression = statement.getExpression();
        }
      }
    }
    return expression;
  }
}
