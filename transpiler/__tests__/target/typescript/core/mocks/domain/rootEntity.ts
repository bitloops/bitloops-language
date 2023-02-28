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
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { RootEntityBuilderDirector } from '../../builders/domain/rootEntityDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { ValueObjectDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { ArgumentListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { ValueObjectBuilderDirector } from '../../builders/domain/valueObjectDirector.js';
import { BuiltinFunctionStatementBuilderDirector } from '../../builders/statement/builtinFunctionDirector.js';
import { StaticNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/StaticNodeBuilder.js';

type TestCase = {
  description: string;
  entity: EntityDeclarationNode;
  valueObject?: ValueObjectDeclarationNode;
  props: PropsNode[];
  output: string;
};

export const VALID_ROOT_ENTITY_TEST_CASES: TestCase[] = [
  {
    description: 'Root Entity with public and private method',
    valueObject: new ValueObjectBuilderDirector().buildValueObject('TitleVO', {
      constantNodes: [],
      constructorParameterNode: {
        propIdentifier: 'props',
        propClassName: 'TitleProps',
      },
      returnTypeParams: {
        ok: 'TitleVO',
        errors: ['DomainErrors.InvalidTitleError'],
      },
      statements: [
        new ExpressionBuilderDirector().buildAssignmentExpression(
          new ExpressionBuilderDirector().buildThisMemberDotExpression('name'),
          new ExpressionBuilderDirector().buildStringLiteralExpression('newName'),
        ),
        new BuiltinFunctionStatementBuilderDirector().buildApplyRules([
          {
            ruleIdentifier: 'InvalidTitleRule',
            argumentListNode: new ArgumentListNodeBuilder()
              .withArguments([
                new ArgumentDirector().buildArgument(
                  new ExpressionBuilderDirector().buildMemberDotOutOfVariables('props', 'title'),
                ),
              ])
              .build(),
          },
        ]),
      ],
    }),
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
                new ReturnStatementBuilderDirector().buildReturn(
                  new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
                ),
              ])
              .build(),
          )
          .withStatic(new StaticNodeBuilder().withValue(true).build())
          .build(),
      ],
      privateMethods: [],
    }),
    props: [
      new PropsDeclarationBuilderDirector().buildProps(
        'TodoProps',
        new FieldListNodeBuilder()
          .withFields([
            new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
            new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool'),
            new FieldBuilderDirector().buildRequiredBitloopsIdentifierTypeField('title', 'TitleVO'),
          ])
          .build(),
      ),
      new PropsDeclarationBuilderDirector().buildProps(
        'TitleProps',
        new FieldListNodeBuilder()
          .withFields([
            new FieldBuilderDirector().buildRequiredPrimitiveField('title', 'string'),
            new FieldBuilderDirector().buildRequiredPrimitiveField('language', 'string'),
          ])
          .build(),
      ),
    ],
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain/files/TodoRootEntity.mock.ts',
    ),
  },
];
