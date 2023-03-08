import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TParameterList,
  TCommandHandler,
  TCommandHandlerIdentifier,
  identifierKey,
  commandHandlerKey,
} from '../../../../../src/types.js';

export class CommandHandlerDeclarationBuilder implements IBuilder<TCommandHandler> {
  private identifierName: TCommandHandlerIdentifier;
  private execute: TExecute;
  private parameters: TParameterList;

  public withIdentifier(
    identifierName: TCommandHandlerIdentifier,
  ): CommandHandlerDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withExecute(execute: TExecute): CommandHandlerDeclarationBuilder {
    this.execute = execute;
    return this;
  }

  public withParameterList(parameters: TParameterList): CommandHandlerDeclarationBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TCommandHandler {
    const commandHandler = {
      [commandHandlerKey]: {
        [identifierKey]: this.identifierName,
        execute: this.execute,
        ...this.parameters,
      },
    };

    return commandHandler;
  }
}
