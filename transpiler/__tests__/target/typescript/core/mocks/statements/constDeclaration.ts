import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';

export const VALID_CONST_DECLARATION_TEST_CASES = [
  {
    description: 'A const declaration of a struct evaluation',
    constDeclaration: new ConstDeclarationBuilderDirector().buildStructEvaluationConstDeclaration(
      'hello',
      'Hello',
      [
        new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
          'name',
          'helloWorld',
        ),
      ],
      new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType('Hello'),
    ),
    output: "const hello: Hello = {name:'helloWorld'}",
  },
  {
    description: 'A const declaration of a primitive evaluation',
    constDeclaration: new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration(
      'numOfTeachers',
      25,
    ),
    output: 'const numOfTeachers = 25',
  },
  {
    description: 'A const declaration of built in class evaluation of Domain.UUIDv4',
    constDeclaration: new ConstDeclarationBuilderDirector().buildStringExpressionConstDeclaration(
      'id',
      'e25-453',
      new BitloopsPrimaryTypeNodeDirector().buildBuiltinClassPrimaryType('UUIDv4'),
    ),
    output: "const id: Domain.UUIDv4 = 'e25-453'",
  },
];
