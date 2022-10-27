import {
  BitloopsIntermediateSetupASTParser,
  BitloopsParserError,
  BitloopsSetupParser,
} from '../../../../index.js';

const blString = `
JestTestStatement { 
        switch (result.getClass()) {
        case DomainErrors.TitleOutOfBoundsError: {
          this.clientError(response, result.message);
          break;
        }
        default:
          this.fail(response, result.message);
      } }

  `;

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

const parser = new BitloopsSetupParser();
const initialModelOutput = parser.parse(blString);
const intermediateParser = new BitloopsIntermediateSetupASTParser();
if (!(initialModelOutput instanceof BitloopsParserError)) {
  const result = intermediateParser.parse(initialModelOutput as any);
  console.log('result:', JSON.stringify(result));
}
