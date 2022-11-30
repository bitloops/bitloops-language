import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

export const validExpressionLiteralTestCases = [
  {
    description: 'Simple int32 literal',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 42 }',
    expression: new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
  },
  {
    description: 'a numeric string',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { "42" }',
    expression: new ExpressionBuilderDirector().buildStringLiteralExpression('42'),
  },
  {
    description: 'a random String literal',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { "A random string" }',
    expression: new ExpressionBuilderDirector().buildStringLiteralExpression('A random string'),
  },
  {
    description: 'a simple boolean literal',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { true }',
    expression: new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
  },
];

export const validExpressionIdentifierTestCases = [
  {
    description: 'simple identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { helloWorld }',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('helloWorld'),
  },
  {
    description: 'a DTO identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { PersonDTO }',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('PersonDTO'),
  },
];

export const validMemberDotExpressionTestCases = [
  {
    description: 'simple identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { this.hello }',
    expression: new ExpressionBuilderDirector().buildMemberExpression(
      new ExpressionBuilderDirector().buildThisExpression(),
      'hello',
    ),
  },
  {
    description: 'a DTO identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { this.person.name }',
    expression: new ExpressionBuilderDirector().buildMemberExpression(
      new ExpressionBuilderDirector().buildMemberExpression(
        new ExpressionBuilderDirector().buildThisExpression(),
        'person',
      ),
      'name',
    ),
  },
  {
    description: 'a DTO identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { person.name }',
    expression: new ExpressionBuilderDirector().buildMemberExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('person'),
      'name',
    ),
  },
];

export const validArrayLiteralExpressionTestCases = [
  {
    description: 'An array of ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { [1, 2, 3] }',
    expression: new ExpressionBuilderDirector().buildArrayLiteralExpressionOf(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(3),
    ),
  },
];
