import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { RootEntityBuilderDirector } from '../../builders/domain/rootEntityDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';
import { RepoPortNodeBuilderDirector } from '../../builders/repoPortNodeBuilderDirector.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { ReadModelBuilderDirector } from '../../builders/readModel.js';
import { FieldNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
import { ReadModelNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/readModel/ReadModelNode.js';
import { RepoPortNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';
import { PropsNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { EntityDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { ValueObjectDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { ValueObjectBuilderDirector } from '../../builders/domain/valueObjectDirector.js';

type WriteRepoPortTestCase = {
  description: string;
  repoPort: RepoPortNode;
  props: PropsNode[];
  output: string;
  valueObject?: ValueObjectDeclarationNode;
  rootEntity: EntityDeclarationNode;
};

type ReadRepoPortTestCase = {
  description: string;
  repoPort: RepoPortNode;
  output: string;
  readModel: ReadModelNode;
};

export const VALID_WRITE_REPO_PORT_TEST_CASES: WriteRepoPortTestCase[] = [
  {
    description: 'an aggregate repo port with no definitions',
    repoPort: new RepoPortNodeBuilderDirector().buildAggregateRepoPortWithoutMethods(),
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
      'transpiler/__tests__/target/typescript/core/mocks/repoPort/writeRepoPortNoDefinitions.mock.ts',
    ),
  },
  {
    description: 'An aggregate repo port with definitions',
    repoPort: new RepoPortNodeBuilderDirector().buildAggregateRepoPortWithMethodDefinitions(),
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
      'transpiler/__tests__/target/typescript/core/mocks/repoPort/writePortWithDefinitions.mock.ts',
    ),
  },
  {
    description: `an aggregate write repo port with no definitions, with getters for one primitive field
    and one value object with one primitive field`,
    repoPort: new RepoPortNodeBuilderDirector().buildAggregateRepoPortWithoutMethods(),
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
    props: [
      new PropsDeclarationBuilderDirector().buildProps(
        'TodoProps',
        new FieldListNodeBuilder()
          .withFields([
            new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
            new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool'),
            new FieldBuilderDirector().buildRequiredBitloopsIdentifierTypeField('email', 'EmailVO'),
          ])
          .build(),
      ),
      new PropsDeclarationBuilderDirector().buildProps(
        'EmailVOProps',
        new FieldListNodeBuilder()
          .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('value', 'string')])
          .build(),
      ),
    ],
    valueObject: new ValueObjectBuilderDirector().buildValueObject('EmailVO', {
      constantNodes: [],
      constructorParameterNode: {
        propIdentifier: 'props',
        propClassName: 'EmailVOProps',
      },
      returnTypeParams: {
        ok: 'EmailVO',
        errors: [],
      },
      statements: [],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/repoPort/writeRepoPortVOGetter.mock.ts',
    ),
  },
  {
    description: 'If the vo property has 2 fields, then no getter is generated',
    repoPort: new RepoPortNodeBuilderDirector().buildAggregateRepoPortWithoutMethods(),
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
    props: [
      new PropsDeclarationBuilderDirector().buildProps(
        'TodoProps',
        new FieldListNodeBuilder()
          .withFields([
            new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
            new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool'),
            new FieldBuilderDirector().buildRequiredBitloopsIdentifierTypeField('email', 'EmailVO'),
          ])
          .build(),
      ),
      new PropsDeclarationBuilderDirector().buildProps(
        'EmailVOProps',
        new FieldListNodeBuilder()
          .withFields([
            new FieldBuilderDirector().buildRequiredPrimitiveField('value', 'string'),
            new FieldBuilderDirector().buildRequiredPrimitiveField('domain', 'string'),
          ])
          .build(),
      ),
    ],
    valueObject: new ValueObjectBuilderDirector().buildValueObject('EmailVO', {
      constantNodes: [],
      constructorParameterNode: {
        propIdentifier: 'props',
        propClassName: 'EmailVOProps',
      },
      returnTypeParams: {
        ok: 'EmailVO',
        errors: [],
      },
      statements: [],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/repoPort/writeRepoPortVONoGetter.mock.ts',
    ),
  },
];

export const VALID_READ_REPO_PORT_TEST_CASES: ReadRepoPortTestCase[] = [
  {
    description: 'A ReadModel repo port with definitions',
    repoPort: new RepoPortNodeBuilderDirector().buildReadModelRepoPortWithMethodDefinitions(),
    readModel: new ReadModelBuilderDirector().buildReadModel({
      identifier: 'TodoReadModel',
      fields: [
        new FieldNodeBuilder()
          .withName(new IdentifierNodeBuilder().withName('name').build())
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
          .build(),
      ],
    }),
    // props: new PropsDeclarationBuilderDirector().buildProps(
    //   'TodoProps',
    //   new FieldListNodeBuilder()
    //     .withFields([
    //       new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
    //       new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool'),
    //     ])
    //     .build(),
    // ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/repoPort/readPortWithDefinitions.mock.ts',
    ),
  },
];
