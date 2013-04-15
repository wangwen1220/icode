/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
KISSY.add("editor/core/selectionFix",function(q,l){function u(c){function f(b,a){var c=e.body.createTextRange();try{c.moveToPoint(b,a)}catch(g){c=s}return c}function j(){var b=e.selection.createRange();a&&!b.item&&0===b.compareEndPoints("StartToEnd",b)&&a.select();n.remove(e,"mouseup",j);n.remove(e,"mousemove",h);a=d=0}function h(b){if(b.button){if(b=f(b.pageX,b.pageY))0<b.compareEndPoints("StartToStart",a)?b.setEndPoint("StartToStart",a):b.setEndPoint("EndToEnd",a),b.select()}else j()}var d,i=c.get("window")[0],
e=c.get("document")[0],a;n.on(e,"mousedown contextmenu",function(b){var c=e.documentElement;if(b.target===c&&(d&&j(),!(c.scrollHeight>c.clientHeight)&&(d=1,a=f(b.pageX,b.pageY))))n.on(e,"mouseup",j),n.on(e,"mousemove",h),i.focus(),a.select()})}function v(c){function m(b){if(e){var a=c.getSelection(),h=a&&a.getType(),g=a&&j.selection;if(b&&g&&h==w.SELECTION_NONE&&!j.queryCommandEnabled("InsertImage"))setTimeout(function(){m(f)},50);else{var d;if(!g||!g.type||!("Control"!=g.type&&(d=g.createRange())&&
(d=d.parentElement())&&(d=d.nodeName)&&d.toLowerCase()in{input:1,textarea:1}))i=g&&a.getRanges()[0],c.checkSelectionChange()}}}var j=c.get("document")[0],h=new o(j.body),d=new o(j.documentElement);if(8>l.Utils.ieEngine)d.on("click",function(a){"html"===(new o(a.target)).nodeName()&&c.getSelection().getNative().createRange().select()});var i,e,a=f;d.on("mousedown",function(){a=p});d.on("mouseup",function(){a=f});h.on("focusin",function(b){if("body"==(new o(b.target)).nodeName()&&i){try{a&&i.select()}catch(c){}i=
s}});h.on("focus",function(){e=f;m()});h.on("beforedeactivate",function(b){b.relatedTarget||(e=p,a=f)});h.on("mousedown",function(){e=p});h.on("mouseup",function(){e=f;setTimeout(function(){m(f)},0)});h.on("keydown",function(){e=p});h.on("keyup",function(){e=f;setTimeout(function(){m()},0)})}function x(c){var f=c.get("document")[0];n.on(f,"mouseup keyup",function(){c.checkSelectionChange()})}function y(c){function m(a){var b=l.XHTML_DTD;return a._4e_isBlockBoundary()&&b.$empty[a.nodeName()]}function j(a){return d(a)&&
i(a)}var h=/\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;|(<\!--[\s\S]*?--\>))?\s*(:?<\/\1>)?(?=\s*$|<\/body>)/gi,d=l.Walker.whitespaces(f),i=l.Walker.bookmark(p,f),e=function(a){return d(a)&&8!=a.nodeType};c.on("selectionChange",function(a){var b=a.path,d=new o(c.get("document")[0].body),a=(a=a.selection)&&a.getRanges()[0],k=b.blockLimit;if(r.gecko){var g=b.block||b.blockLimit,i=g&&g.last(j);g&&g._4e_isBlockBoundary()&&(!i||!(1==i[0].nodeType&&i._4e_isBlockBoundary()))&&
"pre"!=g.nodeName()&&!g._4e_getBogus()&&g._4e_appendBogus()}if(a&&a.collapsed&&!b.block){if("body"==k.nodeName()){if((b=a.fixBlock(f,"p"))&&b[0]!=d[0].lastChild&&b._4e_outerHtml().match(h))if((k=b.next(e,1))&&k[0].nodeType==t.ELEMENT_NODE&&!m[k])a.moveToElementEditablePosition(k),b._4e_remove();else if((k=b.prev(e,1))&&k[0].nodeType==t.ELEMENT_NODE&&!m[k])a.moveToElementEditablePosition(k,k._4e_outerHtml().match(h)?p:f),b._4e_remove();a.select();c.notifySelectionChange()}b=c.get("document")[0];a=
new l.Range(b);a.moveToElementEditablePosition(d,f);"body"!==(new l.ElementPath(a.startContainer)).blockLimit.nodeName()&&(d=(new o(b.createElement("p"))).appendTo(d),r.ie||d._4e_appendBogus())}})}var f=!0,p=!1,s=null,r=q.UA,n=q.Event,t=q.DOM,o=q.Node,w=l.SELECTION;return{init:function(c){c.docReady(function(){r.ie?(u(c),v(c)):x(c)});y(c)}}},{requires:["./base","./selection"]});
