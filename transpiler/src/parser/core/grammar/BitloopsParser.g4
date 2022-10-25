/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 by Bart Kiers (original author) and Alexandre Vitorelli (contributor -> ported to CSharp)
 * Copyright (c) 2017 by Ivan Kochurkin (Positive Technologies):
    added ECMAScript 6 support, cleared and transformed to the universal grammar.
 * Copyright (c) 2018 by Juan Alvarez (contributor -> ported to Go)
 * Copyright (c) 2019 by Andrii Artiushok (contributor -> added TypeScript support)
 * Copyright (c) 2022 by Bitloops S.A. (contributor -> added Bitloops support)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
parser grammar BitloopsParser;

options {
    tokenVocab=BitloopsLexer;
   // superClass=BitloopsParserBase;
}

// SupportSyntax

initializer
    : '=' expression
    ;

bindingPattern
    : (arrayLiteral | objectLiteral)
    ;

// Bitloops SPart
// A.1 Types

typeParameters
    : '<' typeParameterList? '>'
    ;

typeParameterList
    : typeParameter (Comma typeParameter)*
    ;

fieldList
    : field (SemiColon field)* SemiColon
    ;

evaluationFieldList
    : evaluationField (Comma evaluationField)*
    ;

evaluationField
    : Identifier Colon expression
    ;

typeParameter
    : Identifier constraint?
    | typeParameters
    ;

constraint
    : 'extends' type_
    ;

typeArguments
    : '<' typeArgumentList? '>'
    ;

propFields
    : OpenBrace fieldList? CloseBrace
    ;

typeArgumentList
    : typeArgument (Comma typeArgument)*
    ;

typeArgument
    : type_
    ;

propsIdentifier
: PropsIdentifier
;

bitloopsIdentifiers
    : 
    UseCaseIdentifier
    | dtoIdentifier
    | ControllerIdentifier
    | ErrorIdentifier
    | propsIdentifier
    | ValueObjectIdentifier
    | EntityIdentifier
    | UpperCaseIdentifier //TODO update this with the specific identifiers e.g. structidentifier
    | RepoPortIdentifier
    ;

type_
    : unionOrIntersectionOrPrimaryType
    | functionType
    | constructorType
    | typeGeneric
    | StringLiteral
    | bitloopsIdentifiers
    | type_ '[' ']' 
    ;

unionOrIntersectionOrPrimaryType
    : unionOrIntersectionOrPrimaryType '|' unionOrIntersectionOrPrimaryType #Union
    | unionOrIntersectionOrPrimaryType '&' unionOrIntersectionOrPrimaryType #Intersection
    // | primaryType #Primary
    | primitives #Primmitives
    ;

primaryType
    : OpenParen type_ CloseParen                                 #ParenthesizedPrimType
    | predefinedType                                #PredefinedPrimType
    | typeReference                                 #ReferencePrimType
    | objectType                                    #ObjectPrimType
    // | primaryType {notLineTerminator()}? '[' ']'    #ArrayPrimType
    | primaryType '[' ']'    #ArrayPrimType
    | '[' tupleElementTypes ']'                     #TuplePrimType
    | typeQuery                                     #QueryPrimType
    | This                                          #ThisPrimType
    | typeReference Is primaryType                  #RedefinitionOfType
    ;

primitives
    : Any
    | Double
    | Float
    | Int32
    | Int64
    | Uint32
    | Uint64
    | Sint32
    | Sint64
    | Fixed32
    | Fixed64
    | Sfixed32
    | Sfixed64
    | Boolean
    | String
    | Bytes
    | Timestamp
    | Void
    ;

identifier
    : Identifier
    ;

upperCaseIdentifier
    : UpperCaseIdentifier
    ;

struct
    : UpperCaseIdentifier
    ;

regularEvaluation
    : regularMethodEvaluation   
    | regularStringEvaluation
    | regularVariableEvaluation
    | regularIntegerEvaluation
    | regularDecimalEvaluation
    | regularBooleanEvaluation
    | regularDTOEvaluation
    | regularStructEvaluation
	| isInstanceOf
    ;
// regularVariableEvaluation | regularStringEvaluation |

getClassEvaluation:
    GetClassEvaluation 
    ;


methodArguments
    : OpenParen (argumentList (Comma argumentList)*)? CloseParen
    ;

openParen
    : OpenParen
    ;

closeParen
    :  CloseParen
    ;

//regularMethodEvaluation
//    : regularVariableEvaluation openParen regularVariableEvaluation closeParen;
regularVariableEvaluation
    : ThisVariableEvaluation #ThisVariableEvaluationString
    | RegularVariableEvaluation #RegularVariableEvaluationString
    | Identifier    #IdentifierString
    ;

regularMethodEvaluation
    : ThisVariableEvaluation methodArguments    #ThisVariableMethodEvaluation
    | RegularVariableEvaluation methodArguments #RegularVariableMethodEvaluation
    ;



regularStringEvaluation
    : StringLiteral
    ;

