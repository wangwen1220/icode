/*========= hs-video ========*/
myFocus.pattern.extend({
	'hs-video':function(settings,$){
		var $focus=$(settings);
		var $picBox=$focus.find('.pic');
		var $picList=$picBox.find('li');
		var $txtList=$focus.addListTxt().find('li');
		var $thumbBox=$focus.addListThumb();
		var $thumbUl=$thumbBox.find('ul');
		var $thumbList=$thumbUl.find('li');
		var $nav = $focus.addHtml('<div class="nav"><a class="prev disabled" href="javascript:;">&#8249;</a><a class="next" href="javascript:;">&#8250;</a></div>'),
			$prevBtn = $nav.find('.prev'),
			$nextBtn = $nav.find('.next');
		//CSS
		var p=settings,showNum=p.thumbShowNum,thuBoxWidth=p.width-p.thumbBtnWidth*2,thuWidth=Math.round(thuBoxWidth/showNum),n=$picList.length;
		$focus[0].style.height=p.height+p.thumbBoxHeight+'px';
		//$thumbBox.css({width:thuBoxWidth,height:p.thumbBoxHeight,left:p.thumbBtnWidth});
		$thumbBox.css({height:p.thumbBoxHeight});
		$thumbUl.css({width:(p.thumbWidth+10)*n});// 10 为thumb 的 margin-right
		$thumbList.each(function(){
			this.style.width=p.thumbWidth+'px';
			this.style.height=p.thumbHeight+'px';
		});
		//$thumbBox.find('img').each(function(){this.style.height=(p.thumbBoxHeight-13*2)+'px';});//10px margin+3px border
		$txtList.each(function(){this.style.bottom=p.thumbBoxHeight+'px'});
		//PLAY
		$focus.play(function(i){
			$picList[i].style.display='none';
			$txtList[i].style.display='none';
			$thumbList[i].className = '';
		},function(i){
			$picList.eq(i).fadeIn();
			$txtList[i].style.display='block';
			$thumbList.scrollTo(i)[i].className = 'current';
		});
		//Control
		p.trigger='mouseover'; //让其仅支持 'mouseover'
		$focus.bindControl($thumbList);
		//Prev & Next
		$prevBtn.bind('click',function(){$focus.run('-=1')});
		$nextBtn.bind('click',function(){$focus.run('+=1')});
	}
});
myFocus.config.extend({
	'hs-video':{//可选个性参数
		thumbShowNum:7,//略缩图显示数目
		thumbBtnWidth:28,//略缩图导航(prev/next)按钮的宽度
		thumbWidth:79,//略缩图总高度
		thumbHeight:52,//略缩图高度(带边框和内边距）
		thumbBoxHeight:55//略缩图总高度
	}
});