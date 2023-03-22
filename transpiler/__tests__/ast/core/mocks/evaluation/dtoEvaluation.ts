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

export const validDTOEvaluationTestCases: Array<TestCase> = [
  {
    description: 'valid DTO evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { HelloDTO ({ message : 'Avenue', error : 'New York' } ) }",
    evaluation: new EvaluationBuilderDirector().buildDTOEvaluation('HelloDTO', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Avenue'),
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('error', 'New York'),
    ]),
  },
  {
    description: 'valid DTO evaluation with Struct evaluation field',
    fileId: 'testFile.bl',
    inputBLString:
      "JestTestEvaluation { HelloDTO({ name : 'Ms. Anderson', address : Address({ street : 'Avenue', city : 'New York' })}) }",
    evaluation: new EvaluationBuilderDirector().buildDTOEvaluation('HelloDTO', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('name', 'Ms. Anderson'),
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'address',
        new ExpressionBuilderDirector().buildEvaluation(
          new EvaluationBuilderDirector().buildStructEvaluation('Address', [
            new EvaluationFieldBuilderDirector().buildStringEvaluationField('street', 'Avenue'),
            new EvaluationFieldBuilderDirector().buildStringEvaluationField('city', 'New York'),
          ]),
        ),
      ),
    ]),
  },
];
