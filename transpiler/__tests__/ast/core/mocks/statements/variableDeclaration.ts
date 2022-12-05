import { VariableDeclarationBuilderDirector } from '../../builders/statement/statementDirector.js';

export const validVariableDeclarationCases = [
  {
    description: 'Variable declaration with float and type',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestVariableDeclaration { a: float = 3.14;}',
    expected:
      new VariableDeclarationBuilderDirector().buildVariableDeclarationWithFloatLiteralExpression({
        name: 'a',
        numberExpression: 3.14,
        type: 'float',
      }),
  },
  {
    description: 'Variable declaration with string literal expression and type',
    fileId: 'testFile.bl',
    inputBLString: "JestTestVariableDeclaration { studentName: string = 'Kostas' }",
    expected:
      new VariableDeclarationBuilderDirector().buildVariableDeclarationWithStringLiteralExpressionAndType(
        {
          name: 'studentName',
          stringLiteralExpression: 'Kostas',
          type: 'string',
        },
      ),
  },
  {
    description: 'variable declaration with dot expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestVariableDeclaration { message: string = this.message; }',
    expected:
      new VariableDeclarationBuilderDirector().buildVariableDeclarationWithMemberExpressionAndType({
        name: 'message',
        rightExpression: 'message',
        type: 'string',
      }),
  },
  {
    description: 'variable declaration with boolean expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestVariableDeclaration { c: bool = (true OR false) AND true; }',
    expected:
      new VariableDeclarationBuilderDirector().buildVariableDeclarationWithBooleanAndOrExpressionAndType(
        {
          name: 'c',
        },
      ),
  },
];
