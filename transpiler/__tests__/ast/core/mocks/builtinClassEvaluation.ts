import { ArgumentListBuilderDirector } from '../builders/argumentListBuilderDirector.js';

export const validBuiltinClassEvaluations = [
  {
    description: 'Valid builtin class type',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBuiltInClass {  UUIDv4(id) }',
    builtInIdentifier: 'UUIDv4',
    argumentList: new ArgumentListBuilderDirector().buildArgumentList(['id']),
    // expected: new EvaluationBuilderDirector().buildBuiltInClassEvaluation()
    // expected: {
    //   builtInClass: {
    //     className: 'UUIDv4',
    //     argumentList: [{ argument: { expression: { identifier: 'id' } } }],
    //   },
    // },
  },
];
