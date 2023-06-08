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
  {
    description: 'Rule that does not have error arguments in isBrokenIf ',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-no-error-arguments.bl',
    ),
    className: 'MarketingNotificationDomainService',
    BoundedContextModuleNames: ['Todo', 'Todo'],
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-no-error-arguments.mock.ts',
    ),
  },
  {
    description: 'Rule that have empty error arguments in isBrokenIf ',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-empty-error-arguments.bl',
    ),
    className: 'MarketingNotificationDomainService',
    BoundedContextModuleNames: ['Todo', 'Todo'],
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-empty-error-arguments.mock.ts',
    ),
  },
  {
    description: 'Rule that have statements constDeclaration, if and switch in isBrokenIf ',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-with-statements.bl',
    ),
    className: 'MarketingNotificationDomainService',
    BoundedContextModuleNames: ['Todo', 'Todo'],
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rule/rule-with-statements.mock.ts',
    ),
  },
];
