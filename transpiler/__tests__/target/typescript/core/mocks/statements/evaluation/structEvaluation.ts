import { IdentifierNodeBuilder } from '../../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { EvaluationFieldNode } from '../../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { IdentifierNode } from '../../../../../../../src/ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { EvaluationFieldBuilderDirector } from '../../../builders/evaluationFIeld.js';
import { ExpressionBuilderDirector } from '../../../builders/expression.js';

type TValidTestCases = {
  description: string;
  identifier: IdentifierNode;
  evaluationfields: EvaluationFieldNode[];
  output: string;
};

export const VALID_STRUCT_EVALUATION_TEST_CASES: TValidTestCases[] = [
  {
    description: 'A valid struct declaration with array of int and string',
    identifier: new IdentifierNodeBuilder().withName('MyStruct').build(),
    evaluationfields: [
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'myInt',
        new ExpressionBuilderDirector().buildInt32LiteralExpression(5),
      ),
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'myString',
        new ExpressionBuilderDirector().buildStringLiteralExpression('hello'),
      ),
    ],
    output: "{myInt:5,myString:'hello'}",
  },
  {
    description: 'A valid struct declaration with array and string',
    identifier: new IdentifierNodeBuilder().withName('MyStruct').build(),
    evaluationfields: [
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'myInt',
        new ExpressionBuilderDirector().buildInt32LiteralExpression(8),
      ),
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'myString',
        new ExpressionBuilderDirector().buildStringLiteralExpression('hello world'),
      ),
    ],
    output: "{myInt:8,myString:'hello world'}",
  },
];
