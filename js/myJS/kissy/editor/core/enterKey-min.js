/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
KISSY.add("editor/core/enterKey",function(i,m,o,p){function q(a){var b;b=a.getSelection().getRanges();for(var g=b.length-1;0<g;g--)b[g].deleteContents();b=b[0];g=b.document;if(b.checkStartOfBlock()&&b.checkEndOfBlock()){var c=(new p(b.startContainer)).block;if(c&&("li"==c.nodeName()||"li"==c.parent().nodeName()))return a.hasCommand("outdent")?(a.execCommand("save"),a.execCommand("outdent"),a.execCommand("save"),!0):!1}var f=b.splitBlock("p");if(!f)return!0;var a=f.previousBlock,c=f.nextBlock,n=f.wasStartOfBlock,
j=f.wasEndOfBlock,e;if(c)e=c.parent(),"li"==e.nodeName()&&(c._4e_breakParent(e),c._4e_move(c.next(),!0));else if(a&&(e=a.parent())&&"li"==e.nodeName())a._4e_breakParent(e),b.moveToElementEditablePosition(a.next()),a._4e_move(a.prev());if(!n&&!j){if("li"==c.nodeName()&&(e=c.first(o.invisible(!0)))&&i.inArray(e.nodeName(),["ul","ol"]))(k.ie?new l(g.createTextNode(" ")):new l(g.createElement("br"))).insertBefore(e);c&&b.moveToElementEditablePosition(c)}else{var d;if(a){if("li"==a.nodeName()||!r.test(a.nodeName()))d=
a.clone()}else c&&(d=c.clone());d||(d=new l("<p>",null,g));if(e=f.elementPath)for(var f=0,m=e.elements.length;f<m;f++){var h=e.elements[f];if(h.equals(e.block)||h.equals(e.blockLimit))break;s.$removeEmpty[h.nodeName()]&&(h=h.clone(),d._4e_moveChildren(h),d.append(h))}k.ie||d._4e_appendBogus();b.insertNode(d);if(k.ie&&n&&(!j||!a[0].childNodes.length))b.moveToElementEditablePosition(j?a:d),b.select();b.moveToElementEditablePosition(n&&!j?c:d)}k.ie||(c?(d=new l(g.createElement("span")),d.html("&nbsp;"),
b.insertNode(d),d.scrollIntoView(void 0,!1),b.deleteContents()):d.scrollIntoView(void 0,!1));b.select();return!0}function t(a){var b=a.get("document")[0];u.on(b,"keydown",function(b){if(13===b.keyCode&&!b.shiftKey&&!b.ctrlKey&&!b.metaKey){a.execCommand("save");var c=a.execCommand("enterBlock");a.execCommand("save");!1!==c&&b.preventDefault()}})}var k=i.UA,r=/^h[1-6]$/,s=m.XHTML_DTD,l=i.Node,u=i.Event;return{init:function(a){a.addCommand("enterBlock",{exec:q});a.docReady(function(){t(a)})}}},{requires:["./base",
"./walker","./elementPath"]});
