 /*
 * Eslider 一个简洁的图片滚动插件
 * Copyright 2012 Steven Wang
 * wangwen1220@gmail.com
 * www.seosteven.com
 *
 * Version 1.1
 * Updated: 2012-6-4
 *
 */

;(function($){
	$.fn.eslider = function(options){
		var defaults = {
			slide_prev_btn: '.prev_btn',
			slide_next_btn: '.next_btn',
			slide_container: '.slide_container',
			slide_list: '.slide_list',
			slide_list_item: '.slide_list_item',
			i: 1,//每版放1个图片
			page: 1,
			//slide_width: 1,
			slide_speed: 800
		};
		var opts = $.extend(defaults, options);

		var slide_prev_btn = this.find(opts.slide_prev_btn);
		var slide_next_btn = this.find(opts.slide_next_btn);
		var slide_list = this.find(opts.slide_list);
		var page_count = Math.ceil(slide_list.children(opts.slide_list_item).length / opts.i);//往大的方向取最小的整数
		var slide_width = this.find(opts.slide_container).width();//获取滚动框架的宽度，不带单位

		//上一个按钮
		slide_prev_btn.click(function(){
			if(!slide_list.is(':animated')){
				if(opts.page == 1){//已经到第一个版面了,如果再向前，必须跳转到最后一个版面
					slide_list.animate({left: '-=' + slide_width * (page_count - 1)}, opts.slide_speed);//通过改变left值，跳转到最后一个版面
					opts.page = page_count;
				}else{
					slide_list.animate({left: '+=' + slide_width}, opts.slide_speed);//通过改变left值，达到每次换一个版面
					opts.page--;
				}
			}
			return false;
		});

		//下一个按钮
		slide_next_btn.click(function(){
			if(!slide_list.is(':animated')){
				if(opts.page == page_count){//已经到最后一个版面了,如果再向后，必须跳转到第一个版面
					slide_list.animate({left: 0}, opts.slide_speed);//通过改变left值，跳转到第一个版面
					opts.page = 1;
				}else{
					slide_list.animate({left: '-=' + slide_width}, opts.slide_speed);//通过改变left值，达到每次换一个版面
					opts.page++;
				}
			}
			return false;
		});
		return this;
	}
})(jQuery);