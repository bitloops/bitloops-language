import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { TEvaluation } from '../../../../../src/types.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  evaluation: TEvaluation;
};

export const validEvaluationTestCases: Array<TestCase> = [
  {
    description: 'valid DTO Evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { HelloWorldDTO({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildDTOEvaluation('HelloWorldDTO', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
    ]),
  },
  {
    description: 'valid struct evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { HelloWorldStruct({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('HelloWorldStruct', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
    ]),
  },
  {
    description: 'valid error evaluation',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { DomainErrors.InvalidNameError() }',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'DomainErrors.InvalidNameError',
      new ArgumentListBuilderDirector().buildArgumentListWithArgs([]),
    ),
  },
  {
    description: 'valid value object evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { NameVO({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation('NameVO', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ],
    }),
  },
  {
    description: 'Valid entity evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { NameEntity({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildEntityEvaluation('NameEntity', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ],
    }),
  },
];
