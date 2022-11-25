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
parser grammar BitloopsSetupParser;

options {
    tokenVocab=BitloopsSetupLexer;
    // superClass=BitloopsParserBase;
}

language
    : TypeScript
    | Java
    | unknownLanguage
    ;

unknownLanguage
    : identifier
    ;

languageSetterMethod
    : SetLanguage OpenParen language CloseParen SemiColon?
    ;

configInvocation
    : Config Dot languageSetterMethod # ConfigSetLanguageInvocation
    ;

identifier
    : Identifier
    ;

restRouter
    : RESTRouter
    ;

pathString
    : StringLiteral
    ;

method
    : validMethod
    | unknownMethod
    ;

validMethod
    : GET
    | POST
    | PUT
    | DELETE
    | PATCH
    | OPTIONS
    ;

unknownMethod
    : identifier
    ;

// controllerDeclarations
//     : controllerInstantiation+
//     ;

nestedImpliedControllerDeclarations
    : nestedControllerInstantiation*
    ;

routerArguments
    : validRouterArguments
    | invalidRouterArguments
    ;

validRouterArguments
    : OpenParen serverType CloseParen
    ;

invalidRouterArguments
    : OpenParen CloseParen
    ;

useCaseExpression
    : boundedContextModuleDeclaration useCaseName OpenParen useCaseDependencies CloseParen
    ;

routerExpression
    : restRouter routerArguments OpenCurlyBracket nestedImpliedControllerDeclarations CloseCurlyBracket
    ;

useCaseDeclaration
    : Const identifier
    ;

routerDeclaration
    : Const identifier
    ;

packageAdapterClassName
    : PackageAdapterClassName
    ;

packagePortClassName
    : PackagePortClassName
    ;

packageConcretion
    : boundedContextModuleDeclaration adapter=packageAdapterClassName Concretes port=packagePortClassName SemiColon?
    ;

useCaseDefinition
    : useCaseDeclaration Assign useCaseExpression SemiColon?
    ;

routerDefinition
    : routerDeclaration Assign routerExpression SemiColon?
    ;

serverExpression
    : RESTServer OpenParen serverInstantiationOptions CloseParen  bindServerRoutes SemiColon?                   # RestServerExpression
    | GraphQLServer OpenParen graphQLServerInstantiationOptions CloseParen  bindControllerResolvers SemiColon?  # GraphQLServerExpression
    ;

propertyName
    : Identifier
    | StringLiteral
    ;

propertyAssignment
    : propertyName (':' |'=') singleExpression                # PropertyExpressionAssignment
    ;

objectLiteral
    : '{' (propertyAssignment (',' propertyAssignment)* ','?)? '}'
    ;

// TODO Move singleExpression from other grammar 
singleExpression
    : singleExpression Or singleExpression                                   # LogicalOrExpression
    | EnvPrefix OpenParen identifier Comma literal CloseParen                # EnvVarWithDefaultValueExpression
    | envVariable                                                            # EnvironmentVariableExpression
    | literal                                                                # LiteralExpression
    | identifier                                                             # IdentifierExpression //Identifier or Variable method
    | objectLiteral                                                          # ObjectLiteralExpression
    // | evaluation                                                 # EvaluationExpression 
    // | regularVariableEvaluation                                              
    ;

// evaluation
//     : regularEvaluation
    // | dtoEvaluation
    // | structEvaluation
    // | valueObjectEvaluation
    // | propsEvaluation
    // ;

// regularEvaluation
    // : regularMethodEvaluation   
    // : regularStringEvaluation
    // | regularVariableEvaluation
    // | regularIntegerEvaluation
    // | regularDecimalEvaluation
    // | regularBooleanEvaluation
    // | regularDTOEvaluation
    // | regularStructEvaluation
    // ;
// regularMethodEvaluation
//     : RegularVariableEvaluation methodArguments
//     ;


// methodArguments
//     : '(' (argumentList (',' argumentList)*)? ')'
//     ;
// argumentList
//     : argument (',' argument)*
//     ;


// argument                      // ECMAScript 6: Spread Operator
//     : Ellipsis? (singleExpression | Identifier)
//     ;

// regularVariableEvaluation
//     //: RegularVariableEvaluation #RegularVariableEvaluationString
//     : Identifier    #IdentifierString
//     ;
// regularStringEvaluation
//     : StringLiteral
//     ;

// regularIntegerEvaluation
//     : IntegerLiteral
//     ;

// regularDecimalEvaluation
//     : DecimalLiteral
//     ;

// regularBooleanEvaluation
//     : BooleanLiteral
//     ;

literal
    : NullLiteral                                                           # NullLiteralExpression
    | BooleanLiteral                                                        # BooleanLiteralExpression
    | stringLiteral                                                         # StringLiteralExpression
    | numericLiteral                                                        # NumericLiteralExpression
    ;
stringLiteral
    : StringLiteral
    ;
    // | templateStringLiteral // TODO move here from other 


repoConnectionDefinition
    : constDeclaration '=' repoConnectionExpression
    ;

