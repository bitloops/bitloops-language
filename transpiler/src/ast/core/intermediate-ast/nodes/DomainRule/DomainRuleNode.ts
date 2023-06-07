import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { MissingParameterError, WrongParameterTypeError } from '../../../types.js';
import { ArgumentNode } from '../ArgumentList/ArgumentNode.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { ErrorIdentifierNode } from '../ErrorIdentifiers/ErrorIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';
import { DomainRuleIdentifierNode } from './DomainRuleIdentifierNode.js';
import { IsBrokenConditionNode } from './IsBrokenConditionNode.js';

export class DomainRuleNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainRule;
  private static classNodeName = 'DomainRule';

  constructor(metadata: TNodeMetadata) {
    super({
      classType: DomainRuleNode.classType,
      nodeType: BitloopsTypesMapping.TDomainRule,
      metadata,
      classNodeName: DomainRuleNode.classNodeName,
    });
  }
  public getIdentifier(): DomainRuleIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TDomainRuleIdentifier,
    ) as DomainRuleIdentifierNode;
    return identifier;
  }

  public getParameters(): ParameterNode[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getParameters();
  }

  public getParameterList(): ParameterListNode {
    return this.getChildNodeByType<ParameterListNode>(BitloopsTypesMapping.TParameterList);
  }

  public getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    //statementList can be null if there are no statements
    if (!statementList) {
      return [];
    }
    return statementList.statements;
  }

  public getStatementList(): StatementListNode {
    return this.getChildNodeByType<StatementListNode>(BitloopsTypesMapping.TStatements);
  }

  public getIsBrokenCondition(): IsBrokenConditionNode {
    const isBrokenCondition = this.getChildNodeByType(
      BitloopsTypesMapping.TIsBrokenIfCondition,
    ) as IsBrokenConditionNode;
    return isBrokenCondition;
  }

  public getIsBrokenErrorArguments(): ArgumentNode[] {
    const errorArguments = this.getIsBrokenCondition().getErrorArguments();
    return errorArguments;
  }

  public getErrorIdentifier(): ErrorIdentifierNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TErrorIdentifier) as ErrorIdentifierNode;
  }

  /**
   * here we check if the errorArguments of the isBrokenCondition of the domainRule are the same as the parameters of DomainError
   * we use the symbolTable for this but we need to implement it using the intermediateAST
   * because if we use the symbolTable we need to create the symbolTable of the DomainError
   * before the symbolTable of the DomainRule and it is not guaranteed because of the way user would write the code.
   * For this purpose we also need to add the position of the parameters in the parameterNode in the tree.
   */
  public typeCheck(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const errorIdentifierName = this.getErrorIdentifier().getErrorNameAfterDot();
    const errorArguments = this.getIsBrokenErrorArguments();
    const errorIdentifierScope = symbolTable.getParentScope().getChildScope(errorIdentifierName);
    const localSymbols = errorIdentifierScope.getLocalSymbols(); //localSymbols of DomainError includes the parameters with their types and their position

    for (const [parameter, symbolEntry] of Object.entries(localSymbols)) {
      const type = symbolEntry.type;
      const position = symbolEntry['position']; //position is optional
      if (position === undefined || null) return;
      if (position > errorArguments.length - 1) {
        throw new MissingParameterError(parameter, this.getMetadata());
      }
      const errorArgument = errorArguments[position];
      const errorArgumentType = errorArgument.getExpression().getInferredType(symbolTableManager);
      const errorArgumentName = errorArgument.getExpression().getStringValue();
      if (type !== errorArgumentType) {
        throw new WrongParameterTypeError(
          errorArgumentName,
          errorArgumentType,
          type,
          this.getMetadata(),
        );
      }
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const parameterList = this.getParameterList();
    parameterList.addToSymbolTable(symbolTableManager);

    const errorIdentifier = this.getErrorIdentifier();
    errorIdentifier.addToSymbolTable(symbolTableManager);

    const statementList = this.getStatementList();
    statementList.addToSymbolTable(symbolTableManager);

    const condition = this.getIsBrokenCondition();
    condition.addToSymbolTable(symbolTableManager);

    const errorArguments = this.getIsBrokenErrorArguments();
    errorArguments.forEach((errorArgument) => {
      errorArgument.addToSymbolTable(symbolTableManager);
    });
    this.typeCheck(symbolTableManager);
  }
}
