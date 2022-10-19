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
    : typeParameter (',' typeParameter)*
    ;

fieldList
    : field (';' field)* SemiColon
    ;

evaluationFieldList
    : evaluationField (',' evaluationField)*
    ;

evaluationField
    : Identifier ':' expression
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
    : '{' fieldList? '}'
    ;

typeArgumentList
    : typeArgument (',' typeArgument)*
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
    : '(' type_ ')'                                 #ParenthesizedPrimType
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
    ;
// regularVariableEvaluation | regularStringEvaluation |

methodArguments
    : '(' (argumentList (',' argumentList)*)? ')'
    ;

openParen:
    | OpenParen
    ;

closeParen:
    | CloseParen
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
    : '{' typeBody? '}'
    ;

typeBody
    : typeMemberList (SemiColon | ',')?
    ;

typeMemberList
    : typeMember ((SemiColon | ',') typeMember)*
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
    : type_ (',' type_)*
    ;

functionType
    : typeParameters? '(' parameterList? ')' '=>' type_
    ;

constructorType
    : 'new' typeParameters? '(' parameterList? ')' '=>' type_
    ;

typeQuery
    : 'typeof' typeQueryExpression
    ;

typeQueryExpression
    : Identifier
    | (identifierName '.')+ identifierName
    ;

propertySignatur
    : ReadOnly? propertyName '?'? typeAnnotation? ('=>' type_)?
    ;

typeAnnotation
    : ':' type_
    ;

callSignature
    : typeParameters? '(' parameterList? ')' typeAnnotation?
    ;

parameterList
    : restParameter
    | parameter (',' parameter)* (',' restParameter)?
    ;

requiredParameterList
    : requiredParameter (',' requiredParameter)*
    ;

parameter
    : requiredParameter
    | optionalParameter
    ;

optionalParameter
    : decoratorList? ( accessibilityModifier? identifierOrPattern ('?' typeAnnotation? | typeAnnotation? initializer))
    ;

restParameter
    : '...' expression typeAnnotation?
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
    : 'new' typeParameters? '(' parameterList? ')' typeAnnotation?
    ;

indexSignature
    : '[' Identifier ':' (Int32|String) ']' typeAnnotation
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
    : typeReference (',' typeReference)*
    ;

// A.7 Interface

// enumDeclaration
//     : Const? Enum Identifier '{' enumBody? '}'
//     ;

enumBody
    : enumMemberList ','?
    ;

enumMemberList
    : enumMember (',' enumMember)*
    ;

enumMember
    : propertyName ('=' expression)?
    ;

// A.8 Namespaces

namespaceDeclaration
    : Namespace namespaceName '{' statementList? '}'
    ;

namespaceName
    : Identifier ('.'+ Identifier)*
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
    | decoratorMemberExpression '.' identifierName
    | '(' expression ')'
    ;

decoratorCallExpression
    : decoratorMemberExpression arguments;

// ECMAPart
program
    : sourceElement*
    // : sourceElements?
    // sourceElements? EOF?
    ;

sourceElements
    : sourceElement+
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
    : JestTestFunctionBody '{' functionBody '}' SemiColon?       
    // JestTestExecute '{' functionBody '}' SemiColon?      
    | JestTestStatementList '{' statementList '}' SemiColon?    
    | JestTestStatement '{' statement SemiColon? '}' SemiColon? 
    | JestTestStructEvaluation '{' structEvaluation ';'? '}'  ';'?  
    | JestTestDTOEvaluation '{' dtoEvaluation ';'? '}'  ';'?    
    | JestTestEvaluation '{' evaluation ';'? '}'  ';'?  
    | JestTest '{' regularEvaluation SemiColon? '}' SemiColon?  
    | JestTest '{' formalParameterList '}' SemiColon?   
    | JestTest '{' restControllerParameters '}'     
    | JestTest '{' restControllerExecuteDeclaration '}'    
    | JestTest '{' restControllerMethodDeclaration '}'  
    | JestTestReturnOkErrorType '{' returnOkErrorType '}' SemiColon?    
    | JestTestConstDeclaration '{' constDeclaration '}' SemiColon?  
    | JestTestExpression '{' expression '}' SemiColon?  
    | JestTestMethodDefinitionList '{' methodDefinitionList '}' SemiColon?
    | JestTestCreateMethodDeclaration '{' domainConstructorDeclaration '}' SemiColon?
    | JestTestPrivateMethodDeclaration '{' privateMethodDeclaration '}' SemiColon?
    | JestTestPublicMethodDeclaration '{' publicMethodDeclaration '}' SemiColon?
    | JestTestValueObjectDeclaration '{' valueObjectDeclaration '}' SemiColon?
    | JestTestEntityDeclaration '{' entityDeclaration '}' SemiColon?
    | JestTestCondition '{' condition '}' SemiColon?
    | JestTestVariableDeclaration '{' variableDeclaration '}' SemiColon?
    | JestTestThisDeclaration '{' thisDeclaration '}' SemiColon?
    | JestTestValueObjectEvaluation '{' valueObjectEvaluation '}' SemiColon?
    | JestTestEntityEvaluation '{' entityEvaluation '}' SemiColon?
    ;

