import { bitloopsTypeToLangMapping } from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { isBitloopsPrimitive } from '../../../../../helpers/isBitloopsPrimitive.js';
import { TModule, TDomainMethods, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { SupportedLanguages } from '../../../../supportedLanguages.js';

export const generateGetters = (
  propsName: string,
  model: TModule,
  methods: TDomainMethods,
): TTargetDependenciesTypeScript => {
  const { Props } = model;

  let methodNames = [];
  if (methods) methodNames = Object.keys(methods);

  // TODO what about optional fields??
  let gettersResult = 'get id() { return this._id; }';
  if (!Props) throw new Error(`No Props Found with name ${propsName}`);
  for (const [propName, propValues] of Object.entries(Props)) {
    if (propName === propsName) {
      for (const propVariable of propValues.variables) {
        const { type, name } = propVariable;
        let returnType = type;
        if (isBitloopsPrimitive(returnType)) {
          returnType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](returnType);
        }
        const getterName = name;
        //TODO skip if already there
        if (methodNames.includes(getterName)) {
          continue;
        }
        const getter = `get ${getterName}(): ${returnType} { return this.props.${name}; } `;
        gettersResult += getter;
      }
      return { output: gettersResult, dependencies: [] };
    }
  }

  return { output: gettersResult, dependencies: [] };
};
