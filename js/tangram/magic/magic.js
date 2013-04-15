if(typeof magic != "function"){
    var magic = function(){
    	// TODO: 
    };
}

magic.resourcePath = "";
magic.skinName = "default";
magic.version = "1.0.2.2";

/msie 6/i.test(navigator.userAgent) && 
document.execCommand("BackgroundImageCache", false, true);

// Copyright (c) 2009-2012, Baidu Inc. All rights reserved.
//
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://tangram.baidu.com/license.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


















var T, baidu = T = baidu || function(q, c) { return baidu.dom ? baidu.dom(q, c) : null; };

if( !window.baidu )
	window.baidu = window.T = T;

baidu.version = "2.0.1.0";
baidu.guid = "$BAIDU$";
baidu.key = "tangram_guid";

// Tangram 可能被放在闭包中
// 一些页面级别唯一的属性，需要挂载在 window[baidu.guid]上

var _ = window[ baidu.guid ] = window[ baidu.guid ] || {};
(_.versions || (_.versions = [])).push(baidu.version);

// 20120709 mz 添加参数类型检查器，对参数做类型检测保护
baidu.check = baidu.check || function(){};







 
baidu.lang = baidu.lang || {};






 
baidu.forEach = function( enumerable, iterator, context ) {
    var i, n, t;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
        if ( typeof n == "number" ) {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for ( i=0; i<n; i++ ) {

                t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));

                // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                iterator.call( context || null, t, i, enumerable );
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                iterator.call( context || null, i, i, i);
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    iterator.call( context || null, enumerable[ i ], i, enumerable );
                }
            }
        }
    }

    return enumerable;
};




baidu.type = (function() {
    var objectType = {},
        nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        str = "Array Boolean Date Error Function Number RegExp String",
        retryType = {'object': 1, 'function': '1'},//解决safari对于childNodes算为function的问题
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    baidu.forEach(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();

        baidu[ "is" + name ] = function ( unknow ) {
            return baidu.type(unknow) == name.toLowerCase();
        }
    });

    // 方法主体
    return function ( unknow ) {
        var s = typeof unknow;
        return !retryType[s] ? s
            : unknow == null ? "null"
            : unknow._type_
                || objectType[ toString.call( unknow ) ]
                || nodeType[ unknow.nodeType ]
                || ( unknow == unknow.window ? "Window" : "" )
                || "object";
    };
})();

// extend
baidu.isDate = function( unknow ) {
    return baidu.type(unknow) == "date" && unknow.toString() != 'Invalid Date' && !isNaN(unknow);
};

baidu.isElement = function( unknow ) {
    return baidu.type(unknow) == "HTMLElement";
};

// 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
baidu.isEnumerable = function( unknow ){
    return unknow != null
        && (typeof unknow == "object" || ~Object.prototype.toString.call( unknow ).indexOf( "NodeList" ))
    &&(typeof unknow.length == "number"
    || typeof unknow.byteLength == "number"     //ArrayBuffer
    || typeof unknow[0] != "undefined");
};
baidu.isNumber = function( unknow ) {
    return baidu.type(unknow) == "number" && isFinite( unknow );
};

// 20120903 mz 检查对象是否为一个简单对象 {}
baidu.isPlainObject = function(unknow) {
    var key,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    if ( baidu.type(unknow) != "object" ) {
        return false;
    }

    //判断new fn()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( unknow.constructor &&
        !hasOwnProperty.call(unknow, "constructor") &&
        !hasOwnProperty.call(unknow.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in unknow ) {}
    return key === undefined || hasOwnProperty.call( unknow, key );
};

baidu.isObject = function( unknow ) {
    return typeof unknow === "function" || ( typeof unknow === "object" && unknow != null );
};









baidu.global = baidu.global || (function() {
    var me = baidu._global_ = window[ baidu.guid ],
        // 20121116 mz 在多个tangram同时加载时有互相覆写的风险
        global = me._ = me._ || {};

    return function( key, value, overwrite ) {
        if ( typeof value != "undefined" ) {
            overwrite || ( value = typeof global[ key ] == "undefined" ? value : global[ key ] );
            global[ key ] =  value;

        } else if (key && typeof global[ key ] == "undefined" ) {
            global[ key ] = {};
        }

        return global[ key ];
    }
})();












baidu.extend = function(depthClone, object) {
    var second, options, key, src, copy,
        i = 1,
        n = arguments.length,
        result = depthClone || {},
        copyIsArray, clone;
    
    baidu.isBoolean( depthClone ) && (i = 2) && (result = object || {});
    !baidu.isObject( result ) && (result = {});

    for (; i<n; i++) {
        options = arguments[i];
        if( baidu.isObject(options) ) {
            for( key in options ) {
                src = result[key];
                copy = options[key];
                // Prevent never-ending loop
                if ( src === copy ) {
                    continue;
                }
                
                if(baidu.isBoolean(depthClone) && depthClone && copy
                    && (baidu.isPlainObject(copy) || (copyIsArray = baidu.isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && baidu.isArray(src) ? src : [];
                        }else{
                            clone = src && baidu.isPlainObject(src) ? src : {};
                        }
                        result[key] = baidu.extend(depthClone, clone, copy);
                }else if(copy !== undefined){
                    result[key] = copy;
                }
            }
        }
    }
    return result;
};





baidu.browser = baidu.browser || function(){
    var ua = navigator.userAgent;
    
    var result = {
        isStrict : document.compatMode == "CSS1Compat"
        ,isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua)
        ,isWebkit: /webkit/i.test(ua)
    };

    try{/(\d+\.\d+)/.test(external.max_version) && (result.maxthon = + RegExp['\x241'])} catch (e){};

    // 蛋疼 你懂的
    switch (true) {
        case /msie (\d+\.\d+)/i.test(ua) :
            result.ie = document.documentMode || + RegExp['\x241'];
            break;
        case /chrome\/(\d+\.\d+)/i.test(ua) :
            result.chrome = + RegExp['\x241'];
            break;
        case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) :
            result.safari = + (RegExp['\x241'] || RegExp['\x242']);
            break;
        case /firefox\/(\d+\.\d+)/i.test(ua) : 
            result.firefox = + RegExp['\x241'];
            break;
        
        case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(ua) :
            result.opera = + ( RegExp["\x244"] || RegExp["\x241"] );
            break;
    }
           
    baidu.extend(baidu, result);

    return result;
}();




baidu.id = function() {
    var maps = baidu.global("_maps_id")
        ,key = baidu.key;

    baidu.global("_counter", 1, true);

    return function( object, command ) {
        var e
            ,str_1= baidu.isString( object )
            ,obj_1= baidu.isObject( object )
            ,id = obj_1 ? object[ key ] : str_1 ? object : "";

        // 第二个参数为 String
        if ( baidu.isString( command ) ) {
            switch ( command ) {
            case "get" :
                return obj_1 ? id : maps[id];
            break;
            case "remove" :
            case "delete" :
                if ( e = maps[id] ) {
                    // 20120827 mz IE低版本给 element[key] 赋值时会写入DOM树，因此在移除的时候需要使用remove
                    if (baidu.isElement(e) && baidu.browser.ie < 7) {
                        e.removeAttribute(key);
                    } else {
                        delete e[ key ];
                    }
                    delete maps[ id ];
                }
                return id;
            break;
            case "decontrol" : 
                !(e = maps[id]) && obj_1 && ( object[ key ] = id = baidu.id() );
                id && delete maps[ id ];
                return id;
            break;
            default :
                if ( str_1 ) {
                    (e = maps[ id ]) && delete maps[ id ];
                    e && ( maps[ e[ key ] = command ] = e );
                } else if ( obj_1 ) {
                    id && delete maps[ id ];
                    maps[ object[ key ] = command ] = object;
                }
                return command;
            }
        }

        // 第一个参数不为空
        if ( obj_1 ) {
            !id && (maps[ object[ key ] = id = baidu.id() ] = object);
            return id;
        } else if ( str_1 ) {
            return maps[ object ];
        }

        return "TANGRAM__" + baidu._global_._._counter ++;
    };
}();

baidu.id.key = "tangram_guid";

//TODO: mz 20120827 在低版本IE做delete操作时直接 delete e[key] 可能出错，这里需要重新评估，重写














baidu.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = chainName=="dom"?"$DOM":"$"+chainName.charAt(0).toUpperCase()+chainName.substr(1);
    var slice = Array.prototype.slice;

    // 构建链头执行方法
    var chain = baidu[chainName] = baidu[chainName] || fn || function(object) {
        return baidu.extend(object, baidu[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function(extended) {
        var method;

        // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
        for (method in extended) {
            // 20121128 这个if判断是防止console按鸭子判断规则将本方法识别成数组
            if (method != "splice") {
                chain[method] = function() {
                    var id = arguments[0];

                    // 在新版接口中，ID选择器必须用 # 开头
                    chainName=="dom" && baidu.type(id)=="string" && (id = "#"+ id);

                    var object = chain(id);
                    var result = object[method].apply(object, slice.call(arguments, 1));

                    // 老版接口返回实体对象 getFirst
                    return baidu.type(result) == "$DOM" ? result.get(0) : result;
                }
            }
        }
        return baidu.extend(baidu[chainName].fn, extended);
    };

    // 创建 链头对象 构造器
    baidu[chainName][className] = baidu[chainName][className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = baidu[chainName][className].prototype;

    return chain;
};


baidu.overwrite = function(Class, list, fn) {
	for (var i = list.length - 1; i > -1; i--) {
		Class.prototype[list[i]] = fn(list[i]);
	}

	return Class;
};





baidu.createChain("event",

    // method
    function(){
        var lastEvt = {};
        return function( event, json ){
            switch( baidu.type( event ) ){
                // event
                case "object":
                    return lastEvt.originalEvent === event ? 
                        lastEvt : lastEvt = new baidu.event.$Event( event );

                case "$Event":
                    return event;

                // event type
                case "string" :
                    var e = new baidu.event.$Event( event );
                    if( typeof json == "object" ) 
                        baidu.forEach( e, json );
                    return e;
            }
        }
    }(),

    // constructor
    function( event ){
        var e, t, f;
        var me = this;

        this._type_ = "$Event";

        if( typeof event == "object" && event.type ){

            me.originalEvent = e = event;

            for( var name in e )
                if( typeof e[name] != "function" )
                    me[ name ] = e[ name ];

            if( e.extraData )
                baidu.extend( me, e.extraData );

            me.target = me.srcElement = e.srcElement || (
                ( t = e.target ) && ( t.nodeType == 3 ? t.parentNode : t )
            );

            me.relatedTarget = e.relatedTarget || (
                ( t = e.fromElement ) && ( t === me.target ? e.toElement : t )
            );

            me.keyCode = me.which = e.keyCode || e.which;

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if( !me.which && e.button !== undefined )
                me.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );

            var doc = document.documentElement, body = document.body;

            me.pageX = e.pageX || (
                e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)
            );

            me.pageY = e.pageY || (
                e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0)
            );

            me.data;
        }

        // event.type
        if( typeof event == "string" )
            this.type = event;

        // event.timeStamp
        this.timeStamp = new Date().getTime();
    }

).extend({
    stopPropagation : function() {
        var e = this.originalEvent;
        e && ( e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true );
    },

    preventDefault : function() {
        var e = this.originalEvent;
        e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );
    }
});









baidu.merge = function(first, second) {
    var i = first.length,
        j = 0;

    if ( typeof second.length === "number" ) {
        for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }

    } else {
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
};

















baidu.createChain("array", function(array){
    var pro = baidu.array.$Array.prototype
        ,ap = Array.prototype
        ,key;

    baidu.type( array ) != "array" && ( array = [] );

    for ( key in pro ) {
        ap[key] || (array[key] = pro[key]);
    }

    return array;
});

// 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
baidu.overwrite(baidu.array.$Array, "concat slice".split(" "), function(key) {
	return function() {
		return baidu.array( Array.prototype[key].apply(this, arguments) );
	}
});







baidu.array.extend({
    unique : function (fn) {
        var len = this.length,
            result = this.slice(0),
            i, datum;
            
        if ('function' != typeof fn) {
            fn = function (item1, item2) {
                return item1 === item2;
            };
        }
        
        // 从后往前双重循环比较
        // 如果两个元素相同，删除后一个
        while (--len > 0) {
            datum = result[len];
            i = len;
            while (i--) {
                if (fn(datum, result[i])) {
                    result.splice(len, 1);
                    break;
                }
            }
        }

        len = this.length = result.length;
        for ( i=0; i<len; i++ ) {
            this[ i ] = result[ i ];
        }

        return this;
    }
});




baidu.query = baidu.query || function(){
    var rId = /^(\w*)#([\w\-\$]+)$/
       ,rId0= /^#([\w\-\$]+)$/
       ,rTag = /^\w+$/
       ,rClass = /^(\w*)\.([\w\-\$]+)$/
       ,rComboClass = /^(\.[\w\-\$]+)+$/
       ,rDivider = /\s*,\s*/
       ,rSpace = /\s+/g
       ,slice = Array.prototype.slice;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var t, x, id, dom, tagName, className, arr, list, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1 || "*";

            // 本段代码效率很差，不过极少流程会走到这段
            baidu.forEach(context.getElementsByTagName(tagName), function(dom) {
                dom.id == id && array.push(dom);
            });

        // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            baidu.merge(array, context.getElementsByTagName(selector));

        // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;
            t = " " + className + " ";
            // bug: className: .a.b

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                    dom.className && ~(" " + dom.className + " ").indexOf(t) && (arr.push(dom));
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                baidu.forEach(arr, function(dom) {
                    dom.tagName.toUpperCase() === tagName && array.push(dom);
                });
            } else {
                baidu.merge(array, arr);
            }
        
        // IE 6 7 8 里组合样式名(.a.b)
        } else if (rComboClass.test(selector)) {
            list = selector.substr(1).split(".");

            baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                if (dom.className) {
                    t = " " + dom.className + " ";
                    x = true;

                    baidu.forEach(list, function(item){
                        ~t.indexOf(" "+ item +" ") || (x = false);
                    });

                    x && array.push(dom);
                }
            });
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    // @return ArrayLike
    function queryCombo(selector, context) {
        var a, s = selector, id = "__tangram__", array = [];

        // 在 #id 且没有 context 时取 getSingle，其它时 getAll
        if (!context && rId0.test(s) && (a=document.getElementById(s.substr(1)))) {
            return [a];
        }

        context = context || document;

        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        if (context.querySelectorAll) {
            // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
            if (context.nodeType == 1 && !context.id) {
                context.id = id;
                a = context.querySelectorAll("#" + id + " " + s);
                context.id = "";
            } else {
                a = context.querySelectorAll(s);
            }
            return a;
        } else {
            if (!~s.indexOf(" ")) {
                return query(s, context);
            }

            baidu.forEach(query(s.substr(0, s.indexOf(" ")), context), function(dom) { // 递归
                baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        }

        return array;
    }

    return function(selector, context, results) {
        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        selector = selector.replace(rSpace, " ");
        results && baidu.merge(arr, results) && (results.length = 0);

        baidu.forEach(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            baidu.merge(arr, queryCombo(item, context));
        });

        return baidu.merge(results || [], baidu.array(arr).unique());
    };
}();















baidu.createChain("dom",

// method function


function(selector, context) {
    var e, me = new baidu.dom.$DOM(context);

    // Handle $(""), $(null), or $(undefined)
    if (!selector) {
        return me;
    }

    // Handle $($DOM)
    if (selector._type_ == "$DOM") {
        return selector;

    // Handle $(DOMElement)
    } else if (selector.nodeType || selector == selector.window) {
        me[0] = selector;
        me.length = 1;
        return me;

    // Handle $(Array) or $(Collection) or $(NodeList)
    } else if (selector.length && me.toString.call(selector) != "[object String]") {
        return baidu.merge(me, selector);

    } else if (typeof selector == "string") {
        // HTMLString
        if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 2) {
            if ( baidu.dom.createElements ) {
                baidu.merge( me, baidu.dom.createElements( selector ) );
            }

        // baidu.query
        } else {
            baidu.query(selector, context, me);
        }
    
    // document.ready
    } else if (typeof selector == "function") {
        return me.ready ? me.ready(selector) : me;
    }

    return me;
},

// constructor
function(context) {
    this.length = 0;
    this._type_ = "$DOM";
    this.context = context || document;
}

).extend({


    
    size: function() {
        return this.length;
    }

    // 2012.11.27 mz 拥有 .length 和 .splice() 方法，console.log() 就认为该对象是 ArrayLike
    ,splice : function(){}

    
    ,get: function(index) {

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

    // 将 $DOM 转换成 Array(dom, dom, ...) 返回
    ,toArray: function(){
        return this.get();
    }

});






baidu.dom.extend({
    each : function (iterator) {
        baidu.check("function", "baidu.dom.each");
        var i, result,
            n = this.length;

        for (i=0; i<n; i++) {
            result = iterator.call( this[i], i, this[i], this );

            if ( result === false || result == "break" ) { break;}
        }

        return this;
    }
});

















baidu._util_ = baidu._util_ || {};


baidu._util_.eventBase = {};




void function( base, listener ){
	listener = base.listener = {};
	
	if( window.addEventListener )
	    listener.add = function( target, name, fn ){
	        target.addEventListener( name, fn, false );
	    };
	else if( window.attachEvent )
		listener.add = function( target, name, fn ){
	        target.attachEvent( "on" + name, fn );
	    };
}( baidu._util_.eventBase );


void function( base, be ){
	var I = baidu.id;
	var queue = base.queue = {};
	var attaCache = queue.attaCache = baidu.global( "eventQueueCache" );
    var listener = base.listener;

    queue.get = function( target, type, bindType, attachElements ){
        var id = I( target ), c;

        if( !attaCache[id] )
            attaCache[id] = {};

        c = attaCache[id];

        if( type ){
            if( !c[type] ){
                this.setupCall( target, type, bindType, c[ type ] = [], attachElements );
            }
            return c[type];
        }else return c;
    };

    queue.add = function( target, type, bindType, item, attachElements ){
    	this.get( target, type, bindType, attachElements ).push( item );
    };

    queue.remove = function( target, type, fn ){
        var arr, c;
        if( type ){
            var arr = this.get( target, type );
            if( fn ){
                for(var i = arr.length - 1; i >= 0; i --)
                	if( arr[i].orig == fn )
                		arr.splice( i, 1 );
            }else{
                arr.length = 0;
            }
        }else{
            var c = this.get( target );
            for(var i in c)
            	c[i].length = 0;
        }
    };

    queue.call = function( target, type, fnAry, e ){
        if( fnAry ){
            if( !fnAry.length )
                return ;

            var args = [].slice.call( arguments, 1 ), one = [];
                args.unshift( e = baidu.event( e || type ) );          
                e.type = type;

            if( !e.currentTarget )
                e.currentTarget = target;

            for( var i = 0, r, l = fnAry.length; i < l; i ++ )
                if(r = fnAry[i]){
                    r.pkg.apply( target, args );
                    if( r.one )
                        one.unshift( i );
                }

            if( one.length )
                for(var i = 0, l = one.length; i < l; i ++)
                    this.remove( target, type, fnAry[i].fn );
                
        }else{
            fnAry = this.get( target, type );
            this.call( target, type, fnAry, e );
        }
    };

    queue.setupCall = function(){
        var add = function( target, type, bindType, fnAry ){
            listener.add( target, bindType, function( e ){
                queue.call( target, type, fnAry, e );
            } );
        };
        return function( target, type, bindType, fnAry, attachElements ){
            if( !attachElements )
                add( target, type, bindType, fnAry );
            else{
                target = baidu.dom( attachElements, target );
                for(var i = 0, l = target.length; i < l; i ++)
                    add( target[i], type, bindType, fnAry );
            }
        };
    }();

}( baidu._util_.eventBase, baidu.event );


void function( base, be ){
    var queue = base.queue;
    var core = base.core = {};
    var special = be.special = {};
    var push = [].push;

    var findVestedEl = function( target, parents ){
        for( var i = 0, l = parents.length; i < l; i ++ )
        	if( parents.get(i).contains( target ) )
        		return parents[i];
    };

    core.build = function( target, name, fn, selector, data ){

    	var bindElements;
    	if( selector )
    	    bindElements = baidu.dom( selector, target );

        if( ( name in special ) && special[name].pack )
            fn = special[name].pack( fn );

        return function( e ){ // e is instance of baidu.event()
            var t = baidu.dom( e.target ), args = [ e ], bindElement;

            if( data && !e.data ) 
                e.data = data;
            if( e.triggerData )
                push.apply( args, e.triggerData );

            if( !bindElements )
                return e.result = fn.apply( target, args );

            for(var i = 0; i < 2; i ++){
            	if( bindElement = findVestedEl( e.target, bindElements ) )
            	    return e.result = fn.apply( bindElement, args );
            	bindElements = baidu.dom( selector, target );
            }
        };
    };

    core.add = function( target, type, fn, selector, data, one ){
		var pkg = this.build( target, type, fn, selector, data ), attachElements, bindType;
        bindType = type;
        if(type in special)
            attachElements = special[type].attachElements,
            bindType = special[type].bindType || type;
		queue.add( target, type, bindType, { type: type, pkg: pkg, orig: fn, one: one }, attachElements );
    };

    core.remove = function( target, type, fn, selector ){
        queue.remove( target, type, fn, selector );
    };

}( baidu._util_.eventBase, baidu.event );







baidu.dom.extend({
    on: function( events, selector, data, fn, _one ){
        var eb = baidu._util_.eventBase.core;
        // var specials = { mouseenter: 1, mouseleave: 1, focusin: 1, focusout: 1 };

        if( typeof selector == "object" && selector )
            fn = data,
            data = selector,
            selector = null;
        else if( typeof data == "function" )
            fn = data,
            data = null;
        else if( typeof selector == "function" )
            fn = selector,
            selector = data = null;

        if( typeof events == "string" ){
            events = events.split(/[ ,]+/);
            this.each(function(){
                baidu.forEach(events, function( event ){
                    // if( specials[ event ] )
                    //     baidu( this )[ event ]( data, fn );
                    // else
                    eb.add( this, event, fn, selector, data, _one );
                }, this);
            });
        }else if( typeof events == "object" ){
            if( fn )
                fn = null;
            baidu.forEach(events, function( fn, eventName ){
                this.on( eventName, selector, data, fn, _one );
            }, this);
        }

        return this;
    }

    // _on: function( name, data, fn ){
    //     var eb = baidu._util_.eventBase;
    //     this.each(function(){
    //         eb.add( this, name, fn, undefined, data );
    //     });
    //     return this;
    // }
});

/// support - magic Tangram 1.x Code Start
/// support magic - Tangram 1.x Code Start







baidu.dom.g = function(id) {
    if (!id) return null; //修改IE下baidu.dom.g(baidu.dom.g('dose_not_exist_id'))报错的bug，by Meizz, dengping
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

/// support magic - Tangram 1.x Code End

baidu.event.on = baidu.on = function( element, evtName, handler ){
    if( typeof element == "string" )
        element = baidu.dom.g( element );
    baidu.dom( element ).on( evtName.replace(/^\s*on/, ""), handler );
    return element;
};
/// support - magic Tangram 1.x Code End



(function(){
	magic.setup = magic.setup || function(el, Type, options){
		// 从HTML标签属性 tang-param 里分解出用户指定的参数
		var opt = parseAttr(el, "tang-param") || {};

		// 脚本里直接指定的参数权重要高于HTML标签属性里的tang-param
		for (var i in options) opt[i] = options[i];

		var ui = new Type(opt);
		ui.$mappingDom("", el);

		// 添加DOM元素直接调用实例方法的模式	20111205 meizz
		// tang-event="onclick:$.hide()"
		attachEvent(el, ui.guid);
		var doms = el.getElementsByTagName("*");
		for (var i = doms.length - 1; i >= 0; i--) {
			attachEvent(doms[i], ui.guid);
		};

		return ui;
	};

	// 解析DOM元素标签自定义属性值，返回 JSON 对象
	function parseAttr(el, attr) {
		var str = el.getAttribute(attr), keys, json = false;

		if (str && (keys = str.match(reg[0]))) {
			json = {};
			for (var i = 0, a; i < keys.length; i++) {
				a = keys[i].match(reg[1]);

				// Number类型的处理
				!isNaN(a[2]) && (a[2] = +a[2]);

				// 去引号
				reg[2].test(a[2]) && (a[2] = a[2].replace(reg[3], "\x242"));

				// Boolean类型的处理
				reg[4].test(a[2]) && (a[2] = reg[5].test(a[2]));

				json[a[1]] = a[2];
			};
		}
		return json;
	}
	var reg = [
		/\b[\w\$\-]+\s*:\s*[^;]+/g 		
		,/([\w\$\-]+)\s*:\s*([^;]+)\s*/	
		,/\'|\"/ 						
		,/^\s*(\'|\")([^\1]*)\1\s*/		
		,/^(true|false)\s*$/i			
		,/\btrue\b/i 					
	]

	// 解析 DOM 元素标签属性 tang-event ，动态绑定事件
	function attachEvent(el, guid) {
		var json = parseAttr(el, "tang-event");
		if (json) {
			for (var i in json) {
				var method = json[i].substr(1);
				// 如果用户已经指定参数，有效
				method.indexOf("(") < 0 && (method += "()");
				baidu.dom(el).on(i, new Function("baiduInstance('"+guid+"') && baiduInstance('"+guid+"')"+method));
			}
		}
	}
})();










baidu.array.extend({
    indexOf : function (match, fromIndex) {
        baidu.check(".+(,number)?","baidu.array.indexOf");
        var len = this.length;

        // 小于 0
        (fromIndex = fromIndex | 0) < 0 && (fromIndex = Math.max(0, len + fromIndex));

        for ( ; fromIndex < len; fromIndex++) {
            if(fromIndex in this && this[fromIndex] === match) {
                return fromIndex;
            }
        }
        
        return -1;
    }
});







baidu.array.extend({
    contains : function (item) {
        return !!~this.indexOf(item);
    }
});
















baidu.createChain('string',
    // 执行方法
    function(string){
        var type = baidu.type(string),
            str = new String(~'string|number'.indexOf(type) ? string : type),
            pro = String.prototype;
        baidu.forEach(baidu.string.$String.prototype, function(fn, key) {
            pro[key] || (str[key] = fn);
        });
        return str;
    }
);






baidu.string.extend({
    trim: function(){
        var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
        return function(){
            return this.replace(trimer, '');
        }
    }()
});


baidu.dom.extend({
    addClass: function( value ){

        if( !arguments.length )
            return this;

        var t = typeof value, b = " ";

        if( t == "string" ){
            value = baidu.string.trim(value);
            
            var arr = value.split(" ");

            baidu.forEach( this, function(item, index){
                var str = item.className;
                
                for(var i = 0; i < arr.length; i ++)
                    if(!~(b + str + b).indexOf(b + arr[i] + b))
                        str += " " + arr[i];
                
                item.className = str.replace(/^\s+/g, "");
            } );
        }else if( t == "function" )
            baidu.forEach(this, function(item, index){
                baidu.dom(item).addClass(value.call(item, index, item.className));
            });

        return this;
    }
});










baidu.dom.extend({
    removeClass: function(value){

        var type = typeof value, b = " ";

        if( !arguments.length )
            baidu.forEach(this, function(item){
                item.className = "";
            });

        if( type == "string" ){
            value = baidu.string.trim(value);
            var arr = value.split(" ");

            baidu.forEach(this, function(item){
                var str = item.className ;
                for(var i = 0; i < arr.length; i ++)
                    while(~(b + str + b).indexOf(b + arr[i] + b))
                       str = (b + str + b).replace(b + arr[i] + b, b);
                item.className = baidu.string.trim(str);
            });

        }else if(type == "function"){
            baidu.forEach(this, function(item, index ,className){
                baidu.dom(item).removeClass(value.call(item, index, item.className));
            }); 
        }

        return this;
    }
});





baidu._util_.contains = document.compareDocumentPosition ?
    function(container, contained){
        return !!(container.compareDocumentPosition( contained ) & 16);
    } : document.contains ? function(container, contained){
        return container != contained
            && (container.contains ? container.contains( contained ) : false)
    } : function(container, contained){
        while(contained = contained.parentNode){
            if(contained === container){return true;}
        }
        return false;
    };



 
baidu.dom.extend({
    contains : function(contained) {
        var container = this[0];
            contained = baidu.dom(contained)[0];
        if(!container || !contained){return false;}
        return baidu._util_.contains(container, contained);
    }	
});





/// Tangram 1.x Code Start

baidu.dom._g = function(id){
    return baidu.type(id) === 'string' ? document.getElementById(id) : id;
}
/// Tangram 1.x Code End


/// Tangram 1.x Code Start
baidu.dom.contains = function (container, contained) {
    var g = baidu.dom._g;
    return baidu._util_.contains(g(container), g(contained));
};
/// Tangram 1.x Code End










baidu._util_.access = function(tang, key, value, callback, pass){
    if(tang.size() <= 0){return tang;}
    switch(baidu.type(key)){
        case 'string': //高频
            if(value === undefined){
                return callback.call(tang, tang[0], key);
            }else{
                tang.each(function(index, item){
                    callback.call(tang, item, key,
                        (baidu.type(value) === 'function' ? value.call(item, index, callback.call(tang, item, key)) : value),
                        pass);
                });
            }
            break;
        case 'object':
            for(var i in key){
                baidu._util_.access(tang, i, key[i], callback, value);
            }
            break;
    }
    return tang;
};



baidu._util_.nodeName = function(ele, nodeName){
    return ele.nodeName && ele.nodeName.toLowerCase() === nodeName.toLowerCase();
};



baidu._util_.propFixer = {
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'classname': 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable',
    
    
    //rboolean在baidu._util_.removeAttr 和 baidu._util_.attr中需要被共同使用
    rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
};
// IE6/7 call enctype encoding
!document.createElement('form').enctype
    && (baidu._util_.propFixer.enctype = 'encoding');

//Sizzle.isXML


baidu._util_.isXML = function(ele) {
    var docElem = (ele ? ele.ownerDocument || ele : 0).documentElement;
    return docElem ? docElem.nodeName !== 'HTML' : false;
};

baidu._util_.prop = function(){
    var rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea|)$/i,
        select = document.createElement('select'),
        opt = select.appendChild(document.createElement('option')),
        propHooks = {
            tabIndex: {
                get: function(ele){
                    var attrNode = ele.getAttributeNode('tabindex');
                    return attrNode && attrNode.specified ? parseInt(attrNode.value, 10)
                        : rfocusable.test(ele.nodeName) || rclickable.test(ele.nodeName)
                            && ele.href ? 0 : undefined;
                }
            }
        };
        !opt.selected && (propHooks.selected = {
            get: function(ele){
                var par = ele.parentNode;
                if(par){
                    par.selectedIndex;
                    par.parentNode && par.parentNode.selectedIndex;
                }
                return null;
            }
        });
        select = opt = null;
    
    return function(ele, key, val){
        var nType = ele.nodeType,
            hooks, ret;
        if(!ele || ~'238'.indexOf(nType)){return;}
        if(nType !== 1 || !baidu._util_.isXML(ele)){
            key = baidu._util_.propFixer[key] || key;
            hooks = propHooks[key] || {};
        }
        if(val !== undefined){
            if(hooks.set && (ret = hooks.set(ele, key, val)) !== undefined){
                return ret;
            }else{
                return (ele[key] = val);
            }
        }else{
            if(hooks.get && (ret = hooks.get(ele, key)) !== null){
                return ret;
            }else{
                return ele[key];
            }
        }
    }
}();





baidu._util_.support = baidu._util_.support || function(){
    var div = document.createElement('div'),
        baseSupport, a, input, select, opt;
    div.setAttribute('className', 't');
    div.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
    a = div.getElementsByTagName('A')[0];
    a.style.cssText = 'top:1px;float:left;opacity:.5';
    select = document.createElement('select');
    opt = select.appendChild(document.createElement('option'));
    input = div.getElementsByTagName('input')[0];
    input.checked = true;
    
    baseSupport = {
        dom: {
            div: div,
            a: a,
            select: select,
            opt: opt,
            input: input
        }
//        radioValue: only import by baidu._util.attr
//        hrefNormalized: only import by baidu._util.attr
//        style: only import by baidu._util.attr
//        optDisabled: only import by baidu.dom.val
//        checkOn: only import by baidu.dom.val
//        noCloneEvent: only import by baidu.dom.clone
//        noCloneChecked: only import by baidu.dom.clone
//        cssFloat: only import baidu.dom.styleFixer
//        htmlSerialize: only import baidu.dom.html
//        leadingWhitespace: only import baidu.dom.html
    };
    return baseSupport;
}();

baidu._util_.support.getSetAttribute = baidu._util_.support.dom.div.className !== 't';

baidu._util_.nodeHook = function(){
    if(baidu._util_.support.getSetAttribute){return;}
    var fixSpecified = {};
    fixSpecified.name = fixSpecified.id = fixSpecified.coords = true;
    return {
        get: function(ele, key){
            var ret = ele.getAttributeNode(key);
            return ret && (fixSpecified[key] ? ret.value !== '' : ret.specified) ?
                 ret.value : undefined;
        },
        set: function(ele, key, val){
            // Set the existing or create a new attribute node
            var ret = ele.getAttributeNode(key);
            if(!ret){
                ret = document.createAttribute(key);
                ele.setAttributeNode(ret);
            }
            return (ret.value = val + '');
        }
    };
}();










baidu._util_.removeAttr = function(){
    var propFixer = baidu._util_.propFixer,
        core_rspace = /\s+/,
        getSetAttribute = baidu._util_.support.getSetAttribute;
    return function(ele, key){
        if(!key || ele.nodeType !==1){return;}
        var array = key.split(core_rspace),
            propName, isBool;
        for(var i = 0, attrName; attrName = array[i]; i++){
            propName = propFixer[attrName] || attrName;
            isBool = propFixer.rboolean.test(attrName);
            !isBool && baidu._util_.attr(ele, attrName, '');
            ele.removeAttribute(getSetAttribute ? attrName : propName);
            isBool && (propName in ele) && (ele[propName] = false);
        }
    }
}();



baidu._util_.attr = function(){
    var util = baidu._util_,
        rtype = /^(?:button|input)$/i,
        supportDom = util.support.dom,
        radioValue = supportDom.input.value === 't',
        hrefNormalized = supportDom.a.getAttribute('href') === '/a',
        style = /top/.test(supportDom.a.getAttribute('style')),
        nodeHook = util.nodeHook,
        attrFixer = {
            className: 'class'
        },
        boolHook = {//处理对属性值是布尔值的情况
            get: function(ele, key){
                var val = util.prop(ele, key), attrNode;
                return val === true || typeof val !== 'boolean'
                    && (attrNode = ele.getAttributeNode(key))
                    && attrNode.nodeValue !== false ? key.toLowerCase() : undefined;
            },
            set: function(ele, key, val){
                if(val === false){
                    util.removeAttr(ele, key);
                }else{
                    var propName = util.propFixer[key] || key;
                    (propName in ele) && (ele[propName] = true);
                    ele.setAttribute(key, key.toLowerCase());
                }
                return key;
            }
        },
        attrHooks = {
            type: {
                set: function(ele, key, val){
                    // We can't allow the type property to be changed (since it causes problems in IE)
                    if(rtype.test(ele.nodeName) && ele.parentNode){return val;}
                    if(!radioValue && val === 'radio' && util.nodeName(ele, 'input')){
                        var v = ele.value;
                        ele.setAttribute('type', val);
                        v && (ele.value = v);
                        return val;
                    }
                }
            },
            value: {
                get: function(ele, key){
                    if(nodeHook && util.nodeName(ele, 'button')){
                        return nodeHook.get(ele, key);
                    }
                    return key in ele ? ele.value : null;
                },
                set: function(ele, key, val){
                    if(nodeHook && util.nodeName(ele, 'button')){
                        return nodeHook.set(ele, key, val);
                    }
                    ele.value = val;
                }
            }
        };
    // Set width and height to auto instead of 0 on empty string
    // This is for removals
    if(!util.support.getSetAttribute){//
        baidu.forEach(['width', 'height'], function(item){
            attrHooks[item] = {
                set: function(ele, key, val){
                    if(val === ''){
                        ele.setAttribute(key, 'auto');
                        return val;
                    }
                }
            };
        });
        attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(ele, key, val){
                val === '' && (val = false);
                nodeHook.set(ele, key, val);
            }
        };
    }
    // Some attributes require a special call on IE
    if(!hrefNormalized){
        [ "href", "src", "width", "height" ]
        baidu.forEach(['href', 'src', 'width', 'height'], function(item){
            attrHooks[item] = {
                get: function(ele, key){
                    var ret = ele.getAttribute(key, 2);
                    return ret === null ? undefined : ret;
                }
            };
        });
    }
    if(!style){
        attrHooks.style = {
            get: function(ele){return ele.style.cssText.toLowerCase() || undefined;},
            set: function(ele, key, val){return (ele.style.cssText = val + '');}
        };
    }
    //attr
    return function(ele, key, val, pass){
        var nType = ele.nodeType,
            notxml = nType !== 1 || !util.isXML(ele),
            hooks, ret;
        if(!ele || ~'238'.indexOf(nType)){return;}
        if(pass && baidu.dom.fn[key]){
            return baidu.dom(ele)[key](val);
        }
        //if getAttribute is undefined, use prop interface
        if(notxml){
            key = attrFixer[key] || key.toLowerCase();
            hooks = attrHooks[key] || (util.propFixer.rboolean.test(key) ? boolHook : nodeHook);
        }
        if(val!== undefined){
            if(val === null){
                util.removeAttr(ele, key);
                return
            }else if(notxml && hooks && hooks.set && (ret = hooks.set(ele, key, val)) !== undefined){
                return ret;
            }else{
                ele.setAttribute(key, val + '');
                return val;
            }
        }else if(notxml && hooks && hooks.get && (ret = hooks.get(ele, key)) !== null){
            return ret;
        }else{
            ret = ele.getAttribute(key);
            return ret === null ? undefined : ret;
        }
   }
}();

baidu.dom.extend({
    attr: function(key, value){
        return baidu._util_.access(this, key, value, function(ele, key, val, pass){
            return baidu._util_.attr(ele, key, val, pass);
        });
    }
});

/// support magic - Tangram 1.x Code Start




/// support magic - Tangram 1.x Code Start








baidu.lang.Class = (function() {
    var instances = (baidu._global_ = window[baidu.guid])._instances_;
    instances || (instances = baidu._global_._instances_ = {});

    // constructor
    return function() {
        this.guid = baidu.id();
        this._decontrol_ || (instances[this.guid] = this);
    }
})();

baidu.lang.Class.prototype.dispose = function(){
    delete baidu._global_._instances_[this.guid];

    // this.__listeners && (for (var i in this.__listeners) delete this.__listeners[i]);

    for(var property in this){
        typeof this[property] != "function" && delete this[property];
    }
    this.disposed = true;   // 20100716
};


baidu.lang.Class.prototype.toString = function(){
    return "[object " + (this._type_ || this.__type || this._className || "Object") + "]";
};


 window["baiduInstance"] = function(guid) {
     return baidu._global_._instances_[ guid ];
 }

//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性
//  2011.11.22  meizz   废除 baidu.lang._instances 模块，由统一的global机制完成；

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start




/// support magic - Tangram 1.x Code Start








baidu.lang.guid = function() {
    return baidu.id();
};

//不直接使用window，可以提高3倍左右性能
//baidu.$$._counter = baidu.$$._counter || 1;


// 20111129    meizz    去除 _counter.toString(36) 这步运算，节约计算量
/// support magic - Tangram 1.x Code End







//baidu.lang.isString = function (source) {
//    return '[object String]' == Object.prototype.toString.call(source);
//};
baidu.lang.isString = baidu.isString;



baidu.lang.Event = function (type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
};
 

baidu.lang.Class.prototype.fire =
baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
    baidu.lang.isString(event) && (event = new baidu.lang.Event(event));

    !this.__listeners && (this.__listeners = {});

    // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
    options = options || {};
    for (var i in options) {
        event[i] = options[i];
    }

    var i, n, me = this, t = me.__listeners, p = event.type;
    event.target = event.target || (event.currentTarget = me);

    // 支持非 on 开头的事件名
    p.indexOf("on") && (p = "on" + p);

    typeof me[p] == "function" && me[p].apply(me, arguments);

    if (typeof t[p] == "object") {
        for (i=0, n=t[p].length; i<n; i++) {
            t[p][i] && t[p][i].apply(me, arguments);
        }
    }
    return event.returnValue;
};


