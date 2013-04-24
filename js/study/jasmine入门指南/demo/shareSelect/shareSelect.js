/**
 * @fileoverview 分享组件
 * @author: 剑平（明河）<minghe36@126.com>
 **/
KISSY.add(function(S, Node, Base, List) {
    var EMPTY = '',$ = Node.all;

    /**
     * @name ShareSelect
     * @class 分享组件
     * @constructor
     * @extends Base
     * @requires Node
     * @param {String} wrapper 容器
     * @param {Object} config 配置
     */
    function ShareSelect(wrapper, config) {
        var self = this;
        //调用父类构造函数
        ShareSelect.superclass.constructor.call(self, config);
        self.set('wrapper', $(wrapper));
    }

    S.mix(ShareSelect, /** @lends ShareSelect.prototype*/{
        /**
         * 分享站点列表
         */
        SITE_DATA : [
            { "text": "新浪微博", "name": "sinaminiblog", "url" : "http://service.weibo.com/share/share.php?url={url}&title={title}" },
            { "text": "腾讯微博", "name": "vtqq", "url" : "http://v.t.qq.com/share/share.php?title={title}&url={url}" },
            { "text": "开心网", "name": "kaixin001", "url" : "http://www.kaixin001.com/repaste/share.php?rtitle={title}&rurl={url}" }
        ],
        /**
         * 模板
         */
        tpl : {
            DEAFULT : '<div class="ks-share-select ks-nice-select-container"><div class="hot-icon"></div><div class="ks-nice-select J_SelectBtn"><span class="select-text">{text}</span><span class="select-icon J_SelectIcon"></span></div><div class="list-container J_ListWrapper"></div></div>'
        },
        /**
         * 钩子
         */
        hook : {
            BTN : '.J_SelectBtn',
            LIST_WRAPPER : '.J_ListWrapper'
        }
    });
    //继承于Base，属性getter和setter委托于Base处理
    S.extend(ShareSelect, Base, /** @lends ShareSelect.prototype*/{
        /**
         * 运行
         */
        render : function() {
            var self = this,$wrapper = self.get('wrapper'),$select,$btn,list,
                width = self.get('width');
            if (!$wrapper.length) return false;
            $select = self._create();
            self._setSiteData();
            list = self._renderList();
            //设置模拟选择框的宽度
            if (S.isNumber(width) && width > 0) $select.width(width);
            $btn = self.get('elBtn');
            $select.on('mouseover mouseleave', self._hoverHandler, self);
            return self;
        },
        /**
         * 创建模拟选择框
         * @return {NodeList}
         */
        _create : function() {
            var self = this,text = self.get('text'),
                tpl = self.get('tpl'),
                $wrapper = self.get('wrapper'),
                html,$select;
            if (!S.isString(text) || !S.isString(tpl)) return false;
            html = S.substitute(tpl, {text : text});
            $select = $(html).appendTo($wrapper);
            self.set('elSelect', $select);
            self.set('elBtn', $($select.children(ShareSelect.hook.BTN)));
            self.set('elListWrapper', $($select.children(ShareSelect.hook.LIST_WRAPPER)));
            return $select;
        },
        /**
         * 运行列表组件
         */
        _renderList : function() {
            var self = this,list = self.get('list'),$listWrapper = self.get('elListWrapper'),
                siteData = self.get('siteData'),
                $btn = self.get('elBtn'),cls = self.get('clickCls');
            if (list == EMPTY) {
                list = new List($listWrapper, {data : siteData,tpl : List.tpl.SHARE_SELECT});
                list.on('click', function() {
                    $btn.removeClass(cls);
                });
                self.set('list', list);
            }
            return list;
        },
        /**
         * 给站点数据增加title、url等
         */
        _setSiteData : function() {
            var self = this,siteData = self.get('siteData'),url,
                title = encodeURIComponent(self.get('title')),pageUrl = self.get('url');
            if (!siteData.length) return false;
            S.each(siteData, function(site, i) {
                url = site.url;
                siteData[i].url = S.substitute(url, {'title' : title,'url' : pageUrl});
            });
            self.set('siteData', siteData);
            return siteData;
        },
        _hoverHandler : function(ev) {
            var self = this,type = ev.type,
                $btn = self.get('elBtn'),
                cls = self.get('hoverCls'),
                list = self.get('list'),
                visible = list.get('visible');
            if (!S.isString(cls)) return false;
            if (type == 'mouseover') {
                list.show();
                $btn.addClass(cls);
            } else if (type == 'mouseleave') {
                list.hide();
                $btn.removeClass(cls);
            }
        }
    }, {ATTRS : /** @lends ShareSelect*/{
        /**
         * 分享站点数据
         */
        siteData : {value : ShareSelect.SITE_DATA},
        /**
         * 分享组件容器
         */
        wrapper : {value : EMPTY},
        /**
         * 分享组件元素
         */
        elSelect : {value : EMPTY},
        /**
         * 按钮元素
         */
        elBtn : {value : EMPTY},
        /**
         * 列表容器
         */
        elListWrapper : {value : EMPTY},
        /**
         * 模拟选择框上的文案
         */
        text : {value : '微博分享极速退款体验' },
        /**
         * 分享预制内容
         */
        title : {value : '#淘宝极速退款#'},
        /**
         * 分享的路径
         */
        url : {value : EMPTY},
        /**
         * 模板
         */
        tpl : {value : ShareSelect.tpl.DEAFULT},
        hoverCls : {value : 'ks-nice-select-hover'},
        clickCls : {value : 'ks-nice-select-click'},
        /**
         * 模拟选择框宽度
         */
        width : {value : 148,
            setter : function(v) {
                if (S.isNumber(v)) {
                    var self = this,elSelect = self.get('elSelect');
                    elSelect.width(v);
                }
                return v;
            }
        },
        list : {value : EMPTY}
    }});
    return ShareSelect;
}, {requires : ['node','base','./list']});