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
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { commandHandlerKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { StatementNode } from '../statements/Statement.js';
import { ExecuteNode } from '../ExecuteNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';

export class CommandHandlerNode extends ClassTypeNode {
  private static classType = ClassTypes.CommandHandler;
  private static classNodeName = commandHandlerKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: CommandHandlerNode.classType,
      nodeType: BitloopsTypesMapping.TCommandHandler,
      metadata,
      classNodeName: CommandHandlerNode.classNodeName,
    });
  }

  getExecute(): ExecuteNode {
    return this.getChildNodeByType<ExecuteNode>(BitloopsTypesMapping.TExecute);
  }

  getStatements(): StatementNode[] {
    const commandHandlerExecute = this.getExecute();
    return commandHandlerExecute.getStatements();
  }

  getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  getMethodParameters(): ParameterNode[] {
    const commandHandlerExecute = this.getChildNodeByType<ExecuteNode>(
      BitloopsTypesMapping.TExecute,
    );
    const parameter = commandHandlerExecute.getParameter();
    if (!parameter) return [];
    return [parameter];
  }
  getParameters(): ParameterNode[] {
    const parameterListNode = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterListNode.getParameters();
  }

  getParameterList(): ParameterListNode | null {
    return this.getChildNodeByType<ParameterListNode>(BitloopsTypesMapping.TParameterList);
  }

  // addToSymbolTable(classA: ClassA): void {
  //   const symbolTable = classA.getSymbolTable();
  //   classA.addClassTypeThis(symbolTable);
  //   // inside addClassTypeThis: symbolTable.insert(SCOPE_NAMES.THIS, new ClassTypeThisSymbolEntry(name));
  //   classA.addIntegrationEventBus(symbolTable);

  //   const parameterList = this.getParameterList();
  //   //TODO find a way to distinct paramaters from classTypeParameters
  //   parameterList.addToSymbolTable(classA);
  //   //inside: this.createClassTypeParamsScope(params, classTypeScope);
  //   const execute = this.getExecute();
  //   execute.addToSymbolTable(classA);

  //   const statements = node.getStatements();
  //   this.createStatementListScope({
  //     statements: statements,
  //     symbolTable: executeScope,
  //     intermediateASTTree: ASTTree,
  //   });
  // }
}
