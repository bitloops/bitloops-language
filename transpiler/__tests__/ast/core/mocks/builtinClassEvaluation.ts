export const validBuiltinClassEvaluations = [
  {
    description: 'Valid builtin class type',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBuiltInClass {  UUIDv4(id) }',
    expected: {
      builtInClass: {
        className: 'UUIDv4',
        argumentList: [{ argument: { expression: { identifier: 'id' } } }],
      },
    },
  },
];
