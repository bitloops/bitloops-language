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

import { IntermediateASTTree } from '../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { ArgumentNode } from '../../ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { DomainCreateNode } from '../../ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { EventHandlerBusDependenciesNode } from '../../ast/core/intermediate-ast/nodes/DomainEventHandler/EventHandlerBusDependenciesNode.js';
import { EventHandleNode } from '../../ast/core/intermediate-ast/nodes/EventHandleNode.js';
import { EvaluationFieldNode } from '../../ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationNode } from '../../ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';
import { ExpressionNode } from '../../ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierExpressionNode } from '../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { RegexLiteralNode } from '../../ast/core/intermediate-ast/nodes/Expression/Literal/RegexLiteralNode.js';
import { MemberDotExpressionNode } from '../../ast/core/intermediate-ast/nodes/Expression/MemberDot/MemberDotExpression.js';
import { IntermediateASTNode } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { IntegrationEventHandlerHandleMethodNode } from '../../ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerHandleMethodNode.js';
import { PrivateMethodDeclarationNode } from '../../ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';
import { PublicMethodDeclarationNode } from '../../ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationNode.js';
import { StatementNode } from '../../ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ClassTypeNodeTypeGuards } from '../../ast/core/intermediate-ast/type-guards/classTypeGuards.js';
import { IntermediateASTNodeTypeGuards } from '../../ast/core/intermediate-ast/type-guards/intermediateASTNodeTypeGuards.js';
import { StatementNodeTypeGuards } from '../../ast/core/intermediate-ast/type-guards/statementTypeGuards.js';
import {
  TBoundedContexts,
  ValidationError,
  IntermediateAST,
  TBoundedContextName,
} from '../../ast/core/types.js';
import { ClassTypeGuards } from '../../helpers/typeGuards/ClassTypeGuards.js';
import { isString } from '../../helpers/typeGuards/typeGuards.js';
import { bitloopsPrimitivesObj } from '../../types.js';
import {
  SymbolEntry,
  IntegrationEventParameterSymbolEntry,
  ClassTypeThisSymbolEntry,
  ParameterSymbolEntry,
  VariableSymbolEntry,
  ClassTypeParameterSymbolEntry,
  MethodCallSymbolEntry,
  MemberDotSymbolEntry,
} from './SymbolEntry.js';
import { SymbolTable } from './SymbolTable.js';
import { TInferredTypes } from './types.js';
import { SymbolTableManager } from './SymbolTableManager.js';

