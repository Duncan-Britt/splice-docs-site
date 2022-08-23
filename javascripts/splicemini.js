const Splice=function(){function b(a,c,e=!1){let b=0,d=c.length;for(;d<=a.length;){if(a.slice(b,d)==c&&a.slice(b-1,d)!="\\"+c){if(e)return[a.slice(0,b),a.slice(b+c.length)];return[a.slice(0,b),a.slice(b)]}b++,d++}return[a,""]}function c(c,a,d){return a.slice(1).reduce(([e,f],g)=>{let[a,h]=b(c,g,d);return Math.min(a.length,e.length)==a.length?[a,h]:[e,f]},b(c,a[0],d))}function d(a){let b=[];for(;a;)a=e(a,b);return b}function e(a,d){let e,c;return a.match(/^\(:/)?"~"==a[2]?([c,a]=f(a),d.push(c)):([c,a]=h(a),d.push(c)):([e,a]=b(a,"(:"),d.push({type:"text",value:e})),a}function f(a){let[c,f]=a.match(/^\(:~\s*(\w+)/);a=a.slice(c.length),[c,a]=b(a,"{");let d=c.match(/\S+/g)||[],e;return[e,a]=g(a.slice(1)),[{type:"op",name:f,args:d=d.map(function(a){if("'"==a[0])return{type:"text",value:a};let b=a.split("."),c=b[0],d=b.slice(1);return{type:"binding",name:c,chain:d,escape:!0}}),body:e},a]}function g(a){let e="",b=1;for(;0!=b;){let f;if([f,a]=c(a,["(:~","}:)"]),!a)throw"SPLICE SYNTAX ERROR: Expecting '}:)' to close function body.";if("(:~"==a.slice(0,3))b++;else if("}:)"==a.slice(0,3))b--;else throw"BUG";0==b?e+=f:e+=f+a.slice(0,3),a=a.slice(3)}return[d(e),a]}function h(a){let d=!0;"!"==a[2]&&(d=!1);let c;[c,a]=b(a,":)",!0);let e=(c=d?c.slice(2):c.slice(3)).trim().split("."),f=e[0],g=e.slice(1);return[{type:"binding",name:f,chain:g,escape:d},a]}function i(a,b){return a.reduce(function(a,c){return a+j(c,b)},"")}function j(b,d){switch(b.type){case"op":return a[b.name](d,...b.args,b.body);case"binding":let c=b.chain.reduce(function(a,b){return a[b]},d[b.name]);if("string"==typeof c)return b.escape?l(c):c;return c;case"text":return m(b.value);default:throw"Invalid Node Type in AST"}}let k=Object.create(null),a=Object.create(null);function l(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function m(a){let b="",c=0;for(match of a.matchAll(/\\[\S\s]/g))b+=a.slice(c,match.index),b+=match[0].slice(1),c=match.index+2;return b+a.slice(c)}return a.if=function(b,c,d){let a=Object.assign({},b);return j(c,a)?i(d,a):""},a.unless=function(b,c,d){let a=Object.assign({},b);return j(c,a)?"":i(d,a)},a.each=function(c,d,a,e,b){return!b&&a&&(b=a,a=null,e=null),j(d,c).reduce(function(f,d){let a=Object.assign({},c);return e&&(a[e.value.slice(1)]=d),a.$=d,f+i(b,a)},"")},a.def=function(b,c,a){switch(a.type){case"binding":b[c.value.slice(1)]=a.chain.reduce(function(a,b){return a[b]},b[a.name]);break;case"text":b[c.value.slice(1)]=a.value.slice(1);break;default:throw new SyntaxError("Unexpected")}return""},a.in=function(a,b,c){return i(c,j(b,a))},a.comment=function(_){return""},a.partial=function(a,b){return i(k[b.name],a)},{render(a,b,c){let e=document.querySelector(b),f=e.innerHTML,g=d(f),h=i(g,a);document.querySelector(c).innerHTML=h},compile(a){let b=d(a);return function(a){return i(b,a)}},registerPartial(b,a){if(a){k[b]=d(a);return}let c=document.getElementById(b);a=c.innerHTML,k[b]=d(a)}}}()
