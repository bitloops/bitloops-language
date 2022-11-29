import { TNodeMetadata } from '../intermediate-ast/nodes/IntermediateASTNode.js';
import BitloopsVisitor from './BitloopsVisitor.js';

export const produceMetadata = (ctx: any, visitor: BitloopsVisitor): TNodeMetadata => {
  const { start, stop } = ctx as any;
  const metadata = {
    start: {
      line: start.line,
      column: start.column,
    },
    end: {
      line: stop.line,
      column: stop.column,
    },
    file: visitor.currentFile,
  };
  return metadata;
};
