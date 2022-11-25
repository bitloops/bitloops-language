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
import { TRepoPort } from '../../../../types.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const repoPortDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoPortDeclarationContext,
): { RepoPorts: { [x: string]: TRepoPort } } => {
  const repoPortName = ctx.repoPortIdentifier().getText();
  let aggregateRootName: string;
  let readModelName: string;

  const extendedRepoPorts = thisVisitor.visit(ctx.repoExtendsList());
  let definitionMethods = { definitionMethods: {} };
  if (ctx.repoPortMethodDefinitions()) {
    definitionMethods = thisVisitor.visit(ctx.repoPortMethodDefinitions());
  }

  let result;
  if (ctx.ReadModelIdentifier()?.getText()) {
    readModelName = ctx.ReadModelIdentifier().getText();
    result = {
      RepoPorts: {
        [repoPortName]: {
          readModelName,
          extendedRepoPorts,
          ...definitionMethods,
        },
      },
    };
  }

  if (ctx.aggregateRootIdentifier()?.getText()) {
    aggregateRootName = ctx.aggregateRootIdentifier().getText();
    result = {
      RepoPorts: {
        [repoPortName]: {
          aggregateRootName,
          extendedRepoPorts,
          ...definitionMethods,
        },
      },
    };
  }

  // TODO Handle Identifier with < > if we want to extend a repoPort with a generic type
  // TODO Method definitions of user

  return result;
};

export const repoPortExtendableIdentifierVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoPortExtendableIdentifierContext,
): any => {
  if (ctx.RepoPortIdentifier()) {
    return ctx.RepoPortIdentifier().getText();
  }
  if (ctx.UpperCaseIdentifier(0) && !ctx.UpperCaseIdentifier(1)) {
    return ctx.UpperCaseIdentifier(0).getText();
  }
  if (ctx.UpperCaseIdentifier(0) && ctx.UpperCaseIdentifier(1)) {
    return `${ctx.UpperCaseIdentifier(0).getText()}<${ctx.UpperCaseIdentifier(1).getText()}>`;
  }
};
