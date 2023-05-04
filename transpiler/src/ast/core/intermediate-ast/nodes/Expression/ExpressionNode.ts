import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { TInferredTypes } from '../../../../../semantic-analysis/type-inference/types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from '../statements/Statement.js';
import { EvaluationNode } from './Evaluation/EvaluationNode.js';
import { IdentifierExpressionNode } from './IdentifierExpression.js';
import { MemberDotExpressionNode } from './MemberDot/MemberDotExpression.js';
import { MethodCallExpressionNode } from './MethodCallExpression.js';
import { ThisExpressionNode } from './ThisExpressionNode.js';

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

  typeCheck(symbolTable: SymbolTable): void {
    for (const child of this.getChildren()) {
      if (child instanceof ExpressionNode) {
        child.typeCheck(symbolTable);
      }
    }
  }

  public getInferredType(): TInferredTypes {
    for (const child of this.getChildren()) {
      if (child instanceof ExpressionNode) {
        return child.getInferredType();
      }
    }
    throw new Error('No expression found to infer type');
  }
}
