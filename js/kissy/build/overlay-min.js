/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 21:53
*/
KISSY.add("overlay/base",function(e,d,b,a,c,g,h,f){function k(a){var b=a.get("el"),h=e.all,b=b[0].cloneNode(!0);b.style.visibility="";b.style.overflow="hidden";b.className+=" "+a.get("prefixCls")+"overlay-ghost";var c;if(c=a.get("body"))a=h("."+a.get("prefixCls")+"stdmod-body",b),a.css({height:c.height(),width:c.width()}),a.html("");return h(b)}function j(a,b,h){a.__effectGhost&&a.__effectGhost.stop(1);var c=a.get("el"),f=e.all,g=a.get("effect"),d=f(g.target),f=g.duration,d=e.mix(d.offset(),{width:d.width(),
height:d.height()}),j=e.mix(c.offset(),{width:c.width(),height:c.height()}),i=k(a),g=g.easing;i.insertAfter(c);c.hide();b?(b=d,d=j):b=j;i.css(b);a.__effectGhost=i;i.animate(d,{duration:f,easing:g,complete:function(){a.__effectGhost=null;i.remove();c.show();h()}})}function i(a,b,c){var h=a.get("el"),f=a.get("effect"),g=f.effect||l,d=f.target;if(g==l&&!d)c();else if(d)j(a,b,c);else{var a=f.duration,f=f.easing,e=h.css("visibility"),d=b?1:0;h.stop(1,1);h.css({visibility:"visible",display:b?"none":"block"});
h[g+m[g][d]](a,function(){h.css({display:"block",visibility:e});c()},f)}}var l="none",m={fade:["Out","In"],slide:["Up","Down"]};return d.Controller.extend([b.ContentBox,b.Position,a,b.Align,c,g,h],{_uiSetVisible:function(a){var b=this;b.get("rendered")&&i(b,a,function(){b.fire(a?"show":"hide")})}},{ATTRS:{effect:{value:{effect:"",target:null,duration:0.5,easing:"easeOut"},setter:function(a){var b=a.effect;"string"==typeof b&&!m[b]&&(a.effect="")}},focusable:{value:!1},allowTextSelection:{value:!0},
closable:{value:!1},handleMouseEvents:{value:!1},xrender:{value:f}}},{xclass:"overlay",priority:10})},{requires:"component/base,component/extension,./extension/loading,./extension/close,./extension/resize,./extension/mask,./overlay-render".split(",")});
KISSY.add("overlay/dialog-render",function(e,d,b){return d.extend([b],{createDom:function(){var a=this.get("el"),b,g=this.get("header");if(!(b=g.attr("id")))g.attr("id",b=e.guid("ks-dialog-header"));a.attr("role","dialog").attr("aria-labelledby",b);a.append("<div tabindex='0' style='position:absolute;'></div>")}})},{requires:["./overlay-render","./extension/stdmod-render"]});
KISSY.add("overlay/dialog",function(e,d,b,a,c,g){var h=a.all,f=d.extend([c,g],{initializer:function(){var a=this,b;if((b=a.get("draggable"))&&!b.handlers)b.handlers=[function(){return a.get("header")}]},handleKeyEventInternal:function(b){if(this.get("escapeToClose")&&b.keyCode===a.KeyCodes.ESC){if("select"!=b.target.nodeName.toLowerCase()||b.target.disabled)this.close(),b.halt()}else a:if(b.keyCode==k){var c=this.get("el"),f=h(b.target),g=c.last();if(f.equals(c)&&b.shiftKey)g[0].focus(),b.halt();
else if(f.equals(g)&&!b.shiftKey)c[0].focus(),b.halt();else if(f.equals(c)||c.contains(f))break a;b.halt()}},_uiSetVisible:function(a){var b=this.get("el");a?(this.__lastActive=b[0].ownerDocument.activeElement,b[0].focus&&b[0].focus(),b.attr("aria-hidden","false")):(b.attr("aria-hidden","true"),this.__lastActive&&this.__lastActive.focus());f.superclass._uiSetVisible.apply(this,arguments)}},{ATTRS:{closable:{value:!0},xrender:{value:b},focusable:{value:!0},escapeToClose:{value:!0}}},{xclass:"dialog",
priority:20}),k=a.KeyCodes.TAB;return f},{requires:["./base","./dialog-render","node","./extension/stdmod","./extension/drag"]});
KISSY.add("overlay/extension/close-render",function(e,d){function b(a){return new d("<a tabindex='0' href='javascript:void(\"\u5173\u95ed\")' role='button' style='z-index:9' class='"+a+c+"close'><span class='"+a+c+"close-x'>\u5173\u95ed</span></a>")}function a(){}var c="ext-";a.ATTRS={closable:{value:!0},closeBtn:{}};a.HTML_PARSER={closeBtn:function(a){return a.one("."+this.get("prefixCls")+c+"close")}};a.prototype={_uiSetClosable:function(a){var c=this.get("closeBtn");a?(c||this.setInternal("closeBtn",c=b(this.get("prefixCls"))),
this.get("el").prepend(c)):c&&c.remove()}};return a},{requires:["node"]});
KISSY.add("overlay/extension/close",function(){function e(){}e.ATTRS={closable:{view:1},closeBtn:{view:1},closeAction:{value:"hide"}};var d={hide:"hide",destroy:"destroy"};e.prototype={_uiSetClosable:function(b){var a=this;b&&!a.__bindCloseEvent&&(a.__bindCloseEvent=1,a.get("closeBtn").on("click",function(b){a.close();b.preventDefault()}))},close:function(){this[d[this.get("closeAction")]||"hide"]()},__destructor:function(){var b=this.get("closeBtn");b&&b.detach()}};return e});
KISSY.add("overlay/extension/drag",function(e){function d(){}d.ATTRS={draggable:{setter:function(b){if(!0===b)return{}},value:{}}};d.prototype={_uiSetDraggable:function(b){var a=this,c,g=e.require("dd/base"),h,f,d;f=a.__drag;var j=a.__constrain,i=a.get("el");if(b&&!f&&g){f=g.Draggable;f=a.__drag=new f({node:i,move:1});if(b.proxy&&(h=e.require("dd/proxy")))b.proxy.moveOnEnd=!0,d=a.__proxy=(new h(b.proxy)).attachDrag(f);f.on("dragend",function(){var b;b=i.offset();a.set("x",b.left);a.set("y",b.top);
d&&i.css("visibility","visible")});if((h=b.scroll)&&(c=e.require("dd/scroll")))a.__scroll=(new c(h)).attachDrag(f)}f&&f.set("disabled",!b);if(b&&f){c=b.handlers;if(h=e.require("dd/constrain"))(b=b.constrain)?(j||(j=a.__constrain=(new h).attachDrag(f)),j.set("constrain",b)):j&&j.set("constrain",!1);c&&0<c.length&&f.set("handlers",c)}},__destructor:function(){var b=this.__proxy,a=this.__scroll,c=this.__constrain,d=this.__drag;a&&a.destroy();b&&b.destroy();c&&c.destroy();d&&d.destroy()}};return d});
KISSY.add("overlay/extension/loading-render",function(e,d){function b(){}b.prototype={loading:function(){this._loadingExtEl||(this._loadingExtEl=(new d("<div class='"+this.get("prefixCls")+"ext-loading' style='position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);'/>")).appendTo(this.get("el")));this._loadingExtEl.show()},unloading:function(){var a=this._loadingExtEl;a&&a.hide()}};return b},{requires:["node"]});
KISSY.add("overlay/extension/loading",function(){function e(){}e.prototype={loading:function(){this.get("view").loading();return this},unloading:function(){this.get("view").unloading();return this}};return e});
KISSY.add("overlay/extension/mask-render",function(e,d,b){function a(a){a=a.get("prefixCls")+"ext-mask "+a.getCssClassWithState("-mask");a=h("<div  style='width:"+(g?"expression(KISSY.DOM.docWidth())":"100%")+";left:0;top:0;height:"+(g?"expression(KISSY.DOM.docHeight())":"100%")+";position:"+(g?"absolute":"fixed")+";' class='"+a+"'>"+(g?"<iframe style='position:absolute;left:0;top:0;background:red;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;'></iframe>":
"")+"</div>").prependTo("body");a.unselectable();a.on("mousedown",function(a){a.preventDefault()});return a}function c(){}var g=6===d.ie,h=b.all;c.ATTRS={mask:{value:!1},maskNode:{}};c.prototype={__renderUI:function(){this.get("mask")&&this.set("maskNode",a(this))},__syncUI:function(){this.get("mask")&&this.ksSetMaskVisible(this.get("visible"),1)},ksSetMaskVisible:function(a,b){var c=this.getCssClassWithState("-mask-shown"),h=this.get("maskNode"),d=this.getCssClassWithState("-mask-hidden");a?h.removeClass(d).addClass(c):
h.removeClass(c).addClass(d);b||h.css("visibility",a?"visible":"hidden")},__destructor:function(){var a;(a=this.get("maskNode"))&&a.remove()}};return c},{requires:["ua","node"]});
KISSY.add("overlay/extension/mask",function(){function e(){}e.ATTRS={mask:{view:1},maskNode:{view:1}};var d={fade:["Out","In"],slide:["Up","Down"]};e.prototype={__bindUI:function(){var b,a,c=this.get("el"),g=this.get("view");if(a=this.get("mask"))b=this.get("maskNode"),this.on("afterVisibleChange",function(h){if(h=h.newVal){var f=parseInt(c.css("z-index"))||1;b.css("z-index",f-1)}f=a.effect||"none";if("none"==f)g.ksSetMaskVisible(h);else{g.ksSetMaskVisible(h,1);var e=a.duration,j=a.easing,i=h?1:0;
b.stop(1,1);b.css("display",h?"none":"block");b[f+d[f][i]](e,null,j)}})}};return e},{requires:["ua"]});KISSY.add("overlay/extension/resize",function(e){function d(){}d.ATTRS={resize:{value:{}}};d.prototype={__destructor:function(){var b=this.resizer;b&&b.destroy()},_uiSetResize:function(b){var a=e.require("resizable");this.resizer&&this.resizer.destroy();a&&b&&(b.node=this.get("el"),this.resizer=new a(b))}};return d});
KISSY.add("overlay/extension/stdmod-render",function(e,d){function b(){}function a(a,b){var c=a.get("contentEl"),e=a.get(b);e||(e=new d("<div class='"+a.get("prefixCls")+g+b+"'  ></div>"),e.appendTo(c),a.setInternal(b,e))}function c(a,b,c){b=a.get(b);"string"==typeof c?b.html(c):b.html("").append(c)}var g="stdmod-";b.ATTRS={header:{},body:{},footer:{},bodyStyle:{},footerStyle:{},headerStyle:{},headerContent:{},bodyContent:{},footerContent:{}};b.HTML_PARSER={header:function(a){return a.one("."+this.get("prefixCls")+
g+"header")},body:function(a){return a.one("."+this.get("prefixCls")+g+"body")},footer:function(a){return a.one("."+this.get("prefixCls")+g+"footer")}};b.prototype={__createDom:function(){a(this,"header");a(this,"body");a(this,"footer")},_uiSetBodyStyle:function(a){this.get("body").css(a)},_uiSetHeaderStyle:function(a){this.get("header").css(a)},_uiSetFooterStyle:function(a){this.get("footer").css(a)},_uiSetBodyContent:function(a){c(this,"body",a)},_uiSetHeaderContent:function(a){c(this,"header",
a)},_uiSetFooterContent:function(a){c(this,"footer",a)}};return b},{requires:["node"]});KISSY.add("overlay/extension/stdmod",function(){function e(){}e.ATTRS={header:{view:1},body:{view:1},footer:{view:1},bodyStyle:{view:1},footerStyle:{view:1},headerStyle:{view:1},headerContent:{view:1},bodyContent:{view:1},footerContent:{view:1}};return e});
KISSY.add("overlay/overlay-render",function(e,d,b,a,c,g,h){return b.Render.extend([a.ContentBox.Render,a.Position.Render,c,6===d.ie?a.Shim.Render:null,g,h])},{requires:"ua,component/base,component/extension,./extension/loading-render,./extension/close-render,./extension/mask-render".split(",")});
KISSY.add("overlay",function(e,d,b,a,c,g){d.Render=b;a.Render=c;d.Dialog=a;e.Dialog=a;d.Popup=g;return e.Overlay=d},{requires:["overlay/base","overlay/overlay-render","overlay/dialog","overlay/dialog-render","overlay/popup"]});
KISSY.add("overlay/popup",function(e,d,b){return d.extend({initializer:function(){var a=this;a.get("trigger")&&("mouse"===a.get("triggerType")?(a._bindTriggerMouse(),a.on("afterRenderUI",function(){a._bindContainerMouse()})):a._bindTriggerClick())},_bindTriggerMouse:function(){var a=this,c=a.get("trigger"),d;a.__mouseEnterPopup=function(c){a._clearHiddenTimer();d=e.later(function(){a._showing(c);d=b},1E3*a.get("mouseDelay"))};c.on("mouseenter",a.__mouseEnterPopup);a._mouseLeavePopup=function(){d&&
(d.cancel(),d=b);a._setHiddenTimer()};c.on("mouseleave",a._mouseLeavePopup)},_bindContainerMouse:function(){this.get("el").on("mouseleave",this._setHiddenTimer,this).on("mouseenter",this._clearHiddenTimer,this)},_setHiddenTimer:function(){var a=this;a._hiddenTimer=e.later(function(){a._hiding()},1E3*a.get("mouseDelay"))},_clearHiddenTimer:function(){this._hiddenTimer&&(this._hiddenTimer.cancel(),this._hiddenTimer=b)},_bindTriggerClick:function(){var a=this;a.__clickPopup=function(b){b.halt();if(a.get("toggle"))a[a.get("visible")?
"_hiding":"_showing"](b);else a._showing(b)};a.get("trigger").on("click",a.__clickPopup)},_showing:function(a){this.set("currentTrigger",e.one(a.target));this.show()},_hiding:function(){this.set("currentTrigger",b);this.hide()},destructor:function(){var a,b=this.get("trigger");b&&(this.__clickPopup&&b.detach("click",this.__clickPopup),this.__mouseEnterPopup&&b.detach("mouseenter",this.__mouseEnterPopup),this._mouseLeavePopup&&b.detach("mouseleave",this._mouseLeavePopup));(a=this.get("el"))&&a.detach("mouseleave",
this._setHiddenTimer,this).detach("mouseenter",this._clearHiddenTimer,this)}},{ATTRS:{trigger:{setter:function(a){return e.all(a)}},triggerType:{value:"click"},currentTrigger:{},mouseDelay:{value:0.1},toggle:{value:!1}}},{xclass:"popup",priority:20})},{requires:["./base"]});