baidu.lang.Class.prototype.on =
baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
    if (typeof handler != "function") {
        return;
    }

    !this.__listeners && (this.__listeners = {});

    var i, t = this.__listeners;

    type.indexOf("on") && (type = "on" + type);

    typeof t[type] != "object" && (t[type] = []);

    // 避免函数重复注册
    for (i = t[type].length - 1; i >= 0; i--) {
        if (t[type][i] === handler) return handler;
    };

    t[type].push(handler);

    // [TODO delete 2013] 2011.12.19 兼容老版本，2013删除此行
    key && typeof key == "string" && (t[type][key] = handler);

    return handler;
};

//  2011.12.19  meizz   很悲剧，第三个参数 key 还需要支持一段时间，以兼容老版本脚本
//  2011.11.24  meizz   事件添加监听方法 addEventListener 移除第三个参数 key，添加返回值 handler
//  2011.11.23  meizz   事件handler的存储对象由json改成array，以保证注册函数的执行顺序
//  2011.11.22  meizz   将 removeEventListener 方法分拆到 baidu.lang.Class.removeEventListener 中，以节约主程序代码

/// support magic - Tangram 1.x Code End




baidu.lang.createClass = function(constructor, options) {
    options = options || {};
    var superClass = options.superClass || baidu.lang.Class;

    // 创建新类的真构造器函数
    var fn = function(){
        var me = this;

        // 20101030 某类在添加该属性控制时，guid将不在全局instances里控制
        options.decontrolled && (me.__decontrolled = true);

        // 继承父类的构造器
        superClass.apply(me, arguments);

        // 全局配置
        for (i in fn.options) me[i] = fn.options[i];

        constructor.apply(me, arguments);

        for (var i=0, reg=fn["\x06r"]; reg && i<reg.length; i++) {
            reg[i].apply(me, arguments);
        }
    };

    // [TODO delete 2013] 放置全局配置，这个全局配置可以直接写到类里面
    fn.options = options.options || {};

    var C = function(){},
        cp = constructor.prototype;
    C.prototype = superClass.prototype;

    // 继承父类的原型（prototype)链
    var fp = fn.prototype = new C();

    // 继承传参进来的构造器的 prototype 不会丢
    for (var i in cp) fp[i] = cp[i];

    // 20111122 原className参数改名为type
    var type = options.className || options.type;
    typeof type == "string" && (fp.__type = type);

    // 修正这种继承方式带来的 constructor 混乱的问题
    fp.constructor = cp.constructor;

    // 给类扩展出一个静态方法，以代替 baidu.object.extend()
    fn.extend = function(json){
        for (var i in json) {
            fn.prototype[i] = json[i];
        }
        return fn;  // 这个静态方法也返回类对象本身
    };

    return fn;
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上

/// support magic - Tangram 1.x Code End




baidu.object = baidu.object || {};





//baidu.object.extend = function (target, source) {
//    for (var p in source) {
//        if (source.hasOwnProperty(p)) {
//            target[p] = source[p];
//        }
//    }
//    
//    return target;
//};
baidu.object.extend = baidu.extend;











//format(a,a,d,f,c,d,g,c);
baidu.string.extend({
    format : function (opts) {
    	var source = this.valueOf(),
            data = Array.prototype.slice.call(arguments,0), toString = Object.prototype.toString;
        if(data.length){
    	    data = data.length == 1 ? 
    	    	
    	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
    	    	: data;
        	return source.replace(/#\{(.+?)\}/g, function (match, key){
    	    	var replacer = data[key];
    	    	// chrome 下 typeof /a/ == 'function'
    	    	if('[object Function]' == toString.call(replacer)){
    	    		replacer = replacer(key);
    	    	}
    	    	return ('undefined' == typeof replacer ? '' : replacer);
        	});
        }
        return source;
    }
});









baidu.string.extend({
    encodeHTML : function () {
        return this.replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
    }
});







/// support magic - Tangram 1.x Code Start






baidu.lang.inherits = function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto.__type = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
};

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写
/// support magic - Tangram 1.x Code End



/// support magic - Tangram 1.x Code Start





 

baidu.lang.Class.prototype.un =
baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
    var i,
        t = this.__listeners;
    if (!t) return;

    // remove all event listener
    if (typeof type == "undefined") {
        for (i in t) {
            delete t[i];
        }
        return;
    }

    type.indexOf("on") && (type = "on" + type);

    // 移除某类事件监听
    if (typeof handler == "undefined") {
        delete t[type];
    } else if (t[type]) {
        // [TODO delete 2013] 支持按 key 删除注册的函数
        typeof handler=="string" && (handler=t[type][handler]) && delete t[type][handler];

        for (i = t[type].length - 1; i >= 0; i--) {
            if (t[type][i] === handler) {
                t[type].splice(i, 1);
            }
        }
    }
};

// 2011.12.19 meizz 为兼容老版本的按 key 删除，添加了一行代码
/// support magic - Tangram 1.x Code End



magic.Base = function(){
    baidu.lang.Class.call(this);

    this._ids = {};
    this._eid = this.guid +"__";
}
baidu.lang.inherits(magic.Base, baidu.lang.Class, "magic.Base").extend(

{
    
    getElement : function(id) {
        return document.getElementById(this.$getId(id));
    },

    
    getElements: function(){
        var result = {};
        var _ids = this._ids;
        for(var key in _ids)
            result[key] = this.getElement(key);
        return result;
    },

    
    $getId : function(key) {
        key = baidu.lang.isString(key) ? key : "";
        // 2012-3-23: 使 _ids 存入所以可能被建立映射的 key
        return this._ids[key] || (this._ids[key] = this._eid + key);
    }

    
    ,$mappingDom : function(key, dom){
        if (baidu.lang.isString(dom)) {
            this._ids[key] = dom;
        } else if (dom && dom.nodeType) {
            dom.id ? this._ids[key] = dom.id : dom.id = this.$getId(key);
        }
        return this;
    }

    
    ,$dispose : function() {
        this.fire("ondispose") && baidu.lang.Class.prototype.dispose.call(this);
    }
});

//  20120110    meizz   简化eid去掉其中的__type部分；事件派发使用fire方法替换原来 dispatchEvent
//  20111129    meizz   实例化效率大比拼
//                      new ui.Base()           效率为 1
//                      new ui.control.Layer()  效率为 2
//                      new ui.Dialog()         效率为 3.5





magic.control = magic.control || {};







baidu.dom.extend({
    getComputedStyle: function(key){
        var defaultView = this[0].ownerDocument.defaultView,
            computedStyle = defaultView && defaultView.getComputedStyle
                && defaultView.getComputedStyle(this[0], null),
            val = computedStyle ? (computedStyle.getPropertyValue(key) || computedStyle[key]) : '';
        return val || this[0].style[key];
    }
});



baidu.dom.extend({
    getCurrentStyle: function(){
        var css = document.documentElement.currentStyle ?
            function(key){return this[0].currentStyle ? this[0].currentStyle[key] : this[0].style[key];}
                : function(key){return this.getComputedStyle(key);}
        return function(key){
            return css.call(this, key);
        }
    }()
});
















baidu._util_.getWidthOrHeight = function(){
    var ret = {},
        cssShow = {position: 'absolute', visibility: 'hidden', display: 'block'},
        rdisplayswap = /^(none|table(?!-c[ea]).+)/;
    function swap(ele, options){
        var defaultVal = {};
        for(var i in options){
            defaultVal[i] = ele.style[i];
            ele.style[i] = options[i];
        }
        return defaultVal;
    }
    baidu.forEach(['Width', 'Height'], function(item){
        var cssExpand = {Width: ['Right', 'Left'], Height: ['Top', 'Bottom']}[item];
        ret['get' + item] = function(ele, extra){
            var tang = baidu.dom(ele),
                defaultValue = ele.offsetWidth === 0
                    && rdisplayswap.test(tang.getCurrentStyle('display'))
                    && (swap(ele, cssShow)),
                rect = ele['offset' + item] || parseInt(tang.getCurrentStyle(item.toLowerCase())),
                delString = 'padding|border';
            extra && baidu.forEach(extra.split('|'), function(val){
                if(!~delString.indexOf(val)){//if val is margin
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[0])) || 0;
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[1])) || 0;
                }else{//val is border or padding
                    delString = delString.replace(new RegExp('\\|?' + val + '\\|?'), '');
                }
            });
            delString && baidu.forEach(delString.split('|'), function(val){
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[0] + (val === 'border' ? 'Width' : ''))) || 0;
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[1] + (val === 'border' ? 'Width' : ''))) || 0;
            });
            defaultValue && swap(ele, defaultValue);
            return rect;
        }
    });
    //
    return function(ele, key, extra){
        return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
    }
}();










 //支持单词以“-_”分隔
 //todo:考虑以后去掉下划线支持？
baidu.string.extend({
    toCamelCase : function () {
    	var source = this.valueOf();
        //提前判断，提高getStyle等的效率 thanks xianwei
        if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
            return source;
        }
        return source.replace(/[-_][^-_]/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    }
});


baidu.dom.styleFixer = function(){
    var alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
        nonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        cssNumber = 'fillOpacity,fontWeight,opacity,orphans,widows,zIndex,zoom',
        anchor = baidu._util_.support.dom.a,
        cssProps = {
            'float': !!anchor.style.cssFloat ? 'cssFloat' : 'styleFloat'
        },
        cssMapping = {
            fontWeight: {normal: 400, bold: 700, bolder: 700, lighter: 100}
        },
        cssHooks = {
            opacity: {},
            width: {},
            height: {},
            fontWeight: {
                get: function(ele, key){
                    var ret = style.get(ele, key);
                    return cssMapping.fontWeight[ret] || ret;
                }
            }
        },
        style = {
            set: function(ele, key, val){ele.style[key] = val;}
        };
    baidu.extend(cssHooks.opacity, /^0.5/.test(anchor.style.opacity) ? {
        get: function(ele, key){
            var ret = baidu.dom(ele).getCurrentStyle(key);
            return ret === '' ? '1' : ret;
        }
    } : {
        get: function(ele){
            return alpha.test((ele.currentStyle || ele.style).filter || '') ? parseFloat(RegExp.$1) / 100 : '1';
        },
        set: function(ele, key, value){
            var filterString = (ele.currentStyle || ele.style).filter || '',
                opacityValue = value * 100;
                ele.style.zoom = 1;
                ele.style.filter = alpha.test(filterString) ? filterString.replace(alpha, 'Alpha(opacity=' + opacityValue)
                    : filterString + ' progid:dximagetransform.microsoft.Alpha(opacity='+ opacityValue +')';
        }
    });
    //
    baidu.forEach(['width', 'height'], function(item){
        cssHooks[item] = {
            get: function(ele){
                return baidu._util_.getWidthOrHeight(ele, item) + 'px';
            },
            set: function(ele, key, val){
                baidu.type(val) === 'number' && val < 0 && (val = 0);
                style.set(ele, key, val);
            }
        };
    });
    
    baidu.extend(style, document.documentElement.currentStyle? {
        get: function(ele, key){
            var val = baidu.dom(ele).getCurrentStyle(key),
                defaultLeft;
            if(nonpx.test(val)){
                defaultLeft = ele.style.left;
                ele.style.left = key === 'fontSize' ? '1em' : val;
                val = ele.style.pixelLeft + 'px';
                ele.style.left = defaultLeft;
            }
            return val;
        }
    } : {
        get: function(ele, key){
            return baidu.dom(ele).getCurrentStyle(key);
        }
    });
    
    //
    return function(ele, key, val){
        var origKey = baidu.string(key).toCamelCase(),
            method = val === undefined ? 'get' : 'set',
            origVal, hooks;
        origKey = cssProps[origKey] || origKey;
        origVal = baidu.type(val) === 'number' && !~cssNumber.indexOf(origKey) ? val + 'px' : val;
        hooks = cssHooks.hasOwnProperty(origKey) && cssHooks[origKey][method] || style[method];
        return hooks(ele, origKey, origVal);
    };
}();










baidu.dom.extend({
    css: function(key, value){
        baidu.check('^(?:(?:string(?:,(?:number|string|function))?)|object)$', 'baidu.dom.css');
        return baidu._util_.access(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        });
    }
});

/// support magic - Tangram 1.x Code Start








baidu.dom.setPixel = function (el, style, n) {
	typeof n != "undefined" &&
	(baidu.dom.g(el).style[style] = n +(!isNaN(n) ? "px" : ""));
};
/// support magic - Tangram 1.x Code End







magic.control.Layer = baidu.lang.createClass(function(setting){
    this.width = "auto";
    this.height= "auto";

    baidu.object.extend(this, setting||{});
},{
    type : "magic.control.Layer"
    ,superClass : magic.Base
})
.extend(

{
    
    show : function(){
        if (this.fire("onbeforeshow")) {
            this.getElement().style.display = "";
            this.fire("onshow");
        }
    }
    
    ,hide :  function(){
        if (this.fire("onbeforehide")) {
            this.getElement().style.display = "none";
            this.fire("onhide");
        }
    }

    
    ,setWidth :  function(width) {
        baidu.dom.setPixel(this.getElement(), "width",(this.width=width));
    }
	
    
    ,setHeight :  function(height) {
        baidu.dom.setPixel(this.getElement(), "height",(this.height=height));
    }
    
     
    ,setSize : function(size){
        this.setWidth(size.width || size[0]);
        this.setHeight(size.height||size[1]);
    }
});















baidu.dom.extend({
    off: function( events, selector, fn ){
        var eb = baidu._util_.eventBase.core, me = this;
        if( !events )
            baidu.forEach( this, function( item ){
                eb.remove( item );
            } );
        else if( typeof events == "string" ){
            if( typeof selector == "function" )
                fn = selector,
                selector = null;
            events = events.split(/[ ,]/);
            baidu.forEach( this, function( item ){
                baidu.forEach( events, function( event ){
                    eb.remove( item, event, fn, selector );
                });
            });
        }else if( typeof events == "object" )
            baidu.forEach( events, function(fn, event){
                me.off( event, selector, fn );
            } );

        return this;
    }
});

/// support - magic Tangram 1.x Code Start


baidu.event.un = baidu.un = function(element, evtName, handler){
    element = baidu.dom.g(element);
    baidu.dom(element).off(evtName.replace(/^\s*on/, ''), handler);
    return element;
 };
 /// support - magic Tangram 1.x Code End











baidu.dom.extend({
    getDocument: function(){
    	if(this.size()<=0){return undefined;}
        var ele = this[0];
        return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
    }
});




baidu.dom.extend({
    getWindow: function(){
        var doc = this.getDocument();
        return (this.size()<=0)? undefined :(doc.parentWindow || doc.defaultView);
    }
});















baidu.dom.extend({
    map : function (iterator) {
        baidu.check("function","baidu.dom.map");
        var me = this,
            td = baidu.dom();

        baidu.forEach(this, function( dom, index ){
            td[td.length ++] = iterator.call( dom, index, dom, dom );
        });

        return td;
    }
});





baidu.dom.extend({
    offsetParent: function(){
        return this.map(function(){
            var offsetParent = this.offsetParent || document.body,
                exclude = /^(?:body|html)$/i;
            while(offsetParent && baidu.dom(offsetParent).getCurrentStyle('position') === 'static'
                && !exclude.test(offsetParent.nodeName)){
                    offsetParent = offsetParent.offsetParent;
            }
            return offsetParent;
        });
    }
});




baidu.dom.extend({
    position: function(){
        if(this.size()<=0){return 0;}        
        var patrn = /^(?:body|html)$/i,
            coordinate = this.offset(),
            offsetParent = this.offsetParent(),
            parentCoor = patrn.test(offsetParent[0].nodeName) ? {left: 0, top: 0}
                : offsetParent.offset();
        coordinate.left -= parseFloat(this.getCurrentStyle('marginLeft')) || 0;
        coordinate.top -= parseFloat(this.getCurrentStyle('marginTop')) || 0;
        parentCoor.left += parseFloat(offsetParent.getCurrentStyle('borderLeftWidth')) || 0;
        parentCoor.top += parseFloat(offsetParent.getCurrentStyle('borderTopWidth')) || 0;
        return {
            left: coordinate.left - parentCoor.left,
            top: coordinate.top - parentCoor.top
        }
    }
});






baidu.dom.extend({
    offset: function(){
        var offset = {
            setOffset: function(ele, options, index){
                var tang = tang = baidu.dom(ele),
                    position = tang.getCurrentStyle('position');
                position === 'static' && (ele.style.position = 'relative');
                var currOffset = tang.offset(),
                    currLeft = tang.getCurrentStyle('left'),
                    currTop = tang.getCurrentStyle('top'),
                    calculatePosition = (~'absolute|fixed'.indexOf(position)) && ~('' + currLeft + currTop).indexOf('auto'),
                    curPosition = calculatePosition && tang.position();
                currLeft = curPosition && curPosition.left || parseFloat(currLeft) || 0;
                currTop = curPosition && curPosition.top || parseFloat(currTop) || 0;
                baidu.type('options') === 'function' && (options = options.call(ele, index, currOffset));
                options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
                options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
            },
            //
            bodyOffset: function(body){
                var tang = baidu.dom(body);
                return {
                    left: body.offsetLeft + parseFloat(tang.getCurrentStyle('marginLeft')) || 0,
                    top: body.offsetTop + parseFloat(tang.getCurrentStyle('marginTop')) || 0
                }
            }
        };
        
        return function(options){
            if(!options){
                var ele = this[0],
                    doc = this.getDocument(),
                    box = {left: 0, top: 0},
                    win, docElement, body;
                if(ele === doc.body){return offset.bodyOffset(ele, doc);}
                if (typeof ele.getBoundingClientRect !== 'undefined'){
                    box = ele.getBoundingClientRect();
                }
                win = this.getWindow();
                docElement = doc.documentElement;
                body = doc.body;
                return {
                    left: box.left + (win.pageXOffset || Math.max(docElement.scrollLeft, body.scrollLeft)) - (docElement.clientLeft || body.clientLeft),
                    top: box.top + (win.pageYOffset || Math.max(docElement.scrollTop, body.scrollTop)) - (docElement.clientTop || body.clientTop)
                };
            }else{
                baidu.check('^(?:object|function)$', 'baidu.dom.offset');
                for(var i = 0, item; item = this[i]; i++){
                    offset.setOffset(item, options, i);
                }
                return this;
           }
        }
    }()
});





/// support magic - Tangram 1.x Code Start






baidu.global.set = function(key, value, overwrite){
    return baidu.global(key, value, !overwrite);
}
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start






baidu.global.get = function(key){
    return baidu.global(key);
}
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start


/// support magic - Tangram 1.x Code Start





baidu.page = baidu.page || {};

/// support magic - Tangram 1.x Code End




//IE 8下，以documentMode为准
//在百度模板中，可能会有$，防止冲突，将$1 写成 \x241

//baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;



baidu.page.getViewHeight = function () {
    var doc = document,
        ie = baidu.browser.ie || 1;
        client = doc.compatMode === 'BackCompat'
            && ie < 9 ? doc.body : doc.documentElement;
        //ie9浏览器需要取得documentElement才能取得到正确的高度
    return client.clientHeight;
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start






baidu.page.getScrollTop = function () {
    var d = document;
    return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
};
/// support magic - Tangram 1.x Code End



magic.control.Popup = baidu.lang.createClass(function(options){
    var me = this;

    me.visible = false;
    me.autoHide = true;
    me.hideOnEscape = true;
    me.disposeOnHide = false;
    me.smartPosition = false;

    me.offsetX = 0;
    me.offsetY = 0;

    baidu.object.extend(this, options||{});
    
    // [private]
    me._parent = null;    // 可以多级 popup 嵌套
    me._host = null;    // 被绑定的DOM对象，作为定位

    me._init_control_popup();
}, {
    superClass: magic.control.Layer
    , type:"magic.control.Popup"
})
.extend(
    
    {
    	
    
    setContent : function(content){
        this.getElement("content").innerHTML = content;
    }
    
    
    ,attach : function(el, options) {
        if(baidu.dom(el).size()) {
            baidu.object.extend(this, options||{});

            this._host = baidu(el)[0];
            this.show();
        }
    }
    
    ,reposition : function(position){
        var me = this;
        !position && me._host && (position = baidu.dom(me._host).offset());
        if (position) {
            me.top = position.top + me.offsetY + me._host.offsetHeight;
            me.left= position.left+ me.offsetX;
            // 20120116 meizz
            me._resupinate = false;    // 向上翻转的
            if(me.smartPosition) {
                var oh = me.getElement().offsetHeight;    // popup.offsetHeight
                var ph = baidu.page.getViewHeight();    // 浏览器可视区域高
                var st = baidu.page.getScrollTop();        // 浏览器滚动条位置 Y
                var up = position.top-me.offsetY-oh;    // popup向上翻时的 top 值
                if(me.top+oh > st+ph && up > st && up < st+ph) {
                    me.top = position.top-me.offsetY-oh;
                    me._resupinate = true;
                }
            }
        }
        me.fire("reposition");
        me.setPosition([me.left, me.top]);
    }
	
    ,setPosition : function(position){
        this.setTop(position.top || position[1]);
        this.setLeft(position.left||position[0]);
    }
    
    ,setTop : function(top) {
        baidu.dom(this.getElement()).css("top", (this.top=top)+"px");
    }
    
    ,setLeft : function(left) {
        baidu.dom(this.getElement()).css("left", (this.left=left)+"px");
    }
    
    ,_init_control_popup : function(){
        var me = this;
        function resize(){me.reposition();}
        function escape(e){
            	e.keyCode == 27
                && me.hideOnEscape
                && me.autoHide
                && me.hide();
        }
        function protect(){
            var pp = me;
            do {prot[pp.guid] = true;}
            while(pp = pp._parent);
        }

        var list = baidu.global.get("popupList");
        var prot = baidu.global.get("popupProtect");
        me.on("show", function(){
            me.reposition();
            // 这句延迟是为了el.click->show()，doc.click->hide()导致popup不能显示的问题
            setTimeout(function(){me.guid && (list[me.guid] = true);}, 1);
            me._host && baidu.dom(me._host).on("click", protect);
            baidu.dom(me.getElement()).on("click", protect);
            baidu.dom(window).on("resize", resize);
            baidu.dom(document).on("keyup", escape);
            me.width!="auto" && me.setWidth(me.width);
            me.height!="auto" && me.setHeight(me.height);
            me.visible = true;
        });
        
        function hide(val){
            me.visible = false;
            delete list[me.guid];
            me._host && baidu.dom(me._host).off("click", protect);
            baidu.dom(me.getElement()).off("click", protect);
            baidu.dom(window).off("resize", resize);
            baidu.dom(document).off("keyup", escape);
            val && me.$dispose();
//            me.disposeOnHide && me.$dispose();
        }
        
        me.on('hide', function(){hide(me.disposeOnHide)});
        me.on('dispose', function(){hide(false)});
    }
});

// 页面全局管理 popup，自动隐藏
(function(){
    var list = baidu.global.set("popupList", {}, true);
    var protect = baidu.global.set("popupProtect", {}, true);

    function hide() {
        for (var guid in list) {
            var pop = baiduInstance(guid);
            !protect[guid] && pop.autoHide && pop.hide();
        }
        for (var guid in protect) delete protect[guid];
    }

    baidu.dom(window).on("resize", hide);
    baidu.dom(window).on("scroll", hide);
    baidu.dom(document).on("click", hide);
})();

// 20120114 meizz 支持多级嵌套，通过 _parent 指向到父级 popup













//baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;







baidu.dom.extend({
    insertHTML: function ( position, html) {
        element = this[0];
        var range,begin;
    
        //在opera中insertAdjacentHTML方法实现不标准，如果DOMNodeInserted方法被监听则无法一次插入多element
        //by lixiaopeng @ 2011-8-19
        if (element.insertAdjacentHTML && !baidu.browser.opera) {
            element.insertAdjacentHTML(position, html);
        } else {
            // 这里不做"undefined" != typeof(HTMLElement) && !window.opera判断，其它浏览器将出错？！
            // 但是其实做了判断，其它浏览器下等于这个函数就不能执行了
            range = element.ownerDocument.createRange();
            // FF下range的位置设置错误可能导致创建出来的fragment在插入dom树之后html结构乱掉
            // 改用range.insertNode来插入html, by wenyuxiang @ 2010-12-14.
            position = position.toUpperCase();
            if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
                range.selectNodeContents(element);
                range.collapse(position == 'AFTERBEGIN');
            } else {
                begin = position == 'BEFOREBEGIN';
                range[begin ? 'setStartBefore' : 'setEndAfter'](element);
                range.collapse(begin);
            }
            range.insertNode(range.createContextualFragment(html));
        }
        return element;
    }
});







