﻿/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
/**
 * custom overlay  for kissy editor
 * @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/overlay/index", function (S, Editor, Overlay, focusFix) {
    var Overlay4E = Overlay.extend({
        bindUI:function () {
            focusFix.init(this);
        }
    }, {
        ATTRS:{
            prefixCls:{
                value:"ks-editor-"
            },
            "zIndex":{
                value:Editor.baseZIndex(Editor.zIndexManager.OVERLAY)
            }
        }
    });

    Overlay4E.Dialog = Overlay.Dialog.extend({
        bindUI:function () {
            focusFix.init(this);
        },
        show:function () {
            var self = this;
            //在 show 之前调用
            self.center();
            var y = self.get("y");
            //居中有点偏下
            if (y - S.DOM.scrollTop() > 200) {
                y = S.DOM.scrollTop() + 200;
                self.set("y", y);
            }
            Overlay4E.prototype.show.call(self);
        }
    }, {
        ATTRS:{
            elAttrs:{
                value:{
                    hideFocus:'hideFocus'
                }
            },
            prefixCls:{
                value:"ks-editor-"
            },
            "zIndex":{
                value:Editor.baseZIndex(Editor.zIndexManager.OVERLAY)
            },
            draggable:{
                value:true
            },
            constrain:{
                value:true
            },
            aria:{
                value:true
            }
        }
    });

    return Overlay4E
}, {
    requires:["editor", 'overlay', '../focusFix/', 'dd']
});
