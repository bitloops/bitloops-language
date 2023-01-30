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

fieldList
    : field (SemiColon field)* SemiColon
    ;

evaluationFieldList
    : evaluationField (',' evaluationField)* ','?
    ;

evaluationField
    : identifier Colon expression
    ;

propFields
    : OpenBrace fieldList? CloseBrace
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
    | RepoPortIdentifier
    | ReadModelIdentifier
    | structIdentifier
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


regularErrorTypeEvaluation
    : errorIdentifier
    ;

methodArguments
    : OpenParen argumentList? CloseParen
    ;

openParen
    : OpenParen
    ;

closeParen
    :  CloseParen
    ;

regularIdentifier
    : Identifier                                                # IdentifierString
    | regularDTOEvaluation                                      # RegularDTOEvaluationString
    | regularStructEvaluation                                   # RegularStructEvaluationString
    | regularErrorTypeEvaluation                                # RegularErrorTypeEvaluationString
    // This has to be here since it is declared as a reserved word in Lexer, it doesnt match as Identifier
    | Execute                                                   # ExecuteExpression
    | Delete                                                    # DeleteKeyword
    | serverType                                                # ServerTypeExpression
    ;

regularStructEvaluation
    : UpperCaseIdentifier
    ;

regularDTOEvaluation
    : DTOIdentifier
    ;

optional
    : Optional;

field
    : optional? bitloopsPrimaryType identifier
    ;

bitloopsPrimaryType:
  bitloopsPrimaryTypeValues
  ;

bitloopsPrimaryTypeValues
    : primitives                                        #PrimitivePrimType
    | bitloopsBuiltInClass                              #BitloopsBuiltInClassPrimType
    | bitloopsPrimaryTypeValues OpenBracket CloseBracket      #ArrayBitloopsPrimType
    | bitloopsIdentifiers                               #BitloopsIdentifierPrimType
    ;

bitloopsBuiltInClass
    : UUIDv4
    ;

methodDefinitionList
    : methodDefinition*
    ;

methodDefinition
    : identifier parameterList? typeAnnotation SemiColon
    ;

typeAnnotation
    : Colon bitloopsPrimaryType
    ;


accessibilityModifier
    : Public
    | Private
    // | Protected
    ;

coreProgram
    : sourceElement*
    // : sourceElements?
    // sourceElements? EOF?
    ;

setupProgram
    : setupStatement*  // # setupStatements
    // | EOF?           // # eof
    ;

program
    : setupProgram
    | coreProgram
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
    | domainRuleDeclaration
    | entityDeclaration
    | aggregateDeclaration
    | repoPortDeclaration
    | readModelDeclaration
    ;

// TODO fix JestTestReturnOkErrorType
jestTestDeclaration
    : JestTestFunctionBody OpenBrace functionBody CloseBrace SemiColon?       
    | JestTestStatementList OpenBrace statementList CloseBrace SemiColon?    
    | JestTestStatement OpenBrace statement SemiColon? CloseBrace SemiColon? 
    | JestTestStructEvaluation OpenBrace structEvaluation SemiColon? CloseBrace  SemiColon?  
    | JestTestDTOEvaluation OpenBrace dtoEvaluation SemiColon? CloseBrace  SemiColon?    
    | JestTestEvaluation OpenBrace evaluation SemiColon? CloseBrace  SemiColon?  
    | JestTest OpenBrace parameterList CloseBrace SemiColon?   
    | JestTest OpenBrace restControllerParameters CloseBrace     
    | JestTest OpenBrace restControllerExecuteDeclaration CloseBrace    
    | JestTest OpenBrace restControllerMethodDeclaration CloseBrace  
    | JestTestBuiltInClass OpenBrace builtInClassEvaluation CloseBrace 
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
    | JestTestValueObjectEvaluation OpenBrace valueObjectEvaluation CloseBrace SemiColon?
    | JestTestEntityEvaluation OpenBrace entityEvaluation CloseBrace SemiColon?
    | JestTestBuiltInFunction OpenBrace builtInFunction CloseBrace SemiColon?
    | JestTestBitloopsPrimaryType OpenBrace bitloopsPrimaryType CloseBrace SemiColon?
    | JestTestReturnStatement OpenBrace returnStatement CloseBrace SemiColon?  
    ;

errorEvaluation
    : errorIdentifier methodArguments SemiColon?
    ;

evaluation
    : builtInClassEvaluation
    | corsOptionsEvaluation
    | errorEvaluation
    | dtoEvaluation
    | valueObjectEvaluation
    | entityEvaluation
    | propsEvaluation
    | structEvaluation
    ;

corsOptionsEvaluation
    : CorsOptions OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen 
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

