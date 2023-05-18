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
import {
  TBoundedContexts,
  ValidationError,
  IntermediateAST,
  TBoundedContextName,
} from '../../ast/core/types.js';
import { SymbolTable } from './SymbolTable.js';
import { SymbolTableManager } from './SymbolTableManager.js';

export class TypeInferenceValidator {
  private symbolTable: Record<TBoundedContextName, SymbolTable> = {};
  private errors: ValidationError[] = [];

  public validate(ast: IntermediateAST): void | ValidationError[] {
    this.createSymbolTable(ast.core);
    return this.errors;
  }

  public getSymbolTable(ast: IntermediateAST): Record<TBoundedContextName, SymbolTable> {
    this.createSymbolTable(ast.core);
    return this.symbolTable;
  }

  private addError(...errors: ValidationError[]): void {
    this.errors.push(...errors);
  }

  private createSymbolTable(core: TBoundedContexts): void {
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      const globalScope = new SymbolTable();
      this.symbolTable[boundedContextName] = globalScope;
      for (const ASTTree of Object.values(boundedContext)) {
        const symbolTableManager = new SymbolTableManager(ASTTree, core);
        const classTypeNodes = ASTTree.getClassTypeNodes();
        classTypeNodes.forEach((node) => {
          try {
            const identifierNode = node.getIdentifier();
            const name = identifierNode.getIdentifierName();
            const classTypeScope = globalScope.createChildScope(name, node);

            symbolTableManager.setClassTypeSymbolTable(classTypeScope);
            node.addToSymbolTable(symbolTableManager);
          } catch (error) {
            // TODO this will show the errors one by one
            if (error instanceof ValidationError) {
              this.addError(error);
            }
          }
        });
      }
    }
  }
}
