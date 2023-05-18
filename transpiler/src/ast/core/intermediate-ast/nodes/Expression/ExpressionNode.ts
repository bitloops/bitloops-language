import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { TInferredTypes } from '../../../../../semantic-analysis/type-inference/types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from '../statements/Statement.js';
import { BuiltInFunctionNode } from '../statements/builtinFunction/BuiltinFunctionNode.js';
import { AssignmentExpressionNode } from './AssignmentExpression.js';
import { EvaluationNode } from './Evaluation/EvaluationNode.js';
import { IdentifierExpressionNode } from './IdentifierExpression.js';
import { LogicalExpressionNode } from './Logical/LogicalExpressionNode.js';
import { LogicalNotExpressionNode } from './Logical/LogicalNotExpression.js';
import { MemberDotExpressionNode } from './MemberDot/MemberDotExpressionNode.js';
import { MethodCallExpressionNode } from './MethodCallExpression.js';
import { ThisExpressionNode } from './ThisExpressionNode.js';
import { ToStringNode } from './ToStringNode.js';
import { EqualityExpressionNode } from './equalityExpressionNode.js';
import { LiteralNode } from './Literal/LiteralNode.js';
import { IfErrorExpressionNode } from './IfErrorExpressionNode.js';
import { RelationalExpressionNode } from './relationalExpressionNode.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';

// export abstract class ExpressionNode extends IntermediateASTNode {
//   isMethodCallExpression(): this is MethodCallExpressionNode {
//     return this.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
//   }
// }

