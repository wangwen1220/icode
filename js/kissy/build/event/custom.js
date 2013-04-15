﻿/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Nov 14 21:52
*/
/**
 * @ignore
 * @fileOverview custom event target for publish and subscribe
 * @author yiminghe@gmail.com
 */
KISSY.add('event/custom/api-impl', function (S, api, Event, ObservableCustomEvent) {
    var trim = S.trim,
        _Utils = Event._Utils,
        splitAndRun = _Utils.splitAndRun,
        KS_BUBBLE_TARGETS = '__~ks_bubble_targets';


    return S.mix(api,
        /**
         * @class KISSY.Event.Target
         * @singleton
         * EventTarget provides the implementation for any object to publish, subscribe and fire to custom events,
         * and also allows other EventTargets to target the object with events sourced from the other object.
         *
         * EventTarget is designed to be used with S.augment to allow events to be listened to and fired by name.
         *
         * This makes it possible for implementing code to subscribe to an event that either has not been created yet,
         * or will not be created at all.
         */
        {

            /**
             * Fire a custom event by name.
             * The callback functions will be executed from the context specified when the event was created,
             * and the {@link KISSY.Event.CustomEventObject} created will be mixed with eventData
             * @param {String} type The type of the event
             * @param {Object} [eventData] The data will be mixed with {@link KISSY.Event.CustomEventObject} created
             * @return {*} If any listen returns false, then the returned value is false. else return the last listener's returned value
             */
            fire: function (target, type, eventData) {
                var self = target, ret = undefined;

                eventData = eventData || {};

                splitAndRun(type, function (type) {
                    var r2, customEvent,
                        typedGroups = _Utils.getTypedGroups(type),
                        _ks_groups = typedGroups[1];

                    type = typedGroups[0];

                    if (_ks_groups) {
                        _ks_groups = _Utils.getGroupsRe(_ks_groups);
                        eventData._ks_groups = _ks_groups;
                    }

                    customEvent = ObservableCustomEvent.getCustomEvent(self, type) ||
                        // in case no publish custom event but we need bubble
                        // because bubbles defaults to true!
                        new ObservableCustomEvent({
                            currentTarget: target,
                            type: type
                        });


                    r2 = customEvent.fire(eventData);


                    if (ret !== false) {
                        ret = r2;
                    }
                });

                return ret;
            },

            /**
             * Creates a new custom event of the specified type
             * @param {String} type The type of the event
             * @param {Object} cfg Config params
             * @param {Boolean} [cfg.bubbles=true] whether or not this event bubbles
             * @param {Function} [cfg.defaultFn] this event's default action
             */
            publish: function (target, type, cfg) {
                var self = target, customEvent;

                splitAndRun(type, function (t) {
                    customEvent = ObservableCustomEvent.getCustomEvent(self, t, 1);
                    S.mix(customEvent, cfg)
                });
            },

            /**
             * Registers another EventTarget as a bubble target.
             * @param {KISSY.Event.Target} anotherTarget Another EventTarget instance to add
             */
            addTarget: function (target, anotherTarget) {
                var targets = api.getTargets(target);
                if (!S.inArray(anotherTarget, targets)) {
                    targets.push(anotherTarget);
                }
            },

            /**
             * Removes a bubble target
             * @param {KISSY.Event.Target} anotherTarget Another EventTarget instance to remove
             */
            removeTarget: function (target, anotherTarget) {
                var targets = api.getTargets(target),
                    index = S.indexOf(anotherTarget, targets);
                if (index != -1) {
                    targets.splice(index, 1);
                }
            },

            /**
             * @private
             * @return {*}
             */
            getTargets: function (target) {
                target[KS_BUBBLE_TARGETS] = target[KS_BUBBLE_TARGETS] || [];
                return target[KS_BUBBLE_TARGETS];
            },

            /**
             * Subscribe a callback function to a custom event fired by this object or from an object that bubbles its events to this object.
             * @method
             * @param {String} type The name of the event
             * @param {Function} fn The callback to execute in response to the event
             * @param {Object} [context] this object in callback
             */
            on: function (target, type, fn, context) {
                var self = target;
                type = trim(type);
                _Utils.batchForType(function (type, fn, context) {
                    var cfg = _Utils.normalizeParam(type, fn, context),
                        customEvent;
                    type = cfg.type;
                    customEvent = ObservableCustomEvent.getCustomEvent(self, type, 1);
                    if (customEvent) {
                        customEvent.on(cfg);
                    }
                }, 0, type, fn, context);

                return self; // chain
            },

            /**
             * Detach one or more listeners the from the specified event
             * @method
             * @param {String} type The name of the event
             * @param {Function} [fn] The subscribed function to un-subscribe. if not supplied, all observers will be removed.
             * @param {Object} [context] The custom object passed to subscribe.
             */
            detach: function (target, type, fn, context) {
                var self = target;
                type = trim(type);
                _Utils.batchForType(function (type, fn, context) {
                    var cfg = _Utils.normalizeParam(type, fn, context),
                        customEvent;
                    type = cfg.type;
                    if (!type) {
                        var customEvents = ObservableCustomEvent.getCustomEvents(self);
                        S.each(customEvents, function (customEvent) {
                            customEvent.detach(cfg);
                        });
                    } else {
                        customEvent = ObservableCustomEvent.getCustomEvent(self, type, 1);
                        if (customEvent) {
                            customEvent.detach(cfg);
                        }
                    }
                }, 0, type, fn, context);

                return self; // chain
            }
        });
}, {
    requires: ['./api', 'event/base', './observable']
});
/*
 yiminghe: 2012-10-24
 - implement defaultFn for custom event

 yiminghe: 2011-10-17
 - implement bubble for custom event
 *//**
 * @ignore
 * @fileOverview custom event target for publish and subscribe
 * @author yiminghe@gmail.com
 */
