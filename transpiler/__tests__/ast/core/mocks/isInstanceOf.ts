//| JestTestExpression { result is Error } | { "expression": { "isInstanceOf": { "expression": { "identifier": "result" }, "class": "Error" } } } | @bitloops-auto-generated |
import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

export const validIsInstanceOfExpressions = [
  {
    description: 'is isInstanceOf with identifier',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression { result is Error }',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('result'),
    class: 'Error',
  },
];
