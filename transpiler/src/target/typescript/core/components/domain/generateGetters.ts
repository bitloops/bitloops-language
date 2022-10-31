import { bitloopsTypeToLangMapping } from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { isBitloopsPrimitive } from '../../../../../helpers/isBitloopsPrimitive.js';
import { TModule, TDomainMethods, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { SupportedLanguages } from '../../../../supportedLanguages.js';
import { getChildDependencies } from '../../dependencies.js';

export const generateGetters = (
  propsName: string,
  model: TModule,
  methods: TDomainMethods,
  isValueObject = false,
): TTargetDependenciesTypeScript => {
  const { Props } = model;

  let methodNames = [];
  if (methods) methodNames = Object.keys(methods);
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
      for (const propVariable of propValues.variables) {
        const { type, name } = propVariable;
        let returnType = type;
        dependencies.push(...getChildDependencies(returnType));
        if (isBitloopsPrimitive(returnType)) {
          returnType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](returnType);
        }
        const getterName = name;
        if (methodNames.includes(getterName)) {
          continue;
        }
        const getter = `get ${getterName}(): ${returnType} { return this.props.${name}; } `;
        gettersResult += getter;
      }
      return { output: gettersResult, dependencies };
    }
  }

  return { output: gettersResult, dependencies };
};