regularIntegerEvaluation
    : IntegerLiteral
    ;

regularDecimalEvaluation
    : DecimalLiteral
    ;

regularBooleanEvaluation
    : BooleanLiteral
    ;

regularStructEvaluation
    : UpperCaseIdentifier
    ;

regularDTOEvaluation
    : DTOIdentifier
    ;

// | RegularStringEvaluation | RegularBackTicksEvaluation
field
    : Optional? (primitives | struct | valueObjectIdentifier) identifier
    ;

predefinedType
    : Any
    | Int32
    | Boolean
    | String
    | Struct
    | Void
    ;

typeReference
    : typeName nestedTypeGeneric?
    ;

nestedTypeGeneric
    : typeIncludeGeneric
    | typeGeneric
    ;

// I tried recursive include, but it's not working.
// typeGeneric
//    : '<' typeArgumentList typeGeneric?'>'
//    ;
//
// TODO: Fix recursive
//
typeGeneric
    : '<' typeArgumentList '>'
    ;

typeIncludeGeneric
    :'<' typeArgumentList '<' typeArgumentList ('>' bindingPattern '>' | '>>')
    ;

typeName
    : Identifier
    | namespaceName
    ;

objectType
    : OpenBrace typeBody? CloseBrace
    ;

typeBody
    : typeMemberList (SemiColon | Comma)?
    ;

typeMemberList
    : typeMember ((SemiColon | Comma) typeMember)*
    ;

typeMember
    : propertySignatur
    | callSignature
    | constructSignature
    | indexSignature
    | methodSignature ('=>' type_)?
    ;

methodDefinitionList
    : methodDefinition*
    ;

methodDefinition
    : identifier formalParameterList? typeAnnotation SemiColon
    ;

arrayType
    // : primaryType {notLineTerminator()}? '[' ']'
    : primaryType '[' ']'
    ;

tupleType
    : '[' tupleElementTypes ']'
    ;

tupleElementTypes
    : type_ (Comma type_)*
    ;

functionType
    : typeParameters? OpenParen parameterList? CloseParen '=>' type_
    ;

constructorType
    : 'new' typeParameters? OpenParen parameterList? CloseParen '=>' type_
    ;

typeQuery
    : 'typeof' typeQueryExpression
    ;

typeQueryExpression
    : Identifier
    | (identifierName Dot)+ identifierName
    ;

propertySignatur
    : ReadOnly? propertyName '?'? typeAnnotation? ('=>' type_)?
    ;

typeAnnotation
    : Colon type_
    ;

callSignature
    : typeParameters? OpenParen parameterList? CloseParen typeAnnotation?
    ;

parameterList
    : restParameter
    | parameter (Comma parameter)* (Comma restParameter)?
    ;

requiredParameterList
    : requiredParameter (Comma requiredParameter)*
    ;

parameter
    : requiredParameter
    | optionalParameter
    ;

optionalParameter
    : decoratorList? ( accessibilityModifier? identifierOrPattern ('?' typeAnnotation? | typeAnnotation? initializer))
    ;

restParameter
    : Ellipsis expression typeAnnotation?
    ;

requiredParameter
    : decoratorList? accessibilityModifier? identifierOrPattern typeAnnotation?
    ;

accessibilityModifier
    : Public
    | Private
    // | Protected
    ;

identifierOrPattern
    : identifierName
    | bindingPattern
    ;

constructSignature
    : 'new' typeParameters? OpenParen parameterList? CloseParen typeAnnotation?
    ;

indexSignature
    : '[' Identifier Colon (Int32|String) ']' typeAnnotation
    ;

methodSignature
    : propertyName '?'? callSignature
    ;

typeAliasDeclaration
    : 'type' Identifier typeParameters? '=' type_ SemiColon
    ;

// constructorDeclaration
//     : accessibilityModifier? Constructor '(' formalParameterList? ')' ( ('{' functionBody '}') | SemiColon)?
//     ;
//useCaseExecuteDeclaration
//    : accessibilityModifier? Execute '(' formalParameterList? ')' ( ('{' functionBody '}') | SemiColon)
//;

// A.5 Interface

// interfaceDeclaration
//     : Export? Declare? Interface Identifier typeParameters? interfaceExtendsClause? objectType SemiColon?
//     ;

// propsDeclaration
//     : Props Identifier typeParameters? interfaceExtendsClause? objectType SemiColon?
//     ;

interfaceExtendsClause
    : Extends classOrInterfaceTypeList
    ;

classOrInterfaceTypeList
    : typeReference (Comma typeReference)*
    ;

// A.7 Interface

// enumDeclaration
//     : Const? Enum Identifier '{' enumBody? '}'
//     ;

enumBody
    : enumMemberList Comma?
    ;

enumMemberList
    : enumMember (Comma enumMember)*
    ;

enumMember
    : propertyName ('=' expression)?
    ;

// A.8 Namespaces

namespaceDeclaration
    : Namespace namespaceName OpenBrace statementList? CloseBrace
    ;

