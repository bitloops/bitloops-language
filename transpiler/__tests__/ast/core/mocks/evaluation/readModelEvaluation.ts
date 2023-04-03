import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { TEvaluation } from '../../../../../src/types.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  evaluation: TEvaluation;
};

export const validReadModelEvaluationTestCases: Array<TestCase> = [
  {
    description: 'Valid read model evaluation',
    fileId: 'testFile.bl',
    inputBLString:
      "JestTestEvaluation { UserEmailReadModel.create({ userId: '123', destination: 'user@bitloops.com' })}",
    evaluation: new EvaluationBuilderDirector().buildReadModelEvaluation('UserEmailReadModel', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('userId', '123'),
        new EvaluationFieldBuilderDirector().buildStringEvaluationField(
          'destination',
          'user@bitloops.com',
        ),
      ],
    }),
  },
];
