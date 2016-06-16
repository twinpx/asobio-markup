/*!
 * The best internet store
 * 2016 Tatiana
 * Licensed under ISC
 */
/*! HTML5 Shiv vpre3.5 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
!function(a,b){/*--------------------------------------------------------------------------*/
/**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}/**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
function d(){var a=l.elements;return"string"==typeof a?a.split(" "):a}/**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   */
function e(a){var b={},c=a.createElement,e=a.createDocumentFragment,f=e();a.createElement=function(a){
//abort shiv
l.shivMethods||c(a);var d;
// Avoid adding some elements to fragments in IE < 9 because
// * Attributes like `name` or `type` cannot be set/changed once an element
//   is inserted into a document/fragment
// * Link elements with `src` attributes that are inaccessible, as with
//   a 403 response, will cause the tab/window to crash
// * Script elements appended to fragments will execute when their `src`
//   or `text` property is set
return d=b[a]?b[a].cloneNode():k.test(a)?(b[a]=c(a)).cloneNode():c(a),d.canHaveChildren&&!j.test(a)?f.appendChild(d):d},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+
// unroll the `createElement` calls
d().join().replace(/\w+/g,function(a){return c(a),f.createElement(a),'c("'+a+'")'})+");return n}")(l,f)}/*--------------------------------------------------------------------------*/
/**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
function f(a){var b;
// corrects block display not defined in IE6/7/8/9
return a.documentShived?a:(l.shivCSS&&!g&&(b=!!c(a,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),h||(b=!e(a)),b&&(a.documentShived=b),a)}/** Preset options */
var g,h,i=a.html5||{},j=/^<|^(?:button|form|map|select|textarea|object|iframe)$/i,k=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;!function(){var c=b.createElement("a");c.innerHTML="<xyz></xyz>",g="hidden"in c,g&&"function"==typeof injectElementWithStyles&&injectElementWithStyles("#modernizr{}",function(b){b.hidden=!0,g="none"==(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).display}),h=1==c.childNodes.length||function(){try{b.createElement("a")}catch(a){return!0}var c=b.createDocumentFragment();return"undefined"==typeof c.cloneNode||"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}()}();/*--------------------------------------------------------------------------*/
/**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
var l={/**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
elements:i.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",/**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
shivCSS:!(i.shivCSS===!1),/**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
shivMethods:!(i.shivMethods===!1),/**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
type:"default",
// shivs the document according to the specified `html5` object options
shivDocument:f};/*--------------------------------------------------------------------------*/
// expose html5
a.html5=l,
// shiv the document
f(b)}(this,document),/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011�2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function b(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var c,d=a.ui.mouse.prototype,e=d._mouseInit,f=d._mouseDestroy;d._touchStart=function(a){var d=this;!c&&d._mouseCapture(a.originalEvent.changedTouches[0])&&(c=!0,d._touchMoved=!1,b(a,"mouseover"),b(a,"mousemove"),b(a,"mousedown"))},d._touchMove=function(a){c&&(this._touchMoved=!0,b(a,"mousemove"))},d._touchEnd=function(a){c&&(b(a,"mouseup"),b(a,"mouseout"),this._touchMoved||b(a,"click"),c=!1)},d._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),e.call(b)},d._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),f.call(b)}}}(jQuery),/*! modernizr 3.0.0-alpha.3 (Custom Build) | MIT *
 * http://v3.modernizr.com/download/#-checked !*/
