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
import {
  controllersToTargetLanguage,
  transformRestControllerIntermediateAST,
} from './components/controllers/index.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { transformUseCaseIntermediateAST } from './components/useCase/index.js';

const modelToTypescriptModel = (props: {
  type: string;
  value: any;
  // Replace any with types of all source elements
}): any => {
  const { type, value } = props;

  let res: any;
  switch (type) {
    case BitloopsTypesMapping.TControllers: {
      res = controllersToTargetLanguage(value);
      break;
    }
    case BitloopsTypesMapping.TRESTController: {
      res = transformRestControllerIntermediateAST(value);
      break;
    }
    // case BitloopsTypesMapping.TGraphQLController: {
    //   res = graphQLControllersToTargetLanguage(value, contextData);
    //   break;
    // }
    case BitloopsTypesMapping.TUseCase: {
      res = transformUseCaseIntermediateAST(value);
      break;
    }
    default: {
      return value;
    }
  }
  return res;
};

export { modelToTypescriptModel };
