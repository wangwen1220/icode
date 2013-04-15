/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 21:52
*/
KISSY.add("event/custom/api-impl",function(d,k,e,i){var g=d.trim,f=e._Utils,m=f.splitAndRun;return d.mix(k,{fire:function(b,a,c){var h=void 0,c=c||{};m(a,function(a){var l,a=f.getTypedGroups(a);l=a[1];a=a[0];l&&(l=f.getGroupsRe(l),c._ks_groups=l);l=(i.getCustomEvent(b,a)||new i({currentTarget:b,type:a})).fire(c);!1!==h&&(h=l)});return h},publish:function(b,a,c){var h;m(a,function(a){h=i.getCustomEvent(b,a,1);d.mix(h,c)})},addTarget:function(b,a){var c=k.getTargets(b);d.inArray(a,c)||c.push(a)},removeTarget:function(b,
a){var c=k.getTargets(b),h=d.indexOf(a,c);-1!=h&&c.splice(h,1)},getTargets:function(b){b["__~ks_bubble_targets"]=b["__~ks_bubble_targets"]||[];return b["__~ks_bubble_targets"]},on:function(b,a,c,h){a=g(a);f.batchForType(function(a,c,h){c=f.normalizeParam(a,c,h);a=c.type;if(a=i.getCustomEvent(b,a,1))a.on(c)},0,a,c,h);return b},detach:function(b,a,c,h){a=g(a);f.batchForType(function(a,c,h){var j=f.normalizeParam(a,c,h);(a=j.type)?(a=i.getCustomEvent(b,a,1))&&a.detach(j):(a=i.getCustomEvents(b),d.each(a,
function(a){a.detach(j)}))},0,a,c,h);return b}})},{requires:["./api","event/base","./observable"]});KISSY.add("event/custom/api",function(){return{}});KISSY.add("event/custom",function(d,k,e,i){var g={};d.each(e,function(f,e){g[e]=function(){var b=d.makeArray(arguments);b.unshift(this);return f.apply(null,b)}});d.EventTarget=g;e=d.mix({_ObservableCustomEvent:i,Target:g},e);d.mix(k,{Target:g,custom:e});return e},{requires:["./base","./custom/api-impl","./custom/observable"]});
KISSY.add("event/custom/object",function(d,k){function e(i){e.superclass.constructor.call(this);d.mix(this,i)}d.extend(e,k._Object);return e},{requires:["event/base"]});
KISSY.add("event/custom/observable",function(d,k,e,i,g){function f(){f.superclass.constructor.apply(this,arguments);this.defaultFn=null;this.defaultTargetOnly=!1;this.bubbles=!0}var m=g._Utils;d.extend(f,g._ObservableEvent,{constructor:f,on:function(a){a=new e(a);-1==this.findObserver(a)&&this.observers.push(a)},checkMemory:function(){var a=this.currentTarget,c=f.getCustomEvents(a);c&&(this.hasObserver()||delete c[this.type],d.isEmptyObject(c)&&delete a[b])},fire:function(a){if(this.hasObserver()||
this.bubbles){var a=a||{},c=this.type,h=this.defaultFn,b,d,e;b=this.currentTarget;var j=a,g;a.type=c;j instanceof i||(j.target=b,j=new i(j));j.currentTarget=b;a=this.notify(j);!1!==g&&(g=a);if(this.bubbles){e=(d=k.getTargets(b))&&d.length||0;for(b=0;b<e&&!j.isPropagationStopped();b++)a=k.fire(d[b],c,j),!1!==g&&(g=a)}h&&!j.isDefaultPrevented()&&(c=f.getCustomEvent(j.target,j.type),(!this.defaultTargetOnly&&!c.defaultTargetOnly||this==j.target)&&h.call(this));return g}},notify:function(a){var c=this.observers,
b,d,e=c.length,f;for(f=0;f<e&&!a.isImmediatePropagationStopped();f++)b=c[f].notify(a,this),!1!==d&&(d=b),!1===b&&a.halt();return d},detach:function(a){var c,b=a.fn,d=a.context,f=this.currentTarget,e=this.observers,a=a.groups;if(e.length){a&&(c=m.getGroupsRe(a));var j,g,i,k,n=e.length;if(b||c){d=d||f;j=a=0;for(g=[];a<n;++a)if(i=e[a],k=i.context||f,d!=k||b&&b!=i.fn||c&&!i.groups.match(c))g[j++]=i;this.observers=g}else this.reset();this.checkMemory()}}});var b="__~ks_custom_events";f.getCustomEvent=
function(a,c,b){var d,e=f.getCustomEvents(a,b);d=e&&e[c];!d&&b&&(d=e[c]=new f({currentTarget:a,type:c}));return d};f.getCustomEvents=function(a,c){!a[b]&&c&&(a[b]={});return a[b]};return f},{requires:["./api","./observer","./object","event/base"]});KISSY.add("event/custom/observer",function(d,k){function e(){e.superclass.constructor.apply(this,arguments)}d.extend(e,k._Observer,{keys:["fn","context","groups"]});return e},{requires:["event/base"]});
