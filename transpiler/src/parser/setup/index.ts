/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import antlr4 from 'antlr4';
import BitloopsSetupLexer from './grammar/BitloopsSetupLexer.js';
import Parser from './grammar/BitloopsSetupParser.js';

export class BitloopsLanguageSetupAST extends Parser.ProgramContext {}
export class BitloopsSetupParserError extends Error {}

export interface IBitloopsSetupParser {
  parse: (blCode: string) => BitloopsLanguageSetupAST | BitloopsSetupParserError;
}

export class BitloopsSetupParser implements IBitloopsSetupParser {
  parse(blCode: string): BitloopsLanguageSetupAST | BitloopsSetupParserError {
    const chars = new antlr4.InputStream(blCode);
    const lexer: any = new BitloopsSetupLexer(chars) as any;
    const tokens = new antlr4.CommonTokenStream(lexer);
    try {
      const parser = new Parser(tokens);
      const tree = parser.program() as BitloopsLanguageSetupAST;
      return tree;
    } catch (error: any) {
      return new BitloopsSetupParserError(JSON.stringify(error));
    }

    // TODO move below to ast folder
    // const bitloopsVisitor = new BitloopsSetupVisitor();
    // const result = bitloopsVisitor.visit(tree);
    // console.log('result:', JSON.stringify(bitloopsVisitor.result, null, 2));
  }
}
