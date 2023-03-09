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
    | servicePortIdentifier
    | structIdentifier
    | commandIdentifier
    | queryIdentifier
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
    | Handle                                                    # HandleKeywordIdentifier
    | EntityIdentifier                                          # EntityIdentifierString
    | ValueObjectIdentifier                                     # ValueObjectIdentifierString
    | Method                                                    # MethodKeywordIdentifier
    | GraphQLOperation                                          # OperationKeywordIdentifier
    | Input                                                     # InputKeywordIdentifier
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
    | standardValueType                                 #StandardValueTypePrimType
    ;

bitloopsBuiltInClass
    : UUIDv4
    ;
standardValueType
    : StandardVO Dot upperCaseIdentifier                #StandardVOType
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
    | commandDeclaration
    | queryDeclaration
    | domainEventDeclaration
    | commandHandler
    | queryHandler
    | integrationEventDeclaration
    | domainEventDeclaration
    | domainEventHandlerDeclaration
    | integrationEventHandlerDeclaration
    | servicePortDeclaration
    | domainServiceDeclaration
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
    | JestTestCreateMethodDeclaration OpenBrace domainCreateDeclaration CloseBrace SemiColon?
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
    | entityConstructorEvaluation
    | propsEvaluation
    | structEvaluation
    | commandEvaluation
    | queryEvaluation
    | standardVOEvaluation
    | integrationEventEvaluation
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
    | (identifier | thisIdentifier) Dot AddDomainEvent OpenParen domainEventIdentifier CloseParen SemiColon? # AddDomainEventStatement
    ;

thisIdentifier
    : This
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
    : OpenBrace domainConstDeclarationList? domainCreateDeclaration publicMethodDeclarationList? privateMethodDeclarationList?  CloseBrace
    ;

valueObjectDeclaration 
    : ValueObject valueObjectIdentifier OpenBrace domainConstDeclarationList?  domainCreateDeclaration privateMethodDeclarationList? CloseBrace SemiColon?
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

domainCreateParam 
    : parameterIdentifier Colon propsIdentifier
    ;

domainCreateDeclaration
    : Static Create OpenParen domainCreateParam CloseParen Colon returnOkErrorType OpenBrace functionBody CloseBrace
    ;

useCaseIdentifier
    : UseCaseIdentifier
    ;

useCaseDeclaration
    : UseCase useCaseIdentifier parameterList? OpenBrace executeDeclaration CloseBrace SemiColon?
    ;

commandIdentifier
    : CommandIdentifier
    ;

commandDeclaration
    : Command commandIdentifier OpenBrace fieldList CloseBrace
    ;

queryIdentifier
    : QueryIdentifier
    ;

queryDeclaration
    : Query queryIdentifier OpenBrace fieldList CloseBrace
    ;

commandHandler
    : CommandHandler commandHandlerIdentifier parameterList? OpenBrace executeDeclaration CloseBrace SemiColon?
    ;

commandHandlerIdentifier
    : CommandHandlerIdentifier 
    ;

queryHandler
    : QueryHandler queryHandlerIdentifier parameterList? OpenBrace executeDeclaration CloseBrace SemiColon?
    ;

queryHandlerIdentifier
    : QueryHandlerIdentifier 
    ;


integrationEventIdentifier
    : IntegrationEventIdentifier
    ;

integrationEventInputType
    : propsIdentifier
    | domainEventIdentifier
    ;

integrationEventInput
    : OpenParen parameterIdentifier Colon integrationEventInputType CloseParen
    ;

versionName
    : StringLiteral
    ;

integrationReturnSchemaType
    : Colon structIdentifier
    ;

integrationVersionMapper
    : versionName integrationReturnSchemaType OpenBrace statementList CloseBrace
    ;

integrationVersionMapperList
    : OpenBrace integrationVersionMapper+ CloseBrace
    ;

integrationEventDeclaration
    : IntegrationEvent integrationEventIdentifier integrationEventInput integrationVersionMapperList
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


domainEventDeclaration
    : DomainEvent domainEventIdentifier '<' entityIdentifier '>' SemiColon?
    ;

domainEventIdentifier
    : DomainEventIdentifier
    ;

domainEventHandlerIdentifier
    : DomainEventHandlerIdentifier
    ;

domainEventHandlerDeclaration
    : DomainEventHandler domainEventHandlerIdentifier parameterList OpenBrace domainEventHandlerHandleDeclaration CloseBrace SemiColon?
    ;

domainEventHandlerHandleDeclaration
    : Handle OpenParen domainEventHandlerHandleParameter CloseParen OpenBrace functionBody CloseBrace
    ;

eventHandlerHandleIdentifier
    : domainEventIdentifier
    ;

domainEventHandlerHandleParameter
    : parameterIdentifier Colon eventHandlerHandleIdentifier
    ;

