import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';

const blString = `
Props TodoProps {
    optional UUIDv4 id; // The id name is reserved for entity ids, based on this id, a TodoEntityId class is automatically generated
    TitleVO title;
    // string description; @TODO add description
    bool completed;
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
