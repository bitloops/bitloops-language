import {
  TAdditiveOperator,
  TArgumentList,
  TBitloopsPrimaryType,
  TEnvironmentVariableExpression,
  TEqualityOperator,
  TEvaluation,
  TExpression,
  TIfErrorExpression,
  TLiteralValues,
  TMultiplicativeOperator,
  TNumericLiteral,
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

  buildEnvVariableExpression(identifier: string, defaultValue?: TLiteralValues): TExpression {
    const envValue: TEnvironmentVariableExpression = {
      environmentVariable: {
        identifier,
      },
    };
    if (defaultValue) {
      envValue.environmentVariable.defaultValue = defaultValue;
    }
    return {
      expression: envValue,
    };
  }

  buildEnvVariableExpressionWithDefaultNumericLiteral(
    identifier: string,
    defaultValue: TNumericLiteral,
  ): TExpression {
    return {
      expression: {
        environmentVariable: {
          identifier,
          defaultValue,
        },
      },
    };
  }

  buildEnvVariableExpressionWithDefaultStringLiteral(
    identifier: string,
    stringLiteral: string,
  ): TExpression {
    return {
      expression: {
        environmentVariable: {
          identifier,
          defaultValue: {
            stringLiteral,
          },
        },
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
  buildRegexLiteralExpression(regexLiteral: string): TExpression {
    return {
      expression: {
        literal: {
          regexLiteral,
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
          ...argumentList,
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
  buildIsInstanceOfExpression(
    expression: TExpression,
    className: TBitloopsPrimaryType,
  ): TExpression {
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

  buildIfErrorExpression(ifError: TIfErrorExpression): TExpression {
    return {
      expression: {
        ...ifError,
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
