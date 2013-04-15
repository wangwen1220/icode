;(function($) {
	$.extend({
		progressBar: new function() {
			this.defaults = {
				steps			: 20,			// 到达目标所采取的步长，设定的值越高，进度越慢
				stepDuration	: 20,			// setInterval的时间参数，单位ms
				max				: 100,			// 最大值
				showText		: true,			// 在进度条旁边用百分数或者分数显示进度与否，默认为true
				textFormat		: 'percentage',	// ShowText的显示形式，“percentage”表示百分数，“fraction”表示分数
				width			: 120,			// 进度条图片的宽度，一般不用改的，除非你不用插件自带的图片，那时您需要计算自己的图的宽度
				height			: 12,			// 进度条图片的高度，一般不用改的，除非你不用插件自带的图片，那时您需要计算自己的图的高度
				callback		: null,			// 回调函数，当进度达到目标值的时候触发的函数，默认没有
				boxImage		: 'images/progressbar.gif',// boxImage : 包着进度条的图片
				barImage		: {
									0:	'images/progressbg_red.gif',
									30: 'images/progressbg_orange.gif',
									50: 'images/progressbg_black.gif',
									70: 'images/progressbg_green.gif',
									90: 'images/progressbg_yellow.gif',
								},//进度条的图片，默认有5个，这个形式的参数主要是为了多彩进度条而设置的
				// 内部参数无须传入
				running_value	: 0,
				value			: 0,
				image			: null
			};

			/* 公共方法 */
			this.construct = function(arg1, arg2) {
				var argvalue	= null;
				var argconfig	= null;

				if (arg1 != null) {
					if (!isNaN(arg1)) {
						argvalue = arg1;
						if (arg2 != null) {
							argconfig = arg2;
						}
					} else {
						argconfig = arg1;
					}
				}

				return this.each(function() {
					var pb		= this;
					var config	= this.config;

					if (argvalue != null && this.bar != null && this.config != null) {
						this.config.value 		= parseInt(argvalue)
						if (argconfig != null)
							pb.config			= $.extend(this.config, argconfig);
						config	= pb.config;
					} else {
						var $this				= $(this);
						var config				= $.extend({}, $.progressBar.defaults, argconfig);
						config.id				= $this.attr('id') ? $this.attr('id') : Math.ceil(Math.random() * 100000);	// random id, if none provided

						if (argvalue == null)
							argvalue	= $this.html().replace("%","")	// 取得百分比

						config.value			= parseInt(argvalue);
						config.running_value	= 0;
						config.image			= getBarImage(config);

						var numeric = ['steps', 'stepDuration', 'max', 'width', 'height', 'running_value', 'value'];
						for (var i=0; i<numeric.length; i++)
							config[numeric[i]] = parseInt(config[numeric[i]]);

						if (config.value > config.max)
							config.value = config.max;
						$this.html("");
						var bar					= document.createElement('img');
						var text				= document.createElement('span');
						var $bar				= $(bar);
						var $text				= $(text);
						pb.bar					= $bar;

						$bar.attr('id', config.id + "_pbImage");
						$text.attr('id', config.id + "_pbText");
						$text.html(getText(config));
						$bar.attr('title', getText(config));
						$bar.attr('alt', getText(config));
						$bar.attr('src', config.boxImage);
						$bar.attr('width', config.width);
						$bar.css("width", config.width + "px");
						$bar.css("height", config.height + "px");
						$bar.css("background-image", "url(" + config.image + ")");
						$bar.css("background-position", ((config.width * -1)) + 'px 50%');
						$bar.css("padding", "0");
						$bar.css("margin", "0");
						$this.append($bar);
						$this.append($text);
					}

					function getPercentage(config) {
						return Math.round(config.running_value * 100 / config.max);
					}

					function getBarImage(config) {
						var image = config.barImage;
						if (typeof(config.barImage) == 'object') {
							for (var i in config.barImage) {
								if (getPercentage(config) >= parseInt(i)) {
									image = config.barImage[i];
								} else { break; }
							}
						}
						return image;
					}

					function getText(config) {
						if (config.showText) {
							if (config.textFormat == 'percentage') {
								return " " + getPercentage(config) + "%";
							} else if (config.textFormat == 'fraction') {
								return " " + config.running_value + '/' + config.max;
							}
						}
					}

					config.increment = Math.round((config.value - config.running_value)/config.steps);
					if (config.increment < 0)
						config.increment *= -1;
					if (config.increment < 1)
						config.increment = 1;

					var t = setInterval(function() {
						var pixels	= config.width / 100;			// Define how many pixels go into 1%

						if (config.running_value > config.value) {
							if (config.running_value - config.increment  < config.value) {
								config.running_value = config.value;
							} else {
								config.running_value -= config.increment;
							}
						}
						else if (config.running_value < config.value) {
							if (config.running_value + config.increment  > config.value) {
								config.running_value = config.value;
							} else {
								config.running_value += config.increment;
							}
						}

						if (config.running_value == config.value)
							clearInterval(t);

						var $bar	= $("#" + config.id + "_pbImage");
						var $text	= $("#" + config.id + "_pbText");
						var image	= getBarImage(config);
						if (image != config.image) {
							$bar.css("background-image", "url(" + image + ")");
							config.image = image;
						}
						$bar.css("background-position", (((config.width * -1)) + (getPercentage(config) * pixels)) + 'px 50%');
						$bar.attr('title', getText(config));
						$text.html(getText(config));

						if (config.callback != null && typeof(config.callback) == 'function')
							config.callback(config);

						pb.config = config;
					}, config.stepDuration);
				});
			};
		}
	});

	$.fn.extend({
        progressBar: $.progressBar.construct
	});

})(jQuery);