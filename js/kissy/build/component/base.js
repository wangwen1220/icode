﻿/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 23:13
*/
/**
 * @ignore
 * @fileOverview mvc based component framework for kissy
 * @author yiminghe@gmail.com
 */
KISSY.add('component/base', function (S, Component, Controller, Render, Container, DelegateChildren, DecorateChildren, DecorateChild) {

    S.mix(Component, {
        Controller: Controller,
        'Render': Render,
        'Container': Container,
        'DelegateChildren': DelegateChildren,
        'DecorateChild': DecorateChild,
        'DecorateChildren': DecorateChildren
    });

    return Component;

}, {
    requires: [
        './base/impl',
        './base/controller',
        './base/render',
        './base/container',
        './base/delegate-children',
        './base/decorate-children',
        './base/decorate-child'
    ]
});/**
 * @ignore
 * @fileOverview Box
 * @author yiminghe@gmail.com
 */
KISSY.add('component/base/box-render', function (S) {

    var $ = S.all, doc = S.Env.host.document;

    function BoxRender() {
    }

    BoxRender.ATTRS = {
        el: {
            //容器元素
            setter: function (v) {
                return $(v);
            }
        },

        // 构建时批量生成，不需要执行单个
        elCls: {
        },

        elStyle: {
        },

        width: {
        },

        height: {
        },

        elTagName: {
            // 生成标签名字
            value: "div"
        },

        elAttrs: {
        },

        content: {
        },

        elBefore: {
            // better named to renderBefore, too late !
        },

        render: {},

        visible: {
            value: true
        },

        visibleMode: {
            value: "display"
        },
        // content 设置的内容节点,默认根节点
        contentEl: {
            valueFn: function () {
                return this.get("el");
            }
        }
    };

    BoxRender.HTML_PARSER = {
        el: function (srcNode) {
            return srcNode;
        },
        content: function (el) {
            var contentEl = this.get("contentEl") || el;
            return contentEl.html();
        }
    };

    BoxRender.prototype = {

        /**
         * @ignore
         * 只负责建立节点，如果是 decorate 过来的，甚至内容会丢失
         * 通过 render 来重建原有的内容
         */
        __createDom: function () {
            var self = this, el, contentEl;
            if (!self.get("srcNode")) {
                contentEl = self.get("contentEl");

                el = $("<" + self.get("elTagName") + ">");

                if (contentEl) {
                    el.append(contentEl);
                }

                self.setInternal("el", el);

                if (!contentEl) {
                    // 没取到,这里设下值, uiSet 时可以 set("content")  取到
                    self.setInternal("contentEl", el);
                }
            }
        },

        __renderUI: function () {
            var self = this;
            // 新建的节点才需要摆放定位
            if (!self.get("srcNode")) {
                var render = self.get("render"),
                    el = self.get("el"),
                    renderBefore = self.get("elBefore");
                if (renderBefore) {
                    el.insertBefore(renderBefore, undefined);
                } else if (render) {
                    el.appendTo(render, undefined);
                } else {
                    el.appendTo(doc.body, undefined);
                }
            }
        },

        _uiSetElAttrs: function (attrs) {
            this.get("el").attr(attrs);
        },

        _uiSetElCls: function (cls) {
            this.get("el").addClass(cls);
        },

        _uiSetElStyle: function (style) {
            this.get("el").css(style);
        },

        _uiSetWidth: function (w) {
            this.get("el").width(w);
        },

        _uiSetHeight: function (h) {
            var self = this;
            self.get("el").height(h);
        },

        _uiSetContent: function (c) {
            var self = this, el;
            // srcNode 时不重新渲染 content
            // 防止内部有改变，而 content 则是老的 html 内容
            if (self.get("srcNode") && !self.get("rendered")) {
            } else {
                el = self.get("contentEl");
                if (typeof c == "string") {
                    el.html(c);
                } else if (c) {
                    el.empty().append(c);
                }
            }
        },

        _uiSetVisible: function (visible) {
            var self = this,
                el = self.get("el"),
                shownCls = self.getCssClassWithState('-shown'),
                hiddenCls = self.getCssClassWithState('-hidden'),
                visibleMode = self.get("visibleMode");
            if (visible) {
                el.removeClass(hiddenCls);
                el.addClass(shownCls);
            } else {
                el.removeClass(shownCls);
                el.addClass(hiddenCls);
            }
            //return;
            // !TODO 兼容代码，去除，通过 css 控制隐藏属性
            if (visibleMode == "visibility") {
                el.css("visibility", visible ? "visible" : "hidden");
            } else {
                el.css("display", visible ? "" : "none");
            }
        },

        __destructor: function () {
            var el = this.get("el");
            if (el) {
                el.remove();
            }
        }
    };

    return BoxRender;
}, {
    requires: ['node']
});
/**
 * @ignore
 * @fileOverview Box
 * @author yiminghe@gmail.com
 */
