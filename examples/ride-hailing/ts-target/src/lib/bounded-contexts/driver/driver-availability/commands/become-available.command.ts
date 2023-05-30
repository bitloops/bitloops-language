import { Application } from '@bitloops/bl-boilerplate-core';
type TBecomeAvailableCommand = {
  id: string;
};
export class BecomeAvailableCommand extends Application.Command {
  public readonly id: string;
  constructor(becomeAvailableRequestDTO: TBecomeAvailableCommand) {
    super('driver');
    this.id = becomeAvailableRequestDTO.id;
  }
}
