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
import { TInferredTypes } from './type-inference/types.js';
import { ClassTypeNodeTypeGuards } from '../ast/core/intermediate-ast/type-guards/classTypeGuards.js';
import { StatementNode } from '../ast/core/intermediate-ast/nodes/statements/Statement.js';
import { StatementNodeTypeGuards } from '../ast/core/intermediate-ast/type-guards/statementTypeGuards.js';
import { ErrorIdentifierNode } from '../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { EntityIdentifierNode } from '../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { DomainServiceEvaluationNode } from '../ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import {
  ClassTypeParameterSymbolEntry,
  ClassTypeThisSymbolEntry,
  MemberDotSymbolEntry,
  MethodCallSymbolEntry,
  ParameterSymbolEntry,
  VariableSymbolEntry,
} from './type-inference/SymbolEntry.js';
import { DomainCreateNode } from '../ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { ParameterNode } from '../ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { EventHandleNode } from '../ast/core/intermediate-ast/nodes/EventHandleNode.js';
import { IntegrationEventHandlerHandleMethodNode } from '../ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerHandleMethodNode.js';
import { PublicMethodDeclarationNode } from '../ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { PrivateMethodDeclarationNode } from '../ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { IntermediateASTNodeTypeGuards } from '../ast/core/intermediate-ast/type-guards/intermediateASTNodeTypeGuards.js';
import { MemberDotExpressionNode } from '../ast/core/intermediate-ast/nodes/Expression/MemberDot/MemberDotExpression.js';
import { ExpressionNode } from '../ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { MethodCallExpressionNode } from '../ast/core/intermediate-ast/nodes/Expression/MethodCallExpression.js';
import { IdentifierExpressionNode } from '../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
// import { IntermediateASTNodeTypeGuards } from '../ast/core/intermediate-ast/type-guards/intermediateASTNodeTypeGuards.js';
// import { BitloopsPrimaryTypeDirector } from '../../__tests__/ast/core/builders/bitloopsPrimaryTypeDirector.js';

const SCOPE_NAMES = {
  EXECUTE: 'execute',
  THIS: 'this',
  SWITCH: 'switch',
  CASE: 'case',
  DEFAULT: 'default',
  IF: 'if',
  ELSE: 'else',
  DOMAIN_CREATE: 'domainCreate',
  HANDLE: 'handle',
};

