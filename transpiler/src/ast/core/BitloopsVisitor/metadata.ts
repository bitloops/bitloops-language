import { TNodeMetadata } from '../intermediate-ast/nodes/IntermediateASTNode.js';
import BitloopsVisitor from './BitloopsVisitor.js';

export const produceMetadata = (ctx: any, visitor: BitloopsVisitor): TNodeMetadata => {
  const { start, stop } = ctx as any;
  let stopColumn: number;
  // For lexer tokens start.column and stop.column are the same at ctx,
  // but stop.stop and start.start are different (these are characters' indexes)
  // if (start.column == stop.column) we use the difference of the indexes to find the stop column
  // (lexer token is only a word, so it will be in the same line)

  // TODO: this doesn't work for parser rules that contain multiple lexer tokens (eg domainConstructorParam),
  // it will be fixed at parser
  if (start.line === stop.line && start.column === stop.column)
    stopColumn = stop.column + stop.stop - start.start + 1;
  else stopColumn = stop.column;
  const metadata = {
    start: {
      line: start.line,
      column: start.column + 1, // +1 because antlr4 starts counting columns from 0
    },
    end: {
      line: stop.line,
      column: stopColumn + 1, // +1 because antlr4 starts counting columns from 0
    },
    fileId: visitor.currentFile,
  };
  return metadata;
};

export const produceMetadataFromTo = (from: TNodeMetadata, to: TNodeMetadata): TNodeMetadata => {
  const metadata = {
    start: from?.start,
    end: to?.end,
    fileId: from?.fileId,
  };
  return metadata;
};