domainServiceIdentifier
    : DomainServiceIdentifier
    ;

domainServiceDeclaration
    : DomainService domainServiceIdentifier parameterList OpenBrace publicMethodDeclarationList? privateMethodDeclarationList? CloseBrace SemiColon?
    ;

integrationEventHandlerIdentifier
    : IntegrationEventHandlerIdentifier
    ;

integrationEventHandlerDeclaration
    : IntegrationEventHandler integrationEventHandlerIdentifier parameterList OpenBrace evaluationField SemiColon integrationEventHandlerHandleDeclaration CloseBrace SemiColon?
    ;

integrationEventHandlerHandleDeclaration
    : Handle OpenParen integrationEventHandlerHandleParameter CloseParen OpenBrace functionBody CloseBrace
    ;

integrationEventHandlerHandleParameter
    : parameterIdentifier Colon boundedContextModuleDeclaration integrationEventIdentifier
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
    : valueObjectIdentifier Dot Create domainEvaluationInput
    ;

domainEvaluationInput
    : OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen     # DomainEvaluationInputFieldList
    | OpenParen expression CloseParen                                   # DomainEvaluationInputRegular
    ;

entityEvaluation
    : entityIdentifier Dot Create domainEvaluationInput
    ;

entityConstructorEvaluation
    : entityIdentifier domainEvaluationInput
    ;

commandEvaluation
    : commandIdentifier Dot Create OpenParen (OpenBrace evaluationFieldList CloseBrace)? CloseParen
    ;

queryEvaluation
    : queryIdentifier Dot Create OpenParen (OpenBrace evaluationFieldList CloseBrace)? CloseParen
    ;
    
integrationEventEvaluation
    : integrationEventIdentifier Dot Create domainEvaluationInput
    ;

structEvaluation
    : structIdentifier OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen
    ;

standardVOEvaluation
    : StandardVO Dot upperCaseIdentifier Dot Create OpenParen OpenBrace evaluationFieldList CloseBrace CloseParen
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

executeDeclaration
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

servicePortIdentifier
    : ServicePortIdentifier
    ;

servicePortDeclaration
    : ServicePort servicePortIdentifier OpenBrace methodDefinitionList CloseBrace
    ;

methodDeclaration
    : publicMethodDeclaration            # PublicMethodDeclarationExpression
    | privateMethodDeclaration           # PrivateMethodDeclarationExpression
    ;

staticKeyword
    : Static
    ;

privateMethodDeclaration
    : Private staticKeyword? identifier parameterList? returnMethodType OpenBrace functionBody CloseBrace
    ;

publicMethodDeclaration
    : Public? staticKeyword? identifier parameterList? returnMethodType OpenBrace functionBody CloseBrace    
    ;

returnMethodType
    : typeAnnotation 
    | Colon returnOkErrorType
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
    | RegularExpressionLiteral  # RegularExpressionLiteralLabel
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
    : Config Dot languageSetterMethod                                                       # SetLanguageConfig 
    | Config Dot SetBuses OpenParen OpenBrace busesConfig CloseBrace CloseParen SemiColon?  # SetBusesConfig
    ;

busesConfig
    : busConfig (Comma busConfig)* Comma?
    ;

busConfig
    : busIdentifier Colon MessageBus Dot busType
    ;

busIdentifier
    : CommandBus
    | EventBus
    | IntegrationEventBus
    | QueryBus
    ;

busType
    : InProcess
    | External
    ;

// Config.setBuses({
//     COMMAND_BUS: MessageBus.External,//Here it should be Kafka, Nats etc MessageBus.External.Nats
//     EVENT_BUS: MessageBus.InProcess,
//     INTEGRATION_EVENT_BUS: MessageBus.InProcess,
//     QUERY_BUS: MessageBus.InProcess,
// })

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

dependencyInjections
    : DI OpenBrace dependencyInjectionList CloseBrace
    ;

dependencyInjectionList
    : dependencyInjection (SemiColon dependencyInjection)* SemiColon?
    ;

dependencyInjection
    : boundedContextModuleDeclaration commandHandlerIdentifier methodArguments              # CommandHandlerDependencyInjection
    | boundedContextModuleDeclaration queryHandlerIdentifier methodArguments                # QueryHandlerDependencyInjection
    | boundedContextModuleDeclaration domainEventHandlerIdentifier methodArguments          # DomainEventHandlerDependencyInjection
    | boundedContextModuleDeclaration integrationEventHandlerIdentifier methodArguments     # IntegrationEventHandlerDependencyInjection
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
    : boundedContextModuleDeclaration graphQLControllerIdentifier methodArguments
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
    | dependencyInjections # dependencyInjectionsStatement
    | jestTestSetupDeclaration # jestTestSetupDeclarationStatement
    ;
