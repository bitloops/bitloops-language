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

// // Type inference algorithm based on Algorithm W
// type Type = string | [string, Type] | [Type, Type];
// type Constraint = [Type, Type];

// function inferType(expression: string, typeEnvironment: { [key: string]: Type }): Type {
//   const ast = parse(expression);
//   const [type, constraints] = walk(ast, typeEnvironment);
//   const substitution = unify(constraints);
//   return applySubstitution(type, substitution);
// }

// function walk(ast: ASTNode, typeEnvironment: { [key: string]: Type }): [Type, Constraint[]] {
//   if (ast.type === 'literal') {
//     if (typeof ast.value === 'number') {
//       return ['number', []];
//     } else if (typeof ast.value === 'string') {
//       return ['string', []];
//     } else if (typeof ast.value === 'boolean') {
//       return ['boolean', []];
//     }
//   } else if (ast.type === 'variable') {
//     if (ast.name in typeEnvironment) {
//       const type = typeEnvironment[ast.name];
//       return [type, []];
//     } else {
//       const type = freshTypeVariable();
//       typeEnvironment[ast.name] = type;
//       return [type, []];
//     }
//   } else if (ast.type === 'binary_expression') {
//     const [leftType, leftConstraints] = walk(ast.left, typeEnvironment);
//     const [rightType, rightConstraints] = walk(ast.right, typeEnvironment);
//     const operator = ast.operator;

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
//   }
//   throw new Error('Unknown AST node type: ' + ast.type);
// }

// function unify(constraints: Constraint[]): { [key: string]: Type } {
//   const substitution: { [key: string]: Type } = {};
//   for (const [t1, t2] of constraints) {
//     const s = unifyTypes(t1, t2, substitution);
//     composeSubstitution(substitution, s);
//   }
//   return substitution;
// }

// function unifyTypes(
//   t1: Type,
//   t2: Type,
//   substitution: { [key: string]: Type },
// ): { [key: string]: Type } {
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

// function applySubstitution(type: Type, substitution: Substitution): Type {
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

// function composeSubstitution(subst1: Substitution, subst2: Substitution): Substitution {
//   const result: Substitution = {};
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
