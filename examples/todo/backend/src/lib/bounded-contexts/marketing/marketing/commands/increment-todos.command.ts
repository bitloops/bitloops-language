import { Application } from '@bitloops/bl-boilerplate-core';
type TIncrementTodosCommand = {
  id: string;
};
export class IncrementTodosCommand extends Application.Command {
  public readonly id: string;
  constructor(incrementTodosRequestDTO: TIncrementTodosCommand) {
    super('marketing');
    this.id = incrementTodosRequestDTO.id;
  }
}
