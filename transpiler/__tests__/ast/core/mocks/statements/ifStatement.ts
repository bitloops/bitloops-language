import { IfStatementBuilder } from '../../builders/IfStatement.js';
import { TExpression, TStatements } from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
// import { FieldBuilderDirector } from '../builders/fieldDirector.js';
// import { IdentifierBuilder } from '../builders/identifier.js';

type IfStatementTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  condition: TExpression;
  thenStatements: TStatements;
  elseStatements?: TStatements;
};

export const validIfStatementTestCases: IfStatementTestCase[] = [
  {
    description: 'Simple if statement with no else',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestStatement { if (a == b) { helloWorldRequest.execute() } }',
    condition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
    thenStatements: [
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(
          'helloWorldRequest',
          'execute',
        ),
        [],
      ),
    ],
  },
  {
    description: 'Simple if statement with else',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestStatement { if (a == b) { helloWorldRequest.execute() } else { helloWorldRequest.execute() } }',
    condition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
    thenStatements: [
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(
          'helloWorldRequest',
          'execute',
        ),
        [],
      ),
    ],
    elseStatements: [
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(
          'helloWorldRequest',
          'execute',
        ),
        [],
      ),
    ],
  },
  {
    description: 'If statement with nested if statement',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestStatement { if (a == b) { if (c == d) { helloWorldRequest.execute() } } }',
    condition: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
    thenStatements: [
      new IfStatementBuilder()
        .withCondition(
          new ExpressionBuilderDirector().buildEqualityExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('c'),
            new ExpressionBuilderDirector().buildIdentifierExpression('d'),
          ),
        )
        .withThenStatements([
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(
              'helloWorldRequest',
              'execute',
            ),
            [],
          ),
        ])
        .build(),
    ],
  },
  {
    description: 'If statement with nested else statement',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestStatement { if ( a AND b ) { execute(); } else { if (a ==1) { a; } } }',
    condition: new ExpressionBuilderDirector().buildLogicalAndExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
    thenStatements: [
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('execute'),
        [],
      ),
    ],
    elseStatements: [
      new IfStatementBuilder()
        .withCondition(
          new ExpressionBuilderDirector().buildEqualityExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('a'),
            new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
          ),
        )
        .withThenStatements([new ExpressionBuilderDirector().buildIdentifierExpression('a')])
        .build(),
    ],
  },
  {
    description: 'If else statement with 2 statements on each block',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestStatement { if ( a AND b ) { execute(); execute(); } else { if (a ==1) { a; a; } } }',
    condition: new ExpressionBuilderDirector().buildLogicalAndExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      new ExpressionBuilderDirector().buildIdentifierExpression('b'),
    ),
    thenStatements: [
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('execute'),
        [],
      ),
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('execute'),
        [],
      ),
    ],
    elseStatements: [
      new IfStatementBuilder()

        .withCondition(
          new ExpressionBuilderDirector().buildEqualityExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('a'),
            new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
          ),
        )
        .withThenStatements([
          new ExpressionBuilderDirector().buildIdentifierExpression('a'),
          new ExpressionBuilderDirector().buildIdentifierExpression('a'),
        ])
        .build(),
    ],
  },
];
