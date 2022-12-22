import { OriginalAST } from '../../parser/index.js';
import { TBoundedContexts } from '../../types.js';
import { IntermediateASTTree } from './intermediate-ast/IntermediateASTTree.js';
import { ExpressionNode } from './intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from './intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './intermediate-ast/nodes/variableDeclaration.js';

export type IntermediateAST = {
  core: TBoundedContexts;
  setup?: IntermediateASTTree;
};

export type IntermediateASTError = IntermediateASTParserError[] | IntermediateASTValidationError[];

export interface IIntermediateASTParser {
  parse: (ast: OriginalAST) => IntermediateAST | IntermediateASTError;
}

export class IntermediateASTParserError extends Error {}
export class IntermediateASTValidationError extends Error {}

export interface IIntermediateASTValidator {
  validate: (ast: IntermediateAST) => void | IntermediateASTValidationError[];
}

export type TControllerUseCaseExecuteNodeType =
  | ConstDeclarationNode
  | VariableDeclarationNode
  | ExpressionNode;

export type TVariableDeclarationStatement = ConstDeclarationNode | VariableDeclarationNode;
