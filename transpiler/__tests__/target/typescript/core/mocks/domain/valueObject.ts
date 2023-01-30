import { ArgumentListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/methods/PrivateMethodDeclarationNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { PropsNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { ValueObjectDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { BitloopsPrimaryTypeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { ValueObjectBuilderDirector } from '../../builders/domain/valueObjectDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { PropsDeclarationBuilderDirector } from '../../builders/propsDeclarationDirector.js';
import { BuiltinFunctionStatementBuilderDirector } from '../../builders/statement/builtinFunctionDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';

type TestCase = {
  description: string;
  valueObject: ValueObjectDeclarationNode;
  props: PropsNode;
  output: string;
  outputProps: string;
};

export const VALID_VALUE_OBJECT_TEST_CASES: TestCase[] = [
  {
    description: 'Title Value object with apply rule with no private methods',
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
    props: new PropsDeclarationBuilderDirector().buildProps(
      'TitleProps',
      new FieldListNodeBuilder()
        .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('title', 'string')])
        .build(),
    ),
    output: `import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
    import { TitleProps } from './TitleProps';
    import { DomainErrors } from './errors/index';
    import { DomainRules } from './rules/index';
    export class TitleVO extends Domain.ValueObject<TitleProps> {
      private constructor(props: TitleProps) {
        super(props);
        this.props.name = 'newName';
      }
      public static create(props: TitleProps): Either<TitleVO, DomainErrors.InvalidTitleError> {
        const res = Domain.applyRules([new DomainRules.InvalidTitleRule(props.title)]);
        if (res) return fail(res);
        return ok(new TitleVO(props));
      }
      get title(): string {
        return this.props.title;
      }
    }`,
    outputProps: 'export interface TitleProps { title: string; }',
  },
  {
    description: 'Value object with some private methods and const declarations',
    valueObject: new ValueObjectBuilderDirector().buildValueObject('NameVO', {
      constantNodes: [
        new ConstDeclarationBuilderDirector().buildStringExpressionConstDeclaration(
          'vName',
          'Kostas',
          new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
        ),
      ],
      constructorParameterNode: { propIdentifier: 'props', propClassName: 'NameProps' },
      returnTypeParams: {
        ok: 'NameVO',
        errors: ['DomainErrors.InvalidNameError'],
      },
      statements: [
        new ExpressionBuilderDirector().buildAssignmentExpression(
          new ExpressionBuilderDirector().buildThisMemberDotExpression('name'),
          new ExpressionBuilderDirector().buildStringLiteralExpression('newName'),
        ),
      ],
      privateMethods: [
        new PrivateMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('testMethod').build())
          .withParameters(new ParameterListNodeBuilder().withParameters([]).build())
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
                  new ExpressionBuilderDirector().buildThisMemberDotExpression('name'),
                  new ExpressionBuilderDirector().buildStringLiteralExpression('newName'),
                ),
                new ReturnStatementBuilderDirector().buildEmptyReturnOK(),
              ])
              .build(),
          )
          .build(),
        new PrivateMethodDeclarationNodeBuilder()
          .withIdentifier(new IdentifierNodeBuilder().withName('isInvalidName').build())
          .withParameters(
            new ParameterListNodeBuilder()
              .withParameters([
                new ParameterBuilderDirector().buildPrimitiveParameter('name', 'string'),
              ])
              .build(),
          )
          .withReturnType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'))
          .withStatements(
            new StatementListNodeBuilder()
              .withStatements([
                new ReturnStatementBuilderDirector().buildReturn(
                  new ExpressionBuilderDirector().buildMethodCallExpression(
                    new ExpressionBuilderDirector().buildMemberDotOutOfVariables('regName', 'test'),
                    new ArgumentListDirector().buildArgumentListWithArgs([
                      new ArgumentDirector().buildArgument(
                        new ExpressionBuilderDirector().buildIdentifierExpression('name'),
                      ),
                    ]),
                  ),
                ),
              ])
              .build(),
          )
          .build(),
      ],
    }),
    props: new PropsDeclarationBuilderDirector().buildProps(
      'NameProps',
      new FieldListNodeBuilder()
        .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string')])
        .build(),
    ),
    output: `import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
    import { NameProps } from './NameProps';
    import { DomainErrors } from './errors/index';
    const vName: string = 'Kostas';
    export class NameVO extends Domain.ValueObject<NameProps> {
      private constructor(props: NameProps) {
        super(props);
        this.props.name = 'newName';
      }
      public static create(props: NameProps): Either<NameVO, DomainErrors.InvalidNameError> {
        return ok(new NameVO(props));
      }
      get name(): string {
        return this.props.name;
      }
      private testMethod(): Either<void, never> {
        this.props.name = 'newName';
        return ok();
      }
      private isInvalidName(name: string): boolean {
        return regName.test(name);
      }
    }`,
    outputProps: 'export interface TitleProps { title: string; }',
  },
];