KISSY.add('component/base/box', function () {

    /**
     * Box extension class.Represent a dom element.
     * @class KISSY.Component.Extension.Box
     * @private
     */
    function Box() {
    }

    Box.ATTRS =
    {
        /**
         * component's html content. Note: content and srcNode can not be set both!
         * @type {String|KISSY.NodeList}
         * @property content
         */
        /**
         * component's html content. Note: content and srcNode can not be set both!
         * @cfg {String|KISSY.NodeList} content
         */
        /**
         * @ignore
         */
        content: {
            view: 1
        },

        /**
         * component's width
         * @type {Number|String}
         * @property width
         */
        /**
         * component's width
         * @cfg {Number|String} width
         */
        /**
         * @ignore
         */
        width: {
            view: 1
        },

        /**
         * component's height
         * @type {Number|String}
         * @property height
         */
        /**
         * component's height
         * @cfg {Number|String} height
         */
        /**
         * @ignore
         */
        height: {
            view: 1
        },

        /**
         * css class of component's root element
         * @cfg {String} elCls
         */
        /**
         * @ignore
         */
        elCls: {
            view: 1
        },

        /**
         * name-value pair css style of component's root element
         * @cfg {Object} elStyle
         */
        /**
         * @ignore
         */
        elStyle: {
            view: 1
        },

        /**
         * name-value pair attribute of component's root element
         * @cfg {Object} elAttrs
         */
        /**
         * @ignore
         */
        elAttrs: {
            view: 1
        },

        /**
         * archor element where component insert before
         * @cfg {KISSY.NodeList} elBefore
         */
        /**
         * @ignore
         */
        elBefore: {
            // better named to renderBefore, too late !
            view: 1
        },

        /**
         * root element of current component
         * @type {KISSY.NodeList}
         * @readonly
         * @property el
         */
        /**
         * @ignore
         */
        el: {
            view: 1
        },

        /**
         * archor element where component append to
         * @cfg {KISSY.NodeList} render
         */
        /**
         * @ignore
         */
        render: {
            view: 1
        },

        /**
         * component's visibleMode,use css "display" or "visibility" to show this component
         * @cfg {String} visibleMode
         */
        /**
         * @ignore
         */
        visibleMode: {
            view: 1
        },

        /**
         * whether this component is visible after created.
         * will add css class {prefix}{component}-hidden or {prefix}{component}-shown to component's root el.
         *
         * Defaults to: true.
         *
         * @cfg {Boolean} visible
         */
        /**
         * whether this component is visible.
         * will add css class {prefix}{component}-hidden or {prefix}{component}-shown to component's root el.
         * @type {Boolean}
         * @property visible
         */
        /**
         * @ignore
         */
        visible: {
            value: true,
            view: 1
        },

        /**
         * the node to parse for configuration values,passed to component's HTML_PARSER definition
         * @cfg {KISSY.NodeList} srcNode
         */
        /**
         * @ignore
         */
        srcNode: {
            view: 1
        }
    };

    Box.prototype =
    {

        _uiSetVisible: function (v) {
            // do not fire event at render phrase
            if (this.get('rendered')) {
                this.fire(v ? "show" : "hide");
            }
        },

        /**
         * show component
         */
        show: function () {
            var self = this;
            self.render();
            self.set("visible", true);
            return self;
        },

        /**
         * hide component
         */
        hide: function () {
            var self = this;
            self.set("visible", false);
            return self;
        }
    };

    return Box;
});
/**
 * @ignore
 * @fileOverview container can delegate event for its children
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/container", function (S, Controller, DelegateChildren, DecorateChildren) {
    /**
     * @extends KISSY.Component.Controller
     * @class KISSY.Component.Container
     * Container class. Extend it to acquire the abilities of
     * delegating events and decorate from pre-rendered dom
     * for child components.
     */
    return Controller.extend([DelegateChildren, DecorateChildren]);

}, {
    requires: ['./controller', './delegate-children', './decorate-children']
});

