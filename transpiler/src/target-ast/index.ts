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

import { IntermediateASTTree } from '../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping, TBitloopsTypesValues } from '../helpers/mappings.js';
import { TIntermediateModel } from '../transpilerTypes.js';
import {
  GraphQLControllerNodeTSTransformer,
  RestControllerNodeTSTransformer,
} from './node-transformers/controllers/index.js';
import { INodeModelToASTTargetASTTransformer } from './node-transformers/index.js';
import { IIntermediateModelToASTTargetLanguageTransformer } from './types.js';

export class IntermediateModelToASTTargetTransformer
  implements IIntermediateModelToASTTargetLanguageTransformer
{
  transform(intermediateModel: TIntermediateModel): TIntermediateModel {
    for (const boundedContext of Object.values(intermediateModel.intermediateModel)) {
      for (const intermediateASTTree of Object.values(boundedContext)) {
        intermediateASTTree.traverse(intermediateASTTree.getRootNode(), (intermediateASTNode) => {
          const transformer = this.nodeTransformerFactory({
            intermediateASTNode,
            intermediateASTTree,
          });

          if (transformer) {
            transformer.run();
          }
        });
      }
    }
    return intermediateModel;
  }

  private nodeTransformerFactory(factoryParams: {
    intermediateASTNode: any;
    intermediateASTTree: IntermediateASTTree;
  }): INodeModelToASTTargetASTTransformer | null {
    const { intermediateASTNode, intermediateASTTree } = factoryParams;

    const type: TBitloopsTypesValues = intermediateASTNode.getNodeType();

    switch (type) {
      case BitloopsTypesMapping.TRESTController:
        return new RestControllerNodeTSTransformer(intermediateASTTree, intermediateASTNode);
      case BitloopsTypesMapping.TGraphQLController:
        return new GraphQLControllerNodeTSTransformer(intermediateASTTree, intermediateASTNode);
      default:
        return null;
    }
  }
}
