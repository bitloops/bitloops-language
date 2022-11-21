import { IIntermediateModelBuilder, TIntermediateModel, TOriginalLanguageAST } from './types.js';

class IntermediateModelValidationError extends Error {
  // constructor(msg: string) {
  //     super(msg);
  //     // Set the prototype explicitly.
  //     Object.setPrototypeOf(this, IntermediateModelValidationError.prototype);
  // }
  // sayHello() {
  //     return "hello " + this.message;
  // }
}

export default class IntermediateModelBuilder implements IIntermediateModelBuilder {
  private intermediateModel: TIntermediateModel;

  public build(initialAST: TOriginalLanguageAST): TIntermediateModel {
    // implement logic for buulding
    // ....
    //...
    console.log('initialAST', initialAST);
    this.intermediateModel = 'intermediateModel';
    this.validate(this.intermediateModel);
  }

  private validate(intermediateModel: TIntermediateModel): void | IntermediateModelValidationError {
    // create specific error for this case
    console.log(`${intermediateModel} validation`);
  }
}
