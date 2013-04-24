/**
 * @fileoverview �����б�����json����Դ������ѡ���ģ���б�
 * @author: ��ƽ�����ӣ�<minghe36@126.com>
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
     * @param {String} wrapper ����
     * @param {Object} config ���ö���
     */
    function List(wrapper, config) {
        var self = this;
        //���ø��๹�캯��
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
         * ֧�ֵ��¼�
         */
        event : {RENDER : 'render',CLICK : 'click',MOUSEOVER : 'mouseover',MOUSEOUT : 'mouseout'},
        /**
         * ����õ�����ʽ����
         */
        cls : {CURRENT : 'ks-nice-current',HOVER : 'ks-nice-hover'}
    });
    //�̳���Base������getter��setterί����Base����
    S.extend(List, Base, /** @lends List.prototype*/{
        /**
         * ����
         */
        render : function() {
            var self = this,$wrapper = self.get('wrapper'),$list,lis;
            $list = self._create();
            lis = $list.children();
        },
        /**
         * ��ʾ�б�
         */
        show : function(){
            var self = this,$list = self.get('elList'),wrapper = self.get('wrapper');
            if($list == EMPTY) $list = self._create();
            wrapper.slideDown(0.1);
            self.set('visible',true);
        },
        /**
         * �����б�
         */
        hide : function(){
            var self = this,$list = self.get('elList'),wrapper = self.get('wrapper');
            if($list == EMPTY) $list = self._create();
            wrapper.slideUp(0.1);
            self.set('visible',false);
        },
        /**
         * �����б�
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
         * ��껬���¼�������
         * @param {Object} ev �¼�����
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
         * �б�����
         */
        data : {value : []},
        /**
         * ����
         */
        wrapper : {value : EMPTY},
        /**
         * �б�Ԫ��
         */
        elList : {value : EMPTY},
        /**
         * ģ��
         */
        tpl : {value : List.tpl.DEFAULT},
        /**
         * �Ƿ���ʾ
         */
        visible : {value : false},
        /**
         * �б���
         */
        width : {value : 146}
    }});
    return List;
}, {requires : ['node','base','template']});