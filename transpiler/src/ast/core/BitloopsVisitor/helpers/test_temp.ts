import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';

const blString = `
ValueObject TitleVO {
    constructor(props: TitleProps): ( OK ( TitleVO ), Errors ( DomainErrors.InvalidTitleError )) {
      applyRules(IsValidTitle(props.title));
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
  console.log('result', result);
}
