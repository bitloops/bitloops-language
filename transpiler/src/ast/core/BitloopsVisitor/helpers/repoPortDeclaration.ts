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
import { IdentifierBuilder } from '../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { RepoPortBuilder } from '../../intermediate-ast/builders/repo-port/RepoPortNodeBuilder.js';
import { IdentifierListNode } from '../../intermediate-ast/nodes/identifier/IdentifierListNode.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { MethodDefinitionListNode } from '../../intermediate-ast/nodes/method-definitions/MethodDefinitionListNode.js';
import { RepoPortIdentifierNode } from '../../intermediate-ast/nodes/repo-port/RepoPortIdentifierNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const repoPortDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoPortDeclarationContext,
): void => {
  const repoPortName: RepoPortIdentifierNode = thisVisitor.visit(ctx.repoPortIdentifier());

  const extendedRepoPorts: IdentifierListNode = thisVisitor.visit(ctx.repoExtendsList());

  //TODO whart if definitionMethods are missing
  let definitionMethods: MethodDefinitionListNode;
  if (ctx.repoPortMethodDefinitions()) {
    definitionMethods = thisVisitor.visit(ctx.repoPortMethodDefinitions());
  }

  const metadata = produceMetadata(ctx, thisVisitor);
  if (ctx.readModelIdentifier()) {
    const readModelIdentifier = thisVisitor.visit(ctx.readModelIdentifier());
    new RepoPortBuilder(thisVisitor.intermediateASTTree, metadata)
      .withDefinitionMethodsNode(definitionMethods)
      .withExtendsRepoPortNode(extendedRepoPorts)
      .withRepoPortIdentifierNode(repoPortName)
      .withReadModelIdentifier(readModelIdentifier)
      .build();
  } else if (ctx.entityIdentifier()) {
    const aggregateRootIdentifier = thisVisitor.visit(ctx.entityIdentifier());
    new RepoPortBuilder(thisVisitor.intermediateASTTree, metadata)
      .withDefinitionMethodsNode(definitionMethods)
      .withExtendsRepoPortNode(extendedRepoPorts)
      .withRepoPortIdentifierNode(repoPortName)
      .withEntityIdentifier(aggregateRootIdentifier)
      .build();
  }
  // TODO Handle Identifier with < > if we want to extend a repoPort with a generic type
  // TODO Method definitions of user
};

export const repoPortExtendableIdentifierVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RepoPortExtendableIdentifierContext,
): IdentifierNode => {
  let identifier = '';
  if (ctx.RepoPortIdentifier()) {
    identifier = ctx.RepoPortIdentifier().getText();
  } else if (ctx.UpperCaseIdentifier(0) && !ctx.UpperCaseIdentifier(1)) {
    identifier = ctx.UpperCaseIdentifier(0).getText();
  } else if (ctx.UpperCaseIdentifier(0) && ctx.UpperCaseIdentifier(1)) {
    identifier = `${ctx.UpperCaseIdentifier(0).getText()}<${ctx.UpperCaseIdentifier(1).getText()}>`;
  }

  return new IdentifierBuilder().withName(identifier).build();
};