evaluation
    : regularEvaluation
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
    : ApplyRules '(' applyRuleStatementRulesList ')' SemiColon?
    ;

applyRuleStatementRulesList
    : applyRulesRule (',' applyRulesRule)*
    ;

applyRulesRule
    : domainRuleIdentifier formalParameterList
    ;

block
    : '{' statementList? '}'
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
    : (identifierName ',')? '{' identifierName (',' identifierName)* '}'
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
    : variableDeclaration (',' variableDeclaration)*
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
    : If '(' expression ')' statement (Else statement)?
    ;


iterationStatement
    : Do statement While '(' expressionSequence ')' eos                                                         # DoStatement
    | While '(' expressionSequence ')' statement                                                                # WhileStatement
    | For '(' expressionSequence? SemiColon expressionSequence? SemiColon expressionSequence? ')' statement     # ForStatement
    | For '(' varModifier variableDeclarationList SemiColon expressionSequence? SemiColon expressionSequence? ')'
          statement                                                                                             # ForVarStatement
    // | For '(' expression (In | Identifier{this.p("of")}?) expressionSequence ')' statement                # ForInStatement
    // | For '(' varModifier variableDeclaration (In | Identifier{this.p("of")}?) expressionSequence ')' statement # ForVarInStatement
    | For '(' expression (In | Identifier?) expressionSequence ')' statement                # ForInStatement
    | For '(' varModifier variableDeclaration (In | Identifier?) expressionSequence ')' statement # ForVarInStatement
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
    : With '(' expressionSequence ')' statement
    ;

switchStatement
    : Switch '(' expression ')' caseBlock
    ;

caseBlock
    : '{' caseClauses? defaultClause caseClauses? '}'
    ;

caseClauses
    : caseClause+
    ;

caseClause
    : Case expression ':' statementList? Break? SemiColon?
    ;

defaultClause
    : Default ':' statementList? Break? SemiColon?
    ;

labelledStatement
    : Identifier ':' statement
    ;

throwStatement
    // : Throw {this.notLineTerminator()}? expressionSequence eos
    : Throw expressionSequence eos
    ;

tryStatement
    : Try block (catchProduction finallyProduction? | finallyProduction)
    ;

catchProduction
    : Catch '(' Identifier ')' block
    ;

finallyProduction
    : Finally block
    ;

debuggerStatement
    : Debugger eos
    ;

functionDeclaration
    : Function_ Identifier callSignature ( ('{' functionBody '}') | SemiColon)
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
: IsBrokenIf '(' expression ')' SemiColon
;

domainRuleBody
: functionBody isBrokenStatement
;

domainRuleDeclaration
: Rule domainRuleIdentifier formalParameterList? Throws ErrorIdentifier '{' domainRuleBody '}'
;

aggregateDeclaration
 : Root entityDeclaration
 ;

domainConstDeclaration
    : constDeclaration
    ;

entityDeclaration 
    : Entity entityIdentifier '{' domainConstDeclarationList  domainConstructorDeclaration publicMethodDeclarationList privateMethodDeclarationList  '}' SemiColon?
;

