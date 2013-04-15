﻿/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 21:52
*/
/**
 * Add ul/ol button.
 * @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/unordered-list/index", function (S, Editor, ListButton, ListCmd) {

    function unorderedList() {
    }

    S.augment(unorderedList, {
        renderUI: function (editor) {
            ListCmd.init(editor);

            ListButton.init(editor, {
                cmdType: "insertUnorderedList",
                buttonId: 'unorderedList',
                menu: {
                    width:75,
                    children: [
                        {
                            content: '● 圆点',
                            value: 'disc'
                        },
                        {
                            content: '○ 圆圈',
                            value: 'circle'
                        },
                        {
                            content: '■ 方块',
                            value: 'square'
                        }
                    ]
                },
                tooltip: '无序列表'
            });
        }
    });

    return unorderedList;
}, {
    requires: ['editor', '../list-utils/btn', './cmd']
});
