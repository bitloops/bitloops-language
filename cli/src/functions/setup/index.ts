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
import { ISetupData } from '../../types.js';
// TODO This is a temporary mock solution.
export type BitloopsLanguageSetupAST = any;

/**
 * Parser
 * bl code to AST
 */
export class BitloopsSetupParserError extends Error {}

export interface IBitloopsSetupParser {
  parse: (blCode: string) => BitloopsLanguageSetupAST | BitloopsSetupParserError;
}

export class BitloopsSetupParser implements IBitloopsSetupParser {
  parse(_blCode: string): BitloopsLanguageSetupAST | BitloopsSetupParserError {
    return 'TODO' as any;
  }
}

/**
 * AST To Intermediate Model
 */
export interface IBitloopsIntermediateSetupASTParser {
  parse: (ast: BitloopsLanguageSetupAST) => ISetupData | BitloopsIntermediateSetupASTParserError;
}

export class BitloopsIntermediateSetupASTParserError extends Error {}

export class BitloopsIntermediateSetupASTParser implements IBitloopsIntermediateSetupASTParser {
  parse(_ast: BitloopsLanguageSetupAST): ISetupData | BitloopsIntermediateSetupASTParserError {
    // TODO
    return 'TODO' as any;
  }
}
