import { Application } from '@bitloops/bl-boilerplate-core';
type TBecomeUnavailableCommand = {
  id: string;
};
export class BecomeUnavailableCommand extends Application.Command {
  public readonly id: string;
  constructor(becomeUnavailableRequestDTO: TBecomeUnavailableCommand) {
    super('driver');
    this.id = becomeUnavailableRequestDTO.id;
  }
}
