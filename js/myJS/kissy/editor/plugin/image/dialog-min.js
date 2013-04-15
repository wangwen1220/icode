/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
KISSY.add("editor/plugin/image/dialog",function(i,s,f,t,u,v){function n(a){for(a=a.parent();a;){var b=a.nodeName();if("a"==b)return a;if(o.$block[b]||o.$blockLimit[b])break;a=a.parent()}return null}function p(a,b){this.editor=a;this.imageCfg=b||{};this.suffix=(this.cfg=this.imageCfg.upload||null)&&this.cfg.suffix||"png,jpg,jpeg,gif";this.suffix_reg=RegExp(this.suffix.split(/,/).join("|")+"$","i");this.suffix_warning="只允许后缀名为"+this.suffix+"的图片"}var o=f.XHTML_DTD,q=i.UA,k=i.Node,h="请点击浏览上传图片",g=f.Utils.valInput;
i.augment(p,{_prepare:function(){var a=this;a.dialog=a.d=new t.Dialog({autoRender:!0,width:500,headerContent:"图片",bodyContent:"<div class='ks-editor-image-wrap'><ul class='ks-editor-tabs ks-clear ks-switchable-nav'><li class='ks-active' hidefocus='hidefocus'>网络图片</li><li hidefocus='hidefocus'>本地上传</li></ul><div style='padding:12px 20px 5px 20px;'><div class='ks-editor-image-tabs-content-wrap ks-switchable-content' ><div><label><span class='ks-editor-image-title'>图片地址： </span><input  data-verify='^(https?:/)?/[^\\s]+$'  data-warning='网址格式为：http:// 或 /' class='ks-editor-img-url ks-editor-input' style='width:390px;vertical-align:middle;' /></label></div><div style='position:relative;display: none'><form class='ks-editor-img-upload-form' enctype='multipart/form-data'><p style='zoom:1;'><input class='ks-editor-input ks-editor-img-local-url' readonly='readonly' style='margin-right: 15px; vertical-align: middle; width: 368px;color:#969696;'/><a style='padding:3px 11px;position:absolute;left:390px;top:0px;z-index:1;' class='ks-editor-image-up ks-editor-button ks-inline-block'>浏览...</a></p><div class='ks-editor-img-up-extraHtml'></div></form></div></div><table style='width:100%;margin-top:8px;' class='ks-editor-img-setting'><tr><td><label>宽度： <input  data-verify='^(自动|((?!0$)\\d+))?$'  data-warning='宽度请输入正整数' class='ks-editor-img-width ks-editor-input' style='vertical-align:middle;width:60px' /> 像素 </label></td><td><label>高度： <input  data-verify='^(自动|((?!0$)\\d+))?$'  data-warning='高度请输入正整数' class='ks-editor-img-height ks-editor-input' style='vertical-align:middle;width:60px' /> 像素 </label><label><input type='checkbox' class='ks-editor-img-ratio' style='vertical-align:middle;margin-left:5px;' checked='checked'/> 锁定高宽比</label></td></tr><tr><td><label>对齐：<select class='ks-editor-img-align' title='对齐'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></label></td><td><label>间距： <input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ks-editor-img-margin ks-editor-input' style='width:60px'/> 像素</label></td></tr><tr><td colspan='2' style='padding-top: 6px'><label>链接网址： <input class='ks-editor-img-link ks-editor-input' style='width:235px;vertical-align:middle;'  data-verify='^(?:(?:\\s*)|(?:https?://[^\\s]+)|(?:#.+))$'  data-warning='请输入合适的网址格式' /></label><label><input class='ks-editor-img-link-blank' style='vertical-align:middle;margin-left:5px;' type='checkbox'/> &nbsp; 在新窗口打开链接</label></td></tr></table></div></div>",
footerContent:"<div style='padding:5px 20px 20px;'><a href='javascript:void('确定')' class='ks-editor-img-insert ks-editor-button ks-inline-block' style='margin-right:30px;'>确定</a> <a  href='javascript:void('取消')' class='ks-editor-img-cancel ks-editor-button ks-inline-block'>取消</a></div>",mask:!0});var b=a.d.get("el"),d=b.one(".ks-editor-img-cancel"),w=b.one(".ks-editor-img-insert"),r=f.Utils.verifyInputs,l=b.one(".ks-editor-img-setting");a.uploadForm=b.one(".ks-editor-img-upload-form");a.imgLocalUrl=
b.one(".ks-editor-img-local-url");a.tab=new u.Tabs(a.d.get("body")[0],{triggerType:"click"});a.imgLocalUrl.val(h);a.imgUrl=b.one(".ks-editor-img-url");a.imgHeight=b.one(".ks-editor-img-height");a.imgWidth=b.one(".ks-editor-img-width");a.imgRatio=b.one(".ks-editor-img-ratio");a.imgAlign=v.Select.decorate(b.one(".ks-editor-img-align"),{prefixCls:"ks-editor-big-",elAttrs:{hideFocus:"hideFocus"},width:80,menuCfg:{prefixCls:"ks-editor-",render:b}});a.imgMargin=b.one(".ks-editor-img-margin");a.imgLink=
b.one(".ks-editor-img-link");a.imgLinkBlank=b.one(".ks-editor-img-link-blank");var e=f.Utils.placeholder;e(a.imgUrl,"http://");e(a.imgHeight,"自动");e(a.imgWidth,"自动");e(a.imgLink,"http://");a.imgHeight.on("keyup",function(){var b=parseInt(g(a.imgHeight));b&&a.imgRatio[0].checked&&!a.imgRatio[0].disabled&&a.imgRatioValue&&g(a.imgWidth,Math.floor(b*a.imgRatioValue))});a.imgWidth.on("keyup",function(){var b=parseInt(g(a.imgWidth));b&&a.imgRatio[0].checked&&!a.imgRatio[0].disabled&&a.imgRatioValue&&g(a.imgHeight,
Math.floor(b/a.imgRatioValue))});d.on("click",function(b){a.d.hide();b.halt()});var c=(new k("<a class='ks-editor-button ks-inline-block' style='position:absolute;z-index:"+f.baseZIndex(f.zIndexManager.LOADING_CANCEL)+";left:-9999px;top:-9999px;'>取消上传</a>")).appendTo(document.body,void 0);a.loadingCancel=c;w.on("click",function(d){d.halt();if(1==a.tab.activeIndex&&a.cfg){if(r(l.all("input")))if(a.imgLocalUrl.val()==h)alert("请先选择文件!");else if(a.suffix_reg.test(a.imgLocalUrl.val()))if(d=a.fileInput[0].files?
a.fileInput[0].files[0].size:0,j&&j<d/1E3)alert("上传图片最大："+j/1E3+"M");else{a.d.loading();c.on("click",function(a){a.halt();m.abort()});var m=s({data:f.Utils.normParams(a.cfg.serverParams),url:a.cfg.serverUrl,form:a.uploadForm[0],dataType:"json",type:"post",complete:function(b,d){c.css({left:-9999,top:-9999});a.d.unloading();"abort"!=d&&(b||(b={error:"服务器出错，请重试"}),b.error?alert(b.error):(g(a.imgUrl,b.imgUrl),(new Image).src=b.imgUrl,a._insert()))}}),d=a.d.get("el"),e=d.offset();c.css({left:e.left+d[0].offsetWidth/
2.5,top:e.top+d[0].offsetHeight/1.5})}else alert(a.suffix_warning),a.uploadForm[0].reset(),a.imgLocalUrl.val(h)}else r(b.all("input"))&&a._insert()});if(a.cfg){a.cfg.extraHtml&&b.one(".ks-editor-img-up-extraHtml").html(a.cfg.extraHtml);var m=b.one(".ks-editor-image-up"),j=a.cfg&&a.cfg.sizeLimit;a.fileInput=(new k("<input type='file' style='position:absolute;cursor:pointer;left:"+(q.ie?"360":q.chrome?"319":"369")+"px;z-index:2;top:0px;height:26px;' size='1' name='"+(a.cfg.fileInput||"Filedata")+"'/>")).insertAfter(a.imgLocalUrl);
j&&(h="单张图片容量不超过 "+j/1E3+" M");a.imgLocalUrl.val(h);a.fileInput.css("opacity",0);a.fileInput.on("mouseenter",function(){m.addClass("ks-editor-button-hover")});a.fileInput.on("mouseleave",function(){m.removeClass("ks-editor-button-hover")});a.fileInput.on("change",function(){var b=a.fileInput.val();a.imgLocalUrl.val(b.replace(/.+[\/\\]/,""))});!1===a.imageCfg.remote&&a.tab.remove(0)}else a.tab.remove(1);a._prepare=i.noop},_insert:function(){var a=this,b=g(a.imgUrl),d,f=parseInt(g(a.imgHeight)),h=parseInt(g(a.imgWidth)),
l=a.imgAlign.get("value"),e=parseInt(a.imgMargin.val()),c="";f&&(c+="height:"+f+"px;");h&&(c+="width:"+h+"px;");"none"!=l&&(c+="float:"+l+";");!isNaN(e)&&0!=e&&(c+="margin:"+e+"px;");a.d.hide();a.selectedEl?(d=a.selectedEl,a.editor.execCommand("save"),a.selectedEl.attr({src:b,_ke_saved_src:b,style:c})):(d=new k("<img "+(c?"style='"+c+"'":"")+" src='"+b+"' _ke_saved_src='"+b+"' alt='' />",null,a.editor.get("document")[0]),a.editor.insertElement(d));setTimeout(function(){var b=n(d),c=i.trim(g(a.imgLink)),
f=a.editor.getSelection(),e;if(b)if(c)b.attr("_ke_saved_href",c).attr("href",c).attr("target",a.imgLinkBlank.attr("checked")?"_blank":"_self");else{e=f.createBookmarks();b._4e_remove(true)}else if(c){e=f.createBookmarks();b=new k("<a></a>");b.attr("_ke_saved_href",c).attr("href",c).attr("target",a.imgLinkBlank.attr("checked")?"_blank":"_self");c=d[0];c.parentNode.replaceChild(b[0],c);b.append(c)}e&&f.selectBookmarks(e);a.selectedEl&&a.editor.execCommand("save")},100)},_update:function(a){var b=0,
d=f.Utils.resetInput;if((this.selectedEl=a)&&!1!==this.imageCfg.remote){g(this.imgUrl,this.selectedEl.attr("src"));var a=this.selectedEl.width(),i=this.selectedEl.height();g(this.imgHeight,i);g(this.imgWidth,a);this.imgAlign.set("value",this.selectedEl.style("float")||"none");this.imgMargin.val(parseInt(this.selectedEl.style("margin"))||0);this.imgRatio[0].disabled=!1;this.imgRatioValue=a/i;(a=n(this.selectedEl))?(g(this.imgLink,a.attr("_ke_saved_href")||a.attr("href")),this.imgLinkBlank.attr("checked",
"_blank"==a.attr("target"))):(d(this.imgLink),this.imgLinkBlank.attr("checked",!0))}else a=this.imageCfg.defaultMargin,void 0==a&&(a=10),2==this.tab.panels.length&&(b=1),this.imgLinkBlank.attr("checked",!0),d(this.imgUrl),d(this.imgLink),d(this.imgHeight),d(this.imgWidth),this.imgAlign.set("value","none"),this.imgMargin.val(a),this.imgRatio[0].disabled=!0,this.imgRatioValue=null;this.uploadForm[0].reset();this.imgLocalUrl.val(h);this.tab.switchTo(b)},show:function(a){this._prepare();this._update(a);
this.d.show()},destroy:function(){this.d.destroy();this.tab.destroy();this.loadingCancel&&this.loadingCancel.remove();this.imgAlign&&this.imgAlign.destroy()}});return p},{requires:["ajax","editor","../overlay/","switchable","../menubutton/"]});
