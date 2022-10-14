// import { TStatements } from '../../../types.js';
import { getBitloopsModel } from '../BitloopsParser.js';

export const restControllerExecuteDeclaration = (children: any) => {
  // console.log('restControllerExecuteDeclaration children', children);

  // const statements: TStatements = [];

  // // let res = {
  // //   statements,
  // // };

  let res;
  for (const statement of children) {
    switch (statement.type) {
      case 'restControllerParameters':
        res = { ...res, ...getBitloopsModel(statement) };
        break;
      case 'functionBody':
        // console.log('func body', getBitloopsModel(statement));
        res = { ...res, ...getBitloopsModel(statement) };
        break;
    }
  }

  return res;
};
