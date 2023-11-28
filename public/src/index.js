/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={408:(e,t)=>{var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),s=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),p=Symbol.iterator,y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,h={};function v(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||y}function b(){}function E(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||y}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var C=E.prototype=new b;C.constructor=E,m(C,v.prototype),C.isPureReactComponent=!0;var _=Array.isArray,w=Object.prototype.hasOwnProperty,R={current:null},S={key:!0,ref:!0,__self:!0,__source:!0};function g(e,t,r){var o,a={},c=null,u=null;if(null!=t)for(o in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(c=""+t.key),t)w.call(t,o)&&!S.hasOwnProperty(o)&&(a[o]=t[o]);var i=arguments.length-2;if(1===i)a.children=r;else if(1<i){for(var l=Array(i),f=0;f<i;f++)l[f]=arguments[f+2];a.children=l}if(e&&e.defaultProps)for(o in i=e.defaultProps)void 0===a[o]&&(a[o]=i[o]);return{$$typeof:n,type:e,key:c,ref:u,props:a,_owner:R.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var $=/\/+/g;function x(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function D(e,t,o,a,c){var u=typeof e;"undefined"!==u&&"boolean"!==u||(e=null);var i=!1;if(null===e)i=!0;else switch(u){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case n:case r:i=!0}}if(i)return c=c(i=e),e=""===a?"."+x(i,0):a,_(c)?(o="",null!=e&&(o=e.replace($,"$&/")+"/"),D(c,t,o,"",(function(e){return e}))):null!=c&&(k(c)&&(c=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,o+(!c.key||i&&i.key===c.key?"":(""+c.key).replace($,"$&/")+"/")+e)),t.push(c)),1;if(i=0,a=""===a?".":a+":",_(e))for(var l=0;l<e.length;l++){var f=a+x(u=e[l],l);i+=D(u,t,o,f,c)}else if(f=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof f)for(e=f.call(e),l=0;!(u=e.next()).done;)i+=D(u=u.value,t,o,f=a+x(u,l++),c);else if("object"===u)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function j(e,t,n){if(null==e)return e;var r=[],o=0;return D(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function N(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var I={current:null},O={transition:null},z={ReactCurrentDispatcher:I,ReactCurrentBatchConfig:O,ReactCurrentOwner:R};t.Children={map:j,forEach:function(e,t,n){j(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return j(e,(function(){t++})),t},toArray:function(e){return j(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=o,t.Profiler=c,t.PureComponent=E,t.StrictMode=a,t.Suspense=f,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),a=e.key,c=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,u=R.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(l in t)w.call(t,l)&&!S.hasOwnProperty(l)&&(o[l]=void 0===t[l]&&void 0!==i?i[l]:t[l])}var l=arguments.length-2;if(1===l)o.children=r;else if(1<l){i=Array(l);for(var f=0;f<l;f++)i[f]=arguments[f+2];o.children=i}return{$$typeof:n,type:e.type,key:a,ref:c,props:o,_owner:u}},t.createContext=function(e){return(e={$$typeof:i,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:u,_context:e},e.Consumer=e},t.createElement=g,t.createFactory=function(e){var t=g.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:N}},t.memo=function(e,t){return{$$typeof:s,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=O.transition;O.transition={};try{e()}finally{O.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return I.current.useCallback(e,t)},t.useContext=function(e){return I.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return I.current.useDeferredValue(e)},t.useEffect=function(e,t){return I.current.useEffect(e,t)},t.useId=function(){return I.current.useId()},t.useImperativeHandle=function(e,t,n){return I.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return I.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return I.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return I.current.useMemo(e,t)},t.useReducer=function(e,t,n){return I.current.useReducer(e,t,n)},t.useRef=function(e){return I.current.useRef(e)},t.useState=function(e){return I.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return I.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return I.current.useTransition()},t.version="18.2.0"},294:(e,t,n)=>{e.exports=n(408)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}(()=>{function e(){return React.createElement("div",{className:"mb-3"},React.createElement("label",{htmlFor:"formFile",className:"form-label"},"Файл с событиями ami"),React.createElement("input",{className:"form-control form-control-sm",type:"file",id:"formFile"}))}var t,r,o,a,c,u,i,l=n(294),f=-1,s=-1;function d(e){if(e.CreateChannel)for(let t of e.CreateChannel)p(f+=1,t,null,null,null),r.stabilize();if(e.CreateBridge)for(let t of e.CreateBridge)p(f+=1,t,"box","rgb(190, 219, 218)",100),r.stabilize();if(e.ConnectChannel)for(let t of e.ConnectChannel)m(s+=1,t[0],t[1]),r.stabilize();e.DisconnectChannel&&e.DisconnectChannel.forEach((e=>{h(e[0],e[1]),r.stabilize()})),e.DeleteChannel&&e.DeleteChannel.forEach((e=>{y(e),r.stabilize()}))}function p(e,t,n,r,a){try{o.add({id:e,label:t,shape:n,color:r,widthConstraint:{maximum:a}})}catch(e){alert(e)}}function y(e){try{let t=o.get({filter:function(t){return t.label==e}})[0].id;o.remove({id:t})}catch(e){alert(e)}}function m(e,t,n){try{let r=o.get({filter:function(e){return e.label==t}})[0].id,c=o.get({filter:function(e){return e.label==n}})[0].id;a.add({id:e,from:r,to:c})}catch(e){alert(e)}}function h(e,t){try{let n=o.get({filter:function(t){return t.label==e}})[0].id,r=o.get({filter:function(e){return e.label==t}})[0].id,c=a.get({filter:function(e){return e.from==n&&e.to==r||e.from==r&&e.to==n}})[0].id;a.remove({id:c})}catch(e){alert(e)}}function v(e,t){e<t?c.slice(e,t).forEach((e=>d(e))):c.slice(t+1,e+1).reverse().forEach((e=>function(e){if(e.DeleteChannel)for(let t of e.DeleteChannel)p(f+=1,t),r.stabilize();if(e.DisconnectChannel){for(let t of e.DisconnectChannel)m(s+=1,t[0],t[1]);r.stabilize()}e.ConnectChannel&&(e.ConnectChannel.forEach((e=>{h(e[0],e[1])})),r.stabilize()),e.CreateChannel&&(e.CreateChannel.forEach((e=>{y(e)})),r.stabilize()),e.CreateBridge&&(e.CreateBridge.forEach((e=>{y(e)})),r.stabilize())}(e)))}class b extends l.Component{shouldComponentUpdate(e){return!1}render(){return console.log("render network"),l.createElement("div",{id:"mynetwork",style:{width:"100%",height:"600px"}})}}var E,C=-1,_=0;function w(e,t){C+=1;try{i.add({id:C,content:e.Type+t,start:e.DateTime})}catch(e){alert(e)}}function R(e){let t=e.items[0];_!=t&&(v(_+1,t+1),_=t)}function S(){return React.createElement("div",{id:"visualization"})}async function g(){let e=await async function(){let e=new FormData;e.append("file",function(){if(0==document.getElementById("formFile").files.length)throw alert("file not selected"),new Error("file not selected");return document.getElementById("formFile").files[0]}());let t=await fetch("/api/v1/draw",{method:"POST",body:e});return await t.json()}();(async function(e){!function(e,n){f=-1,s=-1,c=n,t=document.getElementById("mynetwork"),o=new vis.DataSet,a=new vis.DataSet;var u={nodes:o,edges:a};r=new vis.Network(t,u,{layout:{randomSeed:"0.34211988829117357:1700836848993",improvedLayout:!0}}),d(c[0])}(0,e)})(e),async function(e){!function(e,t){E=t,C=-1,_=0,u&&u.destroy();var n=document.getElementById(e);i=new vis.DataSet;for(let e=0;e<E.length;e++)w(E[e],e);(u=new vis.Timeline(n,i,{order:(e,t)=>e.id-t.id})).setSelection(_,{focus:!1}),u.on("select",R),document.addEventListener("keydown",(function(e){"ArrowLeft"==e.code&&0!=_&&(_--,u.setSelection(_,{focus:!1}),v(_+1,_)),"ArrowRight"==e.code&&_!=C&&(_++,u.setSelection(_,{focus:!1}),v(_,_+1))}))}("visualization",e)}(e)}function k(){return React.createElement("div",{className:"container-fluid"},React.createElement("div",{className:"row vh-100"},React.createElement("div",{className:"col-2"},React.createElement(e,null),React.createElement("button",{type:"button",className:"btn btn-primary",onClick:g},"Отобразить схему")),React.createElement("div",{className:"col-10"},React.createElement("div",{className:"row  flex-grow-1"},React.createElement("div",{className:"col-12"},React.createElement(b,null))),React.createElement("div",{className:"row",style:{height:"100px"}},React.createElement(S,null)))))}ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(React.StrictMode,null,React.createElement(k,null)))})()})();
//# sourceMappingURL=index.js.map