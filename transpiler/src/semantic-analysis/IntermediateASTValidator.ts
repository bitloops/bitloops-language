/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { BitloopsTypesMapping } from '../helpers/mappings.js';
import {
  IIntermediateASTValidator,
  IntermediateAST,
  IntermediateASTSetup,
  ValidationError,
  TBoundedContexts,
  TBoundedContextName,
} from '../ast/core/types.js';
import { IntermediateASTTree } from '../ast/core/intermediate-ast/IntermediateASTTree.js';
import { ArgumentNode } from '../ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { BitloopsIdentifierTypeNode } from '../ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { DomainRuleIdentifierNode } from '../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { EntityIdentifierNode } from '../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { DomainServiceEvaluationNode } from '../ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { IntermediateASTNode } from '../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { ReadModelIdentifierNode } from '../ast/core/intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import {
  bitloopsIdentifierError,
  domainRuleIdentifierError,
  errorIdentifierError,
  argumentError,
  readModelIdentifierError,
  domainServiceEvaluationError,
  entityIdentifierError,
} from './validators/index.js';
import { SymbolTable } from './type-inference/SymbolTable.js';
import { InferredTypes } from './type-inference/ASTTypeInference.js';
import { ClassTypeNodeTypeGuards } from '../ast/core/intermediate-ast/type-guards/class-type.type-guard.js';
import { StatementNode } from '../ast/core/intermediate-ast/nodes/statements/Statement.js';
import { StatementNodeTypeGuards } from '../ast/core/intermediate-ast/type-guards/statementTypeGuards.js';
import { ErrorIdentifierNode } from '../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';

export class SemanticAnalyzer implements IIntermediateASTValidator {
  //   private symbolTableCore: Record<string, Set<string>>;
  private symbolTableSetup: Record<string, Set<string>>;

  private symbolTable: Record<TBoundedContextName, SymbolTable> = {};
  private errors: ValidationError[] = [];

  constructor() {
    // this.symbolTableCore = {};
    this.symbolTableSetup = {};
  }

  validate(ast: IntermediateAST): void | ValidationError[] {
    this.createSymbolTable(ast.core);
    this.validateCore(ast.core);
    // if (errors.length > 0) return errors;
    this.validateSetup(ast.setup);
    if (this.errors.length > 0) return this.errors;
  }

  private addError(...errors: ValidationError[]): void {
    this.errors.push(...errors);
  }

  public getSymbolTable(ast: IntermediateAST): Record<TBoundedContextName, SymbolTable> {
    this.createSymbolTable(ast.core);
    return this.symbolTable;
  }

  //   public createSymbolTablesCore(core: TBoundedContexts): void {
  //     for (const [boundedContextName, boundedContext] of Object.entries(core)) {
  //       this.symbolTableCore[boundedContextName] = new Set();
  //       for (const ASTTree of Object.values(boundedContext)) {
  //         ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
  //           switch (node.getNodeType()) {
  //             case BitloopsTypesMapping.TRootEntity: {
  //               const identifierNode = (node as RootEntityDeclarationNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TEntity: {
  //               const identifierNode = (node as EntityDeclarationNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TProps: {
  //               const identifierNode = (node as PropsNode).getPropsIdentifierNode();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TValueObject: {
  //               const identifier = (node as ValueObjectDeclarationNode).getIdentifierValue();
  //               this.symbolTableCore[boundedContextName].add(identifier);
  //               break;
  //             }
  //             case BitloopsTypesMapping.TDomainError: {
  //               const identifierNode = (node as DomainErrorNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(
  //                 'DomainErrors.' + identifierNode.getIdentifierName(),
  //               );
  //               break;
  //             }
  //             case BitloopsTypesMapping.TApplicationError: {
  //               const identifierNode = (node as ApplicationErrorNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(
  //                 'ApplicationErrors.' + identifierNode.getIdentifierName(),
  //               );
  //               break;
  //             }
  //             case BitloopsTypesMapping.TDTO: {
  //               const identifierNode = (node as DTONode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TRepoPort: {
  //               const identifierNode = (node as RepoPortNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TStruct: {
  //               const identifierNode = (node as StructNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TReadModel: {
  //               const identifierNode = (node as ReadModelNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TDomainRule: {
  //               const identifierNode = (node as DomainRuleNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TPackagePort: {
  //               const identifier = (node as PackagePortNode).identifier;
  //               this.symbolTableCore[boundedContextName].add(identifier);
  //               break;
  //             }
  //             case BitloopsTypesMapping.TCommand: {
  //               const identifierNode = (node as CommandDeclarationNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TQuery: {
  //               const identifierNode = (node as QueryDeclarationNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TDomainEvent: {
  //               const identifierNode = (node as DomainEventDeclarationNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TIntegrationEvent: {
  //               const identifier = (node as IntegrationEventNode).getIntegrationEventIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifier);
  //               break;
  //             }
  //             case BitloopsTypesMapping.TServicePort: {
  //               const identifierNode = (node as ServicePortNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //             case BitloopsTypesMapping.TDomainService: {
  //               const identifierNode = (node as DomainServiceNode).getIdentifier();
  //               this.symbolTableCore[boundedContextName].add(identifierNode.getIdentifierName());
  //               break;
  //             }
  //           }
  //         });
  //       }
  //     }
  //   }

