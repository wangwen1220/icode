/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 21:52
*/
KISSY.add("editor/plugin/dent-utils/cmd",function(m,q,r){function s(c){return c.nodeType==k.NodeType.ELEMENT_NODE&&"li"==k.nodeName(c)}function v(c,d,e){for(var f=c.startContainer,a=c.endContainer;f&&!f.parent().equals(d);)f=f.parent();for(;a&&!a.parent().equals(d);)a=a.parent();if(f&&a){for(var b=f,f=[],i=!1;!i;)b.equals(a)&&(i=!0),f.push(b),b=b.next();if(!(1>f.length)){var g=d._4e_parents(!0,void 0);g.each(function(a,b){g[b]=a});for(a=0;a<g.length;a++)if(n[g[a].nodeName()]){d=g[a];break}for(var b=
"indent"==e?1:-1,a=f[0],i=f[f.length-1],f={},h=r.listToArray(d,f),o=h[i.data("listarray_index")].indent,a=a.data("listarray_index");a<=i.data("listarray_index");a++){h[a].indent+=b;var m=h[a].parent;h[a].parent=new t(m[0].ownerDocument.createElement(m.nodeName()))}for(a=i.data("listarray_index")+1;a<h.length&&h[a].indent>o;a++)h[a].indent+=b;i=r.arrayToList(h,f,null,"p");b=[];if("outdent"==e){var l;if((l=d.parent())&&"li"==l.nodeName())for(var e=i.listNode.childNodes,j,a=e.length-1;0<=a;a--)(j=new t(e[a]))&&
"li"==j.nodeName()&&b.push(j)}i&&(k.insertBefore(i.listNode[0]||i.listNode,d[0]||d),d.remove());if(b&&b.length)for(a=0;a<b.length;a++){for(j=d=b[a];(j=j.next())&&j.nodeName()in n;)w.ie&&!d.first(function(a){return x(a)&&y(a)},1)&&d[0].appendChild(c.document.createTextNode(" ")),d[0].appendChild(j[0]);k.insertAfter(d[0],l[0])}q.Utils.clearAllMarkers(f)}}}function u(c,d){var e=parseInt(c.style(l),10);isNaN(e)&&(e=0);e+=("indent"==d?1:-1)*p;if(0>e)return!1;e=Math.max(e,0);e=Math.ceil(e/p)*p;c.css(l,
e?e+z:"");""===c[0].style.cssText&&c.removeAttr("style");return!0}var n={ol:1,ul:1},o=q.Walker,k=m.DOM,t=m.Node,w=m.UA,x=o.whitespaces(!0),l="margin-left",p=40,z="px",y=o.bookmark(!1,!0);return{checkOutdentActive:function(c){var d=c.blockLimit;return c.contains(n)?!0:(c=c.block||d)&&c.style(l)},addCommand:function(c,d){c.hasCommand(d)||c.addCommand(d,{exec:function(e){e.execCommand("save");var f=e.getSelection(),a=f&&f.getRanges()[0];if(a){for(var b=a.startContainer,c=a.endContainer,g=a.getCommonAncestor();g&&
!(g[0].nodeType==k.NodeType.ELEMENT_NODE&&n[g.nodeName()]);)g=g.parent();g&&b[0].nodeType==k.NodeType.ELEMENT_NODE&&b.nodeName()in n&&(b=new o(a),b.evaluator=s,a.startContainer=b.next());g&&c[0].nodeType==k.NodeType.ELEMENT_NODE&&c.nodeName()in n&&(b=new o(a),b.evaluator=s,a.endContainer=b.previous());c=f.createBookmarks(!0);if(g){for(b=g.first();b&&"li"!=b.nodeName();)b=b.next();var h=a.startContainer;(!(b[0]==h[0]||b.contains(h))||!u(g,d))&&v(a,g,d)}else{a=a.createIterator();a.enforceRealBlocks=
!0;for(a.enlargeBr=!0;g=a.getNextParagraph();)u(g,d)}f.selectBookmarks(c)}e.execCommand("save");e.notifySelectionChange()}})}}},{requires:["editor","../list-utils/"]});
