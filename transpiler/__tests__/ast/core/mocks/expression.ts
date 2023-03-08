import { ArgumentBuilderDirector } from './../builders/argumentDirector.js';
import { EvaluationBuilderDirector } from '../builders/evaluationDirector.js';
import { EvaluationFieldBuilderDirector } from '../builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

export const generalExpressionTestCases = [
  {
    description: 'Not true expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { NOT true }',
    expression: new ExpressionBuilderDirector().buildLogicalNotExpression(
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
    ),
  },
  {
    description: 'Struct evaluation expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { HelloWorldStruct({ message: "Hello, World!" }) }',
    expression: new ExpressionBuilderDirector().buildEvaluation(
      new EvaluationBuilderDirector().buildStructEvaluation('HelloWorldStruct', [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ]),
    ),
  },
  {
    description: 'Test parenthesis with OR and AND',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { (a OR b) AND c }',
    expression: new ExpressionBuilderDirector().buildLogicalAndExpression(
      new ExpressionBuilderDirector().buildParenthesizedExpression(
        new ExpressionBuilderDirector().buildLogicalOrExpression(
          new ExpressionBuilderDirector().buildIdentifierExpression('a'),
          new ExpressionBuilderDirector().buildIdentifierExpression('b'),
        ),
      ),
      new ExpressionBuilderDirector().buildIdentifierExpression('c'),
    ),
  },
];

export const validMethodCallTestCases = [
  {
    description: 'Method call with no arguments',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a() }',
    expression: new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      { argumentList: [] },
    ),
  },
  {
    description: 'Method call with 1 argument',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { helloWorldUseCase.execute (dto)  }',
    expression: new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('helloWorldUseCase'),
        'execute',
      ),
      { argumentList: [new ArgumentBuilderDirector().buildIdentifierArgument('dto')] },
    ),
  },
  {
    description: 'Method call with 2 arguments',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { helloWorldUseCase.execute (dto, tismas)  }',
    expression: new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('helloWorldUseCase'),
        'execute',
      ),
      {
        argumentList: [
          new ArgumentBuilderDirector().buildIdentifierArgument('dto'),
          new ArgumentBuilderDirector().buildIdentifierArgument('tismas'),
        ],
      },
    ),
  },
];

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
  {
    description: 'a regex literal',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { /hello/ }',
    expression: new ExpressionBuilderDirector().buildRegexLiteralExpression('/hello/'),
  },
  {
    description: 'a regex literal with flags',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { /S+@S+.S+/g }',
    expression: new ExpressionBuilderDirector().buildRegexLiteralExpression('/S+@S+.S+/g'),
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

export const validAssignmentExpressionTestCases = [
  {
    description: 'Assign to this property',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { this.hello = "John Doe" }',
    expression: new ExpressionBuilderDirector().buildAssignmentExpression(
      new ExpressionBuilderDirector().buildMemberExpression(
        new ExpressionBuilderDirector().buildThisExpression(),
        'hello',
      ),
      new ExpressionBuilderDirector().buildStringLiteralExpression('John Doe'),
    ),
  },
  {
    description: "assign to a variable's property",
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { person.age = 42 }',
    expression: new ExpressionBuilderDirector().buildAssignmentExpression(
      new ExpressionBuilderDirector().buildMemberExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('person'),
        'age',
      ),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
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

export const validAdditiveExpressionTestCases = [
  {
    description: 'Add two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 + 2 }',
    expression: new ExpressionBuilderDirector().buildAdditiveExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
    ),
  },
  {
    description: 'Add two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a + b }',
    expression: new ExpressionBuilderDirector().buildAdditiveExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
  },
];

export const validMultiplicativeExpressionTestCases = [
  {
    description: 'Multiply two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 * 2 }',
    expression: new ExpressionBuilderDirector().buildMultiplicativeExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
    ),
  },
  {
    description: 'Multiply two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a * b }',
    expression: new ExpressionBuilderDirector().buildMultiplicativeExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
  },
];

export const validRelationalExpressionTestCases = [
  {
    description: 'Relational expression with two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 > 2 }',
    expression: new ExpressionBuilderDirector().buildRelationalExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
      '>',
    ),
  },
  {
    description: 'Relational expression with two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a < b }',
    expression: new ExpressionBuilderDirector().buildRelationalExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
      '<',
    ),
  },
];

export const validEqualityExpressionTestCases = [
  {
    description: 'Equality expression with two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 == 2 }',
    expression: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
      '==',
    ),
  },
  {
    description: 'Equality expression with two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a != b }',
    expression: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
      '!=',
    ),
  },
];

export const validLogicalAndExpressionTestCases = [
  {
    description: 'Logical and expression with two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 AND 2 }',
    expression: new ExpressionBuilderDirector().buildLogicalAndExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
    ),
  },
  {
    description: 'Logical and expression with two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a AND b }',
    expression: new ExpressionBuilderDirector().buildLogicalAndExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
  },
];

export const validLogicalOrExpressionTestCases = [
  {
    description: 'Logical or expression with two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 OR 2 }',
    expression: new ExpressionBuilderDirector().buildLogicalOrExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
    ),
  },
  {
    description: 'Logical or expression with two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a OR b }',
    expression: new ExpressionBuilderDirector().buildLogicalOrExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
  },
];

export const validXorExpressionTestCases = [
  {
    description: 'Xor expression with two ints',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { 1 XOR 2 }',
    expression: new ExpressionBuilderDirector().buildLogicalXorExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
    ),
  },
  {
    description: 'Xor expression with two variables',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { a XOR b }',
    expression: new ExpressionBuilderDirector().buildLogicalXorExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
  },
];
