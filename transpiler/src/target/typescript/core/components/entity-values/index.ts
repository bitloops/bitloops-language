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
  PropsIdentifierKey,
  TContextData,
  TDomainPrivateMethods,
  TDomainPublicMethods,
  TEntityValues,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';
import { constantVariables, generateGetters } from '../domain/index.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { EntityDeclarationNode } from '../../../../../ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { BitloopsPrimTypeIdentifiers } from '../../type-identifiers/bitloopsPrimType.js';

const entityMethods = (
  privateMethods: TDomainPrivateMethods,
  publicMethods: TDomainPublicMethods,
): TTargetDependenciesTypeScript => {
  const result = domainMethods(publicMethods, privateMethods);

  return { output: result.output, dependencies: result.dependencies };
};

const entityValuesToTargetLanguage = (params: {
  entityValues: TEntityValues;
  model: IntermediateASTTree;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { entityValues, model, contextData } = params;

  const { boundedContext, module } = contextData;

  const modelForContext = model[boundedContext][module];

  let result = '{';
  let dependencies = [];
  const { privateMethods, publicMethods, create, constants } = entityValues;
  const propsNameType = create.domainCreateParameter[PropsIdentifierKey];

  const { output: propsName, dependencies: entityPropsTypeDependencies } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: propsNameType },
  });
  dependencies = [...dependencies, ...entityPropsTypeDependencies];

  if (constants) {
    // TODO fix with new model/types
    const constantVariablesModel = constantVariables(constants as any);
    result += constantVariablesModel.output;
    dependencies = [...dependencies, ...constantVariablesModel.dependencies];
  }

  const entityCreateModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TEntityCreate,
    value: create,
  });
  result += entityCreateModel.output;
  dependencies = [...dependencies, ...entityCreateModel.dependencies];

  const gettersModel = generateGetters({
    propsName,
    model: modelForContext,
    privateMethods,
    publicMethods,
  });
  result += gettersModel.output;
  dependencies = [...dependencies, ...gettersModel.dependencies];

  const entityMethodsModel = entityMethods(privateMethods, publicMethods);
  result += entityMethodsModel.output;

  // const fromPrimitives = generateFromPrimitives({});
  // const toPrimitives = generateToPrimitives(propsNameType);
  // result += fromPrimitives.output;
  // result += toPrimitives.output;
  dependencies = [...dependencies, ...entityMethodsModel.dependencies];

  result += '}';

  return { output: result, dependencies };
};

const getEntityPrimitivesObject = (
  model: IntermediateASTTree,
  entityIdentifier: string,
): Record<string, any> => {
  const entityNode = model.getEntityByIdentifier(entityIdentifier) as EntityDeclarationNode;
  const propsNode = model.getPropsNodeOfEntity(entityNode);
  const fieldNodes = propsNode.getFieldListNode().getFieldNodes();
  //get value objects, standard values and builtIn classes
  //for each value object, get its props
  //for each prop get its values
  const primitivesValues = {};
  fieldNodes.forEach((fieldNode) => {
    const identifier = fieldNode.getIdentifierNode().getValue().identifier;
    const type = fieldNode.getTypeNode().getValue().type;
    primitivesValues[identifier] = type;
  });
  return primitivesValues;
};

const getPrimitivesType = (primitivesObject: Record<string, any>, entityName: string): string => {
  const typeName = `T${entityName}Primitives`;
  let resultType = `type ${typeName} = {\n`;
  for (const key in primitivesObject) {
    const type = primitivesObject[key];
    if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
      const typeTarget = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: { type },
      });
      resultType += `${key}: ${typeTarget.output};\n`;
    } else if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
      const typeTarget = BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type);
      resultType += `${key}: ${typeTarget};\n`;
    }
  }
  resultType += '};';
  return resultType;
};

const generateToPrimitives = (
  primitivesObject: Record<string, any>,
  entityName: string,
): string => {
  const typeName = `T${entityName}Primitives`;
  let result = `public toPrimitives(): ${typeName} {`;
  result += 'return {\n';
  for (const key in primitivesObject) {
    if (key === 'id') {
      result += 'id: this.id.toString(),';
    } else {
      result += `${key}: this.props.${key},`;
    }
  }
  result += '};\n}';

  return result;
};

const generateFromPrimitives = (
  primitivesObject: Record<string, any>,
  entityName: string,
): string => {
  const typeName = `T${entityName}Primitives`;
  const propsName = `${entityName}Props`;
  let result = `public static fromPrimitives(data: ${typeName}): ${entityName} {`;
  result += `const ${propsName} = {`;
  for (const key in primitivesObject) {
    if (key === 'id') {
      result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
    } else {
      result += `${key}: data.${key},`;
    }
    result += '\n';
  }
  result += '};\n';
  result += `return new ${entityName}(${propsName});\n`;
  result += '}';

  return result;
};

export {
  entityValuesToTargetLanguage,
  getEntityPrimitivesObject,
  getPrimitivesType,
  generateFromPrimitives,
  generateToPrimitives,
};
