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


//var _this_script, _skin, _path;
	$.fn.myGallery = function(options) {
		return this.each(function() {
			// 处理参数
			options = $.extend({
				gallery: $(this),
				totlal_num_wrapper: '.total',
				thumb_item: '.mygallery-ctrl-thumb-item',
				photo_prev: '.mygallery-view-prev',
				photo_next: '.mygallery-view-next',

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
			var slider = new Slider(options),
				$this = options.gallery,
				photo_prev = $this.find(options.photo_prev).get(0),
				photo_next = $this.find(options.photo_next).get(0),
				//$thumb = $this.find(options.content),
				thumb_list = $this.find(options.panel).get(0),
				thumb_item = $this.find(options.thumb_item).get(),
				len = thumb_item.length,
				intervalD = Math.ceil(thumb_list.scrollWidth / len),
				intervalS = Math.ceil(slider.Max.left / len),
				photo = jt.get('photo'),
				photoIndex = jt.get('photoIndex'),
				photoDesc = jt.get('photoDesc').getElementsByTagName('p')[0],
				index = 1;

			$mygallery.find(options.totlal_num_wrapper).text(len); // 设置总的图片个数
			$mygallery_ctrl.find('.mygallery-ctrl-thumb-list').width(page_num * 106); // 设置缩略图列表的宽度
			// Opera 不支持动态鼠标指针，为其单独设置前进后退的样式
			if($.browser.opera) $mygallery_view.find('.mygallery-view-prev, .mygallery-view-next').addClass('opera');

			// 当页面加载完，预加载相册大图片
			$(window).load(function() {
				$mygallery_view.find('.thumb').each(function(){
					var img = new Image();
					img.src = this.attr('data-src');
				});
			});

			if(isIE6){// 设置图片在 IE6 中的宽度和高度
				if($(photo).width() > $(photo).height()){
					$(photo).width(560);
					$(photo).css('height', 'auto');
				}else{
					$(photo).height(444);
					$(photo).css('width', 'auto');
				}
			}

			function removeClass(){
				jt.each(thumb_item, function(o, i){
					o.className = '';
				});
			}

			function Go(i, o){
				index = i;
				var _distance = 0;
				if(i > 2){
					slider.content.scrollLeft = intervalD * (i - 2);
				}else{
					slider.content.scrollLeft = 0;
				}
				_distance = intervalS * i;
				if(i === len - 1){
					_distance = intervalS * (i + 1);
				}
				slider.scrlbarBtn.style.left = Math.min(Math.max(_distance , 0),slider.Max.left)  + 'px'
				removeClass();
				o.className = 'hs_list_active';

				var photo_src = o.getElementsByTagName('span')[0].innerHTML;
				$(photo).fadeOut(100, function(){
					photo.src = photo_src;
					if(!ie) $hs_photo_loading.show();//IE7中有问题
				});
				$(photo).load(function(){
					$hs_photo_loading.hide();
					$(photo).fadeIn(500);
				});

				photoDesc.innerHTML = o.getElementsByTagName('p')[0].innerHTML;
				photoIndex.innerHTML = i + 1;
			}

			Go(0, thumb_item[0]);

			jt.each(thumb_item, function(o, i){
				jt.addEvent(o, function(){
					Go(i, o);
				},'click');
			});

			jt.addEvent(photo_next, function(){
				index++;
				if(index >= len){
					index = len - 1;
					$(photo_next).addClass('hs_photo_nav_disabled');
					return;
				}else{
					$(photo_next).removeClass('hs_photo_nav_disabled');
				}
				Go(index, thumb_item[index]);
			},'click');

			jt.addEvent(photo_prev, function(){
				index--;
				if(index < 0 ){
					index = 0;
					$(photo_prev).addClass('hs_photo_nav_disabled');
					return;
				}else{
					$(photo_prev).removeClass('hs_photo_nav_disabled');
				}
				Go(index, thumb_item[index]);
			},'click');








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

				/*get: function(o) {
					return document.getElementById(o);
				},*/

				getPos: function (e) {
					e = e || window.event;
					var x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
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
				};

			// 拖拽组件
			function Drag(container, drag, options) {
				this.init(container, drag, options);
			}
			Drag.prototype = {
				constructor: Drag,
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
					this.drag.style.cursor = 'move';
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
					jt.removeEvent(document,this.Move,'mousemove');
					jt.removeEvent(document,this.Stop,'mouseup');
					this.endFunc.call(this,E, this.container);
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

					this.gallery = (typeof options.gallery === 'string') ? $(options.gallery) : options.gallery;
					this.scrlbar = (typeof options.scrlbar === 'string') ? gallery.find(options.scrlbar)[0];
					this.scrlbarBtn = (typeof options.scrlbarBtn === 'string') ? gallery.find(options.scrlbarBtn)[0];
					if (options.prevBtn) {
						this.prevBtn = (typeof options.prevBtn === 'string') ? gallery.find(options.prevBtn)[0];
						this.nextBtn = (typeof options.nextBtn === 'string') ? gallery.find(options.nextBtn)[0];
					}
					this.direction = options.direction;
					if (options.content) {
						this.content = (typeof options.content === 'string') ? gallery.find(options.content)[0];
						this.panel = (typeof options.panel === 'string') ? gallery.find(options.panel)[0];
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
					}, 'click');

					jt.addEvent(self.scrlbar, function(event) {
						self.scrollFunc(event, self);
					}, isFireFox ? 'DOMMouseScroll' : 'mousewheel');

					jt.addEvent(self.scrlbar, function(event) {
						self.keydown(event, self);
					}, 'keydown');

					new Drag(self.scrlbar, self.scrlbarBtn, {
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
							},10);
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

					var acc = self.dec > 0 ? self.acceleration : - self.acceleration;
					var posUp = Math.min(Math.max(parseInt(jt.getStyle(self.scrlbarBtn, self.direction)) + acc,self.Min[self.direction]),self.Max[self.direction]);

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
						lockTop = Math.min(Math.max(Math.ceil(dis) + top - self.scrlbarBtn[self.direction == 'top' ? 'offsetHeight' : 'offsetWidth'] / 2,self.Min[self.direction]),self.Max[self.direction]);
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
						self.dec = - 10;
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









		});
	};



var mygallery = {};
mygallery.version = '1.0';
mygallery.skin = 'classic';
mygallery.path = '/statics/js/mygallery/';

// 获取 mygallery 路径 ！如果异步加载本文件，请保设置文件路径
_path = mygallery.path || (function(scripts, i, me) {
	for (i in scripts) {
		if (scripts[i].src && scripts[i].src.indexOf('mygallery') !== -1) me = scripts[i];
	}
	if (!me) return '.';
	me = me.src.replace(/\\/g, '/');
	return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/') + 1);
}(document.scripts));;

// 无阻塞载入 CSS (如'jquery.mygallery.js?skin=black')
_skin = mygallery.skin;
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = _path + 'skin/' + _skin + '.css';
//document.head.appendChild(link);
document.getElementsByTagName('head')[0].appendChild(link);

})(jQuery);