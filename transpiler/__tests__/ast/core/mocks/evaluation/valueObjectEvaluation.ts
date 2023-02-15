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

export const validValueObjectEvaluationTestCases: Array<TestCase> = [
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
    description: 'valid value object evaluation with error',
    fileId: 'testFile.bl',
    inputBLString: `JestTestEvaluation { 
  NameVO.create({ 
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
    inputBLString: 'JestTestEvaluation { NameVO.create(props) }',
    evaluation: new EvaluationBuilderDirector().buildValueObjectEvaluation('NameVO', {
      expression: new ExpressionBuilderDirector().buildIdentifierExpression('props'),
    }),
  },
  {
    description: 'Nested value object evaluation',
    fileId: 'testFile.bl',
    inputBLString: `JestTestEvaluation { 
      NameVO.create({ 
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
