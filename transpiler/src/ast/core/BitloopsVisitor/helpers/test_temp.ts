import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '../../../../index.js';

const blString = `
Rule TitleOutOfBoundsRule(title: string) throws DomainErrors.TitleOutOfBoundsError {
  isBrokenIf(title > 150 OR title < 4);
}

Props TitleProps {
  string title;
}

ValueObject TitleVO {
  constructor(props: TitleProps): (OK(TitleVO), Errors(DomainErrors.TitleOutOfBoundsError)) {
    applyRules(TitleOutOfBoundsRule(props.title));
  }
}

// DomainError TitleOutOfBoundsError(title: string)  {
//   message: \`Title \${title} is out of range\`,
//   errorId: 'fe53432-8ef7-42349-ab67-cb83d1d7772fe',
// }

Props TodoProps {
  optional UUIDv4 id;
  TitleVO title;
  bool completed;
}

Root Entity TodoEntity {
  constructor(props: TodoProps): (OK(TodoEntity), Errors()) {}

  complete(): (OK(void), Errors()) {
    this.completed = true;
  }

  uncomplete(): (OK(void), Errors()) {
    this.completed = false;
  }

  updateTitle(title: TitleVO):  (OK(void), Errors()) {
    this.title = title;
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
  console.log('result:', JSON.stringify(result));
}
