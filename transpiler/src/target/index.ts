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
  TargetGeneratorError,
  TargetSetupGeneratorError,
  ITargetGenerator,
  TOutputTargetContent,
  TTargetSetupContent,
  TTargetCoreFinalContent,
  TargetCoreGeneratorError,
} from './types.js';
import { getTargetFileDestination } from './typescript-nest/helpers/getTargetFileDestination.js';
import { SupportedLanguages } from './supportedLanguages.js';
import {
  isTargetCoreGeneratorError,
  isTargetSetupGeneratorError,
} from './typescript-nest/guards/index.js';
import { IntermediateModelToASTTargetTransformer } from './typescript-nest/ast/index.js';
import { IntermediateAST } from '../ast/core/types.js';
import { type TTranspileOptions } from '../transpilerTypes.js';
import { TargetCoreGeneratorCreator } from './targetCoreCreator.js';
import { TargetSetupGeneratorCreator } from './targetSetupCreator.js';

export class TargetGenerator implements ITargetGenerator {
  generate(
    intermediateAST: IntermediateAST,
    options: TTranspileOptions,
  ): TOutputTargetContent | TargetGeneratorError[] {
    const errors: TargetGeneratorError[] = [];
    const generateResult: Partial<TOutputTargetContent> = {};

    const coreTargetOutput = this.generateCore(intermediateAST, options);
    if (isTargetCoreGeneratorError(coreTargetOutput)) {
      errors.push(coreTargetOutput);
    } else {
      generateResult.core = coreTargetOutput;
    }

    if (intermediateAST.setup) {
      const setupTargetOutput = this.generateSetup(intermediateAST, options);
      if (isTargetSetupGeneratorError(setupTargetOutput)) {
        errors.push(setupTargetOutput);
      } else {
        generateResult.setup = setupTargetOutput;
      }
    }

    if (errors.length > 0) {
      return errors;
    }
    return generateResult as TOutputTargetContent;
  }

  private generateCore(
    params: IntermediateAST,
    options: TTranspileOptions,
  ): TTargetCoreFinalContent[] | TargetCoreGeneratorError {
    const modelToTargetASTTransformer = new IntermediateModelToASTTargetTransformer();
    const transformedIntermediateAST = modelToTargetASTTransformer.transform(params);

    const bitloopsTargetGenerator = TargetCoreGeneratorCreator.create(options.targetLanguage);
    const targetContent = bitloopsTargetGenerator.ASTToTarget(transformedIntermediateAST);

    if (isTargetCoreGeneratorError(targetContent)) return targetContent;
    const targetContentWithImports = bitloopsTargetGenerator.generateImports(targetContent);
    const formattedTargetContent = bitloopsTargetGenerator.formatCode(
      targetContentWithImports,
      options.formatterConfig,
    );
    return formattedTargetContent;
  }

  private generateSetup(
    params: IntermediateAST,
    options: TTranspileOptions,
  ): TTargetSetupContent[] | TargetSetupGeneratorError {
    const setupTargetGenerator = TargetSetupGeneratorCreator.create(options.targetLanguage);
    return setupTargetGenerator.generateSetupFiles(params, options);
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
