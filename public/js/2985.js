"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2985],{2985:(t,s,e)=>{e.r(s),e.d(s,{default:()=>i});const a={data:function(){return{fields:[{key:"id",label:__("id"),sortable:!0,sortDirection:"desc"},{key:"product_name",label:__("product"),sortable:!0,class:"text-center"},{key:"total_qty",label:__("quantity"),sortable:!0,class:"text-center"},{key:"seller_name",label:__("seller"),sortable:!0,class:"text-center"},{key:"actions",label:__("actions")}],totalRows:1,currentPage:1,perPage:this.$perPage,pageOptions:this.$pageOptions,sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],page:1,isLoading:!1,sectionStyle:"style_1",max_visible_units:12,max_col_in_single_row:3,wishlists:[]}},computed:{sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}},mounted:function(){this.totalRows=this.wishlists.length},created:function(){this.getWishlists()},methods:{getWishlists:function(){var t=this;this.isLoading=!0,axios.get(this.$apiUrl+"/wishlists").then((function(s){t.isLoading=!1,t.wishlists=s.data.data,t.totalRows=t.wishlists.length}))}}};const i=(0,e(1900).Z)(a,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"page-heading"},[e("div",{staticClass:"page-title"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-md-6 order-md-1 order-last"},[e("h3",[t._v(t._s(t.__("wishlists_list")))])]),t._v(" "),e("div",{staticClass:"col-12 col-md-6 order-md-2 order-first"},[e("nav",{staticClass:"breadcrumb-header float-start float-lg-end",attrs:{"aria-label":"breadcrumb"}},[e("ol",{staticClass:"breadcrumb"},[e("li",{staticClass:"breadcrumb-item"},[e("router-link",{attrs:{to:"/dashboard"}},[t._v(t._s(t.__("dashboard")))])],1),t._v(" "),e("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v(t._s(t.__("wishlists_list")))])])])])])]),t._v(" "),e("section",{staticClass:"section"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[e("h4",{staticClass:"card-title"},[t._v(t._s(t.__("wishlists")))])]),t._v(" "),e("div",{staticClass:"card-body"},[e("b-row",{staticClass:"mb-2"},[e("b-col",{attrs:{md:"3","offset-md":"8"}},[e("h6",{staticClass:"box-title"},[t._v(t._s(t.__("search")))]),t._v(" "),e("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:"Search"},model:{value:t.filter,callback:function(s){t.filter=s},expression:"filter"}})],1),t._v(" "),e("b-col",{staticClass:"text-center",attrs:{md:"1"}},[e("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-primary btn_refresh",attrs:{title:t.__("refresh")},on:{click:function(s){return t.getWishlists()}}},[e("i",{staticClass:"fa fa-refresh",attrs:{"aria-hidden":"true"}})])])],1),t._v(" "),e("div",{staticClass:"table-responsive"},[e("b-table",{attrs:{items:t.wishlists,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,"filter-included-fields":t.filterOn,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection,bordered:!0,busy:t.isLoading,stacked:"md","show-empty":"",small:""},on:{"update:sortBy":function(s){t.sortBy=s},"update:sort-by":function(s){t.sortBy=s},"update:sortDesc":function(s){t.sortDesc=s},"update:sort-desc":function(s){t.sortDesc=s}},scopedSlots:t._u([{key:"table-busy",fn:function(){return[e("div",{staticClass:"text-center text-black my-2"},[e("b-spinner",{staticClass:"align-middle"}),t._v(" "),e("strong",[t._v(t._s(t.__("loading"))+"...")])],1)]},proxy:!0},{key:"cell(created_at)",fn:function(s){return[t._v("\n                                "+t._s(new Date(s.item.created_at).toLocaleString())+"\n                            ")]}},{key:"cell(actions)",fn:function(s){return[e("router-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-sm btn-primary",attrs:{to:"manage_products",title:t.__("view")}},[e("i",{staticClass:"fa fa-eye"}),t._v(" "+t._s(t.__("view"))+"\n                                ")])]}}])})],1),t._v(" "),e("b-row",[e("b-col",{staticClass:"my-1",attrs:{md:"2"}},[e("b-form-group",{staticClass:"mb-0",attrs:{label:t.__("per_page"),"label-for":"per-page-select","label-align-sm":"right","label-size":"sm"}},[e("b-form-select",{staticClass:"form-control form-select",attrs:{id:"per-page-select",options:t.pageOptions,size:"sm"},model:{value:t.perPage,callback:function(s){t.perPage=s},expression:"perPage"}})],1)],1),t._v(" "),e("b-col",{staticClass:"my-1",attrs:{md:"4","offset-md":"6"}},[e("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm"},model:{value:t.currentPage,callback:function(s){t.currentPage=s},expression:"currentPage"}})],1)],1)],1)])])])])}),[],!1,null,null,null).exports}}]);