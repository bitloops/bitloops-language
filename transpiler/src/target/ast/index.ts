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

import { IntermediateASTTree } from '../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateAST } from '../../ast/core/types.js';
import { BitloopsTypesMapping, TBitloopsTypesValues } from '../../helpers/mappings.js';
import {
  GraphQLControllerNodeTSTransformer,
  RestControllerNodeTSTransformer,
} from './node-transformers/controllers/index.js';
import {
  DomainCreateMethodNodeTSTransformer,
  DomainPrivateMethodNodeTSTransformer,
  DomainPublicMethodNodeTSTransformer,
} from './node-transformers/domainMethods/index.js';
import { INodeModelToASTTargetASTTransformer } from './node-transformers/index.js';
import { UseCaseNodeTSTransformer } from './node-transformers/use-case.js';
import { IIntermediateModelToASTTargetLanguageTransformer } from './types.js';

export class IntermediateModelToASTTargetTransformer
  implements IIntermediateModelToASTTargetLanguageTransformer
{
  transform(intermediateModel: IntermediateAST): IntermediateAST {
    for (const boundedContext of Object.values(intermediateModel.core)) {
      for (const intermediateASTTree of Object.values(boundedContext)) {
        const treeUpdated = intermediateASTTree.copy();
        const rootNode = treeUpdated.getRootNode();
        treeUpdated.traverse(rootNode, (intermediateASTNode) => {
          const transformer = this.nodeTransformerFactory({
            intermediateASTNode,
            intermediateASTTree,
          });

          if (transformer) {
            transformer.run();
          }
        });
        intermediateASTTree.buildValueRecursiveBottomUp(rootNode);
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
      case BitloopsTypesMapping.TDomainCreateMethod:
        return new DomainCreateMethodNodeTSTransformer(intermediateASTTree, intermediateASTNode);
      case BitloopsTypesMapping.TDomainPublicMethod:
        return new DomainPublicMethodNodeTSTransformer(intermediateASTTree, intermediateASTNode);
      case BitloopsTypesMapping.TDomainPrivateMethod:
        return new DomainPrivateMethodNodeTSTransformer(intermediateASTTree, intermediateASTNode);
      case BitloopsTypesMapping.TUseCase:
        return new UseCaseNodeTSTransformer(intermediateASTTree, intermediateASTNode);
      default:
        return null;
    }
  }
}
