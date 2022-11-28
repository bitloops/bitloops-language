import { isBitloopsIntermediateASTParserError } from '../ast/core/guards/index.js';
import { IBitloopsIntermediateASTParser } from '../ast/core/types.js';
import { isBitloopsParserError } from '../parser/core/guards/index.js';
import { TParserCoreInputData } from '../parser/core/types.js';
import { IBitloopsParser } from '../parser/index.js';
import { IBitloopsTargetGenerator } from '../target/types.js';
import { TCodeInTargetLanguage } from './types.js';

type TTranspileOptions = {
  targetLanguage: string;
  formatterConfig?: any;
  sourceDirPath?: string;
};

export default class Transpiler {
  constructor(
    private parser: IBitloopsParser,
    private originalLanguageASTToIntermediateModelTransformer: IBitloopsIntermediateASTParser,
    // private intermediateModelToASTTargetLanguageTransformer: IIntermediateModelToASTTargetLanguageTransformer,
    private targetLanguageASTToTargetCodeGenerator: IBitloopsTargetGenerator,
  ) {
    this.parser = parser;
    this.originalLanguageASTToIntermediateModelTransformer =
      originalLanguageASTToIntermediateModelTransformer;
    // this.intermediateModelToASTTargetLanguageTransformer =
    //   intermediateModelToASTTargetLanguageTransformer;
    this.targetLanguageASTToTargetCodeGenerator = targetLanguageASTToTargetCodeGenerator;
  }

  public transpile(
    bitloopsCode: TParserCoreInputData,
    options: TTranspileOptions,
  ): TCodeInTargetLanguage {
    const originalLanguageAST = this.parser.parse(bitloopsCode);
    if (isBitloopsParserError(originalLanguageAST)) throw originalLanguageAST;

    const intermediateModel =
      this.originalLanguageASTToIntermediateModelTransformer.parse(originalLanguageAST);
    if (isBitloopsIntermediateASTParserError(intermediateModel)) throw intermediateModel;

    // TODO uncomment this and create class for model to model transformations for specific lnguages
    // const targetLanguageAST =
    //   this.intermediateModelToASTTargetLanguageTransformer.transform(intermediateModel);
    const targetLanguageAST = {
      intermediateAST: intermediateModel,
      setupData: null, // TODO generate setup data too
      ...options,
    };
    const targetCode = this.targetLanguageASTToTargetCodeGenerator.generate(targetLanguageAST);
    return targetCode;
  }
}
