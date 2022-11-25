import { defineFeature, loadFeature } from 'jest-cucumber';
// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/BitloopsParser.js';
// import expectedModels from '../../../../src/examples/domainError.js';
// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/BitloopsParser.js';
import {
  BitloopsParser,
  BitloopsIntermediateASTParser,
  BitloopsParserError,
  BitloopsLanguageASTContext,
} from '../../../src/index.js';
import { TDomainErrors, TModule } from '../../../src/types.js';

const feature = loadFeature('__tests__/ast/core/domainError.feature');

const expectedModels: TDomainErrors[] = [
  {
    InvalidNameError: {
      message: {
        expression: {
          evaluation: {
            regularEvaluation: { type: 'backTickString', value: 'is an invalid ${name}' },
          },
        },
      },
      errorId: {
        expression: {
          evaluation: {
            regularEvaluation: { type: 'string', value: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' },
          },
        },
      },
      parameters: [{ type: 'string', value: 'name' }],
    },
  },
  {
    InvalidNameError: {
      message: {
        expression: {
          evaluation: { regularEvaluation: { type: 'string', value: 'is an invalid name' } },
        },
      },
      errorId: {
        expression: {
          evaluation: {
            regularEvaluation: { type: 'string', value: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' },
          },
        },
      },
      parameters: [
        { type: 'string', value: 'name' },
        { type: 'string', value: 'hello' },
      ],
    },
  },
  // {
  //   'Hello World': {
  //     core: {
  //       DomainErrors: {
  //         InvalidNameError: {
  //           message: { backTickString: 'name is an invalid ${name}' },
  //           errorId: { backTickString: '${errorId}' },
  //           parameters: [
  //             { type: 'string', value: 'name' },
  //             { type: 'string', value: 'errorId' },
  //           ],
  //         },
  //       },
  //     },
  //   },
  // },
];
// TODO make work with backticks and make work to target language
const expectedOutput: {
  [bdctx: string]: {
    core: TModule;
  };
}[] = expectedModels.map((expectedModel: TDomainErrors) => ({
  ['Hello World']: { core: { DomainErrors: expectedModel } },
}));
let example_count = 0;
let blString: string;
let res: any;

afterEach(() => {
  example_count++;
});
defineFeature(feature, (test) => {
  test('domainError is valid', ({ given, when, then }) => {
    given(/^A valid domain error string (.*)$/, (arg0) => {
      blString = arg0;
    });

    when('I generate the model', () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext: 'Hello World',
          module: 'core',
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        res = intermediateParser.parse(initialModelOutput as unknown as BitloopsLanguageASTContext);
      }
    });

    then('I should get the right model', () => {
      expect(res).toEqual(expectedOutput[example_count]);
    });
  });

  test('domainError is invalid', ({ given, when, then }) => {
    given(/^An invalid domain error string (.*)$/, (arg0) => {
      blString = arg0;
    });

    when('I generate the model', () => {
      res = () => {
        const parser = new BitloopsParser();
        const initialModelOutput = parser.parse([
          {
            boundedContext: 'Test',
            module: 'Test',
            fileId: 'testFile.bl',
            fileContents: blString,
          },
        ]);
        const intermediateParser = new BitloopsIntermediateASTParser();
        if (!(initialModelOutput instanceof BitloopsParserError)) {
          intermediateParser.parse(initialModelOutput as unknown as BitloopsLanguageASTContext);
        }
      };
    });

    then('I should get an error', () => {
      expect(res).toThrow(TypeError);
    });
  });
});