/**
 * @ignore
 * TODO
 *  - handleMouseEvents false for container ?
 *//**
 * @ignore
 * @fileOverview Base Controller class for KISSY Component.
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/controller", function (S,Box, Event, Component, UIBase, Manager, Render, undefined) {

    var ie = S.Env.host.document.documentMode || S.UA.ie,
        Features = S.Features,
        Gesture = Event.Gesture,
        isTouchSupported = Features.isTouchSupported || Features.isMsPointerEnabled;

    function wrapperViewSetter(attrName) {
        return function (ev) {
            var self = this;
            // in case bubbled from sub component
            if (self == ev.target) {
                var value = ev.newVal,
                    view = self.get("view");
                view.set(attrName, value);
            }
        };
    }

    function wrapperViewGetter(attrName) {
        return function (v) {
            var self = this,
                view = self.get("view");
            return v === undefined ? view.get(attrName) : v;
        };
    }

    function initChild(self, c, renderBefore) {
        // 生成父组件的 dom 结构
        self.create();
        var contentEl = self.getContentElement();
        c = Component.create(c, self);
        c.setInternal("parent", self);
        // set 通知 view 也更新对应属性
        c.set("render", contentEl);
        c.set("elBefore", renderBefore);
        // 如果 parent 也没渲染，子组件 create 出来和 parent 节点关联
        // 子组件和 parent 组件一起渲染
        // 之前设好属性，view ，logic 同步还没 bind ,create 不是 render ，还没有 bindUI
        c.create(undefined);
        return c;
    }

    /**
     * 不使用 valueFn，
     * 只有 render 时需要找到默认，其他时候不需要，防止莫名其妙初始化
     * @ignore
     */
    function constructView(self) {
        // 逐层找默认渲染器
        var attrs,
            attrCfg,
            attrName,
            cfg = {},
            v,
            Render = self.get('xrender');

        // 将渲染层初始化所需要的属性，直接构造器设置过去
        attrs = self.getAttrs();

        // 整理属性，对纯属于 view 的属性，添加 getter setter 直接到 view
        for (attrName in attrs) {
            attrCfg = attrs[attrName];
            if (attrCfg.view) {
                // 先取后 getter
                // 防止死循环
                if (( v = self.get(attrName) ) !== undefined) {
                    cfg[attrName] = v;
                }

                // setter 不应该有实际操作，仅用于正规化比较好
                // attrCfg.setter = wrapperViewSetter(attrName);
                self.on("after" + S.ucfirst(attrName) + "Change",
                    wrapperViewSetter(attrName));
                // 逻辑层读值直接从 view 层读
                // 那么如果存在默认值也设置在 view 层
                // 逻辑层不要设置 getter
                attrCfg.getter = wrapperViewGetter(attrName);
            }
        }
        cfg.ksComponentCss = getComponentCss(self);
        return new Render(cfg);
    }

    function getComponentCss(self) {
        var constructor = self.constructor,
            cls,
            re = [];
        while (constructor && constructor != Controller) {
            cls = Manager.getXClassByConstructor(constructor);
            if (cls) {
                re.push(cls);
            }
            constructor = constructor.superclass && constructor.superclass.constructor;
        }
        return re.join(" ");
    }

    function isMouseEventWithinElement(e, elem) {
        var relatedTarget = e.relatedTarget;
        // 在里面或等于自身都不算 mouseenter/leave
        return relatedTarget &&
            ( relatedTarget === elem[0] ||
                elem.contains(relatedTarget) );
    }

    function wrapBehavior(self, action) {
        return self["__ks_wrap_" + action] = function (e) {
            if (!self.get("disabled")) {
                self[action](e);
            }
        };
    }

    function getWrapBehavior(self, action) {
        return self["__ks_wrap_" + action];
    }

    /**
     * Base Controller class for KISSY Component.
     * xclass: 'controller'.
     * @extends KISSY.Component.UIBase
     * @mixins KISSY.Component.Extension.Box
     * @class KISSY.Component.Controller
     */
    var Controller = UIBase.extend([Box], {

            /**
             * mark current instance as controller instance.
             * @type {boolean}
             * @member KISSY.Component.Controller
             */
            isController: true,

            /**
             * Get full class name for current component.
             * @param {String} classes class names without prefixCls. Separated by space.
             * @method
             * @protected
             * @return {String} class name with prefixCls
             */
            getCssClassWithPrefix: Manager.getCssClassWithPrefix,

            /**
             * Initialize this component.             *
             * @protected
             */
            initializer: function () {
                // initialize view
                this.setInternal("view", constructView(this));
            },

            /**
             * Constructor(or get) view object to create ui elements.
             * @protected
             *
             */
            createDom: function () {
                var self = this,
                    el,
                    view = self.get("view");
                view.create(undefined);
                el = view.getKeyEventTarget();
                if (!self.get("allowTextSelection")) {
                    el.unselectable(undefined);
                }
            },

            /**
             * Call view object to render ui elements.
             * @protected
             *
             */
            renderUI: function () {
                var self = this, i, children, child;
                self.get("view").render();
                // then render my children
                children = self.get("children").concat();
                self.get("children").length = 0;
                for (i = 0; i < children.length; i++) {
                    child = self.addChild(children[i]);
                    child.render();
                }
            },

            '_uiSetFocusable': function (focusable) {
                var self = this,
                    t,
                    el = self.getKeyEventTarget();
                if (focusable) {
                    el.attr("tabIndex", 0)
                        // remove smart outline in ie
                        // set outline in style for other standard browser
                        .attr("hideFocus", true)
                        .on("focus", wrapBehavior(self, "handleFocus"))
                        .on("blur", wrapBehavior(self, "handleBlur"))
                        .on("keydown", wrapBehavior(self, "handleKeydown"));
                } else {
                    el.removeAttr("tabIndex");
                    if (t = getWrapBehavior(self, "handleFocus")) {
                        el.detach("focus", t);
                    }
                    if (t = getWrapBehavior(self, "handleBlur")) {
                        el.detach("blur", t);
                    }
                    if (t = getWrapBehavior(self, "handleKeydown")) {
                        el.detach("keydown", t);
                    }
                }
            },

            '_uiSetHandleMouseEvents': function (handleMouseEvents) {

                var self = this, el = self.get("el"), t;

                if (handleMouseEvents) {

                    if (!isTouchSupported) {
                        el.on("mouseenter", wrapBehavior(self, "handleMouseEnter"))
                            .on("mouseleave", wrapBehavior(self, "handleMouseLeave"))
                            .on("contextmenu", wrapBehavior(self, "handleContextMenu"))
                    }

                    el.on(Gesture.start, wrapBehavior(self, "handleMouseDown"))
                        .on(Gesture.end, wrapBehavior(self, "handleMouseUp"))
                        // consider touch environment
                        .on(Gesture.tap, wrapBehavior(self, "performActionInternal"));

                    // click quickly only trigger click and dblclick in ie<9
                    // others click click dblclick
                    if (ie && ie < 9) {
                        el.on("dblclick", wrapBehavior(self, "handleDblClick"));
                    }

                } else {

                    if (!isTouchSupported) {
                        (t = getWrapBehavior(self, "handleMouseEnter")) &&
                        el.detach("mouseenter", t);
                        (t = getWrapBehavior(self, "handleMouseLeave")) &&
                        el.detach("mouseleave", t);
                        (t = getWrapBehavior(self, "handleContextMenu")) &&
                        el.detach("contextmenu", t);
                    }

                    (t = getWrapBehavior(self, "handleMouseDown")) &&
                    el.detach(Gesture.start, t);
                    (t = getWrapBehavior(self, "handleMouseUp")) &&
                    el.detach(Gesture.end, t);
                    (t = getWrapBehavior(self, "performActionInternal")) &&
                    el.detach(Gesture.tap, t);

                    if (ie && ie < 9) {
                        (t = getWrapBehavior(self, "handleDblClick")) &&
                        el.detach("dblclick", t);
                    }
                }
            },

            '_uiSetFocused': function (v) {
                if (v) {
                    this.getKeyEventTarget()[0].focus();
                }
            },

            /**
             * child component's render container.
             * @protected
             * @return {KISSY.NodeList}
             */
            getContentElement: function () {
                return this.get('view').getContentElement();
            },

            /**
             * focusable element of component.
             * @protected
             * @return {KISSY.NodeList}
             */
            getKeyEventTarget: function () {
                return this.get('view').getKeyEventTarget();
            },

            /**
             * Add the specified component as a child of current component
             * at the given 0-based index.
             * @param {KISSY.Component.Controller|Object} c
             * Child component instance to be added
             * or
             * Object describe child component
             * @param {String} [c.xclass] When c is a object, specify its child class.
             * @param {Number} [index]  0-based index at which
             * the new child component is to be inserted;
             * If not specified , the new child component will be inserted at last position.
             * @return {KISSY.Component.Controller} this
             */
            addChild: function (c, index) {
                var self = this,
                    children = self.get("children"),
                    renderBefore;
                if (index === undefined) {
                    index = children.length;
                }
                renderBefore = children[index] && children[index].get("el") || null;
                c = initChild(self, c, renderBefore);
                children.splice(index, 0, c);
                // 先 create 占位 再 render
                // 防止 render 逻辑里读 parent.get("children") 不同步
                // 如果 parent 已经渲染好了子组件也要立即渲染，就 创建 dom ，绑定事件
                if (self.get("rendered")) {
                    c.render();
                }
                return c;
            },

            /**
             * Removed the given child from this component,and returns it.
             *
             * If destroy is true, calls {@link KISSY.Component.UIBase#destroy} on the removed child component,
             * and subsequently detaches the child's DOM from the document.
             * Otherwise it is the caller's responsibility to
             * clean up the child component's DOM.
             *
             * @param {KISSY.Component.Controller} c The child component to be removed.
             * @param {Boolean} [destroy=false] If true,
             * calls {@link KISSY.Component.UIBase#destroy} on the removed child component.
             * @return {KISSY.Component.Controller} The removed component.
             */
            removeChild: function (c, destroy) {
                var self = this,
                    children = self.get("children"),
                    index = S.indexOf(c, children);
                if (index != -1) {
                    children.splice(index, 1);
                }
                if (destroy &&
                    // c is still json
                    c['destroy']) {
                    c['destroy']();
                }
                return c;
            },

            /**
             * Removes every child component attached to current component.
             * see {@link KISSY.Component.Controller#removeChild}
             * @param {Boolean} [destroy] If true,
             * calls {@link KISSY.Component.UIBase#destroy} on the removed child component.
             * @return {KISSY.Component.Controller} this
             */
            removeChildren: function (destroy) {
                var self = this,
                    i,
                    t = [].concat(self.get("children"));
                for (i = 0; i < t.length; i++) {
                    self.removeChild(t[i], destroy);
                }
                return self;
            },

            /**
             * Returns the child at the given index, or null if the index is out of bounds.
             * @param {Number} index 0-based index.
             * @return {KISSY.Component.Controller} The child at the given index; null if none.
             */
            getChildAt: function (index) {
                var children = this.get("children");
                return children[index] || null;
            },

            /**
             * Hack click in ie<9 by handling dblclick events.
             * By default, this performs its associated action by calling
             * {@link KISSY.Component.Controller#performActionInternal}.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleDblClick: function (ev) {
                this.performActionInternal(ev);
            },

            /**
             * Called by it's container component to dispatch mouseenter event.
             * @private
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleMouseOver: function (ev) {
                var self = this,
                    el = self.get("el");
                if (!isMouseEventWithinElement(ev, el)) {
                    self.handleMouseEnter(ev);
                }
            },

            /**
             * Called by it's container component to dispatch mouseleave event.
             * @private
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleMouseOut: function (ev) {
                var self = this,
                    el = self.get("el");
                if (!isMouseEventWithinElement(ev, el)) {
                    self.handleMouseLeave(ev);
                }
            },

            /**
             * Handle mouseenter events. If the component is not disabled, highlights it.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleMouseEnter: function (ev) {
                this.set("highlighted", !!ev);
            },

            /**
             * Handle mouseleave events. If the component is not disabled, de-highlights it.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleMouseLeave: function (ev) {
                var self = this;
                self.set("active", false);
                self.set("highlighted", !ev);
            },

            /**
             * Handles mousedown events. If the component is not disabled,
             * If the component is activeable, then activate it.
             * If the component is focusable, then focus it,
             * else prevent it from receiving keyboard focus.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleMouseDown: function (ev) {
                var self = this,
                    n,
                    isMouseActionButton = ev['which'] == 1,
                    el;
                if (isMouseActionButton || isTouchSupported) {
                    el = self.getKeyEventTarget();
                    if (self.get("activeable")) {
                        self.set("active", true);
                    }
                    if (self.get("focusable")) {
                        el[0].focus();
                        self.set("focused", true);
                    }

                    if (!self.get("allowTextSelection")) {
                        // firefox /chrome 不会引起焦点转移
                        n = ev.target.nodeName;
                        n = n && n.toLowerCase();
                        // do not prevent focus when click on editable element
                        if (n != "input" && n != "textarea") {
                            ev.preventDefault();
                        }
                    }
                }
            },

            /**
             * Handles mouseup events.
             * If this component is not disabled, performs its associated action by calling
             * {@link KISSY.Component.Controller#performActionInternal}, then deactivates it.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleMouseUp: function (ev) {
                var self = this;
                // 左键
                if (self.get("active") && (ev.which == 1 || isTouchSupported)) {
                    self.set("active", false);
                }
            },

            /**
             * Handles context menu.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleContextMenu: function (ev) {
            },

            /**
             * Handles focus events. Style focused class.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleFocus: function (ev) {
                this.set("focused", !!ev);
                this.fire("focus");
            },

            /**
             * Handles blur events. Remove focused class.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleBlur: function (ev) {
                this.set("focused", !ev);
                this.fire("blur");
            },

            /**
             * Handle enter keydown event to {@link KISSY.Component.Controller#performActionInternal}.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleKeyEventInternal: function (ev) {
                if (ev.keyCode == Event.KeyCodes.ENTER) {
                    return this.performActionInternal(ev);
                }
            },

            /**
             * Handle keydown events.
             * If the component is not disabled, call {@link KISSY.Component.Controller#handleKeyEventInternal}
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            handleKeydown: function (ev) {
                var self = this;
                if (self.handleKeyEventInternal(ev)) {
                    ev.halt();
                    return true;
                }
            },

            /**
             * Performs the appropriate action when this component is activated by the user.
             * @protected
             * @param {KISSY.Event.DOMEventObject} ev DOM event to handle.
             */
            performActionInternal: function (ev) {
            },

            destructor: function () {
                var self = this,
                    i,
                    view,
                    children = self.get("children");
                for (i = 0; i < children.length; i++) {
                    children[i].destroy && children[i].destroy();
                }
                self.get("view").destroy();
            }
        },
        {
            ATTRS: {

                /**
                 * Enables or disables mouse event handling for the component.
                 * Containers may set this attribute to disable mouse event handling
                 * in their child component.
                 *
                 * Defaults to: true.
                 *
                 * @cfg {Boolean} handleMouseEvents
                 * @protected
                 */
                /**
                 * @ignore
                 */
                handleMouseEvents: {
                    value: true
                },

                /**
                 * Whether this component can get focus.
                 *
                 * Defaults to: true.
                 *
                 * @protected
                 * @cfg {Boolean} focusable
                 */
                /**
                 * @ignore
                 */
                focusable: {
                    value: true,
                    view: 1
                },

                /**
                 * 1. Whether allow select this component's text.<br/>
                 * 2. Whether not to lose last component's focus if click current one (set false).
                 *
                 * Defaults to: false
                 *
                 * @cfg {Boolean} allowTextSelection
                 * @protected
                 */
                /**
                 * @ignore
                 */
                allowTextSelection: {
                    // 和 focusable 分离
                    // grid 需求：容器允许选择里面内容
                    value: false
                },

                /**
                 * Whether this component can be activated.
                 *
                 * Defaults to: true.
                 *
                 * @cfg {Boolean} activeable
                 * @protected
                 */
                /**
                 * @ignore
                 */
                activeable: {
                    value: true
                },

                /**
                 * Whether this component has focus.
                 * @type {Boolean}
                 * @property focused
                 */
                /**
                 * Whether this component has focus on initialization.
                 * @cfg {Boolean} focused
                 */
                /**
                 * @ignore
                 */
                focused: {
                    view: 1
                },

                /**
                 * Whether this component is activated.
                 * @type {Boolean}
                 * @property active
                 */
                /**
                 * @ignore
                 */
                active: {
                    view: 1
                },

                /**
                 * Whether this component is highlighted.
                 * @type {Boolean}
                 * @property highlighted
                 */
                /**
                 * @ignore
                 */
                highlighted: {
                    view: 1
                },

                /**
                 * Array of child components
                 * @cfg {KISSY.Component.Controller[]} children
                 */
                /**
                 * @ignore
                 */
                children: {
                    value: []
                },

                /**
                 * This component's prefix css class.
                 * @cfg {String} prefixCls
                 */
                /**
                 * @ignore
                 */
                prefixCls: {
                    value: 'ks-', // box srcNode need
                    view: 1
                },

                /**
                 * This component's parent component.
                 * @type {KISSY.Component.Controller}
                 * @property parent
                 */
                /**
                 * This component's parent component.
                 * @cfg {KISSY.Component.Controller} parent
                 */
                /**
                 * @ignore
                 */
                parent: {
                    setter: function (p) {
                        // 事件冒泡源
                        this.addTarget(p);
                    }
                },

                /**
                 * Whether this component is disabled.
                 * @type {Boolean}
                 * @property disabled
                 */
                /**
                 * Whether this component is disabled.
                 * @cfg {Boolean} disabled
                 */
                /**
                 * @ignore
                 */
                disabled: {
                    view: 1
                },

                /**
                 * Render class.
                 * @protected
                 * @cfg {*} xrender
                 */
                /**
                 * @ignore
                 */
                xrender: {
                    value: Render
                }
            }
        }, {
            xclass: 'controller'
        });

    return Controller;
}, {
    requires: ['./box','event', './impl', './uibase', './manager', './render']
});
/*

 yiminghe@gmail.com - 2012.10.31
 - 考虑触屏，绑定 Event.Gesture.tap 为主行为事件
 - handleMouseDown/up 对应 Gesture.start/end


 事件冒泡机制
 - child 组件的冒泡源配置为其所属的 parent
 - 性能考虑:不是 child 的所有事件都冒泡到 parent，要具体配置哪些事件需要冒泡

 view 和 controller 的平行关系
 - controller 初始化 -> initializer -> new view()
 - controller createDom -> createDom -> view.createDom()
 - controller renderUI -> renderUI -> view.render()


 控制层元属性配置中 view 的作用
 - 如果没有属性变化处理函数，自动生成属性变化处理函数，自动转发给 view 层
 - 如果没有指定 view 层实例，在生成默认 view 实例时，所有用户设置的 view 的属性都转到默认 view 实例中


 observer synchronization, model 分成两类
 - view 负责监听 view 类 model 变化更新界面
 - control 负责监听 control 类变化改变逻辑



 problem: Observer behavior is hard to understand and debug
 because it's implicit behavior.

 Keeping screen state and session state synchronized is an important task
 Data Binding.

 In general data binding gets tricky
 because if you have to avoid cycles where a change to the control,
 changes the record set, which updates the control,
 which updates the record set....
 The flow of usage helps avoid these -
 we load from the session state to the screen when the screen is opened,
 after that any changes to the screen state propagate back to the session state.
 It's unusual for the session state to be updated directly once the screen is up.
 As a result data binding might not be entirely bi-directional -
 just confined to initial upload and
 then propagating changes from the controls to the session state.

 Refer
 - http://martinfowler.com/eaaDev/uiArchs.html

 *//**
 * @ignore
 * @fileOverview decorate its children from one element
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/decorate-child", function (S, DecorateChildren) {
    function DecorateChild() {

    }

    S.augment(DecorateChild, DecorateChildren, {
        decorateInternal:function (element) {
            var self = this;
            // 不用 setInternal , 通知 view 更新
            self.set("el", element);
            var ui = self.get("decorateChildCls"),
                child = element.one("." + ui);
            // 可以装饰?
            if (child) {
                var UI = self.findUIConstructorByNode(child, 1);
                if (UI) {
                    // 可以直接装饰
                    self.decorateChildrenInternal(UI, child);
                } else {
                    // 装饰其子节点集合
                    self.decorateChildren(child);
                }
            }
        }
    });

    return DecorateChild;
}, {
    requires:['./decorate-children']
});/**
 * @ignore
 * @fileOverview decorate function for children render from markup
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/decorate-children", function (S, Manager) {


    function DecorateChildren() {

    }

    S.augment(DecorateChildren, {
        /**
         * Generate child component from root element.
         * @protected
         * @member KISSY.Component.Container
         * @param {KISSY.NodeList} el Root element of current component.
         */
        decorateInternal: function (el) {
            var self = this;
            // 不用 setInternal , 通知 view 更新
            self.set("el", el);
            self.decorateChildren(el);
        },

        /**
         * Get component's constructor from KISSY Node.
         * @member KISSY.Component.Container
         * @protected
         * @param {KISSY.NodeList} childNode Child component's root node.
         */
        findUIConstructorByNode: function (childNode, ignoreError) {
            var self = this,
                cls = childNode.attr("class") || "",
                prefixCls = self.get("prefixCls");
            // 过滤掉特定前缀
            cls = cls.replace(new RegExp("\\b" + prefixCls, "ig"), "");
            var UI = Manager.getConstructorByXClass(cls);
            if (!UI && !ignoreError) {
                S.log(childNode);
                S.error("can not find ui " + cls + " from this markup");
            }
            return UI;
        },

        // 生成一个组件
        decorateChildrenInternal: function (UI, c) {
            var self = this;
            self.addChild(new UI({
                srcNode: c,
                prefixCls: self.get("prefixCls")
            }));
        },

        /**
         * decorate child element from parent component's root element.
         * @private
         * @member KISSY.Component.Container
         * @param {KISSY.NodeList} el component's root element.
         */
        decorateChildren: function (el) {
            var self = this,
                children = el.children();
            children.each(function (c) {
                var UI = self.findUIConstructorByNode(c);
                self.decorateChildrenInternal(UI, c);
            });
        }
    });

    return DecorateChildren;

}, {
    requires: ['./manager']
});/**
 * @ignore
 * @fileOverview delegate events for children
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/delegate-children", function (S, UA, Event) {

    var ie = S.Env.host.document.documentMode || UA.ie,
        Features = S.Features,
        Gesture = Event.Gesture,
        isTouchSupported = Features.isTouchSupported || Features.isMsPointerEnabled;

    function DelegateChildren() {
    }

    function handleChildMouseEvents(e) {
        if (!this.get("disabled")) {
            var control = this.getOwnerControl(e.target, e);
            if (control && !control.get("disabled")) {
                // Child control identified; forward the event.
                switch (e.type) {
                    case Gesture.start:
                        control.handleMouseDown(e);
                        break;
                    case Gesture.end:
                        control.handleMouseUp(e);
                        break;
                    case Gesture.tap:
                        control.performActionInternal(e);
                        break;
                    case "mouseover":
                        control.handleMouseOver(e);
                        break;
                    case "mouseout":
                        control.handleMouseOut(e);
                        break;
                    case "contextmenu":
                        control.handleContextMenu(e);
                        break;
                    case "dblclick":
                        control.handleDblClick(e);
                        break;
                    default:
                        S.error(e.type + " unhandled!");
                }
            }
        }
    }

    DelegateChildren.ATTRS = {
        delegateChildren: {
            value: true
        }
    };

    S.augment(DelegateChildren, {

        __bindUI: function () {
            var self = this,
                events;
            if (self.get("delegateChildren")) {

                events = Gesture.start + " " + Gesture.end + " " + Gesture.tap + " ";

                if (!isTouchSupported) {
                    events += "mouseover mouseout contextmenu " +
                        (ie && ie < 9 ? "dblclick " : "");
                }

                self.get("el").on(events, handleChildMouseEvents, self);
            }
        },

        /**
         * Get child component which contains current event target node.
         * @protected
         * @member KISSY.Component.Container
         * @param {HTMLElement} target Current event target node.
         * @return {KISSY.Component.Controller}
         */
        getOwnerControl: function (target) {
            var self = this,
                children = self.get("children"),
                len = children.length,
                elem = self.get("el")[0];
            while (target && target !== elem) {
                for (var i = 0; i < len; i++) {
                    if (children[i].get("el")[0] === target) {
                        return children[i];
                    }
                }
                target = target.parentNode;
            }
            return null;
        }
    });

    return DelegateChildren;
}, {
    requires: ['ua', 'event']
});/**
 * @ignore
 * Setup component namespace.
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/impl", function (S, UIBase, Manager) {
    /**
     * @class KISSY.Component
     * @singleton
     * Component infrastructure.
     */
    var Component = {
        Manager:Manager,
        UIBase:UIBase
    };

    /**
     * Create a component instance using json with xclass.
     * @param {Object} component Component's json notation with xclass attribute.
     * @param {String} component.xclass Component to be newed 's xclass.
     * @param {KISSY.Component.Controller} self Component From which new component generated will inherit prefixCls
     * if component 's prefixCls is undefined.
     * @member KISSY.Component
     *
     *  for example:
     *
     *      create({
     *          xclass:'menu',
     *          children:[{
     *              xclass:'menuitem',
     *              content:"1"
     *          }]
     *      })
     */
    Component.create = function (component, self) {
        var childConstructor, xclass;
        if (component && (xclass = component.xclass)) {
            if (self && !component.prefixCls) {
                component.prefixCls = self.get("prefixCls");
            }
            childConstructor = Manager.getConstructorByXClass(xclass);
            if (!childConstructor) {
                S.error("can not find class by xclass desc : " + xclass);
            }
            component = new childConstructor(component);
        }
        return component;
    };

    return Component;
}, {
    requires:['./uibase', './manager']
});/**
 * @ignore
 * @fileOverview storage for component
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/manager", function (S) {
    var uis = {
        // 不带前缀 prefixCls
        /*
         "menu" :{
         priority:0,
         constructor:Menu
         }
         */
    };

    function getConstructorByXClass(cls) {
        var cs = cls.split(/\s+/), p = -1, t, ui = null;
        for (var i = 0; i < cs.length; i++) {
            var uic = uis[cs[i]];
            if (uic && (t = uic.priority) > p) {
                p = t;
                ui = uic.constructor;
            }
        }
        return ui;
    }

    function getXClassByConstructor(constructor) {
        for (var u in uis) {
            var ui = uis[u];
            if (ui.constructor == constructor) {
                return u;
            }
        }
        return 0;
    }

    function setConstructorByXClass(cls, uic) {
        if (S.isFunction(uic)) {
            uis[cls] = {
                constructor:uic,
                priority:0
            };
        } else {
            uic.priority = uic.priority || 0;
            uis[cls] = uic;
        }
    }


    function getCssClassWithPrefix(cls) {
        var cs = S.trim(cls).split(/\s+/);
        for (var i = 0; i < cs.length; i++) {
            if (cs[i]) {
                cs[i] = this.get("prefixCls") + cs[i];
            }
        }
        return cs.join(" ");
    }


    var componentInstances = {};

    /**
     * @class KISSY.Component.Manager
     * @member Component
     * @singleton
     * Manage component metadata.
     */
    var Manager =  {

        __instances:componentInstances,

        /**
         * associate id with component
         * @param {String} id
         * @param {KISSY.Component.Controller} component
         */
        addComponent:function (id, component) {
            componentInstances[id] = component;
        },

        /**
         * remove association id with component
         * @param {String} id
         */
        removeComponent:function (id) {
            delete componentInstances[id];
        },

        /**
         * get component by id
         * @param {String} id
         * @return {KISSY.Component.Controller}
         */
        'getComponent':function (id) {
            return componentInstances[id];
        },

        /**
         * complete css by prefix prefixCls
         * @return {String}
         * @method
         * @param {String} css
         */
        getCssClassWithPrefix:getCssClassWithPrefix,
        /**
         * Get css class name for this component constructor.
         * @param {Function} constructor Component's constructor.
         * @return {String}
         * @method
         */
        getXClassByConstructor:getXClassByConstructor,
        /**
         * Get component constructor by css class name.
         * @param {String} classNames Class names separated by space.
         * @return {Function}
         * @method
         */
        getConstructorByXClass:getConstructorByXClass,
        /**
         * Associate css class with component constructor.
         * @param {String} className Component's class name.
         * @param {Function} componentConstructor Component's constructor.
         * @method
         */
        setConstructorByXClass:setConstructorByXClass
    };

    Manager.getCssClassWithPrefix = getCssClassWithPrefix;

    return Manager;
});/**
 * @ignore
 * @fileOverview render base class for kissy
 * @author yiminghe@gmail.com
 * @see http://martinfowler.com/eaaDev/uiArchs.html
 */
