/*********************mF_mygallery******************/
myFocus.pattern.extend({
	'mF_mygallery': function(settings, $) {
		var $focus=$(settings),
			$picBox=$focus.find('.pic'),
			$picUl=$picBox.find('ul'),
			$nav = $focus.addHtml('<div class="nav"><a class="prev" href="javascript:;">&#8249;</a><span class="status"></span><a class="next" href="javascript:;">&#8250;</a></div>'),
			$prev = $nav.find('.prev'),
			$next = $nav.find('.next'),
			$status = $nav.find('.status');
			//$prevBtn=$focus.addHtml('<div class="nav prev"><a href="javascript:;">&#8249;</a></div>'),
			//$nextBtn=$focus.addHtml('<div class="nav next"><a href="javascript:;">&#8250;</a></div>');
		$picUl[0].innerHTML+=$picUl[0].innerHTML;//无缝复制
		var $picList=$focus.find('.pic li');

		//CSS
		var w=settings.width,h=settings.height,arrTop=h/2-32,n=$picList.length;
		$picBox[0].style.cssText='width:'+w+'px;height:'+h+'px;';
		$picUl[0].style.width=w*2*n+'px';
		$picUl.find('li').each(function(){this.style.cssText='width:'+w+'px;height:'+h+'px;'});//滑动固定其大小

		//PLAY
		$focus.play(function(i, n){
			//$status[0].innerHTML = i + '/' + n;
		},function(i, n){
			var index = i >= n ? (i-n) : i;
			$status[0].innerHTML = index + 1 + '/' + n;
			$picUl.slide({left:-w*i});
		},settings.seamless);

		//Prev & Next
		$prev.bind('click',function(){$focus.run('-=1')});
		$next.bind('click',function(){$focus.run('+=1')});
	}
});
myFocus.config.extend({'mF_mygallery': {seamless: true}});//支持无缝设置