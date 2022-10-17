import { TModule, TDomainMethods } from '../../../../../types.js';

export const generateGetters = (propsName: string, model: TModule, methods: TDomainMethods) => {
  const { Props } = model;

  let methodNames = [];
  if (methods) methodNames = Object.keys(methods);

  let gettersResult = '';
  if (!Props) throw new Error(`No Props Found with name ${propsName}`);
  for (const [propName, propValues] of Object.entries(Props)) {
    if (propName === propsName) {
      for (const propVariable of propValues.variables) {
        const { type, name } = propVariable;
        const getterName = `get${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        //TODO skip if already there
        if (methodNames.includes(getterName)) {
          continue;
        }
        const getter = `public ${getterName}(): ${type} { return this.props.${name}; } `;
        gettersResult += getter;
      }
      return gettersResult;
    }
  }

  return '';
};
