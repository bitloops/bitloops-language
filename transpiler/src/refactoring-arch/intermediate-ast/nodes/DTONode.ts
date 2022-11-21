import { BitloopsTypesMapping, ClassTypes } from '../../../helpers/mappings.js';
// import { TDTO, TVariables } from '../../../types.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'DTO';

export class DTONode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TDTO, { lines }, NAME);
    this.setClassType(ClassTypes.DTOs);
  }
}
