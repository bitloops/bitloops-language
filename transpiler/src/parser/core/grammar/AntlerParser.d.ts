export class AntlerParser extends BitloopsParserListener {
  constructor(string: any);
  parser: BitloopsParser;
  _tree: {
    parser: any;
    ruleIndex: number;
    sourceElement: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
    accept(visitor: any): any;
  };
  get test(): any;
  get tree(): {
    parser: any;
    ruleIndex: number;
    sourceElement: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
    accept(visitor: any): any;
  };
  get bitloopsTree():
    | {
        type: any;
        value: any;
        numOfChildren?: undefined;
        children?: undefined;
      }
    | {
        type: any;
        value: any;
        numOfChildren: any;
        children: any;
      };
  _bitloopsTree:
    | {
        type: any;
        value: any;
        numOfChildren?: undefined;
        children?: undefined;
      }
    | {
        type: any;
        value: any;
        numOfChildren: any;
        children: any;
      };
}
import BitloopsParserListener from './BitloopsParserListener.js';
import BitloopsParser from './BitloopsParser.js';
