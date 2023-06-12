import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ClassTypeGuards } from '../../../../../../helpers/typeGuards/ClassTypeGuards.js';
import { isString } from '../../../../../../helpers/typeGuards/typeGuards.js';
import {
  MethodCallSymbolEntry,
  MemberDotSymbolEntry,
  IntegrationEventParameterSymbolEntry,
  SymbolEntry,
} from '../../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { bitloopsPrimitivesObj } from '../../../../../../types.js';
import {
  AccessViolationError,
  MissingIdentifierError,
  MissingMemberError,
} from '../../../../types.js';
import { DomainEventDeclarationNode } from '../../DomainEvent/DomainEventDeclarationNode.js';
import { EventHandlerBusDependenciesNode } from '../../DomainEventHandler/EventHandlerBusDependenciesNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { PropsNode } from '../../Props/PropsNode.js';
import { CommandDeclarationNode } from '../../command/CommandDeclarationNode.js';
import { QueryDeclarationNode } from '../../query/QueryDeclarationNode.js';
import { QueryHandlerNode } from '../../query/QueryHandlerNode.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { IdentifierExpressionNode } from '../IdentifierExpression.js';
import { RegexLiteralNode } from '../Literal/RegexLiteralNode.js';

export class MemberDotExpressionNode extends ExpressionNode {
  private static NAME = 'memberDotExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = MemberDotExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TMemberDotExpression;
  }

  getExpressionValues(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression || !expression.getChildren().length) {
      throw new Error('Expression not found');
    }
    return expression.getChildren()[0] as ExpressionNode;
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression as ExpressionNode;
  }

  getIdentifierExpression(): IdentifierExpressionNode {
    const children = this.getChildren();
    const identifier = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TIdentifierExpression,
    );
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier as IdentifierExpressionNode;
  }

  getLeftMostExpression(): ExpressionNode {
    const expression = this.getExpressionValues();
    if (expression.isMemberDotExpression()) {
      return expression.getLeftMostExpression();
    }

    if (expression.isMethodCallExpression()) {
      return expression.getMemberDotExpression().getLeftMostExpression();
    }
    return expression;
  }

  getRightMostExpression(): IdentifierExpressionNode {
    return this.getIdentifierExpression();
  }

  getLeftExpression(): ExpressionNode {
    return this.getExpressionValues();
  }

  getLeftMostMemberDotExpression(): MemberDotExpressionNode {
    const expression = this.getExpressionValues();
    if (expression.isMemberDotExpression()) {
      return expression.getLeftMostMemberDotExpression();
    } else if (expression.isMethodCallExpression()) {
      const memberDotExpression = expression.getMemberDotExpression();
      return memberDotExpression.getLeftMostMemberDotExpression();
    }
    return this;
  }

  hasMethodCallExpressionParent(): boolean {
    const expressionNode = this.getParent() as ExpressionNode;
    const expressionNodeParent = expressionNode.getParent();
    if (expressionNodeParent.getNodeType() === BitloopsTypesMapping.TMethodCallExpression) {
      return true;
    }
    return false;
  }

  isUsedByMemberDotExpression(): boolean {
    const parent = this.getParent();
    if (!parent) {
      return false;
    }
    if (parent instanceof MemberDotExpressionNode) {
      return true;
    }
    return false;
  }

  public getStringValue(): string {
    const expression = this.getExpression();
    const leftStringValue = expression.getStringValue();
    return leftStringValue + '.' + this.getIdentifierExpression().getIdentifierName();
  }
  private isClassName(identifierName: string): boolean {
    return identifierName[0] === identifierName[0].toUpperCase();
  }

  public typeCheck(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const astTree = symbolTableManager.getIntermediateASTTree();
    const leftMostExpression = this.getLeftMostExpression();
    let identifierName: string;
    if (leftMostExpression.isIdentifierExpression()) {
      identifierName = leftMostExpression.getIdentifierName();
    } else if (leftMostExpression.isThisExpression()) {
      identifierName = leftMostExpression.getIdentifierName();
    }

    if (this.isClassName(identifierName)) {
      const classNode = astTree.getClassTypeByIdentifier(identifierName);
      if (!classNode) {
        throw new Error(`ClassNode ${identifierName} not found`);
      }
    } else {
      const identifierType = symbolTable.lookup(identifierName);
      if (!identifierType) {
        throw new MissingIdentifierError(identifierName, this.getMetadata());
      }
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager, isMethodCall = false): void {
    this.addMemberDotExpression({
      memberDotExpression: this,
      symbolTableManager,
      isMethodCall,
    });
  }

  private addMemberDotExpression({
    memberDotExpression,
    symbolTableManager,
    isMethodCall = false,
  }: {
    memberDotExpression: MemberDotExpressionNode;
    symbolTableManager: SymbolTableManager;
    isMethodCall?: boolean;
  }): string {
    const leftMostMemberDotExpression = memberDotExpression.getLeftExpression();
    const rightMostExpression = memberDotExpression.getRightMostExpression();

    if (leftMostMemberDotExpression.isMemberDotExpression()) {
      const memberDotResult = this.addMemberDotExpression({
        memberDotExpression: leftMostMemberDotExpression,
        symbolTableManager,
        isMethodCall: false,
      });

      return this.insertMemberDotOrMethodCallToSymbolTable({
        memberDotResult,
        isMethodCall,
        rightMostExpression,
        memberDotExpression,
        symbolTableManager,
      });
    } else if (leftMostMemberDotExpression.isMethodCallExpression()) {
      const memberDot = leftMostMemberDotExpression.getMemberDotExpression();
      const memberDotResult = this.addMemberDotExpression({
        memberDotExpression: memberDot,
        symbolTableManager,
        isMethodCall: true,
      });
      return this.insertMemberDotOrMethodCallToSymbolTable({
        memberDotResult,
        isMethodCall,
        rightMostExpression,
        memberDotExpression,
        symbolTableManager,
      });
    } else {
      if (leftMostMemberDotExpression.isThisExpression()) {
        return this.insertMemberDotOrMethodCallToSymbolTable({
          memberDotResult: leftMostMemberDotExpression.getIdentifierName(),
          isMethodCall,
          rightMostExpression,
          memberDotExpression,
          symbolTableManager,
        });
      } else if (leftMostMemberDotExpression.isIdentifierExpression()) {
        return this.insertMemberDotOrMethodCallToSymbolTable({
          memberDotResult: leftMostMemberDotExpression.getIdentifierName(),
          isMethodCall,
          rightMostExpression,
          memberDotExpression,
          symbolTableManager,
        });
      } else {
        throw new Error('Invalid left expression of member dot expression');
      }
    }
  }

  private insertMemberDotOrMethodCallToSymbolTable({
    isMethodCall,
    memberDotResult,
    rightMostExpression,
    memberDotExpression,
    symbolTableManager,
  }: {
    isMethodCall: boolean;
    memberDotResult: string;
    rightMostExpression: IdentifierExpressionNode;
    memberDotExpression: MemberDotExpressionNode;
    symbolTableManager: SymbolTableManager;
  }): string {
    const symbolTable = symbolTableManager.getSymbolTable();

    const astTree = symbolTableManager.getIntermediateASTTree();
    //check if the member dot result is a single string
    if (memberDotResult.split('.').length === 1 && this.isClassName(memberDotResult)) {
      const classNode = astTree.getClassTypeByIdentifier(memberDotResult);
      if (!classNode) {
        throw new Error(`ClassNode ${memberDotResult} not found`);
      }
      const methodCallSymbolEntryKey = this.getMethodCallSymbolEntryKey(
        memberDotResult,
        rightMostExpression,
      );
      symbolTable.lookup(methodCallSymbolEntryKey);
    }
    if (isMethodCall) {
      const methodCallSymbolEntryKey = this.getMethodCallSymbolEntryKey(
        memberDotResult,
        rightMostExpression,
      );
      if (!symbolTable.lookup(methodCallSymbolEntryKey)) {
        symbolTable.insert(
          methodCallSymbolEntryKey,
          new MethodCallSymbolEntry(memberDotExpression.getInferredType(symbolTableManager)),
        );
      }
      return methodCallSymbolEntryKey;
    } else {
      const memberDotSymbolEntryKey = this.getMemberDotSymbolEntryKey(
        memberDotResult,
        rightMostExpression,
      );
      //add it to symbol table if it doesn't exist
      if (!symbolTable.lookup(memberDotSymbolEntryKey)) {
        symbolTable.insert(
          memberDotSymbolEntryKey,
          new MemberDotSymbolEntry(memberDotExpression.getInferredType(symbolTableManager)),
        );
      }
      return memberDotSymbolEntryKey;
    }
  }

  private getMemberDotSymbolEntryKey(
    leftExpressionName: string,
    rightExpressionNode: IdentifierExpressionNode,
  ): string {
    return leftExpressionName + '.' + rightExpressionNode.getIdentifierName();
  }

  private getMethodCallSymbolEntryKey(
    leftExpressionName: string,
    rightExpressionNode: IdentifierExpressionNode,
  ): string {
    return leftExpressionName + '.' + rightExpressionNode.getIdentifierName() + '()';
  }

  public getInferredType(symbolTableManager: SymbolTableManager): string {
    const symbolTable = symbolTableManager.getSymbolTable();
    const leftExpression = this.getLeftExpression();
    const rightMostExpression = this.getRightMostExpression();
    const leftExpressionString = leftExpression.getStringValue();
    const rightExpressionString = rightMostExpression.getStringValue();
    const leftExpressionType = symbolTable.lookup(leftExpressionString);
    if (!leftExpressionType)
      throw new Error(`${rightExpressionString} is not defined in ${leftExpressionString} `);

    return this.getMemberDotTypeFromIntermediateASTTree({
      leftExpressionType,
      leftExpressionString,
      rightExpressionString,
      symbolTableManager,
    });
  }

  private getMemberDotTypeFromIntermediateASTTree({
    leftExpressionType,
    leftExpressionString,
    rightExpressionString,
    symbolTableManager,
  }: {
    leftExpressionType: SymbolEntry;
    leftExpressionString: string;
    rightExpressionString: string;
    symbolTableManager: SymbolTableManager;
  }): string {
    const { type: leftType } = leftExpressionType;
    const intermediateASTTree = symbolTableManager.getIntermediateASTTree();
    const boundedContexts = symbolTableManager.getBoundedContexts();

    if (isString(leftType)) {
      switch (rightExpressionString) {
        case 'length': {
          return bitloopsPrimitivesObj.int32;
        }
      }
    }

    if (ClassTypeGuards.isQuery(leftType)) {
      const queryNode = intermediateASTTree.getQueryByIdentifier(leftType);
      const fieldType = getFieldType(queryNode, rightExpressionString, this.getMetadata());
      return fieldType;
    }
    if (ClassTypeGuards.isCommand(leftType)) {
      const commandNode = intermediateASTTree.getCommandByIdentifier(leftType);
      const fieldType = getFieldType(commandNode, rightExpressionString, this.getMetadata());
      return fieldType;
    }

    if (ClassTypeGuards.isQueryHandler(leftType)) {
      const queryHandlerNode = intermediateASTTree.getQueryHandlerByIdentifier(leftType);
      const fieldType = getFieldType(queryHandlerNode, rightExpressionString, this.getMetadata());
      return fieldType;
    }

    if (ClassTypeGuards.isRepoPort(leftType)) {
      const repoPortNode = intermediateASTTree.getRepoPortByIdentifier(leftType);
      const methodDefinitionTypes =
        intermediateASTTree.getMethodDefinitionTypesOfRepoPort(repoPortNode);
      const methodDefinitionType = methodDefinitionTypes[rightExpressionString];
      if (!methodDefinitionType)
        throw new MissingMemberError(
          rightExpressionString,
          repoPortNode.getIdentifier().getIdentifierName(),
          this.getMetadata(),
        );
      return methodDefinitionType.getInferredType();
    }
    if (ClassTypeGuards.isEntity(leftType)) {
      const entityNode =
        intermediateASTTree.getRootEntityByIdentifier(leftType) ??
        intermediateASTTree.getEntityByIdentifier(leftType);
      const entityValues = entityNode.getEntityValues();

      const publicMethodTypes = entityValues.getPublicMethodTypes();
      const publicMethodType = publicMethodTypes[rightExpressionString];

      const privateMethodTypes = entityValues.getPrivateMethodTypes();
      const privateMethodType = privateMethodTypes[rightExpressionString];

      const isEntityProp = !privateMethodType && !publicMethodType;
      if (isEntityProp) {
        const propsIdentifier = entityValues.getPropsIdentifier();
        const propsNode = intermediateASTTree.getPropsByIdentifier(propsIdentifier);
        const fieldTypes = propsNode.getFieldTypes();
        const fieldType = fieldTypes[rightExpressionString];
        if (!fieldType) {
          throw new MissingMemberError(rightExpressionString, leftType, this.getMetadata());
        }
        return fieldType.getInferredType();
      }
      if (privateMethodType) {
        if (leftExpressionString !== SymbolTableManager.THIS) {
          throw new AccessViolationError(
            rightExpressionString,
            leftExpressionString,
            leftType,
            this.getMetadata(),
          );
        }

        const privateMethodInferredType = privateMethodType.getInferredType();
        if (!privateMethodInferredType) {
          throw new MissingMemberError(rightExpressionString, leftType, this.getMetadata());
        }
        return privateMethodInferredType;
      }

      // TODO if none of them typeCheck??
      const publicMethodInferredType = publicMethodType.getInferredType();
      if (!publicMethodInferredType)
        throw new MissingMemberError(rightExpressionString, leftType, this.getMetadata());
      return publicMethodInferredType;
    }
    if (ClassTypeGuards.isVO(leftType)) {
      // same with entity fields
      const voNode = intermediateASTTree.getValueObjectByIdentifier(leftType);
      const propsIdentifier = voNode.getPropsIdentifier();
      const propsNode = intermediateASTTree.getPropsByIdentifier(propsIdentifier);
      const fieldTypes = propsNode.getFieldTypes();
      const fieldType = fieldTypes[rightExpressionString];
      if (!fieldType)
        throw new MissingMemberError(rightExpressionString, leftType, this.getMetadata());
      return fieldType.getInferredType();
    }
    if (ClassTypeGuards.isDomainEvent(leftType)) {
      const domainEventNode = intermediateASTTree.getDomainEventByIdentifier(leftType);
      const fieldType = getFieldType(domainEventNode, rightExpressionString, this.getMetadata());
      return fieldType;
    }
    if (ClassTypeGuards.isCommandBusPort(leftType)) {
      const commandBusMethodType = EventHandlerBusDependenciesNode.getCommandBusMethodType();
      const typeNode = commandBusMethodType[rightExpressionString];
      if (!typeNode)
        throw new MissingMemberError(
          rightExpressionString,
          leftType.replace('Port', ''),
          this.getMetadata(),
        );
      return typeNode.getInferredType();
    }
    if (ClassTypeGuards.isIntegrationEvent(leftType)) {
      const { integrationEventInfo } = leftExpressionType as IntegrationEventParameterSymbolEntry;
      const { eventVersion, boundedContext, module } = integrationEventInfo;
      const ASTTree = boundedContexts[boundedContext][module];
      const integrationEventNode = ASTTree.getIntegrationEventByIdentifier(leftType);
      const versionMapperSchemas = integrationEventNode.getIntegrationEventMapperSchemas();
      const schemaType = versionMapperSchemas[eventVersion];
      const schemaNode = ASTTree.getStructByIdentifier(schemaType.getIdentifierName());
      const fieldTypes = schemaNode.getFieldTypes();
      const fieldType = fieldTypes[rightExpressionString];
      if (!fieldType)
        throw new MissingMemberError(
          rightExpressionString,
          schemaNode.getIdentifier().getIdentifierName(),
          this.getMetadata(),
        );
      return fieldType.getInferredType();
    }
    if (ClassTypeGuards.isProps(leftType)) {
      const propsNode = intermediateASTTree.getPropsByIdentifier(leftType);
      const fieldType = getFieldType(propsNode, rightExpressionString, this.getMetadata());
      return fieldType;
    }

    if (ClassTypeGuards.isRegex(leftType)) {
      const regexType = RegexLiteralNode.getLiteralType(rightExpressionString);
      if (!regexType)
        throw new MissingMemberError(rightExpressionString, leftType, this.getMetadata());
      return regexType;
    }

    return '';
  }
}

const getFieldType = (
  node:
    | QueryDeclarationNode
    | CommandDeclarationNode
    | QueryHandlerNode
    | DomainEventDeclarationNode
    | PropsNode,
  rightExpressionString: string,
  metadata: TNodeMetadata,
): string => {
  const fieldType = node.getFieldNodeType(rightExpressionString);
  if (!fieldType || fieldType === SymbolTableManager.UNKNOWN_TYPE)
    throw new MissingMemberError(
      rightExpressionString,
      node.getIdentifier().getIdentifierName(),
      metadata,
    );
  return fieldType;
};
