import * as fs from 'fs';
import * as path from 'path';

type TBoundedContextName = string;
type TModuleName = string;

const getFolderNamesFromPath = (filePath: string): string[] => {
  const paths = fs
    .readdirSync(filePath, { withFileTypes: true })
    .filter((dirOrFile) => dirOrFile.isDirectory())
    .map((dir) => path.join(filePath, dir.name));
  return paths;
};

const getBoundedContextModules = (
  filePath: string,
): Record<TBoundedContextName, TModuleName[]>[] => {
  const boundedContextsNamesPerModules = getFolderNamesFromPath(filePath).map(
    (boundedContextsPath) => {
      const moduleNames = getContextModuleNames(boundedContextsPath);
      const boundedContextName = boundedContextsPath.split('/').pop();
      const contextModules: Record<string, string[]> = {};
      contextModules[boundedContextName] = moduleNames;
      return contextModules;
    },
  );

  return boundedContextsNamesPerModules;
};

const getContextModuleNames = (filePath: string): string[] => {
  const contextModuleNames = getFolderNamesFromPath(filePath).map((boundedContextPath) => {
    return boundedContextPath.split('/').pop();
  });
  return contextModuleNames;
};

export { getBoundedContextModules };
