// import { BitloopsParser, BitloopsParserError } from '../../../../index.js';
import antlr4 from 'antlr4';
import BitloopsLexer from '../../../../parser/core/grammar/BitloopsLexer.js';

// const blString = `JestTest { helloWorldUseCase.execute() }`;

const blString = `
GraphQLController HelloWorldController ( ) {
    operation: GraphQL.Operations.Query;
    input: HelloWorldRequestDTO;
  
    execute(request): HelloWorldResponseDTO {
        this.ok('Hello World!');
    }
  }
  `;

const chars = new antlr4.InputStream(blString);
const lexer: any = new BitloopsLexer(chars) as any;
const tokens = new antlr4.CommonTokenStream(lexer);
const test = lexer.getAllTokens();
console.log('Tokens: ', tokens);

// const parser = new BitloopsParser();
// const initialModelOutput = parser.parse([
//   {
//     boundedContext: 'a',
//     module: 'b',
//     fileId: 'testFile.bl',
//     fileContents: blString,
//   },
// ]);
// const intermediateParser = new BitloopsIntermediateASTParser();
// if (!(initialModelOutput instanceof BitloopsParserError)) {
//   const result = intermediateParser.parse(initialModelOutput);
//   console.log('result:', JSON.stringify(result));
// }

// const a: TRules = {
//   IsValidTitle: {
//     error: 'DomainErrors.InvalidTitleError',
//     parameters: [{ value: 'title', type: 'string' }],
//   },
// };
