import { OriginalAST } from '../../parser/index.js';
import { IntermediateASTTree } from './intermediate-ast/IntermediateASTTree.js';
import { ExpressionNode } from './intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from './intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './intermediate-ast/nodes/variableDeclaration.js';

export type IntermediateAST = {
  core: TBoundedContexts;
  setup?: IntermediateASTSetup;
};

export type TModuleName = string;
export type TBoundedContext = Record<TModuleName, IntermediateASTTree>;

export type TBoundedContextName = string;
export type TBoundedContexts = Record<TBoundedContextName, TBoundedContext>;

export type IntermediateASTSetup = {
  [fileId: string]: IntermediateASTTree;
};

export type IntermediateASTError = IntermediateASTParserError[] | IntermediateASTValidationError[];

export interface IIntermediateASTParser {
  parse: (ast: OriginalAST) => IntermediateAST | IntermediateASTError;
}

export class IntermediateASTParserError extends Error {}
export class IntermediateASTValidationError extends Error {}

export interface IIntermediateASTValidator {
  validate: (ast: IntermediateAST) => void | IntermediateASTValidationError[];
  createSymbolTable: (ast: IntermediateAST) => void;
}

export type TControllerUseCaseExecuteNodeType =
  | ConstDeclarationNode
  | VariableDeclarationNode
  | ExpressionNode;

export type TVariableDeclarationStatement = ConstDeclarationNode | VariableDeclarationNode;
