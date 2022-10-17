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
import prettier from 'prettier';
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import {
  TBitloopsTargetContent,
  TBitloopsTargetGeneratorParams,
  TClassType,
  TComponentType,
  TContextData,
} from '../../../types.js';
import { BitloopsTargetGeneratorError } from '../../BitloopsTargetGeneratorError.js';
import { mappingClassTypeToComponentType } from '../../../helpers/mappings.js';
import { modelToTargetLanguage } from './modelToTargetLanguage.js';

interface IBitloopsIntermediateASTToTarget {
  ASTToTarget(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError;
}

export class BitloopsIntermediateASTToTarget implements IBitloopsIntermediateASTToTarget {
  private getComponentType(classType: TClassType): TComponentType {
    return mappingClassTypeToComponentType[classType] as TComponentType;
  }

  ASTToTarget(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetContent | BitloopsTargetGeneratorError {
    const { intermediateAST, setupData, targetLanguage } = params;
    const result = {};
    for (const boundedContextName of Object.keys(intermediateAST)) {
      result[boundedContextName] = {};
      for (const moduleName of Object.keys(intermediateAST[boundedContextName])) {
        result[boundedContextName][moduleName] = {};
        const contextData: TContextData = {
          boundedContext: boundedContextName,
          module: moduleName,
        };
        for (const classType of Object.keys(intermediateAST[boundedContextName][moduleName])) {
          result[boundedContextName][moduleName][classType] = {};
          const componentType = this.getComponentType(classType as TClassType);
          for (const [componentName, component] of Object.entries(
            intermediateAST[boundedContextName][moduleName][classType],
          )) {
            try {
              const generatedString = modelToTargetLanguage({
                type: componentType,
                value: { [componentName]: component },
                setupData,
                contextData,
                targetLanguage,
                model: intermediateAST,
              });

              result[boundedContextName][moduleName][classType][componentName] = generatedString;
            } catch (error) {
              return new BitloopsTargetGeneratorError(error.message);
            }
          }
        }
      }
    }
    return result;
  }

  formatCode(
    targetContent: TBitloopsTargetContent,
    language: string,
    config?: any,
  ): TBitloopsTargetContent {
    const defaultFormatterConfig = { semi: true, parser: 'typescript', singleQuote: true };
    const formatterConfig = config ?? defaultFormatterConfig;
    const langMapping = {
      [SupportedLanguages.TypeScript]: (code: string): string => {
        return prettier.format(code, formatterConfig);
      },
    };
    const fomattedCode: TBitloopsTargetContent = {};
    for (const [boundedContextName, boundedContext] of Object.entries(targetContent)) {
      for (const [moduleName, module] of Object.entries(boundedContext)) {
        for (const [classType, components] of Object.entries(module)) {
          for (const [componentName, generatedContent] of Object.entries(components)) {
            fomattedCode[boundedContextName][moduleName][classType][componentName] = langMapping[
              language
            ](generatedContent.content);
          }
        }
      }
    }
    return fomattedCode;
  }
}