export const inferType = (node: IntermediateASTNode): TInferredTypes => {
  //For variables with no expressions return null type
  if (!node) return null;

  if (IntermediateASTNodeTypeGuards.isBitloopsPrimaryType(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isExpression(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isMethodCallExpression(node)) {
    const expression = node.getExpressionValues();
    const expressionType = inferType(expression);
    return expressionType;
  } else if (IntermediateASTNodeTypeGuards.isMemberDotExpression(node)) {
    const expression = node.getLeftMostExpression();
    //lookup for type in symbol table
    //if found return type
    const expressionType = inferType(expression);
    console.log('expressionType', expressionType);
    return expressionType;
  } else if (IntermediateASTNodeTypeGuards.isThisExpression(node)) {
    const identifier = node.getIdentifierName();
    const expressionType = identifier;
    return expressionType;
  } else if (IntermediateASTNodeTypeGuards.isEvaluation(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isLiteral(node)) {
    return node.getInferredType();
  }
  // else if (node.isIntegrationEventidentifier()) {
  //   return node.getInferredType();
  // }
  // else {
  //   throw new Error('Unsupported node type: ');
  // }
  console.log('Unsupported node type: ', node.getClassNodeName(), node.getValue());
  return null;
};

export class SemanticAnalyzer implements IIntermediateASTValidator {
  private symbolTableSetup: Record<string, Set<string>>;

  private symbolTable: Record<TBoundedContextName, SymbolTable> = {};
  private errors: ValidationError[] = [];

  constructor() {
    this.symbolTableSetup = {};
  }

  validate(ast: IntermediateAST): void | ValidationError[] {
    this.createSymbolTable(ast.core);
    this.validateCore(ast.core);
    this.validateSetup(ast.setup);
    if (this.errors.length > 0) return this.errors;
  }

  private addError(...errors: ValidationError[]): void {
    this.errors.push(...errors);
  }

  public getSymbolTable(
    ast: IntermediateAST,
  ): Record<TBoundedContextName, SymbolTable> | ValidationError[] {
    this.createSymbolTable(ast.core);
    if (this.errors.length > 0) return this.errors;
    return this.symbolTable;
  }

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
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            //TODO insert integration event bus
            classTypeScope.insert(
              SCOPE_NAMES.THIS + '.' + 'integrationEventBus',
              new ClassTypeParameterSymbolEntry(null),
            );

            const params = node.getParameters();
            this.createParamsScope(params, classTypeScope);
            //TODO move to method
            const execute = node.getExecute();
            const executeScope = classTypeScope.createChildScope(SCOPE_NAMES.EXECUTE, execute);
            const executeParams = node.getMethodParameters();
            executeParams.forEach((paramNode) => {
              const paramName = paramNode.getIdentifier();
              executeScope.insert(
                paramName,
                new ParameterSymbolEntry(inferType(paramNode.getType())),
              );
            });
            const statements = node.getStatements();
            this.createStatementListScope(statements, executeScope);
          } else if (ClassTypeNodeTypeGuards.isQueryHandler(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const params = node.getParameters();
            this.createParamsScope(params, classTypeScope);
            //TODO move to method
            const execute = node.getExecute();
            const executeScope = classTypeScope.createChildScope(SCOPE_NAMES.EXECUTE, execute);
            const executeParams = node.getMethodParameters();
            executeParams.forEach((paramNode) => {
              const paramName = paramNode.getIdentifier();
              executeScope.insert(
                paramName,
                new ParameterSymbolEntry(inferType(paramNode.getType())),
              );
            });
            const statements = node.getStatements();
            this.createStatementListScope(statements, executeScope);
          } else if (ClassTypeNodeTypeGuards.isDomainEventHandler(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const params = node.getParameters();
            this.createParamsScope(params, classTypeScope);

            const handle = node.getHandle();
            this.createHandleScope(handle, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isIntegrationEventHandler(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const params = node.getParameters();
            this.createParamsScope(params, classTypeScope);

            const handle = node.getHandle();
            this.createIntegrationEventHandleScope(handle, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isDomainService(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const params = node.getParameters();
            this.createParamsScope(params, classTypeScope);
            const publicMethods = node.getPublicMethods();
            this.createPublicMethodScope(publicMethods, classTypeScope);
            const privateMethods = node.getPrivateMethods();
            this.createPrivateMethodScope(privateMethods, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isRootEntity(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const entityValue = node.getEntityValues();

            const domainCreate = entityValue.getDomainCreateMethod();

            this.appendDomainCreateMethodToSymbolTable({
              classTypeScope,
              domainCreate,
            });

            //methods
            const publicMethods = entityValue.getPublicMethods();
            this.createPublicMethodScope(publicMethods, classTypeScope);

            const privateMethods = entityValue.getPrivateMethods();
            this.createPrivateMethodScope(privateMethods, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isEntity(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const entityValue = node.getEntityValues();

            const domainCreate = entityValue.getDomainCreateMethod();

            this.appendDomainCreateMethodToSymbolTable({
              classTypeScope,
              domainCreate,
            });

            //methods
            const publicMethods = entityValue.getPublicMethods();
            this.createPublicMethodScope(publicMethods, classTypeScope);

            const privateMethods = entityValue.getPrivateMethods();
            this.createPrivateMethodScope(privateMethods, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isValueObject(node)) {
            classTypeScope.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
            const constants = node.getConstants();
            constants.forEach((constant) => {
              const constantName = constant.getIdentifier().getValue().identifier;
              classTypeScope.insert(
                constantName,
                new VariableSymbolEntry(inferType(constant.getExpressionValues()), true),
              );
            });

            const create = node.getCreateNode();
            this.appendDomainCreateMethodToSymbolTable({ classTypeScope, domainCreate: create });

            const methods = node.getMethods();
            this.createPrivateMethodScope(methods, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isDomainRule(node)) {
            const params = node.getParameters();
            this.createParamsScope(params, classTypeScope);
            const statements = node.getStatements();
            this.createStatementListScope(statements, classTypeScope);
          } else if (ClassTypeNodeTypeGuards.isIntegrationEvent(node)) {
            const param = node.getParameter();
            const paramName = param.getIdentifier();
            classTypeScope.insert(
              paramName,
              new ClassTypeParameterSymbolEntry(inferType(param.getType())),
            );

            const integrationEventMapperNodes = node.getIntegrationEventMapperNodes();
            integrationEventMapperNodes.forEach((mapperNode) => {
              const mapperVersion = mapperNode.getVersionName();
              const mapperScope = classTypeScope.createChildScope(mapperVersion, mapperNode);
              const mapperStatements = mapperNode.getStatements();
              this.createStatementListScope(mapperStatements, mapperScope);
            });
          }
        });
      }
    }
  }

  private appendDomainCreateMethodToSymbolTable(params: {
    classTypeScope: SymbolTable;
    domainCreate: DomainCreateNode;
  }): void {
    const { classTypeScope, domainCreate } = params;
    const domainCreateScope = classTypeScope.createChildScope(
      SCOPE_NAMES.DOMAIN_CREATE,
      domainCreate,
    );
    const domainCreateParam = domainCreate.getParameterNode();
    const domainCreateParamName = domainCreateParam.getIdentifier();
    domainCreateScope.insert(
      domainCreateParamName,
      new ParameterSymbolEntry(inferType(domainCreateParam.getType())),
    );
    const domainCreateStatements = domainCreate.getStatements();
    this.createStatementListScope(domainCreateStatements, domainCreateScope);
  }

  private createPublicMethodScope(
    publicMethods: PublicMethodDeclarationNode[],
    classTypeScope: SymbolTable,
  ): void {
    publicMethods.forEach((method) => {
      const methodName = method.getMethodName();
      const methodScope = classTypeScope.createChildScope(methodName, method);
      const methodParams = method.getMethodParameters();
      for (const param of methodParams) {
        const paramName = param.getIdentifier();
        methodScope.insert(paramName, new ParameterSymbolEntry(inferType(param.getType())));
      }
      const methodStatements = method.getStatements();
      this.createStatementListScope(methodStatements, methodScope);
    });
  }

  private createPrivateMethodScope(
    privateMethods: PrivateMethodDeclarationNode[],
    classTypeScope: SymbolTable,
  ): void {
    privateMethods.forEach((method) => {
      const methodName = method.getIdentifier();
      const methodScope = classTypeScope.createChildScope(methodName, method);
      const methodParams = method.getMethodParameters();
      for (const param of methodParams) {
        const paramName = param.getIdentifier();
        methodScope.insert(paramName, new ParameterSymbolEntry(inferType(param.getType())));
      }
      const methodStatements = method.getStatements();
      this.createStatementListScope(methodStatements, methodScope);
    });
  }

  private createParamsScope(params: ParameterNode[], classTypeScope: SymbolTable): void {
    params.forEach((paramNode) => {
      const paramName = paramNode.getIdentifier();
      classTypeScope.insert(
        paramName,
        new ClassTypeParameterSymbolEntry(inferType(paramNode.getType())),
      );
    });
  }

  private createHandleScope(handle: EventHandleNode, classTypeScope: SymbolTable): void {
    const handleScope = classTypeScope.createChildScope(SCOPE_NAMES.HANDLE, handle);
    const handleParams = handle.getParameters();
    handleParams.forEach((paramNode) => {
      const paramName = paramNode.getIdentifier();
      handleScope.insert(paramName, new ParameterSymbolEntry(inferType(paramNode.getType())));
    });
    const statements = handle.getStatements();
    this.createStatementListScope(statements, handleScope);
  }

  private createIntegrationEventHandleScope(
    handle: IntegrationEventHandlerHandleMethodNode,
    classTypeScope: SymbolTable,
  ): void {
    const handleScope = classTypeScope.createChildScope(SCOPE_NAMES.HANDLE, handle);
    const handleParam = handle.getParameter();
    const paramName = handleParam.getIdentifier();
    handleScope.insert(
      paramName,
      new ParameterSymbolEntry(handleParam.getIntegrationEventIdentifier()),
    );

    const statements = handle.getStatements();
    this.createStatementListScope(statements, handleScope);
  }

  private createStatementListScope(
    statements: StatementNode[],
    parentScope: SymbolTable,
  ): SymbolTable {
    let ifCounter = 0;
    let elseCounter = 0;
    let switchCounter = 0;
    for (const statement of statements) {
      try {
        if (StatementNodeTypeGuards.isVariableDeclarationStatement(statement)) {
          const identifier = statement.getIdentifier().getIdentifierName();
          statement.typeCheck(parentScope);
          const expression = statement.getExpressionValues();
          this.addExpression(statement.getExpression(), parentScope);
          parentScope.insert(identifier, new VariableSymbolEntry(inferType(expression), false));
        }

        if (StatementNodeTypeGuards.isConstantDeclarationStatement(statement)) {
          const expression = statement.getExpressionValues();
          statement.typeCheck(parentScope);
          expression.typeCheck(parentScope);
          const identifier = statement.getIdentifier().getIdentifierName();
          this.addExpression(statement.getExpression(), parentScope);
          parentScope.insert(identifier, new VariableSymbolEntry(inferType(expression), true));
        }

        if (StatementNodeTypeGuards.isIfStatement(statement)) {
          const conditionExpression = statement.getConditionExpression();
          conditionExpression.typeCheck(parentScope);

          const ifScope = parentScope.createChildScope(SCOPE_NAMES.IF + ifCounter++, statement);
          const thenStatements = statement.getThenStatements();
          this.createStatementListScope(thenStatements, ifScope);
          if (statement.hasElseBlock()) {
            const elseStatements = statement.getElseStatements();
            const elseScope = parentScope.createChildScope('else' + elseCounter++, statement);
            this.createStatementListScope(elseStatements, elseScope);
          }
        }

        if (StatementNodeTypeGuards.isSwitchStatement(statement)) {
          const switchExpression = statement.getExpression();
          switchExpression.typeCheck(parentScope);

          const switchScope = parentScope.createChildScope(
            SCOPE_NAMES.SWITCH + switchCounter++,
            statement,
          );
          const switchCases = statement.getCases();
          switchCases.forEach((switchCase, index) => {
            const switchCaseExpression = switchCase.getExpression();
            switchCaseExpression.typeCheck(switchScope);

            const caseScope = switchScope.createChildScope(SCOPE_NAMES.CASE + index, switchCase);
            const caseStatements = switchCase.getStatements();
            this.createStatementListScope(caseStatements, caseScope);
          });
          const defaultCase = statement.getDefaultCase();
          const defaultScope = switchScope.createChildScope(SCOPE_NAMES.DEFAULT, defaultCase);
          const defaultStatements = defaultCase.getStatements();
          this.createStatementListScope(defaultStatements, defaultScope);
        }

        if (StatementNodeTypeGuards.isReturnStatement(statement)) {
          const expression = statement.getExpressionValues();
          expression.typeCheck(parentScope);
        }

        if (StatementNodeTypeGuards.isExpressionStatement(statement)) {
          statement.typeCheck(parentScope);
          this.addExpression(statement, parentScope);
        }
      } catch (e) {
        // console.log(e);
        if (e instanceof ValidationError) {
          this.addError(e);
          break;
        } else {
          throw e;
        }
      }
    }
    return parentScope;
  }

  private addExpression(expression: ExpressionNode, parentScope: SymbolTable): void {
    for (const child of expression.getChildren()) {
      if (child instanceof ExpressionNode) {
        if (child.isMemberDotExpression()) {
          this.addMemberDotExpression({ memberDotExpression: child, parentScope });
        } else if (child.isMethodCallExpression()) {
          this.addMethodCallExpression(child, parentScope);
        }
      }
    }
  }

  private addMethodCallExpression(
    methodCallExpression: MethodCallExpressionNode,
    parentScope: SymbolTable,
  ): void {
    const expression = methodCallExpression.getExpressionValues();
    // TODO typeCheck
    if (expression.isMemberDotExpression()) {
      this.addMemberDotExpression({
        memberDotExpression: expression,
        parentScope,
        isMethodCall: true,
      });
    }
  }

  // accountEntity.withdraw
  // this.accountRepo.getById.find
  private addMemberDotExpression({
    memberDotExpression,
    parentScope,
    isMethodCall = false,
  }: {
    memberDotExpression: MemberDotExpressionNode;
    parentScope: SymbolTable;
    isMethodCall?: boolean;
  }): string {
    const leftMostMemberDotExpression = memberDotExpression.getLeftExpression();
    const rightMostExpression = memberDotExpression.getRightMostExpression();
    if (leftMostMemberDotExpression.isMemberDotExpression()) {
      const memberDotResult = this.addMemberDotExpression({
        memberDotExpression: leftMostMemberDotExpression,
        parentScope,
      });

      if (isMethodCall) {
        const methodCallSymbolEntryKey = this.getMethodCallSymbolEntryKey(
          memberDotResult,
          rightMostExpression,
        );
        parentScope.insert(methodCallSymbolEntryKey, new MethodCallSymbolEntry(inferType(null)));
        return methodCallSymbolEntryKey;
      } else {
        const memberDotSymbolEntryKey = this.getMemberDotSymbolEntryKey(
          memberDotResult,
          rightMostExpression,
        );
        parentScope.insert(memberDotSymbolEntryKey, new MemberDotSymbolEntry(inferType(null)));
        return memberDotSymbolEntryKey;
      }
    } else {
      if (leftMostMemberDotExpression.isThisExpression()) {
        if (isMethodCall) {
          const methodCallSymbolEntryKey = this.getMethodCallSymbolEntryKey(
            leftMostMemberDotExpression.getIdentifierName(),
            rightMostExpression,
          );
          parentScope.insert(methodCallSymbolEntryKey, new MethodCallSymbolEntry(inferType(null)));
          return methodCallSymbolEntryKey;
        } else {
          const memberDotSymbolEntryKey = this.getMemberDotSymbolEntryKey(
            leftMostMemberDotExpression.getIdentifierName(),
            rightMostExpression,
          );
          parentScope.insert(memberDotSymbolEntryKey, new MemberDotSymbolEntry(inferType(null)));
          return memberDotSymbolEntryKey;
        }
      } else if (leftMostMemberDotExpression.isIdentifierExpression()) {
        if (isMethodCall) {
          const methodCallSymbolEntryKey = this.getMethodCallSymbolEntryKey(
            leftMostMemberDotExpression.getIdentifierName(),
            rightMostExpression,
          );
          parentScope.insert(methodCallSymbolEntryKey, new MethodCallSymbolEntry(inferType(null)));
          return methodCallSymbolEntryKey;
        } else {
          const memberDotSymbolEntryKey = this.getMemberDotSymbolEntryKey(
            leftMostMemberDotExpression.getIdentifierName(),
            rightMostExpression,
          );
          parentScope.insert(memberDotSymbolEntryKey, new MemberDotSymbolEntry(inferType(null)));
          return memberDotSymbolEntryKey;
        }
      } else {
        throw new Error('Invalid left expression of member dot expression');
      }
    }
  }

  // private addMemberDotToSymbolTable(
  //   leftExpressionName: string,
  //   rightExpressionNode: IdentifierExpressionNode,
  //   parentScope: SymbolTable,
  // ): void {
  //   const memberDotSymbolEntryKey = this.getMemberDotSymbolEntryKey(
  //     leftExpressionName,
  //     rightExpressionNode,
  //   );
  //   parentScope.insert(memberDotSymbolEntryKey, new MemberDotSymbolEntry(inferType(null)));
  // }

  private getMemberDotSymbolEntryKey(
    leftExpressionName: string,
    rightExpressionNode: IdentifierExpressionNode,
  ): string {
    return leftExpressionName + '.' + rightExpressionNode.getIdentifierName();
  }

  private getMethodCallSymbolEntryKey(
    leftExpressionName: string,
    rightExpressionNode: IdentifierExpressionNode,
  ): string {
    return leftExpressionName + '.' + rightExpressionNode.getIdentifierName() + '()';
  }

  private validateCore(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const ASTTree of Object.values(boundedContext)) {
        // this.validateNodes(ASTTree, boundedContextName);

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
  // private validateNodes(ASTTree: IntermediateASTTree, boundedContextName: string): void {
  // ASTTree.traverse(ASTTree.getRootNode(), (node: IntermediateASTNode) => {
  //   const validationRes = node.validate(this.symbolTableCore[boundedContextName]);
  //   if (IntermediateASTNode.isIntermediateASTNodeValidationError(validationRes))
  //     this.addError(validationRes);
  // });
  // }

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
