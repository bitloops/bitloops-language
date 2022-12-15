import { BitloopsLanguageASTContext } from '../../parser/index.js';
import { TBoundedContexts } from '../../types.js';
import { ExpressionNode } from './intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from './intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './intermediate-ast/nodes/variableDeclaration.js';

export type BitloopsIntermediateASTError =
  | IntermediateASTParserError
  | IntermediateASTValidationError[];

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTError;
}

export class IntermediateASTParserError extends Error {}
export class IntermediateASTValidationError extends Error {}

export interface IIntermediateASTValidator {
  validate: (ast: TBoundedContexts) => void | IntermediateASTValidationError[];
}

export type TControllerUseCaseExecuteNodeType =
  | ConstDeclarationNode
  | VariableDeclarationNode
  | ExpressionNode;

export type TVariableDeclarationStatement = ConstDeclarationNode | VariableDeclarationNode;
