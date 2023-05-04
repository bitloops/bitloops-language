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
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { PropsNode } from '../../../../../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ClassTypeGuards } from '../../../../../helpers/typeGuards/typeGuards.js';
import {
  TTargetDependenciesTypeScript,
  fieldKey,
  TPublicMethods,
  TPrivateMethods,
  TProps,
  PropsIdentifierKey,
  TVariable,
} from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const generateGetters = ({
  propsName,
  model,
  publicMethods,
  privateMethods,
  isValueObject,
}: {
  propsName: string;
  model: IntermediateASTTree;
  publicMethods?: TPublicMethods;
  privateMethods: TPrivateMethods;
  isValueObject?: boolean;
}): TTargetDependenciesTypeScript => {
  const allPropsNodes = model.getRootChildrenNodesByType(
    BitloopsTypesMapping.TProps,
  ) as PropsNode[];
  const propsValues = allPropsNodes.map((propsNode) => propsNode.getValue()) as TProps[];

  const methodNames: string[] = [];
  if (publicMethods) {
    for (const method of publicMethods) {
      methodNames.push(method.publicMethod.identifier);
    }
  }
  if (privateMethods) {
    for (const method of privateMethods) {
      methodNames.push(method.privateMethod.identifier);
    }
  }
  let gettersResult = '';
  // TODO what about optional fields??

  //TODO in previous Step source to model tha params should be finalized
  // and here we shouldn't check if props are missing
  if (!isValueObject) {
    methodNames.push('id');
    gettersResult = 'get id() { return this._id; }';
  }
  const dependencies = [];
  if (!allPropsNodes) throw new Error(`No Props Found with name ${propsName}`);
  const propsValue = propsValues.find((prop) => prop.Props[PropsIdentifierKey] === propsName);
  if (!propsValue) {
    // TODO should we throw an error here?
    // throw new Error(`No Props Found with name ${propsName}`);
    return { output: gettersResult, dependencies };
  }

  const propsFields = propsValue.Props.fields;
  const { result: gettersOutput, dependencies: gettersDependencies } = buildGetterString(
    model,
    propsFields,
    dependencies,
    methodNames,
    allPropsNodes,
  );
  gettersResult += gettersOutput;
  dependencies.push(...gettersDependencies);

  return { output: gettersResult, dependencies };
};

const buildGetterString = (
  model: IntermediateASTTree,
  propsFields: TVariable[],
  dependencies: any[],
  methodNames: string[],
  allPropsNodes: PropsNode[],
): { result: string; dependencies: any[] } => {
  let result = '';
  for (const propVariable of propsFields) {
    const { type, identifier } = propVariable[fieldKey];
    const res = modelToTargetLanguage({
      value: { type },
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
    });
    const returnType = res.output;
    if (ClassTypeGuards.isVO(returnType)) {
      const voNode = model.getValueObjectByIdentifier(returnType);
      const propsNode = model.getPropsNodeOfValueObject(voNode);
      const propsName = propsNode.getValue().Props[PropsIdentifierKey];
      const props = allPropsNodes.find(
        (propsNode) => propsNode.getValue().Props[PropsIdentifierKey] === propsName,
      );
      const propsFields = props.getValue().Props.fields;
      const { dependencies: gettersDependencies } = buildGetterString(
        model,
        propsFields,
        dependencies,
        methodNames,
        allPropsNodes,
      );
      dependencies.push(...gettersDependencies);
    }

    dependencies.push(...res.dependencies);
    const getterName = identifier;
    if (methodNames.includes(getterName)) {
      continue;
    }
    const getter = `get ${getterName}(): ${returnType} { return this.props.${identifier}; } `;
    result += getter;
  }
  return { result, dependencies };
};
