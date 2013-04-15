define('jqstab', ['jquery'], function(require) {
/* =================================================
// 说明: 一个简洁高效的 Tab 切换插件
// jQuery Stab Plugins 1.3
// author : chenmnkken@gmail.com
// Url: http://stylechen.com/jquery-tabs.html
// Data : 2012-09-06
// Update : Steven wangwen1220@139.com 2012-11-18
// =================================================*/

return function($) {
	$.fn.stab = function(options) {
		return this.each(function() {
			// 处理参数
			options = $.extend({
				event: 'mouseover', // 事件类型
				timeout: 0, // 设置事件延迟
				auto: 0,// 几秒自动切换一次，单位毫秒
				callback: null,// 回调函数
				switch_btn: false
			}, options);

			var $this = $(this),
				$tab_cnt_item = $this.find('.ui-tab-cnt-item'),
				$tab_nav = $this.find('.ui-tab-nav'),
				$tab_nav_items = $tab_nav.find('.ui-tab-nav-item'),
				timer;

			var tabHandle = function($nav_item) {
				$nav_item.siblings()
					.removeClass('ui-tab-nav-item-cur')
					.end()
					.addClass('ui-tab-nav-item-cur');

				$tab_cnt_item.siblings()
					.removeClass('ui-tab-cnt-item-cur')
					.end()
					.eq($nav_item.index())
					.addClass('ui-tab-cnt-item-cur');
			},

				delay = function(elem, time) {
					time ? setTimeout(function() { tabHandle(elem); }, time) : tabHandle(elem);
				},

				start = function() {
					if (!options.auto) return;
					timer = setInterval(autoRun, options.auto);
				},

				autoRun = function(is_prev) {
					var $cur_item = $tab_nav.find('.ui-tab-nav-item-cur'),
						$first_item = $tab_nav_items.first(),
						$last_item = $tab_nav_items.last(),
						len = $tab_nav_items.length,
						index = $cur_item.index(),
						$item, i;

					if (is_prev) {
						index--;
						$item = index === -1 ? $last_item : $cur_item.prev();
					}
					else{
						index++;
						$item = index === len ? $first_item : $cur_item.next();
					}

					i = index === len ? 0 : index;

					$cur_item.removeClass('ui-tab-nav-item-cur');
					$item.addClass('ui-tab-nav-item-cur');

					$tab_cnt_item.siblings()
						.removeClass('ui-tab-cnt-item-cur')
						.end()
						.eq(i)
						.addClass('ui-tab-cnt-item-cur');

					if (options.callback) {
						options.callback.call($this);
					}
				};

			$tab_nav_items.bind(options.event, function() {
				delay($(this), options.timeout);
				if (options.callback) {
					options.callback.call($this);
				}
			});

			if (options.auto) {
				start();
				$this.hover(function() {
					clearInterval(timer);
					timer = undefined;
				},function() {
					start();
				});
			}

			if (options.switch_btn) {
				$this.append('<a href="#prev" class="ui-tab-prev">Prev</a><a href="#next" class="ui-tab-next">Next</a>');
				var prev_btn = $('.ui-tab-prev', $this),
					next_btn = $('.ui-tab-next', $this);

				prev_btn.click(function(e) {
					autoRun(true);
					e.preventDefault();
				});

				next_btn.click(function(e) {
					autoRun();
					e.preventDefault();
				});
			}
		});
	};
}
});