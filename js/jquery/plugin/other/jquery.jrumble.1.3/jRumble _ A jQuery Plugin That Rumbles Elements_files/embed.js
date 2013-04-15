var DISQUS=function(e){var j=e.DISQUS||{};j.AssertionError=function(b){this.message=b};j.AssertionError.prototype.toString=function(){return"Assertion Error: "+(this.message||"[no message]")};j.assert=function(b,c,g){if(!b)if(g)e.console&&e.console.log("DISQUS assertion failed: "+c);else throw new j.AssertionError(c);};var c=[];j.define=function(b,k){typeof b==="function"&&(k=b,b="");for(var g=b.split("."),a=g.shift(),d=j,n=(k||function(){return{}}).call({overwrites:function(a){a.__overwrites__=!0;
return a}},e);a;)d=d[a]?d[a]:d[a]={},a=g.shift();for(var h in n)n.hasOwnProperty(h)&&(!n.__overwrites__&&d[h]!==null&&j.assert(!d.hasOwnProperty(h),"Unsafe attempt to redefine existing module: "+h,!0),d[h]=n[h],c.push(function(a,d){return function(){delete a[d]}}(d,h)));return d};j.use=function(c){return j.define(c)};j.cleanup=function(){for(var b=0;b<c.length;b++)c[b]()};return j}(window);
DISQUS.define(function(e,j){var c=e.DISQUS,b=e.document,k=b.getElementsByTagName("head")[0]||b.body,g={running:!1,timer:null,queue:[]};c.defer=function(a,d){function c(){var a=g.queue;if(a.length===0)g.running=!1,clearInterval(g.timer);for(var d=0,b;b=a[d];d++)b[0]()&&(a.splice(d--,1),b[1]())}g.queue.push([a,d]);c();if(!g.running)g.running=!0,g.timer=setInterval(c,100)};c.each=function(a,d){var c=a.length,b=Array.prototype.forEach;if(isNaN(c))for(var e in a)a.hasOwnProperty(e)&&d(a[e],e,a);else if(b)b.call(a,
d);else for(b=0;b<c;b++)d(a[b],b,a)};c.extend=function(a){c.each(Array.prototype.slice.call(arguments,1),function(d){for(var b in d)a[b]=d[b]});return a};c.serializeArgs=function(a){var d=[];c.each(a,function(a,b){a!==j&&d.push(b+(a!==null?"="+encodeURIComponent(a):""))});return d.join("&")};c.isString=function(a){return Object.prototype.toString.call(a)==="[object String]"};c.serialize=function(a,d,b){d&&(a+=~a.indexOf("?")?a.charAt(a.length-1)=="&"?"":"&":"?",a+=c.serializeArgs(d));if(b)return d=
{},d[(new Date).getTime()]=null,c.serialize(a,d);d=a.length;return a.charAt(d-1)=="&"?a.slice(0,d-1):a};c.require=function(a,d,e,h,m){function j(a){if(a.type=="load"||/^(complete|loaded)$/.test(a.target.readyState))h&&h(),o&&clearTimeout(o),c.bean.remove(a.target,g,j)}var i=b.createElement("script"),g=i.addEventListener?"load":"readystatechange",o=null;i.src=c.serialize(a,d,e);i.async=!0;i.charset="UTF-8";(h||m)&&c.bean.add(i,g,j);m&&(o=setTimeout(function(){m()},2E4));k.appendChild(i);return c};
c.requireStylesheet=function(a,d,e){var h=b.createElement("link");h.rel="stylesheet";h.type="text/css";h.href=c.serialize(a,d,e);k.appendChild(h);return c};c.requireSet=function(a,d,b){var h=a.length;c.each(a,function(a){c.require(a,{},d,function(){--h===0&&b()})})};c.injectCss=function(a){var d=b.createElement("style");d.setAttribute("type","text/css");a=a.replace(/\}/g,"}\n");e.location.href.match(/^https/)&&(a=a.replace(/http:\/\//g,"https://"));d.styleSheet?d.styleSheet.cssText=a:d.appendChild(b.createTextNode(a));
k.appendChild(d)}});
DISQUS.define("JSON",function(){function e(a){return a<10?"0"+a:a}function j(d){a.lastIndex=0;return a.test(d)?'"'+d.replace(a,function(a){var d=h[a];return typeof d==="string"?d:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+d+'"'}function c(a,b){var p,f,h,e,i=d,q,g=b[a];g&&typeof g==="object"&&typeof g.toJSON==="function"&&!k&&(g=g.toJSON(a));typeof m==="function"&&(g=m.call(b,a,g));switch(typeof g){case "string":return j(g);case "number":return isFinite(g)?String(g):"null";case "boolean":case "null":return String(g);
case "object":if(!g)return"null";d+=n;q=[];if(Object.prototype.toString.apply(g)==="[object Array]"){e=g.length;for(p=0;p<e;p+=1)q[p]=c(p,g)||"null";h=q.length===0?"[]":d?"[\n"+d+q.join(",\n"+d)+"\n"+i+"]":"["+q.join(",")+"]";d=i;return h}if(m&&typeof m==="object"){e=m.length;for(p=0;p<e;p+=1)f=m[p],typeof f==="string"&&(h=c(f,g))&&q.push(j(f)+(d?": ":":")+h)}else for(f in g)Object.hasOwnProperty.call(g,f)&&(h=c(f,g))&&q.push(j(f)+(d?": ":":")+h);h=q.length===0?"{}":d?"{\n"+d+q.join(",\n"+d)+"\n"+
i+"}":"{"+q.join(",")+"}";d=i;return h}}var b={},k=!1;if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var g=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
a=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,d,n,h={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},m;b.stringify=function(a,b,h){var f;n=d="";if(typeof h==="number")for(f=0;f<h;f+=1)n+=" ";else typeof h==="string"&&(n=h);if((m=b)&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number"))throw Error("JSON.stringify");return c("",{"":a})};b.parse=function(a,d){function b(a,
f){var c,h,e=a[f];if(e&&typeof e==="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(h=b(e,c),h!==void 0?e[c]=h:delete e[c]);return d.call(a,f,e)}var f,a=String(a);g.lastIndex=0;g.test(a)&&(a=a.replace(g,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return f=eval("("+a+")"),
typeof d==="function"?b({"":f},""):f;throw new SyntaxError("JSON.parse");};var l={a:[1,2,3]},i,s;if(Object.toJSON&&Object.toJSON(l).replace(/\s/g,"")==='{"a":[1,2,3]}')i=Object.toJSON;typeof String.prototype.evalJSON==="function"&&(l='{"a":[1,2,3]}'.evalJSON(),l.a&&l.a.length===3&&l.a[2]===3&&(s=function(a){return a.evalJSON()}));(function(){var a=[1,2,3];typeof a.toJSON==="function"&&(a=a.toJSON(),k=!(a&&a.length===3&&a[2]===3))})();if(k||!i||!s)return{stringify:b.stringify,parse:b.parse};return{stringify:i,
parse:s}});
DISQUS.define(function(){function e(d){for(a=1;d=j.shift();)d()}var j=[],c,b=document,k=b.documentElement,g=k.doScroll,a=/^loade|c/.test(b.readyState),d;b.addEventListener&&b.addEventListener("DOMContentLoaded",c=function(){b.removeEventListener("DOMContentLoaded",c,!1);e()},!1);g&&b.attachEvent("onreadystatechange",c=function(){/^c/.test(b.readyState)&&(b.detachEvent("onreadystatechange",c),e())});d=g?function(b){self!=top?a?b():j.push(b):function(){try{k.doScroll("left")}catch(a){return setTimeout(function(){d(b)},50)}b()}()}:
function(b){a?b():j.push(b)};return{domready:d}});
DISQUS.define("Events",function(){var e=/\s+/,j={on:function(c,b,k){var g,a;if(!b)return this;c=c.split(e);for(g=this._callbacks||(this._callbacks={});a=c.shift();)a=g[a]||(g[a]=[]),a.push(b),a.push(k);return this},off:function(c,b,k){var g,a,d;if(!(a=this._callbacks))return this;if(!c&&!b&&!k)return delete this._callbacks,this;for(c=c?c.split(e):_.keys(a);g=c.shift();)if(!(d=a[g])||!b&&!k)delete a[g];else for(g=d.length-2;g>=0;g-=2)b&&d[g]!==b||k&&d[g+1]!==k||d.splice(g,2);return this},trigger:function(c){var b,
k,g,a,d,j,h;if(!(k=this._callbacks))return this;h=[];c=c.split(e);a=1;for(d=arguments.length;a<d;a++)h[a-1]=arguments[a];for(;b=c.shift();){if(j=k.all)j=j.slice();if(g=k[b])g=g.slice();if(g){a=0;for(d=g.length;a<d;a+=2)g[a].apply(g[a+1]||this,h)}if(j){b=[b].concat(h);a=0;for(d=j.length;a<d;a+=2)j[a].apply(j[a+1]||this,b)}}return this}};j.bind=j.on;j.unbind=j.off;return j});
DISQUS.define(function(e){function j(){throw Error(Array.prototype.join.call(arguments," "));}function c(a,f,b){if(a.addEventListener)a.addEventListener(f,b,!1);else if(a.attachEvent)a.attachEvent("on"+f,b);else throw Error("No event support.");}function b(a,f,b){b||(b=0);var d,c,h,e,g=0,j=function(){g=new Date;h=null;e=a.apply(d,c)};return function(){var k=new Date,i=f-(k-g);d=this;c=arguments;i<=0?(clearTimeout(h),h=null,g=k,e=a.apply(d,c)):h||(h=setTimeout(j,i+b));return e}}var k=e.document,g=
DISQUS.use("JSON"),a={},d={},n=0;if(!(DISQUS.version&&DISQUS.version()==="2")){c(e,"message",function(a){var f,b;for(b in d)if(Object.prototype.hasOwnProperty.call(d,b)&&a.origin==d[b].origin){f=!0;break}if(f)switch(f=g.parse(a.data),(b=d[f.sender])||j("Message from our server but with invalid sender UID:",f.sender),f.scope){case "host":b.trigger(f.name,f.data);break;case "global":DISQUS.trigger(f.name,f.data);break;default:j("Message",f.scope,"not supported. Sender:",a.origin)}},!1);c(e,"hashchange",
function(){DISQUS.trigger("window.hashchange",{hash:e.location.hash})},!1);c(e,"resize",function(){DISQUS.trigger("window.resize")},!1);c(e,"scroll",b(function(){DISQUS.trigger("window.scroll")},250,50));c(k,"click",function(){DISQUS.trigger("window.click")});var h=function(){this.uid=n++;a[this.uid]=this};DISQUS.extend(h.prototype,DISQUS.Events);h.prototype.destroy=function(){delete a[this.uid]};DISQUS.extend(h,{listByKey:function(){var b={},f;for(f in a)Object.prototype.hasOwnProperty.call(a,f)&&
(b[f]=a[f]);return b},list:function(){var b=[],f;for(f in a)Object.prototype.hasOwnProperty.call(a,f)&&b.push(a[f]);return b},get:function(b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b];return null}});var m=function(a){a=a||{};this.state=m.INIT;this.uid=a.uid||n++;this.origin=a.origin;this.target=a.target;this.window=null;d[this.uid]=this;this.on("ready",function(){this.state=m.READY},this);this.on("die",function(){this.state=m.KILLED},this)};DISQUS.extend(m,{INIT:0,READY:1,KILLED:2});
DISQUS.extend(m.prototype,DISQUS.Events);m.prototype.sendMessage=function(a,b){var d=function(a,b,f){return function(){DISQUS.postMessage(f.window,a,b)}}(g.stringify({scope:"client",name:a,data:b}),this.origin,this);if(this.isReady())d();else this.on("ready",d)};m.prototype.hide=function(){};m.prototype.show=function(){};m.prototype.url=function(){return DISQUS.serialize(this.target,{disqus_version:"1365704334"})+"#"+this.uid};m.prototype.destroy=function(){this.state=m.KILLED;this.off()};m.prototype.isReady=
function(){return this.state===m.READY};m.prototype.isKilled=function(){return this.state===m.KILLED};var l=function(a){m.call(this,a);this.windowName=a.windowName};DISQUS.extend(l.prototype,m.prototype);l.prototype.load=function(){this.window=e.open("",this.windowName||"_blank");this.window.location=this.url()};l.prototype.isKilled=function(){return m.prototype.isKilled()||this.window.closed};var i=function(a){m.call(this,a);this.styles=a.styles||{};this.role=a.role||"application";this.container=
a.container;this.elem=null};DISQUS.extend(i.prototype,m.prototype);i.prototype.load=function(){var a=this.elem=k.createElement("iframe");a.setAttribute("id","dsq"+this.uid);a.setAttribute("data-disqus-uid",this.uid);a.setAttribute("allowTransparency","true");a.setAttribute("frameBorder","0");this.role&&a.setAttribute("role",this.role);DISQUS.extend(a.style,this.styles)};i.prototype.getPosition=function(){for(var a=this.elem,b=0,d=0;a;)b+=a.offsetLeft,d+=a.offsetTop,a=a.offsetParent;return{top:d,left:b}};
i.prototype.hide=function(){this.elem.style.display="none"};i.prototype.show=function(){this.elem.style.display=""};i.prototype.destroy=function(){m.prototype.destroy.call(this);this.elem&&this.elem.parentNode&&this.elem.parentNode.removeChild(this.elem)};var s=function(a){i.call(this,a);this.styles=DISQUS.extend({width:"100%",border:"none",overflow:"hidden",display:"none"},a.styles||{})};DISQUS.extend(s.prototype,i.prototype);s.prototype.load=function(a){var b=this;i.prototype.load.call(b);var d=
b.elem;d.setAttribute("width","100%");d.setAttribute("src",this.url());c(d,"load",function(){d.style.display="";b.window=d.contentWindow;a&&a()});(k.getElementById(this.container)||k.body).appendChild(d)};var o=function(a){i.call(this,a);this.contents=a.contents;this.styles=DISQUS.extend({width:"100%",border:"none",overflow:"hidden"},a.styles||{})};DISQUS.extend(o.prototype,i.prototype);o.prototype.load=function(){i.prototype.load.call(this);var a=this.elem;a.setAttribute("scrolling","no");(k.getElementById(this.container)||
k.body).appendChild(a);this.window=a.contentWindow;try{this.window.document.open()}catch(b){a.src="javascript:var d=document.open();d.domain='"+k.domain+"';void(0);"}this.document=this.window.document;this.document.write(this.contents);this.document.close();if(a=this.document.body){var d=this.elem.style;d.height=d.minHeight=d.maxHeight=a.offsetHeight+"px"}};o.prototype.show=function(){this.elem.style.display="block"};o.prototype.click=function(a){c(this.document.body,"click",function(b){a(b)})};var r=
DISQUS.extend({},DISQUS.Events);return{log:function(a){var b=k.getElementById("messages");if(b){var d=k.createElement("p");d.innerHTML=a;b.appendChild(d)}},version:function(){return"2"},on:r.on,off:r.off,trigger:r.trigger,throttle:b,postMessage:function(a,b,d){a.postMessage(b,d)},WindowBase:m,Popup:l,Iframe:i,Channel:s,Sandbox:o,App:h}}});
DISQUS.define("next.publisher",function(e){function j(a,b,c){var h,c=c||b;if(a===g)return"";e.getComputedStyle?h=g.defaultView.getComputedStyle(a,null).getPropertyValue(b):a.currentStyle&&(h=a.currentStyle[b]?a.currentStyle[b]:a.currentStyle[c]);return h=="transparent"||h===""||h=="rgba(0, 0, 0, 0)"?j(a.parentNode,b,c):h||null}function c(a){function b(a){a=Number(a).toString(16);return a.length==1?"0"+a:a}if(a.substr(0,1)==="#")return a;var c=/.*?rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(a);if(!c||c.length!==
4)return"";var a=b(c[1]),h=b(c[2]),c=b(c[3]);return"#"+a+h+c}function b(a,b,c,h){DISQUS.isString(b)&&(b=g.createElement(b));var e=null;b.style.visibility="hidden";a.appendChild(b);e=j(b,c,h);a.removeChild(b);return e}function k(a){return a.toLowerCase().replace(/^\s+|\s+$/g,"").replace(/['"]/g,"")}var g=e.document;return{getContrastYIQ:function(a){a.match("^rgb")&&(a=c(a).substr(1));var b=parseInt(a.substr(0,2),16),e=parseInt(a.substr(2,2),16),a=parseInt(a.substr(4,2),16);return(b*299+e*587+a*114)/
1E3},colorToHex:c,getElementStyle:b,getAnchorColor:function(a){var d=g.createElement("a");d.href=+new Date;return b(a,d,"color")},normalizeFontValue:k,isSerif:function(a){for(var a=b(a,"span","font-family","fontFamily").split(","),d={courier:1,times:1,"times new roman":1,georgia:1,palatino:1,serif:1},c,h=0;h<a.length;h++)if(c=k(a[h]),d.hasOwnProperty(c))return!0;return!1}}});
DISQUS.define(function(){function e(e){DISQUS.App.call(this);this.switches={};var c={target:e.useSSL?"https://securecdn.disqus.com/1365704334/build/next-switches/client_ssl.html":"http://mediacdn.disqus.com/1365704334/build/next-switches/client.html",container:e.container};c.origin=e.useSSL?"https://securecdn.disqus.com":"http://mediacdn.disqus.com";this.frame=new DISQUS.Channel(c);var b=this;this.frame.load(function(){b.frame.elem.style.display="none"})}e.prototype=DISQUS.extend({fetch:function(e){var c=
this,e=e||{},b=e.success;delete e.success;this.frame.on("switches.received",function(e){c.switches=e;DISQUS.trigger("switches.changed",e);b&&b(e)});this.frame.sendMessage("fetch",e)},enabled:function(e){return this.switches[e]?this.switches[e]:!1}},DISQUS.App.prototype);return{Switches:function(j){return new e(j)}}});
DISQUS.define(function(e){var j=function(c){DISQUS.App.call(this);this.frame=null;this.settings=c;c.useSSL?(this.url="https://disqus.com/embed/profile/",this.origin="https://disqus.com"):(this.url="http://disqus.com/embed/profile/",this.origin="http://disqus.com");this.url=DISQUS.serialize(this.url,{f:c.forum,language:c.language})};DISQUS.extend(j.prototype,DISQUS.App.prototype);j.prototype.init=function(){var c=this.settings,b={uid:this.uid,target:this.url,origin:this.origin},k=this.frame=c.windowName?
new DISQUS.Popup(DISQUS.extend(b,{windowName:c.windowName})):new DISQUS.Channel(DISQUS.extend(b,{container:c.container,styles:{height:"100%",position:"fixed",top:0,left:0,zIndex:999999},role:"dialog"}));k.on("ready",function a(){k.off("ready",a);k.sendMessage("init",{referrer:e.location.href});this.trigger("loading.init")},this);k.on("close",function(){k.hide();e.focus()},this);k.load();this.trigger("loading.start")};j.prototype.showProfile=function(c){var b=this.frame;if(!b.isReady())return void b.on("ready",
function g(){b.off("ready",g);this.showProfile(c)},this);b.sendMessage("showProfile",c);b.show()};return{Profile:function(c){return new j(c)}}});
DISQUS.define("backplane",function(){var e;try{localStorage.setItem("disqus.localStorageTest","disqus"),localStorage.removeItem("disqus.localStorageTest"),e=!0}catch(j){e=!1}var c=function(b){this.frame=b;this.credentials="unset";var c=this;typeof Backplane==="function"&&typeof Backplane.version==="string"&&typeof Backplane.subscribe==="function"&&e&&Backplane(function(){c.initialize()})};DISQUS.extend(c.prototype,{frameEvents:{invalidate:"clearCredentials"},initialize:function(){var b=this;DISQUS.each(this.frameEvents,
function(c,e){b.frame.on("backplane."+e,typeof c==="function"?c:b[c],b)});this.credentialsFromLocalStorage()&&this.frame.sendMessage("login",{backplane:this.credentials});this.subscribe()},subscribe:function(){var b=this;Backplane.subscribe(function(c){var e=b.handlers[c.type];e&&e.call(b,c)})},handlers:{"identity/login":function(b){var c=b.messageURL,b=b.channel;this.credentials!=="unset"&&this.credentials!==null&&this.credentials.channel===b&&this.credentials.messageUrl===c||(this.setCredentials(b,
c),this.frame.sendMessage("login",{backplane:this.getCredentials()}))}},credentialsFromLocalStorage:function(){var b=localStorage.getItem("disqus.backplane.channel"),c=localStorage.getItem("disqus.backplane.messageUrl");this.setCredentials(b,c,!0);return this.credentials},setCredentials:function(b,c,e){if(!b||!c)return void this.clearCredentials();e||(localStorage.setItem("disqus.backplane.channel",b),localStorage.setItem("disqus.backplane.messageUrl",c));this.credentials={channel:b,messageUrl:c}},
getCredentials:function(){if(this.credentials!=="unset")return this.credentials;return this.credentialsFromLocalStorage()},clearCredentials:function(b){b=b||{};this.credentials=null;localStorage.removeItem("disqus.backplane.channel");localStorage.removeItem("disqus.backplane.messageUrl");if(b.redirectUrl)window.location=b.redirectUrl}});return{BackplaneIntegration:c}});
DISQUS.define(function(e,j){function c(a,b,c,d,e,g){return'<img width="'+a+'" height="'+b+'" alt="'+d+'" src="data:image/'+c+";base64,"+e+'"'+(g?' style="'+g+'"':"")+"/>"}function b(a){for(var b=DISQUS.App.list(),c=0,e=b.length,b=b[c];c<e;c++)b instanceof d&&a(b)}var k=e.document,g=["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","TkSuQmCC"],a=["R0lGODlhEAALAPQAAP///z2LqeLt8dvp7u7090GNqz2LqV+fuJ/F1IW2ycrf51aatHWs","waXJ14i4ys3h6FmctUCMqniuw+vz9eHs8fb5+meku+Tu8vT4+cfd5bbT3tbm7PH2+AAA","AAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQu","aW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27if","DgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeR","vsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjoth",
"LOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh","+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+","YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY","5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAs","AAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00k","j5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpy","HCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAA","BS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7",
"AAAAAAAAAAAA"],d=function(a){DISQUS.App.call(this);this.settings=a;this.indicators={north:null,south:null};this._boundGlobalEvents=[];this.frame=null;this.wasNearViewport=this.wasInViewport=!1};DISQUS.extend(d.prototype,DISQUS.App.prototype);d.prototype.init=function(){function b(a,c,d){f.on("affiliateLink",function(b){var e=DISQUS.vglnk.$;if(!e)return void f.sendMessage("affiliateLink");e.request(a+"/click",{format:"jsonp",out:b.url,key:c,loc:f.target,subId:d},{fn:function(a){return function(b){var c=
{token:a};if(b)c.url=b;f.sendMessage("affiliateLink",c)}}(b.token),timeout:DISQUS.vglnk.opt("click_timeout")})})}function d(a,b){l._boundGlobalEvents.push(a);DISQUS.on(a,b,l)}var l=this,i=l.settings,n="http://disqus.com/embed/comments/",o="http://disqus.com";i.useSSL&&(n="https://disqus.com/embed/comments/",o="https://disqus.com");var r={f:i.forum,t_i:i.identifier,t_u:i.url||e.location.href,t_s:i.slug,t_t:i.title||i.documentTitle,t_e:i.title,t_d:i.documentTitle,t_c:i.category,s_o:i.sortOrder,c:i.useConman||
j};if(i.notSupported)r.n_s=1;var p=DISQUS.isString(i.container)?k.getElementById(i.container):i.container,f=l.frame=new DISQUS.Channel({origin:o,target:DISQUS.serialize(n,r),container:i.container,uid:this.uid,role:"complementary"});if(i.notSupported)f.styles.height="500px";var t,u;if(!i.notSupported)t=k.createElement("div"),t.innerHTML=c(71,17,"png","DISQUS",g.join(""))+c(16,11,"gif","...",a.join(""),"margin:0 0 3px 5px"),p.appendChild(t);f.on("ready",function q(a){f.off("ready",q);t&&t.parentNode===
p&&p.removeChild(t);e.clearTimeout(u);var b={permalink:i.permalink,anchorColor:i.anchorColor,referrer:e.location.href,colorScheme:i.colorScheme,language:i.language,typeface:i.typeface,remoteAuthS3:i.remoteAuthS3,apiKey:i.apiKey,sso:i.sso,parentWindowHash:e.location.hash};if(e.navigator.userAgent.match(/(iPad|iPhone|iPod)/))b.width=f.elem.offsetWidth;l.scrollListener();l.clientData=a;f.sendMessage("init",b);l.trigger("loading.init")});f.on("resize",function(a){f.elem.style.height=a.height+"px"});f.on("reload",
function(){e.location.reload()});f.on("reset",function(){DISQUS.reset({reload:!0})});f.on("session.identify",function(a){l.trigger("session.identify",a)});f.on("posts.paginate",function(){l.trigger("posts.paginate")});f.on("posts.create",function(a){l.trigger("posts.create",{id:a.id,text:a.raw_message})});f.on("scrollTo",function(a){var b=f.getPosition(),b=a.relative==="window"?a.top:b.top+a.top,c=l.getWindowYCoords();(a.force||!(b>c.pageYOffset&&b<c.pageYOffset+c.innerHeight))&&e.scrollTo(0,b)});
f.on("fakeScroll",l.scrollListener,l);f.on("realtime.init",function(a){for(var b=["north","south"],c,d,e=0;e<b.length;e++)d=b[e],c=new DISQUS.Sandbox({uid:"-indicator-"+d,container:l.settings.container,contents:a[d].contents,styles:a[d].styles,role:"alert"}),c.load(),c.hide(),function(a){c.click(function(){f.sendMessage("realtime.click",a)})}(d),l.indicators[d]=c});f.on("realtime.showNorth",function(a){var b=l.indicators.north;b.document.getElementById("message").innerHTML=a;b.show()});f.on("realtime.hideNorth",
function(){l.indicators.north.hide()});f.on("realtime.showSouth",function(a){var b=l.indicators.south;b.document.getElementById("message").innerHTML=a;b.show()});f.on("realtime.hideSouth",function(){l.indicators.south.hide()});f.on("mainViewRendered",function(){DISQUS.trigger("lounge:mainViewRendered");l.trigger("loading.done")});f.on("profile.show",function(a){if(!l.profile||l.profile.frame.isKilled())l.profile=DISQUS.Profile({windowName:a.windowName,language:a.language,container:i.container,useSSL:i.useSSL,
forum:i.forum}),l.profile.init();l.profile.showProfile(a.userId)});f.on("loadLinkAffiliator",function(a){f.off("loadLinkAffiliator");if(!e.vglnk_self&&!e.vglnk&&!function(){for(var a in e)if(a.indexOf("skimlinks")===0||a.indexOf("skimwords")===0)return!0;return!1}()){var c=a.apiUrl,d=a.key,g=String(a.id);if(!(a.clientUrl==null||c==null||d==null||a.id==null))DISQUS.define("vglnk",function(){return{api_url:c,key:d,sub_id:g}}),e.vglnk_self="DISQUS.vglnk",DISQUS.require(a.clientUrl),DISQUS.defer(function(){return DISQUS.vglnk.opt},
function(){f.sendMessage("affiliationOptions",{timeout:DISQUS.vglnk.opt("click_timeout")})}),b(c,d,g)}});f.on("loadBackplane",function(){f.off("loadBackplane");l.backplane=new DISQUS.backplane.BackplaneIntegration(f)});u=e.setTimeout(function(){if(t)(new Image).src=DISQUS.serialize("//juggler.services.disqus.com/stat.gif",{event:"slow_embed"}),t.innerHTML+='<p>DISQUS seems to be taking longer than usual. <a href="#" onclick="DISQUS.reset({reload: true}); return false;">Reload</a>?</p>'},1E4);f.load(function(){i.notSupported?
(f.elem.setAttribute("height","500px"),f.elem.setAttribute("scrolling","yes"),f.elem.setAttribute("horizontalscrolling","no"),f.elem.setAttribute("verticalscrolling","yes")):(f.elem.setAttribute("scrolling","no"),f.elem.setAttribute("horizontalscrolling","no"),f.elem.setAttribute("verticalscrolling","no"))});d("window.hashchange",function(a){f.sendMessage("window.hashchange",a.hash)});d("window.resize",function(){f.sendMessage("window.resize")});d("window.scroll",l.scrollListener);d("window.click",
function(){f.sendMessage("window.click")});d("switches.changed",function(a){f.sendMessage("switches.changed",a)});l.trigger("loading.start")};d.prototype.destroy=function(){var a=this.indicators;this.off();if(this._boundGlobalEvents.length)DISQUS.off(this._boundGlobalEvents.join(" "),null,this),this._boundGlobalEvents=null;this.frame&&this.frame.destroy();if(a.north)a.north.destroy(),a.north=null;if(a.south)a.south.destroy(),a.south=null;DISQUS.App.prototype.destroy.call(this)};d.prototype.getWindowYCoords=
function(){if(typeof e.pageYOffset=="number")this.getWindowScroll=function(){return e.pageYOffset},this.getWindowHeight=function(){return e.innerHeight};else{var a=e.document,a=a.documentElement.clientHeight||a.documentElement.clientWidth?a.documentElement:a.body;this.getWindowScroll=function(){return a.scrollTop};this.getWindowHeight=function(){return a.clientHeight}}this.getWindowYCoords=function(){return{pageYOffset:this.getWindowScroll(),innerHeight:this.getWindowHeight()}};return this.getWindowYCoords()};
d.prototype.scrollListener=function(){var a=this.frame,b=a.getPosition(),c=b.top,d=c+a.elem.offsetHeight,e=this.getWindowYCoords(),g=e.pageYOffset,e=e.innerHeight,j=g+e,k=!1,f=!1;c<=j+e&&(f=(k=d>=g)&&c<=j);k&&(a.sendMessage("window.scroll",{frameOffset:b,pageOffset:g,height:e}),this.wasNearViewport||a.sendMessage("window.nearViewport"));this.wasNearViewport=k;if(f!==this.wasInViewport)a.sendMessage(f?"window.inViewport":"window.scrollOffViewport"),this.wasInViewport=f};var n=function(a){return new d(a)};
DISQUS.extend(n,{listByKey:function(){var a={};b(function(b){a[b.uid]=b});return a},list:function(){var a=[];b(function(b){a.push(b)});return a},get:function(a){a=DISQUS.App.get(a);return a instanceof d&&a}});return{Lounge:n}});
(function(e,j,c){function b(){function a(b){var b=b.getAttribute?b.getAttribute("src"):b.src,c=[/(https?:)\/\/(www\.)?disqus\.com\/forums\/([\w_\-]+)/i,/(https?:)\/\/(www\.)?([\w_\-]+)\.disqus\.com/i,/(https?:)\/\/(www\.)?dev\.disqus\.org\/forums\/([\w_\-]+)/i,/(https?:)\/\/(www\.)?([\w_\-]+)\.dev\.disqus\.org/i],d=c.length;if(!b||b.substring(b.length-8)!="embed.js")return null;for(var e=0;e<d;e++){var f=b.match(c[e]);if(f&&f.length&&f.length==4)return h=f[1]||null,f[3]}return null}for(var b=j.getElementsByTagName("script"),
c=b.length-1;c>=0;c--){var d=a(b[c]);if(d!==null)return d}return null}function k(){if(e.location.protocol==="https:")return!0;h===c&&b();return h==="https:"}function g(){for(var a=j.getElementsByTagName("h1"),b=j.title,d=b.length,e=b,g=0.6,h=0;h<a.length;h++)(function(a){var a=a.textContent||a.innerText,f;if(!(a===null||a===c)){f=0;for(var h=Array(b.length),i=0;i<=b.length;i++){h[i]=Array(a.length);for(var j=0;j<=a.length;j++)h[i][j]=0}for(i=0;i<b.length;i++)for(j=0;j<a.length;j++)b[i]==a[j]&&(h[i+
1][j+1]=h[i][j]+1,h[i+1][j+1]>f&&(f=h[i+1][j+1]));f/=d;f>g&&(g=f,e=a)}})(a[h]);return e}function a(){var a=j.getElementById(n);if(a){a.innerHTML="";var b=l.page;if(!e.postMessage||!e.JSON)r=!0;if(e.navigator.appName==="Microsoft Internet Explorer"&&(!j.documentMode||j.documentMode<8))r=!0;a={container:n,forum:i,sortOrder:"popular",permalink:m,useSSL:k(),language:l.language,typeface:d.isSerif(a)?"serif":"sans-serif",anchorColor:d.getAnchorColor(a),colorScheme:128<d.getContrastYIQ(d.getElementStyle(a,
"span","color"))?"dark":"light",url:b.url||e.location.href.replace(/#.*$/,""),title:b.title,documentTitle:g(),slug:b.slug,category:b.category_id,identifier:b.identifier,apiKey:b.api_key,remoteAuthS3:b.remote_auth_s3,sso:l.sso,useConman:e.disqus_demo,notSupported:r};o=DISQUS.Lounge(a);var c={onReady:"loading.done",onNewComment:"posts.create",onPaginate:"posts.paginate",onIdentify:"session.identify"};DISQUS.each(l.callbacks,function(a,b){c[b]&&DISQUS.each(a,function(a){o.on(c[b],a)})});o.init()}else(a=
e.console)&&typeof a.log==="function"&&a.log("DISQUS: Container (disqus_thread) element is missing.")}var d=DISQUS.use("next.publisher"),n=e.disqus_container_id||"disqus_thread",h,m=function(){var a=e.location.hash;return(a=a&&a.match(/comment\-([0-9]+)/))&&a[1]}(),l={page:{url:c,title:c,slug:c,category_id:c,identifier:c,language:c,api_key:c,remote_auth_s3:c,author_s3:c,developer:c},strings:c,sso:{},callbacks:{preData:[],preInit:[],onInit:[],afterRender:[],onReady:[],onNewComment:[],preReset:[],onPaginate:[],
onIdentify:[]}};DISQUS.each(["developer","shortname","identifier","url","title","category_id","language","slug"],function(a){var b=e["disqus_"+a];typeof b!=="undefined"&&(l.page[a]=b)});var i=e.disqus_shortname||b(),i=i.toLowerCase();if(typeof e.disqus_config==="function")try{e.disqus_config.call(l)}catch(s){}var o,r=!1;a();if(!r){var p=DISQUS.Switches({container:n,useSSL:k()});p.fetch({data:{forum:i}});DISQUS.domready(function(){if(j.getElementsByClassName){var a=j.getElementsByClassName("dsq-brlink");
a&&a.length&&a[0].parentNode.removeChild(a[0])}});DISQUS.request={get:function(a,b,c){DISQUS.require(a,b,c)}};DISQUS.reset=function(b){b=b||{};if(typeof b.config==="function")try{b.config.call(l)}catch(c){}o&&(o.destroy(),o=null);b.reload&&(a(),DISQUS.trigger("switches.changed",p.switches))}}})(this,this.document);