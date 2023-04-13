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
import { InferredTypes } from '../../../../src/semantic-analysis/type-inference/ASTTypeInference.js';
import {
  ClassTypeParameterSymbolEntry,
  ParameterSymbolEntry,
} from '../../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../../src/semantic-analysis/type-inference/SymbolTable.js';
import { FileUtil } from '../../../../src/utils/file.js';
import { SymbolTableBuilder } from '../../builder/SymbolTableBuilder.js';
type SymbolTableTestCase = {
  description: string;
  inputCore: string;
  inputSetup: string;
  expectedSymbolTable: PrimitiveSymbolTable;
};
export const SYMBOL_TABLE_TEST_CASEES: SymbolTableTestCase[] = [
  {
    description: 'Should create symbol table for command handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/command-handler-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedSymbolTable: new SymbolTableBuilder()
      .insertChildScope(
        'WithdrawMoneyCommandHandler',
        new SymbolTableBuilder()
          .insert('accountRepo', new ClassTypeParameterSymbolEntry(InferredTypes.Unknown))
          .insertChildScope(
            'execute',
            new SymbolTableBuilder()
              .insert('command', new ParameterSymbolEntry(InferredTypes.Unknown))
              .insertVariableSymbolEntry('accountId', InferredTypes.Unknown, true)
              .insertVariableSymbolEntry('accountEntity', InferredTypes.Unknown, true)
              .insertChildScope(
                'if0',
                new SymbolTableBuilder().insertVariableSymbolEntry(
                  'result',
                  InferredTypes.Unknown,
                  true,
                ),
              )
              .insertVariableSymbolEntry('result', InferredTypes.Unknown, true),
          ),
      )
      .build(),
  },
];

type SymbolTableMissingIdentifiersTestCase = {
  description: string;
  inputCore: string;
  inputSetup: string;
  errorMessages: string[];
};

export const SYMBOL_TABLE_MISSING_IDENTIFIERS_TEST_CASES: SymbolTableMissingIdentifiersTestCase[] =
  [
    {
      description: 'Should return that identifier was in const declaration is not defined',
      inputCore: FileUtil.readFileString(
        'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-const-identifier.bl',
      ),
      inputSetup: FileUtil.readFileString(
        'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
      ),
      errorMessages: ['The identifier person is not defined.'],
    },
  ];
