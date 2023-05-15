import {
  isIntermediateASTValidationErrors,
  isOriginalParserOrIntermediateASTError,
} from './ast/core/guards/index.js';
import {
  IIntermediateASTParser,
  IIntermediateASTValidator,
  IntermediateAST,
  ValidationErrors,
  ValidationError,
  TBoundedContextName,
} from './ast/core/types.js';
import { isParserErrors } from './parser/core/guards/index.js';
import {
  IOriginalParser,
  OriginalAST,
  type ParserSyntacticErrors,
  TParserInputData,
} from './parser/index.js';
import { ITargetGenerator, TOutputTargetContent } from './target/types.js';
import { isTargetGeneratorError } from './target/typescript-nest/guards/index.js';
import type { TranspilerErrors, TTranspileOptions, TTranspileOutput } from './transpilerTypes.js';
import { SymbolTable } from './semantic-analysis/type-inference/SymbolTable.js';

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
  ): TTranspileOutput | TranspilerErrors {
    const intermediateModel = this.bitloopsCodeToIntermediateModel(transpileInputData);
    if (isOriginalParserOrIntermediateASTError(intermediateModel)) {
      return intermediateModel;
    }
    const completedIntermediateModel = this.completeIntermediateModel(intermediateModel);

    const targetCode = this.intermediateASTModelToTargetLanguage(
      completedIntermediateModel,
      options,
    );

    return targetCode;
  }

  public bitloopsCodeToIntermediateModel(
    transpileInputData: TParserInputData,
  ): IntermediateAST | ParserSyntacticErrors | ValidationErrors {
    const originalAST = this.bitloopsCodeToOriginalAST(transpileInputData);
    if (isParserErrors(originalAST)) {
      return originalAST;
    }

    const intermediateModel = this.originalASTToIntermediateModel(originalAST);
    const validatedIntermediateModel = this.validateIntermediateModel(intermediateModel);

    return validatedIntermediateModel;
  }

  public getSymbolTable(
    inputData: TParserInputData,
  ): Record<TBoundedContextName, SymbolTable> | TranspilerErrors {
    const originalAST = this.bitloopsCodeToOriginalAST(inputData);
    if (isParserErrors(originalAST)) {
      return originalAST;
    }

    const ast = this.originalASTToIntermediateModel(originalAST);
    return this.validator.getSymbolTable(ast);
  }

  private bitloopsCodeToOriginalAST(
    parseInputData: TParserInputData,
  ): OriginalAST | ParserSyntacticErrors {
    return this.parser.parse(parseInputData);
  }

  private originalASTToIntermediateModel(originalLanguageAST: OriginalAST): IntermediateAST {
    return this.originalLanguageASTToIntermediateModelTransformer.parse(originalLanguageAST);
  }

  private intermediateASTModelToTargetLanguage(
    ASTModel: IntermediateAST,
    options: TTranspileOptions,
  ): TOutputTargetContent {
    return this.intermediateASTModelToTargetLanguageGenerator.generate(ASTModel, options);
  }

  private validateIntermediateModel(
    intermediateModel: IntermediateAST,
  ): ValidationError[] | IntermediateAST {
    const validationResult = this.validator.validate(intermediateModel);
    if (isIntermediateASTValidationErrors(validationResult)) {
      return validationResult;
    }
    return intermediateModel;
  }

  private completeIntermediateModel(intermediateModel: IntermediateAST): IntermediateAST {
    return this.originalLanguageASTToIntermediateModelTransformer.complete(intermediateModel);
  }

  // TODO: remove duplication of transpile errors
  static isTranspileError(
    value: TOutputTargetContent | TranspilerErrors,
  ): value is TranspilerErrors {
    if (
      !isParserErrors(value) &&
      !isIntermediateASTValidationErrors(value) &&
      !isTargetGeneratorError(value)
    ) {
      return false;
    }
    return true;
  }

  static isTranspilerError(value: any): value is TranspilerErrors {
    return Array.isArray(value) && value.every((v) => v instanceof Error);
  }
}
