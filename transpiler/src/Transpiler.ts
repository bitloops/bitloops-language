import { isIntermediateASTError } from './ast/core/guards/index.js';
import { IIntermediateASTParser, IntermediateAST, IntermediateASTError } from './ast/core/types.js';
import { isParserErrors } from './parser/core/guards/index.js';
import {
  IOriginalParser,
  OriginalAST,
  OriginalParserError,
  TParserInputData,
} from './parser/index.js';
import { ITargetGenerator, TargetGeneratorError, TOutputTargetContent } from './target/types.js';
import { isTargetGeneratorError } from './target/typescript/guards/index.js';
import { TTranspileError, TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';

export default class Transpiler {
  constructor(
    private parser: IOriginalParser,
    private originalLanguageASTToIntermediateModelTransformer: IIntermediateASTParser,
    private intermediateASTModelToTargetLanguageGenerator: ITargetGenerator,
  ) {}

  public transpile(
    transpileInputData: TParserInputData,
    options: TTranspileOptions,
  ): TTranspileOutput | TTranspileError[] {
    const intermediateModel = this.bitloopsCodeToIntermediateModel(transpileInputData);
    if (isIntermediateASTError(intermediateModel)) {
      return intermediateModel;
    }

    const targetCode = this.intermediateASTModelToTargetLanguage(intermediateModel, options);
    if (isTargetGeneratorError(targetCode)) {
      return targetCode;
    }

    return targetCode;
  }

  public bitloopsCodeToIntermediateModel(
    transpileInputData: TParserInputData,
  ): IntermediateASTError | IntermediateAST {
    const originalAST = this.bitloopsCodeToOriginalAST(transpileInputData);
    if (isParserErrors(originalAST)) return originalAST;

    const intermediateModel = this.originalASTToIntermediateModel(originalAST);
    return intermediateModel;
  }

  private bitloopsCodeToOriginalAST(
    parseInputData: TParserInputData,
  ): OriginalAST | OriginalParserError[] {
    return this.parser.parse(parseInputData);
  }

  private originalASTToIntermediateModel(
    originalLanguageAST: OriginalAST,
  ): IntermediateAST | IntermediateASTError {
    return this.originalLanguageASTToIntermediateModelTransformer.parse(originalLanguageAST);
  }

  private intermediateASTModelToTargetLanguage(
    ASTModel: IntermediateAST,
    options: TTranspileOptions,
  ): TOutputTargetContent | TargetGeneratorError[] {
    return this.intermediateASTModelToTargetLanguageGenerator.generate(ASTModel, options);
  }

  static isTranspileError(
    value: TOutputTargetContent | TTranspileError[],
  ): value is TTranspileError[] {
    if (
      !isParserErrors(value) &&
      !isIntermediateASTError(value) &&
      !isTargetGeneratorError(value)
    ) {
      return false;
    }
    return true;
  }
}
