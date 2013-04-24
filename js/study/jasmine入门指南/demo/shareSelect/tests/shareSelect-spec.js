KISSY.use('shareSelect,list', function(S, ShareSelect, List) {
    var $ = S.Node.all,
        title = 'ShareSelect test',
        text = '分享到微博';
    $('.J_ShareList').hide();
    describe('test ShareSelect', function() {
        var shareSelect = new ShareSelect('.J_ShareList',{'title' : title,'text' : text});
        it('实例化ShareSelect', function() {
            var ss = shareSelect.render(),
                //选择框元素
                elSelect = ss.get('elSelect'),
                //容器
                wrapper = ss.get('wrapper'),
                //按钮元素
                elBtn = ss.get('elBtn'),
                //列表容器
                elListWrapper = ss.get('elListWrapper');
            expect(ss).toBe(shareSelect);
            expect(wrapper.length).toBeGreaterThan(0);
            expect(elSelect.length).toBeGreaterThan(0);
            expect(elBtn.length).toBeGreaterThan(0);
            expect(elListWrapper.length).toBeGreaterThan(0);
        });
        it('成功实例化List', function() {
            var list = shareSelect.get('list');
            expect(!S.isEmptyObject(list)).toBeTruthy();
            expect(list.constructor).toBe(List);
        });
        it('siteData加上了title和url', function() {
            var siteData = shareSelect.get('siteData');
            expect(siteData.length).toBeGreaterThan(0);
            S.each(siteData,function(site){
                expect(site.url).not.toMatch(/\{title\}/);
            });
        });
        it('模拟选择框的按钮文案',function(){
            var elBtn = shareSelect.get('elBtn'),
                text = elBtn.text();
            expect(text).toEqual(shareSelect.get('text'));
        });
        it('成功设置模拟选择框的宽度', function() {
            var width = 200,elSelect = shareSelect.get('elSelect');
            shareSelect.set('width', width);
            expect(elSelect.width()).toEqual(200);
        });
        it('成功显示列表', function() {
            var elSelect = shareSelect.get('elSelect'),
                $btn = shareSelect.get('elBtn'),
                hoverCls = shareSelect.get('hoverCls'),
                list = shareSelect.get('list');
            elSelect.fire('mouseover');
            expect(list.get('visible')).toBeTruthy();
            expect($btn.hasClass(hoverCls)).toBeTruthy();
        });
        it('成功隐藏列表', function() {
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