/// support magic - Tangram 1.x Code Start










baidu.global.getZIndex = function(key, step) {
	var zi = baidu.global.get("zIndex");
	if (key) {
		zi[key] = zi[key] + (step || 1);
	}
	return zi[key];
};
baidu.global.set("zIndex", {popup : 50000, dialog : 1000}, true);
/// support magic - Tangram 1.x Code End












//baidu.browser.isStrict = document.compatMode == "CSS1Compat";










baidu.dom.extend({
    hasClass: function(value){
        //异常处理
        if(arguments.length <= 0 || typeof value === 'function'){
            return this;
        };
        
        if(this.size()<=0){
            return false;
        };

        //对输入进行处理
        value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
        var arr = value.split(' ');
        var result;
        baidu.forEach(this, function(item){
            var str = item.className;
            for(var i = 0;i<arr.length;i++){
                if(!~(' '+str+' ').indexOf(' '+arr[i]+' ')){
                    //有一个不含有
                    result = false;
                    return;
                };
            };
            if(result!==false){
                result = true;
                return;
            };
        });
        return result;
    }
});







magic.Background = baidu.lang.createClass(function(options){
	var opt = options || {}
		,me = this;

	me.coverable = opt.coverable || false;	// 是否创建<iframe>覆盖<select>|Flash
	me.styleBox  = opt.styleBox;
	me.tagName	 = "div";

	// 一个透明的层能够阻止鼠标“穿透”图层
	var _cssText = "filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;";
	me._coverDom = "<div style='"+ _cssText +"opacity:0;background-color:#FFFFFF'></div>";

	// 针对IE浏览器需要用一个定时器来维持高宽的正确性
	var bb = baidu.browser;
	bb.ie < 7 && (me._coverDom = "<iframe frameborder='0' style='"+ _cssText +"' src='about:blank'></iframe>");
	if (bb.ie && (!bb.isStrict || bb.ie < 8)) {
		me.size  = [0,0];
		me.timer = setInterval(function(){me._forIE()}, 80);
	}
	this._innerHTML = "<div class='tang-background-inner' style='width:100%;height:100%;' id='"+ this.$getId("inner")+"'></div>";
}, {
	type : "magic.Background"
	,superClass : magic.Base
})
.extend(

{
	
	render : function(container) {
		var box = baidu.dom(container).get(0);

		box != document.body
			&& baidu.dom(box).css('position')=="static"
			&& (box.style.position="relative");
		baidu.dom(box).insertHTML("afterbegin", this.toHTMLString());
	},

	
	$dispose: function(){
	    var layer = this.getElement();
	    layer.parentNode.removeChild(layer);
	    clearInterval(this.timer);
	}

	
	,toHTMLString : function(tagName) {
		return [
			"<",(tagName||this.tagName)," class='tang-background"
			,(baidu.browser.ie < 7 ?" ie6__":""),"' id='",this.$getId()
			,"' style='position:absolute; top:0px; left:0px;"
			,(this.timer ? "width:10px;height:10px;" : "width:100%;height:100%;")
			,"z-index:-9; -webkit-user-select:none; -moz-user-select:none;' "
			,"onselectstart='return false'>", this._innerHTML
			,(this.coverable ? this._coverDom || "" : "")
			,"</",(tagName||this.tagName),">"
		].join("");
	}
	
	,setContent : function(content){
		this.getElement("inner").innerHTML = content;
	}

	
	,_forIE : function(){
		if (this.guid && this.layer || ((this.layer = this.getElement()) && this.layer.offsetHeight)) {
			var bgl = this.layer;
			var box = this.container || bgl.parentNode;
			// 在 dispose 后取不到 parentNode 会报错 20120207
			if (box && box.style) {
				var  bs = box.style
					,bt = parseInt(bs.borderTopWidth) || 0
					,br = parseInt(bs.borderRightWidth) || 0
					,bb = parseInt(bs.borderBottomWidth) || 0
					,bl = parseInt(bs.borderLeftWidth) || 0

					,w = box.offsetWidth  - br - bl
					,h = box.offsetHeight - bt - bb;

				if (this.size[0] != w || this.size[1] != h) {
					bgl.style.width = (this.size[0] = w) + "px";
					bgl.style.height= (this.size[1] = h) + "px";
				}

	            // 20120207 meizz 针对IE对于Table行高分配不公的处理
	            if (this.styleBox && this.table || (this.table = this.getElement("table"))) {
	                var h0, h1, h2;
	                h0 = h0 || parseInt(baidu.dom(this.table.rows[0]).getCurrentStyle("height"));
	                h2 = h2 || parseInt(baidu.dom(this.table.rows[2]).getCurrentStyle("height"));
	                this.table.rows[0].style.height = h0 +"px";
	                this.table.rows[2].style.height = h2 +"px";
	                this.table.rows[1].style.height = (this.layer.offsetHeight - h0 - h2) +"px";
	            }
	        }
		}
	}
});

// 20111214	meizz	添加<iframe>达到在IE6下遮挡<select>和Flash的效果
// 20111215 meizz	添加一个透明的DIV层，阻止鼠标事件“穿透”图层
// 20120105 xzh	    修改注释





(function(){
    magic.Popup = function(options){
        var me = this;
        magic.control.Popup.call(me, options);

        me.content = "";
        me.className = "";
        me.styleBox  = false;

        baidu.object.extend(this, options||{});


        var box = factory.produce();
        me.$mappingDom("", box.getElement());
        me.$mappingDom("content", box.getElement("content"));
        box.getElement().style.zIndex = baidu.global.getZIndex("popup");
        me.setContent(me.content);
        me.className && baidu.dom(box.getElement()).addClass(me.className);

        me.on("dispose", function(){
            me.className && baidu.dom(box.getElement()).removeClass(me.className);
            me.setContent("");
            box.busy = false;
        });
    };
    baidu.lang.inherits(magic.Popup, magic.control.Popup, "magic.Popup");

    // 工厂模式：重复使用popup壳体DOM，减少DOM的生成与销毁
    var factory = {list:[], produce : function(){
        for(var i=0, n=this.list.length; i<n; i++) {
            if (!this.list[i].busy) {
                this.list[i].busy = true;
                return this.list[i];
            }
        }
        var box = new magic.Base();
        baidu.dom(document.body).insertHTML("afterbegin", [
            "<div class='tang-popup' id='",box.$getId(),"' "
            ,"style='position:absolute; display:none;'>"
                ,(box.background = new magic.Background({coverable:true})).toHTMLString()
                ,"<div class='tang-foreground' id='",box.$getId("content"),"'></div>"
            ,"</div>"
        ].join(""));
        box.busy = true;
        this.list.push(box);
        return box;
    }};
})();

//    20120114 meizz 实现了工厂模式，重复使用POPUP的外壳，在 dispose 析构方法执行时回收DOM资源







magic.control.Suggestion = baidu.lang.createClass(function(options){
	var me = this;
    
    baidu.object.extend(this, options||{});
    
    me.dataCache = {};      //本地缓存suggestion数据
	me.enableIndexs = [];   //包含enable的选项数组
	me.selectedIndex = -1;  //指当前选中的选项的索引在enableIndexs数组中的索引
    me.currentQuery = '';   //currentQuery保存当前suggestion对应的query，用于在某些情况下还原input中的值
    me.oldInputValue = '';  //存储input中的值，用于轮询器与当前input值对比
    me.upDownArrowTimer = null;   //用来处理键盘上下键一直被按下的情况

    me.on('onload', function() {
        var input_el = me.getElement("input"),
            timer = null;
        baidu.dom(me.getElement("input")).attr("autocomplete", "off");
        me.oldInputValue = me.getElement("input").value;
        
        //轮询器，检查input中值的变化
        function createTimer(){
            timer = setInterval(function(){
                var query = input_el.value;
                if(!query && me.isShowing()){
                    me._hide();
                }else if(query != me.oldInputValue){
                    query && me.fire("onneeddata", query);
                    me.oldInputValue = query;
                }
            }, 100);
        }
        
        createTimer();
        
        //监听键盘按键
        var _keydownHandler = (function(){
            return  me._keydownHandler();
        })();
        var _keyupHandler = function(e){
            if(timer){
                clearInterval(timer);
                createTimer();
            }
            //处理上下键长按的延时器
            if(me.upDownArrowTimer){
                clearTimeout(me.upDownArrowTimer);
                me.upDownArrowTimer = null;
            }
        };
        baidu.dom(input_el).on("keydown", _keydownHandler);
        baidu.dom(input_el).on("keyup", _keyupHandler);
        
        //解决某些输入法输入过程中会将字符上框的问题
        me.on("onmousedownitem", function(){
            clearInterval(timer);
            setTimeout(function(){
                createTimer();
            }, 500);
        });
        
        
        //dispose时移除事件监听
        me.on('ondispose', function(){
            baidu.dom(input_el).off("keydown", _keydownHandler);
            baidu.dom(input_el).off("keyup", _keyupHandler);
            clearInterval(timer);
        });
    });
    
    //监听suggestion的render事件，suggestion在第一次请求数据时渲染
    me.on("onrender", function(){
        var input_el = me.getElement("input"),
            suggestion_el = me.getElement("suggestion"),
            windowBlurHandler = function(){
                me.hide();
            },
            documentClickHandler = function(e){
                var e = e || window.event,
                    element = e.target || e.srcElement;
                if(!me.suggestion){
                    return;
                }
                    
                if (element == suggestion_el || baidu.dom.contains(suggestion_el, element) || element == me.getElement("input")) {
                    return;
                }
                me.hide();
            };

        baidu.dom(window).on('blur', windowBlurHandler);
        baidu.dom(document).on("click", documentClickHandler);
        
        //dispose时移除事件监听
        me.on('ondispose', function(){
            baidu.dom(window).off('blur', windowBlurHandler);
            baidu.dom(document).off('click', documentClickHandler);
        });
        
    });


    
    me.on('onneeddata', function(ev, query) {
        var dataCache = me.dataCache;
        me.currentQuery = query;
        if (typeof dataCache[query] == 'undefined') {
            //没有数据就去取数据
            me.getData(query);
        }else {
            //有数据就直接显示，（需要排除缓存的数据为空数组的情况）
            me.currentData = dataCache[query];
            (me.currentData.length > 0) ? me.show() : me.hide();
        }
    });
    
    
    //在显示suggestion之前，保存所有enable数据项的索引
    me.on("beforeshow", function(){
        var data = me.currentData,
            i = 0,
            len = data.length;
        me.enableIndexs = [];
        for(; i<len; i++){
            if(typeof data[i]['disable'] == 'undefined' || data[i]['disable'] == false) {
                me.enableIndexs.push(i);
            }
        }
    });
    
},{
	type: "magic.control.Suggestion",
	superClass: magic.Base
})
.extend(
     
{
    
    
    tpl: {
        //在suggestion之前或之后显示内容的模板
        fix: "<div id='#{0}' class='#{1}'>#{2}</div>",
        //suggestion数据部分的模版
        body: '<table cellspacing="0" cellpadding="2" class="tang-suggestion-table"><tbody>#{0}</tbody></table>',
        //suggestion每一项数据的模版
        item: '<tr><td id="#{0}" onmouseover="#{2}" onmouseout="#{3}" onmousedown="#{4}" onclick="#{5}" class="#{6}">#{1}</td></tr>'
    },
    
    
    
    render: function(){
        var me = this,
            popup = new magic.Popup({"autoHide": false, "autoTurn": false, 'disposeOnHide': false}),
            popupContainer = popup.getElement();

        baidu.dom(popupContainer).addClass("tang-suggestion-popup");
        
        me.$mappingDom("suggestion", popupContainer);
        
        me.suggestion = popup;  //指向suggestion的popup实例
        
        
        
        
        me.fire("onrender");
        
        return popupContainer;
    },
    
    isShowing: function(){
        var me = this,
            suggestion = me.getElement("suggestion");
        return suggestion && baidu.dom(suggestion).css('display') != "none";
    },
    
    show: function(){
        var me = this,
            suggestion_el = me.getElement("suggestion") || me.render(),
            input_el = me.getElement("input"),
            customWidth;
        
        me.fire("beforeshow");
        
        //设置suggestion的内容
        me.suggestion.setContent(me._getSuggestionString());
        //调用popup的attach方法定位
        me.suggestion.attach(input_el, {
            "offsetX": (me.offset && me.offset.offsetX) || 0,
            "offsetY": (me.offset && me.offset.offsetY) || -1
        });

        if(me.offset && me.offset.width){   //如果在offset中设置了宽度，则将宽度设置到Suggestion的容器上
            customWidth = me.offset.width;
            baidu.dom('#' + me.suggestion.$getId('content')).css("width", parseInt(customWidth) - 2 + 'px');
        }else{  //如果没有在offset中设置宽度，则将宽度设置到Suggestion的table上，使Suggestion能自适应宽度
            customWidth = input_el.offsetWidth;
            baidu.dom(suggestion_el.getElementsByTagName('table')[0]).css("width", parseInt(customWidth) - 2 + 'px');
        }
        
        //显示suggestion
        baidu.dom(suggestion_el).css("display", "block");
        
        //将selectedIndex重置为-1
        me.selectedIndex = -1;
        
        me.fire("onshow");
    },
    
    hide: function(){
        var me = this,
            suggestion = me.getElement("suggestion");
        
        //如果不存在suggestion或者suggestion处于关闭状态，不需要后续操作
        if(!suggestion || !me.isShowing()){
            return;
        }
        
        //如果当前有选中的条目，将其放到input中
        if(me.selectedIndex >= 0 && me.holdHighLight){
            var currentData = me.currentData,
                i = me.enableIndexs[me.selectedIndex];
            if(currentData[i] && (typeof currentData[i].disable == 'undefined' || currentData[i].disable == false)){
                me.$pick(i);
            }
        }else{
            me.oldInputValue = me.getElement("input").value;
        }
        
        me._hide();
    },
    
    
    _hide: function(){
        var me = this,
            suggestion = me.getElement("suggestion");
        baidu.dom(suggestion).css("display", "none");
        
        //重置selectedIndex
        me.selectedIndex = -1;
        
        me.fire("onhide");
    },
    
    
    _getSuggestionString: function(){
        var me = this,
            html = '',
            itemsHTML = [],
            data = me.currentData,
            len = data.length,
            i = 0,
            ins;
            
        //生成在suggestion之前或之后显示的内容的HTML
        function getfix(name) {
            return baidu.string.format(
                me.tpl.fix,
                me.$getId(name),
                me._getClass(name),
                me[name + 'HTML']
            );
        }

        me.prependHTML && (html += getfix('prepend'));

        for (; i < len; i++) {
            ins = "baiduInstance('"+ me.guid +"')";
            itemsHTML.push(baidu.string.format(
                me.tpl.item,
                me.$getId('item' + i),
                data[i].content,
                ins + '._mouseOver(event, ' + i + ')',
                ins + '._mouseOut(event, ' + i + ')',
                ins + '._mouseDown(event, ' + i + ')',
                ins + '._mouseClick(event, ' + i + ')',
                (typeof data[i]['disable'] == 'undefined' || data[i]['disable'] == false) ? '' : 'tang-suggestion-disable'
            ));
        }

        html += baidu.string.format(
            me.tpl.body, 
            itemsHTML.join('')
        );
        me.appendHTML && (html += getfix('append'));
        return html;
    },
    
    getInputValue: function(){
        return this.getElement("input").value;
    },
    
    
    getDataByIndex: function(index) {
        return this.currentData[index];
    },
    
    
    _isEnable: function(index){
        var me = this;
        return baidu.array(me.enableIndexs).contains(index);
    },
    
    
    _getItemDom: function(index){
        return baidu.dom('#'+this.$getId('item' + index)).get(0);
    },
    
    
    _getClass: function(name){
        return "tang-suggestion-" + name;
    },

    
    _focus: function(selectedIndex){
        var enableIndexs = this.enableIndexs;
        this.$pick(enableIndexs[selectedIndex]);
        this.$highlight(enableIndexs[selectedIndex]);
    },
    
    $highlight: function(index) {
        var me = this,
            enableIndexs = me.enableIndexs,
            item = null;

        //若需要高亮的选项被设置了disable，则直接返回
        if (!me._isEnable(index)) return;
        me.selectedIndex >= 0 && me.$clearHighlight();
        
        item = me._getItemDom(index);
        baidu.dom(item).addClass('tang-suggestion-current');
        
        //修改索引
        me.selectedIndex = baidu.array(enableIndexs).indexOf(index);
        
        me.fire('onhighlight', {
            'index': index,
            'value': me.getDataByIndex(index).value
        });
    },
    
    $clearHighlight: function() {
        var me = this,
            selectedIndex = me.selectedIndex,
            item = null,
            index = 0;

        index = me.enableIndexs[selectedIndex];
        if (selectedIndex >= 0) {
            item = me._getItemDom(index);
            baidu.dom(item).removeClass(me._getClass('current'));
            me.selectedIndex = -1;
            
            me.fire('onclearhighlight', {
                index: index,
                value: me.getDataByIndex(index).value
            });
        }
    },
	
	$pick: function(index){
	    // 不检查index的有效性
		var me = this,
            currentData = me.currentData,
            returnData = currentData[index];
        
        if(me.fire('onbeforepick', {
                'index': index,
                'value': returnData.value})
        ){
            me.getElement("input").value = returnData.value;
            me.oldInputValue = returnData.value;
            
        
	        me.fire('onpick', {
	            'index': index,
	            'value': returnData.value
	        });
        }
	},
	
    $confirm: function(index) {
        // 不检查index的有效性
        var me = this;

        if(!me._isEnable(index)){
            return;
        }
        me.$pick(index);
        
        me.fire('onconfirm', {
            'index': index,
            'value': me.getDataByIndex(index).value
        });
        me._hide();
    },
	
	
	_wrapData: function(data){
	    var me = this,
	        _data = [],
	        i = 0,
	        len = data.length;

        //Attention: 对返回值中可能包含的实体字符，如：<、>等，使用encodeHTML转义
        for (; i < len; i++) {
            if (typeof data[i].value != 'undefined') {
                _data.push(data[i]);
            }else {
                _data.push({
                    'value': data[i],
                    'content': baidu.string.encodeHTML(data[i])
                });
            }
        }
        
        return _data;
	},
	
	getData: function(query){},
	
    receiveData: function(query, data){
        var me = this,
            _data = me.$cacheData(query, data);

        me.selectedIndex = -1;
        if(query == me.getInputValue()){
            me.currentData = _data;
            (data.length > 0) ? me.show() : me.hide();   //返回的数组为空则不显示suggestion
        }
    },
	
    $cacheData: function(query, data) {
        var me = this,
            _data = me._wrapData(data);
        me.dataCache[query] = _data;
        return _data;
    },
	
	
    _mouseOver: function(e, index) {
        var me = this;
        e = baidu.event(e);
        e.stopPropagation();
        
        if(me._isEnable(index)){
            me.$highlight(index);
            me.selectedIndex = baidu.array(me.enableIndexs).indexOf(index);
        }
        
        me.fire('onmouseoveritem', {
            'index': index,
            'value': me.getDataByIndex(index).value
        });
    },

    
    _mouseOut: function(e, index) {
        var me = this;
        e = baidu.event(e);
        e.stopPropagation();
        
        if(!me.holdHighLight){
            me._isEnable(index) && me.$clearHighlight();
        }
        
        me.fire('onmouseoutitem', {
            'index': index,
            'value': me.getDataByIndex(index).value
        });
    },
	
	
    _mouseDown: function(e, index){
        var me = this;
        e = baidu.event(e);
        e.stopPropagation();
        
        me.fire('onmousedownitem', {
            'index': index,
            'value': me.getDataByIndex(index).value
        });
    },
	
	
    _mouseClick: function(e, index) {
        var me = this;
        e = baidu.event(e);
        e.stopPropagation();
		
        me.fire('onmouseclick', {
            'index': index,
            'value': me.getDataByIndex(index).value
        });

        me.$confirm(index);
    },
    
    
    _keydownHandler: function() {
        var me = this;
        
        
        function upDownArrowHandler(direction){
            var query = me.getInputValue(),
                enableIndexs = me.enableIndexs,
                selectedIndex = me.selectedIndex;
                
            if(!query){ //input中没有值时，理论上suggestion不显示，直接返回
                return;
            }
            
            if((query && !me.isShowing())){ //suggestion没有显示
                me.fire("onneeddata", query);
                return;
            }
            
            //只剩下suggestion处于显示状态且当前suggestion对应的query与input中的query一致的情况
            
            //当所有的选项都处于disable状态,直接返回
            if(enableIndexs.length == 0){
                return;
            }
            
            //如果处于延时处理状态，则返回
            if(me.upDownArrowTimer){
                return;
            }
            me.upDownArrowTimer = setTimeout(function(){
                clearTimeout(me.upDownArrowTimer);
                me.upDownArrowTimer = null;
            }, 200);
            
            if("up" == direction) {
                switch (selectedIndex) {
                    case -1:
                        me.$clearHighlight();
                        selectedIndex = enableIndexs.length - 1;
                        me._focus(selectedIndex);
                        break;
                    case 0:
                        selectedIndex = -1;
                        me.$clearHighlight();
                        me.getElement("input").value = me.currentQuery;
                        me.oldInputValue = me.currentQuery;
                        break;
                    default:
                        selectedIndex--;
                        me._focus(selectedIndex);
                        break;
                }
            }else {
                switch (selectedIndex) {
                    case -1:
                        selectedIndex = 0;
                        me._focus(selectedIndex);
                        break;
                    case enableIndexs.length - 1:
                        selectedIndex = -1;
                        me.$clearHighlight();
                        me.getElement("input").value = me.currentQuery;
                        me.oldInputValue = me.currentQuery;
                        break;
                    default:
                        selectedIndex++;
                        me._focus(selectedIndex);
                        break;
                }
            }
            me.selectedIndex = selectedIndex;
        }
        return function(e) {
            var direction = "up";
            switch (e.keyCode) {
                case 27:    //esc
                case 9:     //tab
                    me.hide();
                    break;
                case 13:    //回车，默认为表单提交
                    e.preventDefault();
                    e.stopPropagation();
                    //当前有选中的选项且holdHighLight打开
                    if(me.selectedIndex >= 0 && me.holdHighLight){
                        me.$confirm(me.enableIndexs[me.selectedIndex]);
                    }else{
                    	
                        me.fire('onconfirm', {
                            'data': me.getInputValue()
                        });
                        if(me.isShowing()){
                            me._hide();
                        }
                    }
                    break;
                case 40:    //向下
                    direction = "down";
                case 38:    //向上
                    e.preventDefault();
                    e.stopPropagation();
                    upDownArrowHandler(direction);
                    break;
                default:
                    break;
            }
        };
    },
    
    $dispose: function(){
        var me = this;
        if(me.disposed){
            return;
        }
        if(me.suggestion){
            me.suggestion.$dispose();
            me.hide();
        }
        magic.Base.prototype.$dispose.call(me);
        
    }
    	
});



magic.setup.suggestion = function(el, options){
	
    var el = baidu.dom('#'+el).get(0),
	    instance = magic.setup(el, magic.control.Suggestion, options);
	instance.$mappingDom('input', el);
	instance.fire('onload');
	return instance;
};









/// support maigc - Tangram 1.x Code Start








//baidu.lang.isElement = function (source) {
//    return !!(source && source.nodeName && source.nodeType == 1);
//};
baidu.lang.isElement = baidu.isElement;
/// support maigc - Tangram 1.x Code End














baidu.createChain("fn",

// 执行方法
function(fn){
    return new baidu.fn.$Fn(~'function|string'.indexOf(baidu.type(fn)) ? fn : function(){});
},

// constructor
function(fn){
	this.fn = fn;
});




baidu.fn.extend({
    bind: function(scope){
        var func = this.fn,
            xargs = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
        return function(){
            var fn = baidu.type(func) === 'string' ? scope[func] : func,
                args = xargs ? xargs.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
            return fn.apply(scope || fn, args);
        }
    }
});
/// Tangram 1.x Code Start

baidu.fn.bind = function(func, scope) {
    var fn = baidu.fn(func);
    return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
};
/// Tangram 1.x Code End






baidu.makeArray = function(array, results){
    var ret = results || [];
    if(!array){return ret;}
    array.length == null || ~'string|function|regexp'.indexOf(baidu.type(array)) ?
        [].push.call(ret, array) : baidu.merge(ret, array);
    return ret;
}










baidu.each = function( enumerable, iterator, context ) {
    var i, n, t, result;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
        if ( typeof n == "number" ) {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for ( i=0; i<n; i++ ) {

                t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));

                // 被循环执行的函数，默认会传入三个参数(i, array[i], array)
                result = iterator.call( context || t, i, t, enumerable );

                // 被循环执行的函数的返回值若为 false 和"break"时可以影响each方法的流程
                if ( result === false || result == "break" ) {break;}
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                result = iterator.call( context || i, i, i, i);
                if ( result === false || result == "break" ) { break;}
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    result = iterator.call( context || enumerable[ i ], i, enumerable[ i ], enumerable );

                    if ( result === false || result == "break" ) { break;}
                }
            }
        }
    }

    return enumerable;
};







void function () {

    Array.prototype.each = function(iterator, context){
        return baidu.each(this, iterator, context);
    };
    
    Array.prototype.forEach = function(iterator, context){
        return baidu.forEach(this, iterator, context);
    };

    // TODO: delete in tangram 3.0
    baidu.array.each = baidu.array.forEach = function(array, iterator, context) {
        var fn = function(index, item, array){
            return iterator.call(context || array, item, index, array);
        };
        return baidu.isEnumerable(array) ? baidu.each(array, typeof iterator == "function" ? fn : "", context) : array;
    };
}();



























baidu.dom.match = function(){
    var reg = /^[\w\#\-\$\.\*]+$/,

        // 使用这个临时的 div 作为CSS选择器过滤
        div = document.createElement("DIV");
        div.id = "__tangram__";

    return function( array, selector, context ){
        var root, results = baidu.array();

        switch ( baidu.type(selector) ) {
            // 取两个 TangramDom 的交集
            case "$DOM" :
                for (var x=array.length-1; x>-1; x--) {
                    for (var y=selector.length-1; y>-1; y--) {
                        array[x] === selector[y] && results.push(array[x]);
                    }
                }
                break;

            // 使用过滤器函数，函数返回值是 Array
            case "function" :
                baidu.forEach(array, function(item, index){
                    selector.call(item, index) && results.push(item);
                });
                break;
            
            case "HTMLElement" :
                baidu.forEach(array, function(item){
                    item == selector && results.push(item);
                });
                break;

            // CSS 选择器
            case "string" :
                var da = baidu.query(selector, context || document);
                baidu.forEach(array, function(item){
                    if ( root = getRoot(item) ) {
                        var t = root.nodeType == 1
                            // in DocumentFragment
                            ? baidu.query(selector, root)
                            : da;

                        for (var i=0, n=t.length; i<n; i++) {
                            if (t[i] === item) {
                                results.push(item);
                                break;
                            }
                        }
                    }
                });
                results = results.unique();
                break;

            default :
                results = baidu.array( array ).unique();
                break;
        }
        return results;

    };

    function getRoot(dom) {
        var result = [], i;

        while(dom = dom.parentNode) {
            dom.nodeType && result.push(dom);
        }

        for (var i=result.length - 1; i>-1; i--) {
            // 1. in DocumentFragment
            // 9. Document
            if (result[i].nodeType == 1 || result[i].nodeType == 9) {
                return result[i];
            }
        }
        return null;
    }
}();





baidu.dom.extend({
    children : function (selector) {
        var result, a = [];

        this.each(function(index){
            baidu.forEach(this.children || this.childNodes, function(dom){
                dom.nodeType == 1 && a.push(dom);
            });
        });

        return baidu.dom( baidu.dom.match(a, selector) );
    }
});

/// Tangram 1.x Code Start

baidu.dom.children = function(dom) {
    baidu.check("string|HTMLElement","baidu.dom.children");
    return baidu.dom( baidu.isString(dom) ? "#"+ dom : dom ).children().toArray();
};
/// Tangram 1.x Code End



















baidu.dom.extend({
    filter : function (selector) {
        return baidu.dom(baidu.dom.match(this, selector));
    }
});






baidu._util_.cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu._util_.eventBase.queue.remove(ele);
        baidu.id(ele, 'remove');
    }
}




baidu.dom.extend({
    remove: function(selector, keepData){
        arguments.length > 0
            && baidu.check('^string(?:,boolean)?$', 'baidu.dom.remove');
        var array = selector ? this.filter(selector) : this;
        for(var i = 0, ele; ele = array[i]; i++){
           if(!keepData && ele.nodeType === 1){
               baidu._util_.cleanData(ele.getElementsByTagName('*'));
               baidu._util_.cleanData([ele]);
            }
            ele.parentNode && ele.parentNode.removeChild(ele);
        }
        return this;
    }
});













baidu.dom.extend({
    closest : function (selector, context) {
        var results = baidu.array();

        baidu.forEach ( this, function(dom) {
            var t = [dom];
            while ( dom = dom.parentNode ) {
                dom.nodeType && t.push( dom );
            }
            t = baidu.dom.match( t, selector, context );

            t.length && results.push(t[0]);
        });
        
        return baidu.dom( results.unique() );
    }
});