KISSY.add('event/custom/api', function () {
    return {

    };
});/**
 * @ignore
 * custom facade
 * @author yiminghe@gmail.com
 */
KISSY.add('event/custom', function (S, Event, api, ObservableCustomEvent) {
    var Target = {};

    S.each(api, function (fn, name) {
        Target[name] = function () {
            var args = S.makeArray(arguments);
            args.unshift(this);
            return fn.apply(null, args);
        }
    });

    S.EventTarget = Target;

    var custom = S.mix({
        _ObservableCustomEvent: ObservableCustomEvent,
        Target: Target
    }, api);

    S.mix(Event, {
        Target: Target,
        custom: custom
    });

    return custom;
}, {
    requires: ['./base', './custom/api-impl', './custom/observable']
});/**
 * @ignore
 * simple custom event object for custom event mechanism.
 * @author yiminghe@gmail.com
 */
KISSY.add('event/custom/object', function (S, Event) {

    /**
     * Do not new by yourself.
     *
     * Custom event object.
     * @class KISSY.Event.CustomEventObject
     * @param {Object} data data which will be mixed into custom event instance
     * @extends KISSY.Event.Object
     */
    function CustomEventObject(data) {
        CustomEventObject.superclass.constructor.call(this);
        S.mix(this, data);
        /**
         * source target of current event
         * @property  target
         * @type {KISSY.Event.Target}
         */
        /**
         * current target which processes current event
         * @property currentTarget
         * @type {KISSY.Event.Target}
         */
    }

    S.extend(CustomEventObject, Event._Object);

    return CustomEventObject;

}, {
    requires: ['event/base']
});/**
 * @ignore
 * custom event mechanism for kissy.
 * refer: http://www.w3.org/TR/domcore/#interface-customevent
 * @author yiminghe@gmail.com
 */
