import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  commandKey,
  identifierKey,
  TCommand,
  TCommandIdentifier,
  TExpression,
  TVariables,
} from '../../../../../src/types.js';

export class CommandDeclarationBuilder implements IBuilder<TCommand> {
  private identifierName: TCommandIdentifier;
  private fields: TVariables;
  private commandTopic: TExpression;

  public withIdentifier(identifierName: TCommandIdentifier): CommandDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): CommandDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public withCommandTopic(commandTopic: TExpression): CommandDeclarationBuilder {
    this.commandTopic = commandTopic;
    return this;
  }

  public build(): TCommand {
    const command: TCommand = {
      [commandKey]: {
        [identifierKey]: this.identifierName,
        commandTopic: this.commandTopic,
        ...this.fields,
      },
    };

    return command;
  }
}
