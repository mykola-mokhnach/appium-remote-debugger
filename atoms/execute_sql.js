function(){return (function(){var a=this||self;function d(b,c){function f(){}f.prototype=c.prototype;b.prototype=new f;b.prototype.constructor=b};var e=window;function h(b,c){this.code=b;this.a=k[b]||m;this.message=c||"";b=this.a.replace(/((?:^|\s+)[a-z])/g,function(f){return f.toUpperCase().replace(/^[\s\xa0]+/g,"")});c=b.length-5;if(0>c||b.indexOf("Error",c)!=c)b+="Error";this.name=b;b=Error(this.message);b.name=this.name;this.stack=b.stack||""}d(h,Error);var m="unknown error",k={15:"element not selectable",11:"element not visible"};k[31]=m;k[30]=m;k[24]="invalid cookie domain";k[29]="invalid element coordinates";k[12]="invalid element state";k[32]="invalid selector";
k[51]="invalid selector";k[52]="invalid selector";k[17]="javascript error";k[405]="unsupported operation";k[34]="move target out of bounds";k[27]="no such alert";k[7]="no such element";k[8]="no such frame";k[23]="no such window";k[28]="script timeout";k[33]="session not created";k[10]="stale element reference";k[21]="timeout";k[25]="unable to set cookie";k[26]="unexpected alert open";k[13]=m;k[9]="unknown command";function n(b){this.a=[];for(var c=0;c<b.rows.length;c++)this.a[c]=b.rows.item(c)};function p(b,c,f,u,v,w,x){function y(g,l){l=new n(l);u(g,l)}try{var z=e.openDatabase(b,"",b+"name",5242880)}catch(g){throw new h(13,g.message);}z.transaction(function(g){g.executeSql(c,f,y,x)},v,w)}var q=["_"],r=a;q[0]in r||"undefined"==typeof r.execScript||r.execScript("var "+q[0]);for(var t;q.length&&(t=q.shift());)q.length||void 0===p?r[t]&&r[t]!==Object.prototype[t]?r=r[t]:r=r[t]={}:r[t]=p;; return this._.apply(null,arguments);}).apply(window, arguments);}