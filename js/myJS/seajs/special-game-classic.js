////////////////////////////////////////////////////////////////////////////////
//	名称: 火秀游戏专题主程序
//	作者: 王文 wangwen1220@139.com
//	说明: 需 jQuery 1.8.3 及以上版本支持
//	日期: 2013-1-18
////////////////////////////////////////////////////////////////////////////////
// 配置
seajs.config({
	//base: '/phpcms/statics/js/',
	alias: {
		'jquery': 'jquery'
		//'jquery-cookie': 'jquery.cookie',
		//'jquery-form': 'jquery.form.min',
		//'jqetab': 'jquery-etab',
		//'jcarousel': 'jquery-jcarousel',
		//'myfocus': '../seajs-myfocus'
	},

	// 预加载
	preload: ['jquery'],

	// 批量更新时间戳
	map: [
		[/^(.*\.(?:css|js))(.*)$/i, '$1?t=20130118']
	]
});

// 主程序模块
define('special-game-classic', ['jquery'], function(require) {
	/*====================加载依赖模块=====================*/
	var $ = jQuery = require('jquery');
	//require('jqetab')($);
	//require('jcarousel')($);

	/*====================常用工具=====================*/
	$.extend({
		// 浏览器版本判断
		isIE: document.all,
		isIE6: $.isIE && !window.XMLHttpRequest,

		// 常用变量
		head: document.head || document.getElementsByTagName('head')[0] || document.documentElement,

		// 提示信息
		log: function(msg) {
			window.console && console.log(msg);
		},

		id: function(id) {
			if (!id) return null; //修改 IE 下 $.id('dose_not_exist_id') 报错的 bug
			if ('string' == typeof id || id instanceof String) {
				return document.getElementById(id);
			} else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
				return id;
			}
			return null;
		},

		// 加载样式
		loadCSS: function(path) {
			var link = document.createElement('link');
			link.href = path;
			link.rel = 'stylesheet';
			if (!$('link[href*="' + path + '"]').length) {
				$.head.appendChild(link);
			}
		},

		// 加载脚本
		loadtJS: function(path) {
			var script = document.createElement('script');
			script.src = path;
			if (!$('script[src*="' + path + '"]').length) {
				$.head.appendChild(script);
			}
		},

		// 动态批量加载 js、css 文件。使用方法：
		// $.includePath = '/statics/js/jquery.tree/';
		// $.include(['jquery.tree.js', 'jquery.tree.css']);
		includePath: '',
		include: function(file) {
			var files = typeof file == 'string' ? [file] : file;
			for (var i = 0; i < files.length; i++) {
				var name = files[i].replace(/^\s|\s$/g, ''),
					//att = name.split('.'),
					//ext = att[att.length - 1].toLowerCase(),
					isCSS = name.substring(name.lastIndexOf('.') + 1).toLowerCase() === 'css',
					//tagname = isCSS ? 'link' : 'script',
					//tag = isCSS ? document.createElement('link') : document.createElement('script'),
					tag;
				if (isCSS) {
					tag = document.createElement('link');
					tag.href = $.includePath + name;
					tag.rel = 'stylesheet';
				} else {
					tag = document.createElement('script');
					tag.src = $.includePath + name;
				}
				if (!$(tag.tagName + '[' + (isCSS ? 'href' : 'src') + '*="' + name + '"]').length) {
					$.head.appendChild(tag);
				}
			}
		}
	});

	/*====================通用变量=====================*/
	var CSS_PATH = '/statics/css/',
		JS_PATH = '/statics/js/',
		$body = $('body'),
		$login_bar = $('#login-bar'),
		$search = $('#search'),
		$nav = $('#nav');

	/*====================通用动作=====================*/
	// 登录后加载用户菜单
	$.getJSON($login_bar.attr('data-url'), function(d) {
		$login_bar.html(d.html.replace('<script>(function($){$(function(){make_hoverbox("user_setting");});})(jQuery);</script>', '')); // 操蛋
		//$login_bar.html(d.html); // 操蛋
	});

	// 文本框获得或失去焦点
	$('.search-wd').focus(function() {
		$(this).addClass('focus');
		if (this.value === this.defaultValue) {
			this.value = '';
		}
	}).blur(function() {
		$(this).removeClass('focus');
		if (this.value === '') {
			this.value = this.defaultValue;
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

	/*====================资料库=====================*/
	// 展开/收缩简介
	$('#js_open_desc').on('click', function() {
		var $ths = $(this);
		if (!$ths.hasClass('opened')) {
			$ths.prev().addClass('opened');
			$ths.addClass('opened').text('收起');
		} else {
			$ths.prev().removeClass('opened');
			$ths.removeClass('opened').text('展开');
		}
	});

	/*====================浏览器兼容性解决方案=====================*/
	if ($.isIE6) {
		// 常用方法
		$.fn.extend({// 要放在全局变量下面，因为有用到其中的变量
			// 最大宽度
			maxWidth: function(value){
				if(!value){
					return this.css('max-width');
				}else{
					return this.each(function(){
						this.style.width = (this.clientWidth > value - 1) ? value + 'px' : 'auto';
					});
				}
			},
			// 最小宽度
			minWidth: function(value){
				if(!value){
					return this.css('min-width');
				}else{
					return this.each(function(){
						this.style.width = (this.clientWidth < value) ? value + "px" : "auto";
					});
				}
			},
			// 最大高度
			maxHeight: function(value){
				if(!value){
					return this.css('max-height');
				}else{
					return this.each(function(){
						this.style.height = (this.scrollHeight > value - 1) ? value + "px" : "auto";
					});
				}
			}
		});

		// 解决 IE6 hover Bug
		$('.ui-game-list-item').hover(function() { $(this).toggleClass('ui-game-list-item-hover'); });
		$('.ui-content-item').hover(function() { $(this).toggleClass('ui-content-item-hover'); });
		$('.ui-img-list-item').hover(function() { $(this).toggleClass('ui-img-list-item-hover'); });
		//$('#header .drop-down').hover(function() { $(this).toggleClass('drop-down-hover'); });
		//$('#main.article-box .content p img').maxWidth(600);


		// 页面加载完执行
		//$(window).load(function() {// 操蛋 load 现在IE中不执行
		// ie6 png 图片透明
		// 将单引号中的内容修改为你使用了png图片的样式，与 CSS 文件中一样即可
		// 如果要直接插入 png 图片，在单引号内加入 img 即可
		$.getScript(JS_PATH + "DD_belatedPNG.js", function() {
			DD_belatedPNG.fix('.ui-img-list-item .img .icon-play');
		});

		// 让IE6 缓存背景图片
		/* TredoSoft Multiple IE doesn't like this, so try{} it */
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
		//});
	}
});