  private createSymbolTable(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      const globalScope = new SymbolTable();
      this.symbolTable[boundedContextName] = globalScope;

      for (const ASTTree of Object.values(boundedContext)) {
        const classTypeNodes = ASTTree.getClassTypeNodes();
        classTypeNodes.forEach((node) => {
          const identifierNode = node.getIdentifier();
          const name = identifierNode.getIdentifierName();
          const classTypeScope = globalScope.createChildScope(name, node);

          if (ClassTypeNodeTypeGuards.isCommandHandler(node)) {
            const params = node.getParameters();
            params.forEach((paramNode) => {
              const paramName = paramNode.getIdentifier();
              classTypeScope.insert(paramName, InferredTypes.Unknown);
            });

            const execute = node.getExecute();
            const executeScope = classTypeScope.createChildScope('execute', execute);
            const executeParams = node.getMethodParameters();
            executeParams.forEach((paramNode) => {
              const paramName = paramNode.getIdentifier();
              executeScope.insert(paramName, InferredTypes.Unknown);
            });
            const statements = node.getStatements();
            this.createStatementListScope(statements, executeScope);
          }
        });
      }
    }
  }

  private createStatementListScope(
    statements: StatementNode[],
    parentScope: SymbolTable,
  ): SymbolTable {
    let ifCounter = 0;
    let elseCounter = 0;
    let switchCounter = 0;
    statements.forEach((statement) => {
      if (StatementNodeTypeGuards.isVariableDeclarationStatement(statement)) {
        const identifier = statement.getIdentifier().getIdentifierName();
        parentScope.insert(identifier, InferredTypes.Unknown);
      }

      if (StatementNodeTypeGuards.isConstantDeclarationStatement(statement)) {
        const identifier = statement.getIdentifier().getIdentifierName();
        parentScope.insert(identifier, InferredTypes.Unknown);
      }

      if (StatementNodeTypeGuards.isIfStatement(statement)) {
        const ifScope = parentScope.createChildScope('if' + ifCounter++, statement);
        const thenStatements = statement.getThenStatements();
        this.createStatementListScope(thenStatements, ifScope);
        if (statement.hasElseBlock()) {
          const elseStatements = statement.getElseStatements();
          const elseScope = parentScope.createChildScope('else' + elseCounter++, statement);
          this.createStatementListScope(elseStatements, elseScope);
        }
      }

      if (StatementNodeTypeGuards.isSwitchStatement(statement)) {
        const switchScope = parentScope.createChildScope('switch' + switchCounter++, statement);
        const switchCases = statement.getCases();
        switchCases.forEach((switchCase, index) => {
          const caseScope = switchScope.createChildScope('case' + index, switchCase);
          const caseStatements = switchCase.getStatements();
          this.createStatementListScope(caseStatements, caseScope);
        });
        const defaultCase = statement.getDefaultCase();
        const defaultScope = switchScope.createChildScope('default', defaultCase);
        const defaultStatements = defaultCase.getStatements();
        this.createStatementListScope(defaultStatements, defaultScope);
      }
    });
    return parentScope;
  }

  private validateCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        this.validateNodes(ASTTree, boundedContextName);

        this.validateClassTypeNodesCore(ASTTree, boundedContextName);
      }
    }
  }

  private validateSetup(setup: IntermediateASTSetup): void {
    for (const [fileId, ASTTree] of Object.entries(setup)) {
      this.validateClassTypeNodesSetup(ASTTree, fileId);
    }
  }

  //isn't being used right now
  private validateNodes(ASTTree: IntermediateASTTree, boundedContextName: string): void {
    // ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
    //   const validationRes = node.validate(this.symbolTableCore[boundedContextName]);
    //   if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
    //     this.addError(validationRes);
    // });
  }

  private validateClassTypeNodesCore(ASTTree: IntermediateASTTree, boundedContext: string): void {
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TBitloopsIdentifier:
          this.addError(
            ...bitloopsIdentifierError(
              node as BitloopsIdentifierTypeNode,
              this.symbolTable[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TEntityIdentifier:
          this.addError(
            ...entityIdentifierError(
              node as EntityIdentifierNode,
              this.symbolTable[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TReadModelIdentifier:
          this.addError(
            ...readModelIdentifierError(
              node as ReadModelIdentifierNode,
              this.symbolTable[boundedContext],
            ),
          );
          break;

        case BitloopsTypesMapping.TErrorIdentifier:
          this.addError(
            ...errorIdentifierError(node as ErrorIdentifierNode, this.symbolTable[boundedContext]),
          );
          break;
        //TODO add to blIdentifiers
        case BitloopsTypesMapping.TDomainRuleIdentifier:
          this.addError(
            ...domainRuleIdentifierError(
              node as DomainRuleIdentifierNode,
              this.symbolTable[boundedContext],
            ),
          );
          break;
        case BitloopsTypesMapping.TDomainServiceEvaluation: {
          this.addError(
            ...domainServiceEvaluationError(
              node as DomainServiceEvaluationNode,
              this.symbolTable[boundedContext],
            ),
          );
          break;
        }
      }
    });
  }

  private validateClassTypeNodesSetup(ASTTree: IntermediateASTTree, fileId: string): void {
    ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
      switch (node.getNodeType()) {
        case BitloopsTypesMapping.TArgument:
          this.addError(...argumentError(node as ArgumentNode, this.symbolTableSetup[fileId]));
          break;
      }
    });
  }
}
