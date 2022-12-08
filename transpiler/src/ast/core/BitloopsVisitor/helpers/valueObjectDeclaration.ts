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
import { produceMetadata } from '../metadata.js';
import { DomainCreateNode } from '../../intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { ConstDeclarationListNodeBuilder } from '../../intermediate-ast/builders/ConstDeclarationListBuilder.js';
import { ConstDeclarationListNode } from '../../intermediate-ast/nodes/ConstDeclarationListNode.js';
import { PrivateMethodDeclarationListNodeBuilder } from '../../intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { PrivateMethodDeclarationListNode } from '../../intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { ValueObjectIdentifierNodeBuilder } from '../../intermediate-ast/builders/valueObject/ValueObjectIdentifierNodeBuilder.js';
import { ValueObjectDeclarationNodeBuilder } from '../../intermediate-ast/builders/valueObject/ValueObjectDeclarationNodeBuilder.js';

export const valueObjectDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ValueObjectDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const valueObjectIdentifier = ctx.valueObjectIdentifier().getText();
  const valueObjectIdentifierNode = new ValueObjectIdentifierNodeBuilder(metadata)
    .withName(valueObjectIdentifier)
    .build();

  const domainConstructorDeclarationNode: DomainCreateNode = thisVisitor.visit(
    ctx.domainConstructorDeclaration(),
  );
  const constantVarNodes: ConstDeclarationListNode = ctx.domainConstDeclarationList()
    ? thisVisitor.visit(ctx.domainConstDeclarationList())
    : new ConstDeclarationListNodeBuilder().withConstants([]).build();

  const privateMethodNodes: PrivateMethodDeclarationListNode = ctx.privateMethodDeclarationList()
    ? thisVisitor.visit(ctx.privateMethodDeclarationList())
    : new PrivateMethodDeclarationListNodeBuilder().withMethods([]).build();

  new ValueObjectDeclarationNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(valueObjectIdentifierNode)
    .withConstants(constantVarNodes)
    .withCreate(domainConstructorDeclarationNode)
    .withPrivateMethods(privateMethodNodes)
    .build();
};
