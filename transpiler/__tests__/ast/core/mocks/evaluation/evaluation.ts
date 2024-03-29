import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { TEvaluation } from '../../../../../src/types.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';

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
    inputBLString: "JestTestEvaluation { NameVO.create({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation('NameVO', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ],
    }),
  },
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
    description: 'valid Command Evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { CreateTodoCommand.create({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildCommandEvaluation('CreateTodoCommand', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
    ]),
  },
  {
    description: 'valid Query Evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { GetAllTodoQuery.create({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildQueryEvaluation('GetAllTodoQuery', [
      new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
    ]),
  },
  {
    description: 'valid Query Evaluation with no fields',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { GetAllTodoQuery.create()}',
    evaluation: new EvaluationBuilderDirector().buildQueryEvaluation('GetAllTodoQuery'),
  },
  {
    description: 'Valid integration event evaluation',
    fileId: 'testFile.bl',
    inputBLString:
      "JestTestEvaluation { NameIntegrationEvent.create({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildIntegrationEventEvaluation(
      'NameIntegrationEvent',
      {
        fields: [
          new EvaluationFieldBuilderDirector().buildStringEvaluationField(
            'message',
            'Hello, World!',
          ),
        ],
      },
    ),
  },
  {
    description: 'Valid entity constructor evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { NameEntity({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildEntityConstructorEvaluation('NameEntity', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ],
    }),
  },
  {
    description: 'Valid value object constructor evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { NameVO({ message: 'Hello, World!' })}",
    evaluation: new EvaluationBuilderDirector().buildValueObjectonstructorEvaluation('NameVO', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Hello, World!'),
      ],
    }),
  },
  {
    description: 'valid Domain Event Evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestEvaluation { UserCreatedDomainEvent.create({ email: 'john@doe.com' })}",
    evaluation: new EvaluationBuilderDirector().buildDomainEventEvaluation(
      'UserCreatedDomainEvent',
      [new EvaluationFieldBuilderDirector().buildStringEvaluationField('email', 'john@doe.com')],
    ),
  },
  {
    description: 'valid package adapter evaluation',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { GherkinPackage.encode(value) }',
    evaluation: new EvaluationBuilderDirector().buildPackageEvaluation(
      'GherkinPackage',
      'encode',
      new ArgumentListBuilderDirector().buildArgumentList(['value']),
    ),
  },
];

export const validStandardVOEvaluationTestCases: Array<TestCase> = [
  {
    description: 'valid Currency Standard VO',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestEvaluation {StandardVO.Currency.create({ currencyCode: data.balance.currency, })}',
    evaluation: new EvaluationBuilderDirector().buildStandardVOEvaluation('Currency', [
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'currencyCode',
        new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(
          'data',
          'balance',
          'currency',
        ),
      ),
    ]),
  },
];