valueObjectDeclaration 
    : ValueObject valueObjectIdentifier '{' domainConstDeclarationList  domainConstructorDeclaration privateMethodDeclarationList '}' SemiColon?
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
    : Constructor formalParameterList? ':' returnOkErrorType '{' functionBody '}'
    ;

useCaseIdentifier
    : UseCaseIdentifier
    ;

useCaseDeclaration
    : UseCase useCaseIdentifier formalParameterList? '{' useCaseExecuteDeclaration '}' SemiColon?
    ;

propsDeclaration
    : Props PropsIdentifier '{' fieldList '}' SemiColon?
    ;

// RepoPort TodoRepoPort<TodoEntity> extends CRUDRepoPort;
repoPortDeclaration
    : RepoPort repoPortIdentifier '<' aggregateRootIdentifier '>' repoExtendsList SemiColon?
    | RepoPort repoPortIdentifier '<' aggregateRootIdentifier '>' repoExtendsList repoPortMethodDefinitions SemiColon?
    ;

repoPortIdentifier
    : RepoPortIdentifier
    ;

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
    : '{' methodDefinitionList '}'
    ;

repoPortExtendableIdentifierList
    : (repoPortExtendableIdentifier) (',' (repoPortExtendableIdentifier))*
    ;

repoPortExtendableIdentifier
    : RepoPortIdentifier
    | UpperCaseIdentifier 
    | UpperCaseIdentifier '<' UpperCaseIdentifier '>'
    ;

dtoDeclaration
    : DTO DTOIdentifier '{' fieldList '}' SemiColon?
    ;

structDeclaration
    : Struct UpperCaseIdentifier '{' fieldList '}' ';'?
    ;

dtoEvaluationIdentifier
    : dtoIdentifier 
    ;

dtoEvaluation
    : dtoEvaluationIdentifier '(' '{' evaluationFieldList '}' ')'
    ;

valueObjectEvaluation
    : valueObjectIdentifier domainEvaluationInput
    ;

domainEvaluationInput
    : '(' '{' evaluationFieldList '}' ')'   # DomainEvaluationInputFieldList
    | '(' regularEvaluation ')'             # DomainEvaluationInputRegular
    ;

entityEvaluation
    : entityIdentifier domainEvaluationInput
    ;

structEvaluationIdentifier
    : UpperCaseIdentifier
    ;

structEvaluation
    : structEvaluationIdentifier '(' '{' evaluationFieldList '}' ')'
    ;

propsEvaluation
    : '{' '(' propsIdentifier (evaluationFieldList) '}' ')'
    ;

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
    : Execute formalParameterList? ':' returnOkErrorType '{' functionBody '}'
    ;

restControllerParameters
    : Identifier ',' Identifier
    ;

restControllerExecuteDeclaration
    : Execute '(' restControllerParameters ')' '{' functionBody '}'
    ;

restControllerMethodDeclaration
    : Method ':' httpMethod SemiColon?
    ;
    
httpMethod
    : MethodGet | MethodPut | MethodPost | MethodDelete | MethodPatch | MethodOptions
    ;


controllerDeclaration
    : RESTController ControllerIdentifier formalParameterList '{' restControllerMethodDeclaration restControllerExecuteDeclaration '}' SemiColon?   # RESTControllerDeclaration
    | GraphQLController ControllerIdentifier formalParameterList '{' graphQLResolverOptions graphQLControllerExecuteDeclaration '}' SemiColon?      # GraphQLControllerDeclaration
    ;

graphQLResolverOptions
    : graphQLOperationTypeAssignment graphQLOperationInputTypeAssignment
    ;

graphQLOperationTypeAssignment
    : GraphQLOperation Colon graphQLOperation SemiColon
    ;
graphQLOperationInputTypeAssignment
    : Input ':' graphQLResolverInputType SemiColon
    ;

graphQLResolverInputType
    : DTOIdentifier;

graphQLOperation
    : OperationMutation
    | OperationQuery
    | OperationSubscription
    ;

