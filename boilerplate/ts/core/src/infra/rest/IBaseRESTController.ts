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
export interface IBaseRESTController<Req, Res> {
  execute(req: Req, res: Res): Promise<void>;

  ok<T>(res: Res, dto?: T): any;

  created(res: Res): any;

  badRequest(res: Res, message?: ErrorMessage): any;

  unauthorized(res: Res, message?: ErrorMessage): any;

  paymentRequired(res: Res, message?: ErrorMessage): any;

  forbidden(res: Res, message?: ErrorMessage): any;

  notFound(res: Res, message?: ErrorMessage): any;

  methodNotAllowed(res: Res, message?: ErrorMessage): any;

  conflict(res: Res, message?: ErrorMessage): any;

  requestTimeout(res: Res, message?: ErrorMessage): any;

  payloadTooLarge(res: Res, message?: ErrorMessage): any;

  unsupportedMediaType(res: Res, message?: ErrorMessage): any;

  unprocessableEntity(res: Res, message?: ErrorMessage): any;

  tooMany(res: Res, message?: ErrorMessage): any;

  fail(res: Res, error: Error | string): any;

  badGateway(res: Res, message?: ErrorMessage): any;

  serverUnavailable(res: Res, message?: ErrorMessage): any;
}
