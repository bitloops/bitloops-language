// import { IfStatementBuilder } from '../../builders/IfStatement.js';
// import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { TDefaultCase, TExpression, TRegularCase } from '../../../../../src/types.js';
// import { FieldBuilderDirector } from '../builders/fieldDirector.js';
// import { IdentifierBuilder } from '../builders/identifier.js';

type SwitchStatementTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expression: TExpression;
  cases: TRegularCase[];
  defaultCase: TDefaultCase;
};

export const validSwitchStatementTestCases: SwitchStatementTestCase[] = [
  // {
  //   description: 'Simple if statement with no else',
  //   fileId: 'testFile.bl',
  //   inputBLString: 'JestTestStatement { switch (a) { case 1: {const a = 1;} case 2: {const a = 2;} default: {const a = 3;} } }',
  //   expression: new ExpressionBuilderDirector().buildIdentifierExpression('a'),
  //   cases:
  //    },
];
