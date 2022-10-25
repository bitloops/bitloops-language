import {
  BitloopsIntermediateSetupASTParser,
  BitloopsParserError,
  BitloopsSetupParser,
} from '../../../../index.js';

const blString = `
RESTServer({
  server: REST.Fastify,
  port: Env(FASTIFY_PORT, 5001),
  apiPrefix: '/api',
  corsOptions: '*',
}) {
  '/todo': todoRESTRouter;
}
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