void function(){
    
    function Item(options){
        this._options = options;
        this._constructor();
    }
    
    
    Item.prototype._constructor = function(){
        var me = this,
            opt = me._options;
        me._element = baidu.lang.isElement(opt.content) && opt.content;
        me.guid = me._element.id || baidu.lang.guid() + '-carousel-item';
        me._element && !me._element.id && (me._element.id = me.guid);
    }
    
    Item.prototype.render = function(target, direction){
        if(this._element){return;}
        var me = this,
            opt = me._options,
            child = baidu.dom(target).children(),
            tagName = child[0] ? child[0].tagName : 'li',
            template = '<'+ tagName +' id="#{rsid}" class="#{class}">#{content}</'+ tagName +'>';
        baidu.dom(target).insertHTML(direction == 'forward' ? 'beforeEnd' : 'afterBegin',
            baidu.string.format(template, {
                rsid: me.guid,
                'class': 'tang-carousel-item' + (opt.empty ? ' tang-carousel-item-empty' : ''),
                content: opt.empty ? '&nbsp;' : ''
            }));
        me._element = baidu.dom('#'+me.guid).get(0);
    }
    
    Item.prototype.insert = function(target, direction){
        var me = this;
        if(me._element){
            direction == 'forward' ? target.appendChild(me._element)
                : target.insertBefore(me._element, target.firstChild)
        }else{
            me.render(target, direction);
        }
    }
    
    Item.prototype.loadContent = function(){
        var me = this;
    }
    
    
    Item.prototype.getElement = function(){
        var me = this;
        return me._element || baidu.dom('#'+this.guid).get(0);
    }
    
    

    magic.control.Carousel = baidu.lang.createClass(function(options){
        var me = this,
            focusRange = options.focusRange,
            opt;
        me._options = baidu.object.extend({
            viewSize: 3,
            step: 1,//修改成数值
            focusRange: {min: 0, max: options.viewSize - 1 || 2},
            orientation: 'horizontal',//horizontal|vertical
            originalIndex: 0,
            isLoop: false
        }, options);
        opt = me._options;
        //
        me._selectedIndex = opt.originalIndex;
        focusRange && (opt.focusRange = {//fix focusRange
            min: Math.max(0, focusRange.min),
            max: Math.min(opt.viewSize - 1, focusRange.max)
        });
        //
        me._items = opt.items || [];//数据内容项
        me._dataIds = [];
        me._datas = {};//Item对象
        me.on('onfocus', function(){me._scrolling = false;});
        me.on('onload', function(evt){
            var axis = me._axis[me._options.orientation],
                selectedIndex = me._selectedIndex,
                opt = me._options,
                focusRange = opt.focusRange,
                handler = baidu.fn.bind('_onEventHandler', me);
            me.$mappingDom('container', baidu('.tang-carousel-container', me.getElement())[0]).
            $mappingDom('element', baidu('.tang-carousel-element', me.getElement())[0]);
            //data
            baidu.dom(baidu.dom(me.getElement('element')).children()).each(function(index, ele){
            	var item = new Item({content: ele});
                me._dataIds.push(item.guid);
                me._datas[item.guid] = item;
                baidu.dom(ele)[selectedIndex == index ? 'addClass' : 'removeClass']('tang-carousel-item-selected');
            });
            me._clear(selectedIndex, focusRange[selectedIndex > (me._dataIds.length - 1) / 2 ? 'max' : 'min'], true);
            me._resize();
            //event
            baidu.dom(me.getElement('element')).on('click', handler);
            baidu.dom(me.getElement('element')).on('mouseover', handler);
            baidu.dom(me.getElement('element')).on('mouseout', handler);
            me.on('ondispose', function(){
                baidu.dom(me.getElement('element')).off('click', handler);
                baidu.dom(me.getElement('element')).off('mouseover', handler);
                baidu.dom(me.getElement('element')).off('mouseout', handler);
            });
        });
        
    }, {
        type: 'magic.control.Carousel',
        superClass: magic.Base
    }).extend(
	
	{
        _axis: {
            horizontal: {size: 'width',  offsetPos: 'offsetLeft', offsetSize: 'offsetWidth',  scrollPos: 'scrollLeft'},
            vertical:   {size: 'height', offsetPos: 'offsetTop',  offsetSize: 'offsetHeight', scrollPos: 'scrollTop'}
        },
        
        
        
        
        
        _onEventHandler: function(evt){
            var me = this,
                opt = me._options,
                element = me.getElement('element'),
                target = evt.target;
            if(!baidu.dom.contains(me.getElement('element'), target)){return;}
        	var item = baidu.dom(target).closest('.tang-carousel-item').get(0);
        	
            if(evt.type === 'mouseover'){
            	var relatedTarget = evt.fromElement || evt.relatedTarget;
            }else if(evt.type === 'mouseout'){
            	var relatedTarget = evt.toElement || evt.relatedTarget;
            }
            if(baidu.dom(relatedTarget).closest(item).size() > 0) return;
            
            me.fire('on' + evt.type.toLowerCase() + 'item', {
                DOMEvent: evt,
                index: baidu.array.indexOf(me._dataIds, item.id)
            });
        },
        
        //private
        
        _getItemBound: function(){
            var me = this,
                opt = me._options,
                orie = opt.orientation.toLowerCase() == 'horizontal',
                axis = me._axis[opt.orientation],
                val = me._bound,
                child;
            if(!val){
                child = baidu.dom(me.getElement('element')).children().get(0);
                if(child){
                    val = me._bound = {
                        marginPrev: parseInt(baidu.dom(child).css('margin' + (orie ? 'Left' : 'Top')), 10),
                        marginNext: parseInt(baidu.dom(child).css('margin' + (orie ? 'Right' : 'Bottom')), 10),
                        size: child[axis.offsetSize]
                    };
                    val.bound = val.size + (orie ? (val.marginPrev + val.marginNext) : Math.max(val.marginPrev, val.marginNext));
                }
            }
            return val || {marginPrev: 0, marginNext: 0, size: 0, bound: 0};
        },
        
        
        _resize: function(){
            var me = this,
                axis = me._axis[me._options.orientation],
                el = me.getElement('element'),
                child = baidu.dom(el).children();
            el.style[axis.size] = child.length * me._getItemBound().bound + 'px';
        },
        
        
        _clear: function(index, offset, isLimit){
            var me = this,
                axis = me._axis[me._options.orientation],
                opt = me._options,
                viewSize = opt.viewSize,
                focusRange = opt.focusRange,
                totalCount = me._dataIds.length,
                child = baidu.makeArray(baidu.dom(me.getElement('element')).children()),
                posIndex = baidu.array(child).indexOf(me._getItem(index).getElement());
            if(isLimit){
                index - focusRange.min < 0 && (offset = index);
                index + viewSize - focusRange.max > totalCount
                    && (offset = viewSize - totalCount + index);
            }
            
            baidu.array(child).each(function(index, item){
            	(index < posIndex - offset || index > posIndex + viewSize - offset - 1)
                    && baidu.dom(item).remove();
            });
            me.getElement('container')[axis.scrollPos] = 0;//init
        },
        
        
        _getItem: function(index){
            var me = this;
            return me._datas[typeof index == 'string' ? index : me._dataIds[index]];
        },
        
        
        _toggle: function(index){
            var me = this;
            baidu.dom('#'+me._dataIds[me._selectedIndex]).removeClass('tang-carousel-item-selected');
            me._selectedIndex = index;
            baidu.dom('#'+me._dataIds[index]).addClass('tang-carousel-item-selected');
        },
        
        
        
        _scrollTo: function(index, direction){
            var me = this,
                opt = me._options,
                focusRange = opt.focusRange,
                selectedIndex = me._selectedIndex,
                axis = me._axis[opt.orientation],
                direction = direction || (index > selectedIndex ? 'forward' : 'backward'),
                vector = direction.toLowerCase() == 'forward',
                container = me.getElement('container'),
                element = me.getElement('element'),
                bound = me._getItemBound(),
                target = baidu.dom('#'+me._getItem(index).guid).get(0),
                totalCount = me._dataIds.length,
                child = baidu.makeArray(baidu.dom(element).children()),
                posIndex = baidu.array.indexOf(child, me._getItem(selectedIndex).getElement()),//当前焦点在viewSize中的位置
                len = ((vector ? 1 : -1) * (index - selectedIndex) + totalCount) % totalCount
                    + (vector ? opt.viewSize - focusRange.max - 1 : focusRange.min)
                    - (vector ? child.length - posIndex - 1 : posIndex),//((vector ? -1 : 1) * y - x + len) % len.
                empty = [],
                count, ele, distance, insertItem, entry;
            if(index == selectedIndex
                || me._dataIds.length <= opt.viewSize
                || me._scrolling){//exit
                return;
            }
            me._scrolling = true;
            if(!target || target[axis.offsetPos] < focusRange.min * bound.bound
                || target[axis.offsetPos] - bound.marginPrev > focusRange.max * bound.bound){//need move
                for(var i = 0; i < len; i++){
                    count = (selectedIndex + (vector ? child.length - posIndex - 1 : -posIndex)
                        + (vector ? 1 : -1) * (i + 1) + totalCount) % totalCount;
                    ele = baidu.dom('#'+me._dataIds[count]).get(0);
                    insertItem = ele ? new Item({empty: true}) : me._getItem(count);
                    insertItem.insert(element, direction);
                    insertItem.loadContent();
                    ele && empty.push({empty: insertItem.getElement(), item: ele});
                }
                me._resize();
                !vector && (container[axis.scrollPos] += bound.bound * len);
                //
                if(me.fire('onbeforescroll', {index: index, distance: (vector ? 1 : -1) * bound.bound * len, empty: empty})){
                    me._toggle(index);
                    while(empty.length > 0){//clear empty
                        entry = empty.shift();
                        element.replaceChild(entry.item, entry.empty);
                        baidu.dom(entry.empty).remove();
                    }
                    me._clear(index, focusRange[vector ? 'max' : 'min']);
                    me._resize();
                    me.fire('onfocus', {direction: direction});
                }
            }else{//keep
                me._toggle(index);
                me.fire('onfocus', {direction: direction});
            }
        },
        
        
        _basicFlip: function(type){
            var me = this,
                opt = me._options,
                focusRange = opt.focusRange,
                vector = (type == 'forward') ? 1 : -1,
                selectedIndex = me._selectedIndex,
                totalCount = me._dataIds.length,
                index = opt.isLoop ?
                    (selectedIndex + vector * opt.step + totalCount) % totalCount
                    : Math.min(totalCount - 1 - (opt.viewSize - 1 - focusRange.max), Math.max(0 + focusRange.min , selectedIndex + vector * opt.step));
            me._scrollTo(index, type);
        },
        
        //public
        
        focusPrev: function(){
            this._basicFlip('backward');
        },
        
        
        focusNext: function(){
            this._basicFlip('forward');
        },
        
        
        focus: function(index, direction){
            var index = Math.min(Math.max(0, index), this._dataIds.length - 1);
            this._scrollTo(index, direction);
        },
        
        
        getCurrentIndex: function(){
            return this._selectedIndex;
        },
        
        
        getTotalCount: function(){
            return this._dataIds.length;
        },
        
        
        $dispose: function(){
            var me = this;
            if(me.disposed){return;}
            magic.Base.prototype.$dispose.call(me);
        }
    });
}();













magic.Carousel = baidu.lang.createClass(function(options){
    
}, {
    type: 'magic.Carousel',
    superClass: magic.control.Carousel
}).extend(

{
    
    tplItem: '<li class="#{class}">#{content}</li>',
    
    
    toHTMLString: function(){
        var me = this,
            len = me._options.items.length,
            array = [];
        for(var i = 0; i < len; i++){
            array.push(baidu.string.format(me.tplItem, {
                'class': 'tang-carousel-item',
                content: me._items[i].content
            }));
        }
        return baidu.string.format(
            '<div class="#{containerClass}"><ul class="#{elementClass}">#{content}</ul></div>',
            {containerClass: 'tang-carousel-container', elementClass: 'tang-carousel-element', content: array.join('')});
    },
    
    
    render: function(target){
        var me = this,
            container;
        if (me.getElement()) {return;}//已经渲染过
        me.$mappingDom('', baidu.dom('#'+target).get(0) || document.body);
        container = me.getElement();
		baidu.dom(container).addClass('tang-ui tang-carousel')
							.insertHTML('beforeEnd', me.toHTMLString());
        me.fire('ondomready');
        me.fire('onload');
    },
    
    
    $dispose: function(){
        var me = this, container;
        if(me.disposed){return;}
        baidu.dom(me.getElement()).removeClass('tang-ui tang-carousel');
        container = me.getElement('container');
        magic.Base.prototype.$dispose.call(me);
        baidu.dom(container).remove();
        container = null;
    }
});






magic.setup.carousel = function(el, options) {
	
    var instance = magic.setup(baidu.dom('#'+el).get(0), magic.control.Carousel, options);
    instance.fire('onload');
    return instance;
};/// support magic - Tangram 1.x Code Start






baidu.lang.register = function (Class, constructorHook, methods) {
    var reg = Class["\x06r"] || (Class["\x06r"] = []);
    reg[reg.length] = constructorHook;

    for (var method in methods) {
    	Class.prototype[method] = methods[method];
    }
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129	meizz	添加第三个参数，可以直接挂载方法到目标类原型链上
/// support magic - Tangram 1.x Code End
























baidu.lang.register(magic.control.Carousel, function(options){
    var me = this, prevHandler, nextHandler;
    me._options.button = baidu.object.extend({
        enable: true
    }, me._options.button);
    if(!me._options.button.enable){return;}
    prevHandler = baidu.fn.bind('_onButtonClick', me, 'backward');
    nextHandler = baidu.fn.bind('_onButtonClick', me, 'forward');
    function toggle(){
        var prev = me.getElement('prev'),
            next = me.getElement('next');
        baidu.dom(prev)[me.isFirst() ? 'addClass' : 'removeClass']('tang-carousel-btn-prev-disabled');
        baidu.dom(next)[me.isLast() ? 'addClass' : 'removeClass']('tang-carousel-btn-next-disabled');
        baidu.dom(prev)[!me.isFirst() ? 'addClass' : 'removeClass']('tang-carousel-btn-prev');
        baidu.dom(next)[!me.isLast() ? 'addClass' : 'removeClass']('tang-carousel-btn-next');
    }
    me.on('onload', function(evt){
        me.$mappingDom('prev', baidu('.tang-carousel-btn-prev', me.getElement())[0]).
        $mappingDom('next', baidu('.tang-carousel-btn-next', me.getElement())[0]);
        //
        baidu.dom(me.getElement('prev')).on('click', prevHandler);
        baidu.dom(me.getElement('next')).on('click', nextHandler);
        toggle();
    });
    //
    me.on('onfocus', function(){
        toggle();
    });
    //
    me.on('ondispose', function(){
    	baidu.dom(me.getElement('prev')).off('click', prevHandler);
    	baidu.dom(me.getElement('next')).off('click', nextHandler);
    });
}, 
{
    
    _onButtonClick: function(direction, evt){
        var me = this;
        if(direction == 'forward' ? me.isLast() : me.isFirst()){return;}
        me._basicFlip(direction);
    },
    
    
    _isLimit: function(direction){
        var me = this,
            opt = me._options,
            focusRange = opt.focusRange,
            selectedIndex = me._selectedIndex,
            val = (direction == 'forward') ? selectedIndex >= me.getTotalCount() - 1 - (opt.viewSize - 1 - focusRange.max)
                : selectedIndex <= focusRange.min;
        return opt.isLoop ? false : val;
    },
    
    
    
    isFirst: function(){
        return this._isLimit('backward');
    },
    
    isLast: function(){
        return this._isLimit('forward');
    }
});



baidu.lang.register(magic.Carousel, function(options){
    var me = this,
        tplButton = '<a href="#" class="tang-carousel-btn #{class}" onclick="return false;">#{content}</a>';
    
    me._options.button = baidu.object.extend({
        buttonLabel: {
            prev: '',
            next: ''
        }
    }, me._options.button);
    
    if(!me._options.button.enable){return;}
    me.on('ondomready', function(evt){
        var container = me.getElement();
        baidu.dom(container).insertHTML('afterBegin', baidu.string.format(tplButton, {
            'class': 'tang-carousel-btn-prev',
            content: me._options.button.buttonLabel.prev
        }));
        baidu.dom(container).insertHTML('beforeEnd', baidu.string.format(tplButton, {
            'class': 'tang-carousel-btn-next',
            content: me._options.button.buttonLabel.next
        }));
        me.on('ondispose', function(){
            baidu.array.each(['prev', 'next'], function(item){
                baidu.dom(me.getElement(item)).remove();
            });
        });
    });
});
















void function( special ){
    
    var ff = /firefox/i.test(navigator.userAgent);

    baidu.each( { mouseenter: "mouseover", mouseleave: "mouseout" }, function( name, fix ){
        special[ name ] = {
        	bindType: fix,
        	pack: function( fn ){
				var contains = baidu.dom.contains;
				return function( e ){ // e instance of baidu.event
					var related = e.relatedTarget;
					e.type = name;
	                if( !related || ( related !== this && !contains( this, related ) ) )
	                	return fn.apply( this, arguments );
				}
        	}
        }
    } );

    if( ff ) // firefox dont support focusin/focusout bubbles
        baidu.each( { focusin: "focus", focusout: "blur" }, function( name, fix ){
            special[ name ] = {
            	bindType: fix,
            	attachElements: "textarea,select,input,button,a"
            }
        } );

    special.mousewheel = {
        bindType: ff ? "DOMMouseScroll" : "mousewheel",
        pack: function( fn ){
            return function( e ){ // e instance of baidu.event
                var oe = e.originalEvent;
                e.type = "mousewheel";
                e.wheelDelta = e.wheelDelta || ( ff ? oe.detail * -40 : oe.wheelDelta ) || 0;
                return fn.apply( this, arguments );
            }
        }
    };

}( baidu.event.special );



baidu.lang.register(magic.control.Carousel, function(options){
    var me = this, autoScroll;
    me._options.autoScroll = baidu.object.extend({
        enable: true,
        interval: 1000,
        direction: 'forward'// forward|backward 描述组件的滚动方向
    }, me._options.autoScroll);
    autoScroll = me._options.autoScroll;
    if(!autoScroll.enable){return;}
    autoScroll._autoScrolling = true;
    autoScroll.direction = autoScroll.direction.toLowerCase();//sweet?
    me.on('onload', function(evt){
        var handler = baidu.fn.bind('_onMouseEventHandler', me);
        baidu.dom(me.getElement('element')).on('mouseenter', handler);
        baidu.dom(me.getElement('element')).on('mouseleave', handler);
        me.on('ondispose', function(){
        	baidu.dom(me.getElement('element')).off('mouseenter', handler);
        	baidu.dom(me.getElement('element')).off('mouseleave', handler);
        });
        me.start();
    });
    me.on('onfocus', function(evt){
        if(!autoScroll._autoScrolling){return;}
        evt.target.start();
    });
    me.on('ondispose', function(evt){
        evt.target.stop();
    });
}, 
{   
    
    
    
    _onMouseEventHandler: function(evt){
        var me = this,
            evtName = {mouseover: 'mouseenter', mouseout: 'mouseleave'},
            type = evt.type;
        me.fire('on' + (evtName[type] || type), {DOMEvent: evt});
    },
    
    
    start: function(){
        var me = this,
            autoScroll = me._options.autoScroll;
        autoScroll._autoScrolling = true;
        clearTimeout(autoScroll._autoScrollTimeout);
        autoScroll._autoScrollTimeout = setTimeout(function(){
            me._basicFlip(autoScroll.direction);
        }, autoScroll.interval);
    },
    
    
    stop: function(){
        var me = this,
            autoScroll = me._options.autoScroll;
        clearTimeout(autoScroll._autoScrollTimeout);
        autoScroll._autoScrolling = false;
    }
});



/// support magic - Tangram 1.x Code Start




/// support magic - Tangram 1.x Code Start




/// support magic - support magic - Tangram 1.x Code Start




/// support magic - Tangram 1.x Code Start


/// support magic - Tangram 1.x Code Start





baidu.fx = baidu.fx || {} ;

/// support magic - Tangram 1.x Code End











 
 
 

baidu.fx.Timeline = function(options){
    baidu.lang.Class.call(this);

    this.interval = 16;
    this.duration = 500;
    this.dynamic  = true;

    baidu.object.extend(this, options);
};
baidu.lang.inherits(baidu.fx.Timeline, baidu.lang.Class, "baidu.fx.Timeline").extend({

    
    launch : function(){
        var me = this;
        me.dispatchEvent("onbeforestart");

        
        typeof me.initialize =="function" && me.initialize();

        me["\x06btime"] = new Date().getTime();
        me["\x06etime"] = me["\x06btime"] + (me.dynamic ? me.duration : 0);
        me["\x06pulsed"]();

        return me;
    }

    
    ,"\x06pulsed" : function(){
        var me = this;
        var now = new Date().getTime();
        // 当前时间线的进度百分比
        me.percent = (now - me["\x06btime"]) / me.duration;
        me.dispatchEvent("onbeforeupdate");

        // 时间线已经走到终点
        if (now >= me["\x06etime"]){
            typeof me.render == "function" && me.render(me.transition(me.percent = 1));

            // [interface run] finish()接口，时间线结束时对应的操作
            typeof me.finish == "function" && me.finish();

            me.dispatchEvent("onafterfinish");
            me.dispose();
            return;
        }

        
        typeof me.render == "function" && me.render(me.transition(me.percent));
        me.dispatchEvent("onafterupdate");

        me["\x06timer"] = setTimeout(function(){me["\x06pulsed"]()}, me.interval);
    }
    
    ,transition: function(percent) {
        return percent;
    }

    
    ,cancel : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];

        // [interface run] restore() 当时间线被撤销时的恢复操作
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");

        this.dispose();
    }

    
    ,end : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]();
    }
});
/// support magic - Tangram 1.x Code End



baidu.fx.create = function(element, options, fxName) {
    var timeline = new baidu.fx.Timeline(options);

    timeline.element = element;
    timeline.__type = fxName || timeline.__type;
    timeline["\x06original"] = {};   // 20100708
    var catt = "baidu_current_effect";

    
    timeline.addEventListener("onbeforestart", function(){
        var me = this, guid;
        me.attribName = "att_"+ me.__type.replace(/\W/g, "_");
        guid = me.element.getAttribute(catt);
        me.element.setAttribute(catt, (guid||"") +"|"+ me.guid +"|", 0);

        if (!me.overlapping) {
            (guid = me.element.getAttribute(me.attribName)) 
                && baiduInstance(guid).cancel();

            //在DOM元素上记录当前效果的guid
            me.element.setAttribute(me.attribName, me.guid, 0);
        }
    });

    
    timeline["\x06clean"] = function(e) {
        var me = this, guid;
        if (e = me.element) {
            e.removeAttribute(me.attribName);
            guid = e.getAttribute(catt);
            guid = guid.replace("|"+ me.guid +"|", "");
            if (!guid) e.removeAttribute(catt);
            else e.setAttribute(catt, guid, 0);
        }
    };

    
    timeline.addEventListener("oncancel", function() {
        this["\x06clean"]();
        this["\x06restore"]();
    });

    
    timeline.addEventListener("onafterfinish", function() {
        this["\x06clean"]();
        this.restoreAfterFinish && this["\x06restore"]();
    });

    
    timeline.protect = function(key) {
        this["\x06original"][key] = this.element.style[key];
    };

    
    timeline["\x06restore"] = function() {
        var o = this["\x06original"],
            s = this.element.style,
            v;
        for (var i in o) {
            v = o[i];
            if (typeof v == "undefined") continue;

            s[i] = v;    // 还原初始值

            // [TODO] 假如以下语句将来达不到要求时可以使用 cssText 操作
            if (!v && s.removeAttribute) s.removeAttribute(i);    // IE
            else if (!v && s.removeProperty) s.removeProperty(i); // !IE
        }
    };

    return timeline;
};




/// support magic - support magic - Tangram 1.x Code End




 

baidu.fx.scrollBy = function(element, distance, options) {
    if (!(element = baidu.dom.g(element)) || typeof distance != "object") return null;
    
    var d = {}, mm = {};
    d.x = distance[0] || distance.x || 0;
    d.y = distance[1] || distance.y || 0;

    var fx = baidu.fx.create(element, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            var t = mm.sTop   = element.scrollTop;
            var l = mm.sLeft  = element.scrollLeft;

            mm.sx = Math.min(element.scrollWidth - element.clientWidth - l, d.x);
            mm.sy = Math.min(element.scrollHeight- element.clientHeight- t, d.y);
        }

        //[Implement Interface] transition
        ,transition : function(percent) {return 1 - Math.pow(1 - percent, 2);}

        //[Implement Interface] render
        ,render : function(schedule) {
            element.scrollTop  = (mm.sy * schedule + mm.sTop);
            element.scrollLeft = (mm.sx * schedule + mm.sLeft);
        }

        ,restore : function(){
            element.scrollTop   = mm.sTop;
            element.scrollLeft  = mm.sLeft;
        }
    }, options), "baidu.fx.scroll");

    return fx.launch();
};

/// support magic - Tangram 1.x Code End


 

baidu.fx.scrollTo = function(element, point, options) {
    if (!(element = baidu.dom.g(element)) || typeof point != "object") return null;
    
    var d = {};
    d.x = (point[0] || point.x || 0) - element.scrollLeft;
    d.y = (point[1] || point.y || 0) - element.scrollTop;

    return baidu.fx.scrollBy(element, d, options);
};

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start







/// Tangram 1.x Code Start


baidu.lang.instance = function(guid){
    return baidu._global_._instances_[ guid ] || null
};


/// Tangram 1.x Code End





baidu.fx.current = function(element) {
    if (!(element = baidu.dom.g(element))) return null;
    var a, guids, reg = /\|([^\|]+)\|/g;

    // 可以向<html>追溯
    do {if (guids = element.getAttribute("baidu_current_effect")) break;}
    while ((element = element.parentNode) && element.nodeType == 1);

    if (!guids) return null;

    if ((a = guids.match(reg))) {
        //fix
        //在firefox中使用g模式，会出现ture与false交替出现的问题
        reg = /\|([^\|]+)\|/;
        
        for (var i=0; i<a.length; i++) {
            reg.test(a[i]);
//            a[i] = window[baidu.guid]._instances[RegExp["\x241"]];
            a[i] = baidu._global_._instances_[RegExp["\x241"]];
        }
    }
    return a;
};

/// support magic - Tangram 1.x Code End


baidu.lang.register(magic.control.Carousel, function(options){
    var me = this;
    me._options.fx = baidu.object.extend({
        enable: true
    }, me._options.fx);
    if(!me._options.fx.enable){return;}
    me.on('onbeforescroll', function(evt){
        evt.returnValue = false;
        if (baidu.fx.current(me.getElement('container'))) {return;}
        var opt = me._options,
            axis = me._axis[opt.orientation],
            orie = opt.orientation == 'horizontal',
            container = me.getElement('container'),
            val = container[axis.scrollPos] + evt.distance,
            fxOptions = baidu.object.extend({
                onbeforeupdate: function(){
                    if(evt.empty.length <= 0){return;}
                    var entry = evt.empty[0], parentNode, cloneNode;
                    if(evt.distance < 0 ? entry.empty[axis.offsetPos] + entry.empty[axis.offsetSize] - container[axis.scrollPos] >= 0
                        : entry.empty[axis.offsetPos] - container[axis.scrollPos] <= container[axis.offsetSize]){
                        parentNode = entry.empty.parentNode;
                        cloneNode = entry.empty.cloneNode(true);
                        parentNode.replaceChild(cloneNode, entry.empty);
                        parentNode.replaceChild(entry.empty, entry.item);
                        parentNode.replaceChild(entry.item, cloneNode);
                        evt.empty.shift();
                    }
                },
                
                onafterfinish: function(){
                	if(me.disposed)
                		return;
                    me._toggle(evt.index);
                    me._clear(evt.index, opt.focusRange[evt.distance < 0 ? 'min' : 'max']);
                    me._resize();
                    me.fire('onfocus', {direction: evt.distance > 0 ? 'forward' : 'backward'});
                }
            }, opt.fx);
        //
        baidu.fx.scrollTo(container, {x: orie ? val : 0, y: orie ? 0 : val}, fxOptions);
    });
});//依赖包




















/// support magic - Tangram 1.x Code Start






baidu.event.preventDefault = function (event) {
    return new baidu.event(event).preventDefault();
};
/// support magic - Tangram 1.x Code End



 
magic.Pager = baidu.lang.createClass(function(options) {
    var me = this;
    this.currentPage = 1;
    this.totalPage = 1;
    this.viewSize = 10;
    this.currentPagePos = 4;
    this.labelFirst = '首页';
    this.labelPrev = '上一页';
    this.labelNext = '下一页';
    this.labelLast = '尾页';
    this.tplURL = '##{pageNum}';
    this.tplLabelNormal = '#{pageNum}';
    this.tplLabelCurrent = '#{pageNum}';
    baidu.object.extend(this, options);
    this.currentPage = Math.max(this.currentPage, 1);
}, {
    type:"magic.Pager"
    ,superClass : magic.Base
}).extend(
    
{
    
    
    '_buildLink' : function(pageNum, className, innerHTML) {
        return '<a onclick="return baiduInstance(\'' + this.guid + '\').$update(' + pageNum + ')" href="' + baidu.string.format(this.tplURL, {'pageNum' : pageNum}) + '" class="tang-pager-' + className + '">'+ innerHTML + '</a>';
    },
    
    
    '$update' : function(currentPage) {
        this.currentPage = currentPage;
        var container = this.getElement();
        container.innerHTML = '';
        this.render(this.$getId());
       
        return this.fire('pagechange', {
            'pageNum' : currentPage
        });
    },
    
    
    '$toHTMLString' :  function() {
        var pageNum,
            HTMLString = [],
            //展现起始页
            startPage = this.totalPage < this.viewSize || this.currentPage <= this.currentPagePos ? 1 : Math.min(this.currentPage - this.currentPagePos, this.totalPage - this.viewSize + 1),
            //展现结束页
            endPage = Math.min(this.totalPage, startPage + this.viewSize - 1);
        HTMLString.push('<div id="' + this.$getId('main') + '" class="tang-pager-main">');
        //首页，前一页
        if (1 < this.currentPage) {
            HTMLString.push(this._buildLink(1, 'first', this.labelFirst));
            HTMLString.push(this._buildLink(this.currentPage - 1, 'previous', this.labelPrev));
        }
        //在当前页前面的页码
        for (pageNum = startPage; pageNum < this.currentPage; pageNum++) {
            HTMLString.push(this._buildLink(pageNum, 'normal', baidu.string.format(this.tplLabelNormal, {'pageNum' : pageNum})));
        }
        //当前页
        HTMLString.push('<span class="tang-pager-current">' + baidu.string.format(this.tplLabelCurrent, {'pageNum' : this.currentPage}) + '</span>');
        //在当前页后面的页码
        for (pageNum = this.currentPage + 1; pageNum <= endPage; pageNum++) {
            HTMLString.push(this._buildLink(pageNum, 'normal', baidu.string.format(this.tplLabelNormal, {'pageNum' : pageNum})));
        }
        //下一页，尾页
        if (this.totalPage > this.currentPage) {
            HTMLString.push(this._buildLink(this.currentPage + 1, 'next', this.labelNext));
            HTMLString.push(this._buildLink(this.totalPage, 'last', this.labelLast));
        }
        HTMLString.push('</div>');
        return HTMLString.join('');
    },
    
    
    'render' :  function(target) {
        if (!this.getElement()) {
            this.$mappingDom('', target || document.body);
        }
        target = baidu.dom('#'+target);
        baidu.dom(target).addClass('tang-pager')
        					.insertHTML('beforeEnd', this.$toHTMLString());
       
        this.fire("load");
    },
    
    
    '$dispose' : function() {
        if(this.disposed) {
            return;
        }
        var container = this.getElement(),
            main = this.getElement('main');
        baidu.dom(container).removeClass('tang-pager');
       
       
        magic.Base.prototype.$dispose.call(this);
        baidu.dom(main).remove();
        container = main = null;
    }
});

// baidu.lang.register(magic.Pager, function(){}); // totalCount/viewSize
// 以后添加那种只有上、下、第一、最后、goto的模式










baidu.date = baidu.date || {};







baidu.createChain('number', function(number){
    var nan = parseFloat(number),
        val = isNaN(nan) ? nan : number,
        clazz = typeof val === 'number' ? Number : String,
        pro = clazz.prototype;
    val = new clazz(val);
    baidu.forEach(baidu.number.$Number.prototype, function(value, key){
        pro[key] || (val[key] = value);
    });
    return val;
});








baidu.number.extend({
    pad : function (length) {
    	var source = this;
        var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));
    
        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
    
        return (negative ?  "-" : "") + pre + string;
    }
});





baidu.date.format = function (source, pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }
    
    var pad     = baidu.number.pad,
        year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};









//baidu.lang.isObject = function (source) {
//    return 'function' == typeof source || !!(source && 'object' == typeof source);
//};
baidu.lang.isObject = baidu.isObject;







//baidu.lang.isFunction = function (source) {
    // chrome下,'function' == typeof /a/ 为true.
//    return '[object Function]' == Object.prototype.toString.call(source);
//};
baidu.lang.isFunction = baidu.isFunction;




(function() {
var isPlainObject = function(source) {
        return baidu.lang.isObject(source) && !baidu.lang.isFunction(source);
    };

function mergeItem(target, source, index, overwrite, recursive) {
    if (source.hasOwnProperty(index)) {
        if (recursive && isPlainObject(target[index])) {
            // 如果需要递归覆盖，就递归调用merge
            baidu.object.merge(
                target[index],
                source[index],
                {
                    'overwrite': overwrite,
                    'recursive': recursive
                }
            );
        } else if (overwrite || !(index in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[index] = source[index];
        }
    }
}

baidu.object.merge = function(target, source, opt_options) {
    var i = 0,
        options = opt_options || {},
        overwrite = options['overwrite'],
        whiteList = options['whiteList'],
        recursive = options['recursive'],
        len;

    // 只处理在白名单中的属性
    if (whiteList && whiteList.length) {
        len = whiteList.length;
        for (; i < len; ++i) {
            mergeItem(target, source, whiteList[i], overwrite, recursive);
        }
    } else {
        for (i in source) {
            mergeItem(target, source, i, overwrite, recursive);
        }
    }

    return target;
};
})();

/// support magic - Tangram 1.x Code Start


/// support magic - Tangram 1.x Code Start




baidu.i18n = baidu.i18n || {};
/// support magic - Tangram 1.x Code End


baidu.i18n.date = baidu.i18n.date || {

    
    getDaysInMonth: function(year, month) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (month == 1 && baidu.i18n.date.isLeapYear(year)) {
            return 29;
        }
        return days[month];
    },

    
    isLeapYear: function(year) {
        return !(year % 400) || (!(year % 4) && !!(year % 100));
    },

    
    toLocaleDate: function(dateObject, sLocale, tLocale) {
        return this._basicDate(dateObject, sLocale, tLocale || baidu.i18n.currentLocale);
    },

    
    _basicDate: function(dateObject, sLocale, tLocale) {
        var tTimeZone = baidu.i18n.cultures[tLocale || baidu.i18n.currentLocale].timeZone,
            tTimeOffset = tTimeZone * 60,
            sTimeZone,sTimeOffset,
            millisecond = dateObject.getTime();

        if(sLocale){
            sTimeZone = baidu.i18n.cultures[sLocale].timeZone;
            sTimeOffset = sTimeZone * 60;
        }else{
            sTimeOffset = -1 * dateObject.getTimezoneOffset();
            sTimeZone = sTimeOffset / 60;
        }

        return new Date(sTimeZone != tTimeZone ? (millisecond  + (tTimeOffset - sTimeOffset) * 60000) : millisecond);
    },

    
    format: function(dateObject, tLocale) {
        // 拿到对应locale的format类型配置
        var c = baidu.i18n.cultrues[tLocale || baidu.i18n.currentLocale];
        return baidu.date.format(
            baidu.i18n.date.toLocaleDate(dateObject, "", tLocale),
            c.calendar.dateFormat);
    }
};
/// support magic -  Tangram 1.x Code End

