namespaceName
    : Identifier (Dot+ Identifier)*
    ;

importAliasDeclaration
    : Identifier '=' namespaceName SemiColon
    ;

// Ext.2 Additions to 1.8: Decorators

decoratorList
    : decorator+ ;

decorator
    : '@' (decoratorMemberExpression | decoratorCallExpression)
    ;

decoratorMemberExpression
    : Identifier
    | decoratorMemberExpression Dot identifierName
    | OpenParen expression CloseParen
    ;

decoratorCallExpression
    : decoratorMemberExpression arguments;

// ECMAPart
program
    : sourceElement*
    // : sourceElements?
    // sourceElements? EOF?
    ;

sourceElement
    : dtoDeclaration
    | domainErrorDeclaration
    | applicationErrorDeclaration
    | controllerDeclaration
    | jestTestDeclaration
    | propsDeclaration
    | structDeclaration
    | useCaseDeclaration
    | packagePortDeclaration
    | valueObjectDeclaration
    | domainConstructorDeclaration
    | domainRuleDeclaration
    | entityDeclaration
    | aggregateDeclaration
    | repoPortDeclaration
    ;

// TODO fix JestTestReturnOkErrorType
jestTestDeclaration
    : JestTestFunctionBody OpenBrace functionBody CloseBrace SemiColon?       
    // JestTestExecute '{' functionBody '}' SemiColon?      
    | JestTestStatementList OpenBrace statementList CloseBrace SemiColon?    
    | JestTestStatement OpenBrace statement SemiColon? CloseBrace SemiColon? 
    | JestTestStructEvaluation OpenBrace structEvaluation SemiColon? CloseBrace  SemiColon?  
    | JestTestDTOEvaluation OpenBrace dtoEvaluation SemiColon? CloseBrace  SemiColon?    
    | JestTestEvaluation OpenBrace evaluation SemiColon? CloseBrace  SemiColon?  
	| JestTestIsInstanceOf OpenBrace isInstanceOf CloseBrace SemiColon?  
    | JestTest OpenBrace regularEvaluation SemiColon? CloseBrace SemiColon?  
    | JestTest OpenBrace formalParameterList CloseBrace SemiColon?   
    | JestTest OpenBrace restControllerParameters CloseBrace     
    | JestTest OpenBrace restControllerExecuteDeclaration CloseBrace    
    | JestTest OpenBrace restControllerMethodDeclaration CloseBrace  
    | JestTestGetClass OpenBrace getClassEvaluation CloseBrace 
    | JestTestReturnOkErrorType OpenBrace returnOkErrorType CloseBrace SemiColon?    
    | JestTestConstDeclaration OpenBrace constDeclaration CloseBrace SemiColon?  
    | JestTestExpression OpenBrace expression CloseBrace SemiColon?  
    | JestTestMethodDefinitionList OpenBrace methodDefinitionList CloseBrace SemiColon?
    | JestTestCreateMethodDeclaration OpenBrace domainConstructorDeclaration CloseBrace SemiColon?
    | JestTestPrivateMethodDeclaration OpenBrace privateMethodDeclaration CloseBrace SemiColon?
    | JestTestPublicMethodDeclaration OpenBrace publicMethodDeclaration CloseBrace SemiColon?
    | JestTestValueObjectDeclaration OpenBrace valueObjectDeclaration CloseBrace SemiColon?
    | JestTestEntityDeclaration OpenBrace entityDeclaration CloseBrace SemiColon?
    | JestTestCondition OpenBrace condition CloseBrace SemiColon?
    | JestTestVariableDeclaration OpenBrace variableDeclaration CloseBrace SemiColon?
    | JestTestThisDeclaration OpenBrace thisDeclaration CloseBrace SemiColon?
    | JestTestValueObjectEvaluation OpenBrace valueObjectEvaluation CloseBrace SemiColon?
    | JestTestEntityEvaluation OpenBrace entityEvaluation CloseBrace SemiColon?
    | JestTestBuiltInFunction OpenBrace builtInFunction CloseBrace SemiColon?
    ;

evaluation
    : 
    getClassEvaluation
    | regularEvaluation
    | dtoEvaluation
    | structEvaluation
    | valueObjectEvaluation
    | entityEvaluation
    | propsEvaluation
    ;

condition
    : expression
    ;

returnStatement
    : Return expression
    ;

constDeclaration
    : Const identifier typeAnnotation? '=' expression  SemiColon?
    ;

variableDeclaration
    : identifier typeAnnotation '=' expression  SemiColon?
    ;

thisDeclaration
    : ThisVariableEvaluation '=' expression  SemiColon?
    ;