graphQLControllerExecuteDeclaration
    : Execute '(' graphQLControllerParameters ')' ':' graphQLControllerReturnType '{' functionBody '}'
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
    : WS* dtoIdentifier ( WS* BitOr WS* dtoIdentifier)*
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
    : PackagePort packagePortIdentifier '{' methodDefinitionList '}'
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
    : Private? identifier formalParameterList? returnPrivateMethodType '{' functionBody '}'
    ;

publicMethodDeclaration
    : Public? identifier formalParameterList? returnPublicMethodType '{' functionBody '}'    
    ;

returnPublicMethodType
    : ':' returnOkErrorType
    ;

returnPrivateMethodType
    : typeAnnotation | (':' returnOkErrorType)
;

propertyMemberBase
    : accessibilityModifier? Static?
    ;

indexMemberDeclaration
    : indexSignature SemiColon
    ;

generatorMethod
    : '*'?  Identifier '(' formalParameterList? ')' '{' functionBody '}'
    ;

generatorFunctionDeclaration
    : Function_ '*' Identifier? '(' formalParameterList? ')' '{' functionBody '}'
    ;

generatorBlock
    : '{' generatorDefinition (',' generatorDefinition)* ','? '}'
    ;

generatorDefinition
    : '*' iteratorDefinition
    ;

iteratorBlock
    : '{' iteratorDefinition (',' iteratorDefinition)* ','? '}'
    ;

iteratorDefinition
    : '[' expression ']' '(' formalParameterList? ')' '{' functionBody '}'
    ;

formalParameterList
    : '()' 
    | '('
    (
    formalParameterArg (',' formalParameterArg)* (',' lastFormalParameterArg)?
    | lastFormalParameterArg
    | arrayLiteral                              // ECMAScript 6: Parameter Context Matching
    | objectLiteral (':' formalParameterList )? // ECMAScript 6: Parameter Context Matching
    )?
    ')' 
    | '(' ')'
    ;

formalParameterArg
    : WS* decorator? WS* accessibilityModifier? WS* identifierOrKeyWord WS* typeAnnotation? WS* ('=' WS* expression WS*)?      // ECMAScript 6: Initialization
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
    : arrayElement (','+ arrayElement)*
    ;

arrayElement                      // ECMAScript 6: Spread Operator
    : Ellipsis? (expression | Identifier) ','?
    ;

objectLiteral
    : '{' (propertyAssignment (',' propertyAssignment)* ','?)? '}'
    ;

functionParameters
    : (propertyAssignment (',' propertyAssignment)* ','?)
    ;

regularVariableEvaluationORliteralORexpression
    : regularVariableEvaluation 
    | literal 
    | expression
    ;

// MODIFIED
propertyAssignment
    : propertyName (':' |'=') regularVariableEvaluationORliteralORexpression                # PropertyExpressionAssignment
    | '[' regularVariableEvaluationORliteralORexpression ']' ':' regularVariableEvaluationORliteralORexpression           # ComputedPropertyExpressionAssignment
    | getAccessor                                             # PropertyGetter
    | setAccessor                                             # PropertySetter
    | generatorMethod                                         # MethodProperty
    | identifierOrKeyWord                                     # PropertyShorthand
    | restParameter                                           # RestParameterInObject
    ;

getAccessor
    : getter '(' ')' typeAnnotation? '{' functionBody '}'
    ;

setAccessor
    : setter '(' ( Identifier | bindingPattern) typeAnnotation? ')' '{' functionBody '}'
    ;

propertyName
    : identifierName
    | StringLiteral
    | numericLiteral
    ;

arguments
    : '(' (argumentList ','?)? ')'
    ;

argumentList
    : argument (',' argument)*
    ;

argument                      // ECMAScript 6: Spread Operator
    : Ellipsis? (regularVariableEvaluationORliteralORexpression)
    ;

expressionSequence
    : expression (',' expression)*
    ;

functionExpressionDeclaration
    : Function_ Identifier? '(' formalParameterList? ')' typeAnnotation? '{' functionBody '}'
    ;

expression
    : Not expression                                             # NotExpression
    | '(' expression ')'                                         # ParenthesizedExpression
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
    | '(' formalParameterList? ')'
    ;

arrowFunctionBody
    : expression
    | '{' functionBody '}'
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