/// support magic - Tangram 1.x Code Start

/// support magic - Tangram 1.x Code Start



baidu.i18n.cultures = baidu.i18n.cultures || {};
/// support magic - Tangram 1.x Code End




baidu.i18n.cultures['zh-CN'] = baidu.object.extend(baidu.i18n.cultures['zh-CN'] || {}, {
    calendar: {
        dateFormat: 'yyyy-MM-dd',
        titleNames: '#{yyyy}年&nbsp;#{MM}月',
        monthNames: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        monthNamesShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dayNames: {mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六', sun: '日'}
    },
    
    timeZone: 8,
    whitespace: new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),
    
    number: {
        group: ",",
        groupLength: 3,
        decimal: ".",
        positive: "",
        negative: "-",

        _format: function(number, isNegative){
            return baidu.i18n.number._format(number, {
                group: this.group,
                groupLength: this.groupLength,
                decimal: this.decimal,
                symbol: isNegative ? this.negative : this.positive 
            });
        }
    },

    currency: {
        symbol: '￥'  
    },

    language: {
        ok: '确定',
        cancel: '取消',
        signin: '注册',
        signup: '登录'
    }
});

baidu.i18n.currentLocale = 'zh-CN';
/// support magic - Tangram 1.x Code End















/// support maigc - Tangram 1.x Code Start








//baidu.lang.isDate = function(o) {
//    // return o instanceof Date;
//    return {}.toString.call(o) === "[object Date]" && o.toString() !== 'Invalid Date' && !isNaN(o);
//};

baidu.lang.isDate = baidu.isDate;
/// support maigc Tangram 1.x Code End



magic.Calendar = baidu.lang.createClass(function(options){
    var me = this;
    me._options = baidu.object.extend({
        weekStart: 'sun',
        initDate: baidu.i18n.date.toLocaleDate(new Date()),
        highlightDates: [],
        disabledDates: [],
        disabledDayOfWeek: [],
        language: 'zh-CN'
    }, options || {});
    
    //当前日期表所显示的日期
    //使用new Date重新实例化，避免引用
    me.currentDate = new Date(me._options.initDate);

     //存储选中的日期
    me.selectedDate = new Date(me._options.initDate);

    //当前日历显示周一到周日的顺序
    me.dayNames = [];

}, { type: "magic.Calendar", superClass : magic.Base });

magic.Calendar.extend(

{
	
    tplSkeleton: '<div id="#{calendarId}" class="#{calendarClass}"><div id="#{titleId}" class="#{titleClass}"></div><div id="#{tableId}" class="#{tableClass}"></div></div>',
    
    
    tplDate: '<td id="#{id}" class="#{class}" onmouseover="#{mouseover}" onmouseout="#{mouseout}" onclick="#{click}">#{date}</td>',
    
    
    render: function(el){
        var me = this;
        
        if(baidu.type(el) === "string"){
            el = '#' + el;
        }
        me.container = baidu(el)[0];

        //渲染日历骨架
        me._renderSkeleton();

        //渲染标题（即年份月份）
        me._renderTitle();

        //渲染日期表格
        me._renderDateTable();

        //渲染月份跳转按钮
        me._renderNavBtn();

        //给表格绑定事件
        me._bindTable();

        //给跳转按钮绑定事件
        me._bindNavBtn();

        //快捷键
        me._addkeystrokesListener();
        
          
        me.fire("render");
    },

    
    _rerender: function(){
        var me = this;

        //渲染标题（即年份月份）
        me._renderTitle();

        //渲染日期表格
        me._renderDateTable();

        //重新绑定table上的事件代理
        me._bindTable();
    },
    
    
    _getId: function(name){
        return this._eid + (name === undefined ? 'tang_calendar' : 'tang_calendar_' + name);
    },
    
    
    _getClass: function(name){
        return name === undefined ? 'tang-calendar' : 'tang-calendar-' + name;
    },

    
    _renderSkeleton: function(){
        var me = this,
            container = me.container;
        
        baidu(container).insertHTML('beforeEnd', baidu.string.format(me.tplSkeleton, {
            calendarId: me._getId(),
            calendarClass: me._getClass(),
            titleId: me._getId('title'),
            titleClass: me._getClass('title'),
            tableId: me._getId('table'),
            tableClass: me._getClass('table')
        }));
        
        me.titleEl = baidu('#' + me._getId('title'))[0];
        me.tableEl = baidu('#' + me._getId('table'))[0];

        me.$mappingDom('', baidu('#' + me._getId())[0]);
        me.$mappingDom('calendar', baidu('#' + me._getId())[0]);
        me.$mappingDom('title', me.titleEl);
        me.$mappingDom('table', me.tableEl);
    },

    
    _renderTitle: function(){
        var me = this,
            date = me.currentDate,
            year = date.getFullYear(),
            month = date.getMonth() + 1;
            
        me.titleEl.innerHTML = baidu.string.format(baidu.i18n.cultures[me._options.language].calendar.titleNames, {
            "yyyy": year,
            'MM': baidu.i18n.cultures[me._options.language].calendar.monthNamesShort[month-1]
        });
    },

    
    _renderDateTable: function(){
        var thead = this._getTheadString(),
            tbody = this._getTbodyString();
        
        this.tableEl.innerHTML = '<table border="0" cellpadding="0" cellspacing="0">' + thead + tbody + '</table>';
    },
    
    
    _renderNavBtn: function(){
        var me = this,
            calendarEl = baidu('#' + me._getId())[0],
            doc = document,
            preBtn = doc.createElement("div"),
            nextBtn = doc.createElement("div"),
            preYear = doc.createElement("div"),
            nextYear = doc.createElement("div");
            
        preBtn.className = me._getClass('prebtn');
        nextBtn.className = me._getClass('nextbtn');
        preYear.className = me._getClass('yprebtn');
        nextYear.className = me._getClass('ynextbtn');

        calendarEl.appendChild(preBtn);
        calendarEl.appendChild(nextBtn);
        calendarEl.appendChild(preYear);
        calendarEl.appendChild(nextYear);

        me.preBtn = preBtn;
        me.nextBtn = nextBtn;
        me.ypreBtn = preYear;
        me.ynextBtn = nextYear;

        me.$mappingDom('premonthbtn', preBtn);
        me.$mappingDom('nextmonthbtn', nextBtn);
        me.$mappingDom('preyearbtn', preYear);
        me.$mappingDom('preyearhbtn', nextYear);
    },

    
    _bindNavBtn: function(){
        var me = this,
            preBtn = me.preBtn,
            nextBtn = me.nextBtn,
            ypreBtn = me.ypreBtn,
            ynextBtn = me.ynextBtn,
            mousedownrespond = false,
            preBtnClickHandler,
            nextBtnClickHandler,
            ypreBtnClickHandler,
            ynextBtnClickHandler,
            preBtnMouseHandler,
            nextBtnMouseHandler,
            ypreBtnMouseHandler,
            ynextBtnMouseHandler,
            documentHandler;

        baidu(preBtn).on('click', preBtnClickHandler = function(){
            !mousedownrespond && me.preMonth();
            mousedownrespond = false;
              
            me.fire("premonth");
        });
        baidu(nextBtn).on('click', nextBtnClickHandler = function(){
            !mousedownrespond && me.nextMonth();
            mousedownrespond = false;
              
            me.fire("nextmonth");
        });
        baidu(ypreBtn).on('click', ypreBtnClickHandler = function(){
            !mousedownrespond && me.preYear();
            mousedownrespond = false;
              
            me.fire("preyear");
        });
        baidu(ynextBtn).on('click', ynextBtnClickHandler = function(){
            !mousedownrespond && me.nextYear();
            mousedownrespond = false;
              
            me.fire("nextyear");
        });

        //响应鼠标一直按下的事件
        var timer = null;
        var mouseDownHandler = function(direction, isYear){
            if(timer){
                return;
            }
            function createTimer(){
                timer = setTimeout(function(){
                    isYear ? (direction == 'pre' ? me.preYear() : me.nextYear())
                            : (direction == 'pre' ? me.preMonth() : me.nextMonth());
                    mousedownrespond = true;
                    createTimer();
                }, 500);
            }
            createTimer();
        };
        var mouseUpHandler = function(){
            clearTimeout(timer);
            timer = null;
        };
        
        baidu(preBtn).on('mousedown', preBtnMouseHandler = function(){
            mouseDownHandler('pre');
        });

        baidu(nextBtn).on('mousedown', nextBtnMouseHandler = function(){
            mouseDownHandler('next');
        });
        
        baidu(ypreBtn).on('mousedown', ypreBtnMouseHandler = function(){
            mouseDownHandler('pre', true);
        });

        baidu(ynextBtn).on('mousedown', ynextBtnMouseHandler = function(){
            mouseDownHandler('next', true);
        });

        baidu(document).on('mouseup', documentHandler = function(){
            if(me.disposed) return;
            
            timer && mouseUpHandler();
        });
        
        me.on("dispose", function(){
            baidu(preBtn).off('click', preBtnClickHandler);
            baidu(nextBtn).off('click', nextBtnClickHandler);
            baidu(ypreBtn).off('click', ypreBtnClickHandler);
            baidu(ynextBtn).off('click', ynextBtnClickHandler);
            baidu(preBtn).off('mousedown', preBtnMouseHandler);
            baidu(nextBtn).off('mousedown', nextBtnMouseHandler);
            baidu(ypreBtn).off('mousedown', ypreBtnMouseHandler);
            baidu(ynextBtn).off('mousedown', ynextBtnMouseHandler);
            baidu(document).off('mouseup', documentHandler);
        });
          
    },

    
    _getTheadString: function(){
        var me = this,
            dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            dayName,
            theadString = [],
            weekStart = me._options.weekStart.toLowerCase(),
            index = baidu.array.indexOf(dayNames, weekStart),
            i18nCalendar = baidu.i18n.cultures[me._options.language].calendar.dayNames,
            i = 0;

        theadString.push('<thead class="' + me._getClass("weekdays") + '"><tr>');
        for(; i<7; i++){
            index > 6 && (index = 0);
            me.dayNames.push(dayNames[index]);
            dayName = i18nCalendar[dayNames[index]];
            theadString.push('<th>' + dayName + '</th>');
            index++;
        }
        theadString.push('</tr></thead>');
        
        return theadString.join('');
    },
    
    
    _getTbodyString: function(){
        var me = this,
            dayNames = me.dayNames,
            defaultDayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            date = new Date(me.currentDate),    //使用new Date()来创建一个新的日期对象，否则可能会不小心改变me.currentDate的值
            day,
            predays = 0,    //当前日历表中上一个月份的天数
            tableString = [],
            dayOfFirstDay = 0,  //本月第一天是星期几
            daysInMonth = baidu.i18n.date.getDaysInMonth(date.getFullYear(), date.getMonth()),
            weeks = 5,  //每个日历表需要显示的星期个数，一般为5周，特殊情况时为6周
            selectedId = '',    //已选中日期对应的td的id
            dateStr = '';   //写在每个td自定义属性上的日期字符串

        date.setDate(1);//将当天日期设置到1号（即当月第一天）
        day = date.getDay();

        predays = baidu.array.indexOf(dayNames, defaultDayNames[day]);

        //如果上个月天数加上本月天数超过5*7，则日历表需要显示6周
        if(predays + daysInMonth > 35){
            weeks = 6;
        }
        date.setDate(date.getDate() - predays); //回退到当前日历表中的第一天

        var i = 0, j = 0, classname = '';
        for(; i < weeks; i++){
            tableString.push('<tr>');
            for(; j < 7; j++){
                classname = me._getClass("date");
                selectedId = '';
                //是否周末
                if(date.getDay() == 0 || date.getDay() == 6){
                    classname += ' ' + me._getClass("weekend");
                }
                //是否当天
                if(me._datesEqual(baidu.i18n.date.toLocaleDate(new Date()), date)){
                    classname += ' ' + me._getClass("today");
                }
                //是否是高亮日期
                if(me._datesContains(me._options.highlightDates, date)){
                    classname += ' ' + me._getClass("highlight");
                }
                //是否是不可用日期
                if(me._datesContains(me._options.disabledDates, date)){
                    classname += ' ' + me._getClass("disable");
                }
                //是否是不可用星期
                if(me._dayOfWeekInDisabled(date.getDay())){
                    classname += ' ' + me._getClass("disable");
                }
                //是否是已选择的日期
                if(me._datesEqual(me.selectedDate, date)){
                    classname += ' ' + me._getClass("selected");
                    selectedId = 'id="' + me._getId("selected") + '"';
                }
                //是否是其他月份日期
                if(date.getMonth() < me.currentDate.getMonth() || date.getFullYear() < me.currentDate.getFullYear()){
                    classname += ' ' + me._getClass("premonth");
                }else if(date.getMonth() > me.currentDate.getMonth() || date.getFullYear() > me.currentDate.getFullYear()){
                    classname += ' ' + me._getClass("nextmonth");
                }

                dateStr = me._formatDate(new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()));
                tableString.push('<td ' + selectedId + ' class="' + classname + '" date="' + dateStr + '" onmouseover=baiduInstance("' + me.guid + '")._mouseoverHandler(event) onmouseout=baiduInstance("' + me.guid + '")._mouseoutHandler(event)>' + date.getDate() + '</td>');
                date.setDate(date.getDate() + 1);
            }
            tableString.push('</tr>');
            j = 0;
        }

        return '<tbody>' + tableString.join('') + '</tbody>';
    },

    
    _formatDate: function(d){
        var year = d.getFullYear(),
            month = d.getMonth() + 1,
            date = d.getDate();

        month = month >= 10 ? month : ('0' + month);
        date = date >= 10 ? date : ('0' + date);

        return year + '/' + month + '/' + date;
    },

    
    _mouseoverHandler: function(e){
        var me = this,
            target;

        target = baidu.event(e).target;
        baidu(target).addClass(me._getClass("hover"));

          
        me.fire("mouseover", {
            'target': target
        });
    },

    
    _mouseoutHandler: function(e){
        var me = this,
            target;

        target = baidu.event(e).target;
        baidu(target).removeClass(me._getClass("hover"));

          
        me.fire("mouseout", {
            'target': target
        });
    },
    
    
    _bindTable: function(){
        var me = this,
            tbodyEl = baidu('#' + me._getId("table"))[0].getElementsByTagName("tbody")[0],
            target,
            dateStr,
            date,
            _selectedEl,
            clickHandler;

        baidu(tbodyEl).on("click", clickHandler = function(e){
            target = e.target;
            if(target.tagName.toUpperCase() != "TD"){
                return;
            }

            dateStr = target.getAttribute('date');
            date = new Date(dateStr);

            var curDate = me.selectedDate;
            date.setHours(curDate.getHours());
            date.setMinutes(curDate.getMinutes());
            date.setSeconds(curDate.getSeconds());

            //判断日期是否处于不可用状态
            if(me._datesContains(me._options.disabledDates, date)){
                return;
            }
            //判断星期是否处于不可用状态
            if(me._dayOfWeekInDisabled(date.getDay())){
                return;
            }
            _selectedEl = baidu('#' + me._getId("selected"))[0];
            if(_selectedEl){
                _selectedEl.id = '';
                baidu(_selectedEl).removeClass(me._getClass("selected"));
            }
            
            target.id = me._getId("selected");
            baidu(target).addClass(me._getClass("selected"));

            dateStr = me._formatDate(date);
            me.selectedDate = new Date(dateStr);

              
            me.fire("selectdate", {
                'date': new Date(dateStr)
            });
        });
        
        me.on("dispose", function(){
            baidu(tbodyEl).off("click", clickHandler);
        });

    },

    
    _addkeystrokesListener: function(){
        var me = this,
            listenerAdded = false,
            calendarEl = baidu('#' + me._getId())[0],
            clickHandler;

        function keystrokesHandler(e){
            e = e || window.event;
            //e.preventDefault();
            var preventDefault =  true;
            switch (e.keyCode) {
                case 33:    //Page Up键
                    me.preMonth();
                    break;
                case 34:    //Page Down键
                    me.nextMonth();
                    break;
                case 37:    //左方向键
                    me._preDay();
                    break;
                case 38:    //上方向键
                    me._preDay();
                    break;
                case 39:    //右方向键
                    me._nextDay();
                    break;
                case 40:    //下方向键
                    me._nextDay();
                    break;
                default:
                    preventDefault =  false;
                    break;
            }
            preventDefault && e.preventDefault();
        }

        baidu(document).on("click", clickHandler = function(e){
            
            if(me.disposed) return;
            
            var target = e.target;
            
            if(!(baidu.dom.contains(calendarEl, target) || target == calendarEl)){
                baidu(document).off("keydown", keystrokesHandler);
                listenerAdded = false;
            }else{
                if(listenerAdded)
                    return;
                baidu(document).on("keydown", keystrokesHandler);
                listenerAdded = true;
            }
        });
        
        me.on("dispose", function(){
            baidu(document).off("click", clickHandler);
        });

    },

    
    _datesEqual: function(d1, d2){
        
        if(baidu.type(d1) != 'date' || baidu.type(d2) != 'date'){
            return;
        }
        
        var year1 = d1.getFullYear(),
            month1 = d1.getMonth(),
            date1 = d1.getDate(),

            year2 = d2.getFullYear(),
            month2 = d2.getMonth(),
            date2 = d2.getDate();

        return (year1 == year2) && (month1 == month2) && (date1 == date2);
    },

    _days: {'mon':1, 'tue':2, 'wed':3, 'thu':4, 'fri':5, 'sat':6, 'sun':0},
    
    _dayOfWeekInDisabled: function(day){
        var disabledDays = this._options.disabledDayOfWeek, 
            days = this._days,
            result = false,
            i = 0, 
            item;
        for(; i < disabledDays.length; i++){
                item = disabledDays[i];
                typeof item == 'object' ?
                    (days[item.start] || 0) <= day && day <= days[item.end] && (result = true)
                    : days[item] == day && (result = true);
                if(result){
                    break;
                }

        }
        return result;
    },

    
    _datesContains: function(dates, source){
        var me = this,
            i = 0,
            len = dates.length,
            item,
            flag = true;
            
        if(baidu.type(source) != 'date'){
            return;
        }

        for(; i<len; i++){
            item = dates[i];
            if(baidu.lang.isDate(item)){
                if(me._datesEqual(item, source)){
                    return true;
                }
            }else{
                if(item.end){
                   item.end = new Date(baidu.date.format(item.end, "yyyy/MM/dd") + " 23:59:59"); //将结束时间调整为该天的23点59分59秒
                }

                if((!item.start || source.getTime() >= item.start.getTime()) && (!item.end || source.getTime() <= item.end.getTime())){
                    return true;
                }
            }
        }

        return false;
    },

    
    go: function(year, month){
        var me = this;

        me.currentDate.setFullYear(year);

        me.currentDate.setDate(1);  //必须首先将日设置成1号，否则从1月30日或者3月30日向2月份跳转时会出错
        month = month === undefined ? me.currentDate.getMonth() : month - 1;
        me.currentDate.setMonth(month);

        me._rerender();
    },
    
    
    getDate: function(){
        return new Date(this.selectedDate);
    },
    
    
    setDate: function(date){
        var me = this,
            _date = new Date(date);
            
        if(baidu.type(date) != 'date'){
            return false;
        }

        //判断日期是否处于不可用状态
        if(me._datesContains(me._options.disabledDates, _date)){
            return;
        }
        //判断星期是否处理不可用状态
        if(me._dayOfWeekInDisabled(_date.getDay())){
            return;
        }

        me.currentDate = new Date(date);
        me.selectedDate = new Date(date);
        
        me._rerender();
        return true;
    },
    
    
    preMonth: function(){
        var me = this,
            currentDate = me.currentDate,
            currentMonth = currentDate.getMonth() + 1,
            currentYear = currentDate.getFullYear();
            
        me.go(currentYear, currentMonth - 1);
    },
    
    
    nextMonth: function(){
        var me = this,
            currentDate = me.currentDate,
            currentMonth = currentDate.getMonth() + 1,
            currentYear = currentDate.getFullYear();
            
        me.go(currentYear, currentMonth + 1);
    },

    
    preYear: function(){
        var me = this,
            currentDate = me.currentDate;
            
        me.go(currentDate.getFullYear() - 1, currentDate.getMonth() + 1);
    },
    
    
    nextYear: function(){
        var me = this,
            currentDate = me.currentDate;
            
        me.go(currentDate.getFullYear() + 1, currentDate.getMonth() + 1);
    },

    
    _preDay: function(){
        var me = this,
            _date = new Date(me.selectedDate);

        _date.setDate(_date.getDate() - 1);

        me.setDate(_date);
        
        me.fire("selectdate", {
            'date': _date
        });
    },

    
    _nextDay: function(){
            var me = this,
            _date = new Date(me.selectedDate);

        _date.setDate(_date.getDate() + 1);

        me.setDate(_date);
        
        me.fire("selectdate", {
            'date': _date
        });
    },
    
    
    $dispose: function(){
        var me = this;
        if(me.disposed){
            return;
        }
        me.container.removeChild(baidu('#' + me._getId())[0]);
        magic.Base.prototype.$dispose.call(me);
    }
    
    
});




magic.control.DatePicker = baidu.lang.createClass(function(options){
	var me = this;

    me._options = options;
	
	me.language = options.language || "zh-CN";
    me.format = options.format || baidu.i18n.cultures[me.language].calendar.dateFormat || 'yyyy-MM-dd HH:mm:ss';
    me.popupOption = baidu.object.merge({"autoHide": false, "autoTurn": false, 'disposeOnHide': false}, options.popupOptions);
    me.calendarOption = baidu.object.merge({}, options.calendarOptions);
    me.calendarOption.language = me.language;

    me.showing = false;
    
},{
	type: "magic.control.DatePicker",
	superClass: magic.Base
})
.extend(
     
{
    
    init: function(){
		var me = this,
			popup = me.popup = new magic.Popup(me.popupOption),
			calendar = me.calendar = new magic.Calendar(me.calendarOption),
			input = me.input = me.getElement("input");
		
        //如果开启title插件，初始化该插件
        if(me._options.title && me._options.title.enable){
            me.init$title();
        }
		calendar.render(popup.getElement("content"));
		
		me.calendar.on("selectdate", function(e, param){
	    	//格式化日期
	    	input.value = baidu.date.format(e.date, me.format);
            if(!(param && param.ignoreHide)){
                me.hide();
            }

              
            me.fire("selectdate", {
                'date': new Date(e.date)
            });
	    });
	    
	    function focusHandler(){
            me.show();
        }
        
        function documentClickHandler(e){
            var target = baidu.event(e).target,
                node = calendar.getElement("calendar");
            if(target != input && !(baidu(node).contains(target) || node == target)){
                me.hide();
            }
        }
	    
	    baidu(input).on("click focus", focusHandler);
	    
	    //input的值改变的时候，日历自动调整日期
	    if (!("oninput" in document.body)) {
            input.onpropertychange = function() {
                if(me.disposed) return;
                if (event.propertyName == "value")
                    this.oninput && this.oninput(event);
            }
        }
        input.oninput = function() {
            if(me.disposed) return;
           
            if(me._getInputDate() && me.calendar.setDate(me._getInputDate())){
                me.fire("selectdate", {
                    'date': new Date(me._getInputDate())
                });
            }
        }
        
	    baidu(document).on("click", documentClickHandler);
	    
	    //dispose时，移除事件监听
	    me.on("dispose", function(){
	        baidu(input).off("click", focusHandler);
            baidu(input).off("focus", focusHandler);
            baidu(document).off("click", documentClickHandler);
        });
	    
	    
	    //将calendar元素映射出来
	    me.$mappingDom('calendar', calendar.getElement("calendar"));
    },

    
    show: function(){
		var me = this,
			date = new Date();

        if(me.showing){
            return;
        }

        me.showing = true;

		me.calendar.setDate(me._getInputDate() || me.calendarOption.initDate || baidu.i18n.date.toLocaleDate(new Date()));
		me.popup.attach(me.input, {
			'offsetY': me.popupOption.offsetY || -1,
			'offsetX': me.popupOption.offsetX || 0
		});
		
        
		me.fire("show");
    },

    
    hide: function(){
		var me = this;
		
        if(!me.showing){
            return;
        }
        me.showing = false;

		me.popup.hide();
		
        
        me.fire("hide");
    },
    
    getDate: function(){
        return baidu.i18n.date.toLocaleDate(new Date());
    },
    
    getSelectedDate: function(){
        return new Date(this.calendar.getDate());
    },
    
    _getInputDate: function(){
        var me = this,
            dateValue = me.input.value,
            patrn = [/yyyy|yy/, /M{1,2}/, /d{1,2}/,/H{1,2}/,/m{1,2}/,/s{1,2}/],//只支持到年月日的格式化，需要时分秒的请扩展此数组
            len = patrn.length,
            date = [],
            regExp,
            index,
            _return;

        if(!dateValue){return;}
        for(var i = 0; i < len; i++){
            if(regExp = patrn[i].exec(me.format)){
                index = regExp.index;
                date[i] = dateValue.substring(index, index + regExp[0].length);
            }
        }
        
        _return = new Date(date[0], date[1] - 1, date[2], date[3] || null, date[4] || null, date[5] || null);  //需要时分秒的则扩展参数
        if(baidu.lang.isDate(_return))
            return _return;
        else
            return ;
    },

   
    
    $dispose: function(){
        var me = this;
            
        if(me.disposed){
            return;
        }
        
        me.calendar.$dispose();
        me.popup.$dispose();
        //popup在析构的时候会将节点保留在DOM中，以备重复利用，所以此处析构时不能移除popup节点
        
        magic.Base.prototype.$dispose.call(me);
        
    }
    
    
	
});



magic.setup.datePicker = function(el, options){
	if(baidu.type(el) === "string"){
        el = '#' + el;
    }
	var el = baidu(el)[0],
   	
	   instance = magic.setup(el, magic.control.DatePicker, options);
	instance.$mappingDom('input', el);
	instance.init();
	
	return instance;
};

























baidu.dom.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu._util_.cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});

/// Tangram 1.x Code Start



/// Tangram 1.x Code End





















baidu.dom.createElements = function() {
    var tagReg  = /<(\w+)/i,
        rhtml = /<|&#?\w+;/,
        tagMap  = {
            area    : [1, "<map>", "</map>"],
            col     : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            legend  : [1, "<fieldset>", "</fieldset>"],
            option  : [1, "<select multiple='multiple'>", "</select>"],
            td      : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            thead   : [1, "<table>", "</table>"],
            tr      : [2, "<table><tbody>", "</tbody></table>"],
            _default: [0, "", ""]
        };

    // 建立映射
    tagMap.optgroup = tagMap.option;
    tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
    tagMap.th = tagMap.td;

    // 将<script>解析成正常可执行代码
    function parseScript ( box, doc ) {
        var list = box.getElementsByTagName("SCRIPT"),
            i, script, item;

        for ( i=list.length-1; i>=0; i-- ) {
            item = list[ i ];
            script = doc.createElement( "SCRIPT" );

            item.id && (script.id = item.id);
            item.src && (script.src = item.src);
            item.type && (script.type = item.type);
            script[ item.text ? "text" : "textContent" ] = item.text || item.textContent;

            item.parentNode.replaceChild( script, item );
        }
    }

    return function( htmlstring, doc ) {
        baidu.isNumber( htmlstring ) && ( htmlstring = htmlstring.toString() );
        doc = doc || document;

        var wrap, depth, box,
            hs  = htmlstring,
            n   = hs.length,
            div = doc.createElement("div"),
            df  = doc.createDocumentFragment(),
            result = [];

        if ( baidu.isString( hs ) ) {
            if(!rhtml.test(hs)){// TextNode
                result.push( doc.createTextNode( hs ) );
            }else {//htmlString
                wrap = tagMap[ hs.match( tagReg )[1].toLowerCase() ] || tagMap._default;

                div.innerHTML = "<i>mz</i>" + wrap[1] + hs + wrap[2];
                div.removeChild( div.firstChild );  // for ie (<script> <style>)
                parseScript(div, doc);

                depth = wrap[0];
                box = div;
                while ( depth -- ) { box = box.firstChild; };

                baidu.merge( result, box.childNodes );

                // 去除 item.parentNode
                baidu.forEach( result, function (dom) {
                    df.appendChild( dom );
                } );

                div = box = null;
            }
        }

        div = null;

        return result;
    };
}();












baidu.dom.extend({
    html: function(value){

        var bd = baidu.dom,
            bt = baidu._util_,
            me = this,
            isSet = false,
            htmlSerialize = !!bt.support.dom.div.getElementsByTagName('link').length,
            leadingWhitespace = (bt.support.dom.div.firstChild.nodeType === 3),
            result;

        //当dom选择器为空时
        if( !this.size() )
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }
        
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnoInnerhtml = /<(?:script|style|link)/i,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        if ( !htmlSerialize )
            wrapMap._default = [ 1, "X<div>", "</div>" ];

        baidu.forEach( me, function( elem, index ){
            
            if( result )
                return;

            var tangramDom = bd(elem);

            switch( typeof value ){
                case 'undefined':
                    result = ( elem.nodeType === 1 ? elem.innerHTML : undefined );
                    return ;
                break;

                case 'number':
                    value = String(value);

                case 'string':
                    isSet = true;

                    // See if we can take a shortcut and just use innerHTML
                    if ( !rnoInnerhtml.test( value ) &&
                        ( htmlSerialize || !rnoshimcache.test( value )  ) &&
                        ( leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                        !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                        value = value.replace( rxhtmlTag, "<$1></$2>" );

                        try {

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                tangramDom.empty();
                                elem.innerHTML = value;
                            }

                            elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                        } catch(e) {}
                    }

                    if ( elem ) {
                        me.empty().append( value );
                    }

                break;

                case 'function':
                    isSet = true;
                    tangramDom.html(value.call(elem, index, tangramDom.html()));
                break;
            };
        });
        
        return isSet ? me : result;
    }
});


baidu._util_.smartInsert = function(tang, args, callback){
    if(args.length <= 0 || tang.size() <= 0){return;}
    if(baidu.type(args[0]) === 'function'){
        var fn = args[0],
            tangItem;
        return baidu.forEach(tang, function(item, index){
            tangItem = baidu.dom(item);
            args[0] = fn.call(item, index, tangItem.html());
            baidu._util_.smartInsert(tangItem, args, callback);
        });
    }
    var doc = tang.getDocument() || document,
        fragment = doc.createDocumentFragment(),
        len = tang.length - 1,
        firstChild;
    for(var i = 0, item; item = args[i]; i++){
        if(item.nodeType){
            fragment.appendChild(item);
        }else{
            baidu.forEach(~'string|number'.indexOf(baidu.type(item)) ?
                baidu.dom.createElements(item, doc)
                    : item, function(ele){
                        fragment.appendChild(ele);
                    });
        }
    }
    if(!(firstChild = fragment.firstChild)){return;}
    baidu.forEach(tang, function(item, index){
        callback.call(item.nodeName.toLowerCase() === 'table'
            && firstChild.nodeName.toLowerCase() === 'tr' ?
                item.tBodies[0] || item.appendChild(item.ownerDocument.createElement('tbody'))
                    : item, index < len ? fragment.cloneNode(true) : fragment);
    });
};






baidu.dom.extend({
    append: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});


baidu.dom.extend({
    text: function(value){

        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;

        //当dom选择器为空时
        if(this.size()<=0){
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }            
        }

        
        var getText = function( elem ) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if ( nodeType ) {
                if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
            } else {

                // If no nodeType, this is expected to be an array
                for ( ; (node = elem[i]); i++ ) {
                    // Do not traverse comment nodes
                    ret += getText( node );
                }
            }
            return ret;
        };

        baidu.forEach(me,function(elem, index){
            
            var tangramDom = bd(elem);
            if(result){
                return;
            };

            switch(typeof value){
                case 'undefined':
        
                    //get first
                    result = getText(elem);
                    return result;

                break;

                case 'number':
                    value = String(value);
                case 'string':

                    //set all
                    isSet = true;
                    tangramDom.empty().append( ( elem && elem.ownerDocument || document ).createTextNode( value ) );
                break;

                case 'function':

                    //set all
                    isSet = true;
                    tangramDom.text(value.call(elem, index, tangramDom.text()));

                break;
            };
        });

        return isSet?me:result;
    }
});