statement
    : block                         
    | expression    
    | constDeclaration
    | variableDeclaration
    | thisDeclaration
    // | expressionStatement
    | emptyStatement_
    | propsDeclaration
    | namespaceDeclaration //ADDED
    | ifStatement
    | breakStatement
    | switchStatement
    | iterationStatement
    | returnStatement
    // | returnErrorStatement TODO
    // | labelledStatement
    | throwStatement
    | tryStatement
    | functionDeclaration
    | arrowFunctionDeclaration
    // | variableStatement
    | typeAliasDeclaration //ADDED
    | builtInFunction // Using semantic analysis, allow it only inside domain
    ;

builtInFunction
    : ApplyRules OpenParen applyRuleStatementRulesList CloseParen SemiColon? # ApplyRulesStatement
    ;

applyRuleStatementRulesList
    : applyRulesRule (Comma applyRulesRule)*
    ;

applyRulesRule
    : domainRuleIdentifier arguments
    ;

block
    : OpenBrace statementList? CloseBrace
    ;

statementList
    : statement+ SemiColon?
    ;

// abstractDeclaration
//     : Abstract (Identifier callSignature | variableStatement) eos
//     ;

// importStatement
//     : Import (fromBlock | importAliasDeclaration)
//     ;

fromBlock
    : (Multiply | multipleImportStatement) (As identifierName)? From StringLiteral eos
    ;

multipleImportStatement
    : (identifierName Comma)? OpenBrace identifierName (Comma identifierName)* CloseBrace
    ;

// exportStatement
//     : Export Default? (fromBlock | statement)
//     ;

variableStatement
    : bindingPattern typeAnnotation? initializer SemiColon?
    | accessibilityModifier? varModifier? ReadOnly? variableDeclarationList SemiColon?
    | Declare varModifier? variableDeclarationList SemiColon?
    ;

variableDeclarationList
    : variableDeclaration (Comma variableDeclaration)*
    ;

// variableDeclaration
//     : ( identifierOrKeyWord | arrayLiteral | objectLiteral) typeAnnotation? expression? ('=' typeParameters? expression)? // ECMAScript 6: Array & Object Matching
//     ;

emptyStatement_
    : SemiColon
    ;

expressionStatement
    // : {this.notOpenBraceAndNotFunction()}? expressionSequence SemiColon?
    : expressionSequence SemiColon?
    ;

ifStatement
    : If OpenParen condition CloseParen statement (Else statement)?
    ;


iterationStatement
    : Do statement While OpenParen expressionSequence CloseParen eos                                                         # DoStatement
    | While OpenParen expressionSequence CloseParen statement                                                                # WhileStatement
    | For OpenParen expressionSequence? SemiColon expressionSequence? SemiColon expressionSequence? CloseParen statement     # ForStatement
    | For OpenParen varModifier variableDeclarationList SemiColon expressionSequence? SemiColon expressionSequence? CloseParen
          statement                                                                                             # ForVarStatement
    // | For '(' expression (In | Identifier{this.p("of")}?) expressionSequence ')' statement                # ForInStatement
    // | For '(' varModifier variableDeclaration (In | Identifier{this.p("of")}?) expressionSequence ')' statement # ForVarInStatement
    | For OpenParen expression (In | Identifier?) expressionSequence CloseParen statement                # ForInStatement
    | For OpenParen varModifier variableDeclaration (In | Identifier?) expressionSequence CloseParen statement # ForVarInStatement
    ;

varModifier
    : Var
    | Let
    | Const
    ;

// continueStatement
//     : Continue ({this.notLineTerminator()}? Identifier)? eos
//     ;

// breakStatement
//     : Break ({this.notLineTerminator()}? Identifier)? eos
//     ;

// returnStatement
//     : Return ({this.notLineTerminator()}? expressionSequence)? eos
//     ;

continueStatement
    : Continue (Identifier)? eos
    ;

breakStatement
    : Break (Identifier)? eos
    ;

// returnStatement
//     : Return (expressionSequence)? eos
//     ;

// yieldStatement
//     : Yield ({this.notLineTerminator()}? expressionSequence)? eos
//     ;

withStatement
    : With OpenParen expressionSequence CloseParen statement
    ;

switchStatement
    : Switch OpenParen condition CloseParen caseBlock
    ;

caseBlock
    : OpenBrace caseClauses? defaultClause caseClauses? CloseBrace
    ;

caseClauses
    : caseClause+
    ;

caseClause
    : Case expression Colon statementList? Break? SemiColon?
    ;

defaultClause
    : Default Colon statementList? Break? SemiColon?
    ;

labelledStatement
    : Identifier Colon statement
    ;

throwStatement
    // : Throw {this.notLineTerminator()}? expressionSequence eos
    : Throw expressionSequence eos
    ;

tryStatement
    : Try block (catchProduction finallyProduction? | finallyProduction)
    ;

catchProduction
    : Catch OpenParen Identifier CloseParen block
    ;

finallyProduction
    : Finally block
    ;

debuggerStatement
    : Debugger eos
    ;

functionDeclaration
    : Function_ Identifier callSignature ( (OpenBrace functionBody CloseBrace) | SemiColon)
    ;

//Ovveride ECMA
// classDeclaration
//     : Abstract? Class Identifier typeParameters? classHeritage classTail
//     ;

