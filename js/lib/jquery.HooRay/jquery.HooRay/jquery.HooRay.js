/*
	作者：胡尐睿丶
	联系方式：hooray0905@foxmail.com
*/
(function($){
	/*
		隔行换色 HRghhs
		@DOM
			<table id="table">
				<tr><td>1</td></tr>
				<tr><td>2</td></tr>
				<tr><td>3</td></tr>
				<tr><td>4</td></tr>
			</table>
		@CSS
			.HRghhs-evenRow{background:#F1FAFA}
			.HRghhs-oddRow{background:#0FF}
			.HRghhs-overRow{background:#FFFFE1}
			.HRghhs-checkRow{background:#FFFFCA}
		@Usage
			$("#table").HRghhs(options);
		@options
			evenRowClass		:"HRghhs-evenRow",		//奇数行样式名称
			oddRowClass			:"HRghhs-oddRow",		//偶数行样式名称
			overRowClass		:"HRghhs-overRow",		//经过行样式名称
			checkRowClass		:"HRghhs-checkRow",		//选中行样式名称
			useOver				:true,					//是否开启经过事件
			useClick			:true,					//是否开启单击事件
			useMoreChoose		:false,					//是否开启多选事件
			useClick2Checkbox	:false					//是否绑定点击选中多选按钮事件
	*/
	$.fn.HRghhs = function(options){
		var options = $.extend({}, {
			evenRowClass		:"HRghhs-evenRow",
			oddRowClass			:"HRghhs-oddRow",
			overRowClass		:"HRghhs-overRow",
			checkRowClass		:"HRghhs-checkRow",
			useOver				:true,
			useClick			:true,
			useMoreChoose		:false,
			useClick2Checkbox	:false
		}, options);
		this.each(function(){
			var thisTable=$(this);
			$(thisTable).find("tr").each(function(){
				if($(this).attr("rel") != "readonly"){
					//奇偶行样式
					$(thisTable).find("tr:odd").addClass(options.oddRowClass).end().find("tr:even").addClass(options.evenRowClass);
					//是否开启鼠标经过事件
					if(options.useOver){
						//经过行样式
						$(thisTable).find("tr").bind("mouseover",function(){
							$(this).addClass(options.overRowClass);
						}).bind("mouseout",function(){
							$(this).removeClass(options.overRowClass);
						});
					}
					//是否开启单击事件
					if(options.useClick){
						//是否开启多选事件
						if(options.useMoreChoose){
							//添加选中行样式
							$(thisTable).find("tr").toggle(function(){
								if(options.useClick2Checkbox){
									//触发自定义的updateState事件，此事件为自定义checkbox里的
									$(thisTable).find('input:checkbox').trigger('updateState');
									$(this).find("input:checkbox").attr("checked",true);
								}
								$(this).addClass(options.checkRowClass);
							},function(){
								if(options.useClick2Checkbox){
									$(thisTable).find('input:checkbox').trigger('updateState');
									$(this).find("input:checkbox").attr("checked",false);
								}
								$(this).removeClass(options.checkRowClass);
							});
						}else{
							$(thisTable).find("tr").bind("click",function(){
								if(options.useClick2Checkbox){
									$(thisTable).find('input:checkbox').trigger('updateState');
									$(thisTable).find("input:checkbox").attr("checked",false);
									$(this).find("input:checkbox").attr("checked",true);
								}
								$(thisTable).find("tr").removeClass(options.checkRowClass);
								$(this).addClass(options.checkRowClass);
							});
						}
					}
				}
			});
		});
	};

	/*
		无缝滚动 HRwfgd
		@DOM
			<div id="marquee">
				<ul>
					<li></li>
					<li></li>
				</ul>
			</div>
		@CSS
			#marquee{width:200px;height:50px;overflow:hidden}
		@Usage
			$('#marquee').HRwfgd(options);
		@options
			isEqual			:true,		//所有滚动的元素长宽是否相等,true,false
			loop			:0,			//循环滚动次数，0时无限
			direction		:'left',	//滚动方向，'left','right','up','down'
			scrollAmount	:1,			//步长
			scrollDelay		:20			//时长
	*/
	$.fn.HRwfgd = function(options) {
		var opts = $.extend({},{
			isEqual			:true,
			loop			:0,
			direction		:'left',
			scrollAmount	:1,
			scrollDelay		:20
		}, options);
		this.each(function() {
			var $marquee = $(this);
			var _scrollObj = $marquee.get(0);
			var scrollW = $marquee.width();
			var scrollH = $marquee.height();
			var $element = $marquee.children();
			var $kids = $element.children();
			var scrollSize = 0;
			var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1: 0;
			$element.css(_type ? 'width': 'height', 10000);
			if (opts.isEqual) {
				scrollSize = $kids[_type ? 'outerWidth': 'outerHeight']() * $kids.length
			} else {
				//查询所有父容器，如果是隐藏的，将其显示
				$kids.parents().each(function(){
					if($(this).is(":hidden")){
						$(this).addClass("hr_wfgd").show();
					}
				})
				$kids.each(function() {
					scrollSize += $(this)[_type ? 'outerWidth': 'outerHeight']()
				})
				//计算完毕后，还原父容器到初始状态
				$(document).find(".hr_wfgd").each(function(){
					if($(this).is(":visible")){
						$(this).hide().removeClass("hr_wfgd");
					}
				});
			}
			if (scrollSize < (_type ? scrollW: scrollH)) return;
			$element.append($kids.clone()).css(_type ? 'width': 'height', scrollSize * 2);
			var numMoved = 0;
			function scrollFunc() {
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft': 'scrollTop';
				if (opts.loop > 0) {
					numMoved += opts.scrollAmount;
					if (numMoved > scrollSize * opts.loop) {
						_scrollObj[_dir] = 0;
						return clearInterval(moveId)
					}
				}
				if (opts.direction == 'left' || opts.direction == 'up') {
					_scrollObj[_dir] += opts.scrollAmount;
					if (_scrollObj[_dir] >= scrollSize) {
						_scrollObj[_dir] = 0
					}
				} else {
					_scrollObj[_dir] -= opts.scrollAmount;
					if (_scrollObj[_dir] <= 0) {
						_scrollObj[_dir] = scrollSize
					}
				}
			}
			var moveId = setInterval(scrollFunc, opts.scrollDelay);
			$marquee.hover(function() {
				clearInterval(moveId)
			},
			function() {
				clearInterval(moveId);
				moveId = setInterval(scrollFunc, opts.scrollDelay)
			})
		})
	};
	
	/*
		返回顶部 HRfhdb
		@DOM
			<a href="javascript:void(0)" id="fhdb1">返回顶部</a>
		@Usage
			$('#top').HRfhdb(options, fun);
		@options
			animation	:false,		//是否开启动画效果
			speed		:'normal'	//滚动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
		@fun
			在动画完成后执行的函数
	*/
	$.fn.HRfhdb = function(options, fun){
		var options = $.extend({}, {
			animation	:false,
			speed		:'slow'
		}, options, fun);
		this.each(function(){
			$(this).click(function(){
				if(options.animation == false){
					$.fx.off = true;
				}
				if(fun != null){
					$("html").animate({scrollTop:"0"}, options.speed);
					$("body").animate({scrollTop:"0"}, options.speed, fun);
				}else{
					$("html,body").animate({scrollTop:"0"}, options.speed);
				}
				$.fx.off = false;
			});
		});
	};
	
	/*
		外链弹窗 HRwltc
		@Usage
			$('body').HRwltc(options);
		@options
			classname:''	//给外部连接加上统一样式名
	*/
	$.fn.HRwltc = function(options){
		var options = $.extend({}, {
			classname:''
		}, options);
		this.each(function(){
			if(options.classname != ''){
				$(this).find("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").addClass(options.classname).attr("target","_blank");
			}else{
				$(this).find("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").attr("target","_blank");
			}
		});
	};
		
	/*
		手风琴 HRsfq
		@DOM
			<ul id="HRsfq">
				<li>
					<a>汽车</a>
					<div>...</div>
				</li>
				<li>
					<a>火车</a>
					<div>...</div>
				</li>
				<li>
					<a>飞机</a>
					<div>...</div>
				</li>
			</ul>
		@CSS
			#HRsfq li a{display:block;cursor:pointer;background:#0CF url('open.gif') no-repeat center right}
			#HRsfq li a:hover{background:#7FD2FF url('open.gif') no-repeat center right}
			#HRsfq li.HRsfq-active a{background:#7FD2FF url('close.gif') no-repeat center right;color:#fff}
			#HRsfq li div{width:900px}
		@Usage
			$('#HRsfq').HRsfq(options);
		@Options
			activeClass		:'HRsfq-active',	//手风琴标题选中样式名
			speed			:'normal',			//滚动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
			openRow			:0					//展开第几条，默认为0不展开
	*/
	$.fn.HRsfq = function(options){
		var options = $.extend({}, {
			activeClass		:'HRsfq-active',
			speed			:'normal',
			openRow			:0
		}, options);
		this.each(function() {
			var $ul = $(this);
			$ul.children('li').each(function(){
				$(this).children('div').hide();
				$(this).children('a').click(function(e){
					$(this).parent('li').toggleClass(options.activeClass).siblings().removeClass(options.activeClass).children('div').slideUp(options.speed);
					$(this).siblings().slideToggle(options.speed);
				});
			});
			if(options.openRow >= 0){
				$ul.children('li:nth-child('+options.openRow+')').addClass(options.activeClass).children('div').show();
			}
		});
	};
	
	/*
		Tabs切换 HRtabs
		@DOM
			<div class="HRtabs">
				<ul>
					<li><a href="#tabs1">tabs1</a></li>
					<li><a href="#tabs2">tabs2</a></li>
					<li><a href="#tabs3">tabs3</a></li>
				</ul>
				<div id="tabs1">111</div>
				<div id="tabs2">222</div>
				<div id="tabs3">333</div>
			</div>
		@CSS
			#HRsfq li a.HRtabs-active{background:#7FD2FF;color:#fff}
		@Usage
			$('.HRtabs').HRtabs(options);
		@Options
			activeClass		:'HRsfq-active',	//tabs标题选中样式名
			showDiv			:'',				//显示哪个div，默认为空，显示第一个
			overOrClick		:'click',			//触发事件，可以有click、mouseover、dbclick
			animation		:false,				//是否开启动画效果
			speed			:'normal'			//渐隐渐现速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
	*/
	$.fn.HRtabs = function(options){
		var options = $.extend({}, {
			activeClass		:'HRtabs-active',
			showDiv			:'',
			overOrClick		:'click',
			animation		:false,
			speed			:'normal'
		}, options);
		var box = $(this);
		$(this).each(function(){
			$(box).find("div").hide();
			if(options.showDiv == ""){
				$(box).find('ul li:eq(0) a').addClass(options.activeClass);
				$(box).find('div:eq(0)').show();
			}else{
				$(box).find('ul li').each(function(){
					if($(this).find("a").attr("href") == "#"+options.showDiv){
						$(this).find("a").addClass(options.activeClass);
					}
				});
				$(box).find("#"+options.showDiv).show();
			}
			$(box).find("a").bind(options.overOrClick,function(){
				if(!$(this).hasClass(options.activeClass)){
					$(box).find("ul li a").removeClass(options.activeClass);
					$(this).addClass(options.activeClass);
					if(options.animation){
						$(box).find("div").fadeOut(options.speed);
						$(box).find($(this).attr("href")).fadeIn(options.speed);
					}else{
						$(box).find("div").hide();
						$(box).find($(this).attr("href")).show();
					}
				}
				return false;
			});
		});
	};
	
	/*
		锚点连接 HRmdlj
		@DOM
			<a href="#mdlj">锚点连接</a>
			...
			...
			<div id="mdlj"></div>
		@Usage
			$('a').HRmdlj(options);
		@options
			speed:'normal'			//滑动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
	*/
	$.fn.HRmdlj = function(options){
		var options = $.extend({}, {
			speed:'normal'
		}, options);
		this.each(function(){
			$(this).click(function() {
				var target = $(this).attr('href');
				var destination = $(target).offset().top;
				$('html,body').animate({scrollTop : destination}, options.speed);
				return false;			   
			});
		});
	};
		
	/*
		多选按钮 HRcheckbox
		@DOM
			<link rel="stylesheet" rev="stylesheet" href="jquery.HooRay/jquery.HooRay.css" />
			<div>
				<input type="checkbox" name="city" value="1" id="city_1" /><label for="city_1">北京</label>
				<input type="checkbox" name="city" value="2" id="city_2" /><label for="city_2">上海</label>
				<input type="checkbox" name="city" value="3" id="city_3" /><label for="city_3">杭州</label>
			</div>
		@Usage
			$('div').HRcheckbox(options);
		@options
			skin:1			//皮肤选择
	*/
	$.fn.HRcheckbox = function(options){
		var options = $.extend({}, {
			skin:1
		}, options);
		this.find('input:checkbox').each(function(){
			var input = $(this);
			var label = $('label[for="'+input.attr('id')+'"]');
			var inputType = 'checkbox';
			$('<div class="hr-'+ inputType + options.skin + '"></div>').insertBefore(input).append(input, label);
			var allInputs = $('input[name="'+input.attr('name')+'"]');
			label.hover(function(){
				if(input.is(':checked')){
					$(this).addClass('checkedHover');
				}else{
					$(this).addClass('hover');
				}
			},function(){
				$(this).removeClass('hover checkedHover');
			});
			input.bind('updateState',function(){
				if(input.is(':checked')){
					label.addClass('checked');
				}else{
					label.removeClass('checked checkedHover');
				}
			}).trigger('updateState').click(function(){
				$(this).trigger('updateState');
			});
		});
	};
	
	/*
		单选按钮 HRradio
		@DOM
			<link rel="stylesheet" rev="stylesheet" href="jquery.HooRay/jquery.HooRay.css" />
			<div>
				<input type="radio" name="sex" id="sex_1" value="1" /><label for="sex_1">男</label>
				<input type="radio" name="sex" id="sex_2" value="2" /><label for="sex_2">女</label>
			</div>
		@Usage
			$('div').HRradio(options);
		@options
			skin:1			//皮肤选择
	*/
	$.fn.HRradio = function(options){
		var options = $.extend({}, {
			skin:1
		}, options);
		this.find('input:radio').each(function(){	
			if($(this).is('[type=radio]')){
				var input = $(this);
				var label = $('label[for="'+input.attr('id')+'"]');
				var inputType = 'radio';
				$('<div class="hr-'+ inputType + options.skin + '"></div>').insertBefore(input).append(input, label);
				var allInputs = $('input[name="'+input.attr('name')+'"]');
				label.hover(function(){ 
					$(this).addClass('hover'); 
				},function(){
					$(this).removeClass('hover checkedHover');
				});
				input.bind('updateState', function(){
					if(input.is(':checked')){
						allInputs.each(function(){
							$('label[for="'+$(this).attr('id')+'"]').removeClass('checked');
						});		
						label.addClass('checked');
					}else{
						label.removeClass('checked checkedHover');
					}
				}).trigger('updateState').click(function(){ 
					$(this).trigger('updateState');
				});
			}
		});
	};
	
	/*
		控制多选按钮选择数量 HRchecknum
		@CSS
			label.disabled{color:#CCC}
		@DOM
			<div>
				<input type="checkbox" name="city" value="1" id="city_1" /><label for="city_1">北京</label>
				<input type="checkbox" name="city" value="2" id="city_2" /><label for="city_2">上海</label>
				<input type="checkbox" name="city" value="3" id="city_3" /><label for="city_3">杭州</label>
			</div>
		@Usage
			$('div').HRchecknum(options);
		@options
			maxnum:1		//最多能选择几个
	*/
	$.fn.HRchecknum = function(options){
		var options = $.extend({}, {
			maxnum:1
		}, options);
		var box = this;
		var cb = this.find('input:checkbox');
		cb.each(function(){
			$(this).bind('click', function(){
				if($(this).is(':checked')){
					if(cb.filter(':checked').length >= options.maxnum){
						cb.not(':checked').each(function(){
							$(this).attr('disabled','true');
							var thisid = $(this).attr('id');
							$('label[for="'+thisid+'"]').addClass('disabled');
						});
					}
				}else{
					cb.removeAttr('disabled');
					box.find('label.disabled').removeClass('disabled');
				}
			});
		});
	};
	
	/*
		下拉列表 HRxllb
		@DOM
			<div class="HRxllb">
				选择你的语言：
				<select name="language1" id="language1">
					<option value="0">青菜</option>
					<option value="1" selected="selected">菠菜</option>
					<option value="2">花菜</option>
				</select>
			</div>
		@Usage
			$('.HRxllb').HRxllb(options);
		@options
			skin			:1,				//皮肤选择
			color			:'#79A2BD',		//字体默认颜色
			hoverColor		:'#fff',		//鼠标经过颜色
			selectedColor	:'#fff',		//选中颜色
			disabledColor	:'#ccc'			//禁用颜色
			optionsHeight	:''				//显示options的总高度
			reload			:false			//是否重新载入下拉列表
	*/
	$.fn.HRxllb = function(options){
		var options = $.extend({}, {
			skin			:1,
			color			:'#79A2BD',
			hoverColor		:'#fff',
			selectedColor	:'#fff',
			disabledColor	:'#ccc',
			optionsHeight	:'',
			reload			:false
		}, options);
		var box = $(this);
		$(function(){
			//样式名前缀，用来区分皮肤
			var classPrefix = "hr-xllb"+options.skin+"-";
			//id前缀，用来区分每一个下拉列表
			var idPrefix = "hr-xllb-"+$(box).find("select").attr("id")+"-";
			var selectId = $(box).find("select").attr("id");
			var optionsHeight = 0;
			
			if(options.reload){
				//IE6下可能会出现的BUG，解决办法就是在reload前把select强制show()，再hide()
				$(box).find("select").show().hide().nextAll().remove();
				$(box).append("<div class='"+classPrefix+"select "+idPrefix+"select' style='color:"+options.color+"'>"+$(box).find("select option:selected").html()+"</div>");
				if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
					$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;width:175px'></div>");
				}else{
					$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;position:absolute;z-index:1000;display:none;width:175px;height:"+options.optionsHeight+"px;overflow-x:hidden;overflow-y:scroll'></div>");
				}
				$("."+idPrefix+"div").append("<ul class='"+classPrefix+"options "+idPrefix+"options'></ul>");
				$("."+idPrefix+"options").append("<div class='"+classPrefix+"top' style='color:"+options.disabledColor+"'></div>");
				$(box).find("select#"+selectId).children().each(function(){
					//判断当前html元素是否是optgroup
					if($(this).context.nodeName == "OPTGROUP"){
						if($(this).attr('disabled') == "disabled"){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.disabledColor+"'>"+$(this).attr('label')+"</li>");
							$(this).children().each(function(){
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							});
						}else{
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.color+"'>"+$(this).attr('label')+"</li>");
							$(this).children().each(function(){
								if($(this).attr('disabled') == "disabled"){
									if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
										$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
									}else{
										$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
									}
								}else{
									if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
										$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
									}else{
										$("."+idPrefix+"options").append("<li class='open' style='padding-left:30px;width:120px;color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
									}
								}
							});
						}
					}else{
						if($(this).attr('disabled')){
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}else{
								$("."+idPrefix+"options").append("<li class='open disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}
						}else{
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}else{
								$("."+idPrefix+"options").append("<li class='open' style='color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}
						}
					}
				});
				$("."+idPrefix+"options").append("<div class='"+classPrefix+"bottom' style='color:"+options.disabledColor+"'></div>");
			}else{
				//隐藏select元素
				$(box).find("select").hide();
				//开始创建模拟select需要的元素
				$(box).append("<div class='"+classPrefix+"select "+idPrefix+"select' style='color:"+options.color+"'>"+$(box).find("select option:selected").html()+"</div>");
				if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
					$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;width:175px'></div>");
				}else{
					$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;position:absolute;z-index:1000;display:none;width:175px;height:"+options.optionsHeight+"px;overflow-x:hidden;overflow-y:scroll'></div>");
				}
				$("."+idPrefix+"div").append("<ul class='"+classPrefix+"options "+idPrefix+"options'></ul>");
				$("."+idPrefix+"options").append("<div class='"+classPrefix+"top' style='color:"+options.disabledColor+"'></div>");
				$(box).find("select#"+selectId).children().each(function(){
					//判断当前html元素是否是optgroup
					if($(this).context.nodeName == "OPTGROUP"){
						if($(this).attr('disabled') == "disabled"){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.disabledColor+"'>"+$(this).attr('label')+"</li>");
							$(this).children().each(function(){
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							});
						}else{
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.color+"'>"+$(this).attr('label')+"</li>");
							$(this).children().each(function(){
								if($(this).attr('disabled') == "disabled"){
									if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
										$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
									}else{
										$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
									}
								}else{
									if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
										$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
									}else{
										$("."+idPrefix+"options").append("<li class='open' style='padding-left:30px;width:120px;color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
									}
								}
							});
						}
					}else{
						if($(this).attr('disabled')){
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}else{
								$("."+idPrefix+"options").append("<li class='open disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}
						}else{
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}else{
								$("."+idPrefix+"options").append("<li class='open' style='color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
							}
						}
					}
				});
				$("."+idPrefix+"options").append("<div class='"+classPrefix+"bottom' style='color:"+options.disabledColor+"'></div>");
				//结束创建
				//判断select是否可用
				if(!$(box).find("select").attr('disabled')){
					$("."+idPrefix+"select").live('mouseover',function(){
						$(this).addClass(classPrefix+"select-hover");
					}).live('mouseout',function(){
						$(this).removeClass(classPrefix+"select-hover");
					});
					//绑定点击下拉列表事件
					$("body").live('click',function(e){
						var clickme = $(e.target);
						//判断用户鼠标点击区域，模拟鼠标移出select点击隐藏options
						if(!clickme.hasClass(idPrefix+"select")){
							$("."+idPrefix+"div").hide();
							$(box).find("."+idPrefix+"select").removeClass(classPrefix+"select-open");
							$(box).find("."+idPrefix+"options").hide();
						}else{
							//判断当前元素在屏幕整体的上方还是下方，自动判断显示区域
							var marginTop = $(box).offset().top-$(window).scrollTop();
							var marginBottom = $(window).height()-($(box).offset().top-$(window).scrollTop())-24;
							if(marginTop > marginBottom){
								//实时获取options的高度，防止执行reload方法后，options的高度不更新
								if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
									optionsHeight = $(box).find("select option,select optgroup").length*24+10;
								}else{
									optionsHeight = options.optionsHeight;
								}
								$("."+idPrefix+"div").css("margin-top","-"+(optionsHeight+24)+"px");
							}else{
								$("."+idPrefix+"div").css("margin-top","0");
							}
							//切换options的隐藏/显示
							if($(box).find("."+idPrefix+"options").css("display") == "block"){
								$(box).find("."+idPrefix+"select").removeClass(classPrefix+"select-open");
								$(box).find("."+idPrefix+"options").hide();
								$("."+idPrefix+"div").hide();
							}else{
								$(box).find("."+idPrefix+"select").addClass(classPrefix+"select-open");
								$(box).find("."+idPrefix+"options").show();
								$("."+idPrefix+"div").show();
							}
						}
					});
					//options的鼠标移入、移出、点击事件
					$(box).find("."+idPrefix+"options li:not(.disabled)").live('mouseover',function(){
						$(this).addClass(classPrefix+"open-hover");
						$(this).css({color:options.hoverColor});
					}).live('mouseout',function(){
						$(this).removeClass(classPrefix+"open-hover");
						if($(this).attr("class") == "open"){
							$(this).css({color:options.color});
						}else{
							$(this).css({color:options.selectedColor});
						}
					}).live('click',function(){
						//移除options的选中样式
						$("."+idPrefix+"options").find("li").not($("."+idPrefix+"options").find("li."+classPrefix+"open-optgroup")).removeClass(classPrefix+"open-selected").addClass("open").css({color:options.color});
						$("."+idPrefix+"options").find("li.disabled").not($("."+idPrefix+"options").find("li."+classPrefix+"open-optgroup")).css({color:options.disabledColor});
						//添加当前点击的options为选中样式
						$(this).addClass(classPrefix+"open-selected");
						//修改真实select里选中的options
						$(box).find("select option").val($(box).find("."+classPrefix+"options li."+classPrefix+"open-selected div").html());
						//隐藏options并修改显示为选中的options
						$("."+idPrefix+"select").removeClass(classPrefix+"select-open").addClass(classPrefix+"select");
						$("."+idPrefix+"select").html($(this).html());
						$("."+idPrefix+"options").hide();
					});
					$(box).find("."+idPrefix+"options li.disabled").live('click',function(){
						return false;
					});
				}else{
					$("."+idPrefix+"select").css({color:options.disabledColor});
				}
			}
		});
	};
	
	/*
		图片缩放 HRtpsf
		@CSS
			div{width:250px;height:150px;line-height:150px;overflow:hidden}
			div img{float:left}
		@DOM
			<div>
				<img src="MammaMia.jpg" />
			</div>
		@Usage
			$('div').HRtpsf(options);
		@options
			maxWidth	:100,	//最大宽度，和外层div同宽
			maxHeight	:100	//最大高度，和外层div同高
	*/
	$.fn.HRtpsf = function(options){
		var options = $.extend({}, {
			maxWidth	:100,
			maxHeight	:100
		}, options);
		this.each(function(){
			var img = $(this).find('img');
			var imgWidth = $(img).attr("width");
			var imgHeight = $(img).attr("height");
			if(imgWidth > options.maxWidth || imgHeight > options.maxHeight){
				if(imgWidth/imgHeight > options.maxWidth/options.maxHeight){
					$(img).attr("width",options.maxWidth);
					var realHeight = options.maxWidth/imgWidth*imgHeight;
					$(img).css("margin-top",parseInt((options.maxHeight-realHeight)/2));
				}else{
					$(img).attr("height",options.maxHeight);
					var realWidth = options.maxHeight/imgHeight*imgWidth;
					$(img).css("margin-left",parseInt((options.maxWidth-realWidth)/2));
				}
			}else{
				$(img).css("margin-top",parseInt((options.maxHeight-imgHeight)/2));
				$(img).css("margin-left",parseInt((options.maxWidth-imgWidth)/2));
			}
		});
	};
	
	/*
		高亮显示 HRglxs
		@DOM
			<div class="HRtpzs1">
				<img src="diqiu.jpg" />
				<p>超级玛丽</p>
			</DIV>
		@Usage
			$('.banner').HRglxs(options);
		@options
			opacity		:0.5,		//透明度，0~1
			bgcolor		:'#fff',	//遮罩层背景色
			speed		:'normal'	//滑动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
	*/
	$.fn.HRglxs = function(options){
		var options = $.extend({}, {
			opacity		:0.5,
			bgcolor		:'#fff',
			speed		:'normal'
		}, options);
		this.each(function(){
			var box = $(this);
			$(box).bind("mouseover",function(){
				if(isMouseLeaveOrEnter(getEvent(),this)){
					$(this).click(function(){
						if(!$("div").hasClass("HRglxs-bg")){
							$(box).addClass("hr-glxs");
							if($.browser.msie && $.browser.version == "6.0"){
								//ie6无法遮住select，则只能将其隐藏
								$("select:visible").addClass("hr-glxs-select-hidden");
								//ie6不支持position:fixed
								$("body").append("<div class='HRglxs-bg' style='position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:0;width:100%;height:"+$(window).height()+"px;display:none;z-index:9998;background-color:"+options.bgcolor+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+options.opacity*100+");opacity:"+options.opacity+";'></div>");
							}else{
								$("body").append("<div class='HRglxs-bg' style='position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:9998;background-color:"+options.bgcolor+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+options.opacity*100+");opacity:"+options.opacity+";'></div>");
							}
							$(".HRglxs-bg").fadeIn(options.speed);
						}
					});
				}
			}).bind("mouseout",function(){
				if(isMouseLeaveOrEnter(getEvent(),this)){
					$(".HRglxs-bg").click(function(){
						if($("div").hasClass("HRglxs-bg")){
							$("select").removeClass("hr-glxs-select-hidden");
							$(".HRglxs-bg").fadeOut(options.speed,function(){
								$(box).removeClass("hr-glxs");
								$(".HRglxs-bg").remove();
							});
						}
					});
				}
			});
		});
	};
		
	/*
		输入框提示 HRinputtip
		@CSS
			.hr-inputtip{color:#999}
		@DOM
			<input type="text" name="search" class="search" />
		@Usage
			$('.search').HRinputtip(options);
		@options
			tipId		:'',	//显示提示信息的id
			maxLength	:0,		//最大长度
			maxTipId	:'',	//提示模块id
			maxTipText	:'',	//正常提示信息
			maxTipError	:'',	//错误提示信息
			pwdTipId	:''		//提示模块id
	*/
	$.fn.HRinputtip = function(options){
		var options = $.extend({}, {
			tipId		:'',
			maxLength	:0,
			maxTipId	:'',
			maxTipText	:'',
			maxTipError	:'',
			pwdTipId	:''
		}, options);
		this.each(function(){
			var input = $(this);
			if(options.tipId != ""){
				$(input).focusin(function(){
					$('#'+options.tipId).hide();
				}).focusout(function(){
					if($(input).val() == ""){
						$('#'+options.tipId).show();
					}
				});
				$('#'+options.tipId).click(function(){
					$(this).hide();
					$(input).focus();
				});
			}
			if(options.maxLength > 0){
				$("#"+options.maxTipId).hide();
				$(this).focusin(function(){
					showTip($(this));
					$("#"+options.maxTipId).fadeIn();
				}).focusout(function(){
					$("#"+options.maxTipId).fadeOut();
				}).keyup(function(){
					showTip($(this));
				}).bind("text",function(){
					showTip($(this));
				});
				//提示框显示
				function showTip(obj){
					if(options.maxLength - getLen(obj) >= 0){
						$("#"+options.maxTipId).html(options.maxTipText.replace(/\%t/g, (options.maxLength - getLen(obj))));
					}else{
						$("#"+options.maxTipId).html(options.maxTipError.replace(/\%t/g, (options.maxLength - getLen(obj))));
					}
				}
				//获取输入框内容长度(中文为2个)
				function getLen(obj){
					return obj.val().replace(/[^\x00-\xff]/g,'xx').length;
				}
			}
			if(options.pwdTipId != ""){
				$("#"+options.pwdTipId).hide();
				$(this).focusin(function(){
					pwdTip($(this));
					$("#"+options.pwdTipId).fadeIn();
				}).focusout(function(){
					$("#"+options.pwdTipId).fadeOut();
				}).keyup(function(){
					pwdTip($(this));
				}).bind("text",function(){
					pwdTip($(this));
				});
				//提示框显示
				function pwdTip(obj){
					$("#"+options.pwdTipId).html( evaluatePswd(obj.val()) );
				}
				function evaluatePswd(word){
					var arr=new Array('低','中','高','强');
					if(word==""){
						var grd=0;
					}else if(word.length<7){
						var grd=1;
					}else{
						var grd=word.match(/[a-z](?![^a-z]*[a-z])|[A-Z](?![^A-Z]*[A-Z])|\d(?![^\d]*\d)|[^a-zA-Z\d](?![a-zA-Z\d]*[^a-zA-Z\d])/g).length;
					}
					return (grd==0) ? '请输入密码等待强度检测' : '密码强度检测：'+arr[grd-1];
				}
			}
		});
	};
	
	/*
		倒计时 HRdjs
		@DOM
			<p></p>
		@Usage
			$('p').HRdjs(options);
		@options
			tipId		:'',	//显示提示信息的id
			maxLength	:0,		//最大长度
			maxTipId	:'',	//提示模块id
			maxTipText	:'',	//正常提示信息
			maxTipError	:'',	//错误提示信息
			pwdTipId	:''		//提示模块id
	*/
	$.fn.HRdjs = function(options,to){
		var options = $.extend({}, {
			startFontSize	:'36px',
			endFontSize		:'12px',
			duration		:1000,
			startNumber		:10,
			endNumber		:0,
			callBack		:function(){}
		}, options);
		return this.each(function(){
			if(!to && to != options.endNumber){
				to = options.startNumber;
			}
			if($(this).context.nodeName == "INPUT"){
				$(this).val(to).css('fontSize',options.startFontSize);
				$(this).animate({'fontSize':options.endFontSize},options.duration,'',function(){
					if(to > options.endNumber+1){
						$(this).css('fontSize',options.startFontSize).val(to-1).HRdjs(options,to-1);
					}else{
						options.callBack(this);
					}
				});
			}else{
				$(this).text(to).css('fontSize',options.startFontSize);
				$(this).animate({'fontSize':options.endFontSize},options.duration,'',function(){
					if(to > options.endNumber+1){
						$(this).css('fontSize',options.startFontSize).text(to-1).HRdjs(options,to-1);
					}else{
						options.callBack(this);
					}
				});
			}
		});
	};
	
	/*
		分享工具 HRshare
		@DOM
			<div>
				<a class="hr-share-xiaoyou"></a>
				<a class="hr-share-115"></a>
				<a class="hr-share-tsina"></a>
				<a class="hr-share-tqq"></a>
				<a class="hr-share-more"></a>
			</div>
		@Usage
			$('div').HRshare(options);
		@options
			size		:16,	//图标尺寸，目前可选16和32
			hasText		:true	//是否显示文字
	*/
	$.fn.HRshare = function(options){
		var options = $.extend({}, {
			size	:16,
			hasText	:true
		}, options);
		var shareico = {
			"tqq"		:"http://v.t.qq.com/share/share.php?title={title}&url={url}&appkey=118cd1d635c44eab9a4840b2fbf8b0fb",
			"tsina"		:"http://service.weibo.com/share/share.php?title={title}&url={url}&source=bookmark&appkey=2992571369",
			"qzone"		:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}",
			"renren"	:"http://share.renren.com/share/buttonshare.do?link={url}&title={title}",
			"baidu"		:"http://cang.baidu.com/do/add?it={title}&iu={url}&fr=ien#nw=1",
			"115"		:"http://sc.115.com/add?url={url}&title={title}",
			"tsohu"		:"http://t.sohu.com/third/post.jsp?url={url}&title={title}&content=utf-8",
			"taobao"	:"http://share.jianghu.taobao.com/share/addShare.htm?url={url}",
			"xiaoyou"	:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url={url}",
			"hi"		:"http://apps.hi.baidu.com/share/?url={url}&title={title}",
			"fanfou"	:"http://fanfou.com/sharer?u={url}&t={title}",
			"sohubai"	:"http://bai.sohu.com/share/blank/add.do?link={url}",
			"feixin"	:"http://space3.feixin.10086.cn/api/share?title={title}&url={url}",
			"youshi"	:"http://www.ushi.cn/feedShare/feedShare!sharetomicroblog.jhtml?type=button&loginflag=share&title={title}&url={url}",
			"tianya"	:"http://share.tianya.cn/openapp/restpage/activity/appendDiv.jsp?app_id=jiathis&ccTitle={title}&ccUrl={url}&jtss=tianya&ccBody=",
			"msn"		:"http://profile.live.com/P.mvc#!/badge?url={url}&screenshot=",
			"douban"	:"http://shuo.douban.com/!service/share?image=&href={url}&name={title}",
			"twangyi"	:"http://t.163.com/article/user/checkLogin.do?source={title}&info={title}+{url}&images=",
			"mop"		:"http://tk.mop.com/api/post.htm?url={url}&title={title}"
		};
		var shareiconame = {
			"tqq"		:"腾讯微博",
			"tsina"		:"新浪微博",
			"qzone"		:"QQ空间",
			"renren"	:"人人网",
			"baidu"		:"百度收藏",
			"115"		:"115",
			"tsohu"		:"搜狐微博",
			"taobao"	:"淘江湖",
			"xiaoyou"	:"腾讯朋友",
			"hi"		:"百度空间",
			"fanfou"	:"饭否",
			"sohubai"	:"搜狐白社会",
			"feixin"	:"飞信",
			"tianya"	:"天涯社区",
			"youshi"	:"优士网",
			"msn"		:"MSN",
			"douban"	:"豆瓣",
			"twangyi"	:"网易微博",
			"mop"		:"猫扑推客"
		};
		this.each(function(){
			$(this).addClass("hr-share-"+options.size);
			var title = document.title;
			var url = window.location.href;
			function eFunction(str){
				return function(){
					window.open(formatmodel(shareico[str],{title:title, url:url}));
				}
			}
			for(si in shareico){
				$(this).find(".hr-share-"+si).die('click').live('click',eFunction(si)).attr("title","分享到"+shareiconame[si]);
				if(options.hasText){
					$(this).find(".hr-share-"+si).text(shareiconame[si]);
				}
				$(this).find(".hr-share-more-panel-"+si).die('click').live('click',eFunction(si));
			}
			
			//更多
			$(".hr-share-more").live("click",function(){
				if(!$(".HRshare-bg").length){
					if($.browser.msie && $.browser.version == "6.0"){
						//ie6无法遮住select，则只能将其隐藏
						$("select:visible").addClass("hr-share-select-hidden");
						//ie6不支持position:fixed
						$("body").append("<div class='HRshare-bg' style='position:absolute;left:0;top:0;width:"+$(window).width()+"px;height:"+$(window).height()+"px;display:none;z-index:9998;background-color:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;'></div>");
					}else{
						$("body").append("<div class='HRshare-bg' style='position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:9998;  background-color:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;'></div>");
					}
				}
				$(".HRshare-bg").fadeIn('fast');
				
				if(!$(".hr-share-more-panel").length){
					var _left = ($(window).width()-270)/2;
					var _top = ($(window).height()-300)/3;
					if($.browser.msie && $.browser.version == "6.0"){
						var _sharepanel = '<div class="hr-share-more-panel" style="position:absolute;z-index:9999;left:expression(eval(document.documentElement.scrollLeft)+'+_left+');top:expression(eval(document.documentElement.scrollTop)+'+_top+')">';
					}else{
						var _sharepanel = '<div class="hr-share-more-panel" style="position:fixed;z-index:9999;top:'+_top+'px;left:'+_left+'px">';
					}
					_sharepanel += '<div class="hr-share-more-panel-title"><a href="#close" title="关闭">×</a><span>分享到各大网站</span></div><div class="hr-share-more-panel-list">';
					for(si in shareiconame){
						_sharepanel += '<a class="hr-share-more-panel-'+si+'">'+shareiconame[si]+'</a>';
					}
					_sharepanel += '</div><div class="hr-share-more-panel-copyright"><a href="http://www.caiyufu.com" target="_blank">易网科技</a></div></div>';
					$("body").append(_sharepanel);
				}
				$(".hr-share-more-panel").fadeIn('fast');
			});
			$(".HRshare-bg").live("click",function(){
				$(".hr-share-more-panel").fadeOut('fast');
				$(".HRshare-bg").fadeOut('fast');
			});
			$(".hr-share-more-panel-title a").live("click",function(){
				$(".hr-share-more-panel").fadeOut('fast');
				$(".HRshare-bg").fadeOut('fast');
			});
			$(window).bind('resize',function(){
				var _left = ($(window).width()-270)/2;
				var _top = ($(window).height()-300)/3;
				$(".hr-share-more-panel").css({"left":_left,"top":_top});
			});
		});
	};
	
	function isMouseLeaveOrEnter(e, handler){
		if (e.type != 'mouseout' && e.type != 'mouseover') return false;
		var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
		while (reltg && reltg != handler)
			reltg = reltg.parentNode;
		return (reltg != handler);
	}
	function getEvent(){
		if(document.all)
			return window.event;
		func=getEvent.caller;
		while(func!=null){
			var arg0=func.arguments[0];
			if(arg0){
				if((arg0.constructor==Event || arg0.constructor==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
					return arg0;
				}
			}
			func=func.caller;
		}
		return null;
	}
	function formatmodel(str,model){
		for(var k in model){
			var re = new RegExp("{"+k+"}","g");
			str = str.replace(re,model[k]);
		}
		return str;
	}
})(jQuery);
