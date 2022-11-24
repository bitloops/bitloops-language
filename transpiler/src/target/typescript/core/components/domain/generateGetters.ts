import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TModule, TDomainMethods, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

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
        const { type, identifier } = propVariable;
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
