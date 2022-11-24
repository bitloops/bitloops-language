import { TExpression } from './types.js';
const a: TExpression = {
  expression: {
    methodCallExpression: {
      expression: {
        memberDotExpression: {
          expression: {
            identifier: 'helloWorldUseCase',
          },
          identifier: 'execute',
        },
      },
      argumentList: [
        {
          argument: {
            expression: {
              identifier: 'dto',
            },
          },
        },
        {
          argument: {
            expression: {
              identifier: 'tismas',
            },
          },
        },
      ],
    },
  },
};
