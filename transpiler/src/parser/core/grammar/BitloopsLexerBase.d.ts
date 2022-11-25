export default class JavaScriptLexerBase {
  constructor(input: any);
  scopeStrictModes: any[];
  lastToken: any;
  useStrictDefault: boolean;
  useStrictCurrent: boolean;
  templateDepth: number;
  getStrictDefault(): boolean;
  setUseStrictDefault(value: any): void;
  IsStrictMode(): boolean;
  IsInTemplateString(): boolean;
  getCurrentToken(): any;
  nextToken(): any;
  ProcessOpenBrace(): void;
  ProcessCloseBrace(): void;
  ProcessStringLiteral(): void;
  IncreaseTemplateDepth(): void;
  DecreaseTemplateDepth(): void;
  IsRegexPossible(): boolean;
  IsStartOfFile(): boolean;
}
