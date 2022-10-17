import { TParameterDependency } from '../../../types.js';
import { getBitloopsModel } from '../BitloopsParser.js';

const formalParameterList = (children: any) => {
  const result = [];
  for (const parameter of children) {
    if (parameter.type === 'formalParameterArg') {
      const childrenResult = getBitloopsModel(parameter);
      result.push(childrenResult);
    }
  }
  return result;
};

const formalParameterArg = (children: any) => {
  const parameterResult: TParameterDependency = { value: '', type: '' };
  for (const parameter of children) {
    switch (parameter.type) {
      case 'identifierOrKeyWord':
        parameterResult.value = parameter.value;
        break;
      case 'typeAnnotation':
        parameterResult.type = getBitloopsModel(parameter).type;
        break;
      default:
        throw new Error(`Formal parameter arg type ${parameter.type} not implemented`);
    }
  }
  return parameterResult;
};

export { formalParameterList, formalParameterArg };
