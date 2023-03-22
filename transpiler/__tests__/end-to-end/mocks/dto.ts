export const DTO_END_TO_END_TEST_CASES = [
  {
    description: 'Simple DTO with optional array field',
    input: 'DTO HelloWorldRequestDTO{ optional string[][] name; }',
    className: 'HelloWorldRequestDTO',
    output: 'export interface HelloWorldRequestDTO { name?: string[][]; }',
  },
];