!function(a,b){function c(a,b){return typeof a===b}function d(){var a,b,d,e,f,g,j;for(var k in i){if(a=[],b=i[k],b.name&&(a.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length))for(d=0;d<b.options.aliases.length;d++)a.push(b.options.aliases[d].toLowerCase());for(e=c(b.fn,"function")?b.fn():b.fn,f=0;f<a.length;f++)g=a[f],j=g.split("."),1===j.length?m[j[0]]=e:(!m[j[0]]||m[j[0]]instanceof Boolean||(m[j[0]]=new Boolean(m[j[0]])),m[j[0]][j[1]]=e),h.push((e?"":"no-")+j.join("-"))}}function e(a){var b=k.className,c=m._config.classPrefix||"";if(m._config.enableJSClass){var d=new RegExp("(^|\\s)"+c+"no-js(\\s|$)");b=b.replace(d,"$1"+c+"js$2")}m._config.enableClasses&&(b+=" "+c+a.join(" "+c),k.className=b)}function f(){var a=b.body;return a||(a=l("body"),a.fake=!0),a}function g(a,b,c,d){var e,g,h,i,j="modernizr",m=l("div"),n=f();if(parseInt(c,10))for(;c--;)h=l("div"),h.id=d?d[c]:j+(c+1),m.appendChild(h);return e=["&#173;",'<style id="s',j,'">',a,"</style>"].join(""),m.id=j,(n.fake?n:m).innerHTML+=e,n.appendChild(m),n.fake&&(n.style.background="",n.style.overflow="hidden",i=k.style.overflow,k.style.overflow="hidden",k.appendChild(n)),g=b(m,a),n.fake?(n.parentNode.removeChild(n),k.style.overflow=i,k.offsetHeight):m.parentNode.removeChild(m),!!g}var h=[],i=[],j={_version:"3.0.0-alpha.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){i.push({name:a,fn:b,options:c})},addAsyncTest:function(a){i.push({name:null,fn:a})}},k=b.documentElement,l=function(){return"function"!=typeof b.createElement?b.createElement(arguments[0]):b.createElement.apply(b,arguments)},m=function(){};m.prototype=j,m=new m;var n=j.testStyles=g;m.addTest("checked",function(){return n("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(a){var b=l("input");return b.setAttribute("type","checkbox"),b.setAttribute("checked","checked"),a.appendChild(b),20===b.offsetLeft})}),d(),e(h),delete j.addTest,delete j.addAsyncTest;for(var o=0;o<m._q.length;o++)m._q[o]();a.Modernizr=m}(window,document),/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function(a){"function"==typeof define&&define.amd?
// AMD
define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(
// This is a quoted cookie as according to RFC2068, unescape...
a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{
// Replace server-side written pluses with spaces.
// If we can't decode the cookie, ignore it, it's unusable.
// If we can't parse the cookie, ignore it, it's unusable.
return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){
// Write
if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){
// If second argument (value) is a function it's a converter...
l=f(r,g);break}
// Prevent storing a cookie that we couldn't decode.
e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){
// Must not alter options, thus extending a fresh object...
return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}}),!function(a){
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
function b(){var b=a(".col-sm-6 > h1");b.text().length>=25&&b.addClass("i-small")}function c(){var b=a(".bj-text-more a");b.length&&b.each(function(){function b(a,b,c){var d,e,f;return c=parseInt(c,10),d=b.height(),e=a.find(".bj-text-more-wrapper"),e.height()<d?void g.remove():(f=Math.floor(d/c)*c,void e.height(f))}var c,d,e,f,g=a(this);return c=g.closest(".row"),d=c.find("img"),d.length?(f=c.find(".bj-text-more-wrapper"),e=c.css("line-height"),containerHeight=c.find(".bj-text-more-container").height(),d[0].complete?b(c,d,e):d.load(function(){b(c,d,e)}),void g.click(function(a){a.preventDefault(),f.height(containerHeight),g.remove()})):void g.remove()})}function d(b,c){var d,e=window.location.search,f=a(b);-1!==String(e).search(c+"=")&&f.length&&setTimeout(function(){d=f.offset().top-20,a.scrollTo(d,500)},200)}function e(){a(".bj-page-header__search .glyphicon").click(function(){a(this).closest(".bj-page-header__search").addClass("i-active").find("input").focus()}),a(".bj-page-header__search__input").blur(function(){a(this).val("").closest(".bj-page-header__search").removeClass("i-active")})}function f(){a(".bj-page-header__menu-link").click(function(b){b.preventDefault(),b.stopPropagation(),a(".bj-page-header__dropdown article").slideDown()}),a(".bj-page-header__dropdown article").click(function(a){a.stopPropagation()}),a(".bj-page-header__dropdown .up").click(function(b){a(this).closest("article").slideUp(),b.preventDefault()}),a(document).click(function(){a(".bj-page-header__dropdown article").slideUp()})}function g(){var b={html:!0,trigger:"click",placement:"bottom"};a(".bj-page-header .bj-logo-space__icon.glyphicon-user").popover(b)}function h(){function b(){function b(a){a.preventDefault(),i.submit(),f(h),e(k),e(l)}function c(b){var c=a(this),d=c.attr("action"),e=c.attr("method"),f=c.serialize();b.preventDefault(),f&&a.ajax({url:d,type:e,dataType:"json",data:f})}function d(b){var c=a(this),d=c.attr("action"),g=c.attr("method"),h=c.serialize();b.preventDefault(),h&&a.ajax({url:d,type:g,dataType:"json",data:h,success:function(a){if(a&&!(!a instanceof Object))if(a.success)l.hasClass("show")&&e(l),e(c),f(k);else if(a.error){if(l.is(":visible"))return;f(l)}}})}function e(a){a.removeClass("show").addClass("hide")}function f(a){a.removeClass("hide").addClass("show")}var g=a(this),h=g.find(".bj-news-subscribe-form"),i=g.find(".bj-news-unsubscribe-form"),j=g.find(".bj-news-unsubscribe-link"),k=g.find(".alert-success"),l=g.find(".alert-warning");h.submit(d),i.submit(c),j.click(b)}a(".bj-news-subscribe__s").each(b)}function i(){a(".i-link-to-comments-form").click(function(b){b.preventDefault(),a.scrollTo(".blog-comment-form",500);var c=document.getElementsByClassName("blog-comment-form")[0],d=c.getElementsByTagName("FORM")[0];d.getElementsByTagName("TEXTAREA")[0].focus()})}function j(b){function c(){d(),e()}function d(){j.$elem=a(b),j.$elem.data("FloatPhone",j),j.scrollEvent,j.scrollIntervalEvent,j.scrollIntervalId,j.showTimeoutId,j.showTime=3e3}function e(){f(),a(window).bind("scroll",g)}function f(){j.showTimeoutId=setTimeout(function(){h()},j.showTime)}function g(a){j.scrollEvent=a,j.scrollIntervalEvent||(j.scrollIntervalEvent=a,clearTimeout(j.showTimeoutId),i(),j.scrollIntervalId=setInterval(function(){return j.scrollIntervalEvent!==j.scrollEvent?void(j.scrollIntervalEvent=j.scrollEvent):(clearInterval(j.scrollIntervalId),j.scrollIntervalEvent=void 0,void f())},100))}function h(){j.$elem.addClass("i-visible")}function i(){j.$elem.removeClass("i-visible")}var j=this;c()}function k(){function a(){var a="ontouchstart"in document.documentElement;return a&&$(document).width()<=600?"mobile":"desktop"}function b(){return $.cookie("mobile")}function c(a){window.location.replace(window.location)}function d(a){$.cookie("mobile",a,{expires:30,path:"/",domain:window.location.hostname})}var e,f;e=a(),f=b(),f&&e===f||(d(e),c(e))}function l(){$('[role="tab"]').bind("click",function(a){var b=$(this),c=b.closest(".nav-tabs").parent().find(".bx_catalog_item_container");c.each(function(){var a=window["ob"+$(this).attr("id")];a&&a instanceof JCCatalogSection&&a.lastElement&&setTimeout(function(){a.containerHeight=parseInt(a.obProduct.parentNode.offsetHeight,10)},100)})})}a(function(){
//cart icon for small screens edit mode
a("#sale-basket-basket-line-container").parent("[id*=bx_incl_area]").addClass("bx_incl_area_float-right"),
//materialize sideNav
setTimeout(function(){$("#sideNavPanel").css({left:"-300px",visibility:"visible"})},100),$("#nav-button").sideNav({menuWidth:290}),
//load mobile banners
k(),l(),window.BX&&BX.addCustomEvent("onFrameDataReceived",function(){a(".bj-logo-space [data-toggle='tooltip']").tooltip(),a(".bj-sorting [title]").tooltip(),g()}),g(),e(),f(),h(),i(),d(".bj-sorting","sort"),d(".bj-catalogue-filter","set_filter"),c(),b(),matchMedia?window.matchMedia("(min-width: 500px)").matches&&new j("#b-float-phone"):a(document).width()>=500&&new j("#b-float-phone"),a(".bj-hidden-link").click(function(b){b.preventDefault();var c=a(this);return c.hasClass("i-up")?void c.removeClass("i-up").parent().find(".bj-hidden__hidden").slideUp():void c.addClass("i-up").parent().find(".bj-hidden__hidden").slideDown()})})}(jQuery);