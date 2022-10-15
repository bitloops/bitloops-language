import {
  BitloopsIntermediateSetupASTParser,
  BitloopsLanguageSetupAST,
  BitloopsSetupParser,
  BitloopsSetupParserError,
} from '../../../../src/index.js';

const expectedResults = [
  {
    packages: {
      'Bounded Context': {
        Module: {
          UtilitiesPackagePort: 'LodashUtilitiesPackageAdapter',
        },
      },
    },
  },
];
test('check if works', () => {
  const blString =
    '[Bounded Context][Module]LodashUtilitiesPackageAdapter concretes UtilitiesPackagePort;';
  const parser = new BitloopsSetupParser();
  const initialModelOutput = parser.parse(blString);
  const intermediateParser = new BitloopsIntermediateSetupASTParser();
  let resp;
  if (!(initialModelOutput instanceof BitloopsSetupParserError)) {
    resp = intermediateParser.parse(initialModelOutput as unknown as BitloopsLanguageSetupAST);
  }
  expect(resp).toMatchObject(expectedResults[0]);
});
