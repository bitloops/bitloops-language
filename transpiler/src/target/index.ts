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
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
  IBitloopsTargetGenerator,
  TBitloopsOutputTargetContent,
  TBitloopsTargetGeneratorParams,
  TBitloopsTargetSetupContent,
} from './types.js';
import { BitloopsIntermediateASTToTarget } from './typescript/core/index.js';
import { generateSetupFiles } from './typescript/setup/index.js';
import { getTargetFileDestination } from './typescript/helpers/getTargetFileDestination.js';
import { SupportedLanguages } from './supportedLanguages.js';
import { isBitloopsTargetGeneratorError } from './typescript/guards/index.js';

export class BitloopsTargetGenerator implements IBitloopsTargetGenerator {
  generate(
    params: TBitloopsTargetGeneratorParams,
  ): TBitloopsOutputTargetContent | BitloopsTargetGeneratorError {
    const bitloopsTargetGenerator = new BitloopsIntermediateASTToTarget();
    const targetContent = bitloopsTargetGenerator.ASTToTarget(params);

    if (isBitloopsTargetGeneratorError(targetContent)) return targetContent;
    const targetContentWithImports = bitloopsTargetGenerator.generateImports(targetContent);
    const formattedTargetContent = bitloopsTargetGenerator.formatCode(
      targetContentWithImports,
      params.formatterConfig,
    );
    return formattedTargetContent;
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
