/**
 *  Bitloops Language
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
import { TContextData, TDependencyParentTypescript } from '../../../types.js';
import { modelToTargetLanguage } from './modelToTargetLanguage.js';
import { formatString } from './codeFormatting.js';
import { ClassTypeNode } from '../../../ast/core/intermediate-ast/nodes/ClassTypeNode.js';
import { TargetGeneratorError, TTargetCoreContent, TTargetCoreFinalContent } from '../../types.js';
import { IntermediateAST } from '../../../ast/core/types.js';

interface IIntermediateASTToTarget {
  ASTToTarget(params: IntermediateAST): TTargetCoreContent[] | TargetGeneratorError;
  formatCode(targetContent: TTargetCoreFinalContent[], config?: any): TTargetCoreFinalContent[];
  generateImports(params: TTargetCoreContent[]): TTargetCoreFinalContent[];
}

export class IntermediateASTToTarget implements IIntermediateASTToTarget {
  ASTToTarget(params: IntermediateAST): TTargetCoreContent[] | TargetGeneratorError {
    const { core, setup } = params;
    const setupData = setup;
    const result = [];
    for (const [boundedContextName, boundedContext] of Object.entries(core.intermediateAST)) {
      for (const [moduleName, intermediateASTTree] of Object.entries(boundedContext)) {
        const contextData: TContextData = {
          boundedContext: boundedContextName,
          module: moduleName,
        };

        // TODO this may be moved to a previous model not specifically for typescript
        // if (this.moduleHasRepoAdaptersDefined(setupData, { boundedContextName, moduleName })) {
        //   this.injectRepoAdaptersFromSetupToModel(intermediateAST, setupData, {
        //     boundedContextName,
        //     moduleName,
        //   });
        // }
        const classTypeNodes = intermediateASTTree.getRootNode().getChildren();
        classTypeNodes.forEach((intermediateASTNode) => {
          const generatedString = modelToTargetLanguage({
            type: intermediateASTNode.getNodeType(),
            value: intermediateASTNode.getValue(),
            setupData,
            contextData,
            model: intermediateASTTree,
          });

          const classTypeNode = intermediateASTNode as ClassTypeNode;
          result.push({
            boundedContext: boundedContextName,
            module: moduleName,
            classType: classTypeNode.getClassType?.(),
            className: classTypeNode.getClassName?.(),
            fileContent: generatedString,
          });
        });
      }
    }
    return result;
  }

  generateImports(params: TTargetCoreContent[]): TTargetCoreFinalContent[] {
    const formattedCode: TTargetCoreFinalContent[] = [];
    for (const { boundedContext, classType, module, className, fileContent } of params) {
      const { output } = fileContent;
      const parentDependecies = fileContent.dependencies as TDependencyParentTypescript[];

      let finalContent;
      if (classType) {
        const importsResult = this.generateDepndenciesString(parentDependecies, false);
        finalContent = importsResult + output;
      } else {
        finalContent = output;
      }

      formattedCode.push({
        boundedContext,
        module,
        classType,
        className,
        fileContent: finalContent,
      });
    }
    return formattedCode;
  }

  formatCode(targetContent: TTargetCoreFinalContent[], config?: any): TTargetCoreFinalContent[] {
    const formattedCode: TTargetCoreFinalContent[] = [];
    for (const { boundedContext, classType, module, className, fileContent } of targetContent) {
      const formattedContent = formatString(fileContent, config);

      formattedCode.push({
        boundedContext,
        module,
        classType,
        className,
        fileContent: formattedContent,
      });
    }
    return formattedCode;
  }

  private generateDepndenciesString(
    dependencies: TDependencyParentTypescript[],
    esm = false,
  ): string {
    let result = '';
    for (const dependency of dependencies) {
      const { type, value, default: dependencyDefault, from } = dependency;

      result += `import ${dependencyDefault ? value : '{' + value + '}'} from`;
      if (type === 'absolute') {
        result += `'${from}'`;
      } else {
        result += esm ? `'${from}.js'` : `'${from}'`;
      }
      result += ';';
    }
    return result;
  }

  // private moduleHasRepoAdaptersDefined(
  //   setupData: ISetupData,
  //   { boundedContextName, moduleName }: { boundedContextName: string; moduleName: string },
  // ): boolean {
  //   return !!setupData?.repos?.repoAdapters?.[boundedContextName]?.[moduleName];
  // }

  // private injectRepoAdaptersFromSetupToModel(
  //   intermediateAST: TBoundedContexts,
  //   setupData: Readonly<ISetupData>,
  //   { boundedContextName, moduleName }: { boundedContextName: string; moduleName: string },
  // ): void {
  //   intermediateAST[boundedContextName][moduleName].RepoAdapters = deepClone(
  //     setupData.repos.repoAdapters[boundedContextName][moduleName],
  //   );
  // }
}
