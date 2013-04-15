/*!
 * myGallery - Steven myGallery with jQuery
 * Version: 1.0
 * Date: 2012-12-28
 * Copyright (c) 2012 Steven wangwen1220@139.com
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://creativecommons.org/licenses/LGPL/2.1/
 */

;(function ($) {
	/*var _path, _skin,
		mygallery = {
			version: '1.0',
			path: '/statics/js/mygallery/',
			skin: 'classic'
		};

	// 获取 mygallery 路径 ！如果异步加载本文件，请保设置文件路径
	_path = mygallery.path || (function(scripts, i, me) {
		for (i in scripts) {
			if (scripts[i].src && scripts[i].src.indexOf('mygallery') !== -1) me = scripts[i];
		}
		if (!me) return '.';
		me = me.src.replace(/\\/g, '/');
		return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/') + 1);
	}(document.scripts));

	// 无阻塞载入 CSS (如'jquery.mygallery.js?skin=black')
	_skin = mygallery.skin;
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = _path + 'skin/' + _skin + '.css';
	document.getElementsByTagName('head')[0].appendChild(link);*/

	$.fn.myGallery = function(options) {
		return this.each(function() {
			// 处理参数
			options = $.extend({
				path: '/statics/js/mygallery/',
				//skin: 'classic',
				gallery: $(this),
				thumb_item: '.mygallery-ctrl-thumb-item',
				photo: '.mygallery-view-img img',
				photo_loading: '.mygallery-view-loading',
				photo_prev: '.mygallery-view-prev',
				photo_next: '.mygallery-view-next',
				photo_index: '.index',
				photo_totlal: '.total',
				photo_title: '.mygallery-view-title',
				viewAllBtn: '.view-all',
				picView: '.mygallery-view',
				picTitle: '.mygallery-view-title',
				viewOriginal: '.view-original',

				scrlbar: '.mygallery-ctrl-bar-main',
				scrlbarBtn: '.mygallery-ctrl-bar-btn',
				prevBtn: '.mygallery-ctrl-prev',
				nextBtn: '.mygallery-ctrl-next',
				panel: '.mygallery-ctrl-thumb-list',
				content: '.mygallery-ctrl-thumb',
				direction: 'left',
				acceleration: 5,
				sliderAcc: 1
			}, options || {});

			// 初始化滚动条
			var slider,
				$this = options.gallery,
				skin = $this.attr('data-skin'),
				$photo = $this.find(options.photo),
				$photo_loading = $this.find(options.photo_loading),
				$photo_prev = $this.find(options.photo_prev),
				photo_prev = $photo_prev.get(0),
				$photo_next = $this.find(options.photo_next),
				photo_next = $photo_next.get(0),
				$photo_index = $this.find(options.photo_index),
				$photo_totlal = $this.find(options.photo_totlal),
				$photo_title = $this.find(options.photo_title),
				$viewAllBtn = $this.find(options.viewAllBtn),
				$picView = $this.find(options.picView),
				$picTitle = $this.find(options.picTitle),
				$viewOriginal = $this.find(options.viewOriginal),
				$thumb = $this.find(options.content),
				$thumb_list = $this.find(options.panel),
				$thumb_item = $this.find(options.thumb_item),
				thumb_item = $this.find(options.thumb_item).get(),
				len = thumb_item.length,
				$scrlbar = $this.find(options.scrlbar),
				$scrlbarBtn = $this.find(options.scrlbarBtn),
				scrlbarBtnWidth,
				intervalS,
				intervalD,
				index = 0,
				ie6whs = [];

			$this.addClass('.mygallery-' + skin);
			$photo_totlal.text(len); // 设置总的图片个数
			$thumb_list.width(len * $thumb_list.find('li').outerWidth(true)); // todo 设置缩略图列表的宽度
			//console.log($thumb_list.width());

			// 按缩略图数量计算滚动按钮宽度
			scrlbarBtnWidth = Math.max(56, Math.min($scrlbar.width() * $thumb.width() / $thumb_list.width(), $scrlbar.width()));
			$scrlbarBtn.width(scrlbarBtnWidth);

			intervalD = Math.ceil($thumb_list[0].scrollWidth / len);

			// 当页面加载完，预加载相册大图片
			$(window).load(function() {
				$this.find('.thumb').each(function(i) {
					var img = new Image();
					img.src = $(this).attr('data-src');
					/*if (!window.XMLHttpRequest) { // 设置图片在 IE6 中的宽度和高度
						if (img.width > img.height) {
							ie6whs.push(1);
							alert(ie6whs[0]);
						} else {
							ie6whs.push(0);
						}
					}*/
				});
			});
			//alert(ie6whs[0]);// 这里取不到值

			// Opera 不支持动态鼠标指针，为其单独设置前进后退的样式
			if ($.browser.opera) $this.find('.mygallery-view-prev, .mygallery-view-next').addClass('opera');

			// JS tools
			var jt  = {
				isIE: document.all,
				addEvent: function(oTarget, fnHandler, sEventType) {
					if (oTarget.addEventListener) {
						oTarget.addEventListener(sEventType, fnHandler, false);
					} else if (oTarget.attachEvent) {
						oTarget.attachEvent('on' + sEventType, fnHandler);
					} else {
						oTarget['on' + sEventType] = fnHandler;
					}
				},

				removeEvent: function(oTarget, fnHandler, sEventType) {
					if (oTarget.removeEventListener) {
						oTarget.removeEventListener(sEventType, fnHandler, false);
					} else if (oTarget.detachEvent) {
						oTarget.detachEvent('on' + sEventType, fnHandler);
					} else {
						oTarget['on' + sEventType] = null;
					}
				},

				bind: function(object, fun) {
					return function() {
						return fun.apply(object, arguments);
					}
				},

				bindAsEventListener: function(object, fun) {
					return function(event) {
						return fun.call(object, (event || window.event));
					}
				},

				extend: function(destination, source) {
					for (var o in source) {
						destination[o] = source[o];
					}
					return destination;
				},

				preventDefault: function(event) {
					if (event.preventDefault) {
						event.preventDefault();
					} else {
						event.returnValue = false;
					}
				},

				getDetail: function(event) {
					var detail = 0;
					if (event.wheelDelta) {
						detail = - event.wheelDelta / 40;
					} else {
						detail = event.detail;
					}
					return detail;
				},

				getWhich: function(event) {
					if (event.which == null && (event.charCode != null || event.keyCode != null)) {
						return event.charCode != null ? event.charCode : event.keyCode;
					}
				},

				getPos: function (e) {
					e = e || window.event;
					var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
					var y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
					return { 'pageX':x,'pageY':y };
				},

				getS: function (obj) {
					var iTop = obj.offsetTop;
					var iLeft = obj.offsetLeft;
					while (obj.offsetParent) {
						iTop += obj.offsetParent.offsetTop;
						iLeft += obj.offsetParent.offsetLeft;
						obj = obj.offsetParent;
					}
					return {top: iTop, left: iLeft}
				},

				each: function(array, callback, thisObject) {
					if (array.forEach) {
						array.forEach(callback, thisObject);
					} else {
						for (var i = 0, len = array.length; i < len; i++) {
							callback.call(thisObject, array[i], i, array);
						}
					}
				},

				getStyle: function( elem, name ) {
					if (elem.style[name]) {
						return elem.style[name];
					} else if (elem.currentStyle) {
						return elem.currentStyle[name];
					} else if (document.defaultView && document.defaultView.getComputedStyle) {
						name = name.replace(/([A-Z])/g,'-$1');
						name = name.toLowerCase();
						var s = document.defaultView.getComputedStyle(elem,'');
						return s && s.getPropertyValue(name);
					} else {
						return null;
					}
				}
			};

			// 拖拽组件
			jt.Drag = function(container, drag, options) {
				this.init(container, drag, options);
			}
			jt.Drag.prototype = {
				constructor: jt.Drag,
				init: function(container, drag, options) {
					options = options || {};
					this.container = container;
					this.drag = drag;
					this.acceleration = options.acceleration || 1;
					this.x = 0;
					this.y = 0;
					this.restrict = options.restrict || false;
					this.restrictX = options.restrictX || false;
					this.restrictY = options.restrictY || false;
					this.Max = {
						top: 9999999,
						left: 9999999
					};

					this.Min = {
						top: 0,
						left: 0
					};

					if (this.restrict) {
						this.Max.top = this.container.clientHeight - this.drag.offsetHeight;
						this.Max.left = this.container.clientWidth - this.drag.offsetWidth;
					}

					this.startFunc = options.startFunc || function() {};
					this.moveFunc = options.moveFunc || function() {};
					this.endFunc = options.endFunc || function() {};

					this.Move = jt.bindAsEventListener(this, this.move);
					this.Stop = jt.bindAsEventListener(this, this.stop);
					//this.drag.style.cursor = 'move';
					jt.addEvent(this.drag, jt.bindAsEventListener(this, this.start), 'mousedown');
				},

				start: function(E) {
					this.x = E.clientX - this.drag.offsetLeft;
					this.y = E.clientY - this.drag.offsetTop;
					jt.addEvent(document, this.Move, 'mousemove');
					jt.addEvent(document, this.Stop, 'mouseup');
					this.startFunc.call(this, E, this.container);
					if (jt.isIE) {
						jt.addEvent(this.drag, this.Stop, 'losecapture');
						this.drag.setCapture();
						E.cancelBubble = true;
					} else {
						jt.addEvent(window, this.Stop, 'blur');
						E.preventDefault();
					}
				},

				move: function(E) {
					window.getSelection ? window.getSelection().removeAllRanges(): document.selection.empty();
					this.moveFunc.call(this,E, this.drag, this.container);
					var tempLeft = E.clientX - this.x,
						tempTop = E.clientY - this.y;
					if (tempLeft % this.acceleration == 0) {
						var left = Math.min(Math.max(tempLeft,this.Min.left),this.Max.left);
						if (!this.restrictX) {
							this.drag.style.left = left + 'px';
						}
					}
					if (tempTop % this.acceleration == 0) {
						var top = Math.min(Math.max(tempTop, this.Min.top),this.Max.top);
						if (!this.restrictY) {
							this.drag.style.top = top + 'px';
						}
					}
				},

				stop: function(E) {
					jt.removeEvent(document, this.Move, 'mousemove');
					jt.removeEvent(document, this.Stop, 'mouseup');
					this.endFunc.call(this, E, this.container);
					if (jt.isIE) {
						jt.removeEvent(this.drag, this.Stop, 'losecapture');
						this.drag.releaseCapture();
						E.cancelBubble = true;
					} else {
						jt.removeEvent(window, this.Stop, 'blur');
					}
				}
			};

			// 模拟滚动条 - 参考了cloudgamer  Slider 滑动条效果
			function Slider(options) {
				this.init(options);
			}
			Slider.prototype = {
				constructor: Slider,
				init: function(options) {
					/*options = jt.extend({
						scrlbar: '',
						scrlbarBtn: '',
						prevBtn: '',
						nextBtn: '',
						panel: '',
						content: '',
						direction: 'top',
						acceleration: 5,
						sliderAcc: 1
					}, options || {});*/

					options = options || {};

					this.gallery = (typeof options.gallery === 'string') ? $(options.gallery) : options.gallery;
					this.scrlbar = (typeof options.scrlbar === 'string') ? this.gallery.find(options.scrlbar)[0] : options.scrlbar;
					this.scrlbarBtn = (typeof options.scrlbarBtn === 'string') ? this.gallery.find(options.scrlbarBtn)[0] : options.scrlbarBtn;
					if (options.prevBtn) {
						this.prevBtn = (typeof options.prevBtn === 'string') ? this.gallery.find(options.prevBtn)[0] : options.prevBtn;
						this.nextBtn = (typeof options.nextBtn === 'string') ? this.gallery.find(options.nextBtn)[0] : options.nextBtn;
					}
					this.direction = options.direction;
					if (options.content) {
						this.content = (typeof options.content === 'string') ? this.gallery.find(options.content)[0] : options.content;
						this.panel = (typeof options.panel === 'string') ? this.gallery.find(options.panel)[0] : options.panel;
						this.maxSize = {
							'left': this.panel.scrollWidth - this.content.clientWidth,
							'top': this.panel.scrollHeight - this.content.clientHeight
						};
					}
					this.acceleration = options.acceleration;
					this.sliderAcc = options.sliderAcc;
					this.Max = {
						top: this.scrlbar.clientHeight - this.scrlbarBtn.offsetHeight,
						left: this.scrlbar.clientWidth - this.scrlbarBtn.offsetWidth
					};
					this.Min = {
						top: 0,
						left: 0
					};
					this.timer = null;
					this.dec = -1;
					this.isScroll = false;
					this.isDragAble = false;
					this.addEvent();
				},

				addEvent: function() {
					var self = this,
						isFireFox = navigator.userAgent.indexOf('Firefox') >= 0;

					self.fixedBug();

					if (self.prevBtn) {
						jt.addEvent(self.prevBtn, function() {
							self.goToward('up', self);
						}, 'mousedown');
						jt.addEvent(self.prevBtn, function() {
							clearTimeout(self.timer);
						}, 'mouseup');
						jt.addEvent(self.nextBtn, function() {
							self.goToward('down', self);
						}, 'mousedown');
						jt.addEvent(self.nextBtn, function() {
							clearTimeout(self.timer);
						}, 'mouseup');
					}

					jt.addEvent(self.scrlbar, function(event) {
						self.isDragAble || self.mouseClick(event, self);
						//alert(this.panel.style.left);
					}, 'click');

					jt.addEvent(self.scrlbar, function(event) {
						self.scrollFunc(event, self);
					}, isFireFox ? 'DOMMouseScroll' : 'mousewheel');

					jt.addEvent(self.scrlbar, function(event) {
						self.keydown(event, self);
					}, 'keydown');

					new jt.Drag(self.scrlbar, self.scrlbarBtn, {
						startFunc: function(E, $obj) {
							self.isDragAble = true;
						},

						restrict: true,
						restrictX: self.direction == 'top' ? true : false,
						restrictY: self.direction == 'top' ? false : true,
						moveFunc: function(E, scrlbarBtn, scrlbar) {
							if (self.content) {
								self.callback(parseInt(jt.getStyle(scrlbarBtn, self.direction)), self.Max[self.direction]);
							}
						},

						endFunc: function(E) {
							setTimeout(function() {
								self.isDragAble = false;
							}, 10);
						},
						acceleration: self.sliderAcc
					});
				},

				run: function(self) {
					var self = self || this,
						style = self.scrlbarBtn.style;

					if (self.timer) {
						clearTimeout(self.timer);
					}

					var acc = self.dec > 0 ? self.acceleration : -self.acceleration;
					var posUp = Math.min(Math.max(parseInt(jt.getStyle(self.scrlbarBtn, self.direction)) + acc, self.Min[self.direction]), self.Max[self.direction]);

					if (self.content) {
						self.callback(posUp, self.Max[self.direction]);
					}

					style[self.direction] = posUp + 'px';
					if (!self.isScroll) {
						var arg = arguments.callee;
						self.timer = setTimeout(function() {
							arg.call(self);
						}, 10);
					}
				},

				callback: function(distance) {
					this.content[this.direction == 'top' ? 'scrollTop' : 'scrollLeft'] = (distance / this.Max[this.direction]) * this.maxSize[this.direction];
					this.fix(distance);
				},

				fix: function(distance) {
					if (distance >= this.Max[this.direction]) {
						this.content[this.direction == 'top' ? 'scrollTop' : 'scrollLeft'] = this.maxSize[this.direction];
					}
				},

				goToward: function (direction, self) {
					self.isScroll = false;
					if (direction == 'down') {
						self.dec = 10;
						self.run(self);
					} else {
						self.dec = -10;
						self.run(self);
					}
				},

				mouseClick: function(event, self) {
					var pos = jt.getPos(event),
						offset = jt.getS(self.scrlbarBtn),
						dis = pos[self.direction == 'top' ? 'pageY' : 'pageX'] - offset[self.direction],
						top = parseInt(jt.getStyle(self.scrlbarBtn, self.direction)),
						lockTop = Math.min(Math.max(Math.ceil(dis) + top - self.scrlbarBtn[self.direction == 'top' ? 'offsetHeight' : 'offsetWidth'] / 2, self.Min[self.direction]), self.Max[self.direction]);
					self.scrlbarBtn.style[self.direction] = lockTop + 'px';
					if (self.content) {
						self.callback(parseInt(jt.getStyle(self.scrlbarBtn, self.direction)), self.Max[self.direction]);
					}
					jt.preventDefault(event);
				},

				scrollFunc: function scrollFunc(event, self) {
					self.dec = jt.getDetail(event);
					self.isScroll = true;
					self.run();
					jt.preventDefault(event);
				},

				keydown: function scrollFunc1(event, self) {
					var which = jt.getWhich(event);
					if (which === 38) {
						self.dec = -10;
					}
					if (which === 40) {
						self.dec = 10;
					}
					self.isScroll = true;
					self.run();
					jt.preventDefault(event);
				},

				fixedBug: function() {
					var self = this;
					this.scrlbar.tabIndex = -1;
					jt.isIE || (this.scrlbar.style.outline = 'none');
					if (!jt.isIE) {
						jt.addEvent(this.scrlbar, function() {
							self.scrlbar.focus();
						}, 'mouseover');
						jt.addEvent(this.scrlbar, function() {
							self.scrlbar.blur();
						}, 'mouseout');
					}
				}
			};

			// 初始化滚动条
			slider = new Slider(options);
			intervalS = Math.ceil(slider.Max.left / len);

			/*function removeClass(class_name){
				jt.each(thumb_item, function(o, i){
					o.className = '';
				});
			}*/

			function play(i, thumb_item_cur) {
				var $thumb_item_cur = $(thumb_item_cur),
					$thumb_img = $thumb_item_cur.find('.thumb'),
					photo_src = $thumb_img.attr('data-src'),
					photo_title = $thumb_img.attr('data-title'),
					_distance = 0;

				index = i;
				if (i > 2) {
					slider.content.scrollLeft = intervalD * (i - 2);
				}else{
					slider.content.scrollLeft = 0;
				}
				_distance = intervalS * i;
				if (i === len - 1) {
					_distance = intervalS * (i + 1);
				}

				slider.scrlbarBtn.style.left = Math.min(Math.max(_distance , 0), slider.Max.left) + 'px'
				$thumb_item.removeClass('cur');
				$thumb_item_cur.addClass('cur');

				// 图片切换动画
				/*$photo.fadeOut(0, function() {
					$photo.attr('src', photo_src);
					//alert(photo_src);
					//if (!isIE) $photo_loading.show(); //IE7中有问题
					$photo_loading.show();
					//if (jt.isIE) $photo_loading.hide();
				}).load(function() {
					$photo_loading.hide();
					$photo.fadeIn(0);
				});*/
				if (!jt.isIE) {
					$photo.fadeOut(100, function() {
						$photo.attr('src', photo_src);
						//$photo_loading.show();
					}).load(function() {
						//$photo_loading.hide();
						$photo.fadeIn(300);
					});
				} else {
					$photo.attr('src', photo_src);
					/*if (!window.XMLHttpRequest) { // 设置图片在 IE6 中的宽度和高度
						var img = new Image();
						img.src = photo_src;
						if (img.width > img.height) {
							$photo.width(560);
							$photo.css('height', 'auto');
							$photo.attr('src', photo_src);
						} else {
							$photo.height(560);
							$photo.css('width', 'auto');
							$photo.attr('src', photo_src);
						}
					} else {
						$photo.attr('src', photo_src);
					}*/
				}

				$viewOriginal.attr('href', photo_src);
				$photo_title.html(photo_title);
				$photo_index.text(i + 1);
			}

			// todo
			/*play(0, thumb_item[0]);
			jt.each(thumb_item, function(o, i){
				//console.log(index);
				jt.addEvent(o, function(){
					play(i, o);
				},'click');
			});*/

			$thumb_item.click(function() {
				if (!$(this).hasClass('cur')) {
					play($(this).index(), this);
				}

				$('.mygallery-allpic').hide();
				$picView.show().next().show();
				return false;
			}).eq(0).trigger('click');

			// 查看全部图片
			$viewAllBtn.click(function() {
				var $allPicBox = $('.mygallery-allpic');
				if ($allPicBox.length) {
					if ($allPicBox.is(':visible')) {
						$thumb_item.filter('.cur').click();
					} else {
						$allPicBox.show();
						$picView.hide().next().hide();
					}
					return false;
				}

				// 取出全部缩略图
				var allPicHtml = [
					'<div class="mygallery-allpic">',
						'<ul class="mygallery-piclist fn-clear">',
							$thumb_item.find('img').map(function(i) {
								return '<li class="mygallery-piclist-item"><a href="#"><img src="' + this.src + '" /></a></li>';
							}).get().join(''),
						'</ul>',
						'<div class="mygallery-pager"></div>',
					'</div>'
				].join('');
				//seajs.log(allPicHtml);

				$picView.before(allPicHtml).hide().next().hide();

				var $allPicHtml = $('.mygallery-allpic'),
					$piclist = $allPicHtml.find('.mygallery-piclist'),
					$pager = $allPicHtml.find('.mygallery-pager'),
					$piclistItems = $allPicHtml.find('.mygallery-piclist-item'),
					piclen = $piclistItems.length;

				$piclistItems.click(function() {
					$thumb_item.eq($(this).index()).click();
					return false;
				});

				if (piclen < 26) return false;

				$piclistItems.hide();
				$.getScript(options.path + 'jquery-pagination.js', function() {
					$pager.pagination(piclen, {
						num_edge_entries: 1, // 边缘页数
						num_display_entries: 5, // 主体页数
						prev_text: '上一页',
						next_text: '下一页',
						items_per_page: 25, //每页显示项数
						callback: pageSelectCallback
					});

					function pageSelectCallback(page_index, pager) {
						//seajs.log(pager.className);
						// 从表单获取每页的显示的列表项数目
						var items_per_page = this.items_per_page,
							cur_page_items_index = page_index * items_per_page,
							max_elem = Math.min((page_index + 1) * items_per_page, piclen);
						//seajs.log(this.items_per_page);

						//$piclist.empty();
						$piclistItems.hide()
						//seajs.log($piclist.length);
						// 获取加载元素
						for(var i = cur_page_items_index; i < max_elem; i++) {
							//$piclist.append($piclistItems.eq(i).clone(true));
							$piclistItems.eq(i).css('display', 'table');
						}

						//阻止单击事件
						return false;
					}
				});
				return false;
			});

			//

			jt.addEvent(photo_next, function() {
				index++;
				if (index >= len) {
					index = len - 1;
					$photo_next.find('a').addClass('disabled');
					return;
				} else {
					$photo_next.find('a').removeClass('disabled');
				}
				play(index, thumb_item[index]);
				$photo_next.find('a').attr('href', '#p=' + (index + 1));
				$photo_prev.find('a').attr('href', '#p=' + (index + 1));
			}, 'click');

			jt.addEvent(photo_prev, function() {
				//console.log(index);
				index--;
				if (index < 0 ) {
					index = 0;
					$photo_prev.find('a').addClass('disabled');
					return;
				}else{
					$photo_prev.find('a').removeClass('disabled');
				}
				play(index, thumb_item[index]);
				$photo_next.find('a').attr('href', '#p=' + (index + 1));
				$photo_prev.find('a').attr('href', '#p=' + (index + 1));
			}, 'click');
		});
	};
})(jQuery);