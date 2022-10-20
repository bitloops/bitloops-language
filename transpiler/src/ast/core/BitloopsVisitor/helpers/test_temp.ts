import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';

const blString = `
DTO CreateTodoRequestDTO {
  string title;
}

DTO CreateTodoResponseDTO {
  string message;
}

UseCase CreateTodoUseCase (todoRepo: TodoRepoPort) {
  execute ( requestDTO: CreateTodoRequestDTO ) : ( OK ( CreateTodoResponseDTO ), Errors( DomainErrors.InvalidTitleError ) ) {
    const title = TitleVO({ title: requestDTO.title });

    const todo = TodoEntity({
      title,
      completed: false
    });

    this.todoRepo.save(todo);

    return CreateTodoResponseDTO ( { message: 'Todo created successfully!' } ) ;
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
  console.log('result:', JSON.stringify(result, null, 2));
}

// const a: TRules = {
//   IsValidTitle: {
//     error: 'DomainErrors.InvalidTitleError',
//     parameters: [{ value: 'title', type: 'string' }],
//   },
// };
