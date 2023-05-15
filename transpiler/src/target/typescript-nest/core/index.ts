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
import {
  IIntermediateASTToTarget,
  TTargetCoreContent,
  TTargetCoreFinalContent,
} from '../../types.js';
import { IntermediateAST } from '../../../ast/core/types.js';

export class IntermediateASTToTarget implements IIntermediateASTToTarget {
  ASTToTarget(params: IntermediateAST): TTargetCoreContent[] {
    const { core } = params;
    const result: TTargetCoreContent[] = [];
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const [moduleName, intermediateASTTree] of Object.entries(boundedContext)) {
        const contextData: TContextData = {
          boundedContext: boundedContextName,
          module: moduleName,
        };

        const classTypeNodes = intermediateASTTree.getClassTypeNodes();
        classTypeNodes.forEach((intermediateASTNode) => {
          const generatedString = modelToTargetLanguage({
            type: intermediateASTNode.getNodeType(),
            value: intermediateASTNode.getValue(),
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
}
