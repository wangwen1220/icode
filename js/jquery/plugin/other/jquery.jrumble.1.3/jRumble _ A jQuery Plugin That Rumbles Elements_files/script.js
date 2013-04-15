$(document).ready(function(){
	/*========================================================*/
	/* Site jRumble
	/*========================================================*/
	$('header a, nav ul li a, #download-link, #submit').jrumble();
	$('#content a, #download a').not('#fb_share').jrumble({rotation: 1, x: 1, y: 1});
	$('#credits a').jrumble({rotation: 6, x: 0, y: 0, opacity: true});
	$('header a, nav ul li a, #download-link, #submit, #content a, #download a, #credits a').hover(function(){
		$(this).trigger('startRumble');
	}, function(){
		$(this).trigger('stopRumble');
	});
	
	/*========================================================*/
	/* Site Demos
	/*========================================================*/
	
		/*========================================================*/
		/* Ranges
		/*========================================================*/
		$('#demo1').jrumble({
			x: 2,
			y: 2,
			rotation: 1
		});
		
		$('#demo2').jrumble({
			x: 10,
			y: 10,
			rotation: 4
		});
		
		$('#demo3').jrumble({
			x: 4,
			y: 0,
			rotation: 0
		});
		
		$('#demo4').jrumble({
			x: 0,
			y: 0,
			rotation: 5
		});
		
		$('#demo1, #demo2, #demo3, #demo4').hover(function(){
			$(this).trigger('startRumble');
		}, function(){
			$(this).trigger('stopRumble');
		});
		
		/*========================================================*/
		/* Speeds
		/*========================================================*/
		$('#demo5').jrumble({
			speed: 0
		});
		
		$('#demo6').jrumble({
			speed: 50
		});
		
		$('#demo7').jrumble({
			speed: 100,
		});
		
		$('#demo8').jrumble({
			speed: 200,
		});
		
		$('#demo5, #demo6, #demo7, #demo8').hover(function(){
			$(this).trigger('startRumble');
		}, function(){
			$(this).trigger('stopRumble');
		});
		
		/*========================================================*/
		/* Opacity
		/*========================================================*/
		$('#demo9').jrumble({
			opacity: true
		});
		
		$('#demo10').jrumble({
			opacity: true,
			opacityMin: .75
		});
		
		$('#demo11').jrumble({
			opacity: true,
			opacityMin: .1
		});
		
		$('#demo12').jrumble({
			x: 6,
			y: 6,
			rotation: 6,
			speed: 5,
			opacity: true,
			opacityMin: .05
		});
		
		$('#demo9, #demo10, #demo11, #demo12').hover(function(){
			$(this).trigger('startRumble');
		}, function(){
			$(this).trigger('stopRumble');
		});
		
		/*========================================================*/
		/* Trigger Examples
		/*========================================================*/
		$('#demo13, #demo14, #demo15, #demo16, #demo17, #demo18, #demo19, #demo20').jrumble();
		
		$('#demo13').hover(function(){
			$(this).trigger('startRumble');
		}, function(){
			$(this).trigger('stopRumble');
		});
		
		$('#demo14').toggle(function(){
			$(this).trigger('startRumble');
		}, function(){
			$(this).trigger('stopRumble');
		});
		
		$('#demo15').bind({
			'mousedown': function(){
				$(this).trigger('startRumble');
			},
			'mouseup': function(){
				$(this).trigger('stopRumble');
			}
		});
		
		$('#demo16').trigger('startRumble');
		
		$('#demo17').hover(function(){
			$('#demo18').trigger('startRumble');
		}, function(){
			$('#demo18').trigger('stopRumble');
		});
		
		$('#demo18').hover(function(){
			$('#demo17').trigger('startRumble');
		}, function(){
			$('#demo17').trigger('stopRumble');
		});
		
		var demoTimeout;
		$('#demo19').click(function(){
			$this = $(this);
			clearTimeout(demoTimeout);
			$this.trigger('startRumble');
			demoTimeout = setTimeout(function(){$this.trigger('stopRumble');}, 1500)
		});
		
		var demoStart = function(){
			$('#demo20').trigger('startRumble');
			setTimeout(demoStop, 300);
		};
		
		var demoStop = function(){
			$('#demo20').trigger('stopRumble');
			setTimeout(demoStart, 300);
		};
		
		demoStart();		
		
	/*========================================================*/
	/* Source Toggling
	/*========================================================*/
	$('.view-source pre').hide();
	$('.view-source a').toggle(function(){
		$(this).css({'background': '#ddd', 'color': '#666', 'text-shadow': '1px 1px 0 #eee'}).siblings('pre').stop(false, true).slideDown(500, 'easeInOutExpo');
		$(this).html('Hide Source');
	}, function(){
		$(this).css({'background': '#bbb','color': '#fff', 'text-shadow': '-1px 1px 0px rgba(0,0,0,.2)'}).siblings('pre').stop(false, true).slideUp(500, 'easeInOutExpo');
		$(this).html('View Source');
	});
	
	/*========================================================*/
	/* Site Scrolling
	/*========================================================*/
	$('nav a').click(function(){  
		$('body').stop().scrollTo($(this).attr('href'), 700, {easing: 'easeInOutExpo', offset: {top: -40}});
		return false;
	});	
	
	/*========================================================*/
	/* Contact Form
	/*========================================================*/
	$('.error').hide(); 
	$('#submit').click(function() {  
		$('.error').fadeOut();  
	  	var name = $('input#name').val(); 
		var email = $('input#email').val();
		var message = $('textarea#message').val();
		
		if(name == ''){  
			$('label#name_error').fadeIn();  
			$('input#name').focus();  
		return false;  
		}
		if(email == ''){  
	 		$('label#email_error').fadeIn();  
	    	$('input#email').focus();  
		return false;  
		}
		if(message == ''){  
			$('label#message_error').fadeIn();  
			$('textarea#message').focus();  
		return false;  
		}
		$('#sent-message').html("<img src='images/ajax-loader.gif' width='32' height='32'/>");
		$('#sent-message').show();
		
		var dataString = 'name='+ name + '&email=' + email + '&message=' + message;   
		$.ajax({  
			type: "POST",  
			url: "sendmessage.php",  
			data: dataString,  
			success: function() {
				$('#contact-form').slideUp(500, 'easeInOutExpo');
				$('#sentMessage').html("<p><strong>Message Sent!</strong></p>");  
				$('#sentMessage').fadeIn(1500); 
			}
		});  
		return false; 
	});
	
	/*========================================================*/
	/* Download Counter
	/*========================================================*/
	$('#download-link').click(function(){
		var count = $('#download-count').html();
		count++;
		$('#download-count').html(count);
		$.get('downloadcounter.php');				   
	});
});