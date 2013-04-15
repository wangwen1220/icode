 /*
 * autoslider 一个简洁的图片自动滚动插件
 * Copyright 2012 Steven Wang
 * wangwen1220@gmail.com
 * www.seosteven.com
 *
 * Version 1.0
 * Updated: 2012/5/27
 *
 */

;(function($){
	$.fn.autoslider = function(options){
		var defaults = {
			slide_prev: '.prev',
			slide_next: '.next',
			slide_num: '.num',
			slide_list: '.slide_list',
			slide_width: this.width(),
			auto_slide: true,
			slide_speed: 800
		};
		var opts = $.extend(defaults, options);

		var slide_prev = this.find(opts.slide_prev);
		var slide_next = this.find(opts.slide_next);
		var slide_list = this.find(opts.slide_list);
		var slide_num = this.find(opts.slide_num);
		var num_len = this.find(opts.slide_num).length;
		var slide_width = opts.slide_width;//获取滚动框架的宽度，不带单位
		var slide_speed = opts.slide_speed;
		var auto_slide = opts.auto_slide;
		var index_this = 1;
		var slide_timer;

		//滑入停止动画，滑出开始动画
		if(auto_slide){
			this.hover(function() {
				clearInterval(slide_timer);
			}, function() {
				slide_timer = setInterval(function() {
					if(++index_this == num_len) index_this = 0;
					show_img(index_this, slide_list, slide_width, slide_num);
				}, 5000);
			}).trigger("mouseleave");
		}

		slide_num.click(function() {
			index_this = slide_num.index(this);
			show_img(index_this, slide_list, slide_width, slide_num);
			return false;
		}).eq(0).click();

		// 点击后退按钮
		slide_prev.click(function() {
			if(index_this-- == 0) index_this = num_len - 1;
			show_img(index_this, slide_list, slide_width, slide_num);
			return false;
		});

		// 点击前进按钮
		slide_next.click(function() {
			if(++index_this == num_len) index_this = 0;
			show_img(index_this, slide_list, slide_width, slide_num);
			return false;
		});

		// 通过控制 left，来显示不同的幻灯片
		function show_img (index_this, slide_list, slide_width, num) {
			slide_list.stop(true, false).animate({ left: -slide_width * index_this }, slide_speed);
			num.removeClass("current").eq(index_this).addClass("current");
		}
		return this;
	}
})(jQuery);