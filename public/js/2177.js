"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2177],{2177:(t,s,e)=>{e.r(s),e.d(s,{default:()=>n});var a=e(9669),r=e.n(a);const i={data:function(){return{isLoading:!1,updaterResult:{version:"0.0.0"}}},computed:{sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}},created:function(){this.checkSystemRegister()},methods:{checkSystemRegister:function(){var t=this;r().get(this.$apiUrl+"/store_settings/purchase_code_updater").then((function(s){console.log(s.data),1==s.data&&t.checkSystemUpdate()}))},checkSystemUpdate:function(){var t=this;r().get(this.$baseUrl+"/updater.check").then((function(s){var e=JSON.stringify(s.data);t.updaterResult=JSON.parse(e)}))},systemUpdate:function(){var t=this;this.$swal.fire({title:"Are you Sure?",text:"You want be able to revert this",confirmButtonText:"Yes, Sure",cancelButtonText:"Cancel",icon:"warning",showCancelButton:!0,confirmButtonColor:"#37a279",cancelButtonColor:"#d33"}).then((function(s){s.value&&(t.isLoading=!0,r().get(t.$baseUrl+"/updater.update").then((function(s){""!=s?(t.showMessage("success","Congratulation System Updated Successfully"),t.checkSystemUpdate(),t.isLoading=!1,setTimeout((function(){window.location.href=t.$baseUrl+"/migration"}),5e3)):(t.showMessage("error","Something went wrong! System did not update."),t.showError("Something went wrong! System did not update."),t.isLoading=!1)})))}))}}};const n=(0,e(1900).Z)(i,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"page-heading"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-md-6 order-md-1 order-last"},[e("h3",[t._v(t._s(t.__("system_updater")))])]),t._v(" "),e("div",{staticClass:"col-12 col-md-6 order-md-2 order-first"},[e("nav",{staticClass:"breadcrumb-header float-start float-lg-end",attrs:{"aria-label":"breadcrumb"}},[e("ol",{staticClass:"breadcrumb"},[e("li",{staticClass:"breadcrumb-item"},[e("router-link",{attrs:{to:"/dashboard"}},[t._v(t._s(t.__("dashboard")))])],1),t._v(" "),e("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v(t._s(t.__("system_updater")))])])])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-6 col-md-6 order-md-1 order-last"},[t.updaterResult&&t.updaterResult.description?e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("h4",[t._v(t._s(t.__("change_logs_of_egrocer"))+" "+t._s("v - "+t.updaterResult.version)+" ")]),t._v(" "),e("span",{staticClass:"pull-right"},[e("span",{staticClass:"badge bg-primary"},[t._v("\n                  "+t._s(t.__("new_update_available"))),e("span",{staticClass:"badge rounded-pill bg-success text-white ms-1"},[t._v(t._s("v - "+t.updaterResult.version))])])])]),t._v(" "),e("div",{staticClass:"card-body"},[e("span",{attrs:{id:"update_description"},domProps:{innerHTML:t._s(t.updaterResult.description)}})]),t._v(" "),e("div",{staticClass:"card-footer"},[e("b-button",{attrs:{type:"button",variant:"primary",disabled:t.isLoading},on:{click:t.systemUpdate}},[t.isLoading?e("span",[e("b-spinner",{attrs:{small:"",label:"Spinning"}}),t._v("  "+t._s(t.__("system_is_updating")))],1):e("span",[t._v(" "+t._s(t.__("update_the_system")))])])],1)]):e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("h4",[t._v(" "+t._s(t.__("new_system_update_is_not_available")))]),t._v(" "),e("span",{staticClass:"pull-right"},[e("span",{staticClass:"badge bg-primary"},[t._v("\n                          "+t._s(t.__("egrocer_current_version_is"))+"\n                          "),e("span",{staticClass:"badge rounded-pill bg-success text-white ms-1"},[t._v(t._s("v - "+t.$currentVersion))])])])])])])])])])}),[],!1,null,null,null).exports}}]);