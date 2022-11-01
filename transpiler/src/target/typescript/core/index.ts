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
  TBitloopsOutputTargetContent,
  TBitloopsTargetContent,
  TBitloopsTargetGeneratorParams,
  TBoundedContexts,
  TClassType,
  TComponentType,
  TContextData,
  TDependencyParentTypescript,
  ISetupData,
} from '../../../types.js';
import { BitloopsTargetGeneratorError } from '../../BitloopsTargetGeneratorError.js';
import { mappingClassTypeToComponentType } from '../../../helpers/mappings.js';
import { modelToTargetLanguage } from './modelToTargetLanguage.js';
import { formatString } from './codeFormatting.js';
import { modelToTypescriptModel } from './model-transformation/modelToTsModel.js';
import { deepClone } from '../../../utils/deepClone.js';

interface IBitloopsIntermediateASTToTarget {
  ASTToTarget(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError;
  formatCode(
    targetContent: TBitloopsOutputTargetContent,
    config?: any,
  ): TBitloopsOutputTargetContent;
  generateImports(params: TBitloopsTargetContent): TBitloopsOutputTargetContent;
}

export class BitloopsIntermediateASTToTarget implements IBitloopsIntermediateASTToTarget {
  private getComponentType(classType: TClassType): TComponentType {
    return mappingClassTypeToComponentType[classType] as TComponentType;
  }

  ASTToTarget(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    const { intermediateAST, setupData } = params;
    const result = [];
    for (const boundedContextName of Object.keys(intermediateAST)) {
      for (const moduleName of Object.keys(intermediateAST[boundedContextName])) {
        const contextData: TContextData = {
          boundedContext: boundedContextName,
          module: moduleName,
        };

        if (this.moduleHasRepoAdaptersDefined(setupData, { boundedContextName, moduleName })) {
          this.injectRepoAdaptersFromSetupToModel(intermediateAST, setupData, {
            boundedContextName,
            moduleName,
          });
        }
        for (const classType of Object.keys(intermediateAST[boundedContextName][moduleName])) {
          const componentType = this.getComponentType(classType as TClassType);
          for (const [componentName, component] of Object.entries(
            intermediateAST[boundedContextName][moduleName][classType],
          )) {
            try {
              const componentCopy = deepClone(component);
              const transformedIntermediateAST = modelToTypescriptModel({
                type: componentType,
                value: { [componentName]: componentCopy },
              });
              const generatedString = modelToTargetLanguage({
                type: componentType,
                value: transformedIntermediateAST,
                setupData,
                contextData,
                model: intermediateAST,
              });

              result.push({
                boundedContext: boundedContextName,
                module: moduleName,
                classType: classType,
                className: componentName,
                fileContent: generatedString,
              });
            } catch (error) {
              console.log('BitloopsTargetGeneratorError', error);
              return new BitloopsTargetGeneratorError(error.message);
            }
          }
        }
      }
    }
    return result;
  }

  generateImports(params: TBitloopsTargetContent): TBitloopsOutputTargetContent {
    const formattedCode: TBitloopsOutputTargetContent = [];
    for (const { boundedContext, classType, module, className, fileContent } of params) {
      const { output } = fileContent;
      const parentDependecies = fileContent.dependencies as TDependencyParentTypescript[];

      const importsResult = this.generateDepndenciesString(parentDependecies, false);
      const finalContent = importsResult + output;

      formattedCode.push({
        boundedContext,
        module,
        classType,
        className,
        fileContent: finalContent,
      });
    }
    return formattedCode;
  }

  formatCode(
    targetContent: TBitloopsOutputTargetContent,
    config?: any,
  ): TBitloopsOutputTargetContent {
    const formattedCode: TBitloopsOutputTargetContent = [];
    for (const { boundedContext, classType, module, className, fileContent } of targetContent) {
      const formattedContent = formatString(fileContent, config);

      formattedCode.push({
        boundedContext,
        module,
        classType,
        className,
        fileContent: formattedContent,
      });
    }
    return formattedCode;
  }

  private generateDepndenciesString(
    dependencies: TDependencyParentTypescript[],
    esm = false,
  ): string {
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
  }

  private moduleHasRepoAdaptersDefined(
    setupData: ISetupData,
    { boundedContextName, moduleName }: { boundedContextName: string; moduleName: string },
  ): boolean {
    return !!setupData.repos?.repoAdapters?.[boundedContextName]?.[moduleName];
  }

  private injectRepoAdaptersFromSetupToModel(
    intermediateAST: TBoundedContexts,
    setupData: Readonly<ISetupData>,
    { boundedContextName, moduleName }: { boundedContextName: string; moduleName: string },
  ): void {
    intermediateAST[boundedContextName][moduleName].RepoAdapters = deepClone(
      setupData.repos.repoAdapters[boundedContextName][moduleName],
    );
  }
}
