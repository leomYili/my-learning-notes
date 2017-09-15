/**
 * arm.touch
 * @authors Nat Liu (natcube@gmail.com)
 * @date    2015-11-30 09:27:05
 * @version 2015-11-30 09:27:05
 */
;!function(win, $, A){
    "use strict";
    var PI = Math.PI,
        abs = Math.abs,
        support = A.support,
        touchEvents = A.touchEvents,
        eventsList = ['dragStart', 'drag', 'dragEnd', 'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'singleTap', 'doubleTap', 'holdTouch'];
    A.config({
        touch: {
            tapTime: 350,
            tapDistance: 15,
            holdTouchDelay: 600,
            doubleTapInterval: 400,
            doubleTapDelta: 10,
            swipeTime: 300,
            swipeDistance: 20,
            scrollCancel: 30,
            preventDefault:true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|SELECT)$/ }
        }
    });

    function setHandlers(touch, eventsName, selector, callback){
    	touch.handlers = touch.handlers || {};
    	var fnstr = callback.toString();
    	var preventDefault = fnstr.match(/[^\n]*\.preventDefault\(.*?\).*/);
    	$.each(eventsName, function(index, type) {
    		touch.handlers[type] = touch.handlers[type] || {};
        	touch.handlers[type][selector] = touch.handlers[type][selector] || [];
        	touch.handlers[type][selector].push(callback);
        	touch.preventDefault = touch.preventDefault || {};
        	touch.defaultPrevented = touch.defaultPrevented || {};
        	if(preventDefault&&!/((\/\/|\/\*).*preventDefault)|(preventDefault.*(\*\/))/.test(preventDefault[0])&&!touch.defaultPrevented[type]){
        		touch.preventDefault[type] = touch.defaultPrevented[type] = true;
        	}
        });
        return touch;
    }

    function doHandlers(handlers, e){
    	var _this = this;
    	$.each(handlers, function(index, handler) {
    		handler.call(_this, e);
    	});
    }

    function removeEventHandler(type, target, func) {
	    if (target.removeEventListener){
	        //监听IE9，谷歌和火狐
	        target.removeEventListener(type, func, false);
	    } else if (target.detachEvent){
	        target.detachEvent("on" + type, func);
	    }else {
	        delete target["on" + type];
	    }
	}

    function _touchPoint(e, type){
        var type = type.toUpperCase();
        return support.touch ? e.touches[0]["page"+type] : (e["page"+type] || e["client"+type])
    }

        // touchstart
    function _touchStart(e){

        var self = this, touch = self.touch, lastT = touch.lastT, lastX = touch.lastX, lastY = touch.lastY;

        self.cancelAll();
        if (/mouse/.test(touchEvents.touchStart) && e.button !== 0 )return;
        touch = {};
        touch.target = e.target;
        if(support.touch&&!e.touches){
            e.touches = e.originalEvent.touches;
            if(e.touches.length)
            	touch.target = ('tagName' in e.touches[0].target ? e.touches[0].target : e.touches[0].target.parentNode) || e.target;
        }
        self.touchTimeout && clearTimeout(self.touchTimeout);
        // 按下时的坐标及角度
        touch.startX = touch.curX = touch.lastX = _touchPoint(e,"x");
        touch.startY = touch.curY = touch.lastY = _touchPoint(e,"y");
        touch.startT = touch.lastT = +(new Date());
        touch.moveX = touch.moveY = touch.angle = 0;
        // 按下时滚动条位置
        touch.scrollT = $(win).scrollTop();
        touch.scrollL = $(win).scrollLeft();
        // 与上次触摸间隔
        touch.deltaT = touch.startT - (lastT || touch.startT);
        // 与上次触摸位置差
        touch.deltaX = touch.startX - (lastX || touch.startX);
        touch.deltaY = touch.startY - (lastY || touch.startY);
        if(!touch.target||touch.active)return;
        touch.active = true;
        self.touch = touch;
        if(self.isDefaultPrevent('dragStart')){
        	e.preventDefault();
    	}
        self._trigger("dragStart", e);
        self.holdTouchTimeout = setTimeout(function(){
        	self.holdTouch(e);
        }, self.config.holdTouchDelay);
    }

    // touchmove
    function _touchMove(e){
        var self = this, touch = self.touch;
        if(!touch.active)return;
        if(support.touch && !e.touches){
            e.touches = e.originalEvent.touches;
        }
        if (/mouse/.test(touchEvents.touchStart) && e.button !== 0 )return;
        self.cancelholdTouch();
        // 触摸时的坐标
        touch.curX = _touchPoint(e,"x");
        touch.curY = _touchPoint(e,"y");
        // 触摸的距离
        touch.moveX = touch.curX - touch.startX;
        touch.moveY = touch.curY - touch.startY;
        touch.angle = Math.atan2(-touch.moveY, touch.moveX);
        self.touch = touch;
        self._trigger("drag",e);

        var p6 = Math.PI/6,
        	angle = Math.abs(touch.angle);
        touch.angleX = angle<p6||angle>5*p6;
        touch.angleY = angle>2*p6&&angle<4*p6;
        if(touch.angleY&&!touch.dragX){
        	touch.dragY = true;
        }
        if(touch.angleX&&!touch.dragY){
        	touch.dragX = true;
        }
        if(self.isDefaultPrevent('drag')){
        	e.preventDefault();
    	}
    	if(self.isDefaultPrevent('swipeLeft|swipeRight')&&touch.angleX){
        	e.preventDefault();
    	}
    	if(self.isDefaultPrevent('swipeUp|swipeDown')&&touch.angleY){
        	e.preventDefault();
    	}
    }

    // touchend
    function _touchEnd(e){
        var self = this, touch = self.touch, config = self.config;
        if (/mouse/.test(touchEvents.touchStart) && e.button !== 0 )return;
        if(!touch.active)return;
        self.cancelholdTouch();
        // 触摸结束时间
        touch.endT = +(new Date());
        // 触摸间隔
        touch.touchT = touch.endT - touch.startT;
        touch.isTap = touch.touchT < config.tapTime && abs(touch.moveX) < config.tapDistance && abs(touch.moveY) < config.tapDistance;
        touch.isSwipe = (abs(touch.moveX) > config.swipeDistance || abs(touch.moveY) > config.swipeDistance) && touch.touchT < config.swipeTime;
        touch.isDoubleTap = touch.deltaT > 0 && touch.deltaT < config.doubleTapInterval && Math.abs(touch.deltaX) < config.doubleTapDelta && Math.abs(touch.deltaY) < config.doubleTapDelta;
        touch.active = false;
        self.touch = touch;

        // touchend 触摸结束事件
        setTimeout(function(){
        	self._trigger("dragEnd",e);
        },5);
        if(touch.isSwipe){
            self.swipeTimeout = setTimeout(function(){
                self._trigger("swipe swipe"+self.swipeDirection(), e);
            },3)
        }
        if(touch.lastT&&touch.isTap&&!/cancel/i.test(e.type)){
        	if(self.isDefaultPrevent('tap')){
	        	e.preventDefault();
	        	if($.isFunction(self.onclick))
        			self.onclick.apply(self.el[0],[e]);
	    	}

            self.tapTimeout = setTimeout(function(){
            	self._trigger("tap",e);
                if(touch.isDoubleTap){
                    self._trigger("doubleTap",e);
                }else{
                    self._trigger("singleTap",e);
                }
            },3);
        }
    }

    var Touch = function(element){
    	var _this = this;
        _this.el = $(element);
        _this.touch = {};
        _this.config = A.config("touch");
        _this.touchTimeout = _this.tapTimeout = _this.swipeTimeout = _this.holdTouchTimeout = null;
        _this.init();
    }

    Touch.prototype.init = function(){
        var self = this;
        self._touchStart = $.proxy(_touchStart, self);
        self._touchMove = $.proxy(_touchMove, self);
        self._touchEnd = $.proxy(_touchEnd, self);
        self.onEvents();
        self.scrollCancel();
    }

    Touch.prototype.swipeDirection = function() {
        var touch = this.touch;
        return abs(touch.moveX) >= abs(touch.moveY) ? (touch.moveX > 0 ? 'Right' : 'Left') : (touch.moveY> 0 ? 'Down' : 'Up');
    }

    Touch.prototype.holdTouch = function(e) {
        var self = this;
        self.holdTouchTimeout = null;
        if (self.touch.lastT) {
            self.touch.isHoldTouch = true;
            self._trigger("holdTouch");
        }
    }

    Touch.prototype.cancelholdTouch = function() {
        var self = this;
        if (self.holdTouchTimeout) clearTimeout(self.holdTouchTimeout);
        self.holdTouchTimeout = null;
    }

    Touch.prototype.isDefaultPrevent = function(eventType){
    	var self = this, touch = self.touch;
    	if(!self.config.preventDefault||!$.isPlainObject(self.preventDefault)||$.isEmptyObject(self.preventDefault)||A.utils.preventDefaultException(touch.target, self.config.preventDefaultException))
    		return false;
    	if($.type(eventType)==="undefined")
    		return true;
    	var reg = new RegExp(eventType,"gi");
    	for(var type in self.preventDefault){
    		if(reg.test(type))
    			return true;
    	}
    	return false;
    }

    Touch.prototype._trigger = function(eventName, e){
        var self = this, touch = self.touch;
        var eventsName = $.trim(eventName).split(/\s+/);
       	$.each(eventsName, function(index, name) {
       		var event = $.Event(name,{touch: touch, originalEvent:e});
       		if(self.handlers[name]){
        		$.each(self.handlers[name], function(selector, handler) {
        			if(selector!=="self"){
        				var $selector = $(touch.target).closest(selector);
        				if($selector.length){
        					doHandlers.call($selector[0], handler, event);
        				}
        			}else{
        				doHandlers.call(self.el[0], handler, event);
        			}
        		});
        	}
       	});
    }

    // cancel
    Touch.prototype.cancelAll = function() {
        var self = this;
        if (self.touchTimeout) clearTimeout(self.touchTimeout);
        if (self.tapTimeout) clearTimeout(self.tapTimeout);
        if (self.swipeTimeout) clearTimeout(self.swipeTimeout);
        if (self.holdTouchTimeout) clearTimeout(self.holdTouchTimeout);
        self.touchTimeout = self.tapTimeout = self.swipeTimeout = self.holdTouchTimeout = null;
        self.touch = {};
    }

    // scroll cancel
    Touch.prototype.scrollCancel = function(){
        var self = this;
        $(win).on('scroll', function(){
            var scrollTop = abs($(win).scrollTop() - self.touch.scrollT),
                scrollLeft = abs($(win).scrollLeft() - self.touch.scrollL);
            if(scrollTop > self.config.scrollCancel || scrollLeft > self.config.scrollCancel) self.cancelAll();
        });
    }

    Touch.prototype.onEvents = function() {
        var self = this;
        self.el.on(touchEvents.touchStart, self._touchStart);
        $(document).on(touchEvents.touchEnd, self._touchEnd)
        .on(touchEvents.touchMove, self._touchMove);
        support.touch&&$(document).on(touchEvents.touchCancel, self._touchEnd);
    }

    function Plugin(eventName, selector, callback){
        if(typeof eventName!=="string"||!eventName)return this;
        var eventsName = $.trim(eventName).split(/\s+/);
        if(!eventsName.length)return this;
        if(typeof selector!=="string"){
	        if(typeof selector === "function"){
	            callback = selector;
	        }
	        selector = "self";
	    }else{
	    	if(!selector.length)
	    		return this;
	    }
        if(typeof callback!=="function")
            return this;

        return this.each(function(index, el) {
            var touch = $(el).data("arm.touch");
            if(!touch){
                $(el).data('arm.touch', (touch = new Touch(el)));
                touch.onclick = el.onclick;
                el.onclick = null;
            }
           	setHandlers(touch, eventsName, selector, callback);
			for(var type in touch.preventDefault){
	        	if(/tap/gi.test(eventName)&&!touch.isClickPrevented){
	        		$(el).on('click', function(event) {
	        			event.preventDefault();
	        		});
	        		touch.isClickPrevented = true;
	        		return;
	        	}
	        }
        });
    }

    function offTouch(eventName, selector, callback){
    	if(typeof eventName!=="string"||!eventName)return this.handlers = {};
    	var eventsName = $.trim(eventName).split(/\s+/);
        if(!eventsName.length)return this.handlers = {};
        if(typeof selector!=="string"){
	        if(typeof selector === "function"){
	            callback = selector;
	        }
	        selector = "self";
	    }
        var _this = this;
        $.each(eventsName, function(index, type) {
        	if(_this.handlers[type]){
        		if(_this.handlers[type][selector]){
        			var index = $.inArray(callback, _this.handlers[type][selector]);
        			if(index!==-1){
        				return _this.handlers[type][selector].splice(index,1);
        			}
        			return _this.handlers[type][selector] = [];
        		}
        		return _this.handlers[type] = {};
        	}
        });

    }

    // 注册插件
    A.pt.onTouch = $.fn.touch = function(eventName, selector, callback){
        return Plugin.call(this.$||this, eventName, selector, callback);
    }
    A.pt.offTouch = $.fn.offTouch = function(eventName, selector, callback){
    	var $this = this.$ || this;
    	return $this.each(function(index, el) {
    		var touch = $(el).data("arm.touch");
    		if(touch)
    			offTouch.call(touch, eventName, selector, callback);
    	});
    }
    A.pt.touch = $.fn.doTouch = function(eventName){
    	var $this = this.$ || this;
    	return $this.each(function(index, el) {
    		var touch = $(el).data("arm.touch");
    		if(touch)
    			touch._trigger(eventName);
    	});
    }
    // 兼容插件方式
    $.each(eventsList, function(index, eventName) {
        $.fn[eventName] = function(selector, callback){
            return Plugin.call(this, eventName, selector, callback);
        }
    });

    arm.touch = Touch;

}(window, window.jQuery || window.Zepto, window.arm);
