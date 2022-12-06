// import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { TExpression, TParameterDependencies } from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';

type mockType = {
  description: string;
  inputBLString: string;
  fileId: string;
  name: string;
  message: TExpression;
  errorId: TExpression;
  parameters: TParameterDependencies;
};

export const validDomainErrors: mockType[] = [
  {
    description: 'valid Domain Error',
    fileId: 'testFile.bl',
    inputBLString:
      "DomainError InvalidNameError (name : string) { message: 'is an invalid ${ name }', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' }",
    name: 'InvalidNameError',
    message: new ExpressionBuilderDirector().buildStringLiteralExpression(
      'is an invalid ${ name }',
    ),
    errorId: new ExpressionBuilderDirector().buildStringLiteralExpression(
      'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',
    ),
    parameters: new ParameterListBuilderDirector().buildStringParams(...['name']),
  },
  // variables: [
  //   new FieldBuilderDirector().buildDoubleArrayField({
  //     name: 'name',
  //     type: 'string',
  //     isOptional: true,
  //   }),
  // ],
  // identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  // {
  //   InvalidNameError: {
  //     message: {
  //       expression: {
  //         evaluation: { regularEvaluation: { type: 'string', value: 'is an invalid name' } },
  //       },
  //     },
  //     errorId: {
  //       expression: {
  //         evaluation: {
  //           regularEvaluation: { type: 'string', value: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' },
  //         },
  //       },
  //     },
  //     parameters: [
  //       { type: { primitiveType: 'string' }, value: 'name' },
  //       { type: { primitiveType: 'string' }, value: 'hello' },
  //     ],
  //   },
  // },
  // {
  //   'Hello World': {
  //     core: {
  //       DomainErrors: {
  //         InvalidNameError: {
  //           message: { backTickString: 'name is an invalid ${name}' },
  //           errorId: { backTickString: '${errorId}' },
  //           parameters: [
  //             { type: 'string', value: 'name' },
  //             { type: 'string', value: 'errorId' },
  //           ],
  //         },
  //       },
  //     },
  //   },
  // },
];
