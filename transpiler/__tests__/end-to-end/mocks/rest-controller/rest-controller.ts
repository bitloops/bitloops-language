import { FileUtil } from '../../../../src/utils/file.js';

export const REST_CONTROLLER_END_TO_END_TEST_CASES = [
  {
    description: 'Todo Demo Create Controller',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rest-controller/todo-demo-create-controller.bl',
    ),
    className: 'CreateTodoRESTController',
    setupBLString: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rest-controller/setup.bl',
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/rest-controller/todo-demo-create-controller.mock.ts',
    ),
  },
];
