import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
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
  {
    description: 'const declaration with string literal expression and type',
    fileId: 'testFile.bl',
    inputBLString: "JestTestConstDeclaration { const studentName: string = 'Kostas' }",
    expected:
      new ConstDeclarationBuilderDirector().buildConstDeclarationWithStringLiteralExpressionAndType(
        {
          name: 'studentName',
          stringLiteralExpression: 'Kostas',
          type: 'string',
        },
      ),
  },
  {
    description: 'const declaration with member expression ',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestConstDeclaration { const result = this.params }',
    expected: new ConstDeclarationBuilderDirector().buildConstDeclarationWithMemberThisExpression({
      name: 'result',
      rightExpression: 'params',
    }),
  },
  {
    description: 'const declaration with dto evaluation ',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestConstDeclaration { const dto = HelloWorldResponseDTO({ name: request.body }) }',
    expected: new ConstDeclarationBuilderDirector().buildConstDeclarationWithDTOEvaluation({
      name: 'dto',
      dtoIdentifier: 'HelloWorldResponseDTO',
      dtoFields: [
        new EvaluationFieldBuilderDirector().buildEvaluationField(
          'name',
          new ExpressionBuilderDirector().buildMemberExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('request'),
            'body',
          ),
        ),
      ],
    }),
  },
  {
    description: 'const declaration with builtIn Class evaluation ',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestConstDeclaration { const requestID = UUIDv4(id); }',
    expected: new ConstDeclarationBuilderDirector().buildBuiltInClassEvaluation({
      name: 'requestID',
      builtInClassIdentifier: 'UUIDv4',
      builtInClassArgs: ['id'],
    }),
  },
];