KISSY.add("component/base/render", function (S, BoxRender, Component, UIBase, Manager) {

    /**
     * @ignore
     * Base Render class for KISSY Component.
     */
    return UIBase.extend([BoxRender], {

        /**
         * Get all css class name to be applied to the root element of this component for given state.
         * the css class names are prefixed with component name.
         * @param {String} [state] This component's state info.
         * @ignore
         */
        getCssClassWithState: function (state) {
            var self = this,
                componentCls = self.get("ksComponentCss") || "";
            state = state || "";
            return self.getCssClassWithPrefix(componentCls.split(/\s+/).join(state + " ") + state);
        },

        /**
         * Get full class name (with prefix) for current component
         * @param classes {String} class names without prefixCls. Separated by space.
         * @method
         * @return {String} class name with prefixCls
         * @ignore
         */
        getCssClassWithPrefix: Manager.getCssClassWithPrefix,

        createDom: function () {
            var self = this;
            self.get("el").addClass(self.getCssClassWithState());
        },

        /**
         * Returns the dom element which is responsible for listening keyboard events.
         * @return {KISSY.NodeList}
         * @ignore
         */
        getKeyEventTarget: function () {
            return this.get("el");
        },

        /**
         * @ignore
         */
        _uiSetHighlighted: function (v) {
            var self = this,
                componentCls = self.getCssClassWithState("-hover"),
                el = self.get("el");
            el[v ? 'addClass' : 'removeClass'](componentCls);
        },

        /**
         * @ignore
         */
        _uiSetDisabled: function (v) {
            var self = this,
                componentCls = self.getCssClassWithState("-disabled"),
                el = self.get("el");
            el[v ? 'addClass' : 'removeClass'](componentCls)
                .attr("aria-disabled", v);
            if (self.get("focusable")) {
                //不能被 tab focus 到
                self.getKeyEventTarget().attr("tabIndex", v ? -1 : 0);
            }
        },
        /**
         * @ignore
         */
        _uiSetActive: function (v) {
            var self = this,
                componentCls = self.getCssClassWithState("-active");
            self.get("el")[v ? 'addClass' : 'removeClass'](componentCls)
                .attr("aria-pressed", !!v);
        },
        /**
         * @ignore
         */
        _uiSetFocused: function (v) {
            var self = this,
                el = self.get("el"),
                componentCls = self.getCssClassWithState("-focused");
            el[v ? 'addClass' : 'removeClass'](componentCls);
        },

        /**
         * Return the dom element into which child component to be rendered.
         * @return {KISSY.NodeList}
         * @ignore
         */
        getContentElement: function () {
            return this.get("contentEl") || this.get("el");
        }

    }, {//  screen state
        ATTRS: {

            prefixCls: {
                value: "ks-"
            },

            focusable: {
                value: true
            },

            focused: {},

            active: {},

            disabled: {},

            highlighted: {}
        },
        HTML_PARSER: {
            disabled: function (el) {
                var self = this, componentCls = self.getCssClassWithState("-disabled");
                return self.get("el").hasClass(componentCls);
            }
        }
    });
}, {
    requires: ['./box-render', './impl', './uibase', './manager']
});/**
 * @ignore
 * @fileOverview UIBase
 * @author yiminghe@gmail.com, lifesinger@gmail.com
 */
