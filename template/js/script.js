/*!
 * The best internet store
 * 2016 Tatiana
 * Licensed under ISC
 */
/*! HTML5 Shiv vpre3.5 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
;(function(window, document) {

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|form|map|select|textarea|object|iframe)$/i;

  /** Not all elements can be cloned in IE (this list can be shortend) **/
  var saveClones = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    var a = document.createElement('a');

    a.innerHTML = '<xyz></xyz>';

    //if the hidden property is implemented we can assume, that the browser supports HTML5 Styles | this fails in Chrome 8
    supportsHtml5Styles = ('hidden' in a);
    //if we are part of Modernizr, we do an additional test to solve the Chrome 8 fail
    if(supportsHtml5Styles && typeof injectElementWithStyles == 'function'){
        injectElementWithStyles('#modernizr{}', function(node){
            node.hidden = true;
            supportsHtml5Styles = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle).display == 'none';
        });
    }

    supportsUnknownElements = a.childNodes.length == 1 || (function() {
      // assign a false positive if unable to shiv
      try {
        (document.createElement)('a');
      } catch(e) {
        return true;
      }
      var frag = document.createDocumentFragment();
      return (
        typeof frag.cloneNode == 'undefined' ||
        typeof frag.createDocumentFragment == 'undefined' ||
        typeof frag.createElement == 'undefined'
      );
    }());

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   */
  function shivMethods(ownerDocument) {
    var cache = {},
        docCreateElement = ownerDocument.createElement,
        docCreateFragment = ownerDocument.createDocumentFragment,
        frag = docCreateFragment();

    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if(!html5.shivMethods){
          docCreateElement(nodeName);
      }

      var node;

      if(cache[nodeName]){
          node = cache[nodeName].cloneNode();
      } else if(saveClones.test(nodeName)){
           node = (cache[nodeName] = docCreateElement(nodeName)).cloneNode();
      } else {
          node = docCreateElement(nodeName);
      }

      // Avoid adding some elements to fragments in IE < 9 because
      // * Attributes like `name` or `type` cannot be set/changed once an element
      //   is inserted into a document/fragment
      // * Link elements with `src` attributes that are inaccessible, as with
      //   a 403 response, will cause the tab/window to crash
      // * Script elements appended to fragments will execute when their `src`
      //   or `text` property is set
      return node.canHaveChildren && !reSkip.test(nodeName) ? frag.appendChild(node) : node;
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/\w+/g, function(nodeName) {
          docCreateElement(nodeName);
          frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    var shived;
    if (ownerDocument.documentShived) {
      return ownerDocument;
    }
    if (html5.shivCSS && !supportsHtml5Styles) {
      shived = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
        // corrects audio display not defined in IE6/7/8/9
        'audio{display:none}' +
        // corrects canvas and video display not defined in IE6/7/8/9
        'canvas,video{display:inline-block;*display:inline;*zoom:1}' +
        // corrects 'hidden' attribute and audio[controls] display not present in IE7/8/9
        '[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}'
      );
    }
    if (!supportsUnknownElements) {
      shived = !shivMethods(ownerDocument);
    }
    if (shived) {
      ownerDocument.documentShived = shived;
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': !(options.shivCSS === false),

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': !(options.shivMethods === false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

}(this, document));
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011�2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
/*! modernizr 3.0.0-alpha.3 (Custom Build) | MIT *
 * http://v3.modernizr.com/download/#-checked !*/
