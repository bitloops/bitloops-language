import { Application } from '@bitloops/bl-boilerplate-core';
type TDeleteTodoCommand = {
  id: string;
};
export class DeleteTodoCommand extends Application.Command {
  public readonly id: string;
  constructor(deleteTodoRequestDTO: TDeleteTodoCommand) {
    super('todo');
    this.id = deleteTodoRequestDTO.id;
  }
}
