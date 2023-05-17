import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { StatementNode } from '../nodes/statements/Statement.js';
import { SwitchStatementNode } from '../nodes/statements/SwitchStatement/SwitchStatementNode.js';
import { IfStatementNode } from '../nodes/statements/ifStatement/IfStatementNode.js';
import { VariableDeclarationNode } from '../nodes/statements/variableDeclaration.js';
import { ConstDeclarationNode } from '../nodes/statements/ConstDeclarationNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { BuiltInFunctionNode } from '../nodes/statements/builtinFunction/BuiltinFunctionNode.js';

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

  static isReturnStatement(node: StatementNode): node is ReturnStatementNode {
    return node.getNodeType() === BitloopsTypesMapping.TReturnStatement;
  }

  static isExpressionStatement(node: StatementNode): node is ExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TExpression;
  }

  static isBuiltInFunctionStatement(node: StatementNode): node is BuiltInFunctionNode {
    return node.getNodeType() === BitloopsTypesMapping.TBuiltInFunction;
  }
}
