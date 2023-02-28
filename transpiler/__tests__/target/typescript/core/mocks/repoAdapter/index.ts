import { ArgumentListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { EntityIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { StringLiteralBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { ExtendsRepoPortsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ExtendsRepoPortNodeBuilder.js';
import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { FieldNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PublicMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PublicMethodDeclarationNodeBuilder.js';
import { StaticNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/StaticNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ReadModelIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/readModel/ReadModelIdentifierNodeBuilder.js';
import { RepoPortIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/repo-port/RepoPortIdentifierNodeBuilder.js';
import { RepoPortBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/repo-port/RepoPortNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { DefaultEnvVarValueNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/setup/DefaultEnvVarValueNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { RootEntityBuilderDirector } from '../../builders/domain/rootEntityDirector.js';
import { ValueObjectBuilderDirector } from '../../builders/domain/valueObjectDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';
import { ReadModelBuilderDirector } from '../../builders/readModel.js';
import { RepoAdapterDefinitionDirector } from '../../builders/repoAdapterDefinition.js';
import { BuiltinFunctionStatementBuilderDirector } from '../../builders/statement/builtinFunctionDirector.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';

export const VALID_SINGLE_REPO_ADAPTER_DEFINITIONS = [
  {
    description: 'Single repo port adapter: TodoRepo without value object',
    repoPort: new RepoPortBuilder(new IntermediateASTTree(new IntermediateASTRootNode()))
      .withRepoPortIdentifierNode(
        new RepoPortIdentifierNodeBuilder().withName('TodoRepoPort').build(),
      )
      .withEntityIdentifier(new EntityIdentifierNodeBuilder().withName('TodoRootEntity').build())
      .withExtendsRepoPortNode(
        new ExtendsRepoPortsNodeBuilder()
          .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDWriteRepoPort').build()])
          .build(),
      )
      .build(),
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
      statements: [],
      publicMethods: [],
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
    repoAdapter: new RepoAdapterDefinitionDirector().buildRepoAdapterDefinition({
      identifier: 'TodoRepo',
      bcModule: {
        boundedContextName: 'Hello world',
        moduleName: 'Demo',
      },
      connection: {
        name: 'connection',
        expression: new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
      },
      collection: {
        name: 'collection',
        expression: new ExpressionBuilderDirector().buildStringLiteralExpression('todos'),
      },
      connectionInfo: {
        database: new ExpressionBuilderDirector().buildStringLiteralExpression('todo'),
        host: new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
        port: new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
      },
      dbType: 'DB.Mongo',
      concretedRepoPort: 'TodoRepoPort',
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/repoAdapter/todoRepo.mock.ts',
    ),
  },
  {
    description: 'Single repo port adapter: TodoWriteRepo without value object',
    repoPort: new RepoPortBuilder(new IntermediateASTTree(new IntermediateASTRootNode()))
      .withRepoPortIdentifierNode(
        new RepoPortIdentifierNodeBuilder().withName('TodoWriteRepoPort').build(),
      )
      .withEntityIdentifier(new EntityIdentifierNodeBuilder().withName('TodoRootEntity').build())
      .withExtendsRepoPortNode(
        new ExtendsRepoPortsNodeBuilder()
          .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDWriteRepoPort').build()])
          .build(),
      )
      .build(),
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
      statements: [],
      publicMethods: [],
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
    repoAdapter: new RepoAdapterDefinitionDirector().buildRepoAdapterDefinition({
      identifier: 'TodoWriteRepo',
      bcModule: {
        boundedContextName: 'Hello world',
        moduleName: 'Demo',
      },
      connection: {
        name: 'connection',
        expression: new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
      },
      collection: {
        name: 'collection',
        expression: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
          new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
          new DefaultEnvVarValueNodeBuilder()
            .withLiteral(new StringLiteralBuilder().withValue('todos').build())
            .build(),
        ),
      },
      connectionInfo: {
        database: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
          new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
          new DefaultEnvVarValueNodeBuilder()
            .withLiteral(new StringLiteralBuilder().withValue('todos').build())
            .build(),
        ),
        host: new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
        port: new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
      },

      dbType: 'DB.Mongo',
      concretedRepoPort: 'TodoWriteRepoPort',
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/repoAdapter/todoWriteRepo.mock.ts',
    ),
  },
  {
    description: 'Single repo port adapter: TodoReadRepoPort without value object',
    repoPort: new RepoPortBuilder(new IntermediateASTTree(new IntermediateASTRootNode()))
      .withRepoPortIdentifierNode(
        new RepoPortIdentifierNodeBuilder().withName('TodoReadRepoPort').build(),
      )
      .withReadModelIdentifier(
        new ReadModelIdentifierNodeBuilder().withName('TodoReadModel').build(),
      )
      .withExtendsRepoPortNode(
        new ExtendsRepoPortsNodeBuilder()
          .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDReadRepoPort').build()])
          .build(),
      )
      .build(),

    props: new PropsDeclarationBuilderDirector().buildProps(
      'TodoProps',
      new FieldListNodeBuilder()
        .withFields([
          new FieldBuilderDirector().buildRequiredBuiltInClassField('id', 'UUIDv4'),
          new FieldBuilderDirector().buildRequiredPrimitiveField('completed', 'bool'),
        ])
        .build(),
    ),
    readModel: new ReadModelBuilderDirector().buildReadModel({
      identifier: 'TodoReadModel',
      fields: [
        new FieldNodeBuilder()
          .withName(new IdentifierNodeBuilder().withName('name').build())
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
          .build(),
        new FieldNodeBuilder()
          .withName(new IdentifierNodeBuilder().withName('id').build())
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
          .build(),
      ],
    }),
    repoAdapter: new RepoAdapterDefinitionDirector().buildRepoAdapterDefinition({
      identifier: 'TodoReadRepo',
      bcModule: {
        boundedContextName: 'Hello world',
        moduleName: 'Demo',
      },
      connection: {
        name: 'connection',
        expression: new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
      },
      collection: {
        name: 'collection',
        expression: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
          new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
          new DefaultEnvVarValueNodeBuilder()
            .withLiteral(new StringLiteralBuilder().withValue('todos').build())
            .build(),
        ),
      },
      connectionInfo: {
        database: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
          new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
          new DefaultEnvVarValueNodeBuilder()
            .withLiteral(new StringLiteralBuilder().withValue('todos').build())
            .build(),
        ),
        host: new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
        port: new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
      },

      dbType: 'DB.Mongo',
      concretedRepoPort: 'TodoReadRepoPort',
    }),

    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/repoAdapter/todoReadRepo.mock.ts',
    ),
  },
];

export const VALID_MULTIPLE_REPO_ADAPTER_DEFINITIONS = [
  {
    description: 'Multiple repo port adapters with value object',
    repoPorts: [
      new RepoPortBuilder(new IntermediateASTTree(new IntermediateASTRootNode()))
        .withRepoPortIdentifierNode(
          new RepoPortIdentifierNodeBuilder().withName('TodoWriteRepoPort').build(),
        )
        .withEntityIdentifier(new EntityIdentifierNodeBuilder().withName('TodoEntity').build())
        .withExtendsRepoPortNode(
          new ExtendsRepoPortsNodeBuilder()
            .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDWriteRepoPort').build()])
            .build(),
        )
        .build(),
      new RepoPortBuilder(new IntermediateASTTree(new IntermediateASTRootNode()))
        .withRepoPortIdentifierNode(
          new RepoPortIdentifierNodeBuilder().withName('TodoReadRepoPort').build(),
        )
        .withReadModelIdentifier(
          new ReadModelIdentifierNodeBuilder().withName('TodoReadModel').build(),
        )
        .withExtendsRepoPortNode(
          new ExtendsRepoPortsNodeBuilder()
            .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDReadRepoPort').build()])
            .build(),
        )
        .build(),
    ],
    rootEntity: new RootEntityBuilderDirector().buildRootEntity('TodoEntity', {
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
          .withStatic(new StaticNodeBuilder().withValue(false).build())
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
          .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('title', 'string')])
          .build(),
      ),
    ],
    readModel: new ReadModelBuilderDirector().buildReadModel({
      identifier: 'TodoReadModel',
      fields: [
        new FieldNodeBuilder()
          .withName(new IdentifierNodeBuilder().withName('name').build())
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
          .build(),
        new FieldNodeBuilder()
          .withName(new IdentifierNodeBuilder().withName('id').build())
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
          .build(),
      ],
    }),
    repoAdapters: [
      new RepoAdapterDefinitionDirector().buildRepoAdapterDefinition({
        identifier: 'TodoWriteRepo',
        bcModule: {
          boundedContextName: 'Hello world',
          moduleName: 'Demo',
        },
        connection: {
          name: 'connection',
          expression: new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
        },
        collection: {
          name: 'collection',
          expression: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
            new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
            new DefaultEnvVarValueNodeBuilder()
              .withLiteral(new StringLiteralBuilder().withValue('todos').build())
              .build(),
          ),
        },
        connectionInfo: {
          database: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
            new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
            new DefaultEnvVarValueNodeBuilder()
              .withLiteral(new StringLiteralBuilder().withValue('todos').build())
              .build(),
          ),
          host: new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
          port: new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
        },

        dbType: 'DB.Mongo',
        concretedRepoPort: 'TodoWriteRepoPort',
      }),
      new RepoAdapterDefinitionDirector().buildRepoAdapterDefinition({
        identifier: 'TodoReadRepo',
        bcModule: {
          boundedContextName: 'Hello world',
          moduleName: 'Demo',
        },
        connection: {
          name: 'connection',
          expression: new ExpressionBuilderDirector().buildIdentifierExpression('mongoConnection'),
        },
        collection: {
          name: 'collection',
          expression: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
            new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
            new DefaultEnvVarValueNodeBuilder()
              .withLiteral(new StringLiteralBuilder().withValue('todos').build())
              .build(),
          ),
        },
        connectionInfo: {
          database: new ExpressionBuilderDirector().buildEnvironmentalVariableWithDefault(
            new IdentifierNodeBuilder().withName('MONGO_DB_TODO_COLLECTION').build(),
            new DefaultEnvVarValueNodeBuilder()
              .withLiteral(new StringLiteralBuilder().withValue('todos').build())
              .build(),
          ),
          host: new ExpressionBuilderDirector().buildStringLiteralExpression('localhost'),
          port: new ExpressionBuilderDirector().buildInt32LiteralExpression(27017),
        },

        dbType: 'DB.Mongo',
        concretedRepoPort: 'TodoReadRepoPort',
      }),
    ],
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
    outputs: [
      FileUtil.readFileString(
        'transpiler/__tests__/target/typescript/core/mocks/repoAdapter/multipleReposTodoWriteRepo.mock.ts',
      ),
      FileUtil.readFileString(
        'transpiler/__tests__/target/typescript/core/mocks/repoAdapter/multipleReposTodoReadRepo.mock.ts',
      ),
    ],
  },
];
