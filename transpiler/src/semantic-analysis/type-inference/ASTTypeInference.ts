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

// import { Intes
// export type TInferenceType =
//   | number
//   | boolean
//   | string
//   | TExpressionValues
//   | TDomainEvent
//   | TIntegrationEvent
//   | TCommandHandler
//   | TQueryHandler
//   | TCommand
//   | TQuery
//   | TDomainEventHandler
//   | TIntegrationEventHandler
//   | TRepoPort
//   | TPackagePort
//   | TServicePort
//   | null
//   | { [key: string]: TInferenceType }
//   | ((...args: TInferenceType[]) => TInferenceType);

export enum InferredTypes {
  Unknown,
  Number,
}

// type Constraint = {
//   left: TInferenceType;
//   right: TInferenceType;
//   result?: TInferenceType;
// };

// // TInferenceType inference algorithm based on Algorithm W
// export class ASTTypeInference {
//   private symbolTable: SymbolTable;
//   private intermediateASTTree: IntermediateASTTree;

//   constructor(intermediateASTTree: IntermediateASTTree) {
//     this.intermediateASTTree = intermediateASTTree;
//     this.symbolTable = new SymbolTable();
//   }

//   // traverse(): void {
//   //   this.intermediateASTTree.traverse(this.intermediateASTTree.getRootNode(), (node) => {
//   //     // TODO if node is applicable
//   //     const { expression, variableName, type } = this.getExpression(node);

//   //     if (type) {
//   //       //TODO add to symbol table the type
//   //       this.symbolTable.insert(variableName, type.getValue().type);
//   //     } else {
//   //       //Todo think about the correct expression
//   //       //we have examples without expresison person: Person
//   //       //and also without variableName??
//   //       if (expression || variableName) {
//   //         // const [type, constraints] = inferType(expression, this.symbolTable);
//   //         // this.symbolTable = unify(constraints, variableName);
//   //         const type = inferType(expression, this.symbolTable);

//   //         //TODO rename
//   //         applySubstitution(type, this.symbolTable);
//   //       }
//   //     }
//   //   });
//   // }

//   // private getExpression(node: IntermediateASTNode): {
//   //   expression: ExpressionNode;
//   //   variableName: string;
//   //   type?: BitloopsPrimaryTypeNode;
//   // } {
//   //   let expression: ExpressionNode;
//   //   let variableName: string;
//   //   let type: BitloopsPrimaryTypeNode;
//   //   if (node.isConstDeclarationExpressionNode()) {
//   //     expression = node.getExpressionValues();
//   //     variableName = node.getIdentifier().getValue().identifier;
//   //   } else if (node.isVariabletDeclarationExpressionNode()) {
//   //     expression = node.getExpressionValues();
//   //     variableName = node.getIdentifier().getValue().identifier;
//   //   } else if (node.isParameterNode()) {
//   //     type = node.getType().getValue().type;
//   //     variableName = node.getIdentifier();
//   //   } else {
//   //     return { expression: null, variableName: null };
//   //   }
//   //   return { expression, variableName, type };
//   // }
// }

// //Nodes are const declaration expressions/variable declaration expressions/parameter
// function inferType(expressionNode: ExpressionNode, symbolTable: SymbolTable): TInferenceType {
//   // let freshTypeVariableCounter = 0;

//   if (typeof expressionNode === 'number') {
//     return 'number';
//   } else if (expressionNode.isStringLiteralExpression()) {
//     return 'string';
//   } else if (typeof expressionNode === 'boolean') {
//     return 'boolean';
//   } else if (expressionNode.isThisExpression()) {
//     //cases:  in an if statement inside a domain event handler -> TodoAddedDomainEventHandler
//     // in a method inside a commandHandler -> AddTodoCommandHandler
//     const classNodeName = symbolTable.getClassNodeName();
//     //we should probably add this to the class symbol table???
//     symbolTable.insert('this', classNodeName);
//     return classNodeName;
//   } else if (expressionNode.isIdentifierExpression()) {
//     // if (expressionNode.name in symbolTable) {
//     //   const type = symbolTable[expressionNode.name];
//     //   return [type, []];
//     // } else {
//     //   const type = freshTypeVariable(freshTypeVariableCounter++);
//     //   symbolTable[expressionNode.name] = type;
//     //   return [type, []];
//     // }
//   } else if (expressionNode.isLogicalExpression()) {
//     // const leftType = inferType(expressionNode.left, symbolTable);
//     // const rightType = inferType(expressionNode.right, symbolTable);
//     // const operator = expressionNode.operator;
//     // const contrsaintsByOperator = {
//     //   '+': { left: 'number', right: 'number', result: 'number' },
//     //   '-': { left: 'number', right: 'number', result: 'number' },
//     //   '*': { left: 'number', right: 'number', result: 'number' },
//     //   '/': { left: 'number', right: 'number', result: 'number' },
//     // };
//     // const operatorConstraints: Constraint = contrsaintsByOperator[operator];
//     // const constraints = [
//     //   ...leftConstraints,
//     //   ...rightConstraints,
//     //   [leftType, operatorConstraints.left],
//     //   [rightType, operatorConstraints.right],
//     //   [operatorConstraints.result, freshTypeVariable(freshTypeVariableCounter++)],
//     // ];
//     return 'number';
//   } else if (expressionNode.isMemberDotExpression()) {
//     //this.repository.getById('567')
//     const leftType = inferType(expressionNode.getLeftMostExpression(), symbolTable);
//     //for expression of expressionNode.getExpressionValues()
//     // add each expression to the symbol table e.g this, this.repository, this.repository.getById
//     // find their type by looking up in the symbol table
//     const memberDotExpression = expressionNode.getLeftMostMemberDotExpression();
//     while (memberDotExpression.isMemberDotExpression()) {
//       // const rightType = inferType(expressionNode.getLeftMostMemberDotExpression(), symbolTable);
//       // //TODO find return type from interface of method
//       // const returnType = getReturnType(leftType.type, rightType.identifier);
//       // // Infer type of left side of dot (e.g. "repo" in "repo.getById('567')")
//       // // Look up method in left side type
//       // const method = leftType.methods[node.right.name];
//       // if (method) {
//       //   // Infer return type of method
//       //   return method.returnType;
//       // } else {
//       //   throw new Error(`Method ${rightType.name} not found in type ${leftType}`);
//       // }
//     }
//   } else if (node.type === 'MethodCallExpression') {
//     // Infer type of argument
//     const leftType = inferType(node.left, symbolTable);
//     const argType = inferType(node.args, symbolTable);
//     const method = leftType.methods[node.right.name];
//     if (method) {
//       // Infer return type of method
//       return method.returnType;
//     } else {
//       throw new Error(`Method ${node.right.name} not found in type ${leftType}`);
//     }
//   }
//   // else if (expressionNode.type === 'method_call') {
//   //   //TODO args??
//   //  // const [rightType, rightConstraints] = inferType(expressionNode.getArguments(), symbolTable);
//   //  // this.repoPort.getById(repoId)
//   // // symbolTable[this.repoPort.getById]
//   // // symbolTable[this.repoPort]
//   //   if (expressionNode.name in symbolTable) {
//   //     const type = symbolTable[expressionNode.name];
//   //     return [type, []];
//   //   }
//   // } else if (expressionNode.type === 'not_expression') {
//   //   const [notExpressionType, notConstraints] = inferType(expressionNode.getExpression(), symbolTable);

