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
  TBitloopsTargetGeneratorParams,
  TBitloopsTargetSetupContent,
} from '../types.js';
import { BitloopsTargetGeneratorError } from './BitloopsTargetGeneratorError.js';
import { BitloopsTargetSetupGeneratorError } from './BitloopsTargetSetupGeneratorError.js';
import { BitloopsIntermediateASTToTarget } from './typescript/core/index.js';
import { generateSetupFiles } from './typescript/setup/index.js';
import { getTargetFileDestination } from './typescript/helpers/getTargetFileDestination.js';
import { SupportedLanguages } from './supportedLanguages.js';

export interface IBitloopsTargetGenerator {
  getTargetFileDestination(
    boundedContext: string,
    moduleName: string,
    classType: string,
    className: string,
    targetLanguage: string,
  ): { path: string; filename: string };
  generate: (params: TBitloopsTargetGeneratorParams) => TBitloopsOutputTargetContent;

  generateSetup: (
    params: TBitloopsTargetGeneratorParams,
  ) => TBitloopsTargetSetupContent | BitloopsTargetSetupGeneratorError;
}

export class BitloopsTargetGenerator implements IBitloopsTargetGenerator {
  generate(params: TBitloopsTargetGeneratorParams): TBitloopsOutputTargetContent {
    const bitloopsTargetGenerator = new BitloopsIntermediateASTToTarget();
    const targetContent = bitloopsTargetGenerator.ASTToTarget(params);
    if (targetContent instanceof BitloopsTargetGeneratorError) throw targetContent;
    else {
      // console.log('targetContent', targetContent);
      const formattedTargetContent = bitloopsTargetGenerator.formatCode(
        targetContent,
        params.formatterConfig,
      );
      return formattedTargetContent;
      // TODO imports
    }
  }

  generateSetup(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsTargetSetupContent | BitloopsTargetSetupGeneratorError {
    const { setupData, intermediateAST, sourceDirPath } = params;
    return generateSetupFiles(setupData, intermediateAST, sourceDirPath);
  }

  getTargetFileDestination(
    boundedContext: string,
    moduleName: string,
    classType: string,
    className: string,
    targetLanguage = SupportedLanguages.TypeScript as string,
  ): { path: string; filename: string } {
    return getTargetFileDestination(
      boundedContext,
      moduleName,
      classType,
      className,
      targetLanguage,
    );
  }
}
