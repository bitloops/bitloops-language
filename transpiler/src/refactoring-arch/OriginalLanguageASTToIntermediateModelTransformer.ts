import { 
    IIntermediateModelBuilder,
    IOriginalLanguageASTToIntermediateModelTransformer, 
    TIntermediateModel, 
    TOriginalLanguageAST 
} from "./types.js";




export default class OriginalLanguageASTToIntermediateModelTransformer implements IOriginalLanguageASTToIntermediateModelTransformer {
    
    constructor (private intermediateModelBuilder: IIntermediateModelBuilder) {
        this.intermediateModelBuilder = intermediateModelBuilder;
    }
    
    public transform(originalLanguageAST: TOriginalLanguageAST): TIntermediateModel {
        console.log(originalLanguageAST);
        // should the validation hapen here?
        return this.intermediateModelBuilder.build(originalLanguageAST);
    }

    // private validate() {

    // }
}