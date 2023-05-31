import { Application } from '@bitloops/bl-boilerplate-core';
type TAddTodoCommand = {
  title: string;
};
export class AddTodoCommand extends Application.Command {
  public readonly title: string;
  constructor(addTodoRequestDTO: TAddTodoCommand) {
    super('todo');
    this.title = addTodoRequestDTO.title;
  }
}
