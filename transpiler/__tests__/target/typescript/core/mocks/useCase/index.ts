import { UseCaseBuilderDirector } from '../../builders/useCase.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/return.js';
import { FileUtil } from '../../../../../../src/utils/file.js';

export const VALID_USE_CASE_TEST_CASES = [
  {
    description: 'Create todo useCase',
    useCase: new UseCaseBuilderDirector().buildUseCase({
      identifier: 'CreateTodoUseCase',
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter('todoRepo', 'TodoWriteRepoPort'),
      ],
      returnType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypePrimitiveType(
        'void',
        ['DomainErrors.TitleOutOfBoundsError'],
      ),
      executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
        'requestDTO',
        'CreateTodoRequestDTO',
      ),
      statements: [
        new ConstDeclarationBuilderDirector().buildValueObjectConstDeclarationWithEvaluationFields({
          identifier: 'title',
          valueObjectIdentifier: 'TitleVO',
          evaluationFields: [
            new EvaluationFieldBuilderDirector().buildMemberDotEvaluationField(
              'title',
              'requestDTO',
              'title',
            ),
          ],
        }),
        new ConstDeclarationBuilderDirector().buildEntityEvaluationConstDeclaration({
          identifier: 'todo',
          entityIdentifier: 'TodoEntity',
          evaluationFields: [
            new EvaluationFieldBuilderDirector().buildIdentifierEvaluationField('title', 'title'),
            new EvaluationFieldBuilderDirector().buildBooleanLiteralEvaluationField(
              'completed',
              false,
            ),
          ],
        }),
        new ExpressionBuilderDirector().buildThisDependencyMethodCall(
          'todoRepo',
          'save',
          new ArgumentListDirector().buildArgumentListWithIdentifierExpression('todo'),
        ),
        new ReturnStatementBuilderDirector().buildReturnOKEmpty(),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/useCase/createTodoUseCase.ts',
    ),
  },
  {
    description: 'Get all todos useCase',
    useCase: new UseCaseBuilderDirector().buildUseCase({
      identifier: 'GetAllTodosUseCase',
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter('todoRepo', 'TodoReadRepoPort'),
      ],
      returnType:
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifierArrayType(
          'TodoReadModel',
        ),
      statements: [
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'todos',
          new ExpressionBuilderDirector().buildThisDependencyMethodCall(
            'todoRepo',
            'getAll',
            new ArgumentListDirector().buildArgumentListWithArgs([]),
          ),
        ),
        new ReturnStatementBuilderDirector().buildReturnOK(
          new ExpressionBuilderDirector().buildIdentifierExpression('todos'),
        ),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/useCase/getAllTodosUseCase.ts',
    ),
  },
];
