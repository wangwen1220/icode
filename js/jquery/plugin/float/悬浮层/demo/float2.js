﻿jQuery.fn.float=function(position){
    //判断浏览器版本
    var isIE6=false;
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
    if(Sys.ie && Sys.ie=="6.0"){
        isIE6=true;
    }
    var windowWidth,windowHeight;//窗口的高和宽
    //取得窗口的高和宽
    if (self.innerHeight) {
        windowWidth=self.innerWidth;
        windowHeight=self.innerHeight;
    }else if (document.documentElement&&document.documentElement.clientHeight) {
        windowWidth=document.documentElement.clientWidth;
        windowHeight=document.documentElement.clientHeight;
    } else if (document.body) {
        windowWidth=document.body.clientWidth;
        windowHeight=document.body.clientHeight;
    }
    return this.each(function(){
        var loc;//层的绝对定位位置
        if(position==undefined || position.constructor == String){
            switch(position){
                case("rightbottom")://右下角
                    loc={right:"0px",bottom:"0px"};
                    break;
                case("leftbottom")://左下角
                    loc={left:"0px",bottom:"0px"};
                    break;    
                case("lefttop")://左上角
                    loc={left:"0px",top:"0px"};
                    break;
                case("righttop")://右上角
                    loc={right:"0px",top:"0px"};
                    break;
                case("middletop")://居中置顶
                    loc={left:windowWidth/2-$(this).width()/2+"px",top:"0px"};
                    break;
                case("middlebottom")://居中置低
                    loc={left:windowWidth/2-$(this).width()/2+"px",bottom:"0px"};
                    break;
                case("leftmiddle")://左边居中
                    loc={left:"0px",top:windowHeight/2-$(this).height()/2+"px"};
                    break;
                case("rightmiddle")://右边居中
                    loc={right:"0px",top:windowHeight/2-$(this).height()/2+"px"};
                    break;
                case("middle")://居中
                    var l=0;//居左
                    var t=0;//居上
                    l=windowWidth/2-$(this).width()/2;
                    t=windowHeight/2-$(this).height()/2;
                    loc={left:l+"px",top:t+"px"};
                    break;
                default://默认为右下角
                    position="rightmiddle";
                    loc={right:"0px",top:windowHeight/2-$(this).height()/2+"px"};
                    break;
            }
        }else{
            loc=position;
        }
        var wrap=$("<div></div>");
        /*fied ie6 css hack*/
        if(isIE6){wrap=$("<div style=\"top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight);\"></div>");}
        $("body").append(wrap);
        wrap.css(loc).css({position:"fixed",
            z_index:"999"});
        /*fied ie6 css hack*/
        if (isIE6)
        {
            wrap.css("position","absolute");
            //没有加这个的话，ie6使用表达式时就会发现跳动现象
            //至于为什么要加这个，还有为什么要加nothing.txt这个，偶也不知道，希望知道的同学可以告诉我
            $("body").css("background-attachment","fixed").css("background-image","url(n1othing.txt)");
        }
        //将要固定的层添加到固定层里
        $(this).appendTo(wrap);
    });
};