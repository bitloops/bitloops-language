import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { TEvaluation } from '../../../../../src/types.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  evaluation: TEvaluation;
};

export const validCorsOptionsEvaluationEvaluationTestCases: Array<TestCase> = [
  {
    description: 'Cors options with origin',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { corsOptions({ origin: '*' }) }",
    evaluation: new EvaluationBuilderDirector().buildCorsEvaluation([
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('origin', '*'),
    ]),
  },
];