// constmongoConnection=Mongo.Connection({host:'localhost',port:env.MONGO_PORT || 27017,database:'todo',});",
repoConnectionExpression
    : RepoConnections Dot repoConnectionType OpenParen OpenCurlyBracket repoConnectionOptions? CloseCurlyBracket CloseParen SemiColon?
    ;
repoConnectionType
    : Mongo
    ;

repoConnectionOptions
    : objectProperties
    ;

objectProperties
    : objectProperty (Comma objectProperty)* Comma? 
    ;

objectProperty
    : identifier Colon singleExpression
    ;

repoAdapterDefinition
    : constDeclaration '=' repoAdapterExpression
    ;

constDeclaration
    : Const identifier
    ;



//     const todoRepo = RepoAdapters.Mongo({
//     host: 'localhost',
//     port: env.MONGO_PORT || 27017,
//     database: 'todo',
//     collection: 'todos',
//   }) concretes [Demo][Hello World]TodoRepoPort;

repoAdapterExpression
//  repoAdapterClassName OpenParen repoAdapterDependencies CloseParen
    : repoAdapterClassName OpenParen OpenCurlyBracket repoAdapterOptions CloseCurlyBracket CloseParen Concretes boundedContextModuleDeclaration concretedRepoPort  SemiColon?
    ;

repoAdapterOptions
    : objectProperties
    ;

repoAdapterClassName
    : RepoAdapters Dot Mongo
    ;

concretedRepoPort
    : RepoPortIdentifier
    ;

serverInstantiationOptions
    // : OpenCurlyBracket objectProperties CloseCurlyBracket
    // TODO Remove necessary comma on end of each line
    : OpenCurlyBracket serverInstantiationOption* CloseCurlyBracket
    ;

serverInstantiationOption
    : serverTypeOption    
    | serverApiPrefixOption
    | customServerOption
    ;

serverTypeOption
    : ServerTypeOption Colon serverType Comma
    ;

serverApiPrefixOption
    : ServerApiPrefix Colon pathString Comma
    ;

customServerOption
    : Identifier Colon singleExpression Comma
    ;

// Cover any user defined options

graphQLServerInstantiationOptions
    : OpenCurlyBracket graphQLServerInstantiationOption CloseCurlyBracket
    ;

graphQLServerInstantiationOption
    : customServerOption
    ;

numericLiteral
    : IntegerLiteral        #IntegerLiteral
    | DecimalLiteral        #DecimalLiteral
    | HexIntegerLiteral     #HexIntegerLiteral
    | OctalIntegerLiteral   #OctalIntegerLiteral
    | OctalIntegerLiteral2  #OctalIntegerLiteral2
    | BinaryIntegerLiteral  #BinaryIntegerLiteral
    ;

envVariable
    : EnvVariable
    ;

bindServerRoutes
    : OpenCurlyBracket routeBind (SemiColon routeBind)* SemiColon CloseCurlyBracket
    ;

routeBind
    : pathString Colon identifier
    ;

bindControllerResolvers
    : OpenCurlyBracket controllerResolverBind (SemiColon controllerResolverBind)* SemiColon CloseCurlyBracket
    ;

controllerResolverBind
    : boundedContextModuleDeclaration controllerName OpenParen controllerDependencies CloseParen
    ;

useCaseName
    : UseCaseName
    ;

controllerName
    : ControllerName
    ;

dependencies
    : (Identifier (Comma Identifier)*)?
    ;

// controllerInstantiation
//     : pathString Colon boundedContextModuleDeclaration controllerName OpenParen dependencies? CloseParen SemiColon?
//     ;
alpha_numeric_ws: Digits | WS | Identifier ;

wordsWithSpaces
    : alpha_numeric_ws+
    ;

nestedControllerInstantiation
    : method OpenParen pathString CloseParen Colon boundedContextModuleDeclaration controllerName OpenParen controllerDependencies CloseParen SemiColon?
    ;

useCaseDependencies
    : (Identifier (Comma Identifier)*)?
    ;

controllerDependencies
    : (identifier (Comma identifier)*)?
    ;

boundedContextModuleDeclaration
    : OpenBracket wordsWithSpaces CloseBracket OpenBracket wordsWithSpaces CloseBracket
    ;

serverType
    : fastifyServer
    | expressServer
    | graphQLServerType
    | unknownServer
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

unknownServer
    : identifier (Dot identifier)*
    ;

test
    : OpenParen wordsWithSpaces CloseParen SemiColon? # TestExpression
    | JestTestSingleExpression '{' singleExpression '}' # TestSingleExpression
    // | EnvPrefix OpenParen Identifier Comma literal CloseParen # EnvPrefixExpression
    ;

setupStatement
    : configInvocation  # configInvocationStatement
    | packageConcretion # packageConcretionStatement
    | useCaseDefinition # useCaseDefinitionStatement
    | routerDefinition  # routerDefinitionStatement
    | serverExpression  # serverExpressionStatement
    | repoConnectionDefinition # repoConnectionDefinitionStatement
    | repoAdapterDefinition # repoAdapterDefinitionStatement
    ;

program
    : setupStatement*  // # setupStatements
    | test*            // # testStatements
    | EOF?           // # eof
    ;
