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
import { TBuiltInFunction } from '../../../../../src/types.js';
import { BuiltInFunctionStatementDirector } from '../../builders/statement/builtInFunctionDirector.js';
// import { FieldBuilderDirector } from '../builders/fieldDirector.js';
// import { IdentifierBuilder } from '../builders/identifier.js';

type ApplyRulesTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  applyRules: TBuiltInFunction;
};

export const validApplyRulesStatementTestCases: ApplyRulesTestCase[] = [
  {
    description: 'apply 1 rule with string arg',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBuiltInFunction { applyRules(IsValidTitleRule("title")) }',
    applyRules: new BuiltInFunctionStatementDirector().buildApplyRulesWithStringArguments({
      name: 'IsValidTitleRule',
      args: ['title'],
    }),
  },
  {
    description: 'apply 1 rule with props.title arg',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBuiltInFunction { applyRules(IsValidTitleRule(props.title)) }',
    applyRules: new BuiltInFunctionStatementDirector().buildApplyRulesWithMemberDotArgs({
      name: 'IsValidTitleRule',
      args: [['props', 'title']],
    }),
  },
  {
    description: 'apply 1 rule with this.props.title arg',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBuiltInFunction { applyRules(IsValidTitleRule(this.props.title)) }',
    applyRules: new BuiltInFunctionStatementDirector().buildApplyRulesWithThisMemberDotArgs({
      name: 'IsValidTitleRule',
      args: [['props', 'title']],
    }),
  },
  {
    description: 'apply 2 rules',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestBuiltInFunction { applyRules ( IsValidTitleRule ( props.title ), IsLongNameRule ( props.name )  ) }',
    applyRules: new BuiltInFunctionStatementDirector().buildApplyRulesWithMemberDotArgs(
      {
        name: 'IsValidTitleRule',
        args: [['props', 'title']],
      },
      {
        name: 'IsLongNameRule',
        args: [['props', 'name']],
      },
    ),
  },
];
