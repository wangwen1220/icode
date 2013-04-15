(function($){
	/*====================常用变量=====================*/
	var isIE = !!window.ActiveXObject,
		isIE6 = isIE && !window.XMLHttpRequest,
		isIE8 = isIE && !!document.documentMode && (document.documentMode == 8),
		//isIE8 = isIE && !!document.documentMode,
		isIE7 = isIE && !isIE6 && !isIE8;

	/*====================jQuery 工具扩展=====================*/
	$.extend({
		// 当前页加入收藏夹
		addFav: function() {
			if (document.all) {
				window.external.addFavorite(window.location.href, document.title);
			} else if (window.sidebar) {
				window.sidebar.addPanel(document.title, window.location.href, "");
			} else {
				alert("加入收藏失败，请手动添加！");
			}
		},
		// 当前页设为首页
		setHome: function() {
			if (document.all) {
				document.body.style.behavior = 'url(#default#homepage)';
				document.body.setHomePage(window.location.href);
			} else {
				alert("此设置只支持 IE 浏览器，其它浏览器请手动设置！");
			}
		}
	});

	/*====================jQuery 方法扩展=====================*/
	$.fn.extend({
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

	/*====================文档加载完执行=====================*/
	$(function(){
		// 定义变量
		var $body = $('body'),
			$login = $('#login'),
			$weather = $('#weather'),
			$search = $('#search'),
			$search_wd = $('#search-wd');

		// 设为首页
		$('#set-home').on('click', function(){$.setHome();});

		// 用户登录菜单
		/*$.getJSON($body.attr('data-id'), function(d){
		});*/

		// 查找关键词不能为空
		$search.submit(function() {
			var wd = $search_wd.val();
			if ($.trim(wd) == '' || wd == $search_wd[0].defaultValue) {
				alert('请输入你要查找的关键词！');
				return false;
			}
		});

		// 搜索切换
		/*$('#search-tab').on('click', 'a', function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			$('#stype').val($(this).attr('data-t'));
		});*/
		$.divselect("#jselect", "#typeid");
		$('body').click(function(){$('#jselect').find('.options').hide();});
		/*$('#search .search-form input').css('padding-left', $('#jselect .selected').width() + 4 + 'px');
		$('#jselect').on('click', '.option', function(){
			alert('test');
			$('#search .search-form input').css('padding-left', $('#jselect .selected').width() + 4 + 'px');
		});*/

		// Tab 切换动画
		$('.ui-tab').tabs().find('.ui-tab-nav-item:first-child').addClass('first-child');

		// 排行榜动画
		$('.ui-rank-item').on('mouseover', function(){
			$(this).addClass('ui-rank-item-cur').siblings().removeClass('ui-rank-item-cur');
		});

		// 相册图集
		$('#js-tab-gallery').on({
			mouseenter: function(){
				$(this).find('.title').stop(true).animate({bottom: 0}, 200);
			},
			mouseleave: function(){
				$(this).find('.title').stop(true).animate({bottom: '-21px'}, 200);
			}
		}, '.ui-img-list-item .wrapper');

		// 加载天气
		$.get('/api/weather.php', function(d){
			$weather.html(d);
			if(isIE6){
				// 解决 IE6 图片半透明问题
				var weather_img = '<span class="png" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + $(d).filter('img').attr('src') + '\', sizingMethod=\'scale\');" />';
				$weather.prepend(weather_img);
			}
		});

		// 最新分享滚动
		var scroll_timer;
		$("#js-box-lite .ui-arts").hover(function(){
			clearInterval(scroll_timer);
		}, function(){
			var $ths = $(this);
			scroll_timer = setInterval(function(){
				scroll_share($ths);
			}, 2500);
		}).trigger("mouseleave");
		function scroll_share($obj){
			var height = $obj.find("li").height(); // 获取行高
			$obj.animate({"margin-top": -height + "px"}, 320 , function(){
				$obj.css({'margin-top': 0}).find("li:first").appendTo($obj); // appendTo 能直接移动元素
			})
		}

		/*====================浏览器兼容性解决方案=====================*/
		if(isIE6){ // if($.browser.msie && $.browser.version == '6.0'){
			// 解决 IE6 hover Bug
			$('.ui-goods-list-item, .ui-goods-list-item .wrapper, .jselect .options li').hover(function(){
				$(this).toggleClass('hover');
			});
			$('.ui-art .ui-list-item:first-child').addClass('first-child');
		}

		if(isIE6 || isIE7){
			// 解决 IE6 IE7 操蛋的绝对定位问题和浮动宽度问题
			$('.ui-img-list-item .wrapper').each(function(){
				var $ths = $(this), $ths_img = $ths.find('img');
				$ths.width($ths_img.width());
			});
		}
	});

	/*====================页面加载完执行=====================*/
	$(window).load(function(){
		// IE6 png 图片透明
		// 将单引号中的内容修改为你使用了png图片的样式，与 CSS 文件中一样即可
		// 如果要直接插入 png 图片，在单引号内加入 img 即可
		// 此方法在某些 IE6 版本中图片会消失，所以这里不用此方法
		if(isIE6) {
			/*$.getScript("/statics/js/DD_belatedPNG_0.0.8a.js", function(){
				DD_belatedPNG.fix('img, .ui-gallery-item-status, .ui-game-list-item .hot, .ui-goods-list-item a');
			});*/

			// 让IE6 缓存背景图片
			try { // TredoSoft Multiple IE doesn't like this, so try{} it
				document.execCommand("BackgroundImageCache", false, true);
			} catch(r) {}
		}
	});
})(jQuery);