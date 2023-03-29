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
import { IQuery } from './IQuery';
import { GenericMessageHandler } from '../messages/IMessageBus';
import { Application } from '../..';

export type RegisterHandler<T extends IQuery> = GenericMessageHandler<T>;

export interface IQueryBus {
  request(query: any): Promise<any>;
  pubSubSubscribe(
    subject: string,
    handler: Application.IQueryHandler<any, any>,
  ): Promise<void>;
  // register<T extends IQuery>(
  //   queryName: string,
  //   registerHandler: RegisterHandler<T>,
  // ): Promise<void>;
  // unregister(queryName: string): Promise<void>;
  // query<T = any>(query: IQuery): Promise<T>;
}