KISSY.add('event/custom/observable', function (S, api, CustomEventObserver, CustomEventObject, Event) {

    var _Utils = Event._Utils;

    /**
     * custom event for registering and un-registering observer for specified event on normal object.
     * @class KISSY.Event.ObservableCustomEvent
     * @extends KISSY.Event.ObservableEvent
     * @private
     */
    function ObservableCustomEvent() {
        var self = this;
        ObservableCustomEvent.superclass.constructor.apply(self, arguments);
        self.defaultFn = null;
        self.defaultTargetOnly = false;

        /**
         * whether this event can bubble.
         * Defaults to: true
         * @cfg {Boolean} bubbles
         */
        self.bubbles = true;
        /**
         * event target which binds current custom event
         * @cfg {KISSY.Event.Target} currentTarget
         */
    }

    S.extend(ObservableCustomEvent, Event._ObservableEvent, {

        constructor: ObservableCustomEvent,

        /**
         * add a observer to custom event's observers
         * @param {Object} cfg {@link KISSY.Event.CustomEventObserver} 's config
         */
        on: function (cfg) {
            var observer = new CustomEventObserver(cfg);
            if (this.findObserver(observer) == -1) {
                this.observers.push(observer);
            }
        },

        checkMemory: function () {
            var self = this,
                currentTarget = self.currentTarget,
                events = ObservableCustomEvent.getCustomEvents(currentTarget);
            if (events) {
                if (!self.hasObserver()) {
                    delete events[self.type];
                }
                if (S.isEmptyObject(events)) {
                    delete currentTarget[KS_CUSTOM_EVENTS];
                }
            }
        },

        /**
         * notify current custom event 's observers and then bubble up if this event can bubble.
         * @param {KISSY.Event.CustomEventObject} eventData
         * @return {*} return false if one of custom event 's observers (include bubbled) else
         * return last value of custom event 's observers (include bubbled) 's return value.
         */
        fire: function (eventData) {

            if (!this.hasObserver() && !this.bubbles) {
                return;
            }

            eventData = eventData || {};

            var self = this,
                type = self.type,
                defaultFn = self.defaultFn,
                i,
                parents,
                len,
                currentTarget = self.currentTarget,
                customEvent = eventData,
                gRet, ret;

            eventData.type = type;

            if (!(customEvent instanceof  CustomEventObject)) {
                customEvent.target = currentTarget;
                customEvent = new CustomEventObject(customEvent);
            }

            customEvent.currentTarget = currentTarget;

            ret = self.notify(customEvent);

            if (gRet !== false) {
                gRet = ret;
            }

            if (self.bubbles) {
                parents = api.getTargets(currentTarget);
                len = parents && parents.length || 0;

                for (i = 0; i < len && !customEvent.isPropagationStopped(); i++) {

                    ret = api.fire(parents[i], type, customEvent);

                    // false 优先返回
                    if (gRet !== false) {
                        gRet = ret;
                    }

                }
            }

            if (defaultFn && !customEvent.isDefaultPrevented()) {
                var lowestCustomEvent = ObservableCustomEvent.getCustomEvent(customEvent.target, customEvent.type);
                if ((!self.defaultTargetOnly && !lowestCustomEvent.defaultTargetOnly) ||
                    self == customEvent.target) {
                    defaultFn.call(self);
                }
            }

            return gRet;

        },

        /**
         * notify current event 's observers
         * @param {KISSY.Event.CustomEventObject} event
         * @return {*} return false if one of custom event 's observers  else
         * return last value of custom event 's observers 's return value.
         */
        notify: function (event) {
            var observers = this.observers,
                ret,
                gRet,
                len = observers.length, i;

            for (i = 0; i < len && !event.isImmediatePropagationStopped(); i++) {
                ret = observers[i].notify(event, this);
                if (gRet !== false) {
                    gRet = ret;
                }
                if (ret === false) {
                    event.halt();
                }
            }

            return gRet;
        },

        /**
         * remove some observers from current event 's observers by observer config param
         * @param {Object} cfg {@link KISSY.Event.CustomEventObserver} 's config
         */
        detach: function (cfg) {
            var groupsRe,
                self = this,
                fn = cfg.fn,
                context = cfg.context,
                currentTarget = self.currentTarget,
                observers = self.observers,
                groups = cfg.groups;

            if (!observers.length) {
                return;
            }

            if (groups) {
                groupsRe = _Utils.getGroupsRe(groups);
            }

            var i, j, t, observer, observerContext, len = observers.length;

            // 移除 fn
            if (fn || groupsRe) {
                context = context || currentTarget;

                for (i = 0, j = 0, t = []; i < len; ++i) {
                    observer = observers[i];
                    observerContext = observer.context || currentTarget;
                    if (
                        (context != observerContext) ||
                            // 指定了函数，函数不相等，保留
                            (fn && fn != observer.fn) ||
                            // 指定了删除的某些组，而该 observer 不属于这些组，保留，否则删除
                            (groupsRe && !observer.groups.match(groupsRe))
                        ) {
                        t[j++] = observer;
                    }
                }

                self.observers = t;
            } else {
                // 全部删除
                self.reset();
            }

            self.checkMemory();
        }
    });

    var KS_CUSTOM_EVENTS = '__~ks_custom_events';

    /**
     * Get custom event for specified event
     * @static
     * @private
     * @member KISSY.Event.ObservableCustomEvent
     * @param {HTMLElement} target
     * @param {String} type event type
     * @param {Boolean} [create] whether create custom event on fly
     * @return {KISSY.Event.ObservableCustomEvent}
     */
    ObservableCustomEvent.getCustomEvent = function (target, type, create) {
        var self = this,
            customEvent,
            customEvents = ObservableCustomEvent.getCustomEvents(target, create);
        customEvent = customEvents && customEvents[type];
        if (!customEvent && create) {
            customEvent = customEvents[type] = new ObservableCustomEvent({
                currentTarget: target,
                type: type
            });
        }
        return customEvent;
    };

    /**
     * Get custom events holder
     * @private
     * @static
     * @param {HTMLElement} target
     * @param {Boolean} [create] whether create custom event container on fly
     * @return {Object}
     */
    ObservableCustomEvent.getCustomEvents = function (target, create) {
        if (!target[KS_CUSTOM_EVENTS] && create) {
            target[KS_CUSTOM_EVENTS] = {};
        }
        return target[KS_CUSTOM_EVENTS];
    };

    return ObservableCustomEvent;

}, {
    requires: ['./api', './observer', './object', 'event/base']
});
/**
 * @ignore
 * 2012-10-26 yiminghe@gmail.com
 *  - custom event can bubble by default!
 *//**
 * @ignore
 * Observer for custom event
 * @author yiminghe@gmail.com
 */
KISSY.add('event/custom/observer', function (S, Event) {

    /**
     * Observer for custom event
     * @class KISSY.Event.CustomEventObserver
     * @extends KISSY.Event.Observer
     * @private
     */
    function CustomEventObserver() {
        CustomEventObserver.superclass.constructor.apply(this, arguments);
    }

    S.extend(CustomEventObserver, Event._Observer, {

        keys:['fn','context','groups']

    });

    return CustomEventObserver;

}, {
    requires: ['event/base']
});
