import { TCondition, TRules } from '../../../src/types.js';

// (title.length > 150) OR (title.length < 4)
const condition: TCondition = {
  condition: {
    expression: {
      logicalExpression: {
        orExpression: {
          left: {
            parenthesizedExpression: {
              relationalExpression: {
                left: {
                  evaluation: {
                    regularEvaluation: {
                      type: 'variable',
                      value: 'title.length',
                    },
                  },
                },
                right: {
                  evaluation: {
                    regularEvaluation: {
                      type: 'int32',
                      value: '150',
                    },
                  },
                },
                operator: '>',
              },
            },
          },
          right: {
            parenthesizedExpression: {
              relationalExpression: {
                left: {
                  evaluation: {
                    regularEvaluation: {
                      type: 'variable',
                      value: 'title.length',
                    },
                  },
                },
                right: {
                  evaluation: {
                    regularEvaluation: {
                      type: 'int32',
                      value: '4',
                    },
                  },
                },
                operator: '<',
              },
            },
          },
        },
      },
    },
  },
};

export const rules: TRules = {
  IsValidTitle: {
    parameters: [{ type: 'string', value: 'title' }],
    error: 'DomainErrors.InvalidTitleError',
    statements: [],
    isBrokenIfCondition: condition,
  },
};
