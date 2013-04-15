Ext.data.JsonP.KISSY_Event_Object({"tagname":"class","name":"KISSY.Event.Object","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"private":true},"private":true,"id":"class-KISSY.Event.Object","members":{"cfg":[],"property":[{"name":"type","tagname":"property","owner":"KISSY.Event.Object","meta":{},"id":"property-type"}],"method":[{"name":"halt","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-halt"},{"name":"isDefaultPrevented","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-isDefaultPrevented"},{"name":"isImmediatePropagationStopped","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-isImmediatePropagationStopped"},{"name":"isPropagationStopped","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-isPropagationStopped"},{"name":"preventDefault","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-preventDefault"},{"name":"stopImmediatePropagation","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-stopImmediatePropagation"},{"name":"stopPropagation","tagname":"method","owner":"KISSY.Event.Object","meta":{},"id":"method-stopPropagation"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":14,"files":[{"filename":"object.js","href":"object2.html#KISSY-Event-Object"}],"html_meta":{"private":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":["KISSY.Event.CustomEventObject","KISSY.Event.DOMEventObject"],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/KISSY.Event.CustomEventObject' rel='KISSY.Event.CustomEventObject' class='docClass'>KISSY.Event.CustomEventObject</a></div><div class='dependency'><a href='#!/api/KISSY.Event.DOMEventObject' rel='KISSY.Event.DOMEventObject' class='docClass'>KISSY.Event.DOMEventObject</a></div><h4>Files</h4><div class='dependency'><a href='source/object2.html#KISSY-Event-Object' target='_blank'>object.js</a></div></pre><div class='doc-contents'><p class='private'><strong>NOTE</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p><p>KISSY 's base event object for custom and dom event.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-type' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-property-type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-property-type' class='name not-expandable'>type</a><span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'><p>current event type</p>\n</div><div class='long'><p>current event type</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-halt' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-halt' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-halt' class='name expandable'>halt</a>( <span class='pre'>[immediate]</span> )</div><div class='description'><div class='short'>Stops the event propagation and prevents the default\nevent behavior. ...</div><div class='long'><p>Stops the event propagation and prevents the default\nevent behavior.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>immediate</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a> (optional)<div class='sub-desc'><p>if true additional listeners on the current target will not be executed</p>\n</div></li></ul></div></div></div><div id='method-isDefaultPrevented' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-isDefaultPrevented' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-isDefaultPrevented' class='name expandable'>isDefaultPrevented</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Flag for preventDefault that is modified during fire event. ...</div><div class='long'><p>Flag for preventDefault that is modified during fire event. if it is true, the default behavior for this event will be executed.</p>\n</div></div></div><div id='method-isImmediatePropagationStopped' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-isImmediatePropagationStopped' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-isImmediatePropagationStopped' class='name expandable'>isImmediatePropagationStopped</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Flag for stopImmediatePropagation that is modified during fire event. ...</div><div class='long'><p>Flag for stopImmediatePropagation that is modified during fire event. true means to stop propagation to bubble targets and other listener.</p>\n</div></div></div><div id='method-isPropagationStopped' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-isPropagationStopped' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-isPropagationStopped' class='name expandable'>isPropagationStopped</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Flag for stopPropagation that is modified during fire event. ...</div><div class='long'><p>Flag for stopPropagation that is modified during fire event. true means to stop propagation to bubble targets.</p>\n</div></div></div><div id='method-preventDefault' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-preventDefault' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-preventDefault' class='name expandable'>preventDefault</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Prevents the event's default behavior ...</div><div class='long'><p>Prevents the event's default behavior</p>\n</div></div></div><div id='method-stopImmediatePropagation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-stopImmediatePropagation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-stopImmediatePropagation' class='name expandable'>stopImmediatePropagation</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Stops the propagation to the next bubble target and\nprevents any additional listeners from being executed\non the curr...</div><div class='long'><p>Stops the propagation to the next bubble target and\nprevents any additional listeners from being executed\non the current target.</p>\n</div></div></div><div id='method-stopPropagation' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KISSY.Event.Object'>KISSY.Event.Object</span><br/><a href='source/object2.html#KISSY-Event-Object-method-stopPropagation' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KISSY.Event.Object-method-stopPropagation' class='name expandable'>stopPropagation</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Stops the propagation to the next bubble target ...</div><div class='long'><p>Stops the propagation to the next bubble target</p>\n</div></div></div></div></div></div></div>"});