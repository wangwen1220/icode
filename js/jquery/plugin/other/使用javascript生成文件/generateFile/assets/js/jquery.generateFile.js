(function($){
	
	// ����һ��jquery���
	
	$.generateFile = function(options){
		
		options = options || {};
		
		if(!options.script || !options.filename || !options.content){
			throw new Error("�������ò��Ϸ�!");
		}
		
		// ����һ��1*1��iframe
		
		var iframe = $('<iframe>',{
			width:1,
			height:1,
			frameborder:0,
			css:{
				display:'none'
			}
		}).appendTo('body');

		var formHTML = '<form action="" method="post">'+
			'<input type="hidden" name="filename" />'+
			'<input type="hidden" name="content" />'+
			'</form>';
		
		// �Ӹ��ӳٵ�ԭ���ǣ���IEһЩ����DOM��ʱ��
		
		setTimeout(function(){
		
			// iframe��document�е�bodyԪ��
		
			var body = (iframe.prop('contentDocument') !== undefined) ?
							iframe.prop('contentDocument').body :
							iframe.prop('document').body;	// IE
			
			body = $(body);
			
			// ��iframe�������
			body.html(formHTML);
			
			var form = body.find('form');
			
			form.attr('action',options.script);
			form.find('input[name=filename]').val(options.filename);
			form.find('input[name=content]').val(options.content);
			
			//�ύ��
			
			form.submit();
		},50);
	};
	
})(jQuery);