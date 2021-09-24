window.setting = (typeof window.setting !== 'undefined') ? window.setting : {};

;(function(window, $){
	'use strict';

    /*
     * device detect
     */
    var device = function() {
	    var ua = navigator.userAgent,
            ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
            deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
            filter = "win16|win32|win64|mac|macintel",
            uAgent = ua.toLowerCase(),
            deviceInfo_len = deviceInfo.length;

        var browser = window.browser = {},
            support = window.support = {},
            i = 0,
            version,
            device;

        for (i = 0; i < deviceInfo_len; i++) {
            if (uAgent.match(deviceInfo[i]) != null) {
                device = deviceInfo[i];
                break;
            }
        }

        browser.local = (/^http:\/\//).test(location.href);
        browser.firefox = (/firefox/i).test(ua);
        browser.webkit = (/applewebkit/i).test(ua);
        browser.chrome = (/chrome/i).test(ua);
        browser.opera = (/opera/i).test(ua);
        browser.ios = (/ip(ad|hone|od)/i).test(ua);
        browser.android = (/android/i).test(ua);
        browser.safari = browser.webkit && !browser.chrome;
        browser.app = ua.indexOf('appname') > -1 ? true : false;

        //touch, mobile 환경 구분
        support.touch = browser.ios || browser.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
        browser.mobile = support.touch && ( browser.ios || browser.android);
        //navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';

        //os 구분
        browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
        browser.os = browser.os ? browser.os[1].toLowerCase() : '';

        //version 체크
        if (browser.ios || browser.android) {
            version = ua.match(/applewebkit\/([0-9.]+)/i);
            version && version.length > 1 ? browser.webkitversion = version[1] : '';
            if (browser.ios) {
                version = ua.match(/version\/([0-9.]+)/i);
                version && version.length > 1 ? browser.ios = version[1] : '';
            } else if (browser.android) {
                version = ua.match(/android ([0-9.]+)/i);
                version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
            }
        }

        if (ie) {
            browser.ie = ie = parseInt( ie[1] || ie[2] );
            ( 11 > ie ) ? support.pointerevents = false : '';
            ( 9 > ie ) ? support.svgimage = false : '';
        } else {
            browser.ie = false;
        }

        var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
        var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
        var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';

        $('html').addClass(browser.os);
        $('html').addClass(clsBrowser);
        $('html').addClass(clsMobileSystem);
        $('html').addClass(clsMobile);
    }();

})(window, jQuery);


;(function(window, $){
	'use strict';

	/*
	 * namespace
	 */

	var global = '$plugins';
	var namespace = 'ui';
	var nameSpaceRoot = null;

	function createNameSpace(identifier, module){
		var win = window, name = identifier.split('.'), p, i = 0;

		if(!!identifier){
			for (i = 0; i < name.length; i += 1){
				if(!win[ name[ i ] ]){
					if(i === 0){
						win[ name[ i ] ] = {};
						nameSpaceRoot = win[ name[ i ] ];
					} else {
						win[ name[ i ] ] = {};
					}
				}
				win = win[ name[ i ] ];
			}
		}
		if(!!module){
			for (p in module){
				if(!win[ p ]){
					win[ p ] = module[ p ];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return win;
	}

	if(!!window[ global ]){
		throw new Error("already exists global!> " + global);
	} 
	window[ global ] = createNameSpace(namespace, {
		namespace : function(identifier, module){
			return createNameSpace(identifier, module);
		}
	});
})(window, jQuery);


;(function(window, $){
	'use strict';

	/*
	 * ui common
	 */

	$plugins.namespace('ui', {
		uiAjax: function(opt){
			return uiAjaxLoad(opt);
		},
		scrollDowned: function(opt){
			return uiScrollDowned(opt);
		},
		inview: function(opt){
			return uiInview(opt);
		},
		isInvew: function(opt){
			return uiIsInview(opt);
		},
		basicToggle: function(opt){
			return uiToggle(opt);
		}
	});

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html') || document.getElementsByTagName('html')[0],
        $body = $('body'), 
        $header = $('#header'),
        $menu = $('#allmenu'),
        $main = $('#container'),
        $footer =  $('#footer');

    var opts = {
        inviewEl: '.ui_inview', // inview class
        prevScrollTop: 0, // scrolldown
        timerIsScrolling: '', // scrolldown timer
		transitionEndEvt: 'transitionend webkitTransitionEnd oTransitionEnd',
		animationEndEvt: 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd'
    }

	ui.setting = { mode : 'pub' }

	/* 
	 * uiAjaxLoad
	 */
	function uiAjaxLoad(setting) {
		if (setting === undefined) {
			return false;
		}

		var $id = $('#'+setting.id),
			callback = setting.callback === undefined ? false : setting.callback,
			errorCallback = setting.errorCallback === undefined ? false : setting.errorCallback;

		$.ajax({
			type: 'GET',
			url: setting.url,
			cache: false,
			async: false, 
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				$id.append(v);
				callback ? callback(v) : '';
			}
		});
	}
    
	/* 
	 * inview
     * data-delay
	 */
	function uiInview() {
		
		var $el = $(opts.inviewEl),
			_length = $el.length;

		var _scrolling = function() {

			var i = 0;

			while (i < _length) {
				var $this = $el.eq(i)
					//, $$this = $this[0]
					, _dataOnce = $this.data('once')
					, _dataDelay = $this.data('delay')
					, _bool = (uiIsInview({
						el: $this
					}) === true) ? true : false;
	
				if (_dataOnce === true) {
					if (_bool === true) {
						$this.addClass('in');
					}
				} else {
					$this.toggleClass('in', _bool);
				}
				if (_dataDelay !== undefined) {
					$this.attr('style', 'transition-delay:'+ (_dataDelay*200) +'ms');
				}
				i++;
			};

		}

		_scrolling(); // init

		$(window).off('scroll.inview').on('scroll.inview', function(e) {
			_scrolling();
		});
		
	}

	/* 
	 * isInview
	 * return boolean
	 */
	function uiIsInview(opt) {

		var settings = $.extend(true, {
			el: opts.inviewEl
		}, opt);

		var $el = $(opt.el);

		if (!$el.is(':visible')) return false;
		
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			, scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
			, topOffset = -200
			, leftOffset = 0;

		var wHeight = window.innerHeight || document.documentElement.clientHeight
			, wWidth = $window.width();

		var _offset = $el.offset()
			, _left = _offset.left
			, _top = _offset.top;

		if (_top + $el.height() >= scrollTop && _top - topOffset <= scrollTop + wHeight && _left + $el.width() >= scrollLeft && _left - leftOffset <= scrollLeft + wWidth) {
			return true;
		} else {
			return false;
		}
	}

	/* 
	 * uiScrollDowned
	 */
	function uiScrollDowned() {

		var settings = {
			targetTop: 1,
			stateUp: 'is-scrolling-up',
			stateDown: 'is-scrolling-down',
			stateDowned: 'is-scroll-downed',
			statePageEnd: 'is-page-end',
			stateFooter: 'is-footer'
		};

		var scrollTop, _isScrollDowned, _isPageEnd, _isFooter;


		var _act = function() {

			scrollTop = document.documentElement.scrollTop || document.body.scrollTop || $window.scrollTop(); // 현재상태
			_isScrollDowned = (scrollTop >= settings.targetTop);
			_isPageEnd = $document.height() === scrollTop + $window.height();
			_isFooter = ($footer.length) ? 
				(scrollTop >=  $footer.offset().top - $window.height()) :
				false;

			$html.toggleClass(settings.stateDowned, _isScrollDowned);

			clearTimeout(opts.timerIsScrolling);

			if (scrollTop < opts.prevScrollTop) {
				$html.removeClass(settings.stateDown);
				$html.addClass(settings.stateUp);
			} else {
				$html.removeClass(settings.stateUp);
				$html.addClass(settings.stateDown);
			}

			$html.toggleClass(settings.statePageEnd, _isPageEnd);
			$html.toggleClass(settings.stateFooter, _isFooter);

			opts.timerIsScrolling = setTimeout(function() {
				$html.removeClass(settings.stateDown);
			}, 1000);

			opts.prevScrollTop = scrollTop;
			
		}

		_act();

		$window.off('scroll.scrollDowned').on('scroll.scrollDowned', function(e) {
			_act();
		});
		
	}

	/*
	 * uiToggle 토글
	 */
	function uiToggle() {

		$document.off('click.basicToggle').on('click.basicToggle' , '.ui_toggle', function(e) {
			e.preventDefault();

			var $this = $(this),
				isAnchor = (this.tagName.toLowerCase() === 'a'),
				_id = isAnchor ? $this.attr('href') : $this.data('id'),
				$target = isAnchor ? $(_id) : $('#'+_id);

			$this.toggleClass('on');
			$target.toggleClass('on').siblings().removeClass('on');

		});
		
		$document.off('click.basicDropdown').on('click.basicDropdown' , '.ui_dropdown > button', function(e) {
			e.preventDefault();

			var $this = $(this),
				$wrap = $this.parent();

			$('.ui_dropdown').not($wrap).removeClass('on');
			$wrap.toggleClass('on');

		});

		function closeDropdown() {
			$('.ui_dropdown').removeClass('on');
		}
		
        $document.off('click.basicDropdownClose').on('click.basicDropdownClose', function(e) {
            if(!$(e.target).closest('.ui_dropdown').length) {
				closeDropdown();
            }
        });
	}

})(window, jQuery);