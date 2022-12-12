import {
  TAdditiveOperator,
  TArgumentList,
  TEqualityOperator,
  TEvaluation,
  TExpression,
  TMultiplicativeOperator,
  TRelationalOperator,
} from '../../../../src/types.js';

export class ExpressionBuilderDirector {
  buildIdentifierExpression(identifier: string): TExpression {
    return {
      expression: {
        identifier,
      },
    };
  }

  buildStringLiteralExpression(stringLiteral: string): TExpression {
    return {
      expression: {
        literal: {
          stringLiteral,
        },
      },
    };
  }
  buildTemplateStringLiteralExpression(templateStringLiteral: string): TExpression {
    return {
      expression: {
        literal: {
          templateStringLiteral,
        },
      },
    };
  }

  buildInt32LiteralExpression(int32Literal: number): TExpression {
    return {
      expression: {
        literal: {
          numericLiteral: {
            integerLiteral: {
              value: `${int32Literal}`,
              type: 'int32',
            },
          },
        },
      },
    };
  }

  buildFloatLiteralExpression(floatLiteral: number): TExpression {
    return {
      expression: {
        literal: {
          numericLiteral: {
            decimalLiteral: {
              value: `${floatLiteral}`,
              type: 'float',
            },
          },
        },
      },
    };
  }

  buildBooleanLiteralExpression(booleanLiteral: boolean): TExpression {
    return {
      expression: {
        literal: {
          booleanLiteral: `${booleanLiteral}`,
        },
      },
    };
  }
  buildArrayLiteralExpressionOf(...expressions: TExpression[]): TExpression {
    return {
      expression: {
        arrayLiteral: expressions,
      },
    };
  }
  buildThisExpression(): TExpression {
    return {
      expression: {
        thisExpression: 'this',
      },
    };
  }

  buildMemberExpression(leftExpression: TExpression, identifier: string): TExpression {
    return {
      expression: {
        memberDotExpression: {
          expression: leftExpression.expression,
          identifier,
        },
      },
    };
  }

  buildThisMemberExpressionOutOfVariables(...identifiers: string[]): TExpression {
    return identifiers.reduce(
      (leftExpression, identifier) => this.buildMemberExpression(leftExpression, identifier),
      this.buildThisExpression(),
    );
  }

  buildMemberExpressionOutOfVariables(...identifiers: string[]): TExpression {
    return identifiers.reduce(
      (leftExpression, identifier) => this.buildMemberExpression(leftExpression, identifier),
      this.buildIdentifierExpression(identifiers.shift()),
    );
  }

  buildMethodCallExpression(expression: TExpression, argumentList: TArgumentList): TExpression {
    return {
      expression: {
        methodCallExpression: {
          ...expression,
          argumentList,
        },
      },
    };
  }
  buildGetClassExpression(expression: TExpression): TExpression {
    return {
      expression: {
        getClass: {
          ...expression,
        },
      },
    };
  }
  buildToStringExpression(expression: TExpression): TExpression {
    return {
      expression: {
        toStringMethod: {
          ...expression,
        },
      },
    };
  }

  buildMemberDotMethodCallExpression(
    memberDotMembers: string[],
    argumentList: TArgumentList,
  ): TExpression {
    return this.buildMethodCallExpression(
      this.buildMemberExpressionOutOfVariables(...memberDotMembers),
      argumentList,
    );
  }
  buildIsInstanceOfExpression(expression: TExpression, className: string): TExpression {
    return {
      expression: {
        isInstanceOf: {
          ...expression,
          class: className,
        },
      },
    };
  }
  buildAssignmentExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
  ): TExpression {
    return {
      expression: {
        assignmentExpression: {
          left: leftExpression,
          expression: rightExpression.expression,
        },
      },
    };
  }

  buildAdditiveExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
    operator: TAdditiveOperator = '+',
  ): TExpression {
    return {
      expression: {
        additiveExpression: {
          left: leftExpression,
          right: rightExpression,
          operator,
        },
      },
    };
  }

  buildMultiplicativeExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
    operator: TMultiplicativeOperator = '*',
  ): TExpression {
    return {
      expression: {
        multiplicativeExpression: {
          left: leftExpression,
          right: rightExpression,
          operator,
        },
      },
    };
  }

  buildRelationalExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
    operator: TRelationalOperator,
  ): TExpression {
    return {
      expression: {
        relationalExpression: {
          left: leftExpression,
          right: rightExpression,
          operator,
        },
      },
    };
  }

  buildLogicalAndExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
  ): TExpression {
    return {
      expression: {
        logicalExpression: {
          andExpression: {
            left: leftExpression,
            right: rightExpression,
          },
        },
      },
    };
  }

  buildLogicalNotExpression(expression: TExpression): TExpression {
    return {
      expression: {
        logicalExpression: {
          notExpression: expression,
        },
      },
    };
  }

  buildLogicalOrExpression(leftExpression: TExpression, rightExpression: TExpression): TExpression {
    return {
      expression: {
        logicalExpression: {
          orExpression: {
            left: leftExpression,
            right: rightExpression,
          },
        },
      },
    };
  }

  buildLogicalXorExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
  ): TExpression {
    return {
      expression: {
        logicalExpression: {
          xorExpression: {
            left: leftExpression,
            right: rightExpression,
          },
        },
      },
    };
  }

  buildEqualityExpression(
    leftExpression: TExpression,
    rightExpression: TExpression,
    operator: TEqualityOperator = '==',
  ): TExpression {
    return {
      expression: {
        equalityExpression: {
          left: leftExpression,
          right: rightExpression,
          operator,
        },
      },
    };
  }

  buildEvaluation(evaluation: TEvaluation): TExpression {
    return {
      expression: {
        ...evaluation,
      },
    };
  }

  buildParenthesizedExpression(expression: TExpression): TExpression {
    return {
      expression: {
        parenthesizedExpression: expression,
      },
    };
  }
}
