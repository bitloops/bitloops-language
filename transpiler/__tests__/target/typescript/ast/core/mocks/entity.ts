import { PrivateMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { PublicMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationListNodeBuilder.js';
import { EntityBuilderDirector } from '../../../core/builders/domain/entityDirector.js';
import { DomainCreateBuilderDirector } from '../../../core/builders/domainCreateBuilderDirector.js';
import { PrivateMethodBuilderDirector } from '../../../core/builders/methods/privateMethodBuilderDirector.js';
import { PublicMethodBuilderDirector } from '../../../core/builders/methods/publicMethodBuilderDirector.js';

export const ENTITY_TEST_CASES = [
  {
    description:
      'entity that has this member dot expression and this method call expression in its methods',
    entity: new EntityBuilderDirector().buildEntity({
      entityName: 'TodoEntity',
      createMethod: new DomainCreateBuilderDirector().buildCreateWithThisAssignmentExpression(
        'name',
      ),
      publicMethods: new PublicMethodDeclarationListNodeBuilder()
        .withMethods([
          new PublicMethodBuilderDirector().buildMethodWithThisMethodCallExpression({
            methodName: 'testPublicMethod',
            entityName: 'TodoEntity',
            identifierMethodName: 'testMethod',
            identifierArgumentName: 'name',
          }),
        ])
        .build(),
      privateMethods: new PrivateMethodDeclarationListNodeBuilder()
        .withMethods([
          new PrivateMethodBuilderDirector().buildMethodWithThisAssignmentExpression({
            methodName: 'testPrivateMethod',
            entityName: 'TodoEntity',
            thisIdentifierName: 'name',
          }),
        ])
        .build(),
    }),
    expectedOutput: new EntityBuilderDirector().buildEntity({
      entityName: 'TodoEntity',
      createMethod: new DomainCreateBuilderDirector().buildCreateWithThisPropsAssignmentExpression(
        'name',
      ),
      publicMethods: new PublicMethodDeclarationListNodeBuilder()
        .withMethods([
          new PublicMethodBuilderDirector().buildMethodWithThisPropsMethodCallExpression({
            methodName: 'testPublicMethod',
            entityName: 'TodoEntity',
            identifierMethodName: 'testMethod',
            identifierArgumentName: 'name',
          }),
        ])
        .build(),
      privateMethods: new PrivateMethodDeclarationListNodeBuilder()
        .withMethods([
          new PrivateMethodBuilderDirector().buildMethodWithThisPropsAssignmentExpression({
            methodName: 'testPrivateMethod',
            entityName: 'TodoEntity',
            thisIdentifierName: 'name',
          }),
        ])
        .build(),
    }),
  },
];
