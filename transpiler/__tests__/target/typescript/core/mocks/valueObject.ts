import { ErrorIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { FieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { PropsNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { ValueObjectDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { ValueObjectBuilderDirector } from '../builders/domain/valueObjectDirector.js';
import { PropsDeclarationBuilderDirector } from '../builders/propsDeclarationDirector.js';

type TestCase = {
  description: string;
  valueObject: ValueObjectDeclarationNode;
  props: PropsNode;
  output: string;
};

export const VALID_VALUE_OBJECT_TEST_CASES: TestCase[] = [
  {
    description: 'Title Value object',
    valueObject: new ValueObjectBuilderDirector().buildValueObject('TitleVO', {
      constantNodes: [],
      parameterNode: new ParameterNodeBuilder(null)
        .withIdentifier(new ParameterIdentifierNodeBuilder(null).withIdentifier('props').build())
        .withType(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TitleProps'))
        .build(),
      returnTypeParams: {
        ok: 'TitleVO',
        errors: ['DomainErrors.InvalidTitleError'],
      },
      statements: [],
    }),
    props: new PropsDeclarationBuilderDirector().buildProps(
      'TitleProps',
      new FieldListNodeBuilder().withFields([]).build(),
    ),
    output: `import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TitleProps } from './TitleProps';
import { DomainErrors } from './errors/index';
import { Rules } from './rules/index';
export class TitleVO extends Domain.ValueObject<TitleProps> {
  private constructor(props: TitleProps) {
    super(props);
    this.props.name = 'newName';
  }
  public static create(props: TitleProps): Either<TitleVO, DomainErrors.InvalidTitleError> {
    const res = Domain.applyRules([new Rules.InvalidTitleRule(props.title)]);
    if (res) return fail(res);
    return ok(new TitleVO(props));
  }
  get title(): string {
    return this.props.title;
  }
}`,
  },
];
