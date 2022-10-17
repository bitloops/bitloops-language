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

import { isGraphQLController } from '../../../helpers/typeGuards.js';
import { ISetupData, TGraphQLController, TRESTController } from '../../../types.js';
import { BitloopsTypesMapping } from '../commons/index.js';
import { modelToTargetLanguage } from '../index.js';

const controllersToTargetLanguage = (
  controllers: TRESTController | TGraphQLController,
  targetLanguage: string,
  contextData?: { boundedContext: string; module: string },
  setupData?: ISetupData,
): string => {
  // TODO for all controllers ?
  const controllerName = Object.keys(controllers)[0];

  const controller = controllers[controllerName];
  // TODO improve assumption that it is a REST controller
  const type = isGraphQLController(controller)
    ? BitloopsTypesMapping.TGraphQLController
    : BitloopsTypesMapping.TRESTController;

  return modelToTargetLanguage({
    type,
    value: controllers,
    targetLanguage,
    contextData,
    setupData,
  });
};
export { controllersToTargetLanguage };
