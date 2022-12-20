// import { DomainCreateBuilderDirector } from '../builders/domainCreateBuilderDirector.js';
import { RepoPortNodeBuilderDirector } from '../builders/repoPortNodeBuilderDirector.js';
// import { RootEntityNodeBuilderDirector } from '../builders/rootEntityNodeBuilderDirector.js';

export const VALID_REPO_PORT_TEST_CASES = [
  {
    description: 'an aggregate repo port with no definitions',
    repoPort: new RepoPortNodeBuilderDirector().buildAggregateRepoPortWithoutMethods(),
    // rootEntity: new RootEntityNodeBuilderDirector().buildRootEntityNoMethods({
    //   entityName: 'TodoEntity',
    //   createMethod: new DomainCreateBuilderDirector().buildCreateEntityWithNoError({
    //     entityName: 'TodoEntity',
    //     entityPropsIdentifierType: 'Props',
    //     entityPropsName: 'TodoProps',
    //   }),
    // }),
    output:
      "import { Application, Domain } from '@bitloops/bl-boilerplate-core'; \n import { TodoEntity } from '../domain/TodoEntity';export type TodoRepoPort = Application.Repo.ICRUDWritePort<TodoEntity,Domain.UUIDv4>;",
  },
];