void function(){
    var arr = ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel " +
	"change select submit keydown keypress keyup error contextmenu").split(" ");

    var conf = {};
    var create = function( name ){
        conf[ name ] = function( data, fn ){
		    if( fn == null )
		    	fn = data,
		    	data = null;

		    return arguments.length > 0 ?
		    	this.on( name, null, data, fn ) :
		    	this.trigger( name );
		}
    };

	for(var i = 0, l = arr.length; i < l; i ++)
		create( arr[i] );

	baidu.dom.extend( conf );
}();









baidu.array.extend({
    remove : function (match) {
        var n = this.length;
            
        while (n--) {
            if (this[n] === match) {
                this.splice(n, 1);
            }
        }
        return this;
    }
});






void function(){
    var arr = ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel " +
	"change select submit keydown keypress keyup error contextmenu").split(" ");

    var conf = {};
    var create = function( name ){
        conf[ name ] = function( data, fn ){
		    if( fn == null )
		    	fn = data,
		    	data = null;

		    return arguments.length > 0 ?
		    	this.on( name, null, data, fn ) :
		    	this.trigger( name );
		}
    };

	for(var i = 0, l = arr.length; i < l; i ++)
		create( arr[i] );

	baidu.dom.extend( conf );
}();









baidu.dom.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu._util_.cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});

/// Tangram 1.x Code Start



/// Tangram 1.x Code End





















baidu.dom.createElements = function() {
    var tagReg  = /<(\w+)/i,
        rhtml = /<|&#?\w+;/,
        tagMap  = {
            area    : [1, "<map>", "</map>"],
            col     : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            legend  : [1, "<fieldset>", "</fieldset>"],
            option  : [1, "<select multiple='multiple'>", "</select>"],
            td      : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            thead   : [1, "<table>", "</table>"],
            tr      : [2, "<table><tbody>", "</tbody></table>"],
            _default: [0, "", ""]
        };

    // 建立映射
    tagMap.optgroup = tagMap.option;
    tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
    tagMap.th = tagMap.td;

    // 将<script>解析成正常可执行代码
    function parseScript ( box, doc ) {
        var list = box.getElementsByTagName("SCRIPT"),
            i, script, item;

        for ( i=list.length-1; i>=0; i-- ) {
            item = list[ i ];
            script = doc.createElement( "SCRIPT" );

            item.id && (script.id = item.id);
            item.src && (script.src = item.src);
            item.type && (script.type = item.type);
            script[ item.text ? "text" : "textContent" ] = item.text || item.textContent;

            item.parentNode.replaceChild( script, item );
        }
    }

    return function( htmlstring, doc ) {
        baidu.isNumber( htmlstring ) && ( htmlstring = htmlstring.toString() );
        doc = doc || document;

        var wrap, depth, box,
            hs  = htmlstring,
            n   = hs.length,
            div = doc.createElement("div"),
            df  = doc.createDocumentFragment(),
            result = [];

        if ( baidu.isString( hs ) ) {
            if(!rhtml.test(hs)){// TextNode
                result.push( doc.createTextNode( hs ) );
            }else {//htmlString
                wrap = tagMap[ hs.match( tagReg )[1].toLowerCase() ] || tagMap._default;

                div.innerHTML = "<i>mz</i>" + wrap[1] + hs + wrap[2];
                div.removeChild( div.firstChild );  // for ie (<script> <style>)
                parseScript(div, doc);

                depth = wrap[0];
                box = div;
                while ( depth -- ) { box = box.firstChild; };

                baidu.merge( result, box.childNodes );

                // 去除 item.parentNode
                baidu.forEach( result, function (dom) {
                    df.appendChild( dom );
                } );

                div = box = null;
            }
        }

        div = null;

        return result;
    };
}();












baidu.dom.extend({
    html: function(value){

        var bd = baidu.dom,
            bt = baidu._util_,
            me = this,
            isSet = false,
            htmlSerialize = !!bt.support.dom.div.getElementsByTagName('link').length,
            leadingWhitespace = (bt.support.dom.div.firstChild.nodeType === 3),
            result;

        //当dom选择器为空时
        if( !this.size() )
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }
        
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnoInnerhtml = /<(?:script|style|link)/i,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        if ( !htmlSerialize )
            wrapMap._default = [ 1, "X<div>", "</div>" ];

        baidu.forEach( me, function( elem, index ){
            
            if( result )
                return;

            var tangramDom = bd(elem);

            switch( typeof value ){
                case 'undefined':
                    result = ( elem.nodeType === 1 ? elem.innerHTML : undefined );
                    return ;
                break;

                case 'number':
                    value = String(value);

                case 'string':
                    isSet = true;

                    // See if we can take a shortcut and just use innerHTML
                    if ( !rnoInnerhtml.test( value ) &&
                        ( htmlSerialize || !rnoshimcache.test( value )  ) &&
                        ( leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                        !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                        value = value.replace( rxhtmlTag, "<$1></$2>" );

                        try {

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                tangramDom.empty();
                                elem.innerHTML = value;
                            }

                            elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                        } catch(e) {}
                    }

                    if ( elem ) {
                        me.empty().append( value );
                    }

                break;

                case 'function':
                    isSet = true;
                    tangramDom.html(value.call(elem, index, tangramDom.html()));
                break;
            };
        });
        
        return isSet ? me : result;
    }
});


baidu._util_.smartInsert = function(tang, args, callback){
    if(args.length <= 0 || tang.size() <= 0){return;}
    if(baidu.type(args[0]) === 'function'){
        var fn = args[0],
            tangItem;
        return baidu.forEach(tang, function(item, index){
            tangItem = baidu.dom(item);
            args[0] = fn.call(item, index, tangItem.html());
            baidu._util_.smartInsert(tangItem, args, callback);
        });
    }
    var doc = tang.getDocument() || document,
        fragment = doc.createDocumentFragment(),
        len = tang.length - 1,
        firstChild;
    for(var i = 0, item; item = args[i]; i++){
        if(item.nodeType){
            fragment.appendChild(item);
        }else{
            baidu.forEach(~'string|number'.indexOf(baidu.type(item)) ?
                baidu.dom.createElements(item, doc)
                    : item, function(ele){
                        fragment.appendChild(ele);
                    });
        }
    }
    if(!(firstChild = fragment.firstChild)){return;}
    baidu.forEach(tang, function(item, index){
        callback.call(item.nodeName.toLowerCase() === 'table'
            && firstChild.nodeName.toLowerCase() === 'tr' ?
                item.tBodies[0] || item.appendChild(item.ownerDocument.createElement('tbody'))
                    : item, index < len ? fragment.cloneNode(true) : fragment);
    });
};






baidu.dom.extend({
    append: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});


baidu.dom.extend({
    text: function(value){

        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;

        //当dom选择器为空时
        if(this.size()<=0){
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }            
        }

        
        var getText = function( elem ) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if ( nodeType ) {
                if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
            } else {

                // If no nodeType, this is expected to be an array
                for ( ; (node = elem[i]); i++ ) {
                    // Do not traverse comment nodes
                    ret += getText( node );
                }
            }
            return ret;
        };

        baidu.forEach(me,function(elem, index){
            
            var tangramDom = bd(elem);
            if(result){
                return;
            };

            switch(typeof value){
                case 'undefined':
        
                    //get first
                    result = getText(elem);
                    return result;

                break;

                case 'number':
                    value = String(value);
                case 'string':

                    //set all
                    isSet = true;
                    tangramDom.empty().append( ( elem && elem.ownerDocument || document ).createTextNode( value ) );
                break;

                case 'function':

                    //set all
                    isSet = true;
                    tangramDom.text(value.call(elem, index, tangramDom.text()));

                break;
            };
        });

        return isSet?me:result;
    }
});



magic.control.ComboBox = baidu.lang.createClass(function(options) {
    var me = this;
    me._options = baidu.object.extend({
        'items' : [],
        'originIndex' : -1,
        'readonly' : false,
        'viewSize' : 5,
        'disabled' : false,
        'width' : '100%'
    }, options);
    
    //选中的值
    me.selectValue = '';
    //当前高亮的选项索引
    me.highlightIndex = -1;
    //下拉菜单使用的popup弹出层
    me.menu = new magic.Popup();
    //当前是否处于focus状态
    me.isFocus = false;
    //当前是否处于禁用状态
    me.disabled = this._options.disabled;
    //临时值，用来储存当按键盘上下时，搜索框的原始值。
    me.tempValue = '';
    //当前是否处于键盘上线选中的状态，和me.tempValue配合使用。
    me.menufocusing = false;
    
    //向一个全局的array里记录每个实例，在实现blur的功能时需要遍历这个数组
    if (!magic.control.ComboBox.instanceArray) {
        magic.control.ComboBox.instanceArray = [];
    }
    magic.control.ComboBox.instanceArray.push(me.guid);
    
    //load事件做如下事情：    
    me.on('load', function() {
        //设置combobox宽度
        me.setWidth(me._options.width);
        
        //begin popup.attach的主要功能搬过来
        me.menu._host = me.getElement('container');
        me.menu.offsetY = -1;
        //end popup.attach的主要功能搬过来
        
        //插入下拉菜单的壳
        me.menu.setContent(me._menuContainerToHTMLString());
        
        //渲染下拉菜单数据
        this._renderMenu();
        
        //将popup的show和hide的事件链接
        me.menu.on('show', function() {
            
            me.fire('show');
        });
        

        me.menu.on('beforeshow', function(e) {
           
            e.returnValue = me.fire('beforeshow');
        });
        
        me.menu.on('beforehide', function(e) {
           
            e.returnValue = me.fire('beforehide');
        });
        
        me.menu.on('hide', function() {
           
            me.fire('hide');
        });
        
        //全局变量 magic.control.ComboBox.globalActive
        //用于combobox的focus和blur
        //click和keydown触发
        baidu(me.getElement('input-container')).keydown(function() {
            !me.disabled && (magic.control.ComboBox.globalActive = me.guid);
        });
        baidu(me.getElement('input-container')).click(function() {
            !me.disabled && (magic.control.ComboBox.globalActive = me.guid);
        });
        
        //如果readonly为false，为下拉箭头绑定click事件，为input绑定键盘事件，
        //反之为搜索框和箭头整体绑定click事件
        if (!me._options.readonly) {
            baidu(me.getElement('arrow')).click(function() {
                this.focus();
                !me.disabled && me.menu.show();
            });
            //绑定键盘事件
            baidu(me.getElement('input')).keydown(function(e) {
                me._keydownHandler(e);
            });
        } else {
            baidu(me.getElement('input-container')).click(function() {
                me.getElement('arrow').focus();
                (!me.disabled) && me.menu.show();
            });
        }
        
        baidu(me.getElement('arrow')).keydown(function(e) {
            e.preventDefault();
            me._keydownHandler(e);
        });   

        //设置disable
        if(me.disabled) {
            baidu(me.getElement('container')).addClass('magic-combobox-disable');
            me.getElement('input').disabled = true;
        }
        
        //设置初始值
        me._initInput();

        //为下拉菜单绑定click事件
        //采用事件代理的方式
        baidu(this.getElement('menu')).click(function(e) {
            magic.control.ComboBox.globalActive = me.guid;
            var target = e.target;
            //如果target是li里面的节点，需要找到外层最近的li
            if (target == this) {
                return;
            }
            while (target.tagName != 'LI') {
                target = target.parentNode;
            }
            me.$confirm(target);
           
            me.fire('clickitem', {
                'result' : me._getResult(target)
            });
        });
        
        //为下拉菜单绑定mouseover事件
        //采用事件代理的方式        
        baidu(this.getElement('menu')).mouseover(function(e) {
            me.$clearHighlight();
            var target = e.target;
            //如果target是li里面的节点，需要找到外层最近的li
            if (target == this) {
                return;
            }
            while (target.tagName != 'LI') {
                target = target.parentNode;
            }

            me.$highlight(target);
        });
       
    });
    
    me.on('show', function() {
        me._setViewSize();
    });
    
    me.on('hide', function() {
        me.menufocusing = false;
    });
    
    me.on('focus', function() {
        me.isFocus = true;
    });
    
    me.on('blur', function() {
        me.isFocus = false;
    });
    me.on('highlight', function(e) {
        me.highlightIndex = e.index;
    });
    me.on('beforeshow', function(e) {
        if (me._options.items.length == 0) {
            e.returnValue = false;
        }
    });
   
}, {
    type: 'magic.control.ComboBox',
    superClass: magic.Base
}).extend(
    
{    
    
    '_initInput' : function() {
        var index = this._options.originIndex;
        if (this._options.readonly && index == -1) {
            index = 0;
        }
        if (index != -1) {
            this.$setByIndex(index);
        } else {
            this.selectValue = this.getElement('input').value = '';
        }        
    },
    
        
    '_setViewSize' : function() {
        baidu(this.getElement('menu')).css('height', '');
        var viewHeight = baidu('.magic-combobox-menu-item', this.getElement('menu'))[0].offsetHeight * this._options.viewSize,
            clientHeight = this.getElement('menu').offsetHeight,
            realHeight = clientHeight > viewHeight ? viewHeight : clientHeight;
        baidu(this.getElement('menu')).css('height', realHeight);        
    },
    
    '_renderMenu' : function(data) {
        var me = this;
        //判断data，如果是定时器出发的，则有data；若点击触发，则没有data，需要上所有数据。
        data = data || this._options.items;
        var html = this.$menuContentToHTMLString(data);
        this.getElement('menu').innerHTML = html;

    },
    
    
    '_keydownHandler' : function(e) {
        var upKeyCode = 38,
            downKeyCode = 40,
            enterKeyCode = 13,
            elmMenuItems = baidu('.magic-combobox-menu-item', this.getElement('menu')),
            length = elmMenuItems.length;
        
        if (e.keyCode == enterKeyCode) {
            this.menu.visible && this.$confirm(elmMenuItems[this.highlightIndex]);
        } else if (e.keyCode == downKeyCode || e.keyCode == upKeyCode) {
            if (!this.menu.visible) {
                this.menu.show();
            }
            if (!this.menufocusing) {
                this.menufocusing = true;
                this.tempValue = this.getElement('input').value;
            }
        }
        
        if (e.keyCode == downKeyCode) {
            this.$clearHighlight();
            if(++ this.highlightIndex == length) {
                this.highlightIndex = -1;
                this.getElement('input').value = this.tempValue;
                this.fire('pickOrigin', {
                    'content' : this.tempValue
                })
            } else {
                this.$menufocus(elmMenuItems[this.highlightIndex]);
            }                
        } else if (e.keyCode == upKeyCode) {
            e.preventDefault();
            this.$clearHighlight();
            if (this.highlightIndex == -1) {
                this.highlightIndex = length;
            }
            if (-- this.highlightIndex == -1) {
                this.getElement('input').value = this.tempValue;
                this.fire('pickOrigin', {
                    'content' : this.tempValue
                })
            } else {
                this.$menufocus(elmMenuItems[this.highlightIndex]);
            }                
        }
    },
    
    
    '_getResult' : function(elmItem) {
        return {
            'value' : baidu(elmItem).attr('data-value'),
            'index' : baidu(elmItem).attr('data-index'),
            'content' : baidu(elmItem).text()
        };
    },
    
    
    '_getValue' : function(content) {
        var items = this._options.items,
            length = items.length;
        while(length --) {
            if (items[length].content == content) {
                return items[length].value + '';
            }
        }
        return null;
    },
    
      
    '$pick' : function(elmItem) {
        var result = this._getResult(elmItem);
       
        if(this.fire('beforepick')) {
            this.getElement('input').value = result.content;
             
            this.fire('pick', {'result' : result});
        }
        return result;
    },
    
        
    '$menufocus' : function(elmItem) {
        this.$highlight(elmItem);
        var result = this.$pick(elmItem);
          
        this.fire('menufocus', {'result' : result});
        return result;
    },

      
    '$confirm' : function(elmItem) {
        //当按上下至搜索框初始值时，elmItem为空，需要进行判断。By Dengping
        var result = elmItem ? this.$pick(elmItem) : {'result' : this.tempValue};
        this.menu.hide();
       
        this.fire('confirm', {'result' : result});
        //触发change事件
        if (this.selectValue != result.value) {
            
            this.fire('change', {
                'from' : 'confirm',
                'result' : result
            })
        }
        this.selectValue = result.value;
        return result;
    },
    
    
    '$highlight' : function(elmItem) {
        baidu(elmItem).addClass('magic-combobox-menu-item-hover');
        var index = baidu(elmItem).attr('data-index');
       
        this.fire('highlight', {
            'index' : index
        });
    },
    
    
    '$clearHighlight' : function() {
        var elmMenuItems = baidu('.magic-combobox-menu-item', this.getElement('menu'));
        elmMenuItems.removeClass('magic-combobox-menu-item-hover');
    },
    
    
    'getValue' : function() {
        return this.selectValue || this._getValue(this.getElement('input').value) || this.getElement('input').value;
    },
    
    
    'getSelectIndex' : function() {
        for (var data = this._options.items, length = data.length; length--;) {
            if (data[length].value + '' === this.selectValue) {
                return length;
            }
        }
        return -1;
    },
    
        
    'setByValue' : function(value) {
        for (var data = this._options.items, length = data.length; length--;) {
            if (data[length].value == value) {
                this.selectValue = value;
                this.getElement('input').value = data[length].content;
                //在setup模式下，需要修改原始select的值。by Dengping
                if (this.select) {
                    this.select.options[length].selected = true;
                }
                break;
            }
        }
    },
    
    
    '$setByIndex' : function(index) {
        var item = this._options.items[index] || this._options.items[0];
        this.getElement('input').value = item.content;
        this.selectValue = item.value;
        //在setup模式下，需要修改原始select的值。by Dengping
        if (this.select) {
            this.select.options[index].selected = true;
        }
    },
    
    
    'focus' : function() {
        if (!this.isFocus) {
            
            this.fire('focus'); 
        }
    },
    
    
    'blur' : function() {
        if (this.isFocus) {
            //触发change事件
            var value = this._getValue(this.getElement('input').value);
            value = value ? value : this.getElement('input').value;
            if (value != this.selectValue) {
                //这里会触发change事件，该事件doc已经在magic.control.ComboBox#$confirm中描述。
                this.fire('change', {
                    'from' : 'blur'
                });
                this.selectValue = value;
            }
            
            this.fire('blur');
        }
    },
    
    
    'reset' : function() {
        this._initInput();
        //在setup模式下，原生select也需要reset。By Dengping
        if (this.select) {
            var index = this._options.originIndex == -1 ? 0 : this._options.originIndex;
            this.select.options[index].selected = true;
        }
    },
    
    
    'reload' : function(data) {
        this._options.items = data;
        this._renderMenu();
        this._initInput();
        this.highlightIndex = -1;
        
        this.fire('reload', {
            'data' : data
        });
    },
    
    
    'disable' : function() {
        if (!this.disabled) {
            //修改样式
            baidu(this.getElement('container')).addClass('magic-combobox-disable');
            //设置input为disable
            this.getElement('input').disabled = true;
            this.disabled = true;
        }
    },
    
    
    'enable' : function() {
        if (this.disabled) {
            //修改样式
            baidu(this.getElement('container')).removeClass('magic-combobox-disable');
            //设置input为disable = false
            this.getElement('input').disabled = false;
            this.disabled = false;
        }
    },
    
    // width: 30%|30px|30em|3cm
    
    'setWidth' :  function(width) {
        this.width = width;
        baidu(this.getElement('container')).css('width', width);
        this.menu.setWidth(this.getElement('container').offsetWidth);
    },
    
    
    '$dispose' : function() {
        baidu(this.getElement('input-container')).off('click').off('keydown');
        baidu(this.getElement('input')).off('keydown').off('keyup');
        baidu(this.getElement('arrow')).off('click').off('keydown');
        baidu(this.getElement('menu')).off('click').off('mouseover').off('mouseout');
        this.menu.hide();
        this.menu.$dispose();
        baidu.array(magic.control.ComboBox.instanceArray).remove(this.guid);
        magic.Base.prototype.$dispose.call(this);
    }
    
    

});

(function(){
    
//全局变量 magic.control.ComboBox.globalActive
//用于combobox的focus和blur
//click和keydown触发    
magic.control.ComboBox.globalActive = null;


function activeController() {
    var guid = magic.control.ComboBox.globalActive;
    if (guid != null) {
        var activeComboBox = baiduInstance(guid);
        activeComboBox.focus();
    }
    var comboBoxes = magic.control.ComboBox.instanceArray;
    if (comboBoxes) {
        for (var length = comboBoxes.length; length--;) {
            if (comboBoxes[length] == guid) {
                continue;
            }
            var comboBox = baiduInstance(comboBoxes[length]);
            if (comboBox.isFocus) {
                comboBox.blur();
                break;
            }
        }
        magic.control.ComboBox.globalActive = null;          
    }
}

baidu(document).click(activeController).keydown(activeController);
  
})();












 
magic.ComboBox = baidu.lang.createClass(function(options) {
    //do nothing
}, {
    'type' : 'magic.ComboBox',
    'superClass' : magic.control.ComboBox
}).extend(
    
{        
    
    '$toHTMLString' :  function() {
        return [
            '<div id="' + this.$getId('container') + '" class="magic-combobox">',
            '<div id="' + this.$getId('input-container') + '" class="magic-combobox-input-container clearfix">',
            '<div class="magic-combobox-input-outter">',
            '<div class="magic-combobox-input-inner">',
            '<input id="' + this.$getId('input') + '" class="magic-combobox-input"' + (this._options.readonly ? 'readonly' : '') + '>',
            '</div>',
            '</div>',
            '<a href="#" id="' + this.$getId('arrow') + '" class="magic-combobox-arrow" onclick="return false"></a>',
            '</div>',
            '</div>'
        ].join('');
    },
    
    
    '_menuContainerToHTMLString' : function() {
        return '<ul id="' + this.$getId('menu') + '" class="magic-combobox-menu"></ul>';
    },
    
    
    '$menuContentToHTMLString' : function(items) {
        var HTMLString = [];
        baidu.array(items).each(function(index, item) {
            HTMLString.push('<li data-index="' + index + '" data-value="' + items[index].value + '" class="magic-combobox-menu-item">' + items[index].content + '</li>');
        });
        return HTMLString.join('');
    },
    
    
    'render' :  function(target, position) {
        position = position || 'beforeEnd';
        baidu(target).insertHTML(position, this.$toHTMLString(this._options.items));
        
        this.fire("load");
    },
    
    
    '$dispose' : function() {
        if(this.disposed) {
            return;
        }
        if (this.select) {
            var elm = this.select,
                host = elm.parentNode;
        }
        var container = this.getElement('container');
        
        magic.control.ComboBox.prototype.$dispose.call(this);
        baidu(container).remove();
        if (elm) {
            host.parentNode.insertBefore(elm, host);
            baidu(host).remove();
            elm.style.visibility = '';
            elm.style.width = '';            
        }
        container = null;
    }
});



/// support magic - Tangram 1.x Code Start


 





baidu.dom.getAttr = function(element, key){
    return baidu.dom(baidu.dom.g(element)).attr(key);
}
/// support magic - Tangram 1.x Code End








(function() {

magic.setup.comboBox = function(el, options) {
    options = options || {};
    var el = baidu.dom.g(el),
        optData = parseSelectOptions(el),
        newItemOpt = null;
    
    baidu.object.extend(optData, {
        'width' : el.offsetWidth + 10,
        'disabled' : el.disabled
    });
    options = baidu.object.extend(optData, options);
   
    var instance = magic.setup(el, magic.ComboBox, options);
    
    baidu.dom.insertHTML(el, 'beforeBegin', '<span id="' + instance.guid + '-host" class="magic-combobox-host"></span>');
    
    var host = baidu('#' + instance.guid + '-host');
    host.append(el);
    instance.select = el;
    el.style.width = (el.offsetWidth + 15) + 'px';
    el.style.visibility = 'hidden';
    instance.render(host, 'afterBegin');
    baidu(instance.getElement('container')).addClass('magic-combobox-container-setup');
    instance.on('change', function(event) {
        if (event.from == 'confirm') {
            //当用键盘选到初始值（最后一个值再往后选一个或第一个值往前选一个）
            //此时按回车，虽然出发onchange，但是原生select没有此值，无须改变。
            //by Dengping
            if (event.result.index) {
                el.options[event.result.index].selected = true;
            }
        } else if (event.from == 'blur') {
            var content = this.getElement('input').value;
            if (!newItemOpt) {
                newItemOpt = document.createElement('OPTION');
                newItemOpt.selected = true;
                el.add(newItemOpt);
            }
            newItemOpt.value = newItemOpt.text = content;
        }
        
    });
    
    instance.on('reload', function(event) {
        var data = event.data,
            length = data.length,
            i = 0;
        el.options.length = 0;
        for (; i < length; i ++) {
            var elmOption = document.createElement('OPTION');
            elmOption.value = data[i].value;
            elmOption.text = data[i].content;
            el.add(elmOption);
        }
    });
    
    //todo
    //当原生select有变动时，ComboBox不能同步。
    
    return instance;
};


function parseSelectOptions(selectNode) {
    var items = [],
        originIndex = -1,
        optionNodes = selectNode.options;
    baidu.each(optionNodes, function(index, item) {

        items.push({
            'value' : item.value,
            'content' : item.text
        });
        if (item.selected) {
            originIndex = index;
        }
    });
    return {
        'items' : items,
        'originIndex' : originIndex
    }
}
    
})();











Array.prototype.filter = function(iterator, context) {
    var result = baidu.array([]),
        i, n, item, index=0;

    if (baidu.type(iterator) === "function") {
        for (i=0, n=this.length; i<n; i++) {
            item = this[i];

            if (iterator.call(context || this, item, i, this) === true) {
                result[index ++] = item;
            }
        }
    }

    return result;
};
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.filter = function(array, filter, context) {
    return baidu.isArray(array) ? array.filter(filter, context) : [];
};
/// Tangram 1.x Code End


(function(){
    
    
var Timer = baidu.lang.createClass(function(options) {
    var me = this;
    me._options = baidu.object.extend({
        'circleTime' : 10,
        'waitingTime' : 100,
        'originValue' : '',
        'getValue' : function() {
            return null;
        }
    }, options);
    
    me.previous = null;
    me.now = '';
    me.fireTimer = 0;
    me.timer = 0;
    me.originValue = me._options.originValue;
    me.focusValue = null;
    
}).extend({

    '_compare' : function(me) {
        if (!this.timer) {
            return;
        }
        me.now = me._options.getValue();
        if (me.now == me.previous && me.focusValue != me.now && me.now != me.originValue) {
            if (me.fireTimer == 0) {
                me.fireTimer = setTimeout(function() {
                    me.fire('fire', {
                        'value' : me.now
                    });
                }, me._options.waitingTime);                    
            }
        } else {
            clearTimeout(me.fireTimer);
            me.fireTimer = 0;
            me.previous = me.now;
            if (me.now != me.originValue) {
                me.originValue = null;
            }
            if (me.now != me.focusValue) {
                me.focusValue = null;
            }
        }
    },
    
        
    'start' : function() {
        var me = this;
        me.timer = setInterval(function() {
            me._compare(me);
        }, me._options.circleTime);            
    },
    
    
    'stop' : function() {
        clearInterval(this.timer);
        this.timer = null;
    }
});


baidu.lang.register(magic.control.ComboBox, function(options) {
    
    var me = this;
    me._options.suggestion = baidu.object.extend({
        'enable' : true
    }, options.suggestion);
    
    if(!me._options.suggestion.enable || me._options.readonly) {
        return;
    }
    
    this.on('load', function(){
        me.timer = new Timer({
            'getValue' : function() {
                return me.getElement('input').value;
            },
            'originValue' : this.getElement('input').value
        });
        
        
        me.timer.on('fire', function(e) {
            if (e.value == '') {
                me._renderMenu();
                me.menu.show();
            } else {
                var data = me._getMenuData(e.value);
                if (data.length > 0) {
                    me._renderMenu(data);
                    me.menu.show();                
                } else {
                    me.menu.visible && me.menu.hide();
                }                
            }

        });
        
        me.timer.start();
    });
    
    this.on('pick', function(e) {
       me.timer.focusValue = e.result.content;
    });
    this.on('pickOrigin', function(e) {
       me.timer.focusValue = e.content;
    });
    this.on('reload', function(e) {
       me.timer.focusValue = this.getElement('input').value;
    });
    this.on('dispose', function(e) {
        if (me.timer) {
            me.timer.stop();
        }
    })

},{
    
    '_getMenuData' : function(key) {
        return baidu.array(this._options.items).filter(function(item, index) {
            return (item.content.indexOf(key) != -1);
        });        
    }
});    
})();//依赖包

















/// support magic - Tangram 1.x Code Start







/// support magic - Tangram 1.x Code Start








// TODO
// 1. 无法解决px/em单位统一的问题（IE）
// 2. 无法解决样式值为非数字值的情况（medium等 IE）
baidu.dom.getStyle = function (element, key) {
    return baidu.dom(baidu.dom.g(element)).css(key);
};

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start





/// support magic - Tangram 1.x Code Start


/// support magic - Tangram 1.x Code End



/// support magic - Tangram 1.x Code Start







baidu.page.getScrollLeft = function () {
    var d = document;
    return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
};
/// support magic - Tangram 1.x Code End


(function(){

 baidu.page.getMousePosition = function(){
     return {
        x : baidu.page.getScrollLeft() + xy.x,
        y : baidu.page.getScrollTop() + xy.y
     };
 };

 var xy = {x:0, y:0};

 // 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
 baidu.event.on(document, "onmousemove", function(e){
    e = window.event || e;
    xy.x = e.clientX;
    xy.y = e.clientY;
 });

})();
/// support magic - Tangram 1.x Code End















(function(){
    var dragging = false,
        target, // 被拖曳的DOM元素
        op, ox, oy, timer, left, top, lastLeft, lastTop, mozUserSelect;
    baidu.dom.drag = function(element, options){
        if(!(target = baidu.dom.g(element))){return false;}
        op = baidu.object.extend({
            autoStop: true, // false 用户手动结束拖曳 ｜ true 在mouseup时自动停止拖曳
            capture: true,  // 鼠标拖曳粘滞
            interval: 16    // 拖曳行为的触发频度（时间：毫秒）
        }, options);
        lastLeft = left = parseInt(baidu.dom.getStyle(target, 'left')) || 0;
        lastTop = top = parseInt(baidu.dom.getStyle(target, 'top')) || 0;
        dragging = true;
        setTimeout(function(){
            var mouse = baidu.page.getMousePosition();  // 得到当前鼠标坐标值
            ox = op.mouseEvent ? (baidu.page.getScrollLeft() + op.mouseEvent.clientX) : mouse.x;
            oy = op.mouseEvent ? (baidu.page.getScrollTop() + op.mouseEvent.clientY) : mouse.y;
            clearInterval(timer);
            timer = setInterval(render, op.interval);
        }, 1);
        // 这项为 true，缺省在 onmouseup 事件终止拖曳
        var tangramDom = baidu.dom(document);
        op.autoStop && tangramDom.on('mouseup', stop);
        // 在拖曳过程中页面里的文字会被选中高亮显示，在这里修正
        tangramDom.on('selectstart', unselect);
        // 设置鼠标粘滞
        if (op.capture && target.setCapture) {
            target.setCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
        // fixed for firefox
        mozUserSelect = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = 'none';
        baidu.isFunction(op.ondragstart)
            && op.ondragstart(target, op);
        return {
            stop: stop, dispose: stop,
            update: function(options){
                baidu.object.extend(op, options);
            }
        }
    }
    // 停止拖曳
    function stop() {
        dragging = false;
        clearInterval(timer);
        // 解除鼠标粘滞
        if (op.capture && target.releaseCapture) {
            target.releaseCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
        // 拖曳时网页内容被框选
        document.body.style.MozUserSelect = mozUserSelect;
        var tangramDom = baidu.dom(document);
        tangramDom.off('selectstart', unselect);
        op.autoStop && tangramDom.off('mouseup', stop);
        // ondragend 事件
        baidu.isFunction(op.ondragend)
            && op.ondragend(target, op, {left: lastLeft, top: lastTop});
    }
    // 对DOM元素进行top/left赋新值以实现拖曳的效果
    function render(e) {
        if(!dragging){
            clearInterval(timer);
            return;
        }
        var rg = op.range || [],
            mouse = baidu.page.getMousePosition(),
            el = left + mouse.x - ox,
            et = top  + mouse.y - oy;

        // 如果用户限定了可拖动的范围
        if (baidu.isObject(rg) && rg.length == 4) {
            el = Math.max(rg[3], el);
            el = Math.min(rg[1] - target.offsetWidth, el);
            et = Math.max(rg[0], et);
            et = Math.min(rg[2] - target.offsetHeight, et);
        }
        target.style.left = el + 'px';
        target.style.top  = et + 'px';
        lastLeft = el;
        lastTop = et;
        baidu.isFunction(op.ondrag)
            && op.ondrag(target, op, {left: lastLeft, top: lastTop});
    }
    // 对document.body.onselectstart事件进行监听，避免拖曳时文字被选中
    function unselect(e) {
        return baidu.event.preventDefault(e, false);
    }
})();
// [TODO] 20100625 添加cursorAt属性，absolute定位的定位的元素在不设置top|left值时，初始值有问题，得动态计算
// [TODO] 20101101 在drag方法的返回对象中添加 dispose() 方法析构drag
/// support magic - Tangram 1.x Code End

























/// support maigc - Tangram 1.x Code Start






baidu.page.getWidth = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};
/// support maigc - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start






baidu.page.getHeight = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};
/// support magic - Tangram 1.x Code End









