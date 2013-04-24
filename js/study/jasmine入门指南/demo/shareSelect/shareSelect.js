/**
 * @fileoverview �������
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
 **/
KISSY.add(function(S, Node, Base, List) {
    var EMPTY = '',$ = Node.all;

    /**
     * @name ShareSelect
     * @class �������
     * @constructor
     * @extends Base
     * @requires Node
     * @param {String} wrapper ����
     * @param {Object} config ����
     */
    function ShareSelect(wrapper, config) {
        var self = this;
        //���ø��๹�캯��
        ShareSelect.superclass.constructor.call(self, config);
        self.set('wrapper', $(wrapper));
    }

    S.mix(ShareSelect, /** @lends ShareSelect.prototype*/{
        /**
         * ����վ���б�
         */
        SITE_DATA : [
            { "text": "����΢��", "name": "sinaminiblog", "url" : "http://service.weibo.com/share/share.php?url={url}&title={title}" },
            { "text": "��Ѷ΢��", "name": "vtqq", "url" : "http://v.t.qq.com/share/share.php?title={title}&url={url}" },
            { "text": "������", "name": "kaixin001", "url" : "http://www.kaixin001.com/repaste/share.php?rtitle={title}&rurl={url}" }
        ],
        /**
         * ģ��
         */
        tpl : {
            DEAFULT : '<div class="ks-share-select ks-nice-select-container"><div class="hot-icon"></div><div class="ks-nice-select J_SelectBtn"><span class="select-text">{text}</span><span class="select-icon J_SelectIcon"></span></div><div class="list-container J_ListWrapper"></div></div>'
        },
        /**
         * ����
         */
        hook : {
            BTN : '.J_SelectBtn',
            LIST_WRAPPER : '.J_ListWrapper'
        }
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(ShareSelect, Base, /** @lends ShareSelect.prototype*/{
        /**
         * ����
         */
        render : function() {
            var self = this,$wrapper = self.get('wrapper'),$select,$btn,list,
                width = self.get('width');
            if (!$wrapper.length) return false;
            $select = self._create();
            self._setSiteData();
            list = self._renderList();
            //����ģ��ѡ���Ŀ��
            if (S.isNumber(width) && width > 0) $select.width(width);
            $btn = self.get('elBtn');
            $select.on('mouseover mouseleave', self._hoverHandler, self);
            return self;
        },
        /**
         * ����ģ��ѡ���
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
         * �����б����
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
         * ��վ����������title��url��
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
         * ����վ������
         */
        siteData : {value : ShareSelect.SITE_DATA},
        /**
         * �����������
         */
        wrapper : {value : EMPTY},
        /**
         * �������Ԫ��
         */
        elSelect : {value : EMPTY},
        /**
         * ��ťԪ��
         */
        elBtn : {value : EMPTY},
        /**
         * �б�����
         */
        elListWrapper : {value : EMPTY},
        /**
         * ģ��ѡ����ϵ��İ�
         */
        text : {value : '΢���������˿�����' },
        /**
         * ����Ԥ������
         */
        title : {value : '#�Ա������˿�#'},
        /**
         * �����·��
         */
        url : {value : EMPTY},
        /**
         * ģ��
         */
        tpl : {value : ShareSelect.tpl.DEAFULT},
        hoverCls : {value : 'ks-nice-select-hover'},
        clickCls : {value : 'ks-nice-select-click'},
        /**
         * ģ��ѡ�����
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