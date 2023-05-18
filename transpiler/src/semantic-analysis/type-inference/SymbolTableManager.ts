import { IntermediateASTTree } from '../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTNode } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { TBoundedContexts } from '../../ast/core/types.js';
import { ClassTypeParameterSymbolEntry, ClassTypeThisSymbolEntry } from './SymbolEntry.js';
import { SymbolTable } from './SymbolTable.js';

type TStatementListCounters = {
  ifCounter: number;
  elseCounter: number;
  switchCounter: number;
  ifErrorCounter: number;
  caseCounter: number;
};

export class SymbolTableManager {
  public static readonly UNKNOWN_TYPE = 'unknown';
  public static readonly THIS = 'this';
  public static readonly SCOPE_NAMES = {
    EXECUTE: 'execute',
    SWITCH: 'switch',
    CASE: 'case',
    DEFAULT: 'default',
    IF: 'if',
    ELSE: 'else',
    DOMAIN_CREATE: 'domainCreate',
    HANDLE: 'handle',
    IF_ERROR: 'ifError',
  };
  private symbolTable: SymbolTable;
  private intermediateASTTree: IntermediateASTTree;
  private boundedContexts: TBoundedContexts;
  private statementListCounters: TStatementListCounters;

  constructor(intermediateASTTree: IntermediateASTTree, boundedContexts: TBoundedContexts) {
    this.intermediateASTTree = intermediateASTTree;
    this.boundedContexts = boundedContexts;
  }

  public setCurrentSymbolTable(symbolTable: SymbolTable): void {
    this.symbolTable = symbolTable;
  }

  public getSymbolTable(): SymbolTable {
    return this.symbolTable;
  }

  public getBoundedContexts(): TBoundedContexts {
    return this.boundedContexts;
  }

  public addClassTypeThis(name: string): void {
    this.symbolTable.insert(SymbolTableManager.THIS, new ClassTypeThisSymbolEntry(name));
  }

  public createSymbolTableChildScope(scopeName: string, node: IntermediateASTNode): SymbolTable {
    const childScope = this.symbolTable.createChildScope(scopeName, node);
    this.symbolTable = childScope;
    return this.symbolTable;
  }

  public addIntegrationEventBus(): void {
    const integrationEventBusKey = this.joinThisWithIdentifier('integrationEventBus');
    this.symbolTable.insert(
      integrationEventBusKey,
      new ClassTypeParameterSymbolEntry('IntegrationEventBusPort'),
    );
  }

  public addCommandQueryBus(): void {
    const commandBusKey = this.joinThisWithIdentifier('commandBus');
    const queryBusKey = this.joinThisWithIdentifier('queryBus');
    this.symbolTable.insert(commandBusKey, new ClassTypeParameterSymbolEntry('CommandBusPort'));
    this.symbolTable.insert(queryBusKey, new ClassTypeParameterSymbolEntry('QueryBusPort'));
  }

  public initializeStatementListCounters(): void {
    this.statementListCounters = {
      ifCounter: 0,
      elseCounter: 0,
      switchCounter: 0,
      ifErrorCounter: 0,
      caseCounter: 0,
    };
  }

  public increaseElseCounter(): string {
    return `${this.statementListCounters.elseCounter++}`;
  }

  public increaseIfCounter(): string {
    return `${this.statementListCounters.ifCounter++}`;
  }

  public increaseSwitchCounter(): string {
    this.statementListCounters.caseCounter = 0;
    return `${this.statementListCounters.switchCounter++}`;
  }

  public increaseCaseCounter(): string {
    return `${this.statementListCounters.switchCounter}${this.statementListCounters.caseCounter++}`;
  }

  public getSwitchCounter(): string {
    return `${this.statementListCounters.switchCounter}`;
  }

  public increaseIfErrorCounter(): string {
    return `${this.statementListCounters.ifErrorCounter++}`;
  }

  private joinThisWithIdentifier(identifier: string): string {
    return SymbolTableManager.THIS + '.' + identifier;
  }

  public getIntermediateASTTree(): IntermediateASTTree {
    return this.intermediateASTTree;
  }

  public joinWithDot(memberDotMembers: string[]): string {
    return memberDotMembers.join('.');
  }
}
