 /*
 * autoslider 一个简洁的图片自动滚动插件
 * Copyright 2012 Steven Wang
 * wangwen1220@gmail.com
 * www.seosteven.com
 *
 * Version 1.1
 * Updated: 2012/6/3
 *
 */
(function($) {
	jQuery.divselect = function(divselectid, inputselectid) {
		var $divselectid = $(divselectid);
		var $inputselect = $(inputselectid);
		var $selected = $divselectid.find('.selected');
		var $options = $divselectid.find('.options');
		$selected.live('click', function() {
			//$options.slideToggle('fast');
			$options.toggle();
			//alert($selected.length);
			return false;
		});
		$options.find('.option').live('click', function() {
			$selected.html($(this).html());
			$inputselect.val($(this).attr('selectid'));
			$options.hide();
			return false;
		});
		return this;
	};
})(jQuery);