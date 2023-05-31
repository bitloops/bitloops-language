"use strict";(self.webpackChunkbitloops_com_docs=self.webpackChunkbitloops_com_docs||[]).push([[1969],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>f});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=r.createContext({}),s=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(a),b=n,f=p["".concat(c,".").concat(b)]||p[b]||d[b]||o;return a?r.createElement(f,i(i({ref:t},u),{},{components:a})):r.createElement(f,i({ref:t},u))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=b;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}b.displayName="MDXCreateElement"},9380:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=a(7462),n=(a(7294),a(3905));const o={sidebar_label:"ValueObject",title:"Value Object - Basic Syntax",description:"ValueObject syntax on Bitloops Language - Value objects are objects that do not have an identidy. There are objects that represent a characteristic and do not identify an variable or object.",keywords:["bitloops","bitloops language","basic syntax","programming language","variables","types","objects","data types","classes","interfaces","modules","functions","loops","services"]},i="ValueObject",l={unversionedId:"reference/value-object",id:"reference/value-object",title:"Value Object - Basic Syntax",description:"ValueObject syntax on Bitloops Language - Value objects are objects that do not have an identidy. There are objects that represent a characteristic and do not identify an variable or object.",source:"@site/docs/reference/value-object.md",sourceDirName:"reference",slug:"/reference/value-object",permalink:"/docs/bitloops-language/reference/value-object",draft:!1,editUrl:"https://github.com/bitloops/bitloops-language/edit/main/documentation/docs/reference/value-object.md",tags:[],version:"current",frontMatter:{sidebar_label:"ValueObject",title:"Value Object - Basic Syntax",description:"ValueObject syntax on Bitloops Language - Value objects are objects that do not have an identidy. There are objects that represent a characteristic and do not identify an variable or object.",keywords:["bitloops","bitloops language","basic syntax","programming language","variables","types","objects","data types","classes","interfaces","modules","functions","loops","services"]},sidebar:"tutorialSidebar",previous:{title:"Struct",permalink:"/docs/bitloops-language/reference/struct"},next:{title:"How-to Guides",permalink:"/docs/bitloops-language/category/how-to-guides"}},c={},s=[{value:"Definition",id:"definition",level:3},{value:"Examples",id:"examples",level:3},{value:"Declaring a ValueObject",id:"declaring-a-valueobject",level:5},{value:"Using a ValueObject",id:"using-a-valueobject",level:5},{value:"Syntax",id:"syntax",level:3},{value:"Declaring a Value Object",id:"declaring-a-value-object",level:5},{value:"Creating a Value Object",id:"creating-a-value-object",level:5},{value:"Further reading",id:"further-reading",level:3}],u={toc:s},p="wrapper";function d(e){let{components:t,...a}=e;return(0,n.kt)(p,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"valueobject"},"ValueObject"),(0,n.kt)("h3",{id:"definition"},"Definition"),(0,n.kt)("p",null,"Value Objects are objects that have no conceptual identity and describe some characteristics of a thing.\nThey are defined only by their properties and their equality is not based on identity."),(0,n.kt)("h3",{id:"examples"},"Examples"),(0,n.kt)("h5",{id:"declaring-a-valueobject"},"Declaring a ValueObject"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"ValueObject TitleVO {\n  constructor(props: TitleProps): (OK(TitleVO), Errors(DomainErrors.TitleOutOfBoundsError)) {\n    applyRules(TitleOutOfBoundsRule(props.title));\n  }\n}\n")),(0,n.kt)("h5",{id:"using-a-valueobject"},"Using a ValueObject"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"const title = TitleVO({ title: requestDTO.title });\n")),(0,n.kt)("h3",{id:"syntax"},"Syntax"),(0,n.kt)("h5",{id:"declaring-a-value-object"},"Declaring a Value Object"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"ValueObject <identifier name with a VO suffix> {\n\n  //constant variable declarations\n  const <identifier> : <type> = <expression>;\n\n  // constructor declaration, here we define whatever needs specific handling during the creation of the value object and\n  //we use applyRules to ensure its validation. By default automatic getters are generated.\n  constructor(<props of the ValueObject>) : (OK(<type>), Errors(<DomainErrorIdentifier> '|' <DomainErrorIdentifier>...)) {\n    <statements>\n  }\n\n  // private method declaration\n  <[optional] private> <method identifier> (<arg, arg...>): <type> {\n    <statements>\n  }\n\n}\n")),(0,n.kt)("h5",{id:"creating-a-value-object"},"Creating a Value Object"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-typescript"},"<name of Value Object>(<props>);\n")),(0,n.kt)("p",null,"References for the above:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs/bitloops-language/reference/props"},"props"))),(0,n.kt)("h3",{id:"further-reading"},"Further reading"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://martinfowler.com/bliki/ValueObject.html"},"Value Objects - Martin Fowler"))))}d.isMDXComponent=!0}}]);