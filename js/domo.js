/*!
 * domo.js v2.6.7
 * Optional utility library for Custom Apps
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.domo=e():t.domo=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/dist/",e(0)}([function(t,e,n){"use strict";function r(){}function o(t,e,n,r,o){return n=n||{},new Promise(function(s,u){var l=new XMLHttpRequest;if(r?l.open(t,e,r):l.open(t,e),a(l,e,n),c(l,n),f(l,n),l.onload=function(){var t;if(i(l.status)){!["csv","excel"].includes(n.format)&&l.response||s(l.response),"blob"===n.responseType&&s(new Blob([l.response],{type:l.getResponseHeader("content-type")}));var e=l.response;try{t=JSON.parse(e)}catch(t){return void u(Error("Invalid JSON response"))}s(t)}else u(Error(l.statusText))},l.onerror=function(){u(Error("Network Error"))},o)if(n.contentType&&"application/json"!==n.contentType)l.send(o);else{var p=JSON.stringify(o);l.send(p)}else l.send()})}function i(t){return t>=200&&t<300}function s(t){var e=t.match("^https?://([^/]+[.])?(domo|domotech|domorig).(com|io)?(/.*)?$"),n=t.match("(.*).(domoapps).(.*)");return!!e&&!n}function u(){var t=location.search.substr(1),e={};return t.split("&").forEach(function(t){var n=t.split("=");e[n[0]]=decodeURIComponent(n[1])}),e}function a(t,e,n){if(e.indexOf("data/v1")!==-1){var r={"array-of-arrays":"application/json",csv:"text/csv",excel:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};t.setRequestHeader("Accept",n.format?r[n.format]||"application/array-of-objects":"application/array-of-objects")}}function c(t,e){e.contentType?"multipart"!==e.contentType&&t.setRequestHeader("Content-Type",e.contentType):t.setRequestHeader("Content-Type","application/json")}function f(t,e){e.responseType&&(t.responseType=e.responseType)}n(1).polyfill(),t.exports=r,r.post=function(t,e,n){return o("POST",t,n,!0,e)},r.put=function(t,e,n){return o("PUT",t,n,!0,e)},r.get=function(t,e){return o("GET",t,e)},r.delete=function(t,e){return o("DELETE",t,e)},r.getAll=function(t,e){return Promise.all(t.map(function(t){return r.get(t,e)}))},r.onDataUpdate=function(t){window.addEventListener("message",function(e){if(s(e.origin)&&"string"==typeof e.data&&e.data.length>0)try{var n=JSON.parse(e.data);if(!n.hasOwnProperty("alias"))return;var r=n.alias,o=JSON.stringify({event:"ack",alias:r});e.source.postMessage(o,e.origin),t(r)}catch(t){var i="There was an error in domo.onDataUpdate! It may be that our event listener caught a message from another source and tried to parse it, so your update still may have worked. If you would like more info, here is the error: \n";console.warn(i,t)}})},r.navigate=function(t,e){var n=JSON.stringify({event:"navigate",url:t,isNewWindow:e});window.parent.postMessage(n,"*")},r.filterContainer=function(t,e,n,r){var o=window.navigator.userAgent.toLowerCase(),i=/safari/.test(o),s=/iphone|ipod|ipad/.test(o),u=JSON.stringify({event:"filter",filter:{columnName:t,operator:e,values:n,dataType:r}});s&&!i?window.webkit.messageHandlers.domofilter.postMessage({column:t,operand:e,values:n,dataType:r}):window.parent.postMessage(u,"*")},r.env=u(),r.__util={isVerifiedOrigin:s,getQueryParams:u,setFormatHeaders:a,isSuccess:i}},function(t,e,n){(function(e,r){/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
!function(e,n){t.exports=n()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function o(t){return"function"==typeof t}function i(t){V=t}function s(t){X=t}function u(){return function(){return e.nextTick(p)}}function a(){return function(){Q(p)}}function c(){var t=0,e=new Z(p),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function f(){var t=new MessageChannel;return t.port1.onmessage=p,function(){return t.port2.postMessage(0)}}function l(){var t=setTimeout;return function(){return t(p,1)}}function p(){for(var t=0;t<K;t+=2){var e=nt[t],n=nt[t+1];e(n),nt[t]=void 0,nt[t+1]=void 0}K=0}function h(){try{var t=n(3);return Q=t.runOnLoop||t.runOnContext,a()}catch(t){return l()}}function d(t,e){var n=arguments,r=this,o=new this.constructor(y);void 0===o[ot]&&H(o);var i=r._state;return i?!function(){var t=n[i-1];X(function(){return N(i,o,t,r._result)})}():O(r,o,t,e),o}function v(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(y);return E(n,t),n}function y(){}function m(){return new TypeError("You cannot resolve a promise with itself")}function w(){return new TypeError("A promises callback cannot return that same promise.")}function g(t){try{return t.then}catch(t){return at.error=t,at}}function _(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}function b(t,e,n){X(function(t){var r=!1,o=_(n,e,function(n){r||(r=!0,e!==n?E(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function T(t,e){e._state===st?S(t,e._result):e._state===ut?j(t,e._result):O(e,void 0,function(e){return E(t,e)},function(e){return j(t,e)})}function A(t,e,n){e.constructor===t.constructor&&n===d&&e.constructor.resolve===v?T(t,e):n===at?j(t,at.error):void 0===n?S(t,e):o(n)?b(t,e,n):S(t,e)}function E(e,n){e===n?j(e,m()):t(n)?A(e,n,g(n)):S(e,n)}function x(t){t._onerror&&t._onerror(t._result),M(t)}function S(t,e){t._state===it&&(t._result=e,t._state=st,0!==t._subscribers.length&&X(M,t))}function j(t,e){t._state===it&&(t._state=ut,t._result=e,X(x,t))}function O(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+st]=n,o[i+ut]=r,0===i&&t._state&&X(M,t)}function M(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?N(n,r,o,i):o(i);t._subscribers.length=0}}function P(){this.error=null}function C(t,e){try{return t(e)}catch(t){return ct.error=t,ct}}function N(t,e,n,r){var i=o(n),s=void 0,u=void 0,a=void 0,c=void 0;if(i){if(s=C(n,r),s===ct?(c=!0,u=s.error,s=null):a=!0,e===s)return void j(e,w())}else s=r,a=!0;e._state!==it||(i&&a?E(e,s):c?j(e,u):t===st?S(e,s):t===ut&&j(e,s))}function k(t,e){try{e(function(e){E(t,e)},function(e){j(t,e)})}catch(e){j(t,e)}}function L(){return ft++}function H(t){t[ot]=ft++,t._state=void 0,t._result=void 0,t._subscribers=[]}function J(t,e){this._instanceConstructor=t,this.promise=new t(y),this.promise[ot]||H(this.promise),G(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,R())}function R(){return new Error("Array Methods must be provided an Array")}function U(t){return new J(this,t).promise}function q(t){var e=this;return new e(G(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function D(t){var e=this,n=new e(y);return j(n,t),n}function I(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function F(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function Y(t){this[ot]=L(),this._result=this._state=void 0,this._subscribers=[],y!==t&&("function"!=typeof t&&I(),this instanceof Y?k(this,t):F())}function W(){var t=void 0;if("undefined"!=typeof r)t=r;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=Y}var B=void 0;B=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var G=B,K=0,Q=void 0,V=void 0,X=function(t,e){nt[K]=t,nt[K+1]=e,K+=2,2===K&&(V?V(p):rt())},$="undefined"!=typeof window?window:void 0,z=$||{},Z=z.MutationObserver||z.WebKitMutationObserver,tt="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),et="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,nt=new Array(1e3),rt=void 0;rt=tt?u():Z?c():et?f():void 0===$?h():l();var ot=Math.random().toString(36).substring(16),it=void 0,st=1,ut=2,at=new P,ct=new P,ft=0;return J.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===it&&n<t;n++)this._eachEntry(e[n],n)},J.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===v){var o=g(t);if(o===d&&t._state!==it)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===Y){var i=new n(y);A(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},J.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===it&&(this._remaining--,t===ut?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},J.prototype._willSettleAt=function(t,e){var n=this;O(t,void 0,function(t){return n._settledAt(st,e,t)},function(t){return n._settledAt(ut,e,t)})},Y.all=U,Y.race=q,Y.resolve=v,Y.reject=D,Y._setScheduler=i,Y._setAsap=s,Y._asap=X,Y.prototype={constructor:Y,then:d,catch:function(t){return this.then(null,t)}},W(),Y.polyfill=W,Y.Promise=Y,Y})}).call(e,n(2),function(){return this}())},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(f===setTimeout)return setTimeout(t,0);if((f===n||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function i(t){if(l===clearTimeout)return clearTimeout(t);if((l===r||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch(e){try{return l.call(null,t)}catch(e){return l.call(this,t)}}}function s(){v&&h&&(v=!1,h.length?d=h.concat(d):y=-1,d.length&&u())}function u(){if(!v){var t=o(s);v=!0;for(var e=d.length;e;){for(h=d,d=[];++y<e;)h&&h[y].run();y=-1,e=d.length}h=null,v=!1,i(t)}}function a(t,e){this.fun=t,this.array=e}function c(){}var f,l,p=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:n}catch(t){f=n}try{l="function"==typeof clearTimeout?clearTimeout:r}catch(t){l=r}}();var h,d=[],v=!1,y=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new a(t,e)),1!==d.length||v||o(u)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(t){return[]},p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(t,e){}])});
//# sourceMappingURL=domo.js.map