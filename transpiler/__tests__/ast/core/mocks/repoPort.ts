import { TRepoPort } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { ExtendsRepoPortBuilder } from '../builders/extendedRepoBuilder.js';
import { IdentifierBuilder } from '../builders/identifier.js';
import { MethodDefinitionBuilderDirector } from '../builders/methodDefinitionDirector.js';
import { RepoPortBuilder } from '../builders/repoPortBuilder.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TRepoPort;
};
export const validRepoPortCases: TestCase[] = [
  {
    description: 'Simple Write Repo port declaration with no method definitions',
    fileId: 'testFile.bl',
    inputBLString: 'RepoPort TodoRepoPort<TodoEntity> extends CRUDRepoPort;',
    expected: new RepoPortBuilder()
      .withIdentifier('TodoRepoPort')
      .withAggregateRootName('TodoEntity')
      .withExtendedRepoPorts(
        new ExtendsRepoPortBuilder()
          .withIdentifier([new IdentifierBuilder().withName('CRUDRepoPort').build()])
          .build(),
      )
      .build(),
  },
  {
    description: 'Write Repo port declaration with method definitions',
    fileId: 'testFile.bl',
    inputBLString:
      'RepoPort TodoRepoPort<TodoEntity> extends CRUDRepoPort  { updateTodoTitle(id:string, title: string): void;',
    expected: new RepoPortBuilder()
      .withIdentifier('TodoRepoPort')
      .withAggregateRootName('TodoEntity')
      .withExtendedRepoPorts(
        new ExtendsRepoPortBuilder()
          .withIdentifier([new IdentifierBuilder().withName('CRUDRepoPort').build()])
          .build(),
      )
      .withDefinitionMethods([
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndBitloopsPrimaryTypeReturn(
          {
            methodName: 'updateTodoTitle',
            params: [
              { name: 'id', type: 'string' },
              { name: 'title', type: 'string' },
            ],
            returnType: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('void'),
          },
        ),
      ])
      .build(),
  },
  {
    description: 'Read Repo port declaration with method definitions',
    fileId: 'testFile.bl',
    inputBLString:
      ' RepoPort TodoReadRepoPort<TodoReadModel> extends CRUDRepoPort  { getTodo(): TodoReadModel; }',
    expected: new RepoPortBuilder()
      .withIdentifier('TodoReadRepoPort')
      .withReadModelName('TodoReadModel')
      .withExtendedRepoPorts(
        new ExtendsRepoPortBuilder()
          .withIdentifier([new IdentifierBuilder().withName('CRUDRepoPort').build()])
          .build(),
      )
      .withDefinitionMethods([
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndBitloopsPrimaryTypeReturn(
          {
            methodName: 'getTodo',
            params: [],
            returnType: new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
              'TodoReadModel',
            ),
          },
        ),
      ])
      .build(),
  },
  {
    description: 'Read Repo port declaration without method definitions',
    fileId: 'testFile.bl',
    inputBLString: ' RepoPort TodoReadRepoPort<TodoReadModel> extends CRUDRepoPort;',
    expected: new RepoPortBuilder()
      .withIdentifier('TodoReadRepoPort')
      .withReadModelName('TodoReadModel')
      .withExtendedRepoPorts(
        new ExtendsRepoPortBuilder()
          .withIdentifier([new IdentifierBuilder().withName('CRUDRepoPort').build()])
          .build(),
      )
      .build(),
  },
];
