(function($){
	$(function(){
		// 把左侧列表的选中项添加到右侧列表中
		var $select_box_left = $('#select_box_left');
		var $select_box_right = $('#select_box_right');
		var checked_count = 0;
		$('#total').text($select_box_left.find('li').length);// 设置待选数量
		$select_box_left.find(':checkbox').live('click', function(){
			var $this = $(this);
			var id = this.id;
			if($this.is(':checked')){
				$this.parent().clone().appendTo($select_box_right.find('ul'));
				checked_count++;
			}else{
				$select_box_right.find('li').remove(':has("#' + id + '")');//取消选中后删除右边列表中相应的项
				checked_count--;
				$('#' + id).removeAttr('checked');//并设置相应项为未选中状态
			}
			$('#checked_count').text(checked_count);
		});

		$select_box_right.find(':checkbox').live('click', function(){
			var id = this.id;
			$(this).parent().remove();
			checked_count--;
			$('#' + id).removeAttr('checked');//并设置相应项为未选中状态
			$('#checked_count').text(checked_count);
		});

		// 选中文章模型，弹出文章类型
		$('#modelinfo').change(function(){
			if (this.value == 1){
				$('#article_type').show();
			}else{
				$('#article_type').hide();
			}
		});

		// ajax 提交查找内容
		$('#dosubmit_fiter, #search option').click(function(){
			var $search_form = $('#search');
			var query_string = $search_form.formSerialize();
			var action = $search_form.attr('action');
			$.post(action, query_string, function(data){
				$('#select_box_left').html($(data).find('#select_box_left > ul').html());
				$('#total').text($select_box_left.find('li').length);// 设置待选数量
				$select_box_right.find(':checkbox').each(function(){
					$('#' + this.id).attr('checked', this.checked);
				});
			});
			return false;
		});
	});
})(jQuery);