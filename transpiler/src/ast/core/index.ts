import { BitloopsLanguageASTContext } from '../../index.js';
import { TBoundedContexts } from '../../types.js';
import { parseBitloops } from './BitloopsParser.js';
import BitloopsVisitor from './BitloopsVisitor/BitloopsVisitor.js';

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTParserError;
}

export class BitloopsIntermediateASTParserError extends Error {}

const migratedTypes = [
  'jestTestDeclaration',
  'controllerDeclaration',
  'dtoDeclaration',
  'propsDeclaration',
  'valueObjectDeclaration',
  'entityDeclaration',
  // 'domainRuleDeclaration',
];

export class BitloopsIntermediateASTParser implements IBitloopsIntermediateASTParser {
  parse(ast: BitloopsLanguageASTContext): TBoundedContexts | BitloopsIntermediateASTParserError {
    let boundedContextsData: TBoundedContexts = {};
    let partialBoundedContextsData: TBoundedContexts = {};
    for (const [boundedContextName, boundedContext] of Object.entries(ast)) {
      for (const classes of Object.values(boundedContext)) {
        for (const classData of Object.values(classes)) {
          if (migratedTypes.includes(classData.deprecatedAST.type)) {
            const bitloopsVisitor = new BitloopsVisitor();
            const visitorModel = bitloopsVisitor.visitChildren(classData.initialAST)[0][0];
            partialBoundedContextsData = {
              [boundedContextName]: { [classData.module]: visitorModel },
            };
          } else {
            partialBoundedContextsData = parseBitloops(
              boundedContextName,
              classData.module,
              classData.deprecatedAST,
            );
          }
          boundedContextsData = mergeBoundedContextData(
            boundedContextsData,
            partialBoundedContextsData,
          );
        }
      }
    }
    return boundedContextsData;
  }
}

const mergeBoundedContextData = (
  mainBoundedContextData: TBoundedContexts,
  newBoundedContextData: TBoundedContexts,
): TBoundedContexts => {
  const result = { ...mainBoundedContextData };
  for (const [boundedContextName, boundedContextData] of Object.entries(newBoundedContextData)) {
    for (const [classType, classTypeData] of Object.entries(boundedContextData)) {
      for (const [className, classData] of Object.entries(classTypeData)) {
        if (result[boundedContextName] && result[boundedContextName][classType]) {
          result[boundedContextName][classType][className] = classData;
        } else if (result[boundedContextName]) {
          result[boundedContextName][classType] = { [className]: classData };
        } else {
          result[boundedContextName] = { [classType]: { [className]: classData } };
        }
      }
    }
  }
  return result;
};
