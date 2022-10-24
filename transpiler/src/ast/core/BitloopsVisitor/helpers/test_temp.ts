import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';

const blString = ` 
PackagePort GherkinPackagePort { encode(value: string): bytes; } PackagePort ExamplePackagePort { example(value: string): string; } 
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

// const a: TRules = {
//   IsValidTitle: {
//     error: 'DomainErrors.InvalidTitleError',
//     parameters: [{ value: 'title', type: 'string' }],
//   },
// };
