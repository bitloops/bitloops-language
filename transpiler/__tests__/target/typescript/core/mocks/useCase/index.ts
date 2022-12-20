import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { UseCaseBuilderDirector } from '../../builders/useCase.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    output: fs.readFileSync(`${__dirname}/createTodoUseCase.ts`).toString(),
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
    output: fs.readFileSync(`${__dirname}/getAllTodosUseCase.ts`).toString(),
  },
];
