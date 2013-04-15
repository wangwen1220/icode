﻿/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
/**
 * backColor button.
 * @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/backColor/index", function (S, Editor, Button, cmd) {

    function backColor(config) {
        this.config=config||{};
    }

    S.augment(backColor, {
        renderUI:function (editor) {
            cmd.init(editor);
            editor.addButton("backColor", {
                cmdType:'backColor',
                tooltip:"背景颜色",
                pluginConfig:this.config
            }, Button);
        }
    });

    return backColor;

}, {
    requires:['editor', '../color/btn', './cmd']
});
