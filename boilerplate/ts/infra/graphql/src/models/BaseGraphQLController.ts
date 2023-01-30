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
import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import { IBaseController } from './IBaseController';

export abstract class BaseGraphQLController<TRequest, TResponseData>
  implements IBaseController<TRequest, TResponseData>
{
  protected abstract executeImpl(req: TRequest): Promise<TResponseData | ApolloError>;

  public async execute(req: TRequest): Promise<TResponseData> {
    let result;
    try {
      result = await this.executeImpl(req);
      if (!(result instanceof ApolloError)) {
        return result;
      }
    } catch (err) {
      this.fail('An unexpected error occurred');
    }
    throw result;
  }

  public ok(dto: TResponseData) {
    return dto;
  }

  public created() {
    return 'Created';
  }

  public clientError(errorId: string, message?: string) {
    return new UserInputError(message ? message : 'User input error', { errorId });
  }

  public unauthorized(errorId: string, message?: string) {
    return new AuthenticationError(message ? message : 'Unauthorized', { errorId });
  }

  public paymentRequired(errorId: string, message?: string) {
    return new ApolloError(message ? message : 'Payment required', 'PAYMENT_REQUIRED', { errorId });
  }

  public forbidden(errorId: string, message: string) {
    return new ForbiddenError(message ? message : 'Forbidden', { errorId });
  }

  public notFound(errorId: string, message?: string) {
    // No error code for notFound for graphql
    return new ApolloError(message ? message : 'Not found', 'NOT_FOUND', { errorId });
  }

  public conflict(errorId: string, message: string) {
    return new ApolloError(message ? message : 'Conflict', 'CONFLICT', { errorId });
  }

  public tooMany(errorId: string, message?: string) {
    return new ApolloError(message ? message : 'Too many', 'TOO_MANY', { errorId });
  }

  public fail(error: Error | string) {
    return new ApolloError(error instanceof Error ? error.message : error);
  }

  public badRequest(errorId: string, message: string) {
    return new UserInputError(message, { errorId });
  }
  public internalError(errorId: string, message: string) {
    return new ApolloError(message, errorId);
  }
  public subscriptionError(errorId: string, message: string) {
    return new ApolloError(message, errorId);
  }
}
