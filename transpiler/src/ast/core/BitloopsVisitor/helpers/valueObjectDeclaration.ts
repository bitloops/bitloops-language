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

import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import {
  TValueObjectValues,
  TConstDeclarationValue,
  TValueObjectMethods,
} from '../../../../types.js';

export const valueObjectDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ValueObjectDeclarationContext,
): { ValueObjects: { [identifier: string]: TValueObjectValues } } => {
  const valueObjectIdentifier = ctx.valueObjectIdentifier().getText();
  const domainConstructorDeclaration = thisVisitor.visit(ctx.domainConstructorDeclaration());
  console.log({ valueObjectIdentifier, domainConstructorDeclaration });
  const constantVars: TConstDeclarationValue[] = thisVisitor.visit(
    ctx.domainConstDeclarationList(),
  );
  const methods: TValueObjectMethods = thisVisitor.visit(ctx.privateMethodDeclarationList());
  const result = {
    ValueObjects: {
      [valueObjectIdentifier]: {
        constantVars,
        create: domainConstructorDeclaration,
        methods,
      },
    },
  };
  console.log(JSON.stringify(result, null, 2));
  return result;
};
