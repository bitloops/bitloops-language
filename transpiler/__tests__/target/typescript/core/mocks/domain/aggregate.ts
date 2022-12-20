import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { EntityDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { PropsNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { BitloopsPrimaryTypeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { RootEntityBuilderDirector } from '../../builders/domain/rootEntityDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';

type TestCase = {
  description: string;
  entity: EntityDeclarationNode;
  props: PropsNode;
  output: string;
};

export const VALID_AGGREGATE_TEST_CASES: TestCase[] = [
  {
    description: 'Aggregate with public and private method',
    entity: new RootEntityBuilderDirector().buildRootEntity('TodoRootEntity', {
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
    output: `import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
    import { TodoProps } from './TodoProps';
    export class TodoRootEntity extends Domain.Aggregate<TodoProps> {
      private constructor(props: TodoProps) {
        super(props, props.id);
        this.props.completed = false;
      }
      public static create(props: TodoProps): Either<TodoRootEntity, never> {
        return ok(new TodoRootEntity(props));
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
        return true;
      }
    }`,
  },
];
