// type TypeVariable = {
//     kind: 'typeVariable';
//     id: number;
//     instance?: Type;
//   };

//   type Type = {
//     kind: 'primitive' | 'function';
//     name?: string;
//     parameters?: Type[];
//     returnType?: Type;
//     typeVariable?: TypeVariable;
//   };

//   function freshTypeVariable(): TypeVariable {
//     static counter = 0;
//     return { kind: 'typeVariable', id: counter++ };
//   }

//   function inferType(expr: Expression, env: Map<string, Type>): Type {
//     switch (expr.kind) {
//       case 'literal':
//         return { kind: 'primitive', name: typeof expr.value };
//       case 'variable':
//         return env.get(expr.name).typeVariable || freshTypeVariable();
//       case 'function':
//         const paramTypes = expr.parameters.map(p => freshTypeVariable());
//         const paramEnv = new Map(env);
//         for (let i = 0; i < expr.parameters.length; i++) {
//           paramEnv.set(expr.parameters[i], { kind: 'primitive', typeVariable: paramTypes[i] });
//         }
//         const returnType = inferType(expr.body, paramEnv);
//         return { kind: 'function', parameters: paramTypes, returnType };
//       case 'application':
//         const funType = inferType(expr.function, env);
//         const argType = inferType(expr.argument, env);
//         const resultType = freshTypeVariable();
//         unify(funType, { kind: 'function', parameters: [argType], returnType: resultType });
//         return resultType;
//     }
//   }

//   function unify(type1: Type, type2: Type) {
//     if (type1.kind === 'typeVariable' && type1.instance) {
//       unify(type1.instance, type2);
//     } else if (type2.kind === 'typeVariable' && type2.instance) {
//       unify(type1, type2.instance);
//     } else if (type1.kind === 'typeVariable' && !occursInType(type1, type2)) {
//       type1.instance = type2;
//     } else if (type2.kind === 'typeVariable' && !occursInType(type2, type1)) {
//       type2.instance = type1;
//     } else if (type1.kind === 'function' && type2.kind === 'function') {
//       unify(type1.parameters, type2.parameters);
//       unify(type1.returnType, type2.returnType);
//     } else if (type1.kind === type2.kind && type1.name === type2.name) {
//       // do nothing, types match
//     } else {
//       throw new Error(`Type mismatch: ${type1} vs ${type2}`);
//     }
//   }

//   function occursInType(typeVar: TypeVariable, type: Type): boolean {
//     if (type.kind === 'primitive') {
//       return false;
//     } else if (type.kind === 'function') {
//       return type.parameters.some(param => occursInType(typeVar, param)) ||
//         occursInType(typeVar, type.returnType);
//     } else {
//       return type.typeVariable === typeVar;
//     }
//   }
