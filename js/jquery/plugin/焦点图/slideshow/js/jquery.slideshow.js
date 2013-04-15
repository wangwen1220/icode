/*
焦点图轮换 v2
http://code.ciaoca.cn/
日期：2012-04-09

settings 参数说明
-----
events:按钮事件
type:轮换类型
start:首次展示序号
speed:切换速度
time:自动轮换间隔时间
auto:是否自动轮播
btn:是否使用数字按钮
plus:是否使用 plus 按钮
minus:是否使用 minus 按钮
------------------------------ */
(function($){
	$.fn.slideShow=function(settings){
		if(!this.length){return;};

		// 默认值
		settings=$.extend({
			events:"click",
			type:"x",
			start:0,
			speed:800,
			time:5000,
			auto:true,
			btn:true,
			plus:false,
			minus:false
		},settings);

		var obj=this;
		var slide={};
		var _html;

		slide.box=obj.find(".box");
		slide.list=slide.box.find(".list");
		slide.arr=slide.list.find("li");
		slide.sum=slide.arr.length;
		slide.btn=obj.find(".btn");
		slide.btn_arr=slide.btn.find("li");
		slide.plus=obj.find(".plus");
		slide.minus=obj.find(".minus");
		slide.w=slide.box.width();
		slide.h=slide.box.height();
		slide.s=0;

		if(slide.sum<=1){return;};

		// 方法：开始
		slide.on=function(){
			if(!settings.auto){return;}
			slide.off();

			slide.run=setTimeout(function(){
				slide.goto();
			},settings.time);
		};

		// 方法：停止
		slide.off=function(){
			if(typeof(slide.run)!=="undefined"){clearTimeout(slide.run);};
		};

		// 方法：移除
		slide.clear=function(){
			if(slide.btn.length){slide.btn.remove();};
			if(slide.plus.length){slide.plus.remove();};
			if(slide.minus.length){slide.minus.remove();};
			slide.off();
		};

		// 方法：选中文字
		slide.checkBtn=function(n){
			if(slide.btn.length){
				slide.btn_arr.removeClass("selected");
				slide.btn_arr.eq(n).addClass("selected");
			};
		};

		// 方法：轮换过程
		slide.goto=function(n){
			slide.off();

			if(n===undefined){
				var n=slide.s+1;
			}else if(n==slide.s){
				slide.checkBtn(n);
				slide.on();
				return;
			};
			if(n>slide.sum){n=0;};
			if(n<0){n=slide.sum-1};

			slide.checkBtn(n);

			switch(settings.type){
				// 水平滚动
				case "x":
					slide.box.stop(true,false).animate({"scrollLeft":(slide.w*n)},settings.speed);
					if(n>=slide.sum){
						slide.arr.eq(0).css({"left":slide.w*n});
						slide.checkBtn(0);
						n=0;

						slide.box.queue(function(){
							slide.box.scrollLeft(0);
							$(this).dequeue();
						});
					};
					slide.box.queue(function(){
						slide.arr.eq(0).css({"left":""});
						$(this).dequeue();
					});
					break;

				// 垂直滚动
				case "y":
					slide.box.stop(true,false).animate({"scrollTop":(slide.h*n)},settings.speed);
					if(n==slide.sum){
						slide.arr.eq(0).css({"top":slide.h*n});
						slide.checkBtn(0);
						n=0;

						slide.box.queue(function(){
							slide.box.scrollTop(0);
							$(this).dequeue();
						});
					};
					slide.box.queue(function(){
						slide.arr.eq(0).css({"top":""});
						$(this).dequeue();
					});
					break;

				// 透明过渡
				case "fade":
					if(n==slide.sum){
						slide.checkBtn(0);
						n=0;
					};
					slide.arr.css({"display":"none","position":"relative","zIndex":""});
					slide.arr.eq(slide.s).css({"display":"","position":"absolute","zIndex":1});
					slide.arr.eq(n).css({"display":"none","position":"absolute","top":0,"left":0,"zIndex":2}).fadeIn(settings.speed);
					break;

				// 直接切换
				case "toggle":
					if(n==slide.sum){
						slide.checkBtn(0);
						n=0;
					};
					slide.arr.hide();
					slide.arr.eq(n).show();
					break;
			};

			slide.s=n;
			slide.box.queue(function(){
				slide.on();
				$(this).dequeue();
			});
		};

		// 元素：数字按钮
		if(settings.btn&&!slide.btn.length){

			_html="";
			for(var i=1;i<=slide.sum;i++){
				_html+="<li class='b_"+i+"'>"+i+"</li>";
			};

			slide.btn=$("<ul></ul>",{"class":"btn","html":_html}).appendTo(obj);
			slide.btn_arr=slide.btn.find("li");
		};

		// 元素：增（右）按钮
		if(settings.plus&&!slide.plus.length){
			slide.plus=$("<div></div>",{"class":"plus"}).appendTo(obj);
		};

		// 元素：减（左）按钮
		if(settings.minus&&!slide.minus.length){
			slide.minus=$("<div></div>",{"class":"minus"}).appendTo(obj);
		};

		// 事件：鼠标移入停止，移除开始
		slide.box.hover(function(){
			slide.off();
		},function(){
			slide.on();
		});

		// 事件：序号按钮
		if(settings.btn){
			slide.btn_arr.bind(settings.events,function(){
				slide.goto(slide.btn_arr.index($(this)));
			});
		};

		// 事件：增（右）按钮
		if(settings.plus){
			slide.plus.bind(settings.events,function(){
				slide.goto();
			});
		};

		// 事件：减（左）按钮
		if(settings.minus){
			slide.minus.bind(settings.events,function(){
				slide.goto(slide.s-1);
			});
		};

		slide.goto(settings.start);
	};
})(jQuery);