statement                       
    : expression    
    | variableDeclaration
    | constDeclaration
    | emptyStatement_
    | propsDeclaration
    | ifStatement
    | breakStatement
    | switchStatement
    | returnStatement
    | builtInFunction // Using semantic analysis, allow it only inside domain
    ;

builtInFunction
    : ApplyRules OpenParen applyRuleStatementRulesList CloseParen SemiColon? # ApplyRulesStatement
    ;

applyRuleStatementRulesList
    : applyRulesRule (Comma applyRulesRule)*
    ;

applyRulesRule
    : domainRuleIdentifier methodArguments
    ;

statementList
    : statement+ SemiColon?
    ;

variableDeclarationList
    : variableDeclaration (Comma variableDeclaration)*
    ;

emptyStatement_
    : SemiColon
    ;

ifStatement
    : If OpenParen condition CloseParen OpenBrace statementList CloseBrace (Else OpenBrace statementList CloseBrace)?
    ;

breakStatement
    : Break (Identifier)? eos
    ;

switchStatement
    : Switch OpenParen condition CloseParen OpenBrace caseClauses? defaultClause CloseBrace
    ;

caseClauses
    : caseClause+
    ;

caseClause
    : Case expression Colon OpenBrace statementList? CloseBrace SemiColon?
    | Case expression Colon statementList? SemiColon?
    ;

defaultClause
    : Default Colon OpenBrace statementList? CloseBrace SemiColon?
    | Default Colon statementList? SemiColon?
    ;

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
: Rule domainRuleIdentifier parameterList? Throws errorIdentifier OpenBrace domainRuleBody CloseBrace
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
    : OpenBrace domainConstDeclarationList? domainConstructorDeclaration publicMethodDeclarationList? privateMethodDeclarationList?  CloseBrace
    ;

valueObjectDeclaration 
    : ValueObject valueObjectIdentifier OpenBrace domainConstDeclarationList?  domainConstructorDeclaration privateMethodDeclarationList? CloseBrace SemiColon?
    ;
domainConstDeclarationList
    : domainConstDeclaration+
    ;

publicMethodDeclarationList
    : publicMethodDeclaration+
    ;

privateMethodDeclarationList
    : privateMethodDeclaration+
    ;

domainConstructorParam 
    : id=Identifier Colon type=PropsIdentifier
    ;

domainConstructorDeclaration
    : Constructor OpenParen domainConstructorParam CloseParen Colon returnOkErrorType OpenBrace functionBody CloseBrace
    ;

useCaseIdentifier
    : UseCaseIdentifier
    ;

useCaseDeclaration
    : UseCase useCaseIdentifier parameterList? OpenBrace useCaseExecuteDeclaration CloseBrace SemiColon?
    ;

propsDeclaration
    : Props propsIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;


readModelIdentifier
    : ReadModelIdentifier
    ;


readModelDeclaration
    : ReadModel readModelIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;

repoPortDeclaration
    : RepoPort repoPortIdentifier '<' readModelIdentifier '>' repoExtendsList SemiColon?
    | RepoPort repoPortIdentifier '<' readModelIdentifier '>' repoExtendsList repoPortMethodDefinitions SemiColon?
    | RepoPort repoPortIdentifier '<' entityIdentifier '>' repoExtendsList SemiColon?
    | RepoPort repoPortIdentifier '<' entityIdentifier '>' repoExtendsList repoPortMethodDefinitions SemiColon?
    ;

repoPortIdentifier
    : RepoPortIdentifier
    ;

repoExtendsList
    : Extends repoPortExtendableIdentifierList
    ;

repoPortMethodDefinitions
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
    : DTO dtoIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;

structIdentifier 
    : UpperCaseIdentifier
    ;

structDeclaration
    : Struct structIdentifier OpenBrace fieldList CloseBrace SemiColon?
    ;

dtoEvaluation
    : dtoIdentifier OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen
    ;

valueObjectEvaluation
    : valueObjectIdentifier domainEvaluationInput
    ;

domainEvaluationInput
    : OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen     # DomainEvaluationInputFieldList
    | OpenParen expression CloseParen                                   # DomainEvaluationInputRegular
    ;

entityEvaluation
    : entityIdentifier domainEvaluationInput
    ;

structEvaluation
    : structIdentifier OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen
    ;
    
builtInClassEvaluation
    : bitloopsBuiltInClass (Dot identifier)? methodArguments SemiColon?
    ;

propsEvaluation
    : OpenBrace OpenParen propsIdentifier (evaluationFieldList) CloseParen CloseBrace
    ;

domainErrorDeclaration
    : DomainError domainErrorIdentifier parameterList? '{' evaluationFieldList? '}' SemiColon?
    ;

applicationErrorDeclaration
    : ApplicationError applicationErrorIdentifier parameterList? '{' evaluationFieldList? '}' SemiColon?
    ;

