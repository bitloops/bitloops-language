import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  commandKey,
  identifierKey,
  TCommand,
  TCommandIdentifier,
  TVariables,
} from '../../../../../src/types.js';

export class CommandDeclarationBuilder implements IBuilder<TCommand> {
  private identifierName: TCommandIdentifier;
  private fields: TVariables;

  public withIdentifier(identifierName: TCommandIdentifier): CommandDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): CommandDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public build(): TCommand {
    const command: TCommand = {
      [commandKey]: {
        [identifierKey]: this.identifierName,
        ...this.fields,
      },
    };

    return command;
  }
}
