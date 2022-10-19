import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';

const blString = `
Rule IsValidTitle(title: string) throws DomainErrors.InvalidTitleError {
    isBrokenIf (title > 150 OR title < 4);
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
