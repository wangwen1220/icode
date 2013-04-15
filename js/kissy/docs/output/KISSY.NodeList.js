Ext.data.JsonP.KISSY_NodeList({"tagname":"class","name":"KISSY.NodeList","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-KISSY.NodeList","members":{"cfg":[],"property":[{"name":"length","tagname":"property","owner":"KISSY.NodeList","meta":{},"id":"property-length"}],"method":[{"name":"add","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-add"},{"name":"all","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-all"},{"name":"append","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-append"},{"name":"each","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-each"},{"name":"end","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-end"},{"name":"fadeIn","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-fadeIn"},{"name":"fadeOut","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-fadeOut"},{"name":"fadeToggle","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-fadeToggle"},{"name":"getDOMNode","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-getDOMNode"},{"name":"getDOMNodes","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-getDOMNodes"},{"name":"hide","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-hide"},{"name":"item","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-item"},{"name":"one","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-one"},{"name":"prepend","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-prepend"},{"name":"show","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-show"},{"name":"slice","tagname":"method","owner":"KISSY.NodeList","meta":{},"id":"method-slice"},{"name":"slideDown","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-slideDown"},{"name":"slideToggle","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-slideToggle"},{"name":"slideUp","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-slideUp"},{"name":"toggle","tagname":"method","owner":"KISSY.NodeList","meta":{"chainable":true},"id":"method-toggle"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":15,"files":[{"filename":"base.js","href":"base10.html#KISSY-NodeList"}],"html_meta":{},"statics":{"cfg":[],"property":[{"name":"NodeType","tagname":"property","owner":"KISSY.NodeList","meta":{"static":true},"id":"static-property-NodeType"}],"method":[{"name":"all","tagname":"method","owner":"KISSY.NodeList","meta":{"static":true},"id":"static-method-all"},{"name":"one","tagname":"method","owner":"KISSY.NodeList","meta":{"static":true},"id":"static-method-one"}],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/base10.html#KISSY-NodeList' target='_blank'>base.js</a></div></pre><div class='doc-contents'><p>The NodeList class provides a <a href=\"#!/api/KISSY.DOM\" rel=\"KISSY.DOM\" class=\"docClass\">KISSY.DOM</a> wrapper for manipulating DOM Node.\nuse KISSY.all/one to retrieve NodeList instances.</p>\n\n<p> for example:</p>\n\n<pre class='inline-example '><code>KISSY.all('a').attr('href','http://docs.kissyui.com');\n</code></pre>\n\n<p>is equal to</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/KISSY.DOM-method-attr\" rel=\"KISSY.DOM-method-attr\" class=\"docClass\">KISSY.DOM.attr</a>('a','href','http://docs.kissyui.com');\n</code></pre>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Properties</h3><div id='property-length' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-property-length' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-property-length' class='name expandable'>length</a><span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span></div><div class='description'><div class='short'>length of nodelist ...</div><div class='long'><p>length of nodelist</p>\n<p>Defaults to: <code>0</code></p></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Properties</h3><div id='static-property-NodeType' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-static-property-NodeType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-static-property-NodeType' class='name not-expandable'>NodeType</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><strong class='static signature' >static</strong></div><div class='description'><div class='short'><p>Same with <a href=\"#!/api/KISSY.DOM.NodeType\" rel=\"KISSY.DOM.NodeType\" class=\"docClass\">KISSY.DOM.NodeType</a></p>\n</div><div class='long'><p>Same with <a href=\"#!/api/KISSY.DOM.NodeType\" rel=\"KISSY.DOM.NodeType\" class=\"docClass\">KISSY.DOM.NodeType</a></p>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Methods</h3><div id='method-add' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-add' class='name expandable'>add</a>( <span class='pre'>selector, [context], [index]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>Add existing node list. ...</div><div class='long'><p>Add existing node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><div class='sub-desc'><p>Selector string or html string or common dom node.</p>\n</div></li><li><span class='pre'>context</span> : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a> (optional)<div class='sub-desc'><p>Search context for selector</p>\n</div></li><li><span class='pre'>index</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> (optional)<div class='sub-desc'><p>Insert position.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-all' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-all' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-all' class='name expandable'>all</a>( <span class='pre'>selector</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>Get node list which are descendants of current node list. ...</div><div class='long'><p>Get node list which are descendants of current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Selector string</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-append' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/override.html#KISSY-NodeList-method-append' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-append' class='name expandable'>append</a>( <span class='pre'>newNodes</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Insert every element in the set of newNodes to the end of every element in the set of current node list. ...</div><div class='long'><p>Insert every element in the set of newNodes to the end of every element in the set of current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newNodes</span> : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><div class='sub-desc'><p>Nodes to be inserted</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-each' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-each' class='name expandable'>each</a>( <span class='pre'>fn, [context]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>Applies the given function to each Node in the NodeList. ...</div><div class='long'><p>Applies the given function to each Node in the NodeList.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>The function to apply. It receives 3 arguments:\nthe current node instance, the node's index,\nand the NodeList instance</p>\n</div></li><li><span class='pre'>context</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>An optional context to\napply the function with Default context is the current NodeList instance</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-end' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-end' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-end' class='name expandable'>end</a>( <span class='pre'></span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>return last stack node list. ...</div><div class='long'><p>return last stack node list.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-fadeIn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-fadeIn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-fadeIn' class='name expandable'>fadeIn</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>animate fadeIn effect for current node list. ...</div><div class='long'><p>animate fadeIn effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-fadeOut' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-fadeOut' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-fadeOut' class='name expandable'>fadeOut</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>animate fadeOut effect for current node list. ...</div><div class='long'><p>animate fadeOut effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-fadeToggle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-fadeToggle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-fadeToggle' class='name expandable'>fadeToggle</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>toggle fadeIn and fadeOut effect for current node list. ...</div><div class='long'><p>toggle fadeIn and fadeOut effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-getDOMNode' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-getDOMNode' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-getDOMNode' class='name expandable'>getDOMNode</a>( <span class='pre'></span> ) : HTMLElement</div><div class='description'><div class='short'>Retrieves the DOMNode. ...</div><div class='long'><p>Retrieves the DOMNode.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>HTMLElement</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDOMNodes' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-getDOMNodes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-getDOMNodes' class='name expandable'>getDOMNodes</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Retrieves the DOMNodes. ...</div><div class='long'><p>Retrieves the DOMNodes.</p>\n</div></div></div><div id='method-hide' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-hide' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-hide' class='name expandable'>hide</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>animate hide effect for current node list. ...</div><div class='long'><p>animate hide effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-item' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-item' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-item' class='name expandable'>item</a>( <span class='pre'>index</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>Get one node at index ...</div><div class='long'><p>Get one node at index</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>Index position.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-one' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-one' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-one' class='name expandable'>one</a>( <span class='pre'>selector</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>Get node list which match selector under current node list sub tree. ...</div><div class='long'><p>Get node list which match selector under current node list sub tree.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-prepend' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/override.html#KISSY-NodeList-method-prepend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-prepend' class='name expandable'>prepend</a>( <span class='pre'>newNodes</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>Insert every element in the set of newNodes to the beginning of every element in the set of current node list. ...</div><div class='long'><p>Insert every element in the set of newNodes to the beginning of every element in the set of current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newNodes</span> : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><div class='sub-desc'><p>Nodes to be inserted</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-show' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-show' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-show' class='name expandable'>show</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>animate show effect for current node list. ...</div><div class='long'><p>animate show effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-slice' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-method-slice' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-slice' class='name expandable'>slice</a>( <span class='pre'>start, end</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></div><div class='description'><div class='short'>Get part of node list. ...</div><div class='long'><p>Get part of node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>start</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>Start position.</p>\n</div></li><li><span class='pre'>end</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">number</a><div class='sub-desc'><p>End position.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-slideDown' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-slideDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-slideDown' class='name expandable'>slideDown</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>animate slideDown effect for current node list. ...</div><div class='long'><p>animate slideDown effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-slideToggle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-slideToggle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-slideToggle' class='name expandable'>slideToggle</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>toggle slideUp and slideDown effect for current node list. ...</div><div class='long'><p>toggle slideUp and slideDown effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-slideUp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-slideUp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-slideUp' class='name expandable'>slideUp</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>animate slideUp effect for current node list. ...</div><div class='long'><p>animate slideUp effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-toggle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/anim2.html#KISSY-NodeList-method-toggle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-method-toggle' class='name expandable'>toggle</a>( <span class='pre'>duration, [complete], [easing]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='chainable signature' >chainable</strong></div><div class='description'><div class='short'>toggle show and hide effect for current node list. ...</div><div class='long'><p>toggle show and hide effect for current node list.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>duration</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>duration of effect</p>\n</div></li><li><span class='pre'>complete</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>callback function on anim complete.</p>\n</div></li><li><span class='pre'>easing</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>easing type or custom function.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-all' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-static-method-all' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-static-method-all' class='name expandable'>all</a>( <span class='pre'>selector, [context]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='static signature' >static</strong></div><div class='description'><div class='short'>Get node list from selector or construct new node list from html string. ...</div><div class='long'><p>Get node list from selector or construct new node list from html string.\nCan also called from KISSY.all</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><div class='sub-desc'><p>Selector string or html string or common dom node.</p>\n</div></li><li><span class='pre'>context</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a> (optional)<div class='sub-desc'><p>Search context for selector</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='static-method-one' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.NodeList'>KISSY.NodeList</span><br/><a href='source/base10.html#KISSY-NodeList-static-method-one' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.NodeList-static-method-one' class='name expandable'>one</a>( <span class='pre'>selector, [context]</span> ) : <a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><strong class='static signature' >static</strong></div><div class='description'><div class='short'>Get node list with length of one\nfrom selector or construct new node list from html string. ...</div><div class='long'><p>Get node list with length of one\nfrom selector or construct new node list from html string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>selector</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a><div class='sub-desc'><p>Selector string or html string or common dom node.</p>\n</div></li><li><span class='pre'>context</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>|<a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a> (optional)<div class='sub-desc'><p>Search context for selector</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KISSY.NodeList\" rel=\"KISSY.NodeList\" class=\"docClass\">KISSY.NodeList</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});