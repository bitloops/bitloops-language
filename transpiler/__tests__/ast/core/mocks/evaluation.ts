import { EvaluationFieldBuilderDirector } from '../builders/evaluationFieldDirector.js';
import { EvaluationBuilderDirector } from '../builders/evaluationDirector.js';
import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

export const validEvaluationTestCases = [
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
      [],
    ),
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

export const validValueObjectEvaluationTestCases = [
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
    description: 'valid value object evaluation with error',
    fileId: 'testFile.bl',
    inputBLString: `JestTestEvaluation { 
  NameVO({ 
    message : 'Avenue', 
    error: errorMessage 
  }) 
}`,
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation('NameVO', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Avenue'),
        new EvaluationFieldBuilderDirector().buildIdentifierEvaluationField(
          'error',
          'errorMessage',
        ),
      ],
    }),
  },
  {
    description: 'Value object evaluation with props identifier',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestEvaluation { NameVO(props) }',
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation('NameVO', {
      expression: new ExpressionBuilderDirector().buildIdentifierExpression('props'),
    }),
  },
  {
    description: 'Nested value object evaluation',
    fileId: 'testFile.bl',
    inputBLString: `JestTestEvaluation { 
      NameVO({ 
        message : 'Avenue',
        address: Address({ street : 'Avenue', city : 'New York' } ) 
      }) 
    }`,
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation('NameVO', {
      fields: [
        new EvaluationFieldBuilderDirector().buildStringEvaluationField('message', 'Avenue'),
        new EvaluationFieldBuilderDirector().buildEvaluationField(
          'address',
          new ExpressionBuilderDirector().buildEvaluation(
            new EvaluationBuilderDirector().buildStructEvaluation('Address', [
              new EvaluationFieldBuilderDirector().buildStringEvaluationField('street', 'Avenue'),
              new EvaluationFieldBuilderDirector().buildStringEvaluationField('city', 'New York'),
            ]),
          ),
        ),
      ],
    }),
  },
];
