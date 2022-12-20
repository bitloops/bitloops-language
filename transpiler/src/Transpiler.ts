import { isBitloopsIntermediateASTError } from './ast/core/guards/index.js';
import { IntermediateASTParserError, IBitloopsIntermediateASTParser } from './ast/core/types.js';
import { isBitloopsIntermediateSetupASTParserError } from './ast/setup/guards/index.js';
import {
  BitloopsIntermediateSetupASTParserError,
  IBitloopsIntermediateSetupASTParser,
} from './ast/setup/types.js';
import { isBitloopsParserError } from './parser/core/guards/index.js';
import { BitloopsParserError, TParserCoreInputData } from './parser/core/types.js';
import { IBitloopsParser } from './parser/index.js';
import { isBitloopsSetupParserError } from './parser/setup/guards/index.js';
import { BitloopsSetupParserError, IBitloopsSetupParser } from './parser/setup/types.js';
import {
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
  IBitloopsTargetGenerator,
} from './target/types.js';
import {
  isBitloopsTargetGeneratorError,
  isBitloopsTargetSetupGeneratorError,
} from './target/typescript/guards/index.js';
import {
  TBitloopsCodeToOriginalAST,
  TBitloopsCodeToOriginalASTError,
  TIntermediateModel,
  TIntermediateModelError,
  TTargetLanguageASTToTargetCode,
  TTargetLanguageASTToTargetCodeError,
  TTranspileError,
  TTranspileOptions,
} from './transpilerTypes.js';

export default class Transpiler {
  constructor(
    private parser: IBitloopsParser,
    private setupParser: IBitloopsSetupParser,
    private originalLanguageASTToIntermediateModelTransformer: IBitloopsIntermediateASTParser,
    private originalLanguageASTToIntermediateModelSetupTransformer: IBitloopsIntermediateSetupASTParser,
    private intermediateASTModelToTargetLanguageGenerator: IBitloopsTargetGenerator,
  ) {}

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

    const targetCode = this.intermediateASTModelToTargetLanguage(intermediateModel, options);
    if (Transpiler.isIntermediateASTModelToTargetLanguageError(targetCode)) return targetCode;

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
  ): TIntermediateModel | TIntermediateModelError[] {
    const intermediateModelOutput: TIntermediateModel = { intermediateModel: null };
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

  private intermediateASTModelToTargetLanguage(
    ASTModel: TIntermediateModel,
    options: TTranspileOptions,
  ): TTargetLanguageASTToTargetCode | TTargetLanguageASTToTargetCodeError[] {
    const targetCodeOutput: TTargetLanguageASTToTargetCode = { targetCode: null };
    const errors = [];

    const targetLanguageAST = {
      intermediateAST: ASTModel.intermediateModel,
      setupData: ASTModel.intermediateSetupModel,
      ...options,
    };
    const targetCoreCode =
      this.intermediateASTModelToTargetLanguageGenerator.generate(targetLanguageAST);
    if (isBitloopsTargetGeneratorError(targetCoreCode)) {
      errors.push(targetCoreCode);
    } else {
      targetCodeOutput.targetCode = targetCoreCode;
    }

    if (ASTModel.intermediateSetupModel) {
      const targetSetupCode =
        this.intermediateASTModelToTargetLanguageGenerator.generateSetup(targetLanguageAST);
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
      !Transpiler.isIntermediateASTModelToTargetLanguageError(value)
    ) {
      return false;
    }
    return true;
  }

  static isBitloopsCodeToOriginalASTError(
    value:
      | TBitloopsCodeToOriginalAST
      | TTargetLanguageASTToTargetCode
      | TBitloopsCodeToOriginalASTError[]
      | TTranspileError[],
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
    value: TIntermediateModel | TTargetLanguageASTToTargetCode | TIntermediateModelError[],
  ): value is TIntermediateModelError[] {
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

  static isIntermediateASTModelToTargetLanguageError(
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
