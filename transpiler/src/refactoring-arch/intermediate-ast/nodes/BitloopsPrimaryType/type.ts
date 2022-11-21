import { ArrayPrimaryTypeNode } from './ArrayPrimaryTypeNode.js';
import { PrimitiveTypeNode } from './PrimitiveTypeNode.js';
import { BitloopsIdentifierTypeNode } from './BitloopsIdentifierTypeNode.js';
import { BuildInClassTypeNode } from './BuildInClassTypeNode.js';

export type TBitloopsPrimaryTypeNode =
  | ArrayPrimaryTypeNode
  | PrimitiveTypeNode
  | BitloopsIdentifierTypeNode
  | BuildInClassTypeNode;
