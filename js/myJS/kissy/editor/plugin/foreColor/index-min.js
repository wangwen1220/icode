/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
KISSY.add("editor/plugin/foreColor/index",function(c,f,d,e){function b(a){this.config=a||{}}c.augment(b,{renderUI:function(a){e.init(a);a.addButton("foreColor",{cmdType:"foreColor",tooltip:"文本颜色",pluginConfig:this.config},d)}});return b},{requires:["editor","../color/btn","./cmd"]});
