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
import { TBoundedContexts } from '../../types.js';

// TODO This is a temporary mock solution.
export type BitloopsLanguageASTContext = any;
export type TParserCoreInputData = any;

/**
 * Parser
 * bl code to AST
 */

export interface IBitloopsParser {
  parse: (inputData: TParserCoreInputData) => BitloopsLanguageASTContext | BitloopsParserError;
}

export class BitloopsParserError extends Error {}
export class BitloopsParser implements IBitloopsParser {
  parse(_inputData: TParserCoreInputData): BitloopsLanguageASTContext | BitloopsParserError {
    return 'TODO' as any;
  }
}

/**
 * AST To Intermediate Model
 */

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTParserError;
}

export class BitloopsIntermediateASTParserError extends Error {}

export class BitloopsIntermediateASTParser implements IBitloopsIntermediateASTParser {
  parse(_ast: BitloopsLanguageASTContext): TBoundedContexts | BitloopsIntermediateASTParserError {
    throw new Error('Not implemented');
  }
}
