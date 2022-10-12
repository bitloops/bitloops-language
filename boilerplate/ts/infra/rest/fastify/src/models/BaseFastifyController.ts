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
import { FastifyRequest, FastifyReply } from 'fastify';
import { Application } from '@bitloops/bl-boilerplate-core';

// TODO change all errors to be consistent with ErrorMessage

export abstract class BaseFastifyController
  implements Application.REST.IBaseController<FastifyRequest, FastifyReply>
{
  protected abstract executeImpl(req: FastifyRequest, res: FastifyReply): Promise<void | any>;

  public async execute(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, 'An unexpected error occurred');
    }
  }

  public static jsonResponse(
    res: FastifyReply,
    code: number,
    message: string | Application.REST.ErrorMessage,
  ) {
    return res.status(code).send({ error: message });
  }

  public ok<T>(res: FastifyReply, dto?: T) {
    if (dto) {
      res.type('application/json');
      return res.status(200).send(dto);
    } else {
      return res.status(200).send('OK');
    }
  }

  public created(res: FastifyReply) {
    return res.status(201).send();
  }

  public clientError(res: FastifyReply, message?: string) {
    return BaseFastifyController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(res: FastifyReply, message?: string) {
    return BaseFastifyController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(res: FastifyReply, message?: string) {
    return BaseFastifyController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  // public forbidden(res: FastifyReply, message?: ErrorMessage) {
  //   return BaseFastifyController.jsonResponse(res, 403, message ? message : 'Forbidden');
  // }
  public forbidden(res: FastifyReply, message?: Application.REST.ErrorMessage | string) {
    return BaseFastifyController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound(res: FastifyReply, message?: Application.REST.ErrorMessage | string) {
    return BaseFastifyController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict(res: FastifyReply, message?: string) {
    return BaseFastifyController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany(res: FastifyReply, message?: string) {
    return BaseFastifyController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public todo(res: FastifyReply) {
    return BaseFastifyController.jsonResponse(res, 400, 'TODO');
  }

  //TODO match with error in
  public fail(res: FastifyReply, error: Error | string) {
    console.error(error);
    return res.status(500).send({
      error: error.toString(),
    });
  }
}
