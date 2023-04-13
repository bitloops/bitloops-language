// import { ValidationError } from '../../types.js';
// import { DomainCreateParameterTypeNode } from '../nodes/Domain/DomainCreateParameterTypeNode.js';
// import { identifierValidationError } from './validationErrors.js';

// export const domainCreateParameterTypeError = (
//   node: DomainCreateParameterTypeNode,
//   thisSymbolTable: Set<string>,
// ): ValidationError[] => {
//   const errors = [];
//   if (!thisSymbolTable.has(node.getType()))
//     errors.push(new identifierValidationError(node.getType(), node));
//   return errors;
// };
