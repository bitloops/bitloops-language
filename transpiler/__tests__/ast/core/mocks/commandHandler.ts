export const validCommandHandlerCases = [
  {
    description: 'UseCase declaration without error',
    fileId: 'testFile.bl',
    inputBLString:
      "UseCase HelloWorldUseCase() { execute () : ( OK (HelloWorldResponseDTO), Errors() ) { return HelloWorldResponseDTO( { message: 'Hello, World!' } ) ; } }",
    expected: new CommandHandlerNodeDirector().buildUseCaseWithoutErrorAndReturnDTO({
      identifier: 'HelloWorldUseCase',
    }),
  },
  //   {
  //     description: 'UseCase declaration with domain evaluations',
  //     fileId: 'testFile.bl',
  //     inputBLString:
  //       'UseCase CreateTodoUseCase ( ) {   execute ( ) : ( OK ( CreateTodoResponseDTO ) , Errors ( ) ) {     const title = TitleVO({ title: requestDTO.title });     const todo = TodoEntity({title: title, completed: false});     return CreateTodoResponseDTO ( { message: todo } ) ;   } }',
  //     expected: new UseCaseBuilderDirector().buildUseCaseWithDomainDeclarations({
  //       identifier: 'CreateTodoUseCase',
  //       executeReturnTypes: {
  //         identifierOK: 'CreateTodoResponseDTO',
  //       },
  //     }),
  //   },
  //   {
  //     description: 'UseCase declaration without error',
  //     fileId: 'testFile.bl',
  //     inputBLString:
  //       'UseCase CreateTodoUseCase ( ) {   execute ( ) : ( OK ( void ) , Errors ( ) ) {     const title = TitleVO({ title: requestDTO.title });     const todo = TodoEntity({title: title, completed: false});   } }',
  //     expected: new UseCaseBuilderDirector().buildUseCaseWithoutErrorAndReturnTypeVoid({
  //       identifier: 'CreateTodoUseCase',
  //     }),
  //   },
];
