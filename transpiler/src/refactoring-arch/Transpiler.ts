import { isBitloopsIntermediateASTError } from '../ast/core/guards/index.js';
import { IntermediateASTParserError, IBitloopsIntermediateASTParser } from '../ast/core/types.js';
import { isBitloopsIntermediateSetupASTParserError } from '../ast/setup/guards/index.js';
import {
  BitloopsIntermediateSetupASTParserError,
  IBitloopsIntermediateSetupASTParser,
} from '../ast/setup/types.js';
import { isBitloopsParserError } from '../parser/core/guards/index.js';
import { BitloopsParserError, TParserCoreInputData } from '../parser/core/types.js';
import { IBitloopsParser } from '../parser/index.js';
import { isBitloopsSetupParserError } from '../parser/setup/guards/index.js';
import { BitloopsSetupParserError, IBitloopsSetupParser } from '../parser/setup/types.js';
import {
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
  IBitloopsTargetGenerator,
} from '../target/types.js';
import {
  isBitloopsTargetGeneratorError,
  isBitloopsTargetSetupGeneratorError,
} from '../target/typescript/guards/index.js';
import {
  TBitloopsCodeToOriginalAST,
  TBitloopsCodeToOriginalASTError,
  TOriginalASTToIntermediateModel,
  TOriginalASTToIntermediateModelError,
  TTargetLanguageASTToTargetCode,
  TTargetLanguageASTToTargetCodeError,
  TTranspileError,
  TTranspileOptions,
} from './types.js';

export default class Transpiler {
  constructor(
    private parser: IBitloopsParser,
    private setupParser: IBitloopsSetupParser,
    private originalLanguageASTToIntermediateModelTransformer: IBitloopsIntermediateASTParser,
    private originalLanguageASTToIntermediateModelSetupTransformer: IBitloopsIntermediateSetupASTParser,
    // private intermediateModelToASTTargetLanguageTransformer: IIntermediateModelToASTTargetLanguageTransformer,
    private targetLanguageASTToTargetCodeGenerator: IBitloopsTargetGenerator,
  ) {
    this.parser = parser;
    this.setupParser = setupParser;
    this.originalLanguageASTToIntermediateModelTransformer =
      originalLanguageASTToIntermediateModelTransformer;
    this.originalLanguageASTToIntermediateModelSetupTransformer =
      originalLanguageASTToIntermediateModelSetupTransformer;
    // this.intermediateModelToASTTargetLanguageTransformer =
    //   intermediateModelToASTTargetLanguageTransformer;
    this.targetLanguageASTToTargetCodeGenerator = targetLanguageASTToTargetCodeGenerator;
  }

  public transpile(
    transpileInputData: TParserCoreInputData,
    options: TTranspileOptions,
    setupBitloopsCode?: string,
  ): TTargetLanguageASTToTargetCode | TTranspileError[] {
    const originalAST = this.bitloopsCodeToOriginalAST(transpileInputData, setupBitloopsCode);
    if (Transpiler.isBitloopsCodeToOriginalASTError(originalAST)) return originalAST;

    const intermediateModel = this.originalASTToIntermediateModel(originalAST);
    if (Transpiler.isOriginalASTToIntermediateModelError(intermediateModel))
      return intermediateModel;

    const targetLanguageAST = this.intermediateModelToTargetLanguageAST(intermediateModel, options);

    const targetCode = this.targetLanguageASTToTargetCode(targetLanguageAST, options);
    if (Transpiler.isTargetLanguageASTToTargetCodeError(targetCode)) return targetCode;

    return targetCode;
  }

  private bitloopsCodeToOriginalAST(
    parseInputData: TParserCoreInputData,
    setupBitloopsCode?: string,
  ): TBitloopsCodeToOriginalAST | TBitloopsCodeToOriginalASTError[] {
    const originalASTOutput: TBitloopsCodeToOriginalAST = { originalAST: null };
    const errors = [];

    const originalLanguageAST = this.parser.parse(parseInputData);
    if (isBitloopsParserError(originalLanguageAST)) {
      errors.push(originalLanguageAST);
    } else {
      originalASTOutput.originalAST = originalLanguageAST;
    }

    if (setupBitloopsCode) {
      const originalLanguageASTSetup = this.setupParser.parse(setupBitloopsCode);
      if (isBitloopsSetupParserError(originalLanguageASTSetup)) {
        errors.push(originalLanguageASTSetup);
      } else {
        originalASTOutput.originalSetupAST = originalLanguageASTSetup;
      }
    }

    if (errors.length > 0) return errors;
    else return originalASTOutput;
  }

