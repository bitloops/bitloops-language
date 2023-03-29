import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { TEvaluation } from '../../../../../src/types.js';
import { ArgumentBuilderDirector } from '../../builders/argumentDirector.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  evaluation: TEvaluation;
};

export const validDomainServiceEvaluationTestCases: Array<TestCase> = [
  {
    description: 'Valid domain service evaluation with one argument',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { MarketingDomainService.create(this.repo)}',
    evaluation: new EvaluationBuilderDirector().buildDomainServiceEvaluation(
      'MarketingDomainService',
      {
        argumentList: [new ArgumentBuilderDirector().buildThisMemberDotArgument(['repo'])],
      },
    ),
  },
  {
    description: 'Valid domain service evaluation with 2 arguments',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestEvaluation { MarketingDomainService.create(this.repo, this.externalAPI)}',
    evaluation: new EvaluationBuilderDirector().buildDomainServiceEvaluation(
      'MarketingDomainService',
      {
        argumentList: [
          new ArgumentBuilderDirector().buildThisMemberDotArgument(['repo']),
          new ArgumentBuilderDirector().buildThisMemberDotArgument(['externalAPI']),
        ],
      },
    ),
  },
];
