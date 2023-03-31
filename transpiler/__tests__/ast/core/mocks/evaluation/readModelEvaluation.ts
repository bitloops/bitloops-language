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
      "JestTestEvaluation { UserReadModel.create({ destination: 'user@bitloops.com', origin: 'marketing@bitloops.com',content: 'Congratulation for completing your first todo!' })}",
    evaluation: new EvaluationBuilderDirector().buildReadModelEvaluation('UserReadModel', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField(
          'destination',
          'user@bitloops.com',
        ),
        new EvaluationFieldBuilderDirector().buildStringEvaluationField(
          'origin',
          'marketing@bitloops.com',
        ),
        new EvaluationFieldBuilderDirector().buildStringEvaluationField(
          'content',
          'Congratulation for completing your first todo!',
        ),
      ],
    }),
  },
];
