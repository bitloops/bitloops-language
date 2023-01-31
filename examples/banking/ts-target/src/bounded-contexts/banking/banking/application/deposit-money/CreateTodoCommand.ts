import { Application } from '@bitloops/bl-boilerplate-core';

import { CreateTodoRequestDTO } from '../../dtos/CreateTodoRequestDTO';

import { CONTEXT_ID as contextId } from '../../config';
import { CREATE_TODO_COMMAND_NAME } from '../../contracts';

export class CreateTodoCommand extends Application.Command {
  public title: string;

  // Set static name so we can refer to them easily
  public static readonly commandName = CREATE_TODO_COMMAND_NAME;

  constructor(userData: CreateTodoRequestDTO) {
    super(CreateTodoCommand.commandName, contextId);
    const { title } = userData;
    this.title = title;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(CreateTodoCommand.commandName, contextId);
  }
}