// controllerDeclaration
//     : RESTController ControllerIdentifier formalParameterList '{' restControllerMethodDeclaration restControllerExecuteDeclaration '}' SemiColon?
//     | GraphQLController ControllerIdentifier formalParameterList '{' graphQLOperationAssignment '}' SemiColon?
//     ;
domainFieldDeclaration
: fieldList 
;

isBrokenStatement
: IsBrokenIf OpenParen expression CloseParen SemiColon
;

domainRuleBody
: functionBody isBrokenStatement
;

domainRuleDeclaration
: Rule domainRuleIdentifier formalParameterList? Throws ErrorIdentifier OpenBrace domainRuleBody CloseBrace
;

aggregateDeclaration
 : Root Entity entityIdentifier entityBody SemiColon?
 ;

domainConstDeclaration
    : constDeclaration
    ;

entityDeclaration 
    : Entity entityIdentifier entityBody SemiColon?
;

entityBody
    : OpenBrace domainConstDeclarationList  domainConstructorDeclaration publicMethodDeclarationList privateMethodDeclarationList  CloseBrace
    ;

valueObjectDeclaration 
    : ValueObject valueObjectIdentifier OpenBrace domainConstDeclarationList  domainConstructorDeclaration privateMethodDeclarationList CloseBrace SemiColon?
    ;
domainConstDeclarationList
    : domainConstDeclaration*
    ;

publicMethodDeclarationList
    : publicMethodDeclaration*
    ;

privateMethodDeclarationList
    : privateMethodDeclaration*
    ;

domainConstructorDeclaration
    : Constructor formalParameterList? Colon returnOkErrorType OpenBrace functionBody CloseBrace
    ;

useCaseIdentifier
    : UseCaseIdentifier
    ;

useCaseDeclaration
    : UseCase useCaseIdentifier formalParameterList? OpenBrace useCaseExecuteDeclaration CloseBrace SemiColon?
    ;

propsDeclaration
    : Props PropsIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;

// RepoPort TodoRepoPort<TodoEntity> extends CRUDRepoPort;
repoPortDeclaration
    : RepoPort repoPortIdentifier '<' aggregateRootIdentifier '>' repoExtendsList SemiColon?
    | RepoPort repoPortIdentifier '<' aggregateRootIdentifier '>' repoExtendsList repoPortMethodDefinitions SemiColon?
    ;

repoPortIdentifier
    : RepoPortIdentifier
    ;

//TODO change the order of identifier
// aggregateRootIdentifier
    // : EntityIdentifier
    // | DTOIdentifier
    // | Identifier
    // | UpperCaseIdentifier 
    // ;
aggregateRootIdentifier
    : Identifier
    | UpperCaseIdentifier 
    | EntityIdentifier
    | DTOIdentifier
    ;

repoExtendsList
    : Extends repoPortExtendableIdentifierList
    ;

repoPortMethodDefinitions
    // : '{' '}'
    : OpenBrace methodDefinitionList CloseBrace
    ;

repoPortExtendableIdentifierList
    : (repoPortExtendableIdentifier) (Comma (repoPortExtendableIdentifier))*
    ;

repoPortExtendableIdentifier
    : RepoPortIdentifier
    | UpperCaseIdentifier 
    | UpperCaseIdentifier '<' UpperCaseIdentifier '>'
    ;

dtoDeclaration
    : DTO DTOIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;

structDeclaration
    : Struct UpperCaseIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;

dtoEvaluationIdentifier
    : dtoIdentifier 
    ;

dtoEvaluation
    : dtoEvaluationIdentifier OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen
    ;

valueObjectEvaluation
    : valueObjectIdentifier domainEvaluationInput
    ;

domainEvaluationInput
    : OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen   # DomainEvaluationInputFieldList
    | OpenParen regularEvaluation CloseParen             # DomainEvaluationInputRegular
    ;

entityEvaluation
    : entityIdentifier domainEvaluationInput
    ;

structEvaluationIdentifier
    : UpperCaseIdentifier
    ;

structEvaluation
    : structEvaluationIdentifier OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen
    ;

propsEvaluation
    : OpenBrace OpenParen propsIdentifier (evaluationFieldList) CloseBrace CloseParen
    ;

//TODO make objectLiteral more specific
domainErrorDeclaration
    : DomainError domainErrorIdentifier formalParameterList? objectLiteral SemiColon?
    ;

applicationErrorDeclaration
    : ApplicationError applicationErrorIdentifier formalParameterList? objectLiteral SemiColon?
    ;

domainErrorIdentifier
    : UpperCaseIdentifier;

applicationErrorIdentifier
    : UpperCaseIdentifier;

useCaseExecuteDeclaration
    : Execute formalParameterList? Colon returnOkErrorType OpenBrace functionBody CloseBrace
    ;

restControllerParameters
    : Identifier Comma Identifier
    ;

