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
		'jqetab': 'jquery-etab',
		'jcarousel': 'jquery-jcarousel',
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
	//window.jQuery = window.$ = exports;
//});
//window.jQuery = window.$ = seajs.find('jquery');

// 将 jQuery Cookie 插件自动包装成 CMD 接口
//seajs.modify('cookie', function(require, exports, module) {
//	module.exports = $.cookie;
//});

// 主程序模块
define('main', ['jquery', 'myfocus', 'jqetab', 'jcarousel'], function(require) {
	//seajs.log(require.resolve('../seajs-myfocus'));
	/*====================加载依赖模块=====================*/
	var $ = jQuery = require('jquery'),
		myFocus = require('myfocus');
	require('jqetab')($);
	require('jcarousel')($);

	/*====================常用工具=====================*/
	// IE 版本判断
	var isIE = !!window.ActiveXObject,
		isIE6 = isIE && !window.XMLHttpRequest;

	$.extend({
		// 浏览器版本判断
		isIE: document.all,
		isIE6: document.all && !window.XMLHttpRequest,

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

	//$(function() {// 判断文档加载完执行时机有点慢暂时不用
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

	// 设置图片列表项的宽度
	$('.ui-img-list-item, .ui-img-list-item-wrapper, .ui-img-box .ui-img').each(function() {
		var $ths = $(this),
			imgwraper_border_width = $ths.find('.img').outerWidth() - $ths.find('.img').innerWidth(),
			img_width = $ths.find('img').outerWidth();
		// 设置宽度为图片宽度加上边框的宽度
		$ths.width(img_width + imgwraper_border_width);
	});

	// Tab 切换动画
	$('.ui-tab').etab();
	//$('.ui-tab-gallery').etab({switch_btn: true});

	// 排行榜动画
	$('.ui-ranking-item').on('mouseover', function(){
		$(this).addClass('ui-ranking-item-cur').siblings().removeClass('ui-ranking-item-cur');
	});

	// 滚动新闻
	/*var scroll_timer;
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
	}*/

	// 调整列高
	$('.ui-box-item').each(function() {
		var $this = $(this),
			height = $this.parent().height() - 34;
		$this.height(height);
	});
	$('.ui-game-item').each(function() {
		var $this = $(this),
			height = $this.parent().height() - 40;
		$this.height(height);
	});
	$('.ui-layout-item').each(function() {
		var $this = $(this),
			height = $this.parent().height();
		$this.height(height);
	});

	/* TODO */
	if($body.hasClass('game-android')) $nav.height($nav.find('.nav-item-cur .nav-item-subnav').outerHeight() + 32);

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

	/*====================游戏首页=====================*/
	// 游戏列表切换
	$('#js-tab-game').on('click', '.ui-tab-game-nav-item', function() {
		var $ths = $(this),
			i = $ths.index(),
			$tab_cnt_item = $('#js-tab-game').find('.ui-tab-game-cnt-item');
		if ($ths.hasClass('ui-tab-game-nav-item-cur')) return;
		$ths.addClass('ui-tab-game-nav-item-cur').siblings().removeClass('ui-tab-game-nav-item-cur');
		$tab_cnt_item.eq(i).addClass('ui-tab-game-cnt-item-cur').siblings().removeClass('ui-tab-game-cnt-item-cur');
		return false;
	});
	$('#content-main').find('.ui-tab-sd .ui-tab-nav-item:first-child').addClass('first-child');
	$('#content-main').find('.ui-tab-sd .ui-gamenum:last-child').addClass('first-child');

	// 网页游戏手风琴效果
	$('#js_accordion').on('click', '.abox-title', function() {
		$(this).parent().addClass('abox-cur').siblings().removeClass('abox-cur');
	});

	/*====================手机游戏首页=====================*/
	// 滚动图片
	$('.jcarousel-skin-game').jcarousel({
		scroll: 9,
		//auto: 3,
		animation: 800
		//wrap: 'both'
	});

	/*====================列表页=====================*/
	// 新资讯中热点排行展开与折叠效果
	$('.ui_fold_box_redian, .ui_fold_box_reyi').find('li').hover(function() {
		if(!$(this).hasClass('ui_fold_box_content_selected')) {
			$(this).addClass('ui_fold_box_content_selected').siblings().removeClass('ui_fold_box_content_selected');
			return false;
		}
	});

	/*====================内容页=====================*/
	$('#main').find('.article-status .face').click(function(e, stat) {
		var $ths = $(this),
			$progress = $ths.prev(),
			$num = $progress.prev(),
			progress_height = +$num.text(),
			url = $ths.attr('data-url');
		//if (progress_height < 100 && !stat){
		if (!stat){
			$num.text(++progress_height);
			//$.post('url' + progress_height);// 状态写入数据库
			$progress.height(progress_height).css('display', 'inline-block');
		} else if (progress_height > 0) {
			$progress.height(progress_height).css('display', 'inline-block');
		}
		return false;
	}).trigger('click', [true]);// 页面初始化时触发一次，且数字不加 1

	// 返回顶部
	if ($body.hasClass('js-scroll-top')) {
		var $back_to_top = $('<div class="back-to-top" title="返回顶部"></div>').appendTo("body");
		function backToTop() {
			var st = $(document).scrollTop(), winh = $(window).height();
			st > 200 ? $back_to_top.show() : $back_to_top.hide();
			// IE6 下的定位
			if (!window.XMLHttpRequest) $back_to_top.css("top", st + winh - 166);
		}
		backToTop();
		$(window).scroll(backToTop);

		$back_to_top.click(function() {
			$("html, body").stop().animate({scrollTop: 0}, 400);
		});
	}

	/*====================苹果专区下载页=====================*/
	if ($body.hasClass('switchable')) {
		$.getScript(JS_PATH + 'jquery.switchable-2.0.min.js', function() {
			var $myslider = $('#myslider'),
				$myswicth = $('#myswicth'),
				$myswicth_triggers = $('#myswicth-triggers');
			// 通用单行焦点图
			$myslider.find('.slider-cnt').switchable({
				triggers: '&bull;',
				//triggerType: 'click',
				//putTriggers: 'insertBefore',
				panels: '.slider-cnt-item',
				effect: 'fade',
				easing: 'ease-in-out',
				loop: false,
				prev: $myslider.find('.slider-nav-prev'),
				next: $myslider.find('.slider-nav-next'),
				onSwitch: function(event, currentIndex) {
					var api = this;
					api.prevBtn.toggleClass('slider-nav-prev-disabled', currentIndex === 0);
					api.nextBtn.toggleClass('slider-nav-next-disabled', currentIndex === api.length - 1);
				}
			});

			// WP 首页滚动动画
			var myswicth_api = $myswicth.switchable({
				triggers: $myswicth_triggers.find('.ui-switch-triggers-item'),
				panels: '.ui-switch-item',
				effect: 'scrollLeft',
				autoplay: true,
				//duration: .8,
				prev: $myswicth_triggers.find('.ui-switch-prev'),
				next: $myswicth_triggers.find('.ui-switch-next'),
				api: true,
				onSwitch: function(event, currentIndex) {
					var api = this, cfg = api.config;
					new $.switchable.Anim(
						$myswicth_triggers.find('.ui-switch-mask'),
						{left: 37 + 120 * currentIndex},
						cfg.duration,
						cfg.easing
					).run();
				}
			});
			// 鼠标移到触点上时停止自动动画
			$myswicth_triggers.hover(function() {
				myswicth_api.pause();
			}, function() {
				myswicth_api.play();
			});
		});
	}

	/*====================安卓应用列表页=====================*/
	if($body.hasClass('game-android')) $('#aside').height($('#content').height());

	/*====================焦点图设置=====================*/
	// 焦点图 myfocus-games
	if ($('#myfocus-games').length) {
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
	}

	if ($('#myfocus-qiyi').length) {
		// 焦点图 myfocus-qiyi
		myFocus.set({
			id: 'myfocus-qiyi',// 焦点图盒子ID
			pattern: 'mF_qiyi',// 风格应用的名称
			width: 288,// 设置图片区域宽度(像素)
			height: 200,// 设置图片区域高度(像素)
			wrap: false,
			txtHeight: 33 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}

	if ($('#myfocus-kiki-top').length) {
		// 焦点图 myfocus-kiki-top
		myFocus.set({
			id: 'myfocus-kiki-top',// 焦点图盒子ID
			pattern: 'mF_kiki',// 风格应用的名称
			//path: '/statics/js/pattern/',
			turn: 'left',
			width: 440,// 设置图片区域宽度(像素)
			height: 200,// 设置图片区域高度(像素)
			wrap: false,
			//loadIMGtimeout: 0,
			txtHeight: 0 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}

	if ($('#myfocus-qiyi-full').length) {
		// 焦点图 myfocus-qiyi-full
		myFocus.set({
			id: 'myfocus-qiyi-full',// 焦点图盒子ID
			pattern: 'mF_qiyi',// 风格应用的名称
			width: 312,// 设置图片区域宽度(像素)
			height: 235,// 设置图片区域高度(像素)
			wrap: false,
			txtHeight: 0 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}

	if ($('#myfocus-kiki').length) {
		// 焦点图 myfocus-kiki
		myFocus.set({
			id: 'myfocus-kiki',// 焦点图盒子ID
			pattern: 'mF_kiki',// 风格应用的名称
			turn: 'left',
			width: 219,// 设置图片区域宽度(像素)
			height: 234,// 设置图片区域高度(像素)
			wrap: false,
			txtHeight: 0 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}

	if ($('#myfocus-kiki-index').length) {
		// 焦点图 myfocus-kiki-index
		myFocus.set({
			id: 'myfocus-kiki-index',// 焦点图盒子ID
			pattern: 'mF_kiki',// 风格应用的名称
			turn: 'right',
			width: 255,// 设置图片区域宽度(像素)
			height: 335,// 设置图片区域高度(像素)
			wrap: false,
			txtHeight: 0 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}

	if ($('#myfocus-gallery').length) {
		// 焦点图 myfocus-gallery
		myFocus.set({
			id: 'myfocus-gallery',// 焦点图盒子ID
			pattern: 'mF_tbhuabao',// 风格应用的名称
			width: 655,// 设置图片区域宽度(像素)
			height: 305,// 设置图片区域高度(像素)
			wrap: false,
			txtHeight: 0 // 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}

	if ($('#myfocus-hsgallery').length) {
		// 焦点图 myfocus-hsgallery
		myFocus.set({
			id: 'myfocus-hsgallery',// 焦点图盒子ID
			pattern: 'mF_hsgallery',// 风格应用的名称
			width: 318,// 设置图片区域宽度(像素)
			height: 388,// 设置图片区域高度(像素)
			loadingShow: true,//是否显示Loading画面[true(显示，即等待图片加载完)|false(不显示，即不等待图片加载完)]
			wrap: false
		});
	}

	if ($('#myfocus-hsgallery-two').length) {
		// 焦点图 myfocus-hsgallery-two
		myFocus.set({
			id: 'myfocus-hsgallery-two',// 焦点图盒子ID
			pattern: 'mF_hsgallery',// 风格应用的名称
			width: 318,// 设置图片区域宽度(像素)
			height: 388,// 设置图片区域高度(像素)
			loadingShow: true,//是否显示Loading画面[true(显示，即等待图片加载完)|false(不显示，即不等待图片加载完)]
			wrap: false
		});
	}

	if ($('#myfocus-mygallery').length) {
		// 焦点图 myfocus-sgallery
		myFocus.set({
			id: 'myfocus-mygallery',// 焦点图盒子ID
			pattern: 'mF_mygallery',// 风格应用的名称
			width: 320,// 设置图片区域宽度(像素)
			height: 299,// 设置图片区域高度(像素)
			wrap: false
		});
	}

	if ($('#myfocus-hs-pithy').length) {
		// 焦点图 myfocus-hs-pithy
		myFocus.set({
			id: 'myfocus-hs-pithy',
			pattern: 'hs-pithy',
			width: 542,
			height: 220,
			thumbShowNum: 3,
			thumbWidth: 123,
			wrap: false
		});
	}

	if ($('#myfocus-classichc').length) {
		// 焦点图 myfocus-classichc
		myFocus.set({
			id: 'myfocus-classichc',
			pattern: 'mF_classicHC',
			trigger: 'mouseover',
			width: 326,
			height: 216,
			txtHeight: 0,
			wrap: false
		});
	}

	/*====================火秀相册=====================*/
	if($('.mygallery').length) {
		// 加载样式
		if (!$body.hasClass('game-picshow')) {
			$.loadCSS(JS_PATH + 'mygallery/skin/' + $('.mygallery').attr('data-skin') + '.css');
		}

		// 加载 JS
		$.getScript(JS_PATH + 'mygallery/jquery-mygallery.js', function() {
			$('#mygallery-classic').myGallery();
			$('#mygallery-black').myGallery();
		});
	}

	// 图片详细页换一组
	/*$('#jGalleryGroup').on('click', '.change', function(e) {
		var $piclist = $(e.delegateTarget).find('.ui-img-list'),
			$piclistLast = $piclist.last(),
			$piclistCur = $piclist.filter(':visible');

		if ($piclistCur.is($piclistLast)) {
			$piclist.hide().first().fadeIn(888);
		} else {
			$piclistCur.hide().next().fadeIn(888);
		}
	});*/
	$('#jGalleryGroup').on('click', '.change', function(e) {
		var $piclist = $(e.delegateTarget).find('.ui-img-list');
		$piclist.append($piclist.find('.ui-img-list-item:lt(6)'));
		return false;
	});
	//});

	/*====================函数=====================*/
	/*hover box*/
	/*function make_hoverbox(t, f1, f2) {
		var o = typeof t == 'string' ? el(t): t;
		if(o.isHoverbox) return o;
		o.isHoverbox = true;
		f1 = f1 || function() {};
		f2 = f2 || function() {};
		$(o).hover(function(e) {
			$(o).removeClass('hoverbox-on').addClass('hoverbox-on');
			f1();
		}, function(e) {
			$(o).removeClass('hoverbox-on');
			f2();
		});
	}*/

	//if jiathis todo

	/*====================浏览器兼容性解决方案=====================*/
	if (isIE6) {
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
		$('#header .drop-down').hover(function() { $(this).toggleClass('drop-down-hover'); });
		$('#main.article-box .content p img').maxWidth(600);

		// 设置游戏图片遮罩的宽高
		$('.mark-img').each(function() {
			var $ths = $(this),
				$img = $ths.siblings('img');
			$ths.width($img.width()).height($img.height());
		});


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