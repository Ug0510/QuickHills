"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8938],{5262:(e,t,a)=>{a.d(t,{Z:()=>i});var s=a(3645),r=a.n(s)()((function(e){return e[1]}));r.push([e.id,".image_preview[data-v-4fc555b6]{margin-top:5px}",""]);const i=r},8938:(e,t,a)=>{a.r(t),a.d(t,{default:()=>_});var s=a(9669),r=a.n(s);const i={props:["record"],data:function(){return{isLoading:!1,image:null,id:this.record?this.record.id:null,name:this.record?this.record.name:null,slug:this.record?this.record.slug:null,subtitle:this.record?this.record.subtitle:null,image_url:this.record?this.record.image_url:null,status:this.record?this.record.status:1,parent_id:this.record?this.record.parent_id:0,error:null,editedCategoryId:null,selectedCategories:[],parent_categories:null}},watch:{editedCategoryId:function(e){this.selectedParentId=e}},created:function(){this.getParentCategories()},computed:{modal_title:function(){return this.id?__("edit_category"):__("add_category")}},methods:{createSlug:function(){var e=this;if(""!==this.name){var t=this.name.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-");r().get(this.$apiUrl+"/categories/check-slug/".concat(t)).then((function(a){a.data.unique?e.slug=t:e.slug=t+"-"+a.data.count})).catch((function(e){console.error("Error checking slug uniqueness: "+e)}))}},getParentCategories:function(){var e=this;r().get(this.$apiUrl+"/categories/options",{params:{exclude_id:this.record?this.record.id:0}}).then((function(t){e.parent_categories=t.data}))},showModal:function(){this.$refs["my-modal"].show()},hideModal:function(){this.$refs["my-modal"].hide()},dropFile:function(e){e.preventDefault(),this.$refs.file_image.files=e.dataTransfer.files,this.handleFileUpload(),e.currentTarget.classList.add("bg-gray-100"),e.currentTarget.classList.remove("bg-green-300")},handleFileUpload:function(){var e=this.$refs.file_image.files[0];if(this.error=null,e){if(["image/jpeg","image/png","image/jpg","image/gif","image/webp","image/svg+xml"].includes(e.type)){e.size>2097152?this.error="File size exceeds the maximum allowed limit (2MB).":(this.imageUrl=URL.createObjectURL(e),this.image=this.$refs.file_image.files[0],this.image_url=URL.createObjectURL(this.image))}else this.error="Invalid file type. Please upload a JPEG, PNG, JPG,  GIF, WEBP or SVG image."}},saveRecord:function(){var e=this,t=this;this.isLoading=!0;var a=new FormData;this.id&&a.append("id",this.id),a.append("name",this.name),a.append("slug",this.slug),a.append("subtitle",this.subtitle),a.append("image",this.image),a.append("status",this.status),a.append("parent_id",this.parent_id);var s=this.$apiUrl+"/categories/save";this.id&&(s=this.$apiUrl+"/categories/update"),r().post(s,a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var a=e.data;1===a.status?(t.$eventBus.$emit("categorySaved",a.message),t.hideModal(),t.$router.push({path:"/manage_categories"})):(t.showError(a.message),t.isLoading=!1)})).catch((function(a){t.isLoading=!1,a.request.statusText?e.showError(a.request.statusText):a.message?e.showError(a.message):e.showError(__("something_went_wrong"))}))}},mounted:function(){this.showModal()}};var o=a(3379),l=a.n(o),n=a(5262),c={insert:"head",singleton:!1};l()(n.Z,c);n.Z.locals;var d=a(1900);const u={components:{"app-edit-record":(0,d.Z)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-modal",{ref:"my-modal",attrs:{title:e.modal_title,scrollable:"","no-close-on-backdrop":"","no-fade":"",static:""},on:{hidden:function(t){return e.$emit("modalClose")}}},[a("div",{attrs:{slot:"modal-footer"},slot:"modal-footer"},[a("b-button",{attrs:{variant:"primary",disabled:e.isLoading},on:{click:function(t){return e.$refs.dummy_submit.click()}}},[e._v(e._s(e.__("save"))+"\n            "),e.isLoading?a("b-spinner",{attrs:{small:"",label:"Spinning"}}):e._e()],1),e._v(" "),a("b-button",{attrs:{variant:"secondary"},on:{click:e.hideModal}},[e._v(e._s(e.__("cancel")))])],1),e._v(" "),a("form",{ref:"my-form",on:{submit:function(t){return t.preventDefault(),e.saveRecord.apply(null,arguments)}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"form-group"},[a("label",[e._v(e._s(e.__("parent_category")))]),e._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.parent_id,expression:"parent_id"}],staticClass:"form-control form-select",domProps:{innerHTML:e._s(e.parent_categories)},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.parent_id=t.target.multiple?a:a[0]}}}),e._v(" "),e.id?a("span",{staticClass:"text-danger"},[e._v(e._s(e.__("parent_category_note")))]):e._e()]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v(e._s(e.__("category_name")))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",required:"",placeholder:e.__("enter_category_name")},domProps:{value:e.name},on:{keyup:e.createSlug,input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v(e._s(e.__("slug")))]),e._v(" "),a("i",{staticClass:"text-danger"},[e._v("*")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.slug,expression:"slug"}],staticClass:"form-control",attrs:{type:"text",placeholder:e.__("enter_category_slug")},domProps:{value:e.slug},on:{input:function(t){t.target.composing||(e.slug=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v(e._s(e.__("category_subtitle")))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.subtitle,expression:"subtitle"}],staticClass:"form-control",attrs:{type:"text",required:"",placeholder:e.__("enter_category_subtitle")},domProps:{value:e.subtitle},on:{input:function(t){t.target.composing||(e.subtitle=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",[e._v(e._s(e.__("image")))]),e._v(" "),a("p",{staticClass:"text-muted"},[e._v("Please choose square image of larger than 350px*350px & smaller than 550px*550px.")]),e._v(" "),e.error?a("span",{staticClass:"error"},[e._v(e._s(e.error))]):e._e(),e._v(" "),a("input",{ref:"file_image",staticClass:"file-input",attrs:{type:"file",name:"category_image",accept:"image/*"},on:{change:e.handleFileUpload}}),e._v(" "),a("div",{staticClass:"file-input-div bg-gray-100",on:{click:function(t){return e.$refs.file_image.click()},drop:e.dropFile,dragover:e.$dragoverFile,dragleave:e.$dragleaveFile}},[e.image&&""!==e.image.name?[a("label",[e._v("Selected file name:- "+e._s(e.image.name))])]:[a("label",[a("i",{staticClass:"fa fa-cloud-upload-alt fa-2x"})]),e._v(" "),a("label",[e._v(e._s(e.__("drop_files_here_or_click_to_upload")))])]],2),e._v(" "),e.image_url?a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("img",{staticClass:"custom-image",attrs:{src:e.image_url,title:"Category Image",alt:"Category Image"}})])]):e._e()]),e._v(" "),e.id?a("div",{staticClass:"form-group"},[a("label",[e._v("Status")]),e._v(" "),a("div",{staticClass:"col-md-9 text-left mt-1"},[a("b-form-radio-group",{attrs:{options:[{text:" Deactivated",value:0},{text:" Activated",value:1}],buttons:"","button-variant":"outline-primary",required:""},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}})],1)]):e._e()]),e._v(" "),a("button",{ref:"dummy_submit",staticStyle:{display:"none"}})])])}),[],!1,null,"4fc555b6",null).exports},data:function(){return{fields:[{key:"id",label:__("id"),class:"text-center",sortable:!0,sortDirection:"desc"},{key:"parent_id",label:__("parent_id"),class:"text-center",sortable:!0,sortDirection:"desc"},{key:"name",label:__("name"),class:"text-center",sortable:!0},{key:"subtitle",label:__("subtitle"),class:"text-center",sortable:!0},{key:"image",label:__("image"),class:"text-center"},{key:"status",label:__("status"),class:"text-center"},{key:"actions",label:__("actions"),class:"text-center"}],totalRows:1,currentPage:1,perPage:this.$perPage,pageOptions:this.$pageOptions,sortBy:"id",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],page:1,categories:[],isLoading:!1,sectionStyle:"style_1",max_visible_categories:12,max_col_in_single_row:3,create_new:null,edit_record:null,settingModalShow:!1}},computed:{sortOptions:function(){return this.fields.filter((function(e){return e.sortable})).map((function(e){return{text:e.label,value:e.key}}))},filteredCategories:function(){var e=this.filter?this.filter.toLowerCase():"";return this.categories.filter((function(t){return t.name.toLowerCase().includes(e)||t.subtitle.toLowerCase().includes(e)}))}},mounted:function(){},watch:{$route:function(e,t){this.showCreateModal()},currentPage:function(e){this.getCategories()},perPage:function(e){this.getCategories()}},created:function(){var e=this;this.showCreateModal(),this.$eventBus.$on("categorySaved",(function(t){e.showMessage("success",t),e.getCategories(),e.create_new=null})),this.getCategories()},methods:{getCategories:function(){var e=this;this.isLoading=!0;var t={offset:this.currentPage,limit:this.perPage,filter:this.filter};axios.get(this.$apiUrl+"/categories",{params:t}).then((function(t){e.isLoading=!1;var a=t.data;e.categories=a.data,e.totalRows=a.total}))},deleteCategory:function(e,t){var a=this;this.$swal.fire({title:"Are you Sure?",text:"You want be able to revert this",confirmButtonText:"Yes, Sure",cancelButtonText:"Cancel",icon:"warning",showCancelButton:!0,confirmButtonColor:"#37a279",cancelButtonColor:"#d33"}).then((function(s){if(s.value){a.isLoading=!0;var r={id:t};axios.post(a.$apiUrl+"/categories/delete",r).then((function(t){a.isLoading=!1;var s=t.data;a.categories.splice(e,1),a.showMessage("success",s.message)}))}}))},showCreateModal:function(){this.$route.params.create&&(this.create_new=!0)},hideModal:function(){this.create_new=!1,this.edit_record=!1,this.$router.push({path:"/manage_categories"})}}};const _=(0,d.Z)(u,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"page-heading"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6 order-md-1 order-last"},[a("h3",[e._v(e._s(e.__("manage_categories")))])]),e._v(" "),a("div",{staticClass:"col-12 col-md-6 order-md-2 order-first"},[a("nav",{staticClass:"breadcrumb-header float-start float-lg-end",attrs:{"aria-label":"breadcrumb"}},[a("ol",{staticClass:"breadcrumb"},[a("li",{staticClass:"breadcrumb-item"},[a("router-link",{attrs:{to:"/dashboard"}},[e._v(e._s(e.__("dashboard")))])],1),e._v(" "),a("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[e._v(e._s(e.__("manage_categories")))])])])])]),e._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-12 order-md-1 order-last"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("h4",[e._v(e._s(e.__("categories")))]),e._v(" "),a("span",{staticClass:"pull-right"},[e.$can("category_create")?a("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-primary",attrs:{title:e.__("add_new_category")},on:{click:function(t){e.create_new=!0}}},[e._v(e._s(e.__("add_category")))]):e._e()])]),e._v(" "),a("div",{staticClass:"card-body"},[a("b-row",{staticClass:"mb-2"},[a("b-col",{attrs:{md:"3","offset-md":"8"}},[a("h6",{staticClass:"box-title"},[e._v(e._s(e.__("search")))]),e._v(" "),a("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:e.__("search")},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1),e._v(" "),a("b-col",{staticClass:"text-center",attrs:{md:"1"}},[a("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-primary btn_refresh",attrs:{title:e.__("refresh")},on:{click:function(t){return e.getCategories()}}},[a("i",{staticClass:"fa fa-refresh",attrs:{"aria-hidden":"true"}})])])],1),e._v(" "),a("b-table",{attrs:{items:e.categories,fields:e.fields,filter:e.filter,"filter-included-fields":e.filterOn,"sort-by":e.sortBy,"sort-desc":e.sortDesc,"sort-direction":e.sortDirection,bordered:!0,busy:e.isLoading,stacked:"md","show-empty":"",small:""},on:{"update:sortBy":function(t){e.sortBy=t},"update:sort-by":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t},"update:sort-desc":function(t){e.sortDesc=t}},scopedSlots:e._u([{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center text-black my-2"},[a("b-spinner",{staticClass:"align-middle"}),e._v(" "),a("strong",[e._v(e._s(e.__("loading"))+"...")])],1)]},proxy:!0},{key:"cell(image)",fn:function(e){return[a("img",{attrs:{src:e.item.image_url,height:"50"}})]}},{key:"cell(status)",fn:function(t){return[1==t.item.status?a("span",{staticClass:"badge bg-success"},[e._v("Activated")]):e._e(),e._v(" "),0==t.item.status?a("span",{staticClass:"badge bg-danger"},[e._v("Deactivated")]):e._e()]}},{key:"cell(actions)",fn:function(t){return[e.$can("category_update")?a("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-sm btn-primary",attrs:{title:e.__("edit")},on:{click:function(a){e.edit_record=t.item}}},[a("i",{staticClass:"fa fa-pencil-alt"})]):e._e(),e._v(" "),e.$can("category_delete")?a("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"btn btn-sm btn-danger",attrs:{title:e.__("delete")},on:{click:function(a){return e.deleteCategory(t.index,t.item.id)}}},[a("i",{staticClass:"fa fa-trash"})]):e._e()]}}])}),e._v(" "),a("b-row",[a("b-col",{staticClass:"my-1",attrs:{md:"2"}},[a("label",[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.__("per_page"),"label-for":"per-page-select","label-align-sm":"right","label-size":"sm"}},[a("b-form-select",{staticClass:"form-control form-select",attrs:{id:"per-page-select",options:e.pageOptions,size:"sm"},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}})],1)],1)]),e._v(" "),a("b-col",{staticClass:"my-1",attrs:{md:"4","offset-md":"6"}},[a("label",[e._v(e._s(e.__("total_records"))+" :- "+e._s(e.totalRows)+" ")]),e._v(" "),a("b-pagination",{staticClass:"my-0",attrs:{"total-rows":e.totalRows,"per-page":e.perPage,align:"fill",size:"sm"},on:{change:e.getCategories},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)],1)])])])]),e._v(" "),e.create_new||e.edit_record?a("app-edit-record",{attrs:{record:e.edit_record},on:{modalClose:function(t){return e.hideModal()}}}):e._e()],1)}),[],!1,null,null,null).exports}}]);