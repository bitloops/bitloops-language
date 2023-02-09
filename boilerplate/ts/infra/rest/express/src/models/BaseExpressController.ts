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
import * as express from 'express';
import { Infra } from '@bitloops/bl-boilerplate-core';

export abstract class BaseExpressController
  implements Infra.REST.IBaseController<express.Request, express.Response>
{
  protected abstract executeImpl(req: express.Request, res: express.Response): Promise<void | any>;

  public async execute(req: express.Request, res: express.Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, 'An unexpected error occurred');
    }
  }

  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string | Infra.REST.ErrorMessage,
  ) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public badRequest(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 400, message ?? 'Unauthorized');
  }

  public unauthorized(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 401, message ?? 'Unauthorized');
  }

  public paymentRequired(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 402, message ?? 'Payment required');
  }

  public forbidden(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 403, message ?? 'Forbidden');
  }

  public notFound(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 404, message ?? 'Not found');
  }

  public methodNotAllowed(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 405, message ?? 'Method not allowed');
  }

  public requestTimeout(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 408, message ?? 'Request timeout');
  }

  public conflict(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 409, message ?? 'Conflict');
  }

  public payloadTooLarge(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 413, message ?? 'Payload too large');
  }

  public unsupportedMediaType(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 415, message ?? 'Unsupported media type');
  }

  public unprocessableEntity(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 422, message ?? 'Unprocessable entity');
  }

  public tooMany(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 429, message ?? 'Too many requests');
  }

  public fail(res: express.Response, error: Error | string) {
    console.error(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }

  public badGateway(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 502, message ?? 'Bad gateway');
  }
  public serverUnavailable(res: express.Response, message?: Infra.REST.ErrorMessage) {
    return BaseExpressController.jsonResponse(res, 503, message ?? 'Server unavailable');
  }
}
