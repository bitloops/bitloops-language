/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
/* eslint-disable @typescript-eslint/ban-types */
import Container from '../../../../container';
import { CommandMetadata } from '../../../domain/commands/ICommand';
import { UniqueEntityID } from '../../../domain/UniqueEntityID';
import Hook, { HookRunParams } from '../../../utils/Hook';

export enum HooksEnum {
  afterCreate = 'afterCreate',
  afterDestroy = 'afterDestroy',
  afterUpdate = 'afterUpdate',
  afterSave = 'afterSave',
  afterUpsert = 'afterUpsert',
}

export interface IRepoHookHandlers {
  [HooksEnum.afterCreate]?: Function;
  [HooksEnum.afterDestroy]?: Function;
  [HooksEnum.afterUpdate]?: Function;
  [HooksEnum.afterSave]?: Function;
  [HooksEnum.afterUpsert]?: Function;
}

export const dispatchEventsCallback = async (
  aggregateId: UniqueEntityID,
  metadata?: CommandMetadata,
) => {
  // DomainEvents.dispatchEventsForAggregate(aggregateId);
  const { events } = Container.getServices();
  await events.dispatchEventsForAggregate(aggregateId, metadata);
};

export class RepositoryHook extends Hook {
  private constructor() {
    super();
  }

  public static create(repoHookHandlers: IRepoHookHandlers): RepositoryHook {
    const repositoryHook = new RepositoryHook();
    for (const [specificHookName, func] of Object.entries(repoHookHandlers)) {
      repositoryHook.add(specificHookName, func);
    }
    return repositoryHook;
  }

  public run(hookName: keyof typeof HooksEnum, params: HookRunParams) {
    return super.run(hookName, params);
  }
}