  private originalASTToIntermediateModel(
    originalLanguageAST: TBitloopsCodeToOriginalAST,
  ): TOriginalASTToIntermediateModel | TOriginalASTToIntermediateModelError[] {
    const intermediateModelOutput: TOriginalASTToIntermediateModel = { intermediateModel: null };
    const errors = [];

    const intermediateModelCore = this.originalLanguageASTToIntermediateModelTransformer.parse(
      originalLanguageAST.originalAST,
    );
    if (isBitloopsIntermediateASTError(intermediateModelCore)) {
      errors.push(intermediateModelCore);
    } else {
      intermediateModelOutput.intermediateModel = intermediateModelCore;
    }

    if (originalLanguageAST.originalSetupAST) {
      const intermediateModelSetup =
        this.originalLanguageASTToIntermediateModelSetupTransformer.parse(
          originalLanguageAST.originalSetupAST,
        );
      if (isBitloopsIntermediateSetupASTParserError(intermediateModelSetup)) {
        errors.push(originalLanguageAST);
      } else {
        intermediateModelOutput.intermediateSetupModel = intermediateModelSetup;
      }
    }
    return intermediateModelOutput;
  }

  private intermediateModelToTargetLanguageAST(
    intermediateModel: TOriginalASTToIntermediateModel,
    _options: TTranspileOptions,
  ): TOriginalASTToIntermediateModel {
    // TODO uncomment this and create class for model to model transformations for specific lnguages
    // const targetLanguageAST =
    //   this.intermediateModelToASTTargetLanguageTransformer.transform(intermediateModel);
    return intermediateModel;
  }

  private targetLanguageASTToTargetCode(
    targetAST: TOriginalASTToIntermediateModel,
    options: TTranspileOptions,
  ): TTargetLanguageASTToTargetCode | TTargetLanguageASTToTargetCodeError[] {
    const targetCodeOutput: TTargetLanguageASTToTargetCode = { targetCode: null };
    const errors = [];

    const targetLanguageAST = {
      intermediateAST: targetAST.intermediateModel,
      setupData: targetAST.intermediateSetupModel,
      ...options,
    };
    const targetCoreCode = this.targetLanguageASTToTargetCodeGenerator.generate(targetLanguageAST);
    if (isBitloopsTargetGeneratorError(targetCoreCode)) {
      errors.push(targetCoreCode);
    } else {
      targetCodeOutput.targetCode = targetCoreCode;
    }

    if (targetAST.intermediateSetupModel) {
      const targetSetupCode =
        this.targetLanguageASTToTargetCodeGenerator.generateSetup(targetLanguageAST);
      if (isBitloopsTargetSetupGeneratorError(targetSetupCode)) {
        errors.push(targetSetupCode);
      } else {
        targetCodeOutput.targetSetupCode = targetSetupCode;
      }
    }

    return targetCodeOutput;
  }

  static isTranspileError(
    value: TTargetLanguageASTToTargetCode | TTranspileError[],
  ): value is TTranspileError[] {
    if (
      !Transpiler.isBitloopsCodeToOriginalASTError(value) &&
      !Transpiler.isOriginalASTToIntermediateModelError(value) &&
      !Transpiler.isTargetLanguageASTToTargetCodeError(value)
    ) {
      return false;
    }
    return true;
  }

  static isBitloopsCodeToOriginalASTError(
    value:
      | TBitloopsCodeToOriginalAST
      | TTargetLanguageASTToTargetCode
      | TBitloopsCodeToOriginalASTError[],
  ): value is TBitloopsCodeToOriginalASTError[] {
    if (Array.isArray(value)) {
      for (const err of value) {
        if (!(err instanceof BitloopsSetupParserError) && !(err instanceof BitloopsParserError)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isOriginalASTToIntermediateModelError(
    value:
      | TOriginalASTToIntermediateModel
      | TTargetLanguageASTToTargetCode
      | TOriginalASTToIntermediateModelError[],
  ): value is TOriginalASTToIntermediateModelError[] {
    if (Array.isArray(value)) {
      for (const err of value) {
        if (
          !(err instanceof IntermediateASTParserError) &&
          !(err instanceof BitloopsIntermediateSetupASTParserError)
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static isTargetLanguageASTToTargetCodeError(
    value:
      | TTargetLanguageASTToTargetCode
      | TTargetLanguageASTToTargetCode
      | TTargetLanguageASTToTargetCodeError[],
  ): value is TTargetLanguageASTToTargetCodeError[] {
    if (Array.isArray(value)) {
      for (const err of value) {
        if (
          !(err instanceof BitloopsTargetGeneratorError) &&
          !(err instanceof BitloopsTargetSetupGeneratorError)
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
