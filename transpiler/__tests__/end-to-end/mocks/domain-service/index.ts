import { FileUtil } from '../../../../src/utils/file.js';

export const DOMAIN_SERVICE_END_TO_END_TEST_CASES = [
  {
    description: 'Todo Demo Create Controller',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/domain-service/todo-marketing-domain-service.bl',
    ),
    className: 'MarketingNotificationDomainService',
    BoundedContextModuleNames: ['Todo', 'Todo'],
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/domain-service/todo-marketing-domain-service.mock.ts',
    ),
  },
];
