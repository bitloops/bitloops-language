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

import { BitloopsTypesMapping, TBitloopsTypesValues } from '../helpers/mappings.js';
import { TIntermediateModel } from '../transpilerTypes.js';
import { RestControllerNodeTransformer } from './node-transformers/controllers/restTransformer.js';
import { IIntermediateModelToASTTargetLanguageTransformer } from './types.js';
// typeof T extends NodeModelToTargetASTTransformer<IntermediateASTNode>>
export class BitloopsModelToASTTargetTransformer
  implements IIntermediateModelToASTTargetLanguageTransformer
{
  private readonly typeToNodeTransformerMapping: Partial<
    Record<TBitloopsTypesValues, any> // TODO Replace any with abstract class
  > = {
    [BitloopsTypesMapping.TRESTController]: RestControllerNodeTransformer,
  };

  transform(intermediateModel: TIntermediateModel): TIntermediateModel {
    for (const boundedContext of Object.values(intermediateModel.intermediateModel)) {
      for (const intermediateASTTree of Object.values(boundedContext)) {
        const classTypeNodes = intermediateASTTree.getRootNode().getChildren();
        classTypeNodes.forEach((intermediateASTNode) => {
          const nodeType = intermediateASTNode.getNodeType();
          const transformer = this.typeToNodeTransformerMapping[nodeType];
          if (transformer) {
            // Don't mutate the original model, create a new one?
            new transformer().transform(intermediateModel);
          }
        });
      }
    }
    return intermediateModel;
  }
}
