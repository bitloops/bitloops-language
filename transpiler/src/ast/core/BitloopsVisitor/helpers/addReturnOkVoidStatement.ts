// const returnOkVoidStatement = {
//   returnOK: { expression: { evaluation: { regularEvaluation: { type: 'void', value: '' } } } },
// };

// // TODO move to model to model
// export const addReturnOkVoidStatement = (
//   statements: TStatements,
//   returnType: TOkErrorReturnType,
// ) => {
//   const returnOKType = returnType.returnType.ok.type;
//   if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(returnOKType)) {
//     if (returnOKType[primitivesTypeKey] === bitloopsPrimitives.void) {
//       const lastStatement = statements[statements.length - 1];
//       if (lastStatement) {
//         const lastStatementKey = Object.keys(lastStatement)[0];
//         if (lastStatementKey !== returnOKKey) {
//           statements.push(returnOkVoidStatement);
//         }
//       } else {
//         statements.push(returnOkVoidStatement);
//       }
//     }
//   }
// };
