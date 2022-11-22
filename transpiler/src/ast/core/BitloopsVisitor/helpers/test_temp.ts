import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
  // BitloopsIntermediateSetupASTParser,
  // BitloopsSetupParser,
} from '../../../../index.js';

const blString = `
DTO CreateTodoResponseDTO {
  string title;
}

GraphQLController CreateTodoGraphQLController(createTodoUseCase: CreateTodoUseCase) {
  operation: GraphQL.Operations.Mutation;
  input: CreateTodoRequestDTO;

  execute(request): CreateTodoResponseDTO {
    const result = this.createTodoUseCase.execute(dto);

    if (result is Error) {
      switch (result.getClass()) {
        case DomainErrors.TitleOutOfBoundsError: {
          return this.clientError(result.message);
        }
        default: {
          return this.fail(result.message);
        }
      }
    } 

    const responseMessage = CreateTodoResponseDTO({
        message: 'Todo created!'
    })
    return this.ok(responseMessage);
  }
}
  `;

const parser = new BitloopsParser();
const initialModelOutput = parser.parse([
  {
    boundedContext: 'a',
    module: 'b',
    fileId: 'testFile.bl',
    fileContents: blString,
  },
]);
const intermediateParser = new BitloopsIntermediateASTParser();
if (!(initialModelOutput instanceof BitloopsParserError)) {
  const result = intermediateParser.parse(initialModelOutput);
  console.log('result:', JSON.stringify(result));
}

// const parser = new BitloopsSetupParser();
// const initialModelOutput = parser.parse(blString);
// const intermediateParser = new BitloopsIntermediateSetupASTParser();
// if (!(initialModelOutput instanceof BitloopsParserError)) {
//   const result = intermediateParser.parse(initialModelOutput as any);
//   console.log('result:', JSON.stringify(result));
// }
