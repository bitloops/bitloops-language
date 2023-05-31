"use strict";(self.webpackChunkbitloops_com_docs=self.webpackChunkbitloops_com_docs||[]).push([[4053],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(r),g=o,f=c["".concat(s,".").concat(g)]||c[g]||d[g]||a;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},9386:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:2,sidebar_label:"Quick Start",title:"Bitloops Quick Start - Learn Bitloops Language quickly",description:"This article explains how to get started with Bitloops very quickly. It provides a demonstration of how to get it up and running, how it works and how to begin exploring its features and capabilities.",keywords:["bitloops","software engingeering","software architecture","clean code","learning programming","learning coding","software development","better programming"]},i="Quick Start",l={unversionedId:"getting-started/quick-start",id:"getting-started/quick-start",title:"Bitloops Quick Start - Learn Bitloops Language quickly",description:"This article explains how to get started with Bitloops very quickly. It provides a demonstration of how to get it up and running, how it works and how to begin exploring its features and capabilities.",source:"@site/docs/getting-started/quick-start.md",sourceDirName:"getting-started",slug:"/getting-started/quick-start",permalink:"/docs/bitloops-language/getting-started/quick-start",draft:!1,editUrl:"https://github.com/bitloops/bitloops-language/edit/main/documentation/docs/getting-started/quick-start.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"Quick Start",title:"Bitloops Quick Start - Learn Bitloops Language quickly",description:"This article explains how to get started with Bitloops very quickly. It provides a demonstration of how to get it up and running, how it works and how to begin exploring its features and capabilities.",keywords:["bitloops","software engingeering","software architecture","clean code","learning programming","learning coding","software development","better programming"]},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/docs/bitloops-language/getting-started/installation"},next:{title:"Code Snippet Examples",permalink:"/docs/bitloops-language/getting-started/code-examples"}},s={},p=[{value:"Project structure",id:"project-structure",level:2},{value:"setup.bl file",id:"setupbl-file",level:3},{value:"Format",id:"format",level:4},{value:"Language configuration (optional)",id:"language-configuration-optional",level:5},{value:"Router definition (REST)",id:"router-definition-rest",level:5},{value:"Server expression (REST)",id:"server-expression-rest",level:5},{value:"controller.bl file",id:"controllerbl-file",level:3},{value:"Format",id:"format-1",level:4},{value:"Controller expression (REST)",id:"controller-expression-rest",level:5}],u={toc:p},c="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(c,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"quick-start"},"Quick Start"),(0,o.kt)("p",null,"How to create a ToDo App with BL"),(0,o.kt)("p",null,"Creating a To Do App as example"),(0,o.kt)("h2",{id:"project-structure"},"Project structure"),(0,o.kt)("p",null,"BL needs an input folder with a setup.bl file and the essential controllers of the use cases which will be transpiled."),(0,o.kt)("p",null,"The structure of the input folder must be as the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"\ud83d\udce6 .\n \u2523 \ud83d\udcc2To Do App\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0# Bounded Context Name\n \u2503 \u2517 \ud83d\udcc2To Do\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0# Module Name\n \u2503 \u2503 \u2517 \ud83d\udcc2Use Cases\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0# Standard Name (Do not change!)\n \u2503 \u2503 \u2503 \u2517 \ud83d\udcc2Add To Do\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0# Use Case\n \u2503 \u2503 \u2503 \u2503 \u2517 \ud83d\udcdccontroller.bl\n \u2503 \u2503 \u2503 \u2517 \ud83d\udcc2 ... \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0# Another Use Case\n \u2517 \ud83d\udcdcsetup.bl\n\n")),(0,o.kt)("h3",{id:"setupbl-file"},"setup.bl file"),(0,o.kt)("p",null,"Setup file must be located in the root directory of the input folder."),(0,o.kt)("h4",{id:"format"},"Format"),(0,o.kt)("h5",{id:"language-configuration-optional"},"Language configuration (optional)"),(0,o.kt)("p",null,"Configure which language the bl will be transpiled to.\nFow now, only TypeScript-Nest is supported and it is selected by default.",(0,o.kt)("br",{parentName:"p"}),"\n","More languages to follow."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"Config.setLanguage(TypeScript - Nest);\n")),(0,o.kt)("h5",{id:"router-definition-rest"},"Router definition (REST)"),(0,o.kt)("p",null,"Declare your router and assign to it a router expression as the example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const toDoRESTRouter = RESTRouter(REST.Fastify) {\n  Get('/add'): [To Do App][To Do]AddToDoRESTController();\n// <Method>(<Path>): [<Bounded Context>][<Module>]<Controller>();\n};\n")),(0,o.kt)("p",null,"In accordance with Domain-Driven-Development principles, due to the ubiquitous language, ",(0,o.kt)("strong",{parentName:"p"},"use cases")," and ",(0,o.kt)("strong",{parentName:"p"},"controllers")," must have ",(0,o.kt)("strong",{parentName:"p"},"unique names"),"."),(0,o.kt)("h5",{id:"server-expression-rest"},"Server expression (REST)"),(0,o.kt)("p",null,"Instantiate your server and bind routes as the example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"RESTServer({\n  server: REST.Fastify,\n  port: env.FASTIFY_PORT || 5001,\n  apiPrefix: '/api',\n}) {\n  '/todo': toDoRESTRouter;\n};\n")),(0,o.kt)("h3",{id:"controllerbl-file"},"controller.bl file"),(0,o.kt)("p",null,"Controller file must be located in the directory of the Use Case it coordinates."),(0,o.kt)("h4",{id:"format-1"},"Format"),(0,o.kt)("h5",{id:"controller-expression-rest"},"Controller expression (REST)"),(0,o.kt)("p",null,"Declare and instantiate your controller as the example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"RESTController HelloWorldController () {\n  method: REST.Methods.GET;\n  execute(request, response) {\n    this.ok(response, 'To Do added!');\n  }\n};\n")))}d.isMDXComponent=!0}}]);