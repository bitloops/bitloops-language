import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
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
    // if (this instanceof IdentifierExpressionNode) {
    //   return [this.getValue()];
    // }

    // if (this instanceof MethodCallExpressionNode) {
    //   return this.getExpression().childrenIdentifiers;
    // }
    // if (this instanceof MemberDotExpressionNode) {
    //   return [...this.expression.childrenIdentifiers, this.identifierExpression.identifierName];
    // }

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
  isDomainServiceEvaluationExpression(): boolean {
    if (!this.isEvaluation()) {
      return false;
    }
    if (!this.getEvaluation().isDomainServiceEvaluation()) {
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

  isMemberDotExpression(): this is MemberDotExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMemberDotExpression;
  }

  isThisExpression(): this is ThisExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TThisExpression;
  }

  isEvaluation(): this is EvaluationNode {
    return this.getNodeType() === BitloopsTypesMapping.TEvaluation;
  }

  getEvaluation(): EvaluationNode {
    return this.getChildren()[0] as EvaluationNode;
  }
}