export class ExpressionNode extends StatementNode {
  private static classNodeName = 'expression';
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TExpression, metadata, ExpressionNode.classNodeName);
  }

  get childrenIdentifiers(): string[] {
    return [];
  }

  isIdentifierExpression(): this is IdentifierExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TIdentifierExpression;
  }

  isMethodCallExpression(): this is MethodCallExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
  }

  isAssingmentExpression(): this is AssignmentExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TAssignmentExpression;
  }

  isEqualityExpression(): this is EqualityExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TEqualityExpression;
  }

  isRelationalExpression(): this is RelationalExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TRelationalExpression;
  }

  isToStringExpression(): this is ToStringNode {
    return this.getNodeType() === BitloopsTypesMapping.TToStringExpression;
  }

  isBuiltInFunctionExpression(): this is BuiltInFunctionNode {
    return this.getNodeType() === BitloopsTypesMapping.TBuiltInFunction;
  }

  isIfErrorExpression(): this is IfErrorExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TIfErrorExpression;
  }

  isThisMethodCallExpressionWithTwoMemberDots(): boolean {
    if (this.isMethodCallExpression()) {
      const methodCallExpressionValues = this.getExpressionValues();
      if (methodCallExpressionValues.isMemberDotExpression()) {
        const memberDotExpressionValues = methodCallExpressionValues.getExpressionValues();
        if (memberDotExpressionValues.isMemberDotExpression()) {
          const secondMemberDotExpressionValues = memberDotExpressionValues.getExpressionValues();
          if (secondMemberDotExpressionValues.isThisExpression()) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getIdentifierAndMethodNameOfThisMethodCall(): { identifier: string; methodName: string } {
    if (!this.isThisMethodCallExpressionWithTwoMemberDots()) {
      throw new Error('Not a this method call expression with two member dots');
    }
    if (!this.isMethodCallExpression()) {
      throw new Error('Not a method call expression');
    }
    const methodCallExpressionValues = this.getExpressionValues();
    if (!methodCallExpressionValues.isMemberDotExpression()) {
      throw new Error('Not a member dot expression');
    }
    const methodName = methodCallExpressionValues.getIdentifierExpression().identifierName;
    const memberDotExpressionValues = methodCallExpressionValues.getExpressionValues();
    if (!memberDotExpressionValues.isMemberDotExpression()) {
      throw new Error('Not a member dot expression');
    }
    const leftMostMemberDotExpressionValues = memberDotExpressionValues.getExpressionValues();
    if (!leftMostMemberDotExpressionValues.isThisExpression()) {
      throw new Error('Not a this expression');
    }
    const identifier = memberDotExpressionValues.getIdentifierExpression().identifierName;
    return { identifier, methodName };
  }

  isDomainServiceEvaluationExpression(): boolean {
    if (!this.isEvaluation()) {
      return false;
    }
    if (!this.getEvaluation().isDomainServiceEvaluation()) {
      return false;
    }
    return true;
  }

  isMemberDotExpression(): this is MemberDotExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMemberDotExpression;
  }

  isThisExpression(): this is ThisExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TThisExpression;
  }

  isEvaluation(): this is EvaluationNode {
    return this.getNodeType() === BitloopsTypesMapping.TEvaluation;
  }

  isLogicalExpression(): this is LogicalExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TLogicalExpression;
  }

  isLogicalNotExpression(): this is LogicalNotExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TNotExpression;
  }

  /**
   * Aggregates and entities have the same evaluations
   */
  isAggregateEvaluationExpression(): boolean {
    if (!this.isEvaluation()) {
      return false;
    }
    if (!this.getEvaluation().isEntityEvaluation()) {
      return false;
    }
    return true;
  }

  isMethodCallOnIdentifier(identifiers: string[]): boolean {
    if (!this.isMethodCallExpression()) {
      return false;
    }

    const methodCallExpressionValues = this.getExpressionValues();
    if (!methodCallExpressionValues.isMemberDotExpression()) {
      return false;
    }
    // getExpression on memberDot returns the left
    const leftExpressionOfMemberDot = methodCallExpressionValues.getExpressionValues();
    // We only want to catch [identifier.methodCall()] cases
    if (!leftExpressionOfMemberDot.isIdentifierExpression()) {
      return false;
    }
    const identifierValue = leftExpressionOfMemberDot.identifierName;
    if (!identifiers.includes(identifierValue)) {
      return false;
    }
    return true;
  }

  getEntityMethodCallInfo(): { entityName: string; methodName: string } {
    if (!this.isMethodCallExpression()) {
      throw new Error('Not a method call expression');
    }

    const methodCallExpressionValues = this.getExpressionValues();
    if (!methodCallExpressionValues.isMemberDotExpression()) {
      throw new Error('Not a method call on identifier');
    }

    const leftExpressionOfMemberDot = methodCallExpressionValues.getExpressionValues();
    if (!leftExpressionOfMemberDot.isIdentifierExpression()) {
      throw new Error('Not a method call on identifier');
    }
    const methodName = methodCallExpressionValues.getIdentifierExpression().getIdentifierName();
    return { entityName: leftExpressionOfMemberDot.identifierName, methodName };
  }

  getMethodCallName(): string {
    if (!this.isMethodCallExpression()) {
      throw new Error('Not a method call expression');
    }
    return this.getMethodName();
  }

  getEvaluation(): EvaluationNode {
    return this.getChildren()[0] as EvaluationNode;
  }

  getLiteralNode(): LiteralNode {
    return this.getChildren()[0] as LiteralNode;
  }

  public getInferredType(symbolTableManager: SymbolTableManager): TInferredTypes {
    for (const child of this.getChildren()) {
      if (child instanceof ExpressionNode) {
        return child.getInferredType(symbolTableManager);
      }
    }
    throw new Error('No expression found to infer type');
  }

  getStringValue(): string {
    for (const child of this.getChildren()) {
      if (child instanceof ExpressionNode) {
        return child.getStringValue();
      }
    }
    throw new Error('No expression found to get string value');
  }

  public typeCheck(symbolTable: SymbolTable): void {
    for (const child of this.getChildren()) {
      if (child instanceof ExpressionNode) {
        child.typeCheck(symbolTable);
      }
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    for (const child of this.getChildren()) {
      if (child instanceof ExpressionNode) {
        const symbolTable = symbolTableManager.getSymbolTable();
        child.typeCheck(symbolTable);
        return child.addToSymbolTable(symbolTableManager);
      }
    }
  }
}
