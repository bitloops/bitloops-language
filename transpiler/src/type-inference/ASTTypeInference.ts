// /**
//  *  Bitloops Language CLI
//  *  Copyright (C) 2022 Bitloops S.A.
//  *
//  *  This program is free software: you can redistribute it and/or modify
//  *  it under the terms of the GNU General Public License as published by
//  *  the Free Software Foundation, either version 3 of the License, or
//  *  (at your option) any later version.
//  *
//  *  This program is distributed in the hope that it will be useful,
//  *  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  *  GNU General Public License for more details.
//  *
//  *  You should have received a copy of the GNU General Public License
//  *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
//  *
//  *  For further information you can contact legal(at)bitloops.com.
//  */

// import { IntermediateASTTree } from '../ast/core/intermediate-ast/IntermediateASTTree.js';
// import { ExpressionNode } from '../ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
// import { IntermediateASTNode } from '../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
// import { SymbolTable } from './SymbolTable.js';

// type Type =
//   | number
//   | boolean
//   | string
//   | { [key: string]: Type }
//   | ((...args: Type[]) => Type)
//   | null;

// type Constraint = {
//   left: Type;
//   right: Type;
// };

// // Type inference algorithm based on Algorithm W
// export class ASTTypeInference {
//   private symbolTable: SymbolTable;
//   private intermediateASTTree: IntermediateASTTree;

//   constructor(intermediateASTTree: IntermediateASTTree) {
//     this.intermediateASTTree = intermediateASTTree;
//     this.symbolTable = new SymbolTable();
//   }

//   inferType(): void {
//     this.intermediateASTTree.traverse(this.intermediateASTTree.getRootNode(), (node) => {
//       // TODO if node is applicable
//       const { expression, variableName } = this.getExpression(node);
//       const [type, constraints] = walk(expression, this.symbolTable);
//       const nodeSymbolTable = unify(constraints, variableName);
//       //TODO rename
//       applySubstitution(type, nodeSymbolTable);
//     });
//   }

//   private getExpression(node: IntermediateASTNode): {
//     expression: ExpressionNode;
//     variableName: string;
//   } {
//     let expression: ExpressionNode;
//     let variableName: string;
//     if (node.isConstDeclarationExpression()) {
//       expression = node.getExpression();
//       variableName = node.getVariableName();
//     } else if (node.isVariableDeclarationExpression()) {
//       expression = node.getExpression();
//       variableName = node.getVariableName();
//     } else if (node.isParameter()) {
//       expression = node.getExpression();
//       variableName = node.getVariableName();
//     }
//     return { expression, variableName };
//   }
// }

// //Nodes are const declaration expressions/variable declaration expressions/parameter
// function walk(expressionNode: ExpressionNode, symbolTable: SymbolTable): [Type, Constraint[]] {
//   if (expressionNode.type === 'literal') {
//     if (typeof expressionNode.value === 'number') {
//       return ['number', []];
//     } else if (typeof expressionNode.value === 'string') {
//       return ['string', []];
//     } else if (typeof expressionNode.value === 'boolean') {
//       return ['boolean', []];
//     }
//   } else if (expressionNode.type === 'variable') {
//     if (expressionNode.name in symbolTable) {
//       const type = symbolTable[expressionNode.name];
//       return [type, []];
//     } else {
//       const type = freshTypeVariable();
//       symbolTable[expressionNode.name] = type;
//       return [type, []];
//     }
//   } else if (expressionNode.type === 'binary_expression') {
//     const [leftType, leftConstraints] = walk(expressionNode.left, symbolTable);
//     const [rightType, rightConstraints] = walk(expressionNode.right, symbolTable);
//     const operator = expressionNode.operator;

//     const operatorConstraints = {
//       '+': { left: 'number', right: 'number', result: 'number' },
//       '-': { left: 'number', right: 'number', result: 'number' },
//       '*': { left: 'number', right: 'number', result: 'number' },
//       '/': { left: 'number', right: 'number', result: 'number' },
//     }[operator];

