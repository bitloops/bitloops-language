import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TVariables,
  TPropsIdentifier,
  TProps,
  PropsKey,
  PropsIdentifierKey,
} from '../../../../src/types.js';

export class PropsDeclarationBuilder implements IBuilder<TProps> {
  private identifierName: TPropsIdentifier;
  private fields: TVariables;

  public withIdentifier(identifierName: TPropsIdentifier): PropsDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): PropsDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public build(): TProps {
    const props: TProps = {
      [PropsKey]: {
        [PropsIdentifierKey]: this.identifierName,
        ...this.fields,
      },
    };

    return props;
  }
}
