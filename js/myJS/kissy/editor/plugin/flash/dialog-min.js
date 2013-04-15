/*
Copyright 2012, KISSY UI Library v1.30rc
MIT Licensed
build time: Jul 5 23:31
*/
KISSY.add("editor/plugin/flash/dialog",function(f,d,g,h,i){function e(b,a){this.editor=b;this.config=a||{};d.Utils.lazyRun(this,"_prepareShow","_realShow");this._config()}var j=h.Dialog;f.augment(e,{addRes:d.Utils.addRes,destroyRes:d.Utils.destroyRes,_config:function(){this._urlTip="请输入如 http://www.xxx.com/xxx.swf";this._type="flash";this._cls="ke_flash";this._config_dwidth="400px";this._title="Flash";this._bodyHtml="<div style='padding:20px 20px 0 20px'><p><label>网址： <input  data-verify='^https?://[^\\s]+$'  data-warning='网址格式为：http://' class='ks-editor-flash-url ks-editor-input' style='width:300px;vertical-align:middle' /></label></p><table style='margin:10px 0 5px  40px;width:300px;'><tr><td><label>宽度： <input  data-verify='^(?!0$)\\d+$'  data-warning='宽度请输入正整数' class='ks-editor-flash-width ks-editor-input' style='width:60px;margin-left:2px;vertical-align:middle' /> 像素 </label></td><td><label>高度：<input  data-verify='^(?!0$)\\d+$'  data-warning='高度请输入正整数' class='ks-editor-flash-height ks-editor-input' style='width:60px;vertical-align:middle' /> 像素 </label></td></tr><tr><td><label>对齐： <select class='ks-editor-flash-align' title='对齐'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></td><td><label>间距：<input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='ks-editor-flash-margin ks-editor-input' style='width:60px;vertical-align:middle' value='5'/> 像素</label></td></tr></table></div>";
this._footHtml="<div style='padding:5px 20px 20px;'><a class='ks-editor-flash-ok ks-editor-button ks-inline-block' style='margin-left:40px;margin-right:20px;'>确定</a> <a class='ks-editor-flash-cancel ks-editor-button ks-inline-block'>取消</a></div>"},_prepareShow:function(){this.dialog=new j({autoRender:!0,headerContent:this._title,bodyContent:this._bodyHtml,footerContent:this._footHtml,width:this._config_dwidth||"500px",mask:!0});this.addRes(this.dialog);this._initD()},_realShow:function(){this._updateD();
this.dialog.show()},_getFlashUrl:function(b){return g.getUrl(b)},_updateD:function(){var b=this.editor,a=this.config,c=this.selectedFlash;if(c){if(b=b.restoreRealElement(c))c.css("width")&&this.dWidth.val(parseInt(c.css("width"))),c.css("height")&&this.dHeight.val(parseInt(c.css("height"))),this.dAlign.set("value",c.css("float")),d.Utils.valInput(this.dUrl,this._getFlashUrl(b)),this.dMargin.val(parseInt(b.style("margin"))||0)}else d.Utils.resetInput(this.dUrl),this.dWidth.val(a.defaultWidth||""),
this.dHeight.val(a.defaultHeight||""),this.dAlign.set("value","none"),this.dMargin.val("5")},show:function(b){this.selectedFlash=b;this._prepareShow()},_initD:function(){var b=this.dialog,a=b.get("el");this.dHeight=a.one(".ks-editor-flash-height");this.dWidth=a.one(".ks-editor-flash-width");this.dUrl=a.one(".ks-editor-flash-url");this.dAlign=i.Select.decorate(a.one(".ks-editor-flash-align"),{prefixCls:"ks-editor-big-",elAttrs:{hideFocus:"hideFocus"},width:80,menuCfg:{prefixCls:"ks-editor-",render:a}});
this.dMargin=a.one(".ks-editor-flash-margin");var c=a.one(".ks-editor-flash-ok"),a=a.one(".ks-editor-flash-cancel");c.on("click",this._gen,this);a.on("click",function(a){b.hide();a&&a.halt()});d.Utils.placeholder(this.dUrl,this._urlTip);this.addRes(this.dAlign)},_getDInfo:function(){return{url:this.dUrl.val(),attrs:{width:this.dWidth.val(),height:this.dHeight.val(),style:"margin:"+(parseInt(this.dMargin.val())||0)+"px;float:"+this.dAlign.get("value")+";"}}},_gen:function(b){b&&b.halt();var b=this.editor,
a=this._getDInfo(),c=a&&f.trim(a.url),e=a&&a.attrs;a&&d.Utils.verifyInputs(this.dialog.get("el").all("input"))&&(this.dialog.hide(),a=g.insertFlash(b,c,e,this._cls,this._type),this.selectedFlash&&b.getSelection().selectElement(a),b.notifySelectionChange())},destroy:function(){this.destroyRes()}});return e},{requires:["editor","../flashCommon/utils","../overlay/","../menubutton/"]});
