/* =================================================
// jQuery Tabs Plugins 1.3
// author : chenmnkken@gmail.com
// Url: http://stylechen.com/jquery-tabs.html
// Data : 2012-09-06
// =================================================*/

;(function($){
	$.fn.tabs = function(options){
		return this.each(function(){
			// 处理参数
			options = $.extend({
				event: 'mouseover',
				timeout: 0,
				auto: 0,
				callback: null,
				switchBtn: false
			}, options);

			var self = $(this),
				tabBox = self.find('.ui-tab-cnt-item'),
				menu = self.find('.ui-tab-nav'),
				items = menu.find('.ui-tab-nav-item'),
				timer;

			var tabHandle = function(elem){
				elem.siblings('.ui-tab-nav-item')
					.removeClass('ui-tab-nav-item-cur')
					.end()
					.addClass('ui-tab-nav-item-cur');

				tabBox.siblings('.ui-tab-cnt-item')
					.addClass('fn-hide')
					.end()
					.eq(elem.index())
					.removeClass('fn-hide');
			},

				delay = function(elem, time){
					time ? setTimeout(function(){tabHandle(elem);}, time) : tabHandle(elem);
				},

				start = function(){
					if(!options.auto) return;
					timer = setInterval(autoRun, options.auto);
				},

				autoRun = function(isPrev){
					var current = menu.find('.ui-tab-nav-item-cur'),
						firstItem = items.eq(0),
						lastItem = items.eq(items.length - 1),
						len = items.length,
						index = current.index(),
						item, i;

					if(isPrev){
						index -= 1;
						item = index === -1 ? lastItem : current.prev('.ui-tab-nav-item');
					}
					else{
						index += 1;
						item = index === len ? firstItem : current.next('.ui-tab-nav-item');
					}

					i = index === len ? 0 : index;

					current.removeClass('ui-tab-nav-item-cur');
					item.addClass('ui-tab-nav-item-cur');

					tabBox.siblings('.ui-tab-cnt-item')
						.addClass('fn-hide')
						.end()
						.eq(i)
						.removeClass('fn-hide');

					if(options.callback){
						options.callback.call(self);
					}
				};

			items.bind(options.event, function(){
				delay($(this), options.timeout);
				if(options.callback){
					options.callback.call(self);
				}
			});

			if(options.auto){
				start();
				self.hover(function(){
					clearInterval(timer);
					timer = undefined;
				},function(){
					start();
				});
			}

			if(options.switchBtn){
				self.append('<a href="#prev" class="ui-tab-prev">Prev</a><a href="#next" class="ui-tab-next">Next</a>');
				var prevBtn = $('.ui-tab-prev', self),
					nextBtn = $('.ui-tab-next', self);

				prevBtn.click(function(e){
					autoRun(true);
					e.preventDefault();
				});

				nextBtn.click(function(e){
					autoRun();
					e.preventDefault();
				});
			}
		});
	};
})(jQuery);