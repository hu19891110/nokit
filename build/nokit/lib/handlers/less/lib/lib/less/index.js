/*csd*/var path=require("path"),url=require("url"),request,fs=require("fs");var less={version:[1,7,0],Parser:require("./parser").Parser,tree:require("./tree"),render:function(c,d,a){d=d||{};if(typeof(d)==="function"){a=d;d={};}var e=new (less.Parser)(d),b;if(a){e.parse(c,function(g,i){if(g){a(g);return;}var f;try{f=i&&i.toCSS&&i.toCSS(d);}catch(h){a(h);return;}a(null,f);});}else{b=new (require("events").EventEmitter)();process.nextTick(function(){e.parse(c,function(f,h){if(f){return b.emit("error",f);}try{b.emit("success",h.toCSS(d));}catch(g){b.emit("error",g);}});});return b;}},formatError:function(a,f){f=f||{};var e="";var d=a.extract;var b=[];var g=f.color?require("./lessc_helper").stylize:function(h){return h;};if(a.stack&&!a.type){return g(a.stack,"red");}if(!a.hasOwnProperty("index")||!d){return a.stack||a.message;}if(typeof(d[0])==="string"){b.push(g((a.line-1)+" "+d[0],"grey"));}if(typeof(d[1])==="string"){var c=a.line+" ";if(d[1]){c+=d[1].slice(0,a.column)+g(g(g(d[1][a.column],"bold")+d[1].slice(a.column+1),"red"),"inverse");}b.push(c);}if(typeof(d[2])==="string"){b.push(g((a.line+1)+" "+d[2],"grey"));}b=b.join("\n")+g("","reset")+"\n";e+=g(a.type+"Error: "+a.message,"red");if(a.filename){e+=g(" in ","red")+a.filename+g(" on line "+a.line+", column "+(a.column+1)+":","grey");}e+="\n"+b;if(a.callLine){e+=g("from ","red")+(a.filename||"")+"/n";e+=g(a.callLine,"grey")+" "+a.callExtract+"/n";}return e;},writeError:function(a,b){b=b||{};if(b.silent){return;}console.error(less.formatError(a,b));}};require("./tree/color");require("./tree/directive");require("./tree/detached-ruleset");require("./tree/operation");require("./tree/dimension");require("./tree/keyword");require("./tree/variable");require("./tree/ruleset");require("./tree/element");require("./tree/selector");require("./tree/quoted");require("./tree/expression");require("./tree/rule");require("./tree/call");require("./tree/url");require("./tree/alpha");require("./tree/import");require("./tree/mixin");require("./tree/comment");require("./tree/anonymous");require("./tree/value");require("./tree/javascript");require("./tree/assignment");require("./tree/condition");require("./tree/paren");require("./tree/media");require("./tree/unicode-descriptor");require("./tree/negative");require("./tree/extend");require("./tree/ruleset-call");var isUrlRe=/^(?:https?:)?\/\//i;less.Parser.fileLoader=function(h,b,a,g){var o,d,c,n={relativeUrls:g.relativeUrls,entryPath:b.entryPath,rootpath:b.rootpath,rootFilename:b.rootFilename};function j(e){var i=h.lastIndexOf("/");if(n.relativeUrls&&!/^(?:[a-z-]+:|\/)/.test(h)&&i!=-1){var t=h.slice(0,i+1);n.rootpath=n.rootpath+t;}n.currentDirectory=o.replace(/[^\\\/]*$/,"");n.filename=o;a(null,e,o,n);}var m=isUrlRe.test(h);if(m||isUrlRe.test(b.currentDirectory)){if(request===undefined){try{request=require("request");}catch(f){request=null;}}if(!request){a({type:"File",message:"optional dependency 'request' required to import over http(s)\n"});return;}var s=m?h:url.resolve(b.currentDirectory,h),r=url.parse(s);request.get({uri:s,strictSSL:!g.insecure},function(i,t,e){if(t.statusCode===404){a({type:"File",message:"resource '"+s+"' was not found\n"});return;}if(!e){console.error("Warning: Empty body (HTTP "+t.statusCode+') returned by "'+s+'"');}if(i){a({type:"File",message:"resource '"+s+"' gave this Error:\n  "+i+"\n"});}o=s;d=r.protocol+"//"+r.host+r.pathname.replace(/[^\/]*$/,"");j(e);});}else{var p=[b.currentDirectory].concat(g.paths);p.push(".");if(g.syncImport){for(var l=0;l<p.length;l++){try{o=path.join(p[l],h);fs.statSync(o);break;}catch(f){o=null;}}if(!o){a({type:"File",message:"'"+h+"' wasn't found"});return;}try{c=fs.readFileSync(o,"utf-8");j(c);}catch(f){a(f);}}else{(function q(e){if(e<p.length){o=path.join(p[e],h);fs.stat(o,function(i){if(i){q(e+1);}else{fs.readFile(o,"utf-8",function(u,t){if(u){a(u);}j(t);});}});}else{a({type:"File",message:"'"+h+"' wasn't found"});}}(0));}}};require("./env");require("./functions");require("./colors");require("./visitor.js");require("./import-visitor.js");require("./extend-visitor.js");require("./join-selector-visitor.js");require("./to-css-visitor.js");require("./source-map-output.js");for(var k in less){if(less.hasOwnProperty(k)){exports[k]=less[k];}}