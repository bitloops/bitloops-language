import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { FieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { RootEntityBuilderDirector } from '../builders/domain/rootEntityDirector.js';
import { ExpressionBuilderDirector } from '../builders/expression.js';
import { FieldBuilderDirector } from '../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../builders/propsDeclarationDirector.js';
import { RepoPortNodeBuilderDirector } from '../builders/repoPortNodeBuilderDirector.js';
import { ReturnStatementBuilderDirector } from '../builders/statement/returnDirector.js';

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
    rootEntity: new RootEntityBuilderDirector().buildRootEntity('TodoRootEntity', {
      constantNodes: [],
      constructorParameterNode: {
        propIdentifier: 'props',
        propClassName: 'TodoProps',
      },
      returnTypeParams: {
        ok: 'TodoRootEntity',
        errors: [],
      },
      statements: [
        new ExpressionBuilderDirector().buildAssignmentExpression(
          new ExpressionBuilderDirector().buildThisMemberDotExpression('completed'),
          new ExpressionBuilderDirector().buildBooleanLiteralExpression(false),
        ),
      ],
      publicMethods: [
        new PublicMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('uncomplete').build())
          .withParameters(new ParameterListNodeBuilder(null).withParameters([]).build())
          .withReturnType(
            new ReturnOkErrorTypeNodeBuilder()
              .withOk(
                new ReturnOkTypeNodeBuilder()
                  .withType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('void'))
                  .build(),
              )
              .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
              .build(),
          )
          .withStatements(
            new StatementListNodeBuilder()
              .withStatements([
                new ExpressionBuilderDirector().buildAssignmentExpression(
                  new ExpressionBuilderDirector().buildThisMemberDotExpression('completed'),
                  new ExpressionBuilderDirector().buildBooleanLiteralExpression(false),
                ),
                new ReturnStatementBuilderDirector().buildEmptyReturnOK(),
              ])
              .build(),
          )
          .build(),
        new PublicMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('complete').build())
          .withParameters(new ParameterListNodeBuilder(null).withParameters([]).build())
          .withReturnType(
            new ReturnOkErrorTypeNodeBuilder()
              .withOk(
                new ReturnOkTypeNodeBuilder()
                  .withType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'))
                  .build(),
              )
              .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
              .build(),
          )
          .withStatements(
            new StatementListNodeBuilder()
              .withStatements([
                new ReturnStatementBuilderDirector().buildReturn(
                  new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
                ),
              ])
              .build(),
          )
          .build(),
      ],
      privateMethods: [],
    }),
    props: new PropsDeclarationBuilderDirector().buildProps(
      'TodoProps',
      new FieldListNodeBuilder()
        .withFields([
          new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
          new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool'),
        ])
        .build(),
    ),
    output:
      "import { Application, Domain } from '@bitloops/bl-boilerplate-core'; \n import { TodoEntity } from '../domain/TodoEntity';export type TodoRepoPort = Application.Repo.ICRUDWritePort<TodoEntity,Domain.UUIDv4>;",
  },
];