magic.control.Dialog = baidu.lang.createClass(
     function(options){
        var me = this;
        options = baidu.object.extend({
            width: 400,
            height: 300,
            left: 0,
            top: 0,
            contentType: "html",
            draggable: true
        }, options || {});

        baidu.object.extend(me._options || (me._options = {}), options);

        me._footerHeight = 0;

        if(options.width < 100)
            options.width = 100;
        if(options.height < 100)
            options.height = 100;

        this.zIndex = baidu.global.getZIndex("dialog", 5);
        
        this.disposeProcess = [];

        this.on("load", function(){
            var container = this.getElement(), me = this,options = me._options;
            
            if(typeof options.left == "number" || typeof options.top == "number")
                this.setPosition(options);
            if(typeof options.width == "number" || typeof options.height == "number")
                this.setSize(this._options);

            this._isShown = true;
            this.focus();

            // 处理聚焦
            var focusFn = function(e){ me.focus(e); };
            
            
            // baidu(container).on("mousedown", focusFn);
            
            baidu(document).on("mousedown", focusFn);
            
            this.disposeProcess.unshift(function(){
                baidu(document).off("mousedown", focusFn);
            });

            // 定义拖拽事件
            if(options.draggable){
                var title = this.getElement("title"), dragFn;
                var bind = baidu.fn.bind;
                var me = this;
                var container_parent = container.parentNode;
                var parent_position = baidu(container_parent).position();
                title.className += " tang-title-dragable";

                var getRange = {
                    'top': function(){
                        var parent_border_top = baidu(container_parent).css("borderTopWidth");

                        if(!/px/.test(parent_border_top)){
                            parent_border_top = 0;
                        }else{
                            parent_border_top = parseInt(parent_border_top);
                        }

                        if(container_parent == document.body){
                            return 0 - parent_border_top;
                        }else{
                            return 0 - (parent_position.top + parent_border_top);
                        }
                    },
                    'right': function(){
                        //TODO 如果没有background层，会报错
                        var background_inner = baidu(".tang-background-inner", container)[0];
                        var background_inner_ml = baidu(background_inner).css("marginLeft") == "auto" ? background_inner.offsetLeft + "px" : baidu(background_inner).css("marginLeft");
                        return baidu.page.getWidth() + getRange['left']() - parseInt(background_inner_ml);
                    },
                    'bottom': function(){
                        var background_inner = baidu(".tang-background-inner", container)[0];
                        var background_inner_mt = baidu(background_inner).css("marginTop") == "auto" ? background_inner.offsetTop + "px" : baidu(background_inner).css("marginTop");
                        return baidu.page.getHeight() + getRange['top']() - parseInt(background_inner_mt);
                    },
                    'left': function(){
                        var parent_border_left = baidu(container_parent).css("borderLeftWidth");

                        if(!/px/.test(parent_border_left)){
                            parent_border_left = 0;
                        }else{
                            parent_border_left = parseInt(parent_border_left);
                        }

                        if(container_parent == document.body){
                            return 0 - parent_border_left;
                        }else{
                            return 0 - (parent_position.top + parent_border_left);
                        }
                    }
                };

                baidu(title).on("mousedown", dragFn = bind(function(evt){
                    evt.preventDefault();
                    baidu.dom.drag(container, {
                        ondragstart: bind(function(){ this.fire("dragstart"); }, this),
                        ondrag: bind(function(){ this.fire("drag"); }, this),
                        ondragend: bind(function(){ this.fire("dragstop"); }, this),
                        range: [
                            getRange['top'](),
                            getRange['right'](),
                            getRange['bottom'](),
                            getRange['left']()
                        ]
                        
                    });
                }, this));
                this.disposeProcess.unshift(function(){
                    baidu(title).off("mousedown", dragFn);
                });
            }
        });

        this.on("resize", function(event, pos){
           var titleText = this.getElement("titleText");
           var buttons = this.getElement("titleButtons");
           if(typeof pos.width == "number")
                baidu(titleText).css("width", Math.max(0, pos.width - buttons.clientWidth - 20) + "px");   
        });
    }, 

     { 
        type: "magic.control.Dialog",
        superClass: magic.Base
    });

magic.control.Dialog.extend(

{
    

    
    isShowing: function(){
        return this._isShown;
    },

    
    show: function(){
       
        if(this.fire("beforeshow") === false)
            return this;
        this.getElement().style.display = "";
        this._isShown = true;

         
        this.fire("show");
    },

    
    hide: function(){
        
        if(this.fire("beforehide") === false)
            return this;
        this._isShown = false;
        this.getElement().style.display = "none";
         
        
        this.fire("hide");
    },
    
    setTitleText: function(title){
        var titleText = this.getElement("titleText");
          titleText.innerHTML = baidu.string.encodeHTML(title) || "&nbsp;";
          return this;
    },

    
    setContent: function(content, contentType){
        var contentEl = this.getElement("content");

        var lastDom, target, parent;
        if(lastDom = this._lastDom){
           parent = lastDom.parent;
           if(lastDom.content === content)
               return this;
           if(lastDom.target){ // 原还位置
               parent.insertBefore(lastDom.content, lastDom.target);
           }else{
               parent.appendChild(lastDom.content);
           }
           this._lastDom = null;
        }

        switch(contentType){
            case "text":
                contentEl.innerHTML = baidu.string.encodeHTML(content);
                baidu(contentEl).removeClass("contentFrame");
                break;
            case "element":
                if(parent = content.parentNode){ // 做标记
                    parent.insertBefore(target = document.createTextNode(""), content);
                    this._lastDom = { content: content, parent: content.parentNode, target: target };                    
                }
                contentEl.innerHTML = "";
                contentEl.appendChild(content);         
                break;            
            case "frame":
                baidu(contentEl).css("height", baidu(this.getElement('body')).css('height'));
                contentEl.innerHTML = "<iframe frameborder='no' src='" + content + "'></iframe>";
                baidu(contentEl).hasClass("contentFrame") || 
                    baidu(contentEl).addClass("contentFrame");        
                break;
            default:
                contentEl.innerHTML = content;
                baidu(contentEl).removeClass("contentFrame");
                break;
        }

        return this;
    },

    
    focus: function(e){
        var  focusedMap = baidu.global.get("dialogFocused").map,
             idty = this.$getId() + "focus",
             updateStatus = function(){
                for(var attr in focusedMap){
                    attr != idty && (focusedMap[attr] = false);
                }
             };
        focusedMap || (baidu.global.get("dialogFocused").map = focusedMap = {});
        if(arguments.length){
            var target = e.target;
            if(baidu(target).closest(this.getElement()).size() > 0){
                baidu(this.getElement()).css("zIndex", 
                    this.zIndex = baidu.global.getZIndex("dialog", 5));
                if(focusedMap[idty] != true){
                    this.fire("focus");
                    updateStatus();
                    focusedMap[idty] = true;
                }
            }else{
                focusedMap[idty] = false;
            }
        }else{
            baidu(this.getElement()).css("zIndex", 
                    this.zIndex = baidu.global.getZIndex("dialog", 5));
            focusedMap[idty] = true;
            updateStatus();
            this.fire("focus");
        }
        
        
        
        
        
    },

    
    setSize: function(size){
        var foreground = this.getElement("foreground");
        if(typeof size.width == "number")
            baidu(foreground).css("width", (this._options.width = size.width) + "px");
        if(typeof size.height == "number"){
            baidu(foreground).css("height", (this._options.height = size.height) + "px");
            var height = Math.max(0, this._options.height - this._titleHeight - this._footerHeight) + "px";
            baidu(this.getElement("body")).css("height", height);
            // baidu(this.getElement("content")).css("height", height);
        }
        
        this.fire("resize", size);
    },

    
    getSize: function(){
        return {
            width: this._options.width,
            height: this._options.height
        }
    },

    
    setPosition: function(pos){

        if(typeof pos.left == "number")
            baidu(this.getElement()).css("left", (this._options.left = pos.left) + "px");
        if(typeof pos.top == "number")
            baidu(this.getElement()).css("top", (this._options.top = pos.top) + "px");
        
        this.fire("move", pos);
    },

    
    getPosition: function(){
        return {
            left: this._options.left,
            top: this._options.top
        }
    },

    
    center: function(){
        var body = document[baidu.browser.isStrict ? "documentElement" : "body"];
        var bodyWidth = body.clientWidth;
        var bodyHeight = body.clientHeight;
        //在Chrome下，document.documentElement.scrollTop取值为0，所以改用已经做过兼容的baidu.page.getScrollTop()。
        //scrollLeft同上
        //fixed by Dengping
        var left = (((bodyWidth - this._options.width) / 2) | 0) + baidu.page.getScrollLeft();
        var top = (((bodyHeight - this._options.height) / 2) | 0) + baidu.page.getScrollTop();
        this.setPosition({ left: left, top: top });
    },

    
    $dispose: function(){
        var focusedMap = baidu.global.get("dialogFocused").map;
        if(focusedMap){ delete focusedMap[this.$getId() + "focus"] };
        for(var i = 0, l = this.disposeProcess.length; i < l; i ++)
            this.disposeProcess[i].call(this);
        magic.Base.prototype.$dispose.call(this);
    }
});



















baidu.dom.extend({
    hide: function(){
        return this.each(function(index, ele){
            if(!ele.style){return;}
            ele.style.display = 'none';
        });
    }
});












baidu.dom.extend({
    show: function(){
        var valMap = {};
        function getDefaultDisplayValue(tagName){
            if(valMap[tagName]){return valMap[tagName];}
            var ele = document.createElement(tagName), val, frame, ownDoc;
            document.body.appendChild(ele);
            val = baidu.dom(ele).getCurrentStyle('display');
            document.body.removeChild(ele);
            if(val === '' || val === 'none'){
                frame = document.body.appendChild(document.createElement('iframe'));
                frame.frameBorder =
                frame.width =
                frame.height = 0;
                ownDoc = (frame.contentWindow || frame.contentDocument).document;
                ownDoc.writeln('<!DOCTYPE html><html><body>');
                ownDoc.close();
                ele = ownDoc.appendChild(ownDoc.createElement(tagName));
                val = baidu.dom(ele).getCurrentStyle('display');
                document.body.removeChild(frame);
                frame = null;
            }
            ele = null;
            return valMap[tagName] = val;
        }
        return function(){
            var tang;
            this.each(function(index, ele){
                if(!ele.style){return;}
                ele.style.display = '';
                tang = baidu.dom(ele);
                if(tang.getCurrentStyle('display') === 'none'
                    || !baidu._util_.contains(tang.getDocument(), ele)){
                    ele.style.display = valMap[ele.nodeName] || getDefaultDisplayValue(ele.nodeName);
                }
            });
            return this;
        }
    }()
});















baidu.object.isPlain  = baidu.isPlainObject;




/// Tangram 1.x Code Start



baidu.fn.blank = function () {};
/// Tangram 1.x Code End





/// support magic - Tangram 1.x Code Start






baidu.page.getViewWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};
/// support magic - Tangram 1.x Code End















magic.Dialog = baidu.lang.createClass(function(options){
    
}, { type: "magic.Dialog", superClass : magic.control.Dialog });


magic.Dialog.extend(

{
    
    render: function(el){
        if(baidu.type(el) === "string"){
            el = '#' + el;
        }
        el = baidu(el)[0];
        el || document.body.appendChild(el = document.createElement("div"));
        var template = magic.Dialog.template.join(""), options = this._options;
        baidu(el).addClass("tang-ui tang-dialog");

        // var content = "";
        // if(typeof this.content == "string")
        //     content = this.content;

        baidu(el).insertHTML("beforeEnd", baidu.string.format(template, {
            content: "",
            titleId: this.$getId("title"),
            bodyId: this.$getId("body"),
            contentId: this.$getId("content"),
            foregroundId: this.$getId("foreground"),
            footerId: this.$getId("footer"),
            footerContainerId: this.$getId("footerContainer")
        }));
        this._background = new magic.Background({ coverable: true });
        this._background.render(el);

        this.$mappingDom("", el);

        this._renderHeader();
        this._titleHeight = this.getElement("title").offsetHeight || 30;

        baidu(this.getElement("footer")).hide();
        //派发底部渲染事件，仅供内部使用
        this.fire("footer");

        this.setSize(options);
        this.setPosition(options);

        if(options.content)
            this.setContent(options.content, options.contentType);
          
        this.fire("load");
        this.show();

        this.disposeProcess.push(
            function(){
                baidu(this.getElement("closeBtn")).off("click", this._closeBtnFn);
                this._background.$dispose();
                el.innerHTML = "";
                baidu(el).removeClass("tang-ui tang-dialog");
            }
        );
    },
    
    _renderHeader:function(){
        var template = [
            "<div class='buttons' id='",this.$getId("titleButtons"),"'>",
                "<a id='",this.$getId("closeBtn"),"' class='close-btn' href='' onmousedown='event.stopPropagation && event.stopPropagation(); event.cancelBubble = true; return false;' onclick='return false;'></a>",
            "</div>",
            "<span id='",this.$getId("titleText"),"'>",baidu.string.encodeHTML(this._options.titleText || "") || "&nbsp;","</span>"];
        baidu(this.getElement("title")).insertHTML("beforeEnd", template.join(""));
        baidu(this.getElement("closeBtn")).on("click", this._closeBtnFn = baidu.fn.bind(this.hide, this));
    }
});

magic.Dialog.template = [
    "<div class='tang-foreground' id='#{foregroundId}'>",
        "<div class='tang-title' id='#{titleId}'>",
        "</div>",
        "<div class='tang-body' id='#{bodyId}'>",
            "<div class='tang-content' id='#{contentId}'>#{content}</div>",
        "</div>",
        "<div class='tang-footer' id='#{footerId}'>",
            "<div id='#{footerContainerId}'></div>",
        "</div>",
    "</div>"];







 

 

 

 

 

 

 
 

 baidu.lang.register(magic.control.Dialog, 
	 function(options){
	    options && options.buttons && options.buttons.enable && this.on("footer", function(){
	    	
		 	this.buttons = null,
	    	baidu(this.getElement("footer")).show();
	    	this._createButton(options.buttons);
	        baidu(this.getElement("footerContainer")).addClass("tang-footerContainer");
	        var h = this.getElement("footer").offsetHeight;
	        (!this.buttons || this.buttons.length == 0) && (h = 30) && baidu(this.getElement("footer")).css('height', 30); 
	        this._footerHeight = h;
	    });
	},
	{
		
		_createButton: function(){
		    var me = this,
                btnConfig = arguments.length > 0 ? arguments[0] : {},
		    	footerContainer = baidu(me.getElement("footerContainer")),
		    	buttons = me.buttons || (me.buttons = []),
		    	hasFocused = false,
		    	_defaultCreator = (function(){
		    		var btnTemplate = ['<a href="#" onClick="return false;" class="tang-dialog-button ','','">',
		    							'<span class="tang-dialog-button-s">',
		    								'<span class="tang-dialog-button-s-space">&nbsp;</span>',
		    								'<span class="tang-dialog-button-s-text">','','</span>',
		    							'</span>',
		    							'</a>'];
		    		return function(btnOptions, anchor){
		    			btnOptions.disabled ? (btnTemplate[1] = 'tang-dialog-button-disabled') : (btnTemplate[1] = '');
		    			btnTemplate[6] = btnOptions.text || '&nbsp;';
		    			baidu(anchor).insertHTML('beforeEnd', btnTemplate.join(''));
				        return 	baidu(anchor).children().get(0);					        
		    		};
		    	})();
		    baidu.forEach(btnConfig.items || [], function(item, index){
		    	var clickFn, node;
		    	footerContainer.append(node = baidu('<span class="tang-dialog-button-carrier"></span>')[0]);
		    	node = typeof item == "object" ? (item.builder || _defaultCreator).call(this, item, node, me, index) : item;
		    	!hasFocused && item.focused && !item.disabled && (hasFocused = true) && node.focus();
		    	buttons.push(node);
		    	item.disabled || item.click && baidu(node).on('click', clickFn = function(){
                    item.click.call(this, me);
                });
                clickFn && this.disposeProcess.push(function(){
		            baidu(node).off('click', clickFn);
		        });
		    }, me);
		    
		    footerContainer.addClass("tang-button-" + (btnConfig.align||'right'));
		}
	}
);

(function(){
    
    var disposeProcess = [];
    
    function dispose(){
        for(var i = 0, l = disposeProcess.length; i < l; i ++)
            disposeProcess[i]();
        disposeProcess = [];
    }

    function createMask(){
        var ie = baidu.browser.ie;
        var mask = document.createElement('div');
        mask.className = 'tang-mask';
        ie == 6 && baidu(mask).css('position', 'absolute');
        baidu(mask).css("zIndex", baidu.global.getZIndex("dialog", -5));
        

        document.body.appendChild(mask);

        function resize(){
            mask.style.display = 'none';
            baidu(mask).css('height', baidu.page.getViewHeight() + 'px');
            baidu(mask).css('width', baidu.page.getViewWidth() + 'px');
            mask.style.display = '';
        }

        function position(){
            mask.style.display = 'none';
            baidu(mask).css('top', baidu.page.getScrollTop() + 'px');
            baidu(mask).css('left', baidu.page.getScrollLeft() + 'px');
            mask.style.display = '';
        }

        resize();
        ie == 6 && position();

        baidu(window).on('resize', resize);
        disposeProcess.push(function(){
            baidu(window).off('resize', resize);
        });
        ie == 6 && baidu(window).on("scroll", position);
        ie == 6 && disposeProcess.push(function(){
            baidu(window).off('scroll', position);
        });

        disposeProcess.push(function(){
            document.body.removeChild(mask);
        });
    }

    
    magic.Dialog.alert = function(){
        
        var okConfig = {},
            defaultOptions = {
                width: 360,
                height: 140,
                titleText: "",
                content: "",
                buttons: {
                    enable: true,
                    items: [
                        okConfig
                    ]
                }
            },
            customOptions = {}, 
            ok_button_callback, closeclickFn, keyFn, alert_el;
        
        //将参数列表转化为配置项
        if(!baidu.object.isPlain(arguments[0])){
            arguments[0] && (customOptions.content = arguments[0]);
            arguments[1] && (customOptions.titleText = arguments[1]);
            arguments[2] && (customOptions.ok = arguments[2]);
        }else{
            customOptions = arguments[0];
        }

        if(baidu.object.isPlain(customOptions.ok)){
            okConfig.text = customOptions.ok.label;
            ok_button_callback = customOptions.ok.callback;
        }else{
            okConfig.text = baidu.i18n.cultures[baidu.i18n.currentLocale].language.ok;
            ok_button_callback = customOptions.ok;
        }
        ok_button_callback || (ok_button_callback = baidu.fn.blank);
        customOptions.ok = null;
        delete customOptions.ok;

        baidu.object.extend(defaultOptions, customOptions || {});

        var instance = new magic.Dialog(defaultOptions);

        okConfig.click = function(){
            dispose();
            ok_button_callback.call(instance);
        };
        
        instance.render();
        instance.center();

        alert_el = baidu('#' + instance.$getId());
        //关闭按钮
        baidu(instance.getElement('closeBtn')).on('click', closeclickFn = function(){
                    dispose();
                    ok_button_callback.call(instance);
                });
        disposeProcess.push(function(){
            baidu(instance.getElement('closeBtn')).off('click', closeclickFn);
        });

        //键盘快捷键
        baidu(document).on("keydown", keyFn = function(e){
            e = e || window.event;
            switch (e.keyCode) {
                case 27:    //esc
                    okConfig.click();
                    break;
                case 13:    //enter
                    e.preventDefault();
                    e.stopPropagation();
                    okConfig.click();
                    break;
                default:
                    break;
            }
        });
        disposeProcess.push(function(){
            baidu(document).off("keydown", keyFn);
        });


        disposeProcess.push(function(){
            instance.$dispose();
        });

        disposeProcess.push(function(){
            document.body.removeChild(alert_el[0]);
        });
        createMask();

        return instance;
    };
    magic.alert = magic.Dialog.alert;


    
    magic.Dialog.confirm = function(){
        
        var okConfig = {},
            cancelConfig = {},
            defaultOptions = {
                width: 360,
                height: 140,
                titleText: "",
                content: "",
                buttons:{
                    enable: true,
                    items: [
                        okConfig,
                        cancelConfig
                    ]
                }
            },
            customOptions = {},
            ok_button_callback,
            cancel_button_callback, 
            closeclickFn, keyFn;
        
        //将参数列表转化为配置项
        if(!baidu.object.isPlain(arguments[0])){
            arguments[0] && (customOptions.content = arguments[0]);
            arguments[1] && (customOptions.titleText = arguments[1]);
            arguments[2] && (customOptions.ok = arguments[2]);
            arguments[3] && (customOptions.cancel = arguments[3]);
        }else{
            customOptions = arguments[0];
        }
        
        if(baidu.object.isPlain(customOptions.ok)){
            okConfig.text = customOptions.ok.label;
            ok_button_callback = customOptions.ok.callback;
        }else{
            okConfig.text = baidu.i18n.cultures[baidu.i18n.currentLocale].language.ok;
            ok_button_callback = customOptions.ok;
        }

        if(baidu.object.isPlain(customOptions.cancel)){
            cancelConfig.text = customOptions.cancel.label;
            cancel_button_callback = customOptions.cancel.callback;
        }else{
            cancelConfig.text = baidu.i18n.cultures[baidu.i18n.currentLocale].language.cancel;
            cancel_button_callback = customOptions.cancel;
        }
        ok_button_callback || (ok_button_callback = baidu.fn.blank);
        customOptions.ok = null;
        delete customOptions.ok;
        cancel_button_callback || (cancel_button_callback = baidu.fn.blank);
        customOptions.cancel = null;
        delete customOptions.cancel;

        baidu.object.extend(defaultOptions, customOptions || {});

        var instance = new magic.Dialog(defaultOptions);

        okConfig.click = function(){
            ok_button_callback.call(instance);
            dispose();
        };
        cancelConfig.click = function(){
            cancel_button_callback.call(instance);
            dispose();
        };

        instance.render();
        instance.center();
        
        var confirm_el = baidu('#' + instance.$getId());

        //关闭按钮
        baidu(instance.getElement('closeBtn')).on('click', closeclickFn = function(){
                    dispose();
                    cancel_button_callback.call(instance);
                });
        disposeProcess.push(function(){
            baidu(instance.getElement('closeBtn')).off('click', closeclickFn);
        });
        //键盘快捷键
        baidu(document).on("keydown", keyFn = function(e){
            e = e || window.event;
            switch (e.keyCode) {
                case 27:    //esc
                    cancelConfig.click();
                    break;
                case 13:    //enter
                    e.preventDefault();
                    e.stopPropagation();
                    okConfig.click();
                    break;
                default:
                    break;
            }
        });
        disposeProcess.push(function(){
            baidu(document).off("keydown", keyFn);
        });
        
        disposeProcess.push(function(){
            instance.$dispose();
        });
        disposeProcess.push(function(){
            document.body.removeChild(confirm_el[0]);
        });
        createMask();

        return instance;
    };
    magic.confirm = magic.Dialog.confirm;
})();












magic.setup.background = function(el, options){
	var opt = options || {};

	var bg = magic.setup(baidu.dom(el).get(0)||el, magic.Background, opt);

	var y = bg.getElement(), s=y.style, yp=y.parentNode;
	s.top = "0px";
	s.left = "0px";
	s.width = bg.timer ? "10px" : "100%";
	s.height = bg.timer ? "10px" : "100%";
	s.position = "absolute";
	s.zIndex = -9;

	bg.coverable && baidu.dom(y).insertHTML("beforeend", bg._coverDom||"");
	yp != document.body
		&& baidu.dom(yp).getCurrentStyle("position")=="static"
		&& (yp.style.position="relative");

	return bg;
};









magic.setup.dialog = function(el, options){
	if(baidu.type(el) === "string"){
        el = '#' + el;
    }
	el = baidu(el)[0];
	var opt = options || {};
	
	var instance = magic.setup(el, magic.control.Dialog, opt),
		container = instance.getElement(),
		cls = el.childNodes, node;

	for(var i = 0, l = cls.length; i < l; i ++){
		if(cls[i].nodeType != 3 && ~ cls[i].className.indexOf("tang-background")){
			magic.setup.background(cls[i], { coverable: true });
			break;
		}
	}

	instance.$mappingDom("title", baidu(".tang-title", container)[0]);
	instance.$mappingDom("titleText", baidu("span", instance.getElement("title"))[0]);
	instance.$mappingDom("titleButtons", baidu(".buttons", instance.getElement("title"))[0]);
	instance.$mappingDom("body", baidu(".tang-body", container)[0]);
	instance.$mappingDom("content", baidu(".content", instance.getElement("body"))[0]);
	instance.$mappingDom("closeBtn", baidu(".close-btn", instance.getElement("title"))[0]);
	instance.$mappingDom("foreground", baidu(".tang-foreground", container)[0]);
	instance.$mappingDom("footer", (node = baidu(".tang-footer", container))[0]);
	instance.$mappingDom("footerContainer", node.children()[0]);
	node.hide();

	// instance.$mappingDom("background", baidu(".tang-background", container)[0]);
	instance._titleHeight = instance.getElement("title").offsetHeight || 30;

	//派发底部渲染
	instance.fire("footer");
	
	var opts = instance._options;
	if(typeof opt.left == "undefined")
		opts.left = baidu(container).css("left") == "auto" ? 0 : baidu(container).css("left");
	if(typeof opt.top == "undefined")
		opts.top = baidu(container).css("top") == "auto" ? 0 : baidu(container).css("top");

	if(typeof opts.width != "number")
		opts.width = container.clientWidth;
	if(typeof opts.height != "number")
		opts.height = container.clientHeight;

	if(opts.width < 100)
		opts.width = 100;
	if(opts.height < 100)
		opts.height = 100;

      
	instance.fire("load");
	instance.show();

	if(opts.titleText)
		instance.setTitleText(opts.titleText);
	if(opts.content)
		instance.setContent(opts.content, opts.contentType || "html");
			
	return instance;
};




























//(function(){
//    var ua = navigator.userAgent;
    
    
    
//    baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
//})();





magic.Mask = function(options){
	var me = this;
	magic.control.Layer.call(this);

	me.zIndex = 999;
	me.opacity = 0.3;
	me.bgColor = "#000000";
	me.coverable = false;
	me.container = document.body;

	baidu.object.extend(me, options || {});

	var sf = baidu.browser.safari,
        ie = baidu.browser.ie;
        
	baidu.dom(me.container).insertHTML("afterBegin", me.toHTMLString());
    
    if(ie == 6){
        me.getElement().style.position = "absolute";
    }
    
    
	function resize(){
		if (me.container == document.body) {
			var ls = me.getElement().style;
                
			ls.display = "none";
			me.setSize([baidu.page.getViewWidth(), baidu.page.getViewHeight()]);
			ls.display = "";
		}
	}
	
	
	function scroll(){
		if (me.container == document.body) {
			var ls = me.getElement().style;
			ls.display = "none";
			ls.top = baidu.page.getScrollTop()  + "px";
			ls.left = baidu.page.getScrollLeft() + "px";
			ls.display = "";
		}
	}

    
	function showObjects(bool){
	    var objects = document.getElementsByTagName("object");
	    var v = bool ? "visible" : "hidden";
	    for(var i = 0, o, l = objects.length; i < l; i ++){
	    	o = objects[i];
	    	o.style.visibility = v;
	    }
	}

	me.on("show", function(){
		resize();
		ie == 6 && scroll();
		baidu.dom(window).on("resize", resize);
		ie == 6 && baidu.dom(window).on("scroll", scroll);

		var es = me.getElement().style;
		es.opacity = me.opacity;
		es.zIndex = me.zIndex;
		es.filter = "alpha(opacity=" + me.opacity * 100 + ")";
		es.backgroundColor = me.bgColor;
		sf && showObjects(false);
	});

	me.on("hide", function(){
		baidu.dom(window).off("resize", resize);
		ie == 6 && baidu.dom(window).off("scroll", scroll);
		sf && showObjects(true);
	});

};
baidu.lang.inherits(magic.Mask, magic.control.Layer, "magic.Mask").extend(

{
	
	toHTMLString : function(){
		return "<div id='"+this.$getId()+"' style='top:0px; left:0px; position:fixed; display:none;'>"
			+("<iframe frameborder='0' style='"
			+"filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);"
			+"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1' "
			+"src='about:blank'></iframe><div style='position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1;'>&nbsp;</div>") +"</div>";
	}
});





baidu.lang.register(magic.control.Dialog, 
	 function(options){
	    if(options && options.mask && options.mask.enable){
	    	this.renderMask();

		    this.on("load", function(){
		    	if(! this._options.left )
		    	    this.center();
		    });

		    this.on("show", function(){
		        this.showMask();
		    });

		    this.on("hide", function(){
		        this.hideMask();
		    });
	    }
	},

	 {
		
		renderMask: function(){
		    if(this._mask)
		        return this;
		    var maskOpt = this._options.mask;
		    this._mask = new magic.Mask({
		    	opacity: maskOpt.opacity || .15,
		    	bgColor: maskOpt.bgColor || "#000",
		    	zIndex: this.zIndex - 1
		    });
		    return this;
		},

		
		showMask: function(){
		    this._mask.show();
		    return this;
		},

		
		hideMask: function(){
		    this._mask.hide();
		    return this;
		}
	}
);




























magic.control.Slider = baidu.lang.createClass( function(options){
    var me = this,
        info = me._info = baidu.object.extend({
            accuracy: 0,
            _status: 'enable'
        }, options), 
        vertical = info._isVertical = info.orientation == 'vertical';

    info.direction == 'backward' && (info._oppsite = true);

    baidu.object.extend(info, {
        _suffix: vertical ? 'vtl' : 'htl',
        _knobKey: vertical ? 'top' : 'left',
        _mouseKey: vertical? 'y' : 'x',
        _accuracyKey: vertical? 'height' : 'width'
    });
    
    me.on("load", function(){
        var view = me.getElement('view'),
            inner = me.getElement('inner'),
            eventsList = ['mousedown', 'click'],
            eventHandler = baidu.fn.bind(me._eventControl, me),
            _accuracyKey = info._accuracyKey;
        
        info._val = 'offset' + _accuracyKey.replace(/([a-z])([a-z]*)/, function($1, $2, $3){
            return $2.toUpperCase() + $3;
        });

        info.width = view.clientWidth;
        info.height = view.clientHeight;

        // 范围和固定值
        info._range = [0, info[_accuracyKey]];
        info._limit = inner[info._val];
        info._const = (info._range[1] - info._limit) / 2;

        baidu.array.each(eventsList, function(type, i){
            baidu.dom(view).on(type, eventHandler);
        });

        // 解除dom events绑定
        me.on('dispose', function(){
            baidu.array.each(eventsList, function(type, i){
                baidu.dom(view).off(type, eventHandler);
            });
        }) ;

        // 设置感应区
        me._setAccuracy(info.accuracy);

        // 初始化slider值
        me.setValue(info.currentValue);

    });

}, {type: "magic.control.Slider", superClass: magic.Base});


