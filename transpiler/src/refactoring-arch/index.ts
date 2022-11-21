// import { TOriginalLanguageAST, IBitloopsParser, TCodeInOriginalLanguage } from "./Parser.js";

// type TIntermediateModel = any;
// type TTargetLanguageAST = any;
// type TCodeInTargetLanguage = any;

// interface IOriginalLanguageASTToIntermediateModelTransformer {
//   transform: (initialAST: TOriginalLanguageAST) => TIntermediateModel;
// }
// interface IIntermediateModelToASTTargetLanguageTransformer {
//   transform: (intermediateModel: TIntermediateModel) => TTargetLanguageAST;
// }

// interface ITargetLanguageASTToTargetCodeGenerator {
//     generate: (targetLanguageAST: TTargetLanguageAST) => TCodeInTargetLanguage;
//   }

// class Transpiler {

//   constructor(
//     private parser: IBitloopsParser,
//     private originalLanguageASTToIntermediateModelTransformer: IOriginalLanguageASTToIntermediateModelTransformer,
//     private intermediateModelToASTTargetLanguageTransformer: IIntermediateModelToASTTargetLanguageTransformer,
//     private targetLanguageASTToTargetCodeGenerator: ITargetLanguageASTToTargetCodeGenerator,
//   ) {
//     this.parser = parser;
//     this.originalLanguageASTToIntermediateModelTransformer = originalLanguageASTToIntermediateModelTransformer;
//     this.intermediateModelToASTTargetLanguageTransformer = intermediateModelToASTTargetLanguageTransformer;
//     this.targetLanguageASTToTargetCodeGenerator = targetLanguageASTToTargetCodeGenerator;
//   }

//   public transpile(bitloopsCode: TCodeInOriginalLanguage): TCodeInTargetLanguage  {
//     const blCode = this.parser.parse(bitloopsCode);
//     const intermediateModel = this.originalLanguageASTToIntermediateModelTransformer.transform(blCode);
//     const targetLanguageAST = this.intermediateModelToASTTargetLanguageTransformer.transform(intermediateModel);
//     const targetCode = this.targetLanguageASTToTargetCodeGenerator.generate(targetLanguageAST);
//     return targetCode;
//   }
// }
