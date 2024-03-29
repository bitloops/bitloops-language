import { OriginalAST } from '../../parser/index.js';
import type { TSymbolTableSemantics } from '../../semantic-analysis/type-inference/types.js';
import { IntermediateASTTree } from './intermediate-ast/IntermediateASTTree.js';
import { TNodeMetadata } from './intermediate-ast/nodes/IntermediateASTNode.js';
import { ConstDeclarationNode } from './intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { VariableDeclarationNode } from './intermediate-ast/nodes/statements/variableDeclaration.js';

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

export type ValidationErrors = ValidationError[];
export interface IIntermediateASTParser {
  parse: (ast: OriginalAST) => IntermediateAST;
  complete: (ast: IntermediateAST) => IntermediateAST;
}

export class ValidationError extends Error {
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

export class MissingIdentifierError extends ValidationError {
  constructor(identifier: string, metadata: TNodeMetadata) {
    super(`Identifier ${identifier} not defined.`, metadata);
  }
}

export class AlreadyDefinedIdentifierError extends ValidationError {
  constructor(identifier: string, metadata: TNodeMetadata) {
    super(`Identifier ${identifier} is already defined.`, metadata);
  }
}

export class ConstVariableReassingedError extends ValidationError {
  constructor(identifier: string, metadata: TNodeMetadata) {
    super(`Cannot reassign constant variable ${identifier}.`, metadata);
  }
}

export class MissingMemberError extends ValidationError {
  constructor(member: string, dotExpression: string, metadata: TNodeMetadata) {
    super(`Member ${member} not defined in ${dotExpression}.`, metadata);
  }
}

export class AccessViolationError extends ValidationError {
  constructor(
    member: string,
    leftExpressionString: string,
    contextType: string,
    metadata: TNodeMetadata,
  ) {
    super(
      `Access violation: Attempt to call the private method '${member}' from outside its authorized context (${contextType}: '${leftExpressionString}').`,
      metadata,
    );
  }
}

export interface IIntermediateASTValidator {
  validate: (ast: IntermediateAST) => void | ValidationError[];
  getSymbolTable: (ast: IntermediateAST) => TSymbolTableSemantics;
}

export type TVariableDeclarationStatement = ConstDeclarationNode | VariableDeclarationNode;
