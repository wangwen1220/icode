Ext.data.JsonP.KISSY_Resizable({"tagname":"class","name":"KISSY.Resizable","extends":"KISSY.Base","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-KISSY.Resizable","members":{"cfg":[{"name":"disabled","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-disabled"},{"name":"handlers","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-handlers"},{"name":"maxHeight","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-maxHeight"},{"name":"maxWidth","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-maxWidth"},{"name":"minHeight","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-minHeight"},{"name":"minWidth","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-minWidth"},{"name":"node","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-node"},{"name":"prefixCls","tagname":"cfg","owner":"KISSY.Resizable","meta":{},"id":"cfg-prefixCls"}],"property":[{"name":"disabled","tagname":"property","owner":"KISSY.Resizable","meta":{},"id":"property-disabled"},{"name":"maxHeight","tagname":"property","owner":"KISSY.Resizable","meta":{},"id":"property-maxHeight"},{"name":"maxWidth","tagname":"property","owner":"KISSY.Resizable","meta":{},"id":"property-maxWidth"},{"name":"minHeight","tagname":"property","owner":"KISSY.Resizable","meta":{},"id":"property-minHeight"},{"name":"minWidth","tagname":"property","owner":"KISSY.Resizable","meta":{},"id":"property-minWidth"}],"method":[{"name":"addAttr","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-addAttr"},{"name":"addAttrs","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-addAttrs"},{"name":"addTarget","tagname":"method","owner":"KISSY.Event.Target","meta":{},"id":"method-addTarget"},{"name":"destroy","tagname":"method","owner":"KISSY.Resizable","meta":{},"id":"method-destroy"},{"name":"detach","tagname":"method","owner":"KISSY.Event.Target","meta":{},"id":"method-detach"},{"name":"fire","tagname":"method","owner":"KISSY.Event.Target","meta":{},"id":"method-fire"},{"name":"get","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-get"},{"name":"getAttrVals","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-getAttrVals"},{"name":"getAttrs","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-getAttrs"},{"name":"getTargets","tagname":"method","owner":"KISSY.Event.Target","meta":{"private":true},"id":"method-getTargets"},{"name":"hasAttr","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-hasAttr"},{"name":"on","tagname":"method","owner":"KISSY.Event.Target","meta":{},"id":"method-on"},{"name":"publish","tagname":"method","owner":"KISSY.Event.Target","meta":{},"id":"method-publish"},{"name":"removeAttr","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-removeAttr"},{"name":"removeTarget","tagname":"method","owner":"KISSY.Event.Target","meta":{},"id":"method-removeTarget"},{"name":"reset","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-reset"},{"name":"set","tagname":"method","owner":"KISSY.Base.Attribute","meta":{},"id":"method-set"},{"name":"setInternal","tagname":"method","owner":"KISSY.Base.Attribute","meta":{"protected":true},"id":"method-setInternal"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":133,"files":[{"filename":"resizable.js","href":"resizable.html#KISSY-Resizable"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["KISSY.Base"],"subclasses":[],"mixedInto":[],"parentMixins":["KISSY.Base.Attribute","KISSY.Event.Target"],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/KISSY.Base' rel='KISSY.Base' class='docClass'>KISSY.Base</a><div class='subclass '><strong>KISSY.Resizable</strong></div></div><h4>Inherited mixins</h4><div class='dependency'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='docClass'>KISSY.Base.Attribute</a></div><div class='dependency'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='docClass'>KISSY.Event.Target</a></div><h4>Files</h4><div class='dependency'><a href='source/resizable.html#KISSY-Resizable' target='_blank'>resizable.js</a></div></pre><div class='doc-contents'><p>Make a element resizable.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-disabled' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-disabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-disabled' class='name not-expandable'>disabled</a><span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span></div><div class='description'><div class='short'><p>Whether disable current resizable.</p>\n</div><div class='long'><p>Whether disable current resizable.</p>\n</div></div></div><div id='cfg-handlers' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-handlers' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-handlers' class='name not-expandable'>handlers</a><span> : <a href=\"#!/api/KISSY.Resizable.HANDLER\" rel=\"KISSY.Resizable.HANDLER\" class=\"docClass\">KISSY.Resizable.HANDLER</a></span></div><div class='description'><div class='short'><p>directions can current node resize to.</p>\n</div><div class='long'><p>directions can current node resize to.</p>\n</div></div></div><div id='cfg-maxHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-maxHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-maxHeight' class='name not-expandable'>maxHeight</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Maximum height can current node resize to.</p>\n</div><div class='long'><p>Maximum height can current node resize to.</p>\n</div></div></div><div id='cfg-maxWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-maxWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-maxWidth' class='name not-expandable'>maxWidth</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Maximum width can current node resize to.</p>\n</div><div class='long'><p>Maximum width can current node resize to.</p>\n</div></div></div><div id='cfg-minHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-minHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-minHeight' class='name not-expandable'>minHeight</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Minimum height can current node resize to.</p>\n</div><div class='long'><p>Minimum height can current node resize to.</p>\n</div></div></div><div id='cfg-minWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-minWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-minWidth' class='name not-expandable'>minWidth</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Minimum width can current node resize to.</p>\n</div><div class='long'><p>Minimum width can current node resize to.</p>\n</div></div></div><div id='cfg-node' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-node' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-node' class='name expandable'>node</a><span> : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span></div><div class='description'><div class='short'>KISSY Node to be resizable. ...</div><div class='long'><p>KISSY Node to be resizable.\nNeed to be positioned 'relative' or 'absolute'.</p>\n</div></div></div><div id='cfg-prefixCls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-cfg-prefixCls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-cfg-prefixCls' class='name not-expandable'>prefixCls</a><span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'><p>css prefix for handler elements.</p>\n</div><div class='long'><p>css prefix for handler elements.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-disabled' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-property-disabled' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-property-disabled' class='name not-expandable'>disabled</a><span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span></div><div class='description'><div class='short'><p>disable or enable current resizable.</p>\n</div><div class='long'><p>disable or enable current resizable.</p>\n</div></div></div><div id='property-maxHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-property-maxHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-property-maxHeight' class='name not-expandable'>maxHeight</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Maximum height can current node resize to.</p>\n</div><div class='long'><p>Maximum height can current node resize to.</p>\n</div></div></div><div id='property-maxWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-property-maxWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-property-maxWidth' class='name not-expandable'>maxWidth</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Maximum width can current node resize to,\nit can be changed after initialization,\nfor example: responsive design.</p>\n</div><div class='long'><p>Maximum width can current node resize to,\nit can be changed after initialization,\nfor example: responsive design.</p>\n</div></div></div><div id='property-minHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-property-minHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-property-minHeight' class='name not-expandable'>minHeight</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Minimum height can current node resize to.</p>\n</div><div class='long'><p>Minimum height can current node resize to.</p>\n</div></div></div><div id='property-minWidth' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-property-minWidth' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-property-minWidth' class='name not-expandable'>minWidth</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'><p>Minimum width can current node resize to.</p>\n</div><div class='long'><p>Minimum width can current node resize to.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-addAttr' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-addAttr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-addAttr' class='name expandable'>addAttr</a>( <span class='pre'>name, attrConfig, [override]</span> )</div><div class='description'><div class='short'>Adds an attribute with the provided configuration to the host object. ...</div><div class='long'><p>Adds an attribute with the provided configuration to the host object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>attrName</p>\n</div></li><li><span class='pre'>attrConfig</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The config supports the following properties</p>\n<ul><li><span class='pre'>value</span> :  (optional)<div class='sub-desc'><p>simple object or system native object</p>\n</div></li><li><span class='pre'>valueFn</span> :  (optional)<div class='sub-desc'><p>a function which can return current attribute 's default value</p>\n</div></li><li><span class='pre'>setter</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>call when set attribute 's value\npass current attribute 's value as parameter\nif return value is not undefined,set returned value as real value</p>\n</div></li><li><span class='pre'>getter</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>call when get attribute 's value\npass current attribute 's value as parameter\nreturn getter's returned value to invoker</p>\n</div></li><li><span class='pre'>validator</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>call before set attribute 's value\nif return false,cancel this set action</p>\n</div></li></ul></div></li><li><span class='pre'>override</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a> (optional)<div class='sub-desc'><p>whether override existing attribute config ,default true</p>\n</div></li></ul></div></div></div><div id='method-addAttrs' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-addAttrs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-addAttrs' class='name expandable'>addAttrs</a>( <span class='pre'>attrConfigs, initialValues</span> )</div><div class='description'><div class='short'>Configures a group of attributes, and sets initial values. ...</div><div class='long'><p>Configures a group of attributes, and sets initial values.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attrConfigs</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>An object with attribute name/configuration pairs.</p>\n</div></li><li><span class='pre'>initialValues</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>user defined initial values</p>\n</div></li></ul></div></div></div><div id='method-addTarget' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-addTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-addTarget' class='name expandable'>addTarget</a>( <span class='pre'>anotherTarget</span> )</div><div class='description'><div class='short'>Registers another EventTarget as a bubble target. ...</div><div class='long'><p>Registers another EventTarget as a bubble target.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>anotherTarget</span> : <a href=\"#!/api/KISSY.Event.Target\" rel=\"KISSY.Event.Target\" class=\"docClass\">KISSY.Event.Target</a><div class='sub-desc'><p>Another EventTarget instance to add</p>\n</div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Resizable'>KISSY.Resizable</span><br/><a href='source/resizable.html#KISSY-Resizable-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Resizable-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>make current resizable 's node not resizable. ...</div><div class='long'><p>make current resizable 's node not resizable.</p>\n</div></div></div><div id='method-detach' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-detach' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-detach' class='name expandable'>detach</a>( <span class='pre'>type, [fn], [context]</span> )</div><div class='description'><div class='short'>Detach one or more listeners the from the specified event ...</div><div class='long'><p>Detach one or more listeners the from the specified event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name of the event</p>\n</div></li><li><span class='pre'>fn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>The subscribed function to un-subscribe. if not supplied, all observers will be removed.</p>\n</div></li><li><span class='pre'>context</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>The custom object passed to subscribe.</p>\n</div></li></ul></div></div></div><div id='method-fire' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-fire' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-fire' class='name expandable'>fire</a>( <span class='pre'>type, [eventData]</span> ) : *</div><div class='description'><div class='short'>Fire a custom event by name. ...</div><div class='long'><p>Fire a custom event by name.\nThe callback functions will be executed from the context specified when the event was created,\nand the <a href=\"#!/api/KISSY.Event.CustomEventObject\" rel=\"KISSY.Event.CustomEventObject\" class=\"docClass\">KISSY.Event.CustomEventObject</a> created will be mixed with eventData</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The type of the event</p>\n</div></li><li><span class='pre'>eventData</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>The data will be mixed with <a href=\"#!/api/KISSY.Event.CustomEventObject\" rel=\"KISSY.Event.CustomEventObject\" class=\"docClass\">KISSY.Event.CustomEventObject</a> created</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'><p>If any listen returns false, then the returned value is false. else return the last listener's returned value</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-get' class='name expandable'>get</a>( <span class='pre'>name</span> )</div><div class='description'><div class='short'>Gets the current value of the attribute. ...</div><div class='long'><p>Gets the current value of the attribute.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>attribute 's name</p>\n</div></li></ul></div></div></div><div id='method-getAttrVals' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-getAttrVals' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-getAttrVals' class='name expandable'>getAttrVals</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>get un-cloned attr value collections ...</div><div class='long'><p>get un-cloned attr value collections</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getAttrs' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-getAttrs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-getAttrs' class='name expandable'>getAttrs</a>( <span class='pre'></span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>get un-cloned attr config collections ...</div><div class='long'><p>get un-cloned attr config collections</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getTargets' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-getTargets' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-getTargets' class='name expandable'>getTargets</a>( <span class='pre'>target</span> ) : *<strong class='private signature' >private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>*</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-hasAttr' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-hasAttr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-hasAttr' class='name expandable'>hasAttr</a>( <span class='pre'>name</span> )</div><div class='description'><div class='short'>Checks if the given attribute has been added to the host. ...</div><div class='long'><p>Checks if the given attribute has been added to the host.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-on' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-on' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-on' class='name expandable'>on</a>( <span class='pre'>type, fn, [context]</span> )</div><div class='description'><div class='short'>Subscribe a callback function to a custom event fired by this object or from an object that bubbles its events to thi...</div><div class='long'><p>Subscribe a callback function to a custom event fired by this object or from an object that bubbles its events to this object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name of the event</p>\n</div></li><li><span class='pre'>fn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>The callback to execute in response to the event</p>\n</div></li><li><span class='pre'>context</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>this object in callback</p>\n</div></li></ul></div></div></div><div id='method-publish' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-publish' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-publish' class='name expandable'>publish</a>( <span class='pre'>type, cfg</span> )</div><div class='description'><div class='short'>Creates a new custom event of the specified type ...</div><div class='long'><p>Creates a new custom event of the specified type</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The type of the event</p>\n</div></li><li><span class='pre'>cfg</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>Config params</p>\n<ul><li><span class='pre'>bubbles</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a> (optional)<div class='sub-desc'><p>whether or not this event bubbles</p>\n<p>Defaults to: <code>true</code></p></div></li><li><span class='pre'>defaultFn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>this event's default action</p>\n</div></li></ul></div></li></ul></div></div></div><div id='method-removeAttr' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-removeAttr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-removeAttr' class='name expandable'>removeAttr</a>( <span class='pre'>name</span> )</div><div class='description'><div class='short'>Removes an attribute from the host object. ...</div><div class='long'><p>Removes an attribute from the host object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-removeTarget' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Event.Target' rel='KISSY.Event.Target' class='defined-in docClass'>KISSY.Event.Target</a><br/><a href='source/api-impl.html#KISSY-Event-Target-method-removeTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Target-method-removeTarget' class='name expandable'>removeTarget</a>( <span class='pre'>anotherTarget</span> )</div><div class='description'><div class='short'>Removes a bubble target ...</div><div class='long'><p>Removes a bubble target</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>anotherTarget</span> : <a href=\"#!/api/KISSY.Event.Target\" rel=\"KISSY.Event.Target\" class=\"docClass\">KISSY.Event.Target</a><div class='sub-desc'><p>Another EventTarget instance to remove</p>\n</div></li></ul></div></div></div><div id='method-reset' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-reset' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-reset' class='name expandable'>reset</a>( <span class='pre'>name, [opts]</span> )</div><div class='description'><div class='short'>Resets the value of an attribute.just reset what addAttr set\n(not what invoker set when call new Xx(cfg)) ...</div><div class='long'><p>Resets the value of an attribute.just reset what addAttr set\n(not what invoker set when call new Xx(cfg))</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>name of attribute</p>\n</div></li><li><span class='pre'>opts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>some options</p>\n<ul><li><span class='pre'>silent</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a> (optional)<div class='sub-desc'><p>whether fire change event</p>\n</div></li></ul></div></li></ul></div></div></div><div id='method-set' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-set' class='name expandable'>set</a>( <span class='pre'>name, [value], [opts]</span> ) : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></div><div class='description'><div class='short'>Sets the value of an attribute. ...</div><div class='long'><p>Sets the value of an attribute.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>attribute 's name or attribute name and value map</p>\n</div></li><li><span class='pre'>value</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>attribute 's value</p>\n</div></li><li><span class='pre'>opts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>some options</p>\n<ul><li><span class='pre'>silent</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a> (optional)<div class='sub-desc'><p>whether fire change event</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'><p>whether pass validator</p>\n</div></li></ul></div></div></div><div id='method-setInternal' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KISSY.Base.Attribute' rel='KISSY.Base.Attribute' class='defined-in docClass'>KISSY.Base.Attribute</a><br/><a href='source/attribute.html#KISSY-Base-Attribute-method-setInternal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Base.Attribute-method-setInternal' class='name expandable'>setInternal</a>( <span class='pre'>name, value, opts</span> )<strong class='protected signature' >protected</strong></div><div class='description'><div class='short'>internal use, no event involved, just set. ...</div><div class='long'><p>internal use, no event involved, just set.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>value</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>opts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});