restControllerExecuteDeclaration
    : Execute OpenParen restControllerParameters CloseParen OpenBrace functionBody CloseBrace
    ;

restControllerMethodDeclaration
    : Method Colon httpMethod SemiColon?
    ;
    
httpMethod
    : MethodGet | MethodPut | MethodPost | MethodDelete | MethodPatch | MethodOptions
    ;


controllerDeclaration
    : RESTController ControllerIdentifier formalParameterList OpenBrace restControllerMethodDeclaration restControllerExecuteDeclaration CloseBrace SemiColon?   # RESTControllerDeclaration
    | GraphQLController ControllerIdentifier formalParameterList OpenBrace graphQLResolverOptions graphQLControllerExecuteDeclaration CloseBrace SemiColon?      # GraphQLControllerDeclaration
    ;

graphQLResolverOptions
    : graphQLOperationTypeAssignment graphQLOperationInputTypeAssignment
    ;

graphQLOperationTypeAssignment
    : GraphQLOperation Colon graphQLOperation SemiColon
    ;
graphQLOperationInputTypeAssignment
    : Input Colon graphQLResolverInputType SemiColon
    ;

graphQLResolverInputType
    : DTOIdentifier;

graphQLOperation
    : OperationMutation
    | OperationQuery
    | OperationSubscription
    ;

graphQLControllerExecuteDeclaration
    : Execute OpenParen graphQLControllerParameters CloseParen Colon graphQLControllerReturnType OpenBrace functionBody CloseBrace
    ;
    // graphQLControllerParameters

graphQLControllerParameters
    : Identifier
    ;

graphQLControllerReturnType
    : DTOIdentifier
    ;

dtoIdentifier
    : DTOIdentifier
    ;

dtoIdentifiers
    :  dtoIdentifier (BitOr dtoIdentifier)*
    ;

errorIdentifier
    : ErrorIdentifier
    ;

errorIdentifiers
    : errorIdentifier (BitOr errorIdentifier)*
    ;

valueObjectIdentifier
    : ValueObjectIdentifier
    ;

entityIdentifier
: EntityIdentifier
;

// aggregateIdentifier
// : AggregateIdentifier
// ;

domainRuleIdentifier
: UpperCaseIdentifier
;

// TODO valueObjectIdentifier inside bitloops identifiers 
// TODO change it to something like this dtoIdentifiers | valueObjectIdentifier | type_
returnOkType
    : OK OpenParen type_ CloseParen
    ;

returnErrorsType
    : Errors OpenParen errorIdentifiers? CloseParen
    ;

returnOkErrorType
    : OpenParen returnOkType Comma returnErrorsType CloseParen
    ;

packagePortIdentifier
    : PackagePortIdentifier
    ;

packagePortDeclaration
    : PackagePort packagePortIdentifier OpenBrace methodDefinitionList CloseBrace
    ;

// classHeritage
//     : classExtendsClause? implementsClause?
//     ;

// classTail
//     :  '{' classElement* '}'
//     ;

classExtendsClause
    : Extends typeReference
    ;

// useCaseTail
//     :  '{' useCaseElement* '}'
//     ;

// implementsClause
//     : Implements classOrInterfaceTypeList
//     ;

// Classes modified
// classElement
//     : constructorDeclaration
//     | decoratorList? propertyMemberDeclaration
//     | indexMemberDeclaration
//     | statement
//     ;

// useCaseElement
//     : executeDeclaration
//     | decoratorList? propertyMemberDeclaration
//     | indexMemberDeclaration
//     | statement
//     ;

// propertyMemberDeclaration
    // : propertyMemberBase propertyName '?'? typeAnnotation? initializer? SemiColon                   # PropertyDeclarationExpression
    // | propertyMemberBase propertyName callSignature ( ('{' functionBody '}') | SemiColon)           # MethodDeclarationExpression
    // | propertyMemberBase (getAccessor | setAccessor)                                                # GetterSetterDeclarationExpression
    // | abstractDeclaration     # AbstractMemberDeclaration

methodDeclaration
    : publicMethodDeclaration            # PublicMethodDeclarationExpression
    | privateMethodDeclaration           # PrivateMethodDeclarationExpression
    ;

privateMethodDeclaration
    : Private? identifier formalParameterList? returnPrivateMethodType OpenBrace functionBody CloseBrace
    ;

publicMethodDeclaration
    : Public? identifier formalParameterList? returnPublicMethodType OpenBrace functionBody CloseBrace    
    ;

returnPublicMethodType
    : Colon returnOkErrorType
    ;

returnPrivateMethodType
    : typeAnnotation | (Colon returnOkErrorType)
;

propertyMemberBase
    : accessibilityModifier? Static?
    ;

indexMemberDeclaration
    : indexSignature SemiColon
    ;

generatorMethod
    : '*'?  Identifier OpenParen formalParameterList? CloseParen OpenBrace functionBody CloseBrace
    ;

generatorFunctionDeclaration
    : Function_ '*' Identifier? OpenParen formalParameterList? CloseParen OpenBrace functionBody CloseBrace
    ;

