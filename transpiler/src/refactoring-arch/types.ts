// TODO define the types
// export type TCodeInOriginalLanguage = any;
// export type TOriginalLanguageAST = any;
// export type TIntermediateModel = any;
export type TTargetLanguageAST = any;
export type TCodeInTargetLanguage = any;

// export interface IOriginalLanguageASTToIntermediateModelTransformer {
//   transform: (initialAST: TOriginalLanguageAST) => TIntermediateModel;
// }

// export interface IIntermediateModelToASTTargetLanguageTransformer {
//   transform: (intermediateModel: TIntermediateModel) => TTargetLanguageAST;
// }

export interface ITargetLanguageASTToTargetCodeGenerator {
  generate: (targetLanguageAST: TTargetLanguageAST) => TCodeInTargetLanguage;
}

// export interface IBitloopsParser {
//   parse: (bitloopsCode: TCodeInOriginalLanguage) => TOriginalLanguageAST;
// }

// export interface IIntermediateModelBuilder {
//   build(initialAST: TOriginalLanguageAST): TIntermediateModel;
// }