domainErrorIdentifier
    : DomainErrorIdentifier;

applicationErrorIdentifier
    : DomainErrorIdentifier;

useCaseExecuteDeclaration
    : Execute OpenParen parameter? CloseParen Colon returnOkErrorType OpenBrace functionBody CloseBrace
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
    : RESTController restControllerIdentifier parameterList OpenBrace restControllerMethodDeclaration restControllerExecuteDeclaration CloseBrace SemiColon?   # RESTControllerDeclaration
    | GraphQLController graphQLControllerIdentifier parameterList OpenBrace graphQLResolverOptions graphQLControllerExecuteDeclaration CloseBrace SemiColon?      # GraphQLControllerDeclaration
    ;

restControllerIdentifier
    : ControllerIdentifier
    ;

graphQLControllerIdentifier
    : ControllerIdentifier
    ;

graphQLResolverOptions
    : graphQLOperationTypeAssignment graphQLOperationInputTypeAssignment?
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

domainRuleIdentifier
: RuleIdentifier
;

returnOkType
    : OK OpenParen bitloopsPrimaryType CloseParen
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

methodDeclaration
    : publicMethodDeclaration            # PublicMethodDeclarationExpression
    | privateMethodDeclaration           # PrivateMethodDeclarationExpression
    ;

privateMethodDeclaration
    : Private? identifier parameterList? returnPrivateMethodType OpenBrace functionBody CloseBrace
    ;

publicMethodDeclaration
    : Public? identifier parameterList? returnPublicMethodType OpenBrace functionBody CloseBrace    
    ;

returnPublicMethodType
    : Colon returnOkErrorType
    ;

returnPrivateMethodType
    : typeAnnotation | (Colon returnOkErrorType)
;

parameterList
    : OpenParen CloseParen 
    | OpenParen
    (
    parameter (Comma parameter)* 
    )?
    CloseParen 
    ;

parameter
    : accessibilityModifier? parameterIdentifier typeAnnotation? 
    ;

parameterIdentifier
    : Identifier
    ;

functionBody
    : statementList?
    ;

arrayLiteral
    : OpenBracket elementList? CloseBracket
    ;

elementList
    : expression (Comma expression)*
    ;

// arguments
//     : OpenParen (argumentList Comma?)? CloseParen
//     ;

argumentList
    : argument (Comma argument)*
    ;

argument 
    : expression
    ;

expression
    : Not expression                                             # NotExpression
    | OpenParen expression CloseParen                            # ParenthesizedExpression
    | expression Dot regularIdentifier                           # MemberDotExpression
    | expression methodArguments                                 # MethodCallExpression
    | expression Dot GetClass OpenParen CloseParen               # GetClassExpression
    | expression Dot ToString OpenParen CloseParen               # ToStringExpression
    | expression op=('*' | '/' | '%') expression                 # MultiplicativeExpression
    | expression op=('+' | '-') expression                       # AdditiveExpression
    | expression op=('<' | '>' | '<=' | '>=') expression         # RelationalExpression
    | expression op=('==' | '!=' ) expression                    # EqualityExpression
    | expression op=And expression                               # LogicalAndExpression
    | expression op=Or expression                                # LogicalOrExpression
    | expression op=Xor expression                               # LogicalXorExpression
    | expression '=' expression                                  # AssignmentExpression
    | literal                                                    # LiteralExpression
    | evaluation                                                 # EvaluationExpression 
    | expression Is classTypes                                   # IsInstanceOfExpression
    | regularIdentifier                                          # IdentifierExpression
    | arrayLiteral                                               # ArrayLiteralExpression
    | This                                                       # ThisExpression
    | EnvPrefix OpenParen (identifier | upperCaseIdentifier) Comma literal CloseParen                # EnvVarWithDefaultValueExpression
    | envVariable                                                            # EnvironmentVariableExpression
    ;   

//TODO rename this
classTypes: ErrorClass;

literal
    : NullLiteral               # NullLiteral
    | BooleanLiteral            # BooleanLiteral
    | StringLiteral             # StringLiteral
    | templateStringLiteral     # TemplateStringLiteralLabel
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
    ;

eos
    : SemiColon
    | EOF
    ;

/** !!SETUP!! **/

language
    : TypeScript
    | Java
    // | unknownLanguage
    ;

unknownLanguage
    : identifier
    ;

languageSetterMethod
    : SetLanguage OpenParen language CloseParen SemiColon?
    ;

configInvocation
    : Config Dot languageSetterMethod 
    ;

restRouter
    : RESTRouter
    ;

pathString
    : StringLiteral
    ;

httpMethodVerb
    : GET
    | POST
    | PUT
    | DELETE
    | PATCH
    | OPTIONS
    ;

routerControllers
    : routerController*
    ;

routerArguments
    : OpenParen serverType CloseParen
    ;

