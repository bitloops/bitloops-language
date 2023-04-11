import { ClassTypes, TClassTypesValues } from '../../../src/helpers/mappings.js';

export const MissingBoundedContext = {
  boundedContexts: ['empty', 'null', 'undefined', 'space'],
  restInfo: {
    module: 'core',
    classType: ClassTypes.Props,
    className: 'NameProps',
    targetLanguage: 'TypeScript',
    path: './lib/bounded-contexts/hello-world/core/domain/',
    filename: 'name.props.ts',
  },
};

export const MissingModule = {
  modules: ['empty', 'null', 'undefined', 'space'],
  restInfo: {
    boundedContext: 'Hello World',
    classType: ClassTypes.Props,
    className: 'NameProps',
    targetLanguage: 'TypeScript',
    path: './lib/bounded-contexts/hello-world/core/domain/',
    filename: 'name.props.ts',
  },
};

export const UnsupportedTargetLanguage = {
  targetLanguages: [
    'Java',
    'JavaScript',
    'Scala',
    'Ruby',
    'Perl',
    'PHP',
    'C++',
    'C',
    'C#',
    'Go',
    'Lua',
    'Ada',
    'Cobol',
    'Fortran',
    'Rust',
    'Python',
    'Carbon',
    'Swift',
    'Kotlin',
    'Groovy',
    'Julia',
    'Elixir',
    'FSharp',
    'VisualBasic',
    'ObjectiveC',
    'Dart',
    'Haskell',
    'Racket',
    'Clojure',
    'Erlang',
    'Elm',
    'OCaml',
    'Pascal',
    'Prolog',
  ],
};

export const UnsupportedClassType = {
  type: 'InvalidClassType',
};

export const SupportedTargetLanguageAndClassType: Array<{
  boundedContext: string;
  module: string;
  classType: TClassTypesValues;
  className: string;
  targetLanguage: string;
  path: string;
  filename: string;
}> = [
  {
    boundedContext: 'Hello World',
    module: 'core',
    classType: 'Props',
    className: 'NameProps',
    targetLanguage: 'TypeScript',
    path: './lib/bounded-contexts/hello-world/core/domain/',
    filename: 'name.props.ts',
  },
  {
    boundedContext: 'hello World',
    module: 'iam',
    classType: 'Props',
    className: 'NameProps',
    targetLanguage: 'TypeScript',
    path: './lib/bounded-contexts/hello-world/iam/domain/',
    filename: 'name.props.ts',
  },
  {
    boundedContext: 'Hello World',
    module: 'Async Notifications',
    classType: 'ValueObject',
    className: 'Name',
    targetLanguage: 'TypeScript',
    path: './lib/bounded-contexts/hello-world/async-notifications/domain/',
    filename: 'name.value-object.ts',
  },
  {
    boundedContext: 'Hello World',
    module: 'Invoices',
    classType: ClassTypes.RootEntity,
    className: 'Member',
    targetLanguage: 'TypeScript',
    path: './lib/bounded-contexts/hello-world/invoices/domain/',
    filename: 'member.entity.ts',
  },
];
