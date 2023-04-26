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
import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IfErrorExpressionNode } from '../../nodes/Expression/IfErrorExpressionNode.js';
import { AnonymousFunctionNode } from '../../nodes/AnonymousFunctionNode.js';

export class IfErrorExpressionNodeBuilder implements IBuilder<IfErrorExpressionNode> {
  private ifErrorExpressionNode: IfErrorExpressionNode;
  private leftExpression: ExpressionNode;
  private anonymousFunctionNode?: AnonymousFunctionNode;

  constructor(metadata?: TNodeMetadata) {
    this.ifErrorExpressionNode = new IfErrorExpressionNode(metadata);
  }

  public withExpression(expr: ExpressionNode): IfErrorExpressionNodeBuilder {
    this.leftExpression = expr;
    return this;
  }

  public withAnonymousFunction(
    anonymousFunction: AnonymousFunctionNode,
  ): IfErrorExpressionNodeBuilder {
    this.anonymousFunctionNode = anonymousFunction;
    return this;
  }

  public build(): IfErrorExpressionNode {
    this.ifErrorExpressionNode.addChild(this.leftExpression);

    if (this.anonymousFunctionNode) {
      this.ifErrorExpressionNode.addChild(this.anonymousFunctionNode);
    }
    this.ifErrorExpressionNode.buildObjectValue();

    return this.ifErrorExpressionNode;
  }
}