magic.control.Slider.extend({

    
    disable: function(){
        this._info._status = 'disabled';
    },
	
    enable: function(){
        this._info._status = 'enable';
    },

	
    setValue: function(value){
        var me = this,
            info = me._info,
            _accuracyKey = info._accuracyKey,
            value = value || 0,
            pos = info[_accuracyKey] * value;

        if(info._oppsite){
            pos = info[_accuracyKey] * me._accSub(1, value);
        }

        // 伪造一个event对象
        me._setPosition({target: null, noAccuracy: true, noFx: true}, pos);
        info.currentValue = value;       
    },
	
    getValue: function(){
        return this._info.currentValue;
    },
	
    setRange: function(value){
        var me = this,
            info = me._info,
            max = info[info._accuracyKey],
            r = value * max;

        // 缓存条限制进度功能，不支持精确度
        if(info.accuracy) return;

        info._oppsite ? info._range[0] = r : info._range[1] = r;
        info._percent = r / max;

    },

    
    $dispose: function(){
        var me = this;
        if(me.disposed) return;
        magic.Base.prototype.$dispose.call(me);
    },

    
    _accSub: function(arg1, arg2){
        var r1, r2, m, n;
        try{ r1 = arg1.toString().split(".")[1].length; }catch(e){ r1 = 0;}
        try{ r2 = arg2.toString().split(".")[1].length; }catch(e){ r2 = 0;}
        m = Math.pow(10, Math.max(r1, r2));

        n = (r1 >= r2) ? r1 : r2;
        return +((arg1 * m - arg2 * m) / m).toFixed(n);
    },

    
    _startDrag: function(evt){
        var me = this,
            info = me._info,
            knob  = me.getElement('knob'),
            process = me.getElement('process'),
            accuracy = info.accuracy,
            r1 = info.width,
            r2 = info.height,
            t1 = 0,
            t2 = 0,
            extra = knob[info._val],
            range = info._range,
            rect = [],
            offset = parseInt(baidu.dom(knob).css('margin-' + info._knobKey));

        if(info._isVertical){ // 计算拖拽的范围
            r2 = range[1] + extra;
            t1 = range[0];
        }else{
            r1 = range[1] + extra;
            t2 = range[0];
        }
        rect = [t1, r1, r2, t2];
       
        if(evt.target != knob || me._isMoving) return;

        me._recover();
        baidu.dom.drag(knob, {range: rect, fix: [info._knobKey, offset], 
            ondragstart: function(){
                me.fire('onslidestart');
            },

            ondrag: function(){
                var pos = me._getRealPos(knob, info._knobKey);
                baidu.dom(process).css(info._accuracyKey, me._getProcessPos(pos));
                me._setCurrentValue(pos);

                me.fire('onslide');
                me.fire('onchange', {value: info.currentValue});
            },

            ondragend: function(knob, op, pos){
                pos = pos[info._knobKey];
                me._reset(pos);
                accuracy && me._useAdsorbr(pos);
                me.fire('onslidestop');
            }
        });
    },

    
    _resize: function(){
        var me = this,
            info = me._info,
            percent = isNaN(Math.min(info._percent, 1)) ? 1 : Math.min(info._percent, 1),
            inner = me.getElement('inner'),
            view = me.getElement('view'), max;

        info.width = view.clientWidth;
        info.height = view.clientHeight;
        info._limit = inner[info._val];
        max = info[info._accuracyKey];

        if(info._oppsite){
            info._range = percent < 1 ? [max * percent, max] : [0, max];
        }else{
            info._range = [0, max * percent];
        }

        me._setAccuracy(info.accuracy); 
    },

    
    _recover: function(){
        var me = this,
            info = me._info,
            knob = me.getElement('knob'),
            process = me.getElement('process'),
            _accuracyKey = info._accuracyKey,
            pos1 = knob.style[info._knobKey],
            pos2 = process.style[_accuracyKey];
        if(/px|auto/.test(pos1)) return;
        if(!pos1.length) pos1 = 0;
        if(!pos2.length) pos2 = 0;
        pos1 = parseFloat(pos1) / 100 * info[_accuracyKey] + 'px';
        pos2 = parseFloat(pos2) / 100 * info._limit + 'px';
        baidu.dom(knob).css(info._knobKey, pos1);
        baidu.dom(process).css(_accuracyKey, pos2);;
    },

    
    _reset: function(pos){
        var me = this,
            info = me._info,
            knob = me.getElement('knob'),
            process = me.getElement('process');

        if(/%/.test(pos)) return;

        baidu.dom(knob).css(info._knobKey, me._knobPercent(pos));
        baidu.dom(process).css(info._accuracyKey, me._processPercent(me._getProcessPos(pos)));
    },

    
    _knobPercent: function(pos){
        var info = this._info;
        return parseFloat(pos) / info[info._accuracyKey] * 100 + '%';

    },

    
    _processPercent: function(pos){
        return parseFloat(pos) / this._info._limit * 100 + '%';

    },

    
    _getRealPos: function(elem, key){
        return elem.style[key];
    },

    
    _getProcessPos: function(pos){
        var me = this,
            info = me._info,
            range = info._range,
            limit = info._limit,
            pos = parseFloat(pos) - info._const;

        if(range[0] && pos < range[0]){
            var val = range[0] - info._const;
            return val > 0 ? val + 'px' : 0;
        }else if(pos > range[1]){
            return range[1] - info._const + 'px';
        }

        pos < 0 && (pos = 0);
        pos > limit && (pos = limit); 
        info._oppsite && (pos = limit - pos);

        return pos + 'px';

    },

    
    _getKnobPos: function(pos){
        var pos = parseFloat(pos),
            info = this._info,
            range = info._range;

        if(info._oppsite){
            pos = pos < range[0] ? range[0] : pos;
        }else{
            pos = pos > range[1] ? range[1] : pos;
        }

        return pos + 'px'
    },

    
    _getMousePos: function(){
        var view = this.getElement('view'),
            xy = baidu.page.getMousePosition(),
            page = baidu.dom(view).offset();
		
        if(this._info._mouseKey == 'x'){
            return xy.x - page.left;
        }else{
            return xy.y - page.top;
        }
    },

    
    _move: function(knob, process, pos){
        var me = this,
            info = me._info,
            range = info._range,
            mousePos = me._getKnobPos(pos),
            processPos = me._getProcessPos(pos);

        me._setCurrentValue(mousePos);
        baidu.dom(knob).css(info._knobKey, me._knobPercent(mousePos));
        baidu.dom(process).css(info._accuracyKey, me._processPercent(processPos));
    },

    
    _setCurrentValue: function(pos){
        var me = this,
        	info = me._info,
        	value = (parseFloat(pos) * 10) / (info[info._accuracyKey] * 10);
        if(info._oppsite){
        	value = me._accSub(1, value);
        }
        info.currentValue = value;
    },

    
    _slide: function(pos, fn, inneral){
        var me = this,
            info = me._info,
            knob = me.getElement('knob'),
            process = me.getElement('process');

        if(me.fire('startFx', {knob: knob, process: process, pos: pos, fn: fn})){
            me._move(knob, process, pos);
            fn && fn();
        }
    },

    
    _setPosition: function(evt, pos, undefined){
       var me = this,
           info = me._info,
           knob = me.getElement('knob'),
           process = me.getElement('process'),
           noAccuracy = evt.noAccuracy || !info.accuracy,
           callback = function(pos){
                me._isMoving = false;
                me.fire('onchange', {value: info.currentValue});        
            };

        pos == undefined && (pos = me._getMousePos()); // 没有传值，计算鼠标位置
        if(evt.target === knob) return;
        
        me._isMoving = true;
        noAccuracy ? me._slide(pos, callback, evt.noFx) : me._useAdsorbr(pos, callback, evt.noFx);
            
    },

    
    _useAdsorbr: function(pos, fn, inneral){
        var me = this,
            info = me._info,
            pos = parseFloat(pos) || 0,
            range = info._range,
            accuracyZone = info._accuracyZone.slice(0),
            len = accuracyZone.length,
            i = 0,
            temp = pos,
            lock;

        if(pos == 0 || pos > range[1])
            lock = pos; // 边界情况
        else{
            if(info.accuracy){
                for(;i < len; i++){
                    var x = Math.abs(accuracyZone[i] - pos);
                    if(x <= temp){
                        temp = x;
                        lock = accuracyZone[i];
                    }
                }
            }else{
                lock = pos;
            }
        }

        me._slide(lock, fn, inneral);
    },

    
    _setAccuracy: function(ratio){
        var info = this._info,
            range = info._range,
            _accuracyKey = info._accuracyKey,
            factor = ratio * info[_accuracyKey],
            m = 0,
            accuracyZone = [0],
            n;

        // 如果设为0，说明不使用感应区
        if(ratio == 0){
            info.accuracy = 0;
            delete info._accuracyZone;
        }

        info.accuracy = ratio;
        while( (n = m + factor) && n < range[1]){
            m = n;
            accuracyZone.push(n);
        }

        info._accuracyZone = accuracyZone.concat(info[_accuracyKey]);
    },

	
	
	
	
	
	
    
    
    _eventControl: function(evt){
        var me = this,
            knob = me.getElement('knob'),
            process = me.getElement('process');

        evt.preventDefault(); // 阻止默认行为
        me._resize(); // 重新设置范围

        if(me._info._status == 'enable'){
            if(evt.target == knob && evt.type == 'mousedown'){
                me._startDrag(evt);
            }else if(evt.type == 'mousedown'){
                me._setPosition(evt);
                me.fire('onslideclick');
            }
        }

    }

});




























magic.control.Slider = baidu.lang.createClass( function(options){
    var me = this,
        info = me._info = baidu.object.extend({
            accuracy: 0,
            _status: 'enable'
        }, options), 
        vertical = info._isVertical = info.orientation == 'vertical';

    info.direction == 'backward' && (info._oppsite = true);

    baidu.object.extend(info, {
        _suffix: vertical ? 'vtl' : 'htl',
        _knobKey: vertical ? 'top' : 'left',
        _mouseKey: vertical? 'y' : 'x',
        _accuracyKey: vertical? 'height' : 'width'
    });
    
    me.on("load", function(){
        var view = me.getElement('view'),
            inner = me.getElement('inner'),
            eventsList = ['mousedown', 'click'],
            eventHandler = baidu.fn.bind(me._eventControl, me),
            _accuracyKey = info._accuracyKey;
        
        info._val = 'offset' + _accuracyKey.replace(/([a-z])([a-z]*)/, function($1, $2, $3){
            return $2.toUpperCase() + $3;
        });

        info.width = view.clientWidth;
        info.height = view.clientHeight;

        // 范围和固定值
        info._range = [0, info[_accuracyKey]];
        info._limit = inner[info._val];
        info._const = (info._range[1] - info._limit) / 2;

        baidu.array.each(eventsList, function(type, i){
            baidu.dom(view).on(type, eventHandler);
        });

        // 解除dom events绑定
        me.on('dispose', function(){
            baidu.array.each(eventsList, function(type, i){
                baidu.dom(view).off(type, eventHandler);
            });
        }) ;

        // 设置感应区
        me._setAccuracy(info.accuracy);

        // 初始化slider值
        me.setValue(info.currentValue);

    });

}, {type: "magic.control.Slider", superClass: magic.Base});


magic.control.Slider.extend({

    
    disable: function(){
        this._info._status = 'disabled';
    },
	
    enable: function(){
        this._info._status = 'enable';
    },

	
    setValue: function(value){
        var me = this,
            info = me._info,
            _accuracyKey = info._accuracyKey,
            value = value || 0,
            pos = info[_accuracyKey] * value;

        if(info._oppsite){
            pos = info[_accuracyKey] * me._accSub(1, value);
        }

        // 伪造一个event对象
        me._setPosition({target: null, noAccuracy: true, noFx: true}, pos);
        info.currentValue = value;       
    },
	
    getValue: function(){
        return this._info.currentValue;
    },
	
    setRange: function(value){
        var me = this,
            info = me._info,
            max = info[info._accuracyKey],
            r = value * max;

        // 缓存条限制进度功能，不支持精确度
        if(info.accuracy) return;

        info._oppsite ? info._range[0] = r : info._range[1] = r;
        info._percent = r / max;

    },

    
    $dispose: function(){
        var me = this;
        if(me.disposed) return;
        magic.Base.prototype.$dispose.call(me);
    },

    
    _accSub: function(arg1, arg2){
        var r1, r2, m, n;
        try{ r1 = arg1.toString().split(".")[1].length; }catch(e){ r1 = 0;}
        try{ r2 = arg2.toString().split(".")[1].length; }catch(e){ r2 = 0;}
        m = Math.pow(10, Math.max(r1, r2));

        n = (r1 >= r2) ? r1 : r2;
        return +((arg1 * m - arg2 * m) / m).toFixed(n);
    },

    
    _startDrag: function(evt){
        var me = this,
            info = me._info,
            knob  = me.getElement('knob'),
            process = me.getElement('process'),
            accuracy = info.accuracy,
            r1 = info.width,
            r2 = info.height,
            t1 = 0,
            t2 = 0,
            extra = knob[info._val],
            range = info._range,
            rect = [],
            offset = parseInt(baidu.dom(knob).css('margin-' + info._knobKey));

        if(info._isVertical){ // 计算拖拽的范围
            r2 = range[1] + extra;
            t1 = range[0];
        }else{
            r1 = range[1] + extra;
            t2 = range[0];
        }
        rect = [t1, r1, r2, t2];
       
        if(evt.target != knob || me._isMoving) return;

        me._recover();
        baidu.dom.drag(knob, {range: rect, fix: [info._knobKey, offset], 
            ondragstart: function(){
                me.fire('onslidestart');
            },

            ondrag: function(){
                var pos = me._getRealPos(knob, info._knobKey);
                baidu.dom(process).css(info._accuracyKey, me._getProcessPos(pos));
                me._setCurrentValue(pos);

                me.fire('onslide');
                me.fire('onchange', {value: info.currentValue});
            },

            ondragend: function(knob, op, pos){
                pos = pos[info._knobKey];
                me._reset(pos);
                accuracy && me._useAdsorbr(pos);
                me.fire('onslidestop');
            }
        });
    },

    
    _resize: function(){
        var me = this,
            info = me._info,
            percent = isNaN(Math.min(info._percent, 1)) ? 1 : Math.min(info._percent, 1),
            inner = me.getElement('inner'),
            view = me.getElement('view'), max;

        info.width = view.clientWidth;
        info.height = view.clientHeight;
        info._limit = inner[info._val];
        max = info[info._accuracyKey];

        if(info._oppsite){
            info._range = percent < 1 ? [max * percent, max] : [0, max];
        }else{
            info._range = [0, max * percent];
        }

        me._setAccuracy(info.accuracy); 
    },

    
    _recover: function(){
        var me = this,
            info = me._info,
            knob = me.getElement('knob'),
            process = me.getElement('process'),
            _accuracyKey = info._accuracyKey,
            pos1 = knob.style[info._knobKey],
            pos2 = process.style[_accuracyKey];
        if(/px|auto/.test(pos1)) return;
        if(!pos1.length) pos1 = 0;
        if(!pos2.length) pos2 = 0;
        pos1 = parseFloat(pos1) / 100 * info[_accuracyKey] + 'px';
        pos2 = parseFloat(pos2) / 100 * info._limit + 'px';
        baidu.dom(knob).css(info._knobKey, pos1);
        baidu.dom(process).css(_accuracyKey, pos2);;
    },

    
    _reset: function(pos){
        var me = this,
            info = me._info,
            knob = me.getElement('knob'),
            process = me.getElement('process');

        if(/%/.test(pos)) return;

        baidu.dom(knob).css(info._knobKey, me._knobPercent(pos));
        baidu.dom(process).css(info._accuracyKey, me._processPercent(me._getProcessPos(pos)));
    },

    
    _knobPercent: function(pos){
        var info = this._info;
        return parseFloat(pos) / info[info._accuracyKey] * 100 + '%';

    },

    
    _processPercent: function(pos){
        return parseFloat(pos) / this._info._limit * 100 + '%';

    },

    
    _getRealPos: function(elem, key){
        return elem.style[key];
    },

    
    _getProcessPos: function(pos){
        var me = this,
            info = me._info,
            range = info._range,
            limit = info._limit,
            pos = parseFloat(pos) - info._const;

        if(range[0] && pos < range[0]){
            var val = range[0] - info._const;
            return val > 0 ? val + 'px' : 0;
        }else if(pos > range[1]){
            return range[1] - info._const + 'px';
        }

        pos < 0 && (pos = 0);
        pos > limit && (pos = limit); 
        info._oppsite && (pos = limit - pos);

        return pos + 'px';

    },

    
    _getKnobPos: function(pos){
        var pos = parseFloat(pos),
            info = this._info,
            range = info._range;

        if(info._oppsite){
            pos = pos < range[0] ? range[0] : pos;
        }else{
            pos = pos > range[1] ? range[1] : pos;
        }

        return pos + 'px'
    },

    
    _getMousePos: function(){
        var view = this.getElement('view'),
            xy = baidu.page.getMousePosition(),
            page = baidu.dom(view).offset();
		
        if(this._info._mouseKey == 'x'){
            return xy.x - page.left;
        }else{
            return xy.y - page.top;
        }
    },

    
    _move: function(knob, process, pos){
        var me = this,
            info = me._info,
            range = info._range,
            mousePos = me._getKnobPos(pos),
            processPos = me._getProcessPos(pos);

        me._setCurrentValue(mousePos);
        baidu.dom(knob).css(info._knobKey, me._knobPercent(mousePos));
        baidu.dom(process).css(info._accuracyKey, me._processPercent(processPos));
    },

    
    _setCurrentValue: function(pos){
        var me = this,
        	info = me._info,
        	value = (parseFloat(pos) * 10) / (info[info._accuracyKey] * 10);
        if(info._oppsite){
        	value = me._accSub(1, value);
        }
        info.currentValue = value;
    },

    
    _slide: function(pos, fn, inneral){
        var me = this,
            info = me._info,
            knob = me.getElement('knob'),
            process = me.getElement('process');

        if(me.fire('startFx', {knob: knob, process: process, pos: pos, fn: fn})){
            me._move(knob, process, pos);
            fn && fn();
        }
    },

    
    _setPosition: function(evt, pos, undefined){
       var me = this,
           info = me._info,
           knob = me.getElement('knob'),
           process = me.getElement('process'),
           noAccuracy = evt.noAccuracy || !info.accuracy,
           callback = function(pos){
                me._isMoving = false;
                me.fire('onchange', {value: info.currentValue});        
            };

        pos == undefined && (pos = me._getMousePos()); // 没有传值，计算鼠标位置
        if(evt.target === knob) return;
        
        me._isMoving = true;
        noAccuracy ? me._slide(pos, callback, evt.noFx) : me._useAdsorbr(pos, callback, evt.noFx);
            
    },

    
    _useAdsorbr: function(pos, fn, inneral){
        var me = this,
            info = me._info,
            pos = parseFloat(pos) || 0,
            range = info._range,
            accuracyZone = info._accuracyZone.slice(0),
            len = accuracyZone.length,
            i = 0,
            temp = pos,
            lock;

        if(pos == 0 || pos > range[1])
            lock = pos; // 边界情况
        else{
            if(info.accuracy){
                for(;i < len; i++){
                    var x = Math.abs(accuracyZone[i] - pos);
                    if(x <= temp){
                        temp = x;
                        lock = accuracyZone[i];
                    }
                }
            }else{
                lock = pos;
            }
        }

        me._slide(lock, fn, inneral);
    },

    
    _setAccuracy: function(ratio){
        var info = this._info,
            range = info._range,
            _accuracyKey = info._accuracyKey,
            factor = ratio * info[_accuracyKey],
            m = 0,
            accuracyZone = [0],
            n;

        // 如果设为0，说明不使用感应区
        if(ratio == 0){
            info.accuracy = 0;
            delete info._accuracyZone;
        }

        info.accuracy = ratio;
        while( (n = m + factor) && n < range[1]){
            m = n;
            accuracyZone.push(n);
        }

        info._accuracyZone = accuracyZone.concat(info[_accuracyKey]);
    },

	
	
	
	
	
	
    
    
    _eventControl: function(evt){
        var me = this,
            knob = me.getElement('knob'),
            process = me.getElement('process');

        evt.preventDefault(); // 阻止默认行为
        me._resize(); // 重新设置范围

        if(me._info._status == 'enable'){
            if(evt.target == knob && evt.type == 'mousedown'){
                me._startDrag(evt);
            }else if(evt.type == 'mousedown'){
                me._setPosition(evt);
                me.fire('onslideclick');
            }
        }

    }

});













magic.Slider = baidu.lang.createClass(function(options){


}, { type: "magic.Slider", superClass: magic.control.Slider });


magic.Slider.extend({
	
    render: function(el){
        var me = this;
    	el = baidu.dom('#'+el).get(0);
        el || document.body.appendChild(el = document.createElement("div"));  	
        if(/tang-slider/.test(el.className)) return;

        baidu.dom(el).addClass('tang-ui tang-slider tang-slider-' + me._info._suffix);
        el.innerHTML = me.toHTMLString();
        me.$mappingDom("", el);

        me.fire("load");

    },

    
    toHTMLString: function(){
        var me = this,
            info = me._info,
            processClass = 'tang-process-' + info.direction,
            cornerClass = info._oppsite ? '-backward' : '',
            template = baidu.string.format(magic.Slider.template, {
                id: me.$getId(),
                viewId: me.$getId('view'),
                innerId: me.$getId('inner'),
                cornerClass: cornerClass,
                processId: me.$getId("process"),
                processClass: processClass,
                knobId: me.$getId("knob")
        });

        return template;
    },

    
    $dispose: function(){
        var me = this, slider;
        if(me.disposed){ return; }
        slider = me.getElement('');
        magic.Base.prototype.$dispose.call(me);
        baidu.dom(slider).remove();
        slider = null;
    }
});

magic.Slider.template = '<div id="#{viewId}" class="tang-view"><div class="tang-content"><div class="tang-corner tang-start#{cornerClass}"></div>'
    + '<div class="tang-corner tang-last#{cornerClass}"></div>'
    + '<div id="#{innerId}" class="tang-inner"><div id="#{processId}" class="tang-process #{processClass}"></div></div>'
    + '</div>'
    + '<a id="#{knobId}" href="javascript:;" class="tang-knob"></a></div>';






magic.setup.slider = function(el, options){
	
    var me = magic.setup(baidu.dom('#'+el).get(0), magic.control.Slider, options),
        container = me.getElement();

    me.$mappingDom('view', baidu('.tang-view', container)[0]);
    me.$mappingDom('knob', baidu('.tang-knob', container)[0]);
    me.$mappingDom('process', baidu('.tang-process', container)[0]);
    me.$mappingDom('inner', baidu('.tang-inner', container)[0]);

    me.fire("load");
    return me;
};











baidu.lang.register(magic.control.Slider, function(options){
    var me = this,
        info = me._info;
    info.cache && info.cache.enable && me.on("load", function(){
        var inner = me.getElement('inner'),
            _accuracyKey = info._accuracyKey,
            cacheClass = info._oppsite ? 'tang-cache-backward' : 'tang-cache-forward',
            id = me.$getId('cache'),
            html = info._oppsite ? '<div id="#{id}" class="tang-cache #{cacheClass}"><div class="tang-cache-corner tang-cache-start"></div>' : '<div id="#{id}" class="tang-cache #{cacheClass}"><div class="tang-cache-corner tang-cache-last"></div>';

        baidu.dom(inner).insertHTML('afterBegin', baidu.string.format(html ,{
            id: id,
            cacheClass: cacheClass
        }));

    });
    
}, {
    
    setCache: function(value){
        var me = this,
            info = me._info,
            cache = me.getElement('cache'),
            cachePos = value * info._limit,
            cachePercent = me._cachePercent(cachePos);
 
        value == 0 ? baidu.dom(cache).css('overflow', 'hidden') : baidu.dom(cache).css('overflow', '');
        baidu.dom(cache).css(info._accuracyKey, me._cachePercent(cachePos));
    },

    
    _cachePercent: function(pos){
        return pos / this._info._limit * 100 + '%';
    }
});



/// support magic - Tangram 1.x Code Start




/// support magic - Tangram 1.x Code Start












 

baidu.fx.move = function(element, options) {
    if (!(element = baidu.dom.g(element))
        || baidu.dom.getStyle(element, "position") == "static") return null;
    
    options = baidu.object.extend({x:0, y:0}, options || {});
    if (options.x == 0 && options.y == 0) return null;

    var fx = baidu.fx.create(element, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            this.protect("top");
            this.protect("left");

            this.originX = parseInt(baidu.dom.getStyle(element, "left"))|| 0;
            this.originY = parseInt(baidu.dom.getStyle(element, "top")) || 0;
        }

        //[Implement Interface] transition
        ,transition : function(percent) {return 1 - Math.pow(1 - percent, 2);}

        //[Implement Interface] render
        ,render : function(schedule) {
            element.style.top  = (this.y * schedule + this.originY) +"px";
            element.style.left = (this.x * schedule + this.originX) +"px";
        }
    }, options), "baidu.fx.move");

    return fx.launch();
};

/// support magic - Tangram 1.x Code End






 

baidu.fx.moveTo = function(element, point, options) {
    if (!(element = baidu.dom.g(element))
        || baidu.dom.getStyle(element, "position") == "static"
        || typeof point != "object") return null;

    var p = [point[0] || point.x || 0,point[1] || point.y || 0];
    var x = parseInt(baidu.dom.getStyle(element, "left")) || 0;
    var y = parseInt(baidu.dom.getStyle(element, "top"))  || 0;

    var fx = baidu.fx.move(element, baidu.object.extend({x: p[0]-x, y: p[1]-y}, options||{}));

    return fx;
};

/// support magic - Tangram 1.x Code End




baidu.lang.register(magic.control.Slider, function(options){
    var me = this,
        fx = me._info.fx;

    me.on('startFx', function(evt){
        if(fx && fx.enable){
            me._fx && me._fx.end();
            me._recover();
            me._fxMove(evt.knob, evt.process, evt.pos, evt.fn);
            evt.returnValue = false;
        }
    });
    
}, {
	
    setValue: function(value, noFx){
        var me = this,
            info = me._info,
            _accuracyKey = info._accuracyKey,
            value = value || 0,
            pos = info[_accuracyKey] * value;

        if(info._oppsite){
            pos = info[_accuracyKey] * me._accSub(1, value);
        }

        // 伪造一个event对象
        me._setPosition({target: null, noAccuracy: true, noFx: noFx}, pos);
        info.currentValue = value;    
    },

	
	
	
	
    
    _fxMove: function(knob, process, pos, fn){
        // 如果没执行动画，也要执行fn～但只有执行了动画才会传入pos参数
        var me = this,
            info = me._info,
            opt = info.fx,
            _knobKey = info._knobKey,
            _accuracyKey = info._accuracyKey,
            pos = parseFloat(me._getKnobPos(pos)),
            pointer = info._isVertical ? [0, pos] : [pos, 0];

        me._setCurrentValue(pos);
        
        me._fx = baidu.fx.moveTo(knob, pointer, {
            duration: opt.duration || 200,
            onbeforestart: function(){
                me.fire('onfxstart');
            },
            onafterupdate: function(){
                var pos = me._getProcessPos(me._getRealPos(knob, _knobKey));
                baidu.dom(process).css(_accuracyKey, pos);
                me.fire('onfx');
            },
            onafterfinish: function(){
                me.fire('onfxstop');
                me._reset(pos);
                fn && fn(pos);
                delete me._fx;
            }
        }) || fn && fn();
    }
});






















magic.control.Tab = baidu.lang.createClass(function(options) {
    var me = this,
        handler = baidu.fn.bind('_toggleHandler', me);
    me._options = baidu.object.extend({
        selectEvent: 'click',
        selectDelay: 0,
        originalIndex: 0
    }, options);
    me._selectedIndex = me._options.originalIndex;
    me.on('onload', function(evt) {
        var container = me.getElement();
        me.$mappingDom('title', baidu('.tang-title', container)[0]).
        $mappingDom('body', baidu('.tang-body', container)[0]);
        baidu.dom(me.getElement('title')).on(me._options.selectEvent, handler);
        me.on('ondispose', function(){
            baidu.dom(me.getElement('title')).off(me._options.selectEvent, handler);
        });
        me.select(me._selectedIndex);
    });
}, {
    type: 'magic.control.Tab',
    superClass: magic.Base
}).extend(
    
{
    
    _toggleHandler: function(evt) {
        if (evt.target.className == 'tang-title') {return;}
        var me = this,
            target = evt.target;//当是mouseover延时时候ie6会取不到对象
        function handler() {
            var el = baidu.dom(target).closest('.tang-title-item').get(0),
                titles = baidu.dom(me.getElement('title')).children(),
                len = titles.length,
                index = 0;
            if (!el) {return;}
            for (var i = 0; i < len; i++) {
                if (titles[i] === el) {
                    index = i;
                    break;
                }
            }
            me._selectedIndex != index && me.select(index);
        }
        if (/^(on)?mouseover$/i.test(me._options.selectEvent)) {
            clearTimeout(me._timeOut);
            me._timeOut = setTimeout(handler, me._options.selectDelay);
        }else {
            handler();
        }
    },
    
    
    
    
    
    select: function(index) {
        var me = this,
            titles = baidu.dom(me.getElement('title')).children(),
            bodies = baidu.dom(me.getElement('body')).children();
        if(!me.fire('onbeforeselect', {index: me._selectedIndex})){return;}
        baidu.dom(titles[me._selectedIndex]).removeClass('tang-title-item-selected');
        baidu.dom(bodies[me._selectedIndex]).removeClass('tang-body-item-selected');
        me._selectedIndex = index;
        baidu.dom(titles[index]).addClass('tang-title-item-selected');
        baidu.dom(bodies[index]).addClass('tang-body-item-selected');
        me.fire('onselect', {index: me._selectedIndex});
    },
    
    getCurrentTitle: function(){
        var me = this;
        return baidu.dom(me.getElement('title')).children()[me._selectedIndex];
    },
    
    getCurrentContent: function(){
        var me = this;
        return baidu.dom(me.getElement('body')).children()[me._selectedIndex];
    },

    
    $dispose: function() {
        var me = this;
        if(me.disposed){return;}
        magic.Base.prototype.$dispose.call(me);
    }
});

















magic.Tab = baidu.lang.createClass(function(options) {
    var me = this;
    me._items = options.items || [];
}, {
    type: 'magic.Tab',
    superClass: magic.control.Tab
}).extend(
    
{
    
    tplTitle: '<li class="#{titleClass}"><a href="#" onclick="return false" hidefocus="true"><span>#{content}</span></a></li>',
    
    tplBody: '<div class="#{bodyClass}">#{content}</div>',

    
    toHTMLString: function() {
        var me = this,
            template = '<ul class="#{titleClass}">#{titleContent}</ul><div class="#{bodyClass}">#{bodyContent}</div>',
            tplTitles = [],
            tplBodies = [];
        baidu.array.each(me._items, function(item, index) {
            tplTitles.push(baidu.string.format(me.tplTitle, {
                titleClass: 'tang-title-item' + (me._selectedIndex == index ? ' tang-title-item-selected' : ''),
                content: item.title
            }));
            tplBodies.push(baidu.string.format(me.tplBody, {
                bodyClass: 'tang-body-item' + (me._selectedIndex == index ? ' tang-body-item-selected' : ''),
                content: item.content
            }));
        });
        return baidu.string.format(template, {
            titleClass: 'tang-title',
            titleContent: tplTitles.join(''),
            bodyClass: 'tang-body',
            bodyContent: tplBodies.join('')
        });
    },
	
    render: function(target) {
        var me = this,
            container;
        if (me.getElement()) {return;}//已经渲染过
        me.$mappingDom('', baidu.dom('#'+target).get(0) || document.body);
        container = me.getElement();
        baidu.dom(container).addClass('tang-ui tang-tab');
        baidu.dom(container).insertHTML('beforeEnd', me.toHTMLString());
        me.fire('onload');
    },
    
    
    $dispose: function(){
        var me = this, title, body;
        if(me.disposed){return;}
        title = me.getElement('title');
        body = me.getElement('body');
        baidu.dom(me.getElement()).removeClass('tang-ui tang-tab');
        magic.Base.prototype.$dispose.call(me);
        baidu.dom(title).remove();
        baidu.dom(body).remove();
        title = body = null;
    }
});






magic.setup.tab = function(el, options) {
	
    var instance = magic.setup(baidu.dom('#'+el).get(0), magic.control.Tab, options);
    instance.fire('onload');
    return instance;
};