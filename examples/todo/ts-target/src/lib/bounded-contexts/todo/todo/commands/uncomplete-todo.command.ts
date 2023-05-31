import { Application } from '@bitloops/bl-boilerplate-core';
type TUncompleteTodoCommand = {
  id: string;
};
export class UncompleteTodoCommand extends Application.Command {
  public readonly id: string;
  constructor(uncompleteTodoRequestDTO: TUncompleteTodoCommand) {
    super('todo');
    this.id = uncompleteTodoRequestDTO.id;
  }
}
