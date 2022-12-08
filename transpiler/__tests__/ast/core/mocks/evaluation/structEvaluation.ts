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

export const validStructEvaluationEvaluationTestCases: Array<TestCase> = [
  {
    description: 'valid struct evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { Address({ street : 'Avenue', city : 'New York' }) }",
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('Address', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('street', 'Avenue'),
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('city', 'New York'),
    ]),
  },
  {
    description: 'Nested struct evaluation',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { Address({  location : Location({long: 23, lat: 24})} ) }',
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('Address', [
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'location',
        new ExpressionBuilderDirector().buildEvaluation(
          new EvaluationBuilderDirector().buildStructEvaluation('Location', [
            new EvaluationFieldBuilderDirector().buildIntEvaluationField('long', 23),
            new EvaluationFieldBuilderDirector().buildIntEvaluationField('lat', 24),
          ]),
        ),
      ),
    ]),
  },
];
