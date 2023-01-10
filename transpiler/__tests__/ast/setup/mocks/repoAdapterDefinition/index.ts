import { FileUtil } from '../../../../../src/utils/file.js';
import { EvaluationFieldBuilderDirector } from '../../../core/builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { RepoAdapterBuilder } from '../../builders/repoAdapterBuilder.js';
import { SetupRepoAdapterDefinitionBuilder } from '../../builders/setupRepoAdapterDefinitionBuilder.js';

export const VALID_REPO_ADAPTER_DEFINITIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/repoAdapterDefinition/repoAdapterDefinition.bl',
    ),
    description: 'Valid Repo Adapter Definition',
    fileId: 'setup.bl',
    setupRepoAdapterDefinition: new SetupRepoAdapterDefinitionBuilder()
      .withIdentifier('todoRepo')
      .withExpression({
        dbType: 'DB.Mongo',
        boundedContextName: 'Hello world',
        moduleName: 'Demo',
        concretedRepoPort: 'TodoRepoPort',
        className: 'MongoTodoRepo',
        connectionOptions: {
          fields: [
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'host',
              new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
            ),
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'port',
              new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
            ),
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'database',
              new ExpressionBuilderDirector().buildStringLiteralExpression('todo'),
            ),
          ],
        },
        options: {
          fields: [
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'connection',
              new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
            ),
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'collection',
              new ExpressionBuilderDirector().buildStringLiteralExpression('todos'),
            ),
          ],
        },
      })
      .build(),
    repoAdapter: new RepoAdapterBuilder()
      .withIdentifier('todoRepo')
      .withExpression({
        dbType: 'DB.Mongo',
        boundedContextName: 'Hello world',
        moduleName: 'Demo',
        concretedRepoPort: 'TodoRepoPort',
        className: 'MongoTodoRepo',
        connectionOptions: {
          fields: [
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'host',
              new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
            ),
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'port',
              new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
            ),
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'database',
              new ExpressionBuilderDirector().buildStringLiteralExpression('todo'),
            ),
          ],
        },
        options: {
          fields: [
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'connection',
              new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
            ),
            new EvaluationFieldBuilderDirector().buildEvaluationField(
              'collection',
              new ExpressionBuilderDirector().buildStringLiteralExpression('todos'),
            ),
          ],
        },
      })
      .build(),
  },
];
