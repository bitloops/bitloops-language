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
import { EventHandleNode } from '../../../intermediate-ast/nodes/EventHandleNode.js';
import { IntegrationEventHandlerIdentifierNode } from '../../../intermediate-ast/nodes/integration-event/IntegrationEventHandlerIdentifierNode.js';
import { ParameterListNode } from '../../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { IntegrationEventHandlerDeclarationNodeBuilder } from '../../../intermediate-ast/builders/integration-event/IntegrationEventHandlerDeclarationNodeBuilder.js';
import { IntegrationEventHandlerIdentifierNodeBuilder } from '../../../intermediate-ast/builders/integration-event/IntegrationEventHandlerIdentifierNodeBuilder.js';
import { StatementListNode } from '../../../intermediate-ast/nodes/statements/StatementList.js';
import { EventHandlerHandleMethodNodeBuilder } from '../../../intermediate-ast/builders/HandleMethodNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ParameterIdentifierNode } from '../../../intermediate-ast/nodes/ParameterList/ParameterIdentifierNode.js';
import { ParameterNode } from '../../../intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { EvaluationFieldNode } from '../../../intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';

export const integrationEventHandlerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationEventHandlerDeclarationContext,
): void => {
  const integrationEventName: IntegrationEventHandlerIdentifierNode = thisVisitor.visit(
    ctx.integrationEventHandlerIdentifier(),
  );

  const parameterListNode: ParameterListNode = thisVisitor.visit(ctx.parameterList());
  const handleNode: EventHandleNode = thisVisitor.visit(
    ctx.integrationEventHandlerHandleDeclaration(),
  );

  const evaluationFieldNode: EvaluationFieldNode = thisVisitor.visit(ctx.evaluationField());

  new IntegrationEventHandlerDeclarationNodeBuilder(
    thisVisitor.intermediateASTTree,
    produceMetadata(ctx, thisVisitor),
  )
    .withIdentifier(integrationEventName)
    .withParameterList(parameterListNode)
    .withHandleMethod(handleNode)
    .withEventVersion(evaluationFieldNode)
    .build();
};

export const integrationEventHandlerIdentifierVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationEventHandlerIdentifierContext,
): IntegrationEventHandlerIdentifierNode => {
  const integrationEventName = ctx.IntegrationEventHandlerIdentifier().getText();
  return new IntegrationEventHandlerIdentifierNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withName(integrationEventName)
    .build();
};

export const integrationEventHandlerHandleMethodVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationEventHandlerHandleDeclarationContext,
): EventHandleNode => {
  const parameter = thisVisitor.visit(ctx.integrationEventHandlerHandleParameter());
  const statementList: StatementListNode = thisVisitor.visit(ctx.functionBody());

  return new EventHandlerHandleMethodNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withParameter(parameter)
    .withStatementList(statementList)
    .build();
};

export const integrationEventHandlerHandleMethodParameterVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.IntegrationEventHandlerHandleParameterContext,
): ParameterNode => {
  const type: BitloopsPrimaryTypeNode = thisVisitor.visit(ctx.eventHandlerHandleIdentifier());

  const parameterIdentifier: ParameterIdentifierNode = thisVisitor.visit(ctx.parameterIdentifier());

  const metadata = produceMetadata(ctx, thisVisitor);
  return new ParameterNodeBuilder(metadata)
    .withIdentifier(parameterIdentifier)
    .withType(type)
    .build();
};
