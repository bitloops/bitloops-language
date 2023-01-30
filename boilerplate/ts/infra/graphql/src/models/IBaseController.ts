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
export interface IBaseController<TRequest, TResponseData> {
  execute(req: TRequest): Promise<TResponseData>;

  ok(dto: TResponseData): TResponseData;
  created(): any;

  clientError(message: string, errorId: string): any;
  paymentRequired(message: string, errorId: string): any;
  conflict(message: string, errorId: string): any;
  tooMany(message: string, errorId: string): any;
  fail(error: Error | string, errorId: string): any;

  // GraphQL-specific error messages
  badRequest(message: string, errorId: string): any;
  forbidden(message: string, errorId: string): any;
  notFound(message: string, errorId: string): any;
  unauthorized(message: string, errorId: string): any;
  internalError(message: string, errorId: string): any;
  subscriptionError(message: string, errorId: string): any;
}
