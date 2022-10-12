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
import { ICoreError } from '../../ICoreError';

export type ErrorMessage = ICoreError;

// TODO replace all with ErrorMessage
export interface IBaseController<Req, Res> {
  execute(req: Req, res: Res): Promise<void>;

  //   jsonResponse(res: Res, code: number, message: string);

  ok<T>(res: Res, dto?: T): any;

  created(res: Res): any;

  clientError(res: Res, message?: string): any;

  paymentRequired(res: Res, message?: string): any;

  forbidden(res: Res, message?: ErrorMessage | string): any;

  notFound(res: Res, message?: string): any;

  conflict(res: Res, message?: string): any;

  tooMany(res: Res, message?: string): any;

  todo(res: Res): any;

  fail(res: Res, error: Error | string): any;
}