generatorBlock
    : OpenBrace generatorDefinition (Comma generatorDefinition)* Comma? CloseBrace
    ;

generatorDefinition
    : '*' iteratorDefinition
    ;

iteratorBlock
    : OpenBrace iteratorDefinition (Comma iteratorDefinition)* Comma? CloseBrace
    ;

iteratorDefinition
    : '[' expression ']' OpenParen formalParameterList? CloseParen OpenBrace functionBody CloseBrace
    ;

formalParameterList
    : OpenParen CloseParen 
    | OpenParen
    (
    formalParameterArg (Comma formalParameterArg)* (Comma lastFormalParameterArg)?
    | lastFormalParameterArg
    | arrayLiteral                              // ECMAScript 6: Parameter Context Matching
    | objectLiteral (Colon formalParameterList )? // ECMAScript 6: Parameter Context Matching
    )?
    CloseParen 
    ;

formalParameterArg
    : decorator? accessibilityModifier? identifierOrKeyWord typeAnnotation? ('=' expression)?      // ECMAScript 6: Initialization
    ;

lastFormalParameterArg                        // ECMAScript 6: Rest Parameter
    : Ellipsis Identifier
    ;

functionBody
    : statementList?
    ;

// sourceElements
//     : sourceElement+
//     ;

arrayLiteral
    : ('[' elementList? ']')
    ;

elementList
    : arrayElement (Comma+ arrayElement)*
    ;

arrayElement                      // ECMAScript 6: Spread Operator
    : Ellipsis? (expression | Identifier) Comma?
    ;

objectLiteral
    : OpenBrace (propertyAssignment (Comma propertyAssignment)* Comma?)? CloseBrace
    ;

functionParameters
    : (propertyAssignment (Comma propertyAssignment)* Comma?)
    ;

regularVariableEvaluationORliteralORexpression
    : regularVariableEvaluation 
    | literal 
    | expression
    ;

// MODIFIED
propertyAssignment
    : propertyName (Colon |'=') regularVariableEvaluationORliteralORexpression                # PropertyExpressionAssignment
    | '[' regularVariableEvaluationORliteralORexpression ']' Colon regularVariableEvaluationORliteralORexpression           # ComputedPropertyExpressionAssignment
    | getAccessor                                             # PropertyGetter
    | setAccessor                                             # PropertySetter
    | generatorMethod                                         # MethodProperty
    | identifierOrKeyWord                                     # PropertyShorthand
    | restParameter                                           # RestParameterInObject
    ;

getAccessor
    : getter OpenParen CloseParen typeAnnotation? OpenBrace functionBody CloseBrace
    ;

setAccessor
    : setter OpenParen ( Identifier | bindingPattern) typeAnnotation? CloseParen OpenBrace functionBody CloseBrace
    ;

propertyName
    : identifierName
    | StringLiteral
    | numericLiteral
    ;

arguments
    : OpenParen (argumentList Comma?)? CloseParen
    ;

argumentList
    : argument (Comma argument)*
    ;

argument                      // ECMAScript 6: Spread Operator
    : Ellipsis? (regularVariableEvaluationORliteralORexpression)
    ;

expressionSequence
    : expression (Comma expression)*
    ;

functionExpressionDeclaration
    : Function_ Identifier? OpenParen formalParameterList? CloseParen typeAnnotation? OpenBrace functionBody CloseBrace
    ;

expression
    : Not expression                                             # NotExpression
    | OpenParen expression CloseParen                                         # ParenthesizedExpression
    | expression op=('*' | '/' | '%') expression                 # MultiplicativeExpression
    | expression op=('+' | '-') expression                       # AdditiveExpression
    | expression op=('<' | '>' | '<=' | '>=') expression         # RelationalExpression
    | expression op=('==' | '!=' ) expression                    # EqualityExpression
    | expression op=And expression                               # LogicalAndExpression
    | expression op=Or expression                                # LogicalOrExpression
    | expression op=Xor expression                               # LogicalXorExpression
    | This                                                       # ThisExpression
    | evaluation                                                 # EvaluationExpression 
    ;   

