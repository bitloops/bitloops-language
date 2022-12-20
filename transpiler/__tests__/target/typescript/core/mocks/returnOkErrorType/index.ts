import fs from 'fs';

export const VALID_RETURN_OK_ERROR_TYPE_TEST_CASES = [
  {
    description: 'Create todo useCase',
    returnOkErrorType: '',
    output: fs.readFileSync(`${__dirname}/createTodoUseCase.ts`).toString(),
  },
];
