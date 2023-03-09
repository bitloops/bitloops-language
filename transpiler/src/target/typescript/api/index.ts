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
import { TDependencyParentTypescript } from '../../../types.js';
import { ClassTypeNode } from '../../../ast/core/intermediate-ast/nodes/ClassTypeNode.js';
import {
  IIntermediateApiASTToTarget,
  TargetApiGeneratorError,
  TTargetApiContent,
  TTargetApiFinalContent,
} from '../../types.js';
import { IntermediateAST } from '../../../ast/core/types.js';
import { isTargetApiGeneratorError } from '../guards/index.js';
import { TTranspileOptions } from '../../../transpilerTypes.js';
import { formatString } from '../core/codeFormatting.js';
import { generateFinalContentWithImports } from '../helpers/importGeneration.js';

export class IntermediateApiASTToTarget implements IIntermediateApiASTToTarget {
  generateApiFiles(
    params: IntermediateAST,
    options: TTranspileOptions,
  ): TTargetApiFinalContent[] | TargetApiGeneratorError {
    const targetApiContent = this.ASTToTarget(params);
    if (isTargetApiGeneratorError(targetApiContent)) return targetApiContent;

    const targetContentWithImports = this.generateImports(targetApiContent);
    const formattedTargetContent = this.formatCode(
      targetContentWithImports,
      options.formatterConfig,
    );
    return formattedTargetContent;
  }

  private ASTToTarget(params: IntermediateAST): TTargetApiContent[] | TargetApiGeneratorError {
    const { api } = params;
    const result: TTargetApiContent[] = [];
    for (const [apiName, intermediateASTTree] of Object.entries(api)) {
      const classTypeNodes = intermediateASTTree.getRootNode().getChildren();
      classTypeNodes.forEach((intermediateASTNode) => {
        // const generatedString = modelToTargetLanguage({
        //   type: intermediateASTNode.getNodeType(),
        //   value: intermediateASTNode.getValue(),
        //   contextData,
        //   model: intermediateASTTree,
        // });
        const generatedContent = null;

        const classTypeNode = intermediateASTNode as ClassTypeNode;
        result.push({
          api: apiName,
          classType: classTypeNode.getClassType?.(),
          className: classTypeNode.getClassName?.(),
          fileContent: generatedContent,
        });
      });
    }
    return result;
  }

  private generateImports(params: TTargetApiContent[]): TTargetApiFinalContent[] {
    const formattedCode: TTargetApiFinalContent[] = [];
    for (const { api, classType, className, fileContent } of params) {
      const { output } = fileContent;
      const parentDependecies = fileContent.dependencies as TDependencyParentTypescript[];

      const finalContent = generateFinalContentWithImports({
        output,
        classType,
        parentDependecies,
      });

      formattedCode.push({
        api,
        classType,
        className,
        fileContent: finalContent,
      });
    }
    return formattedCode;
  }

  private formatCode(
    targetContent: TTargetApiFinalContent[],
    config?: any,
  ): TTargetApiFinalContent[] {
    const formattedCode: TTargetApiFinalContent[] = [];
    for (const { api, classType, className, fileContent } of targetContent) {
      const formattedContent = formatString(fileContent, config);

      formattedCode.push({
        api,
        classType,
        className,
        fileContent: formattedContent,
      });
    }
    return formattedCode;
  }
}
