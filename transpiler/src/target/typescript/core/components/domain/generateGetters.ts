import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  TModule,
  TTargetDependenciesTypeScript,
  fieldKey,
  TDomainPublicMethods,
  TDomainPrivateMethods,
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
  model: TModule;
  publicMethods?: TDomainPublicMethods;
  privateMethods: TDomainPrivateMethods;
  isValueObject?: boolean;
}): TTargetDependenciesTypeScript => {
  const { Props } = model;

  const methodNames = [];
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
  methodNames.push('id');

  let gettersResult = '';
  // TODO what about optional fields??

  //TODO in previous Step source to model tha params should be finalized
  // and here we shouldnt check if props are missing
  if (!isValueObject) {
    gettersResult = 'get id() { return this._id; }';
  }
  const dependencies = [];
  if (!Props) throw new Error(`No Props Found with name ${propsName}`);
  for (const [propName, propValues] of Object.entries(Props)) {
    if (propName === propsName) {
      for (const propVariable of propValues.fields) {
        const { type, identifier } = propVariable[fieldKey];
        const res = modelToTargetLanguage({
          value: type,
          type: BitloopsTypesMapping.TBitloopsPrimaryType,
        });
        const returnType = res.output;
        dependencies.push(...res.dependencies);
        const getterName = identifier;
        if (methodNames.includes(getterName)) {
          continue;
        }
        const getter = `get ${getterName}(): ${returnType} { return this.props.${identifier}; } `;
        gettersResult += getter;
      }
      return { output: gettersResult, dependencies };
    }
  }

  return { output: gettersResult, dependencies };
};
