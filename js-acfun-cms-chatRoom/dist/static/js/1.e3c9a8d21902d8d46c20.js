webpackJsonp([1],{289:function(t,e,a){"use strict";function s(t){a(356)}Object.defineProperty(e,"__esModule",{value:!0});var n=a(317),i=a(374),o=a(9),r=s,l=o(n.a,i.a,r,"data-v-fc82a4ac",null);e.default=l.exports},300:function(t,e,a){"use strict";function s(t){return a.i(k.a)({url:"room/list",method:"get",params:t})}function n(t){return a.i(k.a)({url:"room/"+t,method:"get"})}function i(t){return a.i(k.a)({url:"room/create",method:"post",data:t})}function o(t){return a.i(k.a)({url:"room/update",method:"post",data:t})}function r(t){return a.i(k.a)({url:"room/openOrClose",method:"post",data:t})}function l(){return a.i(k.a)({url:"room/getNeedGrade",method:"get"})}function c(t){return a.i(k.a)({url:"room/setNeedGrade/"+t,method:"post"})}function u(t){return a.i(k.a)({url:"room/selectList",method:"get",params:t})}function m(t){return a.i(k.a)({url:"room/publishHall",method:"post",data:t})}function d(t){return a.i(k.a)({url:"room/publish",method:"post",data:{params:t,headersMethod:"json"}})}function p(t){return a.i(k.a)({url:"room/dePublish/"+t,method:"post"})}function f(t){return a.i(k.a)({url:"room/getHotPages",method:"get",params:t})}function h(t){return a.i(k.a)({url:"room/publishHot",method:"post",data:{params:t,headersMethod:"json"}})}function g(t){return a.i(k.a)({url:"room/dePublishHot/"+t,method:"post"})}function v(t){return a.i(k.a)({url:"accuse/page",method:"get",params:t})}function b(t,e){return a.i(k.a)({url:"accuse/update/"+t,method:"post",params:e})}function _(t){return a.i(k.a)({url:"punish/page",method:"get",params:t})}function x(t){return a.i(k.a)({url:"punish/delete/"+t,method:"post"})}function C(t){return a.i(k.a)({url:"notice/list",method:"get",params:t})}function y(t){return a.i(k.a)({url:"notice/create",method:"post",data:t})}function A(t){return a.i(k.a)({url:"notice/update",method:"post",data:t})}function T(t){return a.i(k.a)({url:"notice/"+t,method:"get"})}function S(t){return a.i(k.a)({url:"notice/delete/"+t,method:"post"})}e.d=s,e.r=n,e.s=i,e.t=o,e.u=r,e.k=l,e.l=c,e.f=u,e.e=m,e.m=d,e.n=p,e.o=f,e.p=h,e.q=g,e.a=v,e.b=b,e.i=_,e.j=x,e.g=C,e.v=y,e.w=A,e.c=T,e.h=S;var k=a(105)},301:function(t,e,a){"use strict";function s(t,e){if(0===arguments.length)return null;var a=e||"{y}-{m}-{d} {h}:{i}:{s}",s=void 0;"object"===(void 0===t?"undefined":l()(t))?s=t:(10===(""+t).length&&(t=1e3*parseInt(t)),s=new Date(t));var n={y:s.getFullYear(),m:s.getMonth()+1,d:s.getDate(),h:s.getHours(),i:s.getMinutes(),s:s.getSeconds(),a:s.getDay()};return a.replace(/{(y|m|d|h|i|s|a)+}/g,function(t,e){var a=n[e];return"a"===e?["一","二","三","四","五","六","日"][a-1]:(t.length>0&&a<10&&(a="0"+a),a||0)})}function n(t){return Date.parse(new Date(t))}function i(t){var e=[];for(var a in t)e.push({name:t[a],value:a});return e}function o(t,e){if(t=t.replace(/^\s*|\s*$/g,""),0!=t.length){var a=t.match(/[A-Za-z0-9\-]/g),s=t.match(/[\u4e00-\u9fa5]/g),n=(t.length,a?a.length:0),i=s?s.length:0;return n+2*i<=e}}e.b=s,e.c=n,e.a=i,e.d=o;var r=a(106),l=a.n(r)},303:function(t,e,a){"use strict";e.a={props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"}},data:function(){return{shFlag:this.isShow}},methods:{pclose:function(t){this.shFlag=!1},cancelFun:function(t){this.$emit("click-cancel",t)},sureFun:function(t){this.$emit("click-sure",t)}},watch:{isShow:function(t){this.shFlag=t},shFlag:function(t){this.$emit("get-prompt-status",t)}}}},305:function(t,e,a){e=t.exports=a(282)(!0),e.push([t.i,".el-message-box__wrapper[data-v-5d494dd4]{z-index:2015}","",{version:3,sources:["/Users/User/Documents/H5Code/js-acfun-cms-chatRoom/src/components/page/msg-prompt.vue"],names:[],mappings:"AACA,0CACE,YAAc,CACf",file:"msg-prompt.vue",sourcesContent:["\n.el-message-box__wrapper[data-v-5d494dd4] {\n  z-index: 2015;\n}\n"],sourceRoot:""}])},307:function(t,e,a){var s=a(305);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(283)("68300af5",s,!0)},309:function(t,e,a){"use strict";function s(t){a(307)}var n=a(303),i=a(311),o=a(9),r=s,l=o(n.a,i.a,r,"data-v-5d494dd4",null);e.a=l.exports},311:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.shFlag?a("div",[a("div",{staticClass:"el-message-box__wrapper",staticStyle:{"z-index":"2086"},attrs:{tabindex:"-1"},on:{click:function(e){if(e.target!==e.currentTarget)return null;t.pclose(e)}}},[a("div",{staticClass:"el-message-box"},[a("div",{staticClass:"el-message-box__header"},[a("div",{staticClass:"el-message-box__title"},[t._v(t._s(t.title))]),t._v(" "),a("button",{staticClass:"el-message-box__headerbtn",attrs:{type:"button","aria-label":"Close"},on:{click:t.pclose}},[a("i",{staticClass:"el-message-box__close el-icon-close"})])]),t._v(" "),a("div",{staticClass:"el-message-box__content"},[t._t("default")],2),t._v(" "),a("div",{staticClass:"el-message-box__btns"},[a("button",{staticClass:"el-button el-button--default",attrs:{type:"button"},on:{click:t.cancelFun}},[a("span",[t._v("取消")])]),t._v(" "),a("button",{staticClass:"el-button el-button--default el-button--primary",attrs:{type:"button"},on:{click:t.sureFun}},[a("span",[t._v("确定")])])])])]),t._v(" "),a("div",{staticClass:"v-modal",staticStyle:{"z-index":"2000"},on:{click:t.pclose}})]):t._e()},n=[],i={render:s,staticRenderFns:n};e.a=i},317:function(t,e,a){"use strict";var s=a(107),n=a.n(s),i=a(300),o=a(301),r=a(309);e.a={data:function(){return{isShow:!1,pTitle:"添加聊天室",form:{id:"",name:"",state:"",selectStartTimeF:"",selectEndTimeF:""},addData:{name:"",txType:2},stateData:{"":"全部",0:"关闭",1:"开启",2:"发布"},txTypeData:{1:"普通聊天室",2:"直播聊天室"},stateDataArr:[],txTypeDataArr:[],timeSelect:{},list:[],page:{num:1,size:20,total:null,pageSizes:[20,30,50,100]},flag:"add",checkedFalse:!1,aaa:""}},mounted:function(){this.stateDataArr=a.i(o.a)(this.stateData),this.getList(this.page.num,this.page.size)},methods:{getList:function(t,e){var s=void 0,r={},l={},c=this;l={num:t,size:e},this.form.selectStartTime=this.form.selectStartTimeF&&a.i(o.c)(this.form.selectStartTimeF),this.form.selectEndTime=this.form.selectEndTimeF&&a.i(o.c)(this.form.selectEndTimeF),r=n()({},this.form,l),a.i(i.d)(r).then(function(t){if(200===t.code){c.page.total=t.data.totalCount,c.list=t.data.list;for(s in c.list)c.list[s].state=c.stateData[c.list[s].state],c.list[s].txType=c.txTypeData[c.list[s].txType],c.list[s].updateTime=a.i(o.b)(c.list[s].updateTime)}})},pageSizeChange:function(t){console.log("每页 "+t+" 条"),this.getList(this.page.num,t)},pageNumChange:function(t){console.log("当前页: "+t),this.getList(t,this.page.size)},onSearch:function(){this.getList(this.page.num,this.page.size)},reset:function(){this.form={id:"",name:"",state:""},this.$set(this.form,"selectStartTimeF",""),this.$set(this.form,"selectEndTimeF",""),this.getList(this.page.num,this.page.size)},add:function(t,e){var s=this;this.isShow=!0,e?(this.flag="update",a.i(i.r)(e).then(function(t){200===t.code&&(s.addData=n()({},t.data))})):(this.flag="add",this.addData={name:"",txType:2})},getPromptStatus:function(t){this.isShow=t},cancelFun:function(t){this.isShow=!1},sureFun:function(t){var e=this;if(!a.i(o.d)(this.addData.name,12))return this.checkedFalse=!0,!1;if("add"===this.flag)a.i(i.s)(this.addData).then(function(t){200===t.code&&(e.$message({message:t.message,type:"success",duration:3e3}),e.isShow=!1,e.getList(e.page.num,e.page.size))});else if("update"===this.flag){var s={id:this.addData.id,name:this.addData.name,txType:this.addData.txType};a.i(i.t)(s).then(function(t){200===t.code&&(e.$message({message:t.message,type:"success",duration:3e3}),e.isShow=!1,e.getList(e.page.num,e.page.size))})}},deleteBtn:function(t,e){var s=this,n=void 0;n=1===e?"开启":"关闭",this.$confirm("确定要"+n+"吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.i(i.u)({id:t,state:e}).then(function(t){200===t.code&&(s.$message({type:"success",message:n+"成功!"}),s.getList(s.page.num,s.page.size))})}).catch(function(){s.$message({type:"info",message:"已取消删除"})})},open:function(){var t=this,e=this.$createElement;this.$msgbox({title:"提示",message:e("p",null,[e("span",{style:"color: red"},"无法关闭！"),e("span",'该聊天室可能在"发布聊天室"、"大厅设置"、"热门聊天"中已发布，请先下线再尝试关闭！')]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(t,e,a){"confirm"===t?(e.confirmButtonLoading=!0,e.confirmButtonText="执行中...",setTimeout(function(){a(),setTimeout(function(){e.confirmButtonLoading=!1},300)},3e3)):a()}}).then(function(e){t.$message({type:"info",message:"action: "+e})})}},components:{"msg-prompt":r.a}}},343:function(t,e,a){e=t.exports=a(282)(!0),e.push([t.i,".add-chat[data-v-fc82a4ac]{margin-bottom:20px}.pagination[data-v-fc82a4ac]{width:100%;text-align:center;margin:20px 0}.beizhu[data-v-fc82a4ac]{font-size:12px;color:#324157;margin-top:10px}.error[data-v-fc82a4ac]{margin-top:10px}","",{version:3,sources:["/Users/User/Documents/H5Code/js-acfun-cms-chatRoom/src/views/page/chat.vue"],names:[],mappings:"AACA,2BACE,kBAAoB,CACrB,AACD,6BACE,WAAY,AACZ,kBAAmB,AACnB,aAAe,CAChB,AACD,yBACE,eAAgB,AAChB,cAAe,AACf,eAAiB,CAClB,AACD,wBACE,eAAiB,CAClB",file:"chat.vue",sourcesContent:["\n.add-chat[data-v-fc82a4ac] {\n  margin-bottom: 20px;\n}\n.pagination[data-v-fc82a4ac] {\n  width: 100%;\n  text-align: center;\n  margin: 20px 0;\n}\n.beizhu[data-v-fc82a4ac] {\n  font-size: 12px;\n  color: #324157;\n  margin-top: 10px;\n}\n.error[data-v-fc82a4ac] {\n  margin-top: 10px;\n}\n"],sourceRoot:""}])},356:function(t,e,a){var s=a(343);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a(283)("67aa3556",s,!0)},374:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-button",{staticClass:"add-chat",attrs:{type:"primary"},on:{click:t.add}},[t._v("新建聊天室")]),t._v(" "),a("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.form}},[a("el-form-item",{attrs:{label:"聊天室ID"}},[a("el-input",{model:{value:t.form.id,callback:function(e){t.form.id=e},expression:"form.id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"聊天室名称"}},[a("el-input",{model:{value:t.form.name,callback:function(e){t.form.name=e},expression:"form.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"全部"},model:{value:t.form.state,callback:function(e){t.form.state=e},expression:"form.state"}},t._l(t.stateDataArr,function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}))],1),t._v(" "),a("el-form-item",{staticClass:"createTime",attrs:{label:"创建时间","label-width":"80px"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","picker-options":t.timeSelect},model:{value:t.form.selectStartTimeF,callback:function(e){t.form.selectStartTimeF=e},expression:"form.selectStartTimeF"}}),t._v(" "),a("span",[t._v(" 至 ")]),t._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","picker-options":t.timeSelect},model:{value:t.form.selectEndTimeF,callback:function(e){t.form.selectEndTimeF=e},expression:"form.selectEndTimeF"}})],1),t._v(" "),a("el-form-item",{staticClass:"account-search"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSearch}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.reset}},[t._v("清除条件")])],1)],1),t._v(" "),a("el-table",{staticClass:"account-table",staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"聊天室ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"聊天室名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"txType",label:"聊天室类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"onlineNumber",label:"在线人数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updaterName",label:"操作人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"操作时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"state",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.add(a,e.row.id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.deleteBtn(e.row.id,0)}}},[t._v("关闭")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.deleteBtn(e.row.id,1)}}},[t._v("开启")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":t.page.num,"page-sizes":t.page.pageSizes,"page-size":t.page.size,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.pageSizeChange,"current-change":t.pageNumChange}})],1),t._v(" "),a("msg-prompt",{attrs:{isShow:t.isShow,title:t.pTitle},on:{"get-prompt-status":t.getPromptStatus,"click-cancel":t.cancelFun,"click-sure":t.sureFun}},[a("div",{staticClass:"el-message-box__status"}),t._v(" "),a("div",{staticClass:"el-message-box__message",staticStyle:{"margin-left":"0px"}},[a("p",[t._v("聊天室名称")])]),t._v(" "),a("div",{staticClass:"el-message-box__input"},[a("el-input",{attrs:{placeholder:"最多可输入12个字符"},model:{value:t.addData.name,callback:function(e){t.addData.name=e},expression:"addData.name"}}),t._v(" "),a("div",{staticClass:"el-message-box__errormsg",staticStyle:{visibility:"hidden"}})],1),t._v(" "),a("div",{staticClass:"el-message-box__message",staticStyle:{"margin-left":"0px"}},[a("p",[t._v("聊天室类型")])]),t._v(" "),a("div",{staticClass:"el-message-box__input"},[[a("el-radio-group",{model:{value:t.addData.txType,callback:function(e){t.addData.txType=e},expression:"addData.txType"}},[a("el-radio",{attrs:{label:2}},[t._v("直播聊天室")])],1)],t._v(" "),a("div",{staticClass:"beizhu"},[t._v("     注：普通聊天室：最大容纳10000人，支持删除某人言论。 直播聊天室：无人数上限，但不能删除言论。")]),t._v(" "),t.checkedFalse?a("div",{staticClass:"el-message-box__errormsg error"},[t._v("\n        请输入合法的聊天室名称\n      ")]):t._e()],2)])],1)},n=[],i={render:s,staticRenderFns:n};e.a=i}});
//# sourceMappingURL=1.e3c9a8d21902d8d46c20.js.map