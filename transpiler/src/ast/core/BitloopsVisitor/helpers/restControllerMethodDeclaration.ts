/**
 *  Bitloops Language CLI
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

import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { TRestMethods } from '../../../../types.js';

enum REST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

const REST_METHODS_BL_TO_MODEL_MAPPER = {
  'REST.Methods.GET': REST_METHODS.GET,
  'REST.Methods.POST': REST_METHODS.POST,
  'REST.Methods.PUT': REST_METHODS.PUT,
  'REST.Methods.PATCH': REST_METHODS.PATCH,
  'REST.Methods.DELETE': REST_METHODS.DELETE,
  'REST.Methods.OPTIONS': REST_METHODS.OPTIONS,
};

export const restControllerMethodDeclarationVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestControllerMethodDeclarationContext,
): { method: TRestMethods } => {
  const httpMethod = ctx.httpMethod().getText();
  return {
    method: REST_METHODS_BL_TO_MODEL_MAPPER[httpMethod],
  };
};
