import { ConstDeclarationBuilderDirector } from '../../builders/statement/statementDirector.js';

export const validConstDeclarationCases = [
  {
    description: 'const declaration with string literal expression and without type',
    fileId: 'testFile.bl',
    inputBLString: "JestTestConstDeclaration { const studentName = 'Kostas' }",
    expected:
      new ConstDeclarationBuilderDirector().buildConstDeclarationWithStringLiteralExpression({
        name: 'studentName',
        stringLiteralExpression: 'Kostas',
      }),
  },
  //   {
  //     description: 'const declaration with string literal expression and type',
  //     fileId: 'testFile.bl',
  //     inputBLString: "JestTestConstDeclaration { const studentName: string = 'Kostas' }",
  //     expected:
  //       new ConstDeclarationBuilderDirector().buildConstDeclarationWithStringLiteralExpressionAndType(
  //         {
  //           name: 'studentName',
  //           stringLiteralExpression: 'Kostas',
  //           type: 'string',
  //         },
  //       ),
  //   },
  //   {
  //     description: 'const declaration with member expression',
  //     fileId: 'testFile.bl',
  //     inputBLString: 'JestTestExpression { const studentName = this.name }',
  //     expected: new ConstDeclarationBuilderDirector().buildConstDeclarationWithMemberExpression({
  //       name: 'studentName',
  //       rightExpression: 'name',
  //     }),
  //   },
];
