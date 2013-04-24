KISSY.use('shareSelect,list', function(S, ShareSelect, List) {
    var $ = S.Node.all,
        title = 'ShareSelect test',
        text = '����΢��';
    $('.J_ShareList').hide();
    describe('test ShareSelect', function() {
        var shareSelect = new ShareSelect('.J_ShareList',{'title' : title,'text' : text});
        it('ʵ����ShareSelect', function() {
            var ss = shareSelect.render(),
                //ѡ���Ԫ��
                elSelect = ss.get('elSelect'),
                //����
                wrapper = ss.get('wrapper'),
                //��ťԪ��
                elBtn = ss.get('elBtn'),
                //�б�����
                elListWrapper = ss.get('elListWrapper');
            expect(ss).toBe(shareSelect);
            expect(wrapper.length).toBeGreaterThan(0);
            expect(elSelect.length).toBeGreaterThan(0);
            expect(elBtn.length).toBeGreaterThan(0);
            expect(elListWrapper.length).toBeGreaterThan(0);
        });
        it('�ɹ�ʵ����List', function() {
            var list = shareSelect.get('list');
            expect(!S.isEmptyObject(list)).toBeTruthy();
            expect(list.constructor).toBe(List);
        });
        it('siteData������title��url', function() {
            var siteData = shareSelect.get('siteData');
            expect(siteData.length).toBeGreaterThan(0);
            S.each(siteData,function(site){
                expect(site.url).not.toMatch(/\{title\}/);
            });
        });
        it('ģ��ѡ���İ�ť�İ�',function(){
            var elBtn = shareSelect.get('elBtn'),
                text = elBtn.text();
            expect(text).toEqual(shareSelect.get('text'));
        });
        it('�ɹ�����ģ��ѡ���Ŀ��', function() {
            var width = 200,elSelect = shareSelect.get('elSelect');
            shareSelect.set('width', width);
            expect(elSelect.width()).toEqual(200);
        });
        it('�ɹ���ʾ�б�', function() {
            var elSelect = shareSelect.get('elSelect'),
                $btn = shareSelect.get('elBtn'),
                hoverCls = shareSelect.get('hoverCls'),
                list = shareSelect.get('list');
            elSelect.fire('mouseover');
            expect(list.get('visible')).toBeTruthy();
            expect($btn.hasClass(hoverCls)).toBeTruthy();
        });
        it('�ɹ������б�', function() {
            var elSelect = shareSelect.get('elSelect'),
                $btn = shareSelect.get('elBtn'),
                hoverCls = shareSelect.get('hoverCls'),
                list = shareSelect.get('list');
            elSelect.fire('mouseleave');
            expect(list.get('visible')).toBeFalsy();
            expect($btn.hasClass(hoverCls)).toBeFalsy();
        });

    });
});