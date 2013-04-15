define("arale/overlay/0.9.12/overlay-debug", ["$-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug"], function(require, exports, module) {

    var $ = require('$-debug'),
        Position = require('arale/position/1.0.0/position-debug'),
        Shim = require('arale/iframe-shim/1.0.0/iframe-shim-debug'),
        Widget = require('arale/widget/1.0.2/widget-debug');


    // Overlay
    // -------
    // Overlay 组件的核心特点是可定位（Positionable）和可层叠（Stackable），是一切悬浮类
    // UI 组件的基类。

    var Overlay = Widget.extend({

        attrs: {
            // 基本属性
            width: '',
            height: '',
            zIndex: 99,
            visible: false,

            // 定位配置
            align: {
                // element 的定位点，默认为左上角
                selfXY: [0, 0],
                // 基准定位元素，默认为当前可视区域
                baseElement: Position.VIEWPORT,
                // 基准定位元素的定位点，默认为左上角
                baseXY: [0, 0]
            },

            // 父元素
            parentNode: document.body
        },

        show: function() {
            // 若从未渲染，则调用 render
            if (!this.rendered) {
                this.render();
            }
            this.set('visible', true);
            this._setPosition();
            return this;
        },

        hide: function() {
            this.set('visible', false);
            return this;
        },

        setup: function() {
            // 加载 iframe 遮罩层并与 overlay 保持同步
            this._setupShim();
            // 窗口resize时，重新定位浮层
            this._setupResize();
        },

        // 进行定位
        _setPosition: function(align) {
            // 不在文档流中，定位无效
            if (!isInDocument(this.element[0])) return;

            align || (align = this.get('align'));
            var isHidden = this.element.css('display') === 'none';

            // 在定位时，为避免元素高度不定，先显示出来
            if (isHidden) {
                this.element.css({ visibility: 'hidden', display: 'block' });
            }

            Position.pin({
                element: this.element,
                x: align.selfXY[0],
                y: align.selfXY[1]
            }, {
                element: align.baseElement,
                x: align.baseXY[0],
                y: align.baseXY[1]
            });

            // 定位完成后，还原
            if (isHidden) {
                this.element.css({ visibility: '', display: 'none' });
            }

            return this;
        },

        // 加载 iframe 遮罩层并与 overlay 保持同步
        _setupShim: function() {
            var shim = new Shim(this.element);
            this.after('show hide', shim.sync, shim);

            // 除了 parentNode 之外的其他属性发生变化时，都触发 shim 同步
            var attrs = Overlay.prototype.attrs;
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    if (attr === 'parentNode') continue;
                    this.on('change:' + attr, shim.sync, shim);
                }
            }
        },

        // resize窗口时重新定位浮层，用这个方法收集所有浮层实例
        _setupResize: function() {
            Overlay.allOverlays.push(this);
        },
        
        // 除了 element 和 relativeElements，点击 body 后都会隐藏 element
        _blurHide: function(arr) {
            arr = arr || [];
            arr.push(this.element);
            this._relativeElements = arr;
            Overlay.blurOverlays.push(this);
        },

        // 用于 set 属性后的界面更新

        _onRenderWidth: function(val) {
            this.element.css('width', val);
        },

        _onRenderHeight: function(val) {
            this.element.css('height', val);
        },

        _onRenderZIndex: function(val) {
            this.element.css('zIndex', val);
        },

        _onRenderAlign: function(val) {
            this._setPosition(val);
        },

        _onRenderVisible: function(val) {
            this.element[val ? 'show' : 'hide']();
        }

    });

    // 绑定 blur 隐藏事件
    Overlay.blurOverlays = [];
    $(document).on('click', function(e) {
        hideBlurOverlays(e);
    });

    // 绑定 resize 重新定位事件
    var timeout;    
    Overlay.allOverlays = [];
    $(window).resize(function() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(function() {
            $(Overlay.allOverlays).each(function(i, item) {
                // 当元素隐藏时，不处理
                if(!item.get('visible')) {
                    return;
                }
                item._setPosition();
            });
        }, 80);
    });

    module.exports = Overlay;


    // Helpers
    // -------

    function isInDocument(element) {
        return $.contains(document.documentElement, element);
    }

    function hideBlurOverlays(e) {
        $(Overlay.blurOverlays).each(function(i, item) {
            // 当元素隐藏时，不处理
            if(!item.get('visible')) {
                return;
            }
            
            // 遍历 _relativeElements ，当点击的元素落在这些元素上时，不处理
            for(var i=0; i<item._relativeElements.length; i++) {
                var el = $(item._relativeElements[i])[0];
                if (el === e.target || $.contains(el, e.target)) {
                    return;
                }
            }

            // 到这里，判断触发了元素的 blur 事件，隐藏元素
            item.hide();
        });
    }

});

