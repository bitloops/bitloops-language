import { UseCaseBuilderDirector } from '../builders/useCase/useCaseBuilderDirector.js';

export const validUseCaseDeclarationCases = [
  {
    description: 'UseCase declaration without error',
    fileId: 'testFile.bl',
    inputBLString:
      "UseCase HelloWorldUseCase() { execute () : ( OK (HelloWorldResponseDTO), Errors() ) { return HelloWorldResponseDTO( { message: 'Hello, World!' } ) ; } }",
    expected: new UseCaseBuilderDirector().buildUseCaseWithoutErrorAndReturnDTO({
      identifier: 'HelloWorldUseCase',
    }),
  },
];
