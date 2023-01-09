import { FileUtil } from '../../../../../src/utils/file.js';
import { EvaluationFieldBuilderDirector } from '../../../core/builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { RepoAdapterDefinitionBuilder } from '../../builders/repoAdapterDefinitionBuilder.js';

export const VALID_REPO_ADAPTER_DEFINITIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/repoAdapterDefinition/repoAdapterDefinition.bl',
    ),
    description: 'Valid Repo Adapter Definition',
    fileId: 'setup.bl',
    repoAdapterDefinition: new RepoAdapterDefinitionBuilder()
      .withIdentifier('todoRepo')
      .withExpression({
        dbType: 'DB.Mongo',
        boundedContextName: 'Demo',
        moduleName: 'Hello World',
        concretedRepoPort: 'TodoRepoPort',
        className: 'MongoTodoRepo',
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