//   //   const notExpressionTypeConstraints = {
//   //     boolean: { result: 'boolean' },
//   //     number: { result: 'boolean' },
//   //   }[notExpressionType];

//   //   const constraints = [
//   //     ...notConstraints,
//   //     [notExpressionTypeConstraints.result, freshTypeVariable(freshTypeVariableCounter)],
//   //   ];
//   //   return ['boolean', constraints];
//   // }
//   // else if (expressionNode.type === 'member_dot') {
//   //   const [memberDotType, memberDotConstraints] = inferType(expressionNode.getExpression(), symbolTable);
//   //   if (memberDotType in symbolTable) {
//   //     const type = symbolTable[memberDotType];
//   //     return [type, []];
//   //   }
//   // }
//   else {
//     console.log('expressionNode', expressionNode);
//   }
//   // throw new Error('Unknown AST node type: ' + expressionNode.type);
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

// function unifyTypes(
//   t1: TInferenceType,
//   t2: TInferenceType,
//   substitution: SymbolTable,
// ): SymbolTable {
//   if (t1 === t2) {
//     return null;
//   } else if (typeof t1 === 'string') {
//     return bindVariable(t1, t2, substitution);
//   } else if (typeof t2 === 'string') {
//     return bindVariable(t2, t1, substitution);
//   } else if (t1 instanceof Array && t2 instanceof Array) {
//     const s1 = unifyTypes(t1[0], t2[0], substitution);
//     const s2 = unifyTypes(applySubstitution(t1[1], s1), applySubstitution(t2[1], s1), s1);
//     return composeSubstitution(s1, s2);
//   } else {
//     // eslint-disable-next-line @typescript-eslint/no-base-to-string
//     throw new Error('Cannot unify types: ' + t1 + ' and ' + t2);
//   }
// }

// function bindVariable(name: string, type: TInferenceType, substitution: SymbolTable): SymbolTable {
//   if (occursInType(name, type)) {
//     throw new Error('Recursive type constraint detected for variable ' + name);
//   }
//   substitution[name] = type;
//   return substitution;
// }

// function occursInType(typeVariable: string, type: TInferenceType): boolean {
//   if (Array.isArray(type)) {
//     return occursInType(typeVariable, type[0]) || occursInType(typeVariable, type[1]);
//   } else {
//     return type === typeVariable;
//   }
// }

// function applySubstitution(type: TInferenceType, substitution: SymbolTable): TInferenceType {
//   // if (Array.isArray(type)) {
//   //   return [applySubstitution(type[0], substitution), applySubstitution(type[1], substitution)];
//   // } else if (type in substitution) {
//   //   return substitution[type];
//   // } else {
//   //   return type;
//   // }
//   return type;
// }

// function freshTypeVariable(freshTypeVariableCounter: number): TInferenceType {
//   const typeVariable = `T${freshTypeVariableCounter}`;
//   freshTypeVariableCounter++;
//   return typeVariable;
// }

// function composeSubstitution(subst1: SymbolTable, subst2: SymbolTable): SymbolTable {
//   const result = new SymbolTable();
//   for (const [typeVar, type] of Object.entries(subst2)) {
//     result.insert(typeVar, applySubstitution(type, subst1));
//   }
//   for (const [typeVar, type] of Object.entries(subst1)) {
//     if (!result.lookup(typeVar)) {
//       result.insert(typeVar, applySubstitution(type, subst2));
//     }
//   }
//   return result;
// }
