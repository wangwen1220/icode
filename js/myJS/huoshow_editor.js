(function($){
	$(function(){
		// 左边栏目点击效果
		var $category_tree_folder = $('#category_tree').find('.folder');
		$category_tree_folder.unbind('click').click(function(){
			var catid = $(this).parent()[0].id;
			window.top.$("#rightMain")[0].src='/index.php?m=content&c=content&a=init&mr=yes&menuid=822&catid='+catid+'&pc_hash='+folder_pc_hash;
			window.top.$("#current_pos_attr").html($(this).html()+'栏目');
			//$category_tree_folder.removeClass('selected');
			//$(this).addClass('selected');
		});

		// 后台 TAB 标签
		var ie6 = navigator.userAgent.indexOf("MSIE 6") > -1;
		var ie7 = navigator.userAgent.indexOf("MSIE 7") > -1;
		if(!ie6 && !ie7){
		var $js_content = top.$('#js_content'),
			$tab_link = $('.filetree .tab_link'),
			$tab_content_link = $('a.tab_content_link'),
			$js_position = top.$('#js_position');
		// 内容列表首次加载时添加标签
		if($tab_link.is(':visible')){
			$js_position.addClass('hide_position');// 隐藏当前位置
			var tab_width = $js_position.width() - 200; //$('.shortcut', $js_position).width();
			if(!top.$('#tabs').length) $('<div id="tabs" style="width:' + tab_width + '"><ul id="tab_list"><li id="tab_main" class="current">所有文章<span>x</span></li></ul><div id="tab_nav"><span id="tab_nav_prev"></span><span id="tab_nav_next"></span></div></div>').appendTo($js_position);
		}
		var $tabs = top.$('#tabs'),
			$tab_list = $tabs.find('#tab_list'),
			$tab_list_item = $tab_list.find('li'),
			scroll_width, tab_list_width; // 列表的宽度
		// 窗口尺寸改变时改变 tabs 的宽度
		if($tabs.length){
			$(top.frames).resize(function(){
				tab_width = $js_position.width() - 200;
				$tabs.width(tab_width);
				is_tab_nav(true);
			});
		}
		// 转到内容页时添加标签，转到其它页面删除标签
		$('#leftMain .sub_menu a').live('click', function(){
			if($(this).is('#_MP822 a')){
				$js_position.addClass('hide_position');// 隐藏当前位置
			}else{
				$js_position.removeClass('hide_position').find('#tabs').remove();// 隐藏当前位置并移除 Tab
				$('#rightMain').removeClass('fn_hide').nextAll('iframe').remove();// 隐藏 Tab 对应的 iframe
			}
		});
		// 更新缓存按钮点击
		$('#update_cache').click(function(){
			$js_position.removeClass('hide_position').find('#tabs').remove();// 隐藏当前位置并移除 Tab
			$('#rightMain').removeClass('fn_hide').nextAll('iframe').remove();// 隐藏 Tab 对应的 iframe
			$("#current_pos").html($(this).html());
		});
		// 生成首页按钮点击
		$('#generate_home').click(function(){
			//$(this).addClass('current').siblings().removeClass('current');
			$('#rightMain').removeClass('fn_hide').siblings().addClass('fn_hide');
			$("#current_pos").html($(this).html());
		});
		// 内容分类列表点击添加 TAB
		$tab_link.click(function(){
			addTab(this);
			$tab_link.removeClass('selected');
			$(this).addClass('selected');
			return false;
		});
		// 添加或修改文章添加 TAB
		$tab_content_link.live('click', function(){
			if(top.$('#tabs').length){
				addTab(this);
				return false;
			}
		});
		// TAB 点击显示相应 iframe
		$tab_list_item.live('click', function(){
			var i = this.id.substring(3);
			$(this).addClass('current').siblings().removeClass('current');
			if(this.id == 'tab_main'){//如果是默认标签，显示时获取焦点，以便F5刷新框架
				$('#rightMain').removeClass('fn_hide').focus().siblings().addClass('fn_hide');
			}else{
				$('#iframe' + i).removeClass('fn_hide').focus().siblings().addClass('fn_hide');
			}
		});
		// 点击关闭按钮关闭相应 iframe
		$tab_list_item.find('span').live('click', function(){
			removeTab(this);
		});
		// 双击标签关闭相应 iframe
		$tab_list_item.live('dblclick', function(){
			removeTab(this);
		});
		// 隐藏关闭按钮
		//$('.button:has(input[name="close"])').hide();
		// 关闭按钮点击
		$('.button input[name="close"]').click(function(){
			is_close_tab();
		});
		// 刷新内容列表
		$('#reload_content_list').click(function(){
			window.location.reload();
		});
		// 绑定F5为刷新框架
		//if(top.$('#center_frame:visible').length && $('#content_quick, #content_list').length){
			//$.getScript("/statics/js/hotkeys.js", function(){
				//$(document).bind('keydown', 'F5', function(){
					//var cur_ifr =$js_content.find('iframe:not(.fn_hide)')[0];
					//cur_ifr.location.reload();// 不行
					//cur_ifr.src = cur_ifr.src;// 重新载入框架
					//return false;// 阻止默认刷新
				//});
			//});
		//}
		// 标签导航
		if($('#category_tree_page').length){
			$('#tab_nav_next', $tabs).live('click', function(){
				var width = scroll_width + 18;
				//var width = top.$('#tab_list > li').length * 77 - tab_width + 18;
				$tab_list.animate({'left': '-' + width + 'px'}, 600);
			});
			$('#tab_nav_prev', $tabs).live('click', function(){
				$tab_list.animate({'left': '19px'}, 600);
			});
		}
		// 添加 Tab 方法
		function addTab(ts){
			var $ts = $(ts),
				tab_i = '',
				tab_cls = 'current',
				flag = false,// 标志是否为文章列表页
				$tab_text = '添加内容';
			$tab_list = top.$('#tab_list');
			if($ts.hasClass('tab_content_edit')){// 编辑内容页
				tab_i = $ts.closest('tr')[0].id;
				$tab_text = '编辑内容';
				tab_cls += ' content';
			}else if($ts.hasClass('add')){// 添加内容页
				tab_i += 't';
				tab_cls += ' content';
			}else if($ts.hasClass('audit_content')){// 左边审核内容点击
				tab_i = ts.id;
				tab_cls += ' list';
				$tab_text = $(ts).text();
				flag = true;
			}else {
				tab_i = $(ts).closest('li')[0].id;
				if($ts.hasClass('add_icon')){// 左边添加图片点击
					tab_i += 'f';
					tab_cls += ' content';
				}else{// 左边添文章列表点击
					$tab_text = $(ts).text();
					flag = true;
					tab_cls += ' list';
				}
			}
			if(!$tab_list.find('#tab' + tab_i).length){// 如果标签页还未打开
				var li_str = '<li id="tab' + tab_i + '" class="' + tab_cls + '">' + $tab_text + '<span title="关闭">x</span></li>';
				if(flag){// 如果是文章列表页
					$tab_list.find('li').removeClass('current').end().append(li_str);// 添加到最后
				}else{// 如果是内容页
					$tab_list.find('li.current').removeClass('current').after(li_str);// 添加到文章列表标签后
				}
				$js_content.find('iframe').addClass('fn_hide').first().clone().attr({'id': 'iframe' + tab_i, 'class': 'right_main', 'src': ts.href}).appendTo($js_content);
			}else{// 如果标签页已经打开
				$tab_list.find('#tab' + tab_i).addClass('current').siblings().removeClass('current');
				$js_content.find('#iframe' + tab_i).attr('src', ts.href).removeClass('fn_hide').siblings().addClass('fn_hide');
			}
			is_tab_nav();
		}
		// 关闭 Tab 方法
		function removeTab(ts){
			var $ts_tab, $ts_iframe, i;
			$ts_tab = $(ts).is('span') ? $(ts).parent() : $(ts);// 当 ts 为 span 时会报错
			i = $ts_tab[0].id.substring(3);
			$ts_iframe = $ts_tab.parents('body').find('#iframe' + i);
			if($ts_tab.is('#tab_main')) return;// 如果是默认标签就停止
			if($ts_tab.hasClass('current')){
				if($ts_tab.is(':last-child')){
					$ts_tab.prev().trigger('click');
				}else{
					if($ts_tab.hasClass('content') && !$ts_tab.next().hasClass('content') && !$ts_tab.prev().is('#tab_main')){ // 如果下一个标签是内容编辑页
						$ts_tab.prev().trigger('click');
					}else{
						$ts_tab.next().trigger('click');
					}
				}
			}
			$ts_iframe.remove();
			$ts_tab.remove();
			//is_tab_nav(true);
		}
		// 关闭按钮事件
		function close_tab() {
			var fs = top.frames;
			var this_iframe_id;
			var $this_tab;
			for(var i = 0; i < fs.length; i++){
				if (window == fs[i]){
					this_iframe_id = window.parent.document.getElementsByTagName("iframe")[i].id;
					break;
				}
			}
			$this_tab = top.$('#tab' + this_iframe_id.substring(6));
			removeTab($this_tab);
		}
		// 显示或隐藏导航按钮
		function is_tab_nav(resize) {
			var $tab_nav = top.$('#tab_nav');
			$tab_list = top.$('#tab_list');
			tab_list_width = $tab_list.children('li').length * 77;
			$tab_list.width(tab_list_width);
			scroll_width = tab_list_width - tab_width;
			if(tab_list_width > tab_width){
				$tab_nav.show();
			}else{
				$tab_nav.hide();
				if(resize) $tab_list.animate({'left': 0}, 600);
			}
		}
		// 从编辑修改页关闭按钮
		function is_close_tab() {
			if($('#title').val() !='') {
				art.dialog({content:'内容已经录入，确定离开将不保存数据！', fixed:true,yesText:'我要关闭',noText:'返回保存数据',style:'confirm', id:'bnt4_test'}, function(){
					close_tab();
				}, function(){

				});
			} else {
				close_tab();
			}
			return false;
		}
		if($('#close_tab').length) close_tab();// 点击保存后自动关闭按钮，保存数据后关闭 TAB 标签
		}
		// 在 IE6/IE7 下为关闭按钮绑定事件
		if(ie6 || ie7){
			$('.button input[name="close"]').unbind('click').click(function(){
				close_window();
			});
			if($('#close_tab').length) window.location.replace($('#close_tab').attr('rel'));
		}

		// 只在顶层页面触发
		// var stopCloseLeftMenu = setInterval(closeLeftMenu, 3000);
		$("#content .left_menu, #display_center_id").hover(function(){
			clearInterval(stopCloseLeftMenu);
		}, function(){
			stopCloseLeftMenu = setInterval(closeLeftMenu, 3000);
		});
		function closeLeftMenu() {
			// 如果左边列没有隐藏并且文章列表是显示的
			if(!window.top.$('#content .left_menu_on').length && window.top.$('#display_center_id').is(':visible')) {
				window.top.$("#content .left_menu").addClass("left_menu_on");
				window.top.$("#openClose").addClass("close");
				window.top.$("html").addClass("on");
				$('body').data('isClosed',1);
				window.top.$("#openClose").data('clicknum',1);
			}
		}

		// 内容编辑和添加页取消标题的blur事件
		$('#js_table_form #title').removeAttr('onblur');

		// 内容编辑和添加页设置上传Flash后尺寸为450*450
		$('#cke_77_textInput').live('focus', function(){
			$('label:contains("宽度"), label:contains("高度")').next().find('input').val(450);
		});
		// trunk
		$('#cke_90_textInput').live('focus', function(){
			$('label:contains("宽度"), label:contains("高度")').next().find('input').val(450);
		});

		// 文章内容列表页文章排序
		$('#myform .tb_sort').toggle(function(){
			$(this).removeClass('tab_sort_down').addClass('tab_sort_up');
		}, function(){
			$(this).removeClass('tab_sort_up').addClass('tab_sort_down');
		});

		// 推荐位样式修改
		$('#js_table_form th:contains("推荐位")').next('td').find('label').css({
			'width': '120px',
			'margin-right': '5px',
			'vertical-align': 'top'
		});

		// ###编辑添加内容页，图片列表中图片上移或下移功能
		var $fn_img_list = $('#fn_img_list');
		var $fn_img_item = $fn_img_list.find('.fn_img_item');
		var $fn_up = $fn_img_list.find('.fn_up');
		var $fn_down = $fn_img_list.find('.fn_down');
		var default_order = [];
		var $fn_img_order = $('#fn_img_order');
		//保存默认排序
		if($fn_img_item.length){
			$fn_img_item.each(function() {
				default_order.push($(this).attr('data-id'));
			});
		}
		if($fn_img_order.length) $fn_img_order.val(default_order.join(','));
		$fn_up.first().addClass('disabled');
		$fn_down.last().addClass('disabled');
		//向上移动
		$fn_up.live('click', function(){
			var $this = $(this);
			if(!$fn_img_item.length) $fn_img_item = $fn_img_list.find('.fn_img_item');
			var order = parseInt($(this).parent().attr('order'));
			var $parent = $this.parent();
			var $parent_prev;
			if(order > 0){
				for(order--; order >= 0; order--){
					$parent_prev = $parent.siblings('[order="' + order + '"]');
					if($parent_prev.length) break;
				}
				$parent.fadeOut(function(){
					$parent_prev.before($parent).attr('order', order + 1);
				}).fadeIn().attr('order', order);
				// 改变按钮状态
				if(order == 0){//点击后到了最上面 TODO当只有两个元素时不能正常切换！！！
					$this.addClass('disabled');
					$parent_prev.find('.fn_up').removeClass('disabled');
					//if(1) $this.find('.fn_down').removeClass('disabled');
				} else if(order == $fn_img_item.length - 2){//最下面的元素被点击
					$this.next().removeClass('disabled');
					$parent_prev.find('.fn_down').addClass('disabled');
				}
			} else{
				//alert('ok');
			}
			return false;
		});
		//向下移动
		$fn_down.live('click', function(){
			var $this = $(this);
			if(!$fn_img_item.length) $fn_img_item = $fn_img_list.find('.fn_img_item');
			var order = parseInt($(this).parent().attr('order'));
			var len = $fn_img_item.length;
			var $parent = $this.parent();
			var $parent_next;
			if(order < len - 1){
				for(order++; order < len; order++){
					$parent_next = $parent.siblings('[order="' + order + '"]');
					if($parent_next.length) break;
				}
				$parent.fadeOut(function(){
					$parent_next.after($parent).attr('order', order - 1);
				}).fadeIn().attr('order', order);
				// 如果元素到了最下面，或是从最上面移到上面时
				if(order == len - 1){//点击后到了最下面
					$this.addClass('disabled');
					$parent_next.find('.fn_down').removeClass('disabled');
				} else if(order == 1){//最上面的元素被点击
					$this.prev().removeClass('disabled');
					if($fn_img_item.length != 2) $parent_next.find('.fn_up').addClass('disabled');
				}
			} else{
				//alert('ok');
			}
			return false;
		});
		//保存最终排序
		$('body').bind('mouseover', function(){
			var now_order = [];
			$fn_img_list.find('.fn_img_item').each(function() {
				now_order.push($(this).attr('data-id'));
			});
			if($fn_img_order.length) $fn_img_order.val(now_order.join(','));
		});
	});
})(jQuery);