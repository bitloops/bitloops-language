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

import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { TRepoSupportedTypes } from '../../../../../types.js';
import { DatabaseTypeNodeBuilder } from '../../../intermediate-ast/builders/setup/repo/DatabaseTypeNodeBuilder.js';
import { DatabaseTypeNode } from '../../../intermediate-ast/nodes/setup/repo/DatabaseTypeNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

const databaseTypesMapping: Record<string, TRepoSupportedTypes> = {
  Mongo: 'DB.Mongo',
};

export const repoConnectionTypeVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoConnectionTypeContext,
): DatabaseTypeNode => {
  const rawValue = (ctx as any).getText();
  const dbTypeValue = databaseTypesMapping[rawValue];
  return new DatabaseTypeNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withValue(dbTypeValue)
    .build();
};
