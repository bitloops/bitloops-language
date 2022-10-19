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
  TBitloopsTargetContent,
  TBitloopsTargetGeneratorParams,
  TClassType,
  TComponentType,
  TContextData,
} from '../../../types.js';
import { BitloopsTargetGeneratorError } from '../../BitloopsTargetGeneratorError.js';
import { mappingClassTypeToComponentType } from '../../../helpers/mappings.js';
import { modelToTargetLanguage } from './modelToTargetLanguage.js';
import { formatString } from './codeFormatting.js';

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
    const result = [];
    for (const boundedContextName of Object.keys(intermediateAST)) {
      for (const moduleName of Object.keys(intermediateAST[boundedContextName])) {
        const contextData: TContextData = {
          boundedContext: boundedContextName,
          module: moduleName,
        };
        for (const classType of Object.keys(intermediateAST[boundedContextName][moduleName])) {
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

  formatCode(targetContent: TBitloopsTargetContent, config?: any): TBitloopsTargetContent {
    const formattedCode: TBitloopsTargetContent = [];
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
}
