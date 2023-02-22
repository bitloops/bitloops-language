import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationNodeBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { EntityDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { PropsNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { EntityBuilderDirector } from '../../builders/domain/entityDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { StaticNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/StaticNodeBuilder.js';

type TestCase = {
  description: string;
  entity: EntityDeclarationNode;
  props: PropsNode;
  output: string;
};

export const VALID_ENTITY_TEST_CASES: TestCase[] = [
  {
    description: 'Entity with public and private method',
    entity: new EntityBuilderDirector().buildEntitySimplified('TodoEntity', {
      constantNodes: [],
      constructorParameterNode: {
        propIdentifier: 'props',
        propClassName: 'TodoProps',
      },
      returnTypeParams: {
        ok: 'TodoEntity',
        errors: ['DomainErrors.InvalidTitleError'],
      },
      statements: [
        new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('id', 7),
      ],
      publicMethods: [
        new PublicMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('complete').build())
          .withParameters(new ParameterListNodeBuilder(null).withParameters([]).build())
          .withReturnType(
            new ReturnOkErrorTypeNodeBuilder()
              .withOk(
                new ReturnOkTypeNodeBuilder()
                  .withType(
                    new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType('TodoEntity'),
                  )
                  .build(),
              )
              .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
              .build(),
          )
          .withStatements(
            new StatementListNodeBuilder()
              .withStatements([
                new ReturnStatementBuilderDirector().buildReturn(
                  new ExpressionBuilderDirector().buildStringLiteralExpression('hey'),
                ),
              ])
              .build(),
          )
          .withStatic(new StaticNodeBuilder().withValue(false).build())
          .build(),
      ],
      privateMethods: [
        new PrivateMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('isValidName').build())
          .withParameters(
            new ParameterListNodeBuilder()
              .withParameters([
                new ParameterBuilderDirector().buildPrimitiveParameter('name', 'string'),
              ])
              .build(),
          )
          .withReturnType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bool'))
          .withStatements(
            new StatementListNodeBuilder()
              .withStatements([
                new ReturnStatementBuilderDirector().buildReturn(
                  new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
                ),
              ])
              .build(),
          )
          .withStatic(new StaticNodeBuilder().withValue(false).build())
          .build(),
      ],
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
    output: `import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
    import { TodoProps } from './TodoProps';
    import { DomainErrors } from './errors/index';
    export class TodoEntity extends Domain.Entity<TodoProps> {
      private constructor(props: TodoProps) {
        super(props, props.id);
      }
      public static create(props: TodoProps): Either<TodoEntity, DomainErrors.InvalidTitleError> {
        const id = 7;
        return ok(new TodoEntity(props));
      }
      get id() {
        return this._id;
      }
      get completed(): boolean {
        return this.props.completed;
      }
      private isValidName(name: string): boolean {
        return true;
      }
      public complete(): Either<TodoEntity, never> {
        return 'hey';
      }
    }`,
  },
  {
    description: 'Entity where constructor does not fail, with 2 public methods',
    entity: new EntityBuilderDirector().buildEntitySimplified('TodoEntity', {
      constantNodes: [],
      constructorParameterNode: {
        propIdentifier: 'props',
        propClassName: 'TodoProps',
      },
      returnTypeParams: {
        ok: 'TodoEntity',
        errors: [],
      },
      statements: [
        new ExpressionBuilderDirector().buildAssignmentExpression(
          new ExpressionBuilderDirector().buildMemberDotOutOfVariables('props', 'completed'),
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
                  .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('void'))
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
          .withStatic(new StaticNodeBuilder().withValue(false).build())
          .build(),
        new PublicMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('complete').build())
          .withParameters(new ParameterListNodeBuilder(null).withParameters([]).build())
          .withReturnType(
            new ReturnOkErrorTypeNodeBuilder()
              .withOk(
                new ReturnOkTypeNodeBuilder()
                  .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bool'))
                  .build(),
              )
              .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
              .build(),
          )
          .withStatements(
            new StatementListNodeBuilder()
              .withStatements([
                new ReturnStatementBuilderDirector().buildReturnOK(
                  new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
                ),
              ])
              .build(),
          )
          .withStatic(new StaticNodeBuilder().withValue(false).build())
          .build(),
      ],
      privateMethods: [],
    }),
    props: new PropsDeclarationBuilderDirector().buildProps(
      'TodoProps',
      new FieldListNodeBuilder()
        .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool')])
        .build(),
    ),
    output: `import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
    import { TodoProps } from './TodoProps';
    export class TodoEntity extends Domain.Entity<TodoProps> {
      private constructor(props: TodoProps) {
        super(props, props.id);
      }
      public static create(props: TodoProps): Either<TodoEntity, never> {
        props.completed = false;
        return ok(new TodoEntity(props));
      }
      get id() {
        return this._id;
      }
      get completed(): boolean {
        return this.props.completed;
      }
      public uncomplete(): Either<void, never> {
        this.props.completed = false;
        return ok();
      }
      public complete(): Either<boolean, never> {
        return ok(true);
      }
    }
    `,
  },
];
