import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { StatementNode } from '../nodes/statements/Statement.js';
import { SwitchStatementNode } from '../nodes/statements/SwitchStatement/SwitchStatementNode.js';
import { IfStatementNode } from '../nodes/statements/ifStatement/IfStatementNode.js';
import { VariableDeclarationNode } from '../nodes/variableDeclaration.js';
import { ConstDeclarationNode } from '../nodes/statements/ConstDeclarationNode.js';

export class StatementNodeTypeGuards {
  static isVariableDeclarationStatement(node: StatementNode): node is VariableDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TVariableDeclaration;
  }

  static isConstantDeclarationStatement(node: StatementNode): node is ConstDeclarationNode {
    return node.getNodeType() === BitloopsTypesMapping.TConstDeclaration;
  }

  static isIfStatement(node: StatementNode): node is IfStatementNode {
    return node.getNodeType() === BitloopsTypesMapping.TIfStatement;
  }

  static isSwitchStatement(node: StatementNode): node is SwitchStatementNode {
    return node.getNodeType() === BitloopsTypesMapping.TSwitchStatement;
  }
}
