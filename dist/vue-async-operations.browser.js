!function(root,factory){"object"==typeof exports&&"object"==typeof module?module.exports=factory():"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports?exports.VueAsyncOperations=factory():root.VueAsyncOperations=factory()}(this,function(){return function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=3)}([function(module,__webpack_exports__,__webpack_require__){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i.return&&_i.return()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},resolvePath=function(path,target){return path.split(".").reduce(function(prev,curr){return prev?prev[curr]:null},target)};__webpack_exports__.a={cfg:null,init:function(options){this.cfg=_extends({},options,{dataPropName:options.mixinPrefix+options.dataPropName})},onCreated:function(vm){vm.$options[this.cfg.componentOptionName]&&this.buildTree(vm,vm.$options[this.cfg.componentOptionName],this.cfg.dataPropName)},buildTree:function(vm,nodes,target){var _this=this;Object.entries(nodes).forEach(function(_ref){var _ref2=_slicedToArray(_ref,2),key=_ref2[0],value=_ref2[1];_this.addNode(vm,target,key,value)})},addNode:function(vm,target,key,value){["string","function"].includes(void 0===value?"undefined":_typeof(value))&&this.addOperation(vm,target,key),"object"===(void 0===value?"undefined":_typeof(value))&&this.addBatch(vm,target,key,value)},addBatch:function(vm,path,key,obj){var batch=this.createNode(vm,"batch",path,key),target=resolvePath(path,vm.$data);vm.$set(target,key,batch);var childrenPath=path+"."+key;this.buildTree(vm,obj,childrenPath)},addOperation:function(vm,path,key){var single=this.createNode(vm,"single",path,key),target=resolvePath(path,vm.$data);vm.$set(target,key,single)},createNode:function(vm,type,path,key){var _this2=this;return{$type:type,$pending:null,$resolved:null,$rejected:null,$err:null,$perform:function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];var relPath=path.split(".").filter(function(el){return el!==_this2.cfg.dataPropName}).join("."),nodePath=(""===relPath?"":relPath+".")+key;if(resolvePath(nodePath,vm.$data[_this2.cfg.dataPropName]).$pending)return Promise.resolve({pending:!0});switch(type){case"batch":return _this2.execBatch(vm,nodePath,args);case"single":return _this2.execOperation(vm,nodePath,args)}}}},execBatch:function(vm,batchPath,args){var _this3=this,state=resolvePath(batchPath,vm.$data[this.cfg.dataPropName]),batch=resolvePath(batchPath,vm.$options[this.cfg.componentOptionName]);return this.resetStates(vm,state),new Promise(function(resolve,reject){var arr=Object.entries(batch).map(function(_ref3){var _ref4=_slicedToArray(_ref3,2),key=_ref4[0],childPath=(_ref4[1],batchPath+"."+key),child=resolvePath(childPath,vm.$data[_this3.cfg.dataPropName]),allArgs=[].concat(_toConsumableArray(args))[0],operationArgs=allArgs?allArgs[key]:void 0;return child.$perform(operationArgs)});Promise.all(arr).then(function(result){return _this3.handleResolve(vm,state,result,resolve)},function(err){return _this3.handleReject(vm,state,err,reject)})})},execOperation:function(vm,funcPath,args){var _this4=this,state=resolvePath(funcPath,vm.$data[this.cfg.dataPropName]),func=resolvePath(funcPath,vm.$options[this.cfg.componentOptionName]);return this.resetStates(vm,state),new Promise(function(resolve,reject){var result=void 0;return"string"==typeof func&&(result=vm[func].apply(vm,_toConsumableArray(args))),"function"==typeof func&&(result=func.call.apply(func,[vm].concat(_toConsumableArray(args)))),Array.isArray(result)?Promise.all(result).then(function(res){return _this4.handleResolve(vm,state,res,resolve)},function(err){return _this4.handleReject(vm,state,err,reject)}):result.then?void result.then(function(res){return _this4.handleResolve(vm,state,res,resolve)},function(err){return _this4.handleReject(vm,state,err,reject)}):_this4.handleResolve(vm,state,result,resolve)})},resetStates:function(vm,state){vm.$set(state,"$err",null),vm.$set(state,"$rejected",!1),vm.$set(state,"$resolved",!1),vm.$set(state,"$pending",!0)},handleResolve:function(vm,state,result,resolve){resolve(result),vm.$set(state,"$pending",!1),vm.$set(state,"$resolved",!0)},handleReject:function(vm,state,err,reject){reject(err),vm.$set(state,"$pending",!1),vm.$set(state,"$rejected",!0),vm.$set(state,"$err",err)}}},function(module,__webpack_exports__,__webpack_require__){"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var __WEBPACK_IMPORTED_MODULE_0__async_operations_js__=__webpack_require__(0);__webpack_exports__.a={data:function(){return _defineProperty({},__WEBPACK_IMPORTED_MODULE_0__async_operations_js__.a.cfg.dataPropName,{})},computed:{$async:function(){return this[__WEBPACK_IMPORTED_MODULE_0__async_operations_js__.a.cfg.dataPropName]}},created:function(){__WEBPACK_IMPORTED_MODULE_0__async_operations_js__.a.onCreated(this)}}},function(module,exports){var g,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};g=function(){return this}();try{g=g||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":_typeof(window))&&(g=window)}module.exports=g},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),function(global){function install(Vue){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},mergedOptions=_extends({},defaultOptions,options);__WEBPACK_IMPORTED_MODULE_0__async_operations_js__.a.init(mergedOptions),Vue.mixin(__WEBPACK_IMPORTED_MODULE_1__mix_js__.a)}__webpack_exports__.install=install;var __WEBPACK_IMPORTED_MODULE_0__async_operations_js__=__webpack_require__(0),__WEBPACK_IMPORTED_MODULE_1__mix_js__=__webpack_require__(1),_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},defaultOptions={mixinPrefix:"vueAsyncOps_",dataPropName:"async",computedPropName:"$async",componentOptionName:"asyncOperations"},plugin={version:"1.0.0",install:install};__webpack_exports__.default=plugin;var GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:void 0!==global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin)}.call(__webpack_exports__,__webpack_require__(2))}])});