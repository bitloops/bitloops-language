import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';
// import { TBuildInFunction } from '../../../../types.js';

const blString = ` 
// JestTestExpression { a OR b AND c OR d }
JestTestBuiltInFunction { applyRules ( IsValidTitle ( props.title ), isLongName ( props.name )  ) }
`;

// const model: TBuildInFunction = {
//   buildInFunction: {
//     applyRules: [{ name: 'IsValidTitle', arguments: [{ type: 'variable', value: 'props.title' }] }],
//   },
// };

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
