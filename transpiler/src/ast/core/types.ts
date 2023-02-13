import { OriginalAST } from '../../parser/index.js';
import { IntermediateASTTree } from './intermediate-ast/IntermediateASTTree.js';
import { ExpressionNode } from './intermediate-ast/nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from './intermediate-ast/nodes/IntermediateASTNode.js';
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

export type IntermediateASTError = IntermediateASTValidationError[];
export interface IIntermediateASTParser {
  parse: (ast: OriginalAST) => IntermediateAST;
  complete: (ast: IntermediateAST) => IntermediateAST;
}

export class IntermediateASTValidationError extends Error {
  private _metadata: TNodeMetadata;
  private _message: string;
  constructor(message: string, metadata: TNodeMetadata) {
    super(message);
    this._message = message;
    this._metadata = metadata;
  }

  get metadata(): TNodeMetadata {
    return this._metadata;
  }

  get message(): string {
    return this._message;
  }
}

export interface IIntermediateASTValidator {
  validate: (ast: IntermediateAST) => void | IntermediateASTValidationError[];
}

export type TControllerUseCaseExecuteNodeType =
  | ConstDeclarationNode
  | VariableDeclarationNode
  | ExpressionNode;

export type TVariableDeclarationStatement = ConstDeclarationNode | VariableDeclarationNode;
