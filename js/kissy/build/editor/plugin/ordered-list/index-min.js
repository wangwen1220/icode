/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 21:52
*/
KISSY.add("editor/plugin/ordered-list/index",function(b,e,c,d){function a(){}b.augment(a,{renderUI:function(a){d.init(a);c.init(a,{cmdType:"insertOrderedList",buttonId:"orderedList",menu:{width:75,children:[{content:"1,2,3...",value:"decimal"},{content:"a,b,c...",value:"lower-alpha"},{content:"A,B,C...",value:"upper-alpha"},{content:"i,ii,iii...",value:"lower-roman"},{content:"I,II,III...",value:"upper-roman"}]},tooltip:"有序列表"})}});return a},{requires:["editor","../list-utils/btn","./cmd"]});
