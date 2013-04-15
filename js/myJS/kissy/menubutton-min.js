/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:08
*/
KISSY.add("menubutton/base",function(d,e,g,m,i,l,h){function f(c,a){var b=c.get("menu");if(b&&b.xclass)if(a)b=l.create(b,c),c.__set("menu",b);else return null;return b}function n(){var c=f(this);if(c&&c.get("visible")){var a=d.clone(c.get("align"));a.node=this.get("el");d.mix(a,b,!1);c.set("align",a)}}var o=d.Env.host,k=d.buffer(n,50),j=e.all,a=e.KeyCodes,b={points:["bl","tl"],overflow:{adjustX:1,adjustY:1}},p=g.extend([l.DecorateChild],{_uiSetCollapsed:function(c){if(c)(c=f(this))&&c.hide();else{var c=
this.get("el"),a=f(this,1);a&&!a.get("visible")&&(a.render(),this.bindMenu(),this.get("matchElWidth")&&a.set("width",c.innerWidth()),a.show(),n.call(this),c.attr("aria-haspopup",a.get("el").attr("id")))}},bindMenu:function(){var c=this,a=c.get("menu");a.on("afterActiveItemChange",function(a){c.set("activeItem",a.newVal)});a.on("click",c.handleMenuClick,c);j(o).on("resize",k,c);c.bindMenu=d.noop},handleMenuClick:function(c){this.fire("click",{target:c.target})},handleKeyEventInternal:function(c){var b=
f(this);if(c.keyCode==a.SPACE){if(c.preventDefault(),"keyup"!=c.type)return h}else if("keydown"!=c.type)return h;return b&&b.get("visible")?(b=b.handleKeydown(c),c.keyCode==a.ESC?(this.set("collapsed",!0),!0):b):c.keyCode==a.SPACE||c.keyCode==a.DOWN||c.keyCode==a.UP?(this.set("collapsed",!1),!0):h},performActionInternal:function(){this.set("collapsed",!this.get("collapsed"))},handleBlur:function(c){p.superclass.handleBlur.call(this,c);this.set("collapsed",!0)},addItem:function(c,a){f(this,1).addChild(c,
a)},removeItem:function(a,b){var d=f(this);d&&d.removeChild(a,b)},removeItems:function(a){var b=this.get("menu");b&&(b.removeChildren?b.removeChildren(a):b.children&&(b.children=[]))},getItemAt:function(a){var b=f(this);return b&&b.getChildAt(a)},_uiSetDisabled:function(a){!a&&this.set("collapsed",!0)},decorateChildrenInternal:function(a,b){d.one(b[0].ownerDocument.body).prepend(b);this.__set("menu",new a(d.mix({srcNode:b,prefixCls:this.get("prefixCls")})))},destructor:function(){j(o).detach("resize",
k,this);var a=this.get("menu");a.destroy&&a.destroy()}},{ATTRS:{activeItem:{view:1},matchElWidth:{value:!0},decorateChildCls:{valueFn:function(){return this.get("prefixCls")+"popupmenu"}},menu:{value:{xclass:"popupmenu"},setter:function(a){a instanceof i&&a.__set("parent",this)}},collapsed:{view:1},xrender:{value:m}}},{xclass:"menu-button",priority:20});return p},{requires:["node","button","./baseRender","menu","component"]});
KISSY.add("menubutton/baseRender",function(d,e){return e.Render.extend({createDom:function(){this.get("el").append('<div class="ks-inline-block ks-menu-button-dropdown"><div class="ks-menu-button-dropdown-inner"></div></div>').attr("aria-haspopup",!0)},_uiSetCollapsed:function(d){var e=this.get("el"),i=this.getCssClassWithPrefix("menu-button-open");e[d?"removeClass":"addClass"](i).attr("aria-expanded",!d)},_uiSetActiveItem:function(d){this.get("el").attr("aria-activedescendant",d&&d.get("el").attr("id")||
"")}},{ATTRS:{contentEl:{valueFn:function(){return d.all('<div class="ks-inline-block ks-menu-button-caption"></div>')}},contentElCls:{value:"ks-menu-button-caption"},activeItem:{},collapsed:{value:!0}}})},{requires:["button"]});KISSY.add("menubutton",function(d,e,g,m,i){e.Render=g;e.Select=m;e.Option=i;return e},{requires:["menubutton/base","menubutton/baseRender","menubutton/select","menubutton/option"]});
KISSY.add("menubutton/option",function(d,e){var g=e.Item.extend({handleBlur:function(){return g.superclass.handleBlur.apply(this,arguments)}},{ATTRS:{selectable:{value:!0},textContent:{}}},{xclass:"option",priority:10});return g},{requires:["menu"]});
KISSY.add("menubutton/select",function(d,e,g,m,i,l){function h(a){var b=a.get("menu"),b=b.children||b.get&&b.get("children")||[],a=a.get("value"),d,c;for(c=0;c<b.length;c++)if(d=b[c],f(d)==a)return d;return null}function f(a){var b;if(a)if(a.get){if((b=a.get("value"))===l)b=a.get("textContent")||a.get("content")}else if((b=a.value)===l)b=a.textContent||a.content;return b}function n(a){var b=a.get("menu"),e=a.get("value"),a=b&&b.get&&b.get("children");d.each(a,function(a){a&&a.set&&a.set("selected",
f(a)==e)})}function o(){var a=h(this),b=this.get("menu");b.set("highlightedItem",a||b.getChildAt(0));a&&a.set("selected",!0)}function k(a){var b=h(a),d=b&&(b.textContent||b.get&&b.get("textContent")),b=b&&(b.content||b.get&&b.get("content"));a.set("content",d||b||a.get("defaultCaption"))}var j=g.extend({bindMenu:function(){j.superclass.bindMenu.call(this);this.get("menu").on("show",o,this)},handleMenuClick:function(a){var a=a.target,b=h(this);this.set("value",f(a));this.set("collapsed",!0);this.fire("click",
{target:a,prevTarget:b})},removeItems:function(){j.superclass.removeItems.apply(this,arguments);this.set("value",null)},removeItem:function(a){j.superclass.removeItem.apply(this,arguments);a.get("value")==this.get("value")&&this.set("value",null)},_uiSetValue:function(){n(this);k(this)},_uiSetDefaultCaption:function(){k(this)}},{ATTRS:{value:{},defaultCaption:{value:""}},decorate:function(a,b){a=d.one(a);b=b||{};b.elBefore=a;var f,c=[],g,h=null,i=a.val();a.all("option").each(function(a){var b={content:a.text(),
elCls:a.attr("class"),value:a.val(),xclass:"option"};i==a.val()&&(h={content:b.content,value:b.value});c.push(b)});d.mix(b,{menu:d.mix({xclass:"popupmenu",children:c},b.menuCfg)});delete b.menuCfg;g=(new j(d.mix(b,h))).render();if(f=a.attr("name")){var k=(new e("<input type='hidden' name='"+f+"' value='"+i+"'>")).insertBefore(a,l);g.on("afterValueChange",function(a){k.val(a.newVal||"")})}a.remove();return g}},{xclass:"select",priority:30});return j},{requires:["node","./base","menu","./option"]});
