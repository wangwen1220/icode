////////////////////////////////////////////////////////////////////////////////
//	名称: 火秀游戏主程序
//	作者: 王文 wangwen1220@139.com
//	说明: 需 jQuery 1.7.2 及以上版本支持
//	日期: 2012-11-15 星期四
////////////////////////////////////////////////////////////////////////////////
// 配置
seajs.config({
	//base: '/phpcms/statics/js/',
	alias: {
		'jquery': 'jquery',
		//'jquery-cookie': 'jquery.cookie',
		//'jquery-form': 'jquery.form.min',
		'jqstab': 'jquery-stab',
		'myfocus': '../seajs-myfocus'
	},

	// 预加载
	preload: ['jquery'],

	// 值为 true 时，加载器会使用 console.log 输出所有错误和调试信息
	// 值设为 2 时， 每个脚本请求都会加上唯一时间戳，以强制浏览器每次都请求最新版本
	// 默认为 false, 只输出关键信息
	debug: true,

	// 获取模块文件时，<script> 或 <link> 标签的 charset 属性。
	// 默认是 utf-8，支持 function 类型
	//charset: 'utf-8',

	// 批量更新时间戳
	map: [
		[/^(.*\.(?:css|js))(.*)$/i, '$1?t=20121118']
	]
});

// 将 jQuery 暴露到全局
//seajs.modify('jquery', function(require, exports) {
//	window.jQuery = window.$ = exports;
//});
//window.jQuery = window.$ = seajs.find('jquery');

// 将 jQuery Cookie 插件自动包装成 CMD 接口
//seajs.modify('cookie', function(require, exports, module) {
//	module.exports = $.cookie;
//});

// 主程序模块
define('main', ['jquery', 'myfocus', 'jqstab'], function(require) {
	/*====================加载依赖模块=====================*/
	var $ = jQuery = require('jquery'),
		myFocus = require('myfocus');
	require('jqstab')($);

	/*====================常用工具=====================*/
	// IE 版本判断
	var isIE = !!window.ActiveXObject,
		isIE6 = isIE && !window.XMLHttpRequest;

	// 提示信息
	function log(msg) { window.console && console.log(msg) }

	//$(function() {// 判断文档加载完执行时机有点慢暂时不用
	/*====================通用变量=====================*/
	var $body = $('body'),
		$login_bar = $('#login-bar'),
		$search = $('#search'),
		$nav = $('#nav');

	/*====================通用动作=====================*/
	// 登录后加载用户菜单
	$.getJSON($login_bar.attr('data-url'), function(d) {
		$login_bar.html(d.html);
	});

	// 文本框获得或失去焦点
	$(":input").focus(function() {
		$(this).addClass("focus");
		if ($(this).val() == this.defaultValue) {
			$(this).val("");
		}
	}).blur(function() {
		$(this).removeClass("focus");
		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		}
	});

	// 查找关键词不能为空
	$('form.search').submit(function() {
		var $search_wd = $(this).find('.search-wd'),
			wd = $search_wd.val();
		if ($.trim(wd) == '' || wd == $search_wd[0].defaultValue) {
			alert('请输入你要查找的关键词！');
			return false;
		}
	});

	// Tab 切换动画
	$('.ui-tab').stab();

	// 排行榜动画
	$('.ui-ranking-item').on('mouseover', function(){
		$(this).addClass('ui-ranking-item-cur').siblings().removeClass('ui-ranking-item-cur');
	});

	// 滚动新闻
	var scroll_timer;
	$("#js-scroll-news").hover(function() {
		clearInterval(scroll_timer);
	}, function() {
		var $ths = $(this);
		scroll_timer = setInterval(function() {
			scroll_share($ths);
		}, 2500);
	}).trigger("mouseleave");
	function scroll_share($obj) {
		var height = $obj.find(".ui-art-item").height(); // 获取行高
		$obj.find(".ui-art-item").first().animate({opacity: 0}, 800).slideUp(300, function() {
			$(this).appendTo($obj).show().css('opacity', 1);
		});
	}

	/*====================游戏首页=====================*/
	// 导航菜单鼠标移上去效果
	/*var $nav_list_item_current = $nav.find('.nav-list-item-current');
	$nav.on({
		mouseenter: function() {
			$nav_list_item_current.removeClass('nav-list-item-current');
		},
		mouseleave: function() {
			$nav_list_item_current.addClass('nav-list-item-current');
		}
	}, '.nav-list-item');*/

	// 焦点图
	myFocus.set({
		id: 'myfocus-games',//焦点图盒子ID
		pattern: 'mF_games_tb',//风格应用的名称
		width: 308,//设置图片区域宽度(像素)
		height: 231,//设置图片区域高度(像素)
		wrap: false
		//auto: false,
		//txtHeight: 0,//文字层高度设置(像素),'default'为默认高度，0为隐藏
		/*onChange: function(i) {
			$desc_item.removeClass('desc-item-current');
			$desc_item.eq(i).fadeIn('slow').siblings().hide();
		}*/
	}, function() {
		//$my_focus.parent().css('float', 'left');
	});

	// 焦点图
	myFocus.set({
		id: 'myfocus-qiyi',// 焦点图盒子ID
		pattern: 'mF_qiyi',// 风格应用的名称
		width: 288,// 设置图片区域宽度(像素)
		height: 233,// 设置图片区域高度(像素)
		wrap: false,
		txtHeight: 0 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
	});

	// 调整列高
	$('.ui-box-item').each(function() {
		var $this = $(this),
			height = $this.parent().height() - 34;
		$this.height(height);
	});
	$('.ui-layout-item').each(function() {
		var $this = $(this),
			height = $this.parent().height();
		$this.height(height);
	});

	/*====================列表页=====================*/
	// 新资讯中加载并执行 jquery.kandytabs.js
	/*var $kandyTabs = $("#kandyTabs");
	if ($kandyTabs.length) {
		$.getScript("/statics/js/jquery.kandytabs.js", function() {
			$kandyTabs.KandyTabs();
		});
	}*/

	// 新资讯中热点排行展开与折叠效果
	$('.ui_fold_box_redian, .ui_fold_box_reyi').find('li').hover(function() {
		if(!$(this).hasClass('ui_fold_box_content_selected')) {
			$(this).addClass('ui_fold_box_content_selected').siblings().removeClass('ui_fold_box_content_selected');
			return false;
		}
	});
//});

	/*====================浏览器兼容性解决方案=====================*/
	if (isIE6) {
		// 解决 IE6 hover Bug
		$('.ui-game-list-item').hover(function() { $(this).toggleClass('ui-game-list-item-hover'); });
		$('.ui-img-list-item').hover(function() { $(this).toggleClass('ui-img-list-item-hover'); });

		// 页面加载完执行
		$(window).load(function() {
			// ie6 png 图片透明
			// 将单引号中的内容修改为你使用了png图片的样式，与 CSS 文件中一样即可
			// 如果要直接插入 png 图片，在单引号内加入 img 即可
			$.getScript("/statics/js/DD_belatedPNG.js", function() {
				//DD_belatedPNG.fix('.ui-img-list-item .img .icon, .ui_tab_box_title, .ui_list_box_title span, .ui_fold_box_title span');
			});

			// 让IE6 缓存背景图片
			/* TredoSoft Multiple IE doesn't like this, so try{} it */
			try {
				document.execCommand("BackgroundImageCache", false, true);
			} catch (r) {}
		});
	}
});