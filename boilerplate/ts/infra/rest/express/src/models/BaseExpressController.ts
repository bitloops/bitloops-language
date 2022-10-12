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
import { Application } from '@bitloops/bl-boilerplate-core';

export abstract class BaseExpressController
  implements Application.REST.IBaseController<express.Request, express.Response>
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

  public static jsonResponse(res: express.Response, code: number, message: string) {
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

  public clientError(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseExpressController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public todo(res: express.Response) {
    return BaseExpressController.jsonResponse(res, 400, 'TODO');
  }

  public fail(res: express.Response, error: Error | string) {
    console.error(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