export const SCOPE_NAMES = {
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

export const inferType = ({
  node,
  symbolTable,
  intermediateASTTree,
  core,
}: {
  node: IntermediateASTNode;
  symbolTable?: SymbolTable;
  intermediateASTTree?: IntermediateASTTree;
  core?: TBoundedContexts;
}): TInferredTypes => {
  //For variables with no expressions return null type
  if (!node) return null;

  if (IntermediateASTNodeTypeGuards.isBitloopsPrimaryType(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isReturnOkErrorType(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isExpression(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isMethodCallExpression(node)) {
    const expression = node.getExpressionValues();
    const expressionType = inferType({ node: expression, symbolTable, intermediateASTTree, core });
    return expressionType;
  } else if (IntermediateASTNodeTypeGuards.isMemberDotExpression(node)) {
    const leftExpression = node.getLeftExpression();
    const rightMostExpression = node.getRightMostExpression();
    const leftExpressionString = leftExpression.getStringValue();
    const rightExpressionString = rightMostExpression.getStringValue();
    const leftExpressionType = symbolTable.lookup(leftExpressionString);
    if (!leftExpressionType)
      throw new Error(`${rightExpressionString} is not defined in ${leftExpressionString} `);

    return getMemberDotTypeFromIntermediateASTTree({
      leftExpressionType,
      rightExpressionString,
      intermediateASTTree,
      core,
    });
  } else if (IntermediateASTNodeTypeGuards.isIfErrorExpression(node)) {
    return node.getInferredType(symbolTable);
  } else if (IntermediateASTNodeTypeGuards.isThisExpression(node)) {
    const identifier = node.getIdentifierName();
    const expressionType = identifier;
    return expressionType;
  } else if (IntermediateASTNodeTypeGuards.isEqualityExpression(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isEvaluation(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isLiteral(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isToStringMethod(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isAddDomainEvent(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isApplyRules(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isAdditiveExpression(node)) {
    return node.getInferredType();
  } else if (IntermediateASTNodeTypeGuards.isIdentifierExpression(node)) {
    return node.getInferredType(symbolTable);
  }
  // return node.getInferredType();

  console.log(
    'Unsupported node type:',
    node.getClassNodeName(),
    node.getValue(),
    node.getNodeType(),
  );
  console.log('\nMetadata:', node.getMetadata());
  return null;
};

const getMemberDotTypeFromIntermediateASTTree = ({
  leftExpressionType,
  rightExpressionString,
  intermediateASTTree,
  core,
}: {
  leftExpressionType: SymbolEntry;
  rightExpressionString: string;
  intermediateASTTree: IntermediateASTTree;
  core?: TBoundedContexts;
}): string => {
  const { type: leftType } = leftExpressionType;

  if (isString(leftType)) {
    switch (rightExpressionString) {
      case 'length': {
        return bitloopsPrimitivesObj.int32;
      }
    }
  }

  if (ClassTypeGuards.isQuery(leftType)) {
    const queryNode = intermediateASTTree.getQueryByIdentifier(leftType);
    const fieldNodes = queryNode.getFieldNodes();
    for (const fieldNode of fieldNodes) {
      const fieldIdentifier = fieldNode.getIdentifierValue();
      if (fieldIdentifier === rightExpressionString) {
        const type = inferType({ node: fieldNode.getTypeNode() });
        return type;
      }
    }
  }
  if (ClassTypeGuards.isCommand(leftType)) {
    const commandNode = intermediateASTTree.getCommandByIdentifier(leftType);
    const fieldNodes = commandNode.getFieldNodes();
    for (const fieldNode of fieldNodes) {
      const fieldIdentifier = fieldNode.getIdentifierValue();
      if (fieldIdentifier === rightExpressionString) {
        const type = inferType({ node: fieldNode.getTypeNode() });
        return type;
      }
    }
  }
  if (ClassTypeGuards.isQueryHandler(leftType)) {
    const queryHandlerNode = intermediateASTTree.getQueryHandlerByIdentifier(leftType);
    const parameterNodes = queryHandlerNode.getParameters();
    for (const parameterNode of parameterNodes) {
      const parameterIdentifier = parameterNode.getIdentifier();
      if (parameterIdentifier === rightExpressionString) {
        const type = inferType({ node: parameterNode.getType() });
        return type;
      }
    }
  }
  if (ClassTypeGuards.isRepoPort(leftType)) {
    const repoPortNode = intermediateASTTree.getRepoPortByIdentifier(leftType);
    const methodDefinitionTypes =
      intermediateASTTree.getMethodDefinitionTypesOfRepoPort(repoPortNode);
    const methodDefinitionType = methodDefinitionTypes[rightExpressionString];
    return inferType({ node: methodDefinitionType });
  }
  if (ClassTypeGuards.isEntity(leftType)) {
    const entityNode =
      intermediateASTTree.getRootEntityByIdentifier(leftType) ??
      intermediateASTTree.getEntityByIdentifier(leftType);
    const entityValues = entityNode.getEntityValues();

    const publicMethodTypes = entityValues.getPublicMethodTypes();
    const publicMethodType = publicMethodTypes[rightExpressionString];
    if (!publicMethodType) {
      const propsIdentifier = entityValues.getPropsIdentifier();
      const propsNode = intermediateASTTree.getPropsByIdentifier(propsIdentifier);
      const fieldTypes = propsNode.getFieldTypes();
      const fieldType = fieldTypes[rightExpressionString];
      return inferType({ node: fieldType });
    }
    // TODO if none of them typeCheck??
    return inferType({ node: publicMethodType });
  }
  if (ClassTypeGuards.isVO(leftType)) {
    // same with entity fields
    const voNode = intermediateASTTree.getValueObjectByIdentifier(leftType);
    const propsIdentifier = voNode.getPropsIdentifier();
    const propsNode = intermediateASTTree.getPropsByIdentifier(propsIdentifier);
    const fieldTypes = propsNode.getFieldTypes();
    const fieldType = fieldTypes[rightExpressionString];
    return inferType({ node: fieldType });
  }
  if (ClassTypeGuards.isDomainEvent(leftType)) {
    const domainEventNode = intermediateASTTree.getDomainEventByIdentifier(leftType);
    const fieldTypes = domainEventNode.getFieldTypes();
    const fieldType = fieldTypes[rightExpressionString];
    return inferType({ node: fieldType });
  }
  if (ClassTypeGuards.isCommandBusPort(leftType)) {
    const commandBusMethodType = EventHandlerBusDependenciesNode.getCommandBusMethodType();
    const typeNode = commandBusMethodType[rightExpressionString];
    return inferType({ node: typeNode });
  }
  if (ClassTypeGuards.isIntegrationEvent(leftType)) {
    const { integrationEventInfo } = leftExpressionType as IntegrationEventParameterSymbolEntry;
    const { eventVersion, boundedContext, module } = integrationEventInfo;
    const ASTTree = core[boundedContext][module];
    const integrationEventNode = ASTTree.getIntegrationEventByIdentifier(leftType);
    const versionMapperSchemas = integrationEventNode.getIntegrationEventMapperSchemas();
    const schemaType = versionMapperSchemas[eventVersion];
    const schemaNode = ASTTree.getStructByIdentifier(schemaType.getIdentifierName());
    const fieldTypes = schemaNode.getFieldTypes();
    const fieldType = fieldTypes[rightExpressionString];
    return inferType({ node: fieldType });
  }
  if (ClassTypeGuards.isProps(leftType)) {
    const propsNode = intermediateASTTree.getPropsByIdentifier(leftType);
    const fieldTypes = propsNode.getFieldTypes();
    const fieldType = fieldTypes[rightExpressionString];
    return inferType({ node: fieldType });
  }

  if (ClassTypeGuards.isRegex(leftType)) {
    const regexType = RegexLiteralNode.getLiteralType(rightExpressionString);
    return regexType;
  }

  return '';
};

export class TypeInferenceValidator {
  private symbolTable: Record<TBoundedContextName, SymbolTable> = {};
  private errors: ValidationError[] = [];

  public validate(ast: IntermediateAST): void | ValidationError[] {
    this.createSymbolTable(ast.core);
    return this.errors;
  }

  public getSymbolTable(ast: IntermediateAST): Record<TBoundedContextName, SymbolTable> {
    this.createSymbolTable(ast.core);
    return this.symbolTable;
  }

  private addError(...errors: ValidationError[]): void {
    this.errors.push(...errors);
  }

  private createSymbolTable(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      const globalScope = new SymbolTable();
      this.symbolTable[boundedContextName] = globalScope;
      for (const ASTTree of Object.values(boundedContext)) {
        const symbolTableManager = new SymbolTableManager(ASTTree, core);
        const classTypeNodes = ASTTree.getClassTypeNodes();
        classTypeNodes.forEach((node) => {
          try {
            const identifierNode = node.getIdentifier();
            const name = identifierNode.getIdentifierName();
            const classTypeScope = globalScope.createChildScope(name, node);

            symbolTableManager.setClassTypeSymbolTable(classTypeScope);
            node.addToSymbolTable(symbolTableManager);

            // eslint-disable-next-line no-empty
          } catch {}
        });
      }
    }
  }

  private createStatementListScope({
    statements,
    symbolTable,
    intermediateASTTree,
    core,
  }: {
    statements: StatementNode[];
    symbolTable: SymbolTable;
    intermediateASTTree: IntermediateASTTree;
    core?: TBoundedContexts;
  }): SymbolTable {
    let ifErrorCounter = 0;
    for (const statement of statements) {
      if (StatementNodeTypeGuards.isExpressionStatement(statement)) {
        statement.typeCheck(symbolTable);
        ifErrorCounter = this.addExpression({
          expression: statement,
          symbolTable,
          intermediateASTTree,
          core,
          ifErrorCounter,
        });
      }

      if (StatementNodeTypeGuards.isBuiltInFunctionStatement(statement)) {
        const specificFunction = statement.getChildren()[0];
        if (IntermediateASTNodeTypeGuards.isAddDomainEvent(specificFunction)) {
          const leftExpression = specificFunction.getLeftExpression();
          leftExpression.typeCheck(symbolTable);

          const rightExpression = specificFunction.getRightExpression();
          rightExpression.typeCheck(symbolTable);
          ifErrorCounter = this.addExpression({
            expression: rightExpression,
            symbolTable,
            intermediateASTTree,
            ifErrorCounter,
          });

          //Here add to symbol table the Add domain event statement
          const leftExpressionKey = leftExpression.getIdentifierName();
          // const rightExpressionKey = rightExpression.getStringValue();

          const addDomainEventKey = this.appendMemberDot([leftExpressionKey, 'addDomainEvent()']);

          symbolTable.insert(
            addDomainEventKey,
            new MethodCallSymbolEntry(inferType({ node: specificFunction, symbolTable })),
          );
        } else if (IntermediateASTNodeTypeGuards.isApplyRules(specificFunction)) {
          const argumentNodes = specificFunction.getArguments();
          argumentNodes.forEach((argument) => {
            this.addExpression({
              expression: argument.getExpression(),
              symbolTable,
              intermediateASTTree,
              ifErrorCounter,
            });
          });
        }
      }
    }

    return symbolTable;
  }

  // TODO is this transferred?
  private addEvaluationFields({
    expression,
    symbolTable,
    intermediateASTTree,
    ifErrorCounter,
  }: {
    expression: ExpressionNode;
    symbolTable: SymbolTable;
    intermediateASTTree: IntermediateASTTree;
    ifErrorCounter: number;
  }): void {
    if (expression.isEvaluation()) {
      const evaluationExpression = expression as EvaluationNode;
      const evaluationFields = evaluationExpression.getEvaluationFields();
      this.addFieldsOfEvaluation({
        fieldNodes: evaluationFields,
        symbolTable,
        intermediateASTTree,
        ifErrorCounter,
      });
      const argumentNodes = evaluationExpression.getArguments();
      this.addFieldsOfEvaluation({
        fieldNodes: argumentNodes,
        symbolTable,
        intermediateASTTree,
        ifErrorCounter,
      });
    }
  }

  private addFieldsOfEvaluation({
    fieldNodes,
    symbolTable,
    intermediateASTTree,
    ifErrorCounter,
  }: {
    fieldNodes: ArgumentNode[] | EvaluationFieldNode[];
    symbolTable: SymbolTable;
    intermediateASTTree: IntermediateASTTree;
    ifErrorCounter: number;
  }): void {
    fieldNodes.forEach((argument) => {
      const argumentExpression = argument.getExpression();
      this.addExpression({
        expression: argumentExpression,
        symbolTable,
        intermediateASTTree,
        ifErrorCounter,
      });
    });
  }

  private addExpression({
    expression,
    symbolTable,
    intermediateASTTree,
    core,
    ifErrorCounter,
  }: {
    expression: ExpressionNode;
    symbolTable: SymbolTable;
    intermediateASTTree: IntermediateASTTree;
    core?: TBoundedContexts;
    ifErrorCounter: number;
  }): number {
    for (const child of expression.getChildren()) {
      if (child instanceof ExpressionNode) {
        if (child.isMemberDotExpression()) {
          this.addMemberDotExpression({
            memberDotExpression: child,
            symbolTable,
            intermediateASTTree,
            core,
          });
        } else if (child.isMethodCallExpression()) {
          const expression = child.getExpressionValues();
          if (expression.isMemberDotExpression()) {
            this.addMemberDotExpression({
              memberDotExpression: expression,
              symbolTable,
              intermediateASTTree,
              core,
              isMethodCall: true,
            });
          }
        } else if (child.isAssingmentExpression()) {
          this.addExpression({
            expression: child.getLeftExpression(),
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });

          this.addExpression({
            expression: child.getRightExpression(),
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });
        } else if (child.isEqualityExpression()) {
          this.addExpression({
            expression: child.getLeftExpression(),
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });

          this.addExpression({
            expression: child.getRightExpression(),
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });
        } else if (child.isIfErrorExpression()) {
          const leftIfErrorExpression = child.getExpression();
          this.addExpression({
            expression: leftIfErrorExpression,
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });

          const key = child.getStringValue() + '.ifError()';
          symbolTable.insert(
            key,
            new MethodCallSymbolEntry(inferType({ node: child, symbolTable, intermediateASTTree })),
          );
          const ifErrorScope = symbolTable.createChildScope(
            SCOPE_NAMES.IF_ERROR + ifErrorCounter++,
            child,
          );

          // const parameters = child.getParameters(); // TODO type check
          const parameter = child.getParameter();
          if (parameter) {
            const paramName = parameter.getIdentifier();
            ifErrorScope.insert(
              paramName,
              new ParameterSymbolEntry(child.getInferredTypeOfParameter(symbolTable)),
            );
          }
          const statementList = child.getStatementListNode();
          if (statementList) {
            this.createStatementListScope({
              statements: statementList.statements,
              symbolTable: ifErrorScope,
              intermediateASTTree,
            });
          }
        } else if (child.isLogicalExpression()) {
          const logicalExpression = child.getExpressionValue();
          if (logicalExpression.isLogicalNotExpression()) {
            const expression = logicalExpression.getChildren()[0] as ExpressionNode;
            this.addExpression({
              expression,
              symbolTable,
              intermediateASTTree,
              core,
              ifErrorCounter,
            });
          } else {
            const leftExpression = logicalExpression.getLeftExpression();
            const rightExpression = logicalExpression.getRightExpression();
            this.addExpression({
              expression: leftExpression,
              symbolTable,
              intermediateASTTree,
              core,
              ifErrorCounter,
            });

            this.addExpression({
              expression: rightExpression,
              symbolTable,
              intermediateASTTree,
              core,
              ifErrorCounter,
            });
          }
        } else if (child.isRelationalExpression()) {
          const leftExpression = child.getLeftExpression();
          const rightExpression = child.getRightExpression();
          this.addExpression({
            expression: leftExpression,
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });

          this.addExpression({
            expression: rightExpression,
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });
        } else if (child.isToStringExpression()) {
          this.addExpression({
            expression: child.getExpression(),
            symbolTable,
            intermediateASTTree,
            core,
            ifErrorCounter,
          });

          const key = child.getStringValue() + '.toString()';
          symbolTable.insert(
            key,
            new MethodCallSymbolEntry(inferType({ node: child, symbolTable, intermediateASTTree })),
          );
        }
      }
    }
    return ifErrorCounter;
  }

  private insertMemberDotOrMethodCallToSymbolTable({
    isMethodCall,
    memberDotResult,
    rightMostExpression,
    symbolTable,
    memberDotExpression,
    intermediateASTTree,
    core,
  }: {
    isMethodCall: boolean;
    memberDotResult: string;
    rightMostExpression: IdentifierExpressionNode;
    symbolTable: SymbolTable;
    memberDotExpression: MemberDotExpressionNode;
    intermediateASTTree: IntermediateASTTree;
    core: TBoundedContexts;
  }): string {
    if (isMethodCall) {
      const methodCallSymbolEntryKey = this.getMethodCallSymbolEntryKey(
        memberDotResult,
        rightMostExpression,
      );
      if (!symbolTable.lookup(methodCallSymbolEntryKey)) {
        symbolTable.insert(
          methodCallSymbolEntryKey,
          new MethodCallSymbolEntry(
            inferType({ node: memberDotExpression, symbolTable, intermediateASTTree, core }),
          ),
        );
      }
      return methodCallSymbolEntryKey;
    } else {
      const memberDotSymbolEntryKey = this.getMemberDotSymbolEntryKey(
        memberDotResult,
        rightMostExpression,
      );
      //add it to symbol table if it doesn't exist
      if (!symbolTable.lookup(memberDotSymbolEntryKey)) {
        symbolTable.insert(
          memberDotSymbolEntryKey,
          new MemberDotSymbolEntry(
            inferType({ node: memberDotExpression, symbolTable, intermediateASTTree, core }),
          ),
        );
      }
      return memberDotSymbolEntryKey;
    }
  }

  // accountEntity.withdraw
  // this.accountRepo.getById.find
  private addMemberDotExpression({
    memberDotExpression,
    symbolTable,
    intermediateASTTree,
    core,
    isMethodCall = false,
  }: {
    memberDotExpression: MemberDotExpressionNode;
    symbolTable: SymbolTable;
    intermediateASTTree: IntermediateASTTree;
    core?: TBoundedContexts;
    isMethodCall?: boolean;
  }): string {
    const leftMostMemberDotExpression = memberDotExpression.getLeftExpression();
    const rightMostExpression = memberDotExpression.getRightMostExpression();

    if (leftMostMemberDotExpression.isMemberDotExpression()) {
      const memberDotResult = this.addMemberDotExpression({
        memberDotExpression: leftMostMemberDotExpression,
        symbolTable,
        intermediateASTTree,
        core,
        isMethodCall: false,
      });

      return this.insertMemberDotOrMethodCallToSymbolTable({
        memberDotResult,
        isMethodCall,
        rightMostExpression,
        symbolTable,
        memberDotExpression,
        intermediateASTTree,
        core,
      });
    } else if (leftMostMemberDotExpression.isMethodCallExpression()) {
      const memberDot = leftMostMemberDotExpression.getMemberDotExpression();
      const memberDotResult = this.addMemberDotExpression({
        memberDotExpression: memberDot,
        symbolTable,
        intermediateASTTree,
        core,
        isMethodCall: true,
      });
      return this.insertMemberDotOrMethodCallToSymbolTable({
        memberDotResult,
        isMethodCall,
        rightMostExpression,
        symbolTable,
        memberDotExpression,
        intermediateASTTree,
        core,
      });
    } else {
      if (leftMostMemberDotExpression.isThisExpression()) {
        return this.insertMemberDotOrMethodCallToSymbolTable({
          memberDotResult: leftMostMemberDotExpression.getIdentifierName(),
          isMethodCall,
          rightMostExpression,
          symbolTable,
          memberDotExpression,
          intermediateASTTree,
          core,
        });
      } else if (leftMostMemberDotExpression.isIdentifierExpression()) {
        return this.insertMemberDotOrMethodCallToSymbolTable({
          memberDotResult: leftMostMemberDotExpression.getIdentifierName(),
          isMethodCall,
          rightMostExpression,
          symbolTable,
          memberDotExpression,
          intermediateASTTree,
          core,
        });
      } else {
        throw new Error('Invalid left expression of member dot expression');
      }
    }
  }

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
}
