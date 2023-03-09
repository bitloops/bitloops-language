import { TClassTypesValues } from '../../../helpers/mappings.js';
import { TDependencyParentTypescript } from '../../../types.js';

const generateDependenciesString = (
  dependencies: TDependencyParentTypescript[],
  esm = false,
): string => {
  let result = '';
  for (const dependency of dependencies) {
    const { type, value, default: dependencyDefault, from } = dependency;

    result += `import ${dependencyDefault ? value : '{' + value + '}'} from`;
    if (type === 'absolute') {
      result += `'${from}'`;
    } else {
      result += esm ? `'${from}.js'` : `'${from}'`;
    }
    result += ';';
  }
  return result;
};

export const generateFinalContentWithImports = ({
  classType,
  output,
  parentDependecies,
}: {
  classType?: TClassTypesValues;
  output: string;
  parentDependecies: TDependencyParentTypescript[];
}): string => {
  let finalContent;
  if (classType) {
    const importsResult = generateDependenciesString(parentDependecies, false);
    finalContent = importsResult + output;
  } else {
    finalContent = output;
  }
  return finalContent;
};
