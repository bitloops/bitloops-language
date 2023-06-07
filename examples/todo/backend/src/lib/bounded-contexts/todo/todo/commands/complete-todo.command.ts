import { Application } from '@bitloops/bl-boilerplate-core';
type TCompleteTodoCommand = {
  todoId: string;
};
export class CompleteTodoCommand extends Application.Command {
  public readonly todoId: string;
  constructor(completeTodoRequestDTO: TCompleteTodoCommand) {
    super('todo');
    this.todoId = completeTodoRequestDTO.todoId;
  }
}