useCaseExpression
    : boundedContextModuleDeclaration useCaseIdentifier methodArguments
    ;

routerExpression
    : restRouter routerArguments OpenBrace routerControllers CloseBrace
    ;

packageAdapterClassName
    : packageAdapterIdentifier
    ;

packageAdapterIdentifier
    : PackageAdapterIdentifier
    ;

packageConcretion
    : boundedContextModuleDeclaration adapter=packageAdapterIdentifier Concretes port=packagePortIdentifier SemiColon?
    ;

useCaseDefinition
    : Const identifier Assign useCaseExpression SemiColon?
    ;

routerDefinition
    : Const identifier Assign routerExpression SemiColon?
    ;

serverDeclaration
    : RESTServer OpenParen serverInstantiationOptions CloseParen  bindServerRoutes SemiColon?                   # RestServerDeclaration
    | GraphQLServer OpenParen graphQLServerInstantiationOptions CloseParen  bindControllerResolvers SemiColon?  # GraphQLServerDeclaration
    ;

serverInstantiationOptions
    : OpenBrace evaluationFieldList CloseBrace
    ;

repoConnectionDefinition
    : Const identifier Assign repoConnectionExpression
    ;

// constmongoConnection=Mongo.Connection({host:'localhost',port:env.MONGO_PORT || 27017,database:'todo',});",
repoConnectionExpression
    : RepoConnections Dot repoConnectionType OpenParen OpenBrace repoConnectionOptions? CloseBrace CloseParen SemiColon?
    ;
repoConnectionType
    : Mongo
    ;

repoConnectionOptions
    : evaluationFieldList
    ;

repoAdapterDefinition
    : Const identifier '=' repoAdapterExpression
    ;

repoAdapterExpression
    : repoAdapterClassName OpenParen OpenBrace repoAdapterOptions CloseBrace CloseParen Concretes boundedContextModuleDeclaration concretedRepoPort  SemiColon?
    ;

repoAdapterOptions
    : evaluationFieldList
    ;

repoAdapterClassName
    : RepoAdapters Dot repoConnectionType
    ;

concretedRepoPort
    : RepoPortIdentifier
    ;

// serverTypeOption
//     : ServerTypeOption Colon serverType Comma
//     ;

// serverApiPrefixOption
//     : ServerApiPrefix Colon pathString Comma
//     ;

// customServerOption
//     : Identifier Colon expression Comma
//     ;

// Cover any user defined options

graphQLServerInstantiationOptions
    : OpenBrace evaluationFieldList CloseBrace
    ;

// graphQLServerInstantiationOption
//     : customServerOption
//     ;

envVariable
    : EnvVariable
    ;

bindServerRoutes
    : OpenBrace routeBind (SemiColon routeBind)* SemiColon CloseBrace
    ;

routeBind
    : pathString Colon identifier
    ;

bindControllerResolvers
    : OpenBrace controllerResolverBind (SemiColon controllerResolverBind)* SemiColon CloseBrace
    ;

controllerResolverBind
    : boundedContextModuleDeclaration ControllerIdentifier methodArguments
    ;

alpha_numeric_ws: IntegerLiteral | WS | UpperCaseIdentifier | Identifier;

wordsWithSpaces
    : alpha_numeric_ws+
    ;

routerController
    : httpMethodVerb OpenParen pathString CloseParen Colon boundedContextModuleDeclaration restControllerIdentifier methodArguments SemiColon?
    ;

boundedContextDeclaration
    : wordsWithSpaces
    ;

moduleDeclaration
    : wordsWithSpaces
    ;

boundedContextModuleDeclaration
    : OpenBracket boundedContextDeclaration CloseBracket OpenBracket moduleDeclaration CloseBracket
    ;

serverType
    : fastifyServer
    | expressServer
    | graphQLServerType
    ;

fastifyServer
    : FastifyServer
    ;

expressServer
    : ExpressServer
    ;

graphQLServerType
    : GraphQLServerType
    ;

jestTestSetupDeclaration
    : OpenParen wordsWithSpaces CloseParen SemiColon? # TestExpression
    // | JestTestSingleExpression '{' setupExpression '}' # TestSingleExpression
    // | EnvPrefix OpenParen Identifier Comma literal CloseParen # EnvPrefixExpression
    ;

setupStatement
    : configInvocation  # configInvocationStatement
    | packageConcretion # packageConcretionStatement
    | useCaseDefinition # useCaseDefinitionStatement
    | routerDefinition  # routerDefinitionStatement
    | serverDeclaration  # serverDeclarationStatement
    | repoConnectionDefinition # repoConnectionDefinitionStatement
    | repoAdapterDefinition # repoAdapterDefinitionStatement
    | jestTestSetupDeclaration # jestTestSetupDeclarationStatement
    ;
