import { getBitloopsModel, TSourceElementContext } from '../BitloopsParser.js';

export const statementList = (statements: any[], contextSourceElement?: TSourceElementContext) => {
  // console.log('statementList children', statements);
  const statementsModel = [];
  for (const statement of statements) {
    if (statement.children[0].type !== 'emptyStatement_') {
      statementsModel.push(getBitloopsModel(statement, contextSourceElement));
    }
  }
  return { statements: statementsModel };
};
