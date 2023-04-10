import { ForStatementDirector } from '../../../builders/statement/iteration/forStatementNodeBuilderDirector.js';

export const validForStatementCases = [
  {
    description: 'const declaration with string literal expression and without type',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestConstDeclaration { for(c=0; c<=2; c+=1){} }',
    expected: new ForStatementDirector().buildForLoopWithoutBody(),
  },
];
