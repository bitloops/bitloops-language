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
import { transformEntityIntermediateAST } from './components/entity.js';
import { transformDomainMethodsIntermediateAST } from './components/domain/domainMethods.js';
import { transformDomainPrivateMethodIntermediateAST } from './components/domain/domainPrivateMethod.js';
import { transformDomainPublicMethodIntermediateAST } from './components/domain/domainPublicMethod.js';
import { transformValueObjectIntermediateAST } from './components/valueObject/index.js';
import { transformValueObjectMethodsIntermediateAST } from './components/valueObject/valueObjectMethods.js';
import { transformDomainCreateMethodIntermediateAST } from './components/domain/domainCreateMethod.js';
import { transformRootEntityIntermediateAST } from './components/rootEntity.js';
import { transformUseCaseIntermediateAST } from './components/useCase/index.js';
import { transformGraphQLControllerIntermediateAST } from './components/controllers/graphQL.js';
import { IntermediateASTNode } from '../../../../refactoring-arch/intermediate-ast/nodes/IntermediateASTNode.js';

const modelToTypescriptModel = (node: IntermediateASTNode): any => {
  const type = node.getNodeType();
  const value = node.getValue();

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
    case BitloopsTypesMapping.TGraphQLController: {
      res = transformGraphQLControllerIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TEntities: {
      res = transformEntityIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TRootEntities: {
      res = transformRootEntityIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TValueObjects: {
      res = transformValueObjectIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TDomainMethods: {
      res = transformDomainMethodsIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TValueObjectMethods: {
      res = transformValueObjectMethodsIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TDomainCreateMethod: {
      res = transformDomainCreateMethodIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TDomainPublicMethod: {
      res = transformDomainPublicMethodIntermediateAST(value);
      break;
    }
    case BitloopsTypesMapping.TDomainPrivateMethod: {
      res = transformDomainPrivateMethodIntermediateAST(value);
      break;
    }
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