KISSY.add('component/base/uibase', function (S, RichBase, Node, Manager, undefined) {

    var UI_SET = '_uiSet',
        SRC_NODE = 'srcNode',
        ATTRS = 'ATTRS',
        HTML_PARSER = 'HTML_PARSER',
        ucfirst = S.ucfirst,
        noop = S.noop;

    // 收集单继承链，子类在前，父类在后
    function collectConstructorChains(self) {
        var constructorChains = [],
            c = self.constructor;
        while (c) {
            constructorChains.push(c);
            c = c.superclass && c.superclass.constructor;
        }
        return constructorChains;
    }

    /**
     * init srcNode
     * @ignore
     */
    function initSrcNode(self, srcNode) {
        var c = self.constructor,
            len,
            p,
            constructorChains;

        constructorChains = collectConstructorChains(self);

        // 从父类到子类开始从 html 读取属性
        for (len = constructorChains.length - 1; len >= 0; len--) {
            c = constructorChains[len];
            if (p = c[HTML_PARSER]) {
                applyParser.call(self, srcNode, p);
            }
        }
    }

    function applyParser(srcNode, parser) {
        var self = this,
            p, v,
            userConfig = self.userConfig || {};

        // 从 parser 中，默默设置属性，不触发事件
        for (p in parser) {
            // 用户设置过那么这里不从 dom 节点取
            // 用户设置 > html parser > default value
            if (!(p in userConfig)) {
                v = parser[p];
                // 函数
                if (S.isFunction(v)) {
                    self.setInternal(p, v.call(self, srcNode));
                }
                // 单选选择器
                else if (typeof v == 'string') {
                    self.setInternal(p, srcNode.one(v));
                }
                // 多选选择器
                else if (S.isArray(v) && v[0]) {
                    self.setInternal(p, srcNode.all(v[0]))
                }
            }
        }
    }

    /**
     * 根据属性变化设置 UI
     * @ignore
     */
    function bindUI(self) {
        var attrs = self.getAttrs(),
            attr, m;

        for (attr in attrs) {
            m = UI_SET + ucfirst(attr);
            if (self[m]) {
                // 自动绑定事件到对应函数
                (function (attr, m) {
                    self.on('after' + ucfirst(attr) + 'Change', function (ev) {
                        // fix! 防止冒泡过来的
                        if (ev.target === self) {
                            self[m](ev.newVal, ev);
                        }
                    });
                })(attr, m);
            }
        }
    }

    /**
     * 根据当前（初始化）状态来设置 UI
     * @ignore
     */
    function syncUI(self) {
        var v,
            f,
            i,
            c,
            a,
            m,
            cache = {},
            constructorChains = collectConstructorChains(self),
            attrs;

        // 从父类到子类执行同步属性函数
        for (i = constructorChains.length - 1; i >= 0; i--) {
            c = constructorChains[i];
            if (attrs = c[ATTRS]) {
                for (a in attrs) {
                    // 防止子类覆盖父类属性定义造成重复执行
                    if (!cache[a]) {
                        cache[a] = 1;
                        m = UI_SET + ucfirst(a);
                        // 存在方法，并且用户设置了初始值或者存在默认值，就同步状态
                        if ((f = self[m]) &&
                            // 用户如果设置了显式不同步，就不同步，
                            // 比如一些值从 html 中读取，不需要同步再次设置
                            attrs[a].sync !== false &&
                            (v = self.get(a)) !== undefined) {
                            f.call(self, v);
                        }
                    }
                }
            }
        }
    }

    /**
     * @class KISSY.Component.UIBase
     * @extends KISSY.Base
     * UIBase for class-based component.
     */
    var UIBase = RichBase.extend({

        constructor: function UIBaseConstructor() {
            var self = this, srcNode;
            UIBase.superclass.constructor.apply(self, arguments);
            // decorate may perform complex create
            if (self.decorateInternal &&
                (srcNode = self.get('srcNode'))) {
                self.decorateInternal(srcNode);
            }
            if (self.get('autoRender')) {
                self.render();
            }
        },

        initializer: function () {
            var self = this,
                id, srcNode = S.one(self.get(SRC_NODE));

            // register instance if config id
            if (id = self.get("id")) {
                Manager.addComponent(id, self);
            }

            if (srcNode) {
                // 根据 srcNode 设置属性值
                // so initializer can not read attribute in case srcNode is set
                initSrcNode(self, srcNode);

                self.setInternal(SRC_NODE, srcNode);
            }
        },

        /**
         * Create dom structure of this component.
         */
        create: function () {
            var self = this;
            // 是否生成过节点
            if (!self.get("created")) {
                /**
                 * @event beforeCreateDom
                 * fired before root node is created
                 * @param {KISSY.Event.CustomEventObject} e
                 */
                self.fire('beforeCreateDom');
                self.callMethodByHierarchy("createDom", "__createDom");
                self.setInternal("created", true);

                /**
                 * @event afterCreateDom
                 * fired when root node is created
                 * @param {KISSY.Event.CustomEventObject} e
                 */
                self.fire('afterCreateDom');
                self.callPluginsMethod("createDom");
            }
            return self;
        },

        /**
         * Put dom structure of this component to document and bind event.
         */
        render: function () {
            var self = this;
            // 是否已经渲染过
            if (!self.get("rendered")) {

                self.create(undefined);

                /**
                 * @event beforeRenderUI
                 * fired when root node is ready
                 * @param {KISSY.Event.CustomEventObject} e
                 */

                self.fire('beforeRenderUI');
                self.callMethodByHierarchy("renderUI", "__renderUI");

                /**
                 * @event afterRenderUI
                 * fired after root node is rendered into dom
                 * @param {KISSY.Event.CustomEventObject} e
                 */

                self.fire('afterRenderUI');
                self.callPluginsMethod("renderUI");

                /**
                 * @event beforeBindUI
                 * fired before component 's internal event is bind.
                 * @param {KISSY.Event.CustomEventObject} e
                 */

                self.fire('beforeBindUI');
                bindUI(self);
                self.callMethodByHierarchy("bindUI", "__bindUI");

                /**
                 * @event afterBindUI
                 * fired when component 's internal event is bind.
                 * @param {KISSY.Event.CustomEventObject} e
                 */

                self.fire('afterBindUI');
                self.callPluginsMethod("bindUI");

                /**
                 * @event beforeSyncUI
                 * fired before component 's internal state is synchronized.
                 * @param {KISSY.Event.CustomEventObject} e
                 */

                self.fire('beforeSyncUI');

                syncUI(self);
                self.callMethodByHierarchy("syncUI", "__syncUI");

                /**
                 * @event afterSyncUI
                 * fired after component 's internal state is synchronized.
                 * @param {KISSY.Event.CustomEventObject} e
                 */

                self.fire('afterSyncUI');
                self.callPluginsMethod("syncUI");
                self.setInternal("rendered", true);
            }
            return self;
        },

        /**
         * For overridden. DOM creation logic of subclass component.
         * @protected
         * @method
         */
        createDom: noop,

        /**
         * For overridden. Render logic of subclass component.
         * @protected
         * @method
         */
        renderUI: noop,

        /**
         * For overridden. Bind logic for subclass component.
         * @protected
         * @method
         */
        bindUI: noop,

        /**
         * For overridden. Sync attribute with ui.
         * @protected
         * @method
         */
        syncUI: noop,

        plug: function () {
            var self = this,
                p,
                plugins = self.get('plugins');
            UIBase.superclass.plug.apply(self, arguments);
            p = plugins[plugins.length - 1];
            if (self.get('rendered')) {
                p.createDom(self);
                p.renderUI(self);
                p.bindUI(self);
                p.syncUI(self);
            } else if (self.get('created')) {
                p.createDom(self);
            }
        },


        /**
         * Destroy this component.
         */
        destructor: function () {
            var self = this,
                id;
            // remove instance if set id
            if (id = self.get("id")) {
                Manager.removeComponent(id);
            }
            return self;
        }
    }, {

        ATTRS: {
            /**
             * Whether this component is rendered.
             * @type {Boolean}
             * @property rendered
             */
            /**
             * @ignore
             */
            rendered: {
                value: false
            },
            /**
             * Whether this component 's dom structure is created.
             * @type {Boolean}
             * @property created
             */
            /**
             * @ignore
             */
            created: {
                value: false
            },

            /**
             * get xclass of current component instance.
             * @property xclass
             * @type {String}
             */
            /**
             * @ignore
             */
            xclass: {
                valueFn: function () {
                    return Manager.getXClassByConstructor(this.constructor);
                }
            }
        }
    });

    // RichBase.extend
    var originalExtend = UIBase.extend;

    S.mix(UIBase, {
        /**
         * Parse attribute from existing dom node.
         * @static
         * @protected
         * @property HTML_PARSER
         * @member KISSY.Component.UIBase
         *
         * for example:
         *     @example
         *     Overlay.HTML_PARSER={
         *          // el: root element of current component.
         *          "isRed":function(el){
         *              return el.hasClass("ks-red");
         *          }
         *      };
         */
        HTML_PARSER: {},

        /**
         * Create a new class which extends UIBase .
         * @param {Function[]} extensions Class constructors for extending.
         * @param {Object} px Object to be mixed into new class 's prototype.
         * @param {Object} sx Object to be mixed into new class.
         * @static
         * @return {KISSY.Component.UIBase} A new class which extends UIBase .
         */
        extend: function extend(extensions, px, sx) {
            var args = S.makeArray(arguments),
                baseClass = this,
                parsers = {},
                newClass,
                last = args[args.length - 1];

            if (last.xclass) {
                args.pop();
                args.push(last.xclass);
            }

            newClass = originalExtend.apply(baseClass, args);

            if (S.isArray(extensions)) {
                // [ex1,ex2]，扩展类后面的优先，ex2 定义的覆盖 ex1 定义的
                // 主类最优先
                S.each(extensions['concat'](newClass), function (ext) {
                    if (ext) {
                        // 合并 HTML_PARSER 到主类
                        S.each(ext[HTML_PARSER], function (v, name) {
                            parsers[name] = v;
                        });
                    }
                });
                newClass[HTML_PARSER] = parsers;
            }

            if (last.xclass) {
                Manager.setConstructorByXClass(last.xclass, {
                    constructor: newClass,
                    priority: last.priority
                });
            }

            newClass.extend = extend;
            return newClass;
        }
    });

    return UIBase;
}, {
    requires: ["rich-base", "node", "./manager"]
});
/**
 * @ignore
 *
 * Refer:
 *  - http://martinfowler.com/eaaDev/uiArchs.html
 *
 * render 和 create 区别
 *  - render 包括 create ，以及把生成的节点放在 document 中
 *  - create 仅仅包括创建节点
 **/
