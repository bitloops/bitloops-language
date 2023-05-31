import { Application } from '@bitloops/bl-boilerplate-core';
type TModifyTodoTitleCommand = {
  title: string;
  id: string;
};
export class ModifyTodoTitleCommand extends Application.Command {
  public readonly title: string;
  public readonly id: string;
  constructor(modifyTodoTitleRequestDTO: TModifyTodoTitleCommand) {
    super('todo');
    this.title = modifyTodoTitleRequestDTO.title;
    this.id = modifyTodoTitleRequestDTO.id;
  }
}