//     const constraints = [
//       ...leftConstraints,
//       ...rightConstraints,
//       [leftType, operatorConstraints.left],
//       [rightType, operatorConstraints.right],
//       [operatorConstraints.result, freshTypeVariable()],
//     ];

//     return [operatorConstraints.result, constraints];
//   } else if (expressionNode.type === 'method_call') {
//     //TODO args??
//     // const [rightType, rightConstraints] = walk(expressionNode.getArguments(), symbolTable);
//     // this.repoPort.getRepoById(repoId)
//     // symbolTable[this.repoPort.getRepoById]
//     // symbolTable[this.repoPort]
//     if (expressionNode.name in symbolTable) {
//       const type = symbolTable[expressionNode.name];
//       return [type, []];
//     }
//   } else if (expressionNode.type === 'not_expression') {
//     const [notExpressionType, notConstraints] = walk(expressionNode.getExpression(), symbolTable);

//     const notExpressionTypeConstraints = {
//       boolean: { result: 'boolean' },
//       number: { result: 'boolean' },
//     }[notExpressionType];

//     const constraints = [
//       ...notConstraints,
//       [notExpressionTypeConstraints.result, freshTypeVariable()],
//     ];
//     return ['boolean', constraints];
//   } else if (expressionNode.type === 'member_dot') {
//   }
//   throw new Error('Unknown AST node type: ' + expressionNode.type);
// }

// function unify(constraints: Constraint[], variableName: string): SymbolTable {
//   const symbolTable = new SymbolTable();
//   for (const constraint of constraints) {
//     const { left, right } = constraint;
//     const s = unifyTypes(left, right, symbolTable);
//     composeSubstitution(symbolTable, s);
//   }
//   return symbolTable;
// }

// function unifyTypes(t1: Type, t2: Type, substitution: SymbolTable): { [key: string]: Type } {
//   if (t1 === t2) {
//     return {};
//   } else if (typeof t1 === 'string') {
//     return bindVariable(t1, t2, substitution);
//   } else if (typeof t2 === 'string') {
//     return bindVariable(t2, t1, substitution);
//   } else if (t1 instanceof Array && t2 instanceof Array) {
//     const s1 = unifyTypes(t1[0], t2[0], substitution);
//     const s2 = unifyTypes(applySubstitution(t1[1], s1), applySubstitution(t2[1], s1), s1);
//     return composeSubstitution(s1, s2);
//   } else {
//     throw new Error('Cannot unify types: ' + t1 + ' and ' + t2);
//   }
// }

// function bindVariable(
//   name: string,
//   type: Type,
//   substitution: { [key: string]: Type },
// ): { [key: string]: Type } {
//   if (occursInType(name, type)) {
//     throw new Error('Recursive type constraint detected for variable ' + name);
//   }
//   substitution[name] = type;
//   return substitution;
// }

// function occursInType(typeVariable: string, type: Type): boolean {
//   if (Array.isArray(type)) {
//     return occursInType(typeVariable, type[0]) || occursInType(typeVariable, type[1]);
//   } else {
//     return type === typeVariable;
//   }
// }

// function applySubstitution(type: Type, substitution: SymbolTable): Type {
//   if (Array.isArray(type)) {
//     return [applySubstitution(type[0], substitution), applySubstitution(type[1], substitution)];
//   } else if (type in substitution) {
//     return substitution[type];
//   } else {
//     return type;
//   }
// }

// function freshTypeVariable(): Type {
//   const typeVariable = `T${freshTypeVariableCounter}`;
//   freshTypeVariableCounter++;
//   return typeVariable;
// }

// function composeSubstitution(subst1: SymbolTable, subst2: SymbolTable): SymbolTable {
//   const result: SymbolTable = {};
//   for (const [typeVar, type] of Object.entries(subst2)) {
//     result[typeVar] = applySubstitution(type, subst1);
//   }
//   for (const [typeVar, type] of Object.entries(subst1)) {
//     if (!result.hasOwnProperty(typeVar)) {
//       result[typeVar] = applySubstitution(type, subst2);
//     }
//   }
//   return result;
// }
