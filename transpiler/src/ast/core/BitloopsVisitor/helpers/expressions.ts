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
import { TExpression } from '../../../../types.js';

export const equalityExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EqualityExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  const operator = ctx.op.text;
  return {
    expression: {
      equalityExpression: {
        left: left.expression,
        right: right.expression,
        operator: operator,
      },
    },
  };
};

export const relationalExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RelationalExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  const operator = ctx.op.text;
  return {
    expression: {
      relationalExpression: {
        left: left.expression,
        right: right.expression,
        operator: operator,
      },
    },
  };
};

export const logicalAndExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.LogicalAndExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  return {
    expression: {
      logicalExpression: {
        andExpression: {
          left: left.expression,
          right: right.expression,
        },
      },
    },
  };
};

export const logicalOrExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.LogicalOrExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  return {
    expression: {
      logicalExpression: {
        orExpression: {
          left: left.expression,
          right: right.expression,
        },
      },
    },
  };
};

export const logicalXorExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.LogicalXorExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  return {
    expression: {
      logicalExpression: {
        xorExpression: {
          left: left.expression,
          right: right.expression,
        },
      },
    },
  };
};

export const logicalNotExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.NotExpressionContext,
): TExpression => {
  const expression = thisVisitor.visit(ctx.expression());
  return {
    expression: {
      logicalExpression: { notExpression: expression.expression },
    },
  };
};

export const multiplicativeExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.MultiplicativeExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  const operator = ctx.op.text;
  return {
    expression: {
      multiplicativeExpression: {
        left: left.expression,
        right: right.expression,
        operator: operator,
      },
    },
  };
};

export const additiveExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.AdditiveExpressionContext,
): TExpression => {
  const left = thisVisitor.visit(ctx.expression(0));
  const right = thisVisitor.visit(ctx.expression(1));
  const operator = ctx.op.text;
  return {
    expression: {
      additiveExpression: {
        left: left.expression,
        right: right.expression,
        operator: operator,
      },
    },
  };
};

export const parenthesizedExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ParenthesizedExpressionContext,
): TExpression => {
  const expression = thisVisitor.visit(ctx.expression());
  return {
    expression: {
      parenthesizedExpression: expression.expression,
    },
  };
};
