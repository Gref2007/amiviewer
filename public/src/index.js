/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={408:(e,t)=>{var n=Symbol.for("react.element"),r=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),i=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),p=Symbol.iterator,y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,h={};function v(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||y}function b(){}function C(e,t,n){this.props=e,this.context=t,this.refs=h,this.updater=n||y}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var E=C.prototype=new b;E.constructor=C,m(E,v.prototype),E.isPureReactComponent=!0;var g=Array.isArray,w=Object.prototype.hasOwnProperty,_={current:null},R={key:!0,ref:!0,__self:!0,__source:!0};function S(e,t,r){var o,a={},c=null,l=null;if(null!=t)for(o in void 0!==t.ref&&(l=t.ref),void 0!==t.key&&(c=""+t.key),t)w.call(t,o)&&!R.hasOwnProperty(o)&&(a[o]=t[o]);var i=arguments.length-2;if(1===i)a.children=r;else if(1<i){for(var u=Array(i),s=0;s<i;s++)u[s]=arguments[s+2];a.children=u}if(e&&e.defaultProps)for(o in i=e.defaultProps)void 0===a[o]&&(a[o]=i[o]);return{$$typeof:n,type:e,key:c,ref:l,props:a,_owner:_.current}}function x(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var k=/\/+/g;function $(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function D(e,t,o,a,c){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var i=!1;if(null===e)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case n:case r:i=!0}}if(i)return c=c(i=e),e=""===a?"."+$(i,0):a,g(c)?(o="",null!=e&&(o=e.replace(k,"$&/")+"/"),D(c,t,o,"",(function(e){return e}))):null!=c&&(x(c)&&(c=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(c,o+(!c.key||i&&i.key===c.key?"":(""+c.key).replace(k,"$&/")+"/")+e)),t.push(c)),1;if(i=0,a=""===a?".":a+":",g(e))for(var u=0;u<e.length;u++){var s=a+$(l=e[u],u);i+=D(l,t,o,s,c)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),u=0;!(l=e.next()).done;)i+=D(l=l.value,t,o,s=a+$(l,u++),c);else if("object"===l)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function N(e,t,n){if(null==e)return e;var r=[],o=0;return D(e,r,"","",(function(e){return t.call(n,e,o++)})),r}function j(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var O={current:null},P={transition:null},I={ReactCurrentDispatcher:O,ReactCurrentBatchConfig:P,ReactCurrentOwner:_};t.Children={map:N,forEach:function(e,t,n){N(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return N(e,(function(){t++})),t},toArray:function(e){return N(e,(function(e){return e}))||[]},only:function(e){if(!x(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=o,t.Profiler=c,t.PureComponent=C,t.StrictMode=a,t.Suspense=s,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I,t.cloneElement=function(e,t,r){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),a=e.key,c=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(c=t.ref,l=_.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(u in t)w.call(t,u)&&!R.hasOwnProperty(u)&&(o[u]=void 0===t[u]&&void 0!==i?i[u]:t[u])}var u=arguments.length-2;if(1===u)o.children=r;else if(1<u){i=Array(u);for(var s=0;s<u;s++)i[s]=arguments[s+2];o.children=i}return{$$typeof:n,type:e.type,key:a,ref:c,props:o,_owner:l}},t.createContext=function(e){return(e={$$typeof:i,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:l,_context:e},e.Consumer=e},t.createElement=S,t.createFactory=function(e){var t=S.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=x,t.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:j}},t.memo=function(e,t){return{$$typeof:f,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=P.transition;P.transition={};try{e()}finally{P.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return O.current.useCallback(e,t)},t.useContext=function(e){return O.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return O.current.useDeferredValue(e)},t.useEffect=function(e,t){return O.current.useEffect(e,t)},t.useId=function(){return O.current.useId()},t.useImperativeHandle=function(e,t,n){return O.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return O.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return O.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return O.current.useMemo(e,t)},t.useReducer=function(e,t,n){return O.current.useReducer(e,t,n)},t.useRef=function(e){return O.current.useRef(e)},t.useState=function(e){return O.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return O.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return O.current.useTransition()},t.version="18.2.0"},294:(e,t,n)=>{e.exports=n(408)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}(()=>{function e(){return React.createElement("div",{className:"mb-3"},React.createElement("label",{htmlFor:"formFile",className:"form-label"},"Файл с событиями ami"),React.createElement("input",{className:"form-control form-control-sm",type:"file",id:"formFile"}))}var t,r,o,a,c,l=n(294),i=-1,u=-1;function s(e){if(e.CreateChannel)for(let t of e.CreateChannel)f(r,i+=1,t,"box",null,100);if(e.CreateBridge)for(let t of e.CreateBridge)f(r,i+=1,t,"box","rgb(190, 219, 218)",100);if(e.ConnectChannel)for(let t of e.ConnectChannel)p(r,o,u+=1,t[0],t[1]);e.DisconnectChannel&&e.DisconnectChannel.forEach((e=>{y(o,e[0],e[1])})),e.DeleteChannel&&e.DeleteChannel.forEach((e=>{d(r,e)}))}function f(e,t,n,r,o,a){try{let l=c?c.nodes.get(n):null;return e.add({id:t,label:n,shape:r,color:o,widthConstraint:{maximum:a},x:l?.x,y:l?.y})[0]}catch(e){alert(e)}}function d(e,t){try{let n=e.get({filter:function(e){return e.label==t}})[0].id;e.remove({id:n})}catch(e){alert(e)}}function p(e,t,n,r,o){try{let a=e.get({filter:function(e){return e.label==r}})[0].id,c=e.get({filter:function(e){return e.label==o}})[0].id;return t.add({id:n,from:a,to:c})[0]}catch(e){alert(e)}}function y(e,t,n){try{let o=r.get({filter:function(e){return e.label==t}})[0].id,a=r.get({filter:function(e){return e.label==n}})[0].id,c=e.get({filter:function(e){return e.from==o&&e.to==a||e.from==a&&e.to==o}})[0].id;e.remove({id:c})}catch(e){alert(e)}}function m(e,t){e<t?a.slice(e,t).forEach((e=>s(e))):a.slice(t+1,e+1).reverse().forEach((e=>function(e){if(e.DeleteChannel)for(let t of e.DeleteChannel)f(r,i+=1,t,"box");if(e.DisconnectChannel)for(let t of e.DisconnectChannel)p(r,o,u+=1,t[0],t[1]);e.ConnectChannel&&e.ConnectChannel.forEach((e=>{y(o,e[0],e[1])})),e.CreateChannel&&e.CreateChannel.forEach((e=>{d(r,e)})),e.CreateBridge&&e.CreateBridge.forEach((e=>{d(r,e)}))}(e)))}class h extends l.Component{shouldComponentUpdate(e){return!1}render(){return console.log("render network"),l.createElement(l.Fragment,null,l.createElement("div",{id:"mynetwork",style:{width:"100%",height:"600px"}}),l.createElement("div",{id:"config"}))}}var v,b,C,E=-1,g=0;function w(e){"ArrowLeft"==e.code&&0!=g&&(g--,v.setSelection(g,{focus:!1}),m(g+1,g)),"ArrowRight"==e.code&&g!=E&&(g++,v.setSelection(g,{focus:!1}),m(g,g+1))}function _(e,t){E+=1;try{b.add({id:E,content:e.Type+t,start:e.DateTime})}catch(e){alert(e)}}function R(e){let t=e.items[0];g!=t&&(m(g+1,t+1),g=t)}function S(){return React.createElement("div",{id:"visualization",style:{}})}async function x(){let e=await async function(){let e=new FormData;e.append("file",function(){if(0==document.getElementById("formFile").files.length)throw alert("file not selected"),new Error("file not selected");return document.getElementById("formFile").files[0]}());let t=await fetch("/api/v1/draw",{method:"POST",body:e});return await t.json()}();!async function(e){var n;n="mynetwork",i=-1,u=-1,a=e,function(e,n){var a={height:"100%",width:"100%",layout:{improvedLayout:!0},edges:{smooth:{enabled:!1}},physics:{enabled:!0,solver:"hierarchicalRepulsion",hierarchicalRepulsion:{springConstant:.1,avoidOverlap:.2}}},l={nodes:new vis.DataSet,edges:new vis.DataSet};c={nodes:new Map};for(let e of n){if(e.CreateChannel)for(let t of e.CreateChannel){let e=f(l.nodes,i+=1,t,"box",null,100);c.nodes.set(t,{id:e})}if(e.CreateBridge)for(let t of e.CreateBridge){let e=f(l.nodes,i+=1,t,"box","rgb(190, 219, 218)",100);c.nodes.set(t,{id:e})}if(e.ConnectChannel)for(let t of e.ConnectChannel)p(l.nodes,l.edges,u+=1,t[0],t[1])}(t=new vis.Network(e,l,a)).on("stabilized",(function(){!function(e,n,a,l){for(let e of c.nodes){let t=l.getPosition(e[1].id);e[1].x=t.x,e[1].y=t.y}let i=l.getScale(),u=l.getViewPosition();l.destroy(),r=new vis.DataSet,o=new vis.DataSet;var f={nodes:r,edges:o};a.physics={enabled:!1},(t=new vis.Network(e,f,a)).moveTo({position:{x:u.x,y:u.y},scale:i}),s(n[0]),t.on("dragEnd",(function(e){for(let n of e.nodes){let e=t.getPosition(n),o=r.get(n).label,a=c.nodes.get(o);a.x=e.x,a.y=e.y}}))}(e,n,a,t)})),t.startSimulation(),t.stabilize(),t.fit()}(document.getElementById(n),a)}(e),async function(e){!function(e,t){C=t,E=-1,g=0,v&&(v.destroy(),document.removeEventListener("keydown",w));var n=document.getElementById("visualization");b=new vis.DataSet;for(let e=0;e<C.length;e++)_(C[e],e);(v=new vis.Timeline(n,b,{order:(e,t)=>e.id-t.id})).setSelection(g,{focus:!1}),v.on("select",R),document.addEventListener("keydown",w)}(0,e)}(e)}function k(){return React.createElement("div",{className:"container-fluid"},React.createElement("div",{className:"row vh-100"},React.createElement("div",{className:"col-2"},React.createElement(e,null),React.createElement("button",{type:"button",className:"btn btn-primary",onClick:x},"Отобразить схему")),React.createElement("div",{className:"col-10"},React.createElement("div",{className:"row  flex-grow-1"},React.createElement("div",{className:"col-12"},React.createElement(h,null))),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-12"},React.createElement(S,null))))))}ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(React.StrictMode,null,React.createElement(k,null)))})()})();
//# sourceMappingURL=index.js.map