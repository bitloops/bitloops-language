import { FileUtil } from '../../../../../src/utils/file.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { RepoConnectionDefinitionBuilderDirector } from '../../builders/RepoConnectionDefinitionBuilderDirector.js';

export const VALID_REPO_CONNECTION_DEFINITION_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/repoConnectionDefinition/mongoRepoConnection.bl',
    ),
    description: 'Repo connection definition of mongo',
    fileId: 'setup.bl',
    repoConnectionDefinition:
      new RepoConnectionDefinitionBuilderDirector().buildMongoRepoConnectionDefinition({
        connectionIdentifier: 'mongoConnection',
        host: 'localhost',
        port: 27017,
        databaseName: 'todo',
      }),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/repoConnectionDefinition/mongoConnectionWithEnvDefault.bl',
    ),
    description: 'Repo connection with env var & default value',
    fileId: 'setup.bl',
    repoConnectionDefinition:
      new RepoConnectionDefinitionBuilderDirector().buildCustomMongoRepoConnectionDefinition({
        connectionIdentifier: 'mongoConnection',
        host: new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
        port: new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
        databaseName:
          new ExpressionBuilderDirector().buildEnvVariableExpressionWithDefaultStringLiteral(
            'MONGO_DB_DATABASE',
            'todo',
          ),
      }),
  },
];
