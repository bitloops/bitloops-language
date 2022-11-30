import { TArgumentList, TExpression } from '../../../../src/types.js';

export class FieldBuilderDirector {
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

  buildMethodCallExpression(expression, argumentList: TArgumentList): TExpression {
    return {
      expression: {
        methodCallExpression: {
          expression,
          argumentList,
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
}
