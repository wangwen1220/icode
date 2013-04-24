/**
 * @fileoverview 数据列表，根据json数据源产生可选择的模拟列表
 * @author: 剑平（明河）<minghe36@126.com>
 *
 **/
KISSY.add(function(S, Node, Base, Template) {
    var EMPTY = '',$ = Node.all;

    /**
     * @name List
     * @class
     * @constructor
     * @extends Base
     * @requires Node
     * @param {String} wrapper 容器
     * @param {Object} config 配置对象
     */
    function List(wrapper, config) {
        var self = this;
        //调用父类构造函数
        List.superclass.constructor.call(self, config);
        self.set('wrapper', $(wrapper));
    }

    S.mix(List, {
        tpl : {
            DEFAULT : '<ul class="ks-nice-list" tabindex="0">' +
                '{{#each data}}' +
                '<li data-value="{{_ks_value.value}}">{{_ks_value.text}}</li>' +
                '{{/each}}' +
                '</ul>',
            SHARE_SELECT : '<ul class="ks-nice-list" tabindex="0">' +
                '{{#each data}}' +
                '<li><a class="share-icon icon-{{_ks_value.name}}" href="{{_ks_value.url}}" target="_blank">{{_ks_value.text}}</a></li>' +
                '{{/each}}' +
                '</ul>'
        },
        /**
         * 支持的事件
         */
        event : {RENDER : 'render',CLICK : 'click',MOUSEOVER : 'mouseover',MOUSEOUT : 'mouseout'},
        /**
         * 组件用到的样式名称
         */
        cls : {CURRENT : 'ks-nice-current',HOVER : 'ks-nice-hover'}
    });
    //继承于Base，属性getter和setter委托于Base处理
    S.extend(List, Base, /** @lends List.prototype*/{
        /**
         * 运行
         */
        render : function() {
            var self = this,$wrapper = self.get('wrapper'),$list,lis;
            $list = self._create();
            lis = $list.children();
        },
        /**
         * 显示列表
         */
        show : function(){
            var self = this,$list = self.get('elList'),wrapper = self.get('wrapper');
            if($list == EMPTY) $list = self._create();
            wrapper.slideDown(0.1);
            self.set('visible',true);
        },
        /**
         * 隐藏列表
         */
        hide : function(){
            var self = this,$list = self.get('elList'),wrapper = self.get('wrapper');
            if($list == EMPTY) $list = self._create();
            wrapper.slideUp(0.1);
            self.set('visible',false);
        },
        /**
         * 创建列表
         */
        _create : function() {
            var self = this,$wrapper = self.get('wrapper'),
                data = self.get('data'),
                tpl = self.get('tpl'),
                width = self.get('width'),
                html,$list,lis;
            if (!S.isArray(data) || data.length == 0 || !S.isString(tpl)) return false;
            html = Template(tpl).render({data : data});
            $list = $(html).appendTo($wrapper);
            lis = $($list.children());
            lis.on('mouseover mouseout',self._hoverHandler,self)
                .on('click',function(ev){
                    S.later(function(){
                        self.hide();
                        self.fire(List.event.CLICK);
                    },100);
                },self);
            $list.width(width);
            self.set('elList',$list);
            return $list;
        },
        /**
         * 鼠标滑过事件监听器
         * @param {Object} ev 事件对象
         */
        _hoverHandler : function(ev) {
            var self = this,type = ev.type,target = ev.target,cls = List.cls.HOVER;
            if (!S.isString(cls)) return false;
            if (type == 'mouseover') {
                $(ev.target).addClass(cls);
                self.fire(List.event.MOUSEOVER, {target : target});
            } else if (type == 'mouseout') {
                $(ev.target).removeClass(cls);
                self.fire(List.event.MOUSEOUT, {target : target});
            }
        }
    }, {ATTRS : /** @lends List*/{
        /**
         * 列表数据
         */
        data : {value : []},
        /**
         * 容器
         */
        wrapper : {value : EMPTY},
        /**
         * 列表元素
         */
        elList : {value : EMPTY},
        /**
         * 模板
         */
        tpl : {value : List.tpl.DEFAULT},
        /**
         * 是否显示
         */
        visible : {value : false},
        /**
         * 列表宽度
         */
        width : {value : 146}
    }});
    return List;
}, {requires : ['node','base','template']});