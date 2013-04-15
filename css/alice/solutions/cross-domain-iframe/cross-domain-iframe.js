// 自适应高度：支持跨域 | 动态高度 !!为了能获取到 document.body 脚本须在 body 中引入
;(function() {
	var agent_iframe,
		agent_iframe_src = 'http://localhost/cross-domain-iframe.html#', // 设置 iframe 的 src => 中介页地址#
		pre_height = getHeight(); // 获取自身高度

	createIframe(pre_height);

	// 用 setInterval 来持续检测
	setInterval(checkHeight, 500);

	function getHeight() {
		return Math.min(document.documentElement.scrollHeight, document.body.scrollHeight);
	}

	function createIframe(height) {
		agent_iframe = document.createElement('iframe');
		agent_iframe.style.height = '0';
		agent_iframe.style.width = '0';
		agent_iframe.style.border = 'none';
		agent_iframe.src = agent_iframe_src + height;
		document.body.appendChild(agent_iframe);
	}

	function checkHeight() {
		var cur_height = getHeight();
		if (cur_height != pre_height) {
			agent_iframe.src = agent_iframe_src + cur_height;
			pre_height = cur_height;
		}
		//setTimeout(checkHeight, 500);
	}
})();

// iframe 跨域自适应中介页脚本
/*<script>
	// iframe 跨域自适应中介页
	(function() {
		var ifrmae = window.top.document.getElementById('iframe-content-domain');
			pre_height = +window.location.hash.split('#')[1],
			//pre_height = parseInt(window.location.hash.substring(1), 10),
		ifrmae.height = pre_height;
		setInterval(function() {
			var new_height = parseInt(window.location.hash.substring(1), 10);
			if (new_height !== pre_height) {
				ifrmae.height = new_height;
				pre_height = new_height;
			}
		}, 300);
	})();
</script>*/