// more single expressions
    // | functionExpressionDeclaration                                          # FunctionExpression
    // | arrowFunctionDeclaration                                               # ArrowFunctionExpression   // ECMAScript 6
    // | Class Identifier? classTail                                            # ClassExpression
    // | UseCase Identifier? useCaseTail                                        # UseCaseExpression
    // | expression '[' expressionSequence ']'                            # MemberIndexExpression
    // Split to try `new Date()` first, then `new Date`.
    // | New expression typeArguments? arguments                          # NewExpression
    // | New expression typeArguments?                                    # NewExpression
    // | expression arguments                                             # ArgumentsExpression
    // | expression {this.notLineTerminator()}? '++'                      # PostIncrementExpression
    // | expression {this.notLineTerminator()}? '--'                      # PostDecreaseExpression
    // | expression '++'                      # PostIncrementExpression
    // | expression '--'                      # PostDecreaseExpression
    // | Delete expression                                                # DeleteExpression
    // | Void expression                                                  # VoidExpression
    // | Typeof expression                                                # TypeofExpression
    // | '++' expression                                                  # PreIncrementExpression
    // | '--' expression                                                  # PreDecreaseExpression
    // | '+' expression                                                   # UnaryPlusExpression
    // | '-' expression                                                   # UnaryMinusExpression
    // | '~' expression                                                   # BitNotExpression
    // | '!' expression                                                   # NotExpression
    // | expression ('<<' | '>>' | '>>>') expression                # BitShiftExpression
    // | expression Instanceof expression                           # InstanceofExpression
    // | expression In expression                                   # InExpression
    // | expression '&' expression                                  # BitAndExpression
    // | expression '^' expression                                  # BitXOrExpression
    // | expression '|' expression                                  # BitOrExpression
    // | expression '&&' expression                                 # LogicalAndExpression
    // | expression '||' expression                                 # LogicalOrExpression
    // | expression '?' expression ':' expression             # TernaryExpression
    // | expression '=' expression                                  # AssignmentExpression
    // | expression assignmentOperator expression                   # AssignmentOperatorExpression
    // | expression templateStringLiteral                                 # TemplateStringExpression  // ECMAScript 6
    // | iteratorBlock                                                          # IteratorsExpression // ECMAScript 6
    // | generatorBlock                                                         # GeneratorsExpression // ECMAScript 6
    // | generatorFunctionDeclaration                                           # GeneratorsFunctionExpression // ECMAScript 6
    // | yieldStatement                                                         # YieldExpression // ECMAScript 6
    // | Super                                                                  # SuperExpression
    // | arrayLiteral                                                           # ArrayLiteralExpression
    // | objectLiteral                                                          # ObjectLiteralExpression
    // | '(' expressionSequence ')'                                             # ParenthesizedExpression
    // | typeArguments expressionSequence?                                      # GenericTypes
    // | expression As asExpression                                       # CastAsExpression

asExpression
    : predefinedType ('[' ']')?
    | expression
    ;

arrowFunctionDeclaration
    : Async? arrowFunctionParameters typeAnnotation? '=>' arrowFunctionBody
    ;

arrowFunctionParameters
    : Identifier
    | OpenParen formalParameterList? CloseParen
    ;

arrowFunctionBody
    : expression
    | OpenBrace functionBody CloseBrace
    ;

assignmentOperator
    : '*='
    | '/='
    | '%='
    | '+='
    | '-='
    | '<<='
    | '>>='
    | '>>>='
    | '&='
    | '^='
    | '|='
    ;

literal
    : NullLiteral               # NullLiteral
    | BooleanLiteral            # BooleanLiteral
    | StringLiteral             # StringLiteral
    | templateStringLiteral     # TemplateStringLiteralLabel
    | RegularExpressionLiteral  # RegularExpressionLiteral
    | numericLiteral            # NumericLiteralLabel
    ;

templateStringLiteral
    : BackTick templateStringAtom* BackTick
    ;

templateStringAtom
    : TemplateStringAtom
    | TemplateStringStartExpression expression TemplateCloseBrace
    ;

numericLiteral
    : IntegerLiteral        #IntegerLiteral
    | DecimalLiteral        #DecimalLiteral
    // | HexIntegerLiteral     #HexIntegerLiteral
    // | OctalIntegerLiteral   #OctalIntegerLiteral
    // | OctalIntegerLiteral2  #OctalIntegerLiteral2
    // | BinaryIntegerLiteral  #BinaryIntegerLiteral
    ;


identifierName
    : Identifier
    ;

identifierOrKeyWord
    : Identifier
    | TypeAlias
    // | Require
    ;

reservedWord
    : keyword
    | NullLiteral
    | BooleanLiteral
    ;

keyword
    : Break
    | Do
    | Instanceof
    | Typeof
    | Case
    | Else
    | New
    | Var
    | Catch
    | Finally
    | Return
    | Void
    | Continue
    | For
    | Switch
    | While
    | Debugger
    | Function_
    | This
    | With
    | Default
    | If
    | Throw
    | Delete
    | In
    | Try
    | ReadOnly
    | Async
    | From
    | UseCase
    // | Class
    // | Enum
    | Extends
    // | Super
    | Const
    // | Export
    // | Import
    // | Implements
    | Let
    | Private
    | Public
    // | Interface
    // | Package
    | Protected
    | Static
    // | Yield
    | Get
    | Set
    // | Require
    | TypeAlias
    | String
    ;

getter
    : Get propertyName
    ;

setter
    : Set propertyName
    ;

eos
    : SemiColon
    | EOF
    // | {this.lineTerminatorAhead()}?
    // | {this.closeBrace()}?
    ;

isInstanceOf: regularVariableEvaluation Is classTypes SemiColon?;

classTypes: ErrorClass;
