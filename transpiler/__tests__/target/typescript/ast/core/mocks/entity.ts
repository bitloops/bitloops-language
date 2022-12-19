import { PrivateMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { PublicMethodDeclarationListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationListNodeBuilder.js';
import { DomainCreateBuilderDirector } from '../../../core/builders/domainCreateBuilderDirector.js';
import { EntityBuilderDirector } from '../../../core/builders/entityBuilderDirector.js';
import { PrivateMethodBuilderDirector } from '../../../core/builders/methods/privateMethodBuilderDirector.js';
import { PublicMethodBuilderDirector } from '../../../core/builders/methods/publicMethodBuilderDirector.js';

export const ENTITY_TEST_CASES = [
  {
    description: 'entity that has 2 dependency calls that need await',
    entity: new EntityBuilderDirector().buildEntity({
      entityName: 'TodoEntity',
      createMethod: new DomainCreateBuilderDirector().buildCreateWithThisAssignmentExpression(
        'name',
      ),
      publicMethods: new PublicMethodDeclarationListNodeBuilder()
        .withMethods([
          new PublicMethodBuilderDirector().buildMethodWithThisAssignmentExpression({
            methodName: 'testPublicMethod',
            entityName: 'TodoEntity',
            thisIdentifierName: 'name',
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
          new PublicMethodBuilderDirector().buildMethodWithThisAssignmentExpression({
            methodName: 'testPublicMethod',
            entityName: 'TodoEntity',
            thisIdentifierName: 'name',
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
  },
];