!function(e,n){function t(e,n){return typeof e===n}function o(){var e,n,o,i,s,a,f;for(var d in l){if(e=[],n=l[d],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(o=0;o<n.options.aliases.length;o++)e.push(n.options.aliases[o].toLowerCase());for(i=t(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)a=e[s],f=a.split("."),1===f.length?Modernizr[f[0]]=i:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=i),r.push((i?"":"no-")+f.join("-"))}}function i(e){var n=d.className,t=Modernizr._config.classPrefix||"";if(Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),d.className=n)}function s(){var e=n.body;return e||(e=c("body"),e.fake=!0),e}function a(e,n,t,o){var i,a,r,l,f="modernizr",u=c("div"),p=s();if(parseInt(t,10))for(;t--;)r=c("div"),r.id=o?o[t]:f+(t+1),u.appendChild(r);return i=["&#173;",'<style id="s',f,'">',e,"</style>"].join(""),u.id=f,(p.fake?p:u).innerHTML+=i,p.appendChild(u),p.fake&&(p.style.background="",p.style.overflow="hidden",l=d.style.overflow,d.style.overflow="hidden",d.appendChild(p)),a=n(u,e),p.fake?(p.parentNode.removeChild(p),d.style.overflow=l,d.offsetHeight):u.parentNode.removeChild(u),!!a}var r=[],l=[],f={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){l.push({name:e,fn:n,options:t})},addAsyncTest:function(e){l.push({name:null,fn:e})}},d=n.documentElement,c=function(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):n.createElement.apply(n,arguments)},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var u=f.testStyles=a;Modernizr.addTest("checked",function(){return u("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(e){var n=c("input");return n.setAttribute("type","checkbox"),n.setAttribute("checked","checked"),e.appendChild(n),20===n.offsetLeft})}),o(),i(r),delete f.addTest,delete f.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

!function(a) {

  //load mobile banners
  /*(function () {
    var mobile, cookie;
    
    function checkMobile() {
      var hasTouchEvents = ("ontouchstart" in document.documentElement);
      return ( hasTouchEvents && $( document ).width() <= 600 ) ? 'mobile' : 'desktop';
    }
    
    function getCookie() {
      return $.cookie( 'mobile' );
    }
    
    function reload() {
      window.location.replace( window.location );
    }
    
    function setCookie( cookie ) {
      $.cookie( 'mobile', cookie, { expires: 30, path: '/', domain: window.location.hostname });
    }
    
    mobile = checkMobile();
    cookie = getCookie();
    
    if ( !cookie || mobile !== cookie ) {
      setCookie( mobile );
      reload();
    }
    
  }());*/

    function b() {
        var b = a(".col-sm-6 > h1");
        b.text().length >= 25 && b.addClass("i-small")
    }

    function c() {
        var b = a(".bj-text-more a");
        b.length && b.each(function() {
            function b(a, b, c) {
                var d, e, f;
                return c = parseInt(c, 10), d = b.height(), e = a.find(".bj-text-more-wrapper"), e.height() < d ? void g.remove() : (f = Math.floor(d / c) * c, void e.height(f))
            }
            var c, d, e, f, g = a(this);
            return c = g.closest(".row"), d = c.find("img"), d.length ? (f = c.find(".bj-text-more-wrapper"), e = c.css("line-height"), containerHeight = c.find(".bj-text-more-container").height(), d[0].complete ? b(c, d, e) : d.load(function() {
                b(c, d, e)
            }), void g.click(function(a) {
                a.preventDefault(), f.height(containerHeight), g.remove()
            })) : void g.remove()
        })
    }

    function d(b, c) {
        var d, e = window.location.search,
            f = a(b); - 1 !== String(e).search(c + "=") && f.length && setTimeout(function() {
            d = f.offset().top - 20, a.scrollTo(d, 500)
        }, 200)
    }

    function e() {
        a(".bj-page-header__search .glyphicon").click(function() {
            a(this).closest(".bj-page-header__search").addClass("i-active").find("input").focus()
        }), a(".bj-page-header__search__input").blur(function() {
            a(this).val("").closest(".bj-page-header__search").removeClass("i-active")
        })
    }

    function f() {
        a(".bj-page-header__menu-link").click(function(b) {
            b.preventDefault(), b.stopPropagation(), a(".bj-page-header__dropdown article").slideDown()
        }), a(".bj-page-header__dropdown article").click(function(a) {
            a.stopPropagation()
        }), a(".bj-page-header__dropdown .up").click(function(b) {
            a(this).closest("article").slideUp();
            b.preventDefault()
        }), a(document).click(function() {
            a(".bj-page-header__dropdown article").slideUp()
        })
    }

    function g() {
        var b = {
            html: !0,
            trigger: "click",
            placement: "bottom"
        };
        a(".bj-page-header .bj-logo-space__icon.glyphicon-user").popover(b)
    }

    function h() {
        function b() {
            function b(a) {
                a.preventDefault(), i.submit(), f(h), e(k), e(l)
            }

            function c(b) {
                var c = a(this),
                    d = c.attr("action"),
                    e = c.attr("method"),
                    f = c.serialize();
                b.preventDefault(), f && a.ajax({
                    url: d,
                    type: e,
                    dataType: "json",
                    data: f
                })
            }

            function d(b) {
                var c = a(this),
                    d = c.attr("action"),
                    g = c.attr("method"),
                    h = c.serialize();
                b.preventDefault(), h && a.ajax({
                    url: d,
                    type: g,
                    dataType: "json",
                    data: h,
                    success: function(a) {
                        if (a && !(!a instanceof Object))
                            if (a.success) l.hasClass("show") && e(l), e(c), f(k);
                            else if (a.error) {
                            if (l.is(":visible")) return;
                            f(l)
                        }
                    }
                })
            }

            function e(a) {
                a.removeClass("show").addClass("hide")
            }

            function f(a) {
                a.removeClass("hide").addClass("show")
            }
            var g = a(this),
                h = g.find(".bj-news-subscribe-form"),
                i = g.find(".bj-news-unsubscribe-form"),
                j = g.find(".bj-news-unsubscribe-link"),
                k = g.find(".alert-success"),
                l = g.find(".alert-warning");
            h.submit(d), i.submit(c), j.click(b)
        }
        a(".bj-news-subscribe__s").each(b)
    }

    function i() {
        a(".i-link-to-comments-form").click(function(b) {
            b.preventDefault(), a.scrollTo(".blog-comment-form", 500);
            var c = document.getElementsByClassName("blog-comment-form")[0],
                d = c.getElementsByTagName("FORM")[0];
            d.getElementsByTagName("TEXTAREA")[0].focus()
        })
    }

    function j(b) {
        function c() {
            d(), e()
        }

        function d() {
            j.$elem = a(b), j.$elem.data("FloatPhone", j), j.scrollEvent, j.scrollIntervalEvent, j.scrollIntervalId, j.showTimeoutId, j.showTime = 3e3
        }

        function e() {
            f(), a(window).bind("scroll", g)
        }

        function f() {
            j.showTimeoutId = setTimeout(function() {
                h()
            }, j.showTime)
        }

        function g(a) {
            j.scrollEvent = a, j.scrollIntervalEvent || (j.scrollIntervalEvent = a, clearTimeout(j.showTimeoutId), i(), j.scrollIntervalId = setInterval(function() {
                return j.scrollIntervalEvent !== j.scrollEvent ? void(j.scrollIntervalEvent = j.scrollEvent) : (clearInterval(j.scrollIntervalId), j.scrollIntervalEvent = void 0, void f())
            }, 100))
        }

        function h() {
            j.$elem.addClass("i-visible")
        }

        function i() {
            j.$elem.removeClass("i-visible")
        }
        var j = this;
        c()
    }
    
    function loadMobileBanners() {
      var mobile, cookie;
      
      function checkMobile() {
        var hasTouchEvents = ("ontouchstart" in document.documentElement);
        return ( hasTouchEvents && $( document ).width() <= 600 ) ? 'mobile' : 'desktop'
      }
      
      function getCookie() {
        return $.cookie( 'mobile' );
      }
      
      function reload( mobile ) {
        window.location.replace( window.location );
      }
      
      function setCookie( cookie ) {
        $.cookie( 'mobile', cookie, { expires: 30, path: '/', domain: window.location.hostname });
      }
      
      mobile = checkMobile();
      cookie = getCookie();
      
      if ( !cookie || mobile !== cookie ) {
        setCookie( mobile );
        reload( mobile );
      }
      
    }
    
    function catalogTabs() {
      $( '[role="tab"]' ).bind( 'click', function(e) {
        var $tab = $( this );
        var $catalogItem = $tab.closest( '.nav-tabs' ).parent().find( '.bx_catalog_item_container' );
        
        $catalogItem.each( function() {
          var JCCSObject = window[ 'ob' + $( this ).attr( 'id' )];
          if ( JCCSObject && JCCSObject instanceof JCCatalogSection && JCCSObject.lastElement ) {
            setTimeout( function() {
              JCCSObject.containerHeight = parseInt(JCCSObject.obProduct.parentNode.offsetHeight, 10);
            }, 100);
          }
        });
        
      });
    }
    
    a(function() {
    
      //cart icon for small screens edit mode
      a( '#sale-basket-basket-line-container' ).parent( '[id*=bx_incl_area]' ).addClass( 'bx_incl_area_float-right' );  

      //materialize sideNav
      setTimeout( function() {
        $( '#sideNavPanel' ).css({ left: '-300px', visibility: 'visible' });
      }, 100);
      
      $('#nav-button').sideNav({
        menuWidth: 290
      });
    
      //load mobile banners
      loadMobileBanners();
      
      catalogTabs();
      
      if ( window.BX ) {
        BX.addCustomEvent( "onFrameDataReceived", function () {
          a(".bj-logo-space [data-toggle='tooltip']").tooltip();
          a(".bj-sorting [title]").tooltip();
          g();
        });
      }
          g();
      
      e(), f(), h(), i(), d(".bj-sorting", "sort"), d(".bj-catalogue-filter", "set_filter"), c(), b(), matchMedia ? window.matchMedia("(min-width: 500px)").matches && new j("#b-float-phone") : a(document).width() >= 500 && new j("#b-float-phone"), a(".bj-hidden-link").click(function(b) {
          b.preventDefault();
          var c = a(this);
          return c.hasClass("i-up") ? void c.removeClass("i-up").parent().find(".bj-hidden__hidden").slideUp() : void c.addClass("i-up").parent().find(".bj-hidden__hidden").slideDown()
      })
    })
}(jQuery);