import {
  isIntermediateASTValidationErrors,
  isOriginalParserOrIntermediateASTError,
} from './ast/core/guards/index.js';
import {
  IIntermediateASTParser,
  IIntermediateASTValidator,
  IntermediateAST,
  IntermediateASTError,
  IntermediateASTValidationError,
} from './ast/core/types.js';
import { isParserErrors } from './parser/core/guards/index.js';
import {
  IOriginalParser,
  OriginalAST,
  type OriginalParserError,
  TParserInputData,
} from './parser/index.js';
import { ITargetGenerator, TargetGeneratorError, TOutputTargetContent } from './target/types.js';
import { isTargetGeneratorError } from './target/typescript-nest/guards/index.js';
import type { TTranspileError, TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';

export default class Transpiler {
  constructor(
    private parser: IOriginalParser,
    private validator: IIntermediateASTValidator,
    private originalLanguageASTToIntermediateModelTransformer: IIntermediateASTParser,
    private intermediateASTModelToTargetLanguageGenerator: ITargetGenerator,
  ) {}

  public transpile(
    transpileInputData: TParserInputData,
    options: TTranspileOptions,
  ): TTranspileOutput | TTranspileError[] {
    const intermediateModel = this.bitloopsCodeToIntermediateModel(transpileInputData);
    if (isOriginalParserOrIntermediateASTError(intermediateModel)) {
      return intermediateModel;
    }
    const completedIntermediateModel = this.completeIntermediateModel(intermediateModel);

    const targetCode = this.intermediateASTModelToTargetLanguage(
      completedIntermediateModel,
      options,
    );

    if (isTargetGeneratorError(targetCode)) {
      return targetCode;
    }

    return targetCode;
  }

  public bitloopsCodeToIntermediateModel(
    transpileInputData: TParserInputData,
  ): IntermediateAST | OriginalParserError | IntermediateASTError {
    const originalAST = this.bitloopsCodeToOriginalAST(transpileInputData);
    if (isParserErrors(originalAST)) {
      return originalAST;
    }

    const intermediateModel = this.originalASTToIntermediateModel(originalAST);
    const validatedIntermediateModel = this.validateIntermediateModel(intermediateModel);

    return validatedIntermediateModel;
  }

  private bitloopsCodeToOriginalAST(
    parseInputData: TParserInputData,
  ): OriginalAST | OriginalParserError {
    return this.parser.parse(parseInputData);
  }

  private originalASTToIntermediateModel(originalLanguageAST: OriginalAST): IntermediateAST {
    return this.originalLanguageASTToIntermediateModelTransformer.parse(originalLanguageAST);
  }

  private intermediateASTModelToTargetLanguage(
    ASTModel: IntermediateAST,
    options: TTranspileOptions,
  ): TOutputTargetContent | TargetGeneratorError[] {
    return this.intermediateASTModelToTargetLanguageGenerator.generate(ASTModel, options);
  }

  private validateIntermediateModel(
    intermediateModel: IntermediateAST,
  ): IntermediateASTValidationError[] | IntermediateAST {
    const validationResult = this.validator.validate(intermediateModel);
    if (isIntermediateASTValidationErrors(validationResult)) {
      return validationResult;
    }
    return intermediateModel;
  }

  private completeIntermediateModel(intermediateModel: IntermediateAST): IntermediateAST {
    return this.originalLanguageASTToIntermediateModelTransformer.complete(intermediateModel);
  }

  static isTranspileError(
    value: TOutputTargetContent | TTranspileError[],
  ): value is TTranspileError[] {
    if (
      !isParserErrors(value) &&
      !isIntermediateASTValidationErrors(value) &&
      !isTargetGeneratorError(value)
    ) {
      return false;
    }
    return true;
  }
}
