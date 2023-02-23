import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';

import { EntityDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { PropsNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { EntityBuilderDirector } from '../../builders/domain/entityDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';

import { FileUtil } from '../../../../../../src/utils/file.js';
import { ValueObjectBuilderDirector } from '../../builders/domain/valueObjectDirector.js';
import { ValueObjectDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { ArgumentListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { BuiltinFunctionStatementBuilderDirector } from '../../builders/statement/builtinFunctionDirector.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationNodeBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';

type TestCase = {
  description: string;
  entity: EntityDeclarationNode;
  valueObjects?: ValueObjectDeclarationNode[];
  props: PropsNode[];
  output: string;
};

export const VALID_ENTITY_TEST_CASES: TestCase[] = [
  {
    description: 'Entity with public/private methods and value object in props',
    valueObjects: [
      new ValueObjectBuilderDirector().buildValueObject('TitleVO', {
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
      new ValueObjectBuilderDirector().buildValueObject('LanguageVO', {
        constantNodes: [],
        constructorParameterNode: {
          propIdentifier: 'props',
          propClassName: 'LanguageProps',
        },
        returnTypeParams: {
          ok: 'LanguageVO',
          errors: ['DomainErrors.InvalidLanguageError'],
        },
        statements: [
          new ExpressionBuilderDirector().buildAssignmentExpression(
            new ExpressionBuilderDirector().buildThisMemberDotExpression('code'),
            new ExpressionBuilderDirector().buildStringLiteralExpression('newCode'),
          ),
          new BuiltinFunctionStatementBuilderDirector().buildApplyRules([
            {
              ruleIdentifier: 'InvalidCodeRule',
              argumentListNode: new ArgumentListNodeBuilder()
                .withArguments([
                  new ArgumentDirector().buildArgument(
                    new ExpressionBuilderDirector().buildMemberDotOutOfVariables('props', 'code'),
                  ),
                ])
                .build(),
            },
          ]),
        ],
      }),
    ],
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
          .build(),
      ],
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
            new FieldBuilderDirector().buildRequiredBitloopsIdentifierTypeField(
              'language',
              'LanguageVO',
            ),
          ])
          .build(),
      ),
      new PropsDeclarationBuilderDirector().buildProps(
        'LanguageProps',
        new FieldListNodeBuilder()
          .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('code', 'string')])
          .build(),
      ),
    ],
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain/files/TodoEntity.mock.ts',
    ),
  },
  {
    description: 'Entity with 2 public methods and primitive props',
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
          ])
          .build(),
      ),
    ],
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain/files/TodoEntityWithPrimitives.mock.ts',
    ),
  },
  // {
  //   description: 'Entity with public/private methods and standard value object in props',
  //   valueObjects: [
  //     new ValueObjectBuilderDirector().buildValueObject('TitleVO', {
  //       constantNodes: [],
  //       constructorParameterNode: {
  //         propIdentifier: 'props',
  //         propClassName: 'TitleProps',
  //       },
  //       returnTypeParams: {
  //         ok: 'TitleVO',
  //         errors: ['DomainErrors.InvalidTitleError'],
  //       },
  //       statements: [
  //         new ExpressionBuilderDirector().buildAssignmentExpression(
  //           new ExpressionBuilderDirector().buildThisMemberDotExpression('name'),
  //           new ExpressionBuilderDirector().buildStringLiteralExpression('newName'),
  //         ),
  //         new BuiltinFunctionStatementBuilderDirector().buildApplyRules([
  //           {
  //             ruleIdentifier: 'InvalidTitleRule',
  //             argumentListNode: new ArgumentListNodeBuilder()
  //               .withArguments([
  //                 new ArgumentDirector().buildArgument(
  //                   new ExpressionBuilderDirector().buildMemberDotOutOfVariables('props', 'title'),
  //                 ),
  //               ])
  //               .build(),
  //           },
  //         ]),
  //       ],
  //     }),
  //     new ValueObjectBuilderDirector().buildValueObject('MoneyVO', {
  //       constantNodes: [],
  //       constructorParameterNode: {
  //         propIdentifier: 'props',
  //         propClassName: 'MoneyProps',
  //       },
  //       returnTypeParams: {
  //         ok: 'MoneyVO',
  //         errors: ['DomainErrors.InvalidMonetaryValueError'],
  //       },
  //       statements: [],
  //     }),
  //   ],
  //   entity: new EntityBuilderDirector().buildEntitySimplified('AccountEntity', {
  //     constantNodes: [],
  //     constructorParameterNode: {
  //       propIdentifier: 'props',
  //       propClassName: 'AccountProps',
  //     },
  //     returnTypeParams: {
  //       ok: 'AccountEntity',
  //       errors: ['DomainErrors.InvalidMonetaryValueError'],
  //     },
  //     statements: [],
  //     publicMethods: [],
  //     privateMethods: [],
  //   }),
  //   props: [
  //     new PropsDeclarationBuilderDirector().buildProps(
  //       'AccountProps',
  //       new FieldListNodeBuilder()
  //         .withFields([
  //           new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
  //           new FieldBuilderDirector().buildRequiredPrimitiveField('version', 'string'),
  //           new FieldBuilderDirector().buildRequiredBitloopsIdentifierTypeField('money', 'MoneyVO'),
  //         ])
  //         .build(),
  //     ),
  //     new PropsDeclarationBuilderDirector().buildProps(
  //       'MoneyProps',
  //       new FieldListNodeBuilder()
  //         .withFields([
  //           new FieldBuilderDirector().buildRequiredPrimitiveField('amount', 'int32'),
  //           new FieldBuilderDirector().buildStandardVOField('currency', 'CurrencyVO', true),
  //         ])
  //         .build(),
  //     ),
  //   ],
  //   output: FileUtil.readFileString(
  //     'transpiler/__tests__/target/typescript/core/mocks/domain/files/TodoEntityWithStandardVO.mock.ts',
  //   ),
  // },
];
