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
import { HTTPMethodVerbNodeBuilder } from '../../../intermediate-ast/builders/setup/HTTPMethodVerbNodeBuilder.js';
import { HTTPMethodVerbNode } from '../../../intermediate-ast/nodes/setup/HTTPMethodVerbNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const httpMethodVerbVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.HttpMethodVerbContext,
): HTTPMethodVerbNode => {
  let httpMethodVerb = '';
  if (ctx.GET()) {
    httpMethodVerb = ctx.GET().getText();
  }
  if (ctx.POST()) {
    httpMethodVerb = ctx.POST().getText();
  }
  if (ctx.PATCH()) {
    httpMethodVerb = ctx.PATCH().getText();
  }
  if (ctx.PUT()) {
    httpMethodVerb = ctx.PUT().getText();
  }
  if (ctx.DELETE()) {
    httpMethodVerb = ctx.DELETE().getText();
  }
  if (ctx.OPTIONS()) {
    httpMethodVerb = ctx.OPTIONS().getText();
  }

  const metadata = produceMetadata(ctx, thisVisitor);

  return new HTTPMethodVerbNodeBuilder(metadata).withVerb(httpMethodVerb).build();
};
