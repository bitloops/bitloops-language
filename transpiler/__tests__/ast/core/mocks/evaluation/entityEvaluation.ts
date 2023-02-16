import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { TEvaluation } from '../../../../../src/types.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  evaluation: TEvaluation;
};

export const validEntityEvaluationTestCases: Array<TestCase> = [
  {
    description: 'Valid entity evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { NameEntity.create({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildEntityEvaluation('NameEntity', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ],
    }),
  },
  {
    description: 'Valid entity evaluation with props',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { NameEntity.create(props) }',
    evaluation: new EvaluationBuilderDirector().buildEntityEvaluation('NameEntity', {
      expression: new ExpressionBuilderDirector().buildIdentifierExpression('props'),
    }),
  },
];
