import { isBitloopsIntermediateASTParserError } from '../ast/core/guards/index.js';
import {
  BitloopsIntermediateASTParserError,
  IBitloopsIntermediateASTParser,
} from '../ast/core/types.js';
import { isBitloopsIntermediateSetupASTParserError } from '../ast/setup/guards/index.js';
import {
  BitloopsIntermediateSetupASTParserError,
  IBitloopsIntermediateSetupASTParser,
} from '../ast/setup/types.js';
import { isBitloopsParserError } from '../parser/core/guards/index.js';
import {
  BitloopsLanguageASTContext,
  BitloopsParserError,
  TParserCoreInputData,
} from '../parser/core/types.js';
import { IBitloopsParser } from '../parser/index.js';
import { isBitloopsSetupParserError } from '../parser/setup/guards/index.js';
import {
  BitloopsLanguageSetupAST,
  BitloopsSetupParserError,
  IBitloopsSetupParser,
} from '../parser/setup/types.js';
import {
  BitloopsTargetGeneratorError,
  BitloopsTargetSetupGeneratorError,
  IBitloopsTargetGenerator,
  TBitloopsOutputTargetContent,
  TBitloopsTargetSetupContent,
} from '../target/types.js';
import {
  isBitloopsTargetGeneratorError,
  isBitloopsTargetSetupGeneratorError,
} from '../target/typescript/guards/index.js';
import { ISetupData, TBoundedContexts } from '../types.js';

type TBitloopsTargetContent = {
  targetCode: TBitloopsOutputTargetContent;
  targetSetupCode: TBitloopsTargetSetupContent;
};

type TTranspileOptions = {
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};

type TTranspileErrors =
  | BitloopsParserError
  | BitloopsSetupParserError
  | BitloopsIntermediateASTParserError
  | BitloopsIntermediateSetupASTParserError
  | BitloopsTargetGeneratorError
  | BitloopsTargetSetupGeneratorError;

type TTargetLanguageASTToTargetCodeOutput = {
  core: TBitloopsOutputTargetContent;
  setup?: TBitloopsTargetSetupContent;
  errors: (BitloopsTargetGeneratorError | BitloopsTargetSetupGeneratorError)[];
};

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

  static isTranspileError(
    value: TBitloopsTargetContent | TTranspileErrors[],
  ): value is TTranspileErrors[] {
    if (Array.isArray(value)) return true;
    return false;
  }

  private bitloopsCodeToOriginalAST(
    parseInputData: TParserCoreInputData,
    setupBitloopsCode?: string,
  ): {
    core: BitloopsLanguageASTContext;
    setup: BitloopsLanguageSetupAST;
    errors: (BitloopsSetupParserError | BitloopsParserError)[];
  } {
    const originalAST = {
      core: null,
      setup: null,
      errors: [],
    };

    const originalLanguageAST = this.parser.parse(parseInputData);
    if (isBitloopsParserError(originalLanguageAST)) {
      originalAST.errors.push(originalLanguageAST);
    } else {
      originalAST.core = originalLanguageAST;
    }

    if (setupBitloopsCode) {
      const originalLanguageASTSetup = this.setupParser.parse(setupBitloopsCode);
      if (isBitloopsSetupParserError(originalLanguageASTSetup)) {
        originalAST.errors.push(originalLanguageAST);
      } else {
        originalAST.setup = originalLanguageASTSetup;
      }
    }

    return originalAST;
  }

  private originalASTToIntermediateModel(
    originalLanguageAST: BitloopsLanguageASTContext,
    originalLanguageASTSetup: BitloopsLanguageSetupAST,
  ): {
    core: TBoundedContexts;
    setup: ISetupData;
    errors: (BitloopsIntermediateASTParserError | BitloopsIntermediateSetupASTParserError)[];
  } {
    const intermediateModel = {
      core: null,
      setup: null,
      errors: [],
    };
    const intermediateModelCore =
      this.originalLanguageASTToIntermediateModelTransformer.parse(originalLanguageAST);
    if (isBitloopsIntermediateASTParserError(intermediateModelCore)) {
      intermediateModel.errors.push(intermediateModelCore);
    } else {
      intermediateModel.core = intermediateModelCore;
    }

    if (originalLanguageASTSetup) {
      const intermediateModelSetup =
        this.originalLanguageASTToIntermediateModelSetupTransformer.parse(originalLanguageASTSetup);
      if (isBitloopsIntermediateSetupASTParserError(intermediateModelSetup)) {
        intermediateModel.errors.push(originalLanguageAST);
      } else {
        intermediateModel.setup = intermediateModelSetup;
      }
    }
    return intermediateModel;
  }

  private intermediateModelToTargetLanguageAST(
    intermediateModel: TBoundedContexts,
    _options: TTranspileOptions,
  ): TBoundedContexts {
    // TODO uncomment this and create class for model to model transformations for specific lnguages
    // const targetLanguageAST =
    //   this.intermediateModelToASTTargetLanguageTransformer.transform(intermediateModel);
    return intermediateModel;
  }

  private targetLanguageASTToTargetCode(
    targetAST: TBoundedContexts,
    setupData: ISetupData,
    options: TTranspileOptions,
  ): TTargetLanguageASTToTargetCodeOutput {
    const targetCode: TTargetLanguageASTToTargetCodeOutput = {
      core: null,
      setup: null,
      errors: [],
    };
    const targetLanguageAST = {
      intermediateAST: targetAST,
      setupData,
      ...options,
    };
    const targetCoreCode = this.targetLanguageASTToTargetCodeGenerator.generate(targetLanguageAST);
    if (isBitloopsTargetGeneratorError(targetCoreCode)) {
      targetCode.errors.push(targetCoreCode);
    } else {
      targetCode.core = targetCoreCode;
    }

    if (setupData) {
      const targetSetupCode =
        this.targetLanguageASTToTargetCodeGenerator.generateSetup(targetLanguageAST);
      if (isBitloopsTargetSetupGeneratorError(targetSetupCode)) {
        targetCode.errors.push(targetSetupCode);
      } else {
        targetCode.setup = targetSetupCode;
      }
    }

    return targetCode;
  }

  public transpile(
    transpileInputData: TParserCoreInputData,
    options: TTranspileOptions,
    setupBitloopsCode?: string,
  ): TBitloopsTargetContent | TTranspileErrors[] {
    const {
      core: originalASTCore,
      setup: originalASTSetup,
      errors: originalASTErrors,
    } = this.bitloopsCodeToOriginalAST(transpileInputData, setupBitloopsCode);
    if (originalASTErrors.length > 0) return originalASTErrors;

    const {
      core: intermediateModelCore,
      setup: intermediateSetupModel,
      errors: intermediateModelErrors,
    } = this.originalASTToIntermediateModel(originalASTCore, originalASTSetup);
    if (intermediateModelErrors.length > 0) return intermediateModelErrors;

    const targetLanguageAST = this.intermediateModelToTargetLanguageAST(
      intermediateModelCore,
      options,
    );

    const {
      core: targetCode,
      setup: targetSetupCode,
      errors: targetCodeErrors,
    } = this.targetLanguageASTToTargetCode(targetLanguageAST, intermediateSetupModel, options);
    if (targetCodeErrors.length > 0) return targetCodeErrors;

    return {
      targetCode,
      targetSetupCode,
    };
  }
}
