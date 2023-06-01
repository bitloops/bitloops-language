import { FileUtil } from '../../../../src/utils/file.js';

export const RULE_END_TO_END_TEST_CASES = [
  {
    description:
      'Rule that passes a parameter as argument to the error message, and checks that `this.` is prepended ',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-this-parameter.bl',
    ),
    className: 'MarketingNotificationDomainService',
    BoundedContextModuleNames: ['Todo', 'Todo'],
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-this-parameter.mock.ts',
    ),
  },
];
