"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Category_ManageCategories_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['record'],
  data: function data() {
    return {
      isLoading: false,
      image: null,
      id: this.record ? this.record.id : null,
      name: this.record ? this.record.name : null,
      slug: this.record ? this.record.slug : null,
      subtitle: this.record ? this.record.subtitle : null,
      image_url: this.record ? this.record.image_url : null,
      status: this.record ? this.record.status : 1,
      parent_id: this.record ? this.record.parent_id : 0,
      error: null,
      // parent_id: 0, // Default value for the parent dropdown
      // categories: [/* your category data */],
      editedCategoryId: null,
      // ID of the category being edited
      selectedCategories: [],
      parent_categories: null
    };
  },
  watch: {
    editedCategoryId: function editedCategoryId(newVal) {
      // Set the selectedParentId to the ID of the category being edited
      this.selectedParentId = newVal;
    }
  },
  created: function created() {
    this.getParentCategories();
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? __('edit_category') : __('add_category');
      return title;
    }
  },
  methods: {
    createSlug: function createSlug() {
      var _this = this;
      if (this.name !== "") {
        var slug = this.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

        // Check for uniqueness
        axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + "/categories/check-slug/".concat(slug)).then(function (response) {
          if (response.data.unique) {
            _this.slug = slug;
          } else {
            _this.slug = slug + '-' + response.data.count;
          }
        })["catch"](function (error) {
          console.error('Error checking slug uniqueness: ' + error);
        });
      }
    },
    getParentCategories: function getParentCategories() {
      var _this2 = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/categories/options', {
        params: {
          exclude_id: this.record ? this.record.id : 0
        }
      }).then(function (response) {
        _this2.parent_categories = response.data;
      });
    },
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
    },
    // this function is add in app.js for gloable.
    /*dragoverFile(event) {
        event.preventDefault();
        // Add some visual fluff to show the user can drop its files
        if (!event.currentTarget.classList.contains('bg-green-300')) {
            event.currentTarget.classList.remove('bg-gray-100');
            event.currentTarget.classList.add('bg-green-300');
        }
    },
    dragleaveFile(event) {
        // Clean up
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
    },*/
    dropFile: function dropFile(event) {
      event.preventDefault();
      this.$refs.file_image.files = event.dataTransfer.files;
      this.handleFileUpload(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUpload: function handleFileUpload() {
      var file = this.$refs.file_image.files[0];

      // Reset previous error message
      this.error = null;

      // Check if a file was selected
      if (!file) return;

      // Perform image validation
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        this.error = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF, WEBP or SVG image.";
        return;
      }
      var maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.error = "File size exceeds the maximum allowed limit (2MB).";
        return;
      }

      // Create a URL for the uploaded image and display it
      this.imageUrl = URL.createObjectURL(file);
      this.image = this.$refs.file_image.files[0];
      this.image_url = URL.createObjectURL(this.image);
    },
    saveRecord: function saveRecord() {
      var _this3 = this;
      var vm = this;
      this.isLoading = true;
      /*let postData = {
          id: this.id,
          name: this.name,
          subtitle: this.subtitle,
          image: this.image,
      };*/

      var formData = new FormData();
      if (this.id) {
        formData.append('id', this.id);
      }
      formData.append('name', this.name);
      formData.append('slug', this.slug);
      formData.append('subtitle', this.subtitle);
      formData.append('image', this.image);
      formData.append('status', this.status);
      formData.append('parent_id', this.parent_id);
      var url = this.$apiUrl + '/categories/save';
      if (this.id) {
        url = this.$apiUrl + '/categories/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          /*vm.$eventBus.$emit('categorySaved', data.message);
          vm.hideModal();*/
          vm.$eventBus.$emit('categorySaved', data.message);
          vm.hideModal();
          vm.$router.push({
            path: '/manage_categories'
          });
          /*if(this.id) {
              vm.$eventBus.$emit('categorySaved', data.message, data.plan);
          }else{
              vm.$eventBus.$emit('planCreated', data.message, data.plan);
          }*/
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(__('something_went_wrong'));
        }
      });
    }
  },
  mounted: function mounted() {
    this.showModal();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/ManageCategories.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/ManageCategories.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/Category/Edit.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    'app-edit-record': _Edit_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'parent_id',
        label: __('parent_id'),
        "class": 'text-center',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'name',
        label: __('name'),
        "class": 'text-center',
        sortable: true
      }, {
        key: 'subtitle',
        label: __('subtitle'),
        "class": 'text-center',
        sortable: true
      }, {
        key: 'image',
        label: __('image'),
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
        "class": 'text-center'
      }, {
        key: 'actions',
        label: __('actions'),
        "class": 'text-center'
      }],
      totalRows: 1,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      sortBy: 'id',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      page: 1,
      categories: [],
      isLoading: false,
      sectionStyle: 'style_1',
      max_visible_categories: 12,
      max_col_in_single_row: 3,
      create_new: null,
      edit_record: null,
      settingModalShow: false
    };
  },
  computed: {
    sortOptions: function sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(function (f) {
        return f.sortable;
      }).map(function (f) {
        return {
          text: f.label,
          value: f.key
        };
      });
    },
    filteredCategories: function filteredCategories() {
      var query = this.filter ? this.filter.toLowerCase() : '';
      return this.categories.filter(function (category) {
        return category.name.toLowerCase().includes(query) || category.subtitle.toLowerCase().includes(query) // Add more fields as needed for search
        ;
      });
    }
    // totalRows: function() {
    //     return this.totalRows;
    // },
  },
  mounted: function mounted() {
    // Set the initial number of items
    //this.totalRows = this.categories.length
  },
  watch: {
    $route: function $route(to, from) {
      this.showCreateModal();
    },
    currentPage: function currentPage(newPage) {
      this.getCategories();
    },
    perPage: function perPage(newPerPage) {
      this.getCategories();
    }
  },
  created: function created() {
    var _this = this;
    this.showCreateModal();
    this.$eventBus.$on('categorySaved', function (message) {
      _this.showMessage("success", message);
      _this.getCategories();
      _this.create_new = null;
    });
    this.getCategories();
  },
  methods: {
    getCategories: function getCategories() {
      var _this2 = this;
      this.isLoading = true;
      var params = {
        offset: this.currentPage,
        limit: this.perPage,
        filter: this.filter
      };
      axios.get(this.$apiUrl + '/categories', {
        params: params
      }).then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        _this2.categories = data.data;
        _this2.totalRows = data.total;
      });
    },
    deleteCategory: function deleteCategory(index, id) {
      var _this3 = this;
      this.$swal.fire({
        title: "Are you Sure?",
        text: "You want be able to revert this",
        confirmButtonText: "Yes, Sure",
        cancelButtonText: "Cancel",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then(function (result) {
        if (result.value) {
          _this3.isLoading = true;
          var postData = {
            id: id
          };
          axios.post(_this3.$apiUrl + '/categories/delete', postData).then(function (response) {
            _this3.isLoading = false;
            var data = response.data;
            _this3.categories.splice(index, 1);
            _this3.showMessage('success', data.message);
          });
        }
      });
    },
    showCreateModal: function showCreateModal() {
      var create = this.$route.params.create;
      if (create) {
        this.create_new = true;
      }
    },
    hideModal: function hideModal() {
      this.create_new = false;
      this.edit_record = false;
      this.$router.push({
        path: '/manage_categories'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=template&id=df3546e8&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=template&id=df3546e8&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("b-modal", {
    ref: "my-modal",
    attrs: {
      title: _vm.modal_title,
      scrollable: "",
      "no-close-on-backdrop": "",
      "no-fade": "",
      "static": ""
    },
    on: {
      hidden: function hidden($event) {
        return _vm.$emit("modalClose");
      }
    }
  }, [_c("div", {
    attrs: {
      slot: "modal-footer"
    },
    slot: "modal-footer"
  }, [_c("b-button", {
    attrs: {
      variant: "primary",
      disabled: _vm.isLoading
    },
    on: {
      click: function click($event) {
        return _vm.$refs["dummy_submit"].click();
      }
    }
  }, [_vm._v(_vm._s(_vm.__("save")) + "\n            "), _vm.isLoading ? _c("b-spinner", {
    attrs: {
      small: "",
      label: "Spinning"
    }
  }) : _vm._e()], 1), _vm._v(" "), _c("b-button", {
    attrs: {
      variant: "secondary"
    },
    on: {
      click: _vm.hideModal
    }
  }, [_vm._v(_vm._s(_vm.__("cancel")))])], 1), _vm._v(" "), _c("form", {
    ref: "my-form",
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.saveRecord.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v(_vm._s(_vm.__("parent_category")))]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.parent_id,
      expression: "parent_id"
    }],
    staticClass: "form-control form-select",
    domProps: {
      innerHTML: _vm._s(_vm.parent_categories)
    },
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.parent_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }), _vm._v(" "), _vm.id ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.__("parent_category_note")))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v(_vm._s(_vm.__("category_name")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.name,
      expression: "name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      required: "",
      placeholder: _vm.__("enter_category_name")
    },
    domProps: {
      value: _vm.name
    },
    on: {
      keyup: _vm.createSlug,
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.name = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v(_vm._s(_vm.__("slug")))]), _vm._v(" "), _c("i", {
    staticClass: "text-danger"
  }, [_vm._v("*")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.slug,
      expression: "slug"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: _vm.__("enter_category_slug")
    },
    domProps: {
      value: _vm.slug
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.slug = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v(_vm._s(_vm.__("category_subtitle")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.subtitle,
      expression: "subtitle"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      required: "",
      placeholder: _vm.__("enter_category_subtitle")
    },
    domProps: {
      value: _vm.subtitle
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.subtitle = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v(_vm._s(_vm.__("image")))]), _vm._v(" "), _c("p", {
    staticClass: "text-muted"
  }, [_vm._v("Please choose square image of larger than 350px*350px & smaller than 550px*550px.")]), _vm._v(" "), _vm.error ? _c("span", {
    staticClass: "error"
  }, [_vm._v(_vm._s(_vm.error))]) : _vm._e(), _vm._v(" "), _c("input", {
    ref: "file_image",
    staticClass: "file-input",
    attrs: {
      type: "file",
      name: "category_image",
      accept: "image/*"
    },
    on: {
      change: _vm.handleFileUpload
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "file-input-div bg-gray-100",
    on: {
      click: function click($event) {
        return _vm.$refs.file_image.click();
      },
      drop: _vm.dropFile,
      dragover: _vm.$dragoverFile,
      dragleave: _vm.$dragleaveFile
    }
  }, [_vm.image && _vm.image.name !== "" ? [_c("label", [_vm._v("Selected file name:- " + _vm._s(_vm.image.name))])] : [_c("label", [_c("i", {
    staticClass: "fa fa-cloud-upload-alt fa-2x"
  })]), _vm._v(" "), _c("label", [_vm._v(_vm._s(_vm.__("drop_files_here_or_click_to_upload")))])]], 2), _vm._v(" "), _vm.image_url ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-4"
  }, [_c("img", {
    staticClass: "custom-image",
    attrs: {
      src: _vm.image_url,
      title: "Category Image",
      alt: "Category Image"
    }
  })])]) : _vm._e()]), _vm._v(" "), _vm.id ? _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Status")]), _vm._v(" "), _c("div", {
    staticClass: "col-md-9 text-left mt-1"
  }, [_c("b-form-radio-group", {
    attrs: {
      options: [{
        text: " Deactivated",
        value: 0
      }, {
        text: " Activated",
        value: 1
      }],
      buttons: "",
      "button-variant": "outline-primary",
      required: ""
    },
    model: {
      value: _vm.status,
      callback: function callback($$v) {
        _vm.status = $$v;
      },
      expression: "status"
    }
  })], 1)]) : _vm._e()]), _vm._v(" "), _c("button", {
    ref: "dummy_submit",
    staticStyle: {
      display: "none"
    }
  })])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/ManageCategories.vue?vue&type=template&id=35266163":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/ManageCategories.vue?vue&type=template&id=35266163 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "page-heading"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12 col-md-6 order-md-1 order-last"
  }, [_c("h3", [_vm._v(_vm._s(_vm.__("manage_categories")))])]), _vm._v(" "), _c("div", {
    staticClass: "col-12 col-md-6 order-md-2 order-first"
  }, [_c("nav", {
    staticClass: "breadcrumb-header float-start float-lg-end",
    attrs: {
      "aria-label": "breadcrumb"
    }
  }, [_c("ol", {
    staticClass: "breadcrumb"
  }, [_c("li", {
    staticClass: "breadcrumb-item"
  }, [_c("router-link", {
    attrs: {
      to: "/dashboard"
    }
  }, [_vm._v(_vm._s(_vm.__("dashboard")))])], 1), _vm._v(" "), _c("li", {
    staticClass: "breadcrumb-item active",
    attrs: {
      "aria-current": "page"
    }
  }, [_vm._v(_vm._s(_vm.__("manage_categories")))])])])])]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12 col-md-12 order-md-1 order-last"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-header"
  }, [_c("h4", [_vm._v(_vm._s(_vm.__("categories")))]), _vm._v(" "), _c("span", {
    staticClass: "pull-right"
  }, [_vm.$can("category_create") ? _c("button", {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip.hover",
      modifiers: {
        hover: true
      }
    }],
    staticClass: "btn btn-primary",
    attrs: {
      title: _vm.__("add_new_category")
    },
    on: {
      click: function click($event) {
        _vm.create_new = true;
      }
    }
  }, [_vm._v(_vm._s(_vm.__("add_category")))]) : _vm._e()])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("b-row", {
    staticClass: "mb-2"
  }, [_c("b-col", {
    attrs: {
      md: "3",
      "offset-md": "8"
    }
  }, [_c("h6", {
    staticClass: "box-title"
  }, [_vm._v(_vm._s(_vm.__("search")))]), _vm._v(" "), _c("b-form-input", {
    attrs: {
      id: "filter-input",
      type: "search",
      placeholder: _vm.__("search")
    },
    model: {
      value: _vm.filter,
      callback: function callback($$v) {
        _vm.filter = $$v;
      },
      expression: "filter"
    }
  })], 1), _vm._v(" "), _c("b-col", {
    staticClass: "text-center",
    attrs: {
      md: "1"
    }
  }, [_c("button", {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip.hover",
      modifiers: {
        hover: true
      }
    }],
    staticClass: "btn btn-primary btn_refresh",
    attrs: {
      title: _vm.__("refresh")
    },
    on: {
      click: function click($event) {
        return _vm.getCategories();
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  })])])], 1), _vm._v(" "), _c("b-table", {
    attrs: {
      items: _vm.categories,
      fields: _vm.fields,
      filter: _vm.filter,
      "filter-included-fields": _vm.filterOn,
      "sort-by": _vm.sortBy,
      "sort-desc": _vm.sortDesc,
      "sort-direction": _vm.sortDirection,
      bordered: true,
      busy: _vm.isLoading,
      stacked: "md",
      "show-empty": "",
      small: ""
    },
    on: {
      "update:sortBy": function updateSortBy($event) {
        _vm.sortBy = $event;
      },
      "update:sort-by": function updateSortBy($event) {
        _vm.sortBy = $event;
      },
      "update:sortDesc": function updateSortDesc($event) {
        _vm.sortDesc = $event;
      },
      "update:sort-desc": function updateSortDesc($event) {
        _vm.sortDesc = $event;
      }
    },
    scopedSlots: _vm._u([{
      key: "table-busy",
      fn: function fn() {
        return [_c("div", {
          staticClass: "text-center text-black my-2"
        }, [_c("b-spinner", {
          staticClass: "align-middle"
        }), _vm._v(" "), _c("strong", [_vm._v(_vm._s(_vm.__("loading")) + "...")])], 1)];
      },
      proxy: true
    }, {
      key: "cell(image)",
      fn: function fn(row) {
        return [_c("img", {
          attrs: {
            src: row.item.image_url,
            height: "50"
          }
        })];
      }
    }, {
      key: "cell(status)",
      fn: function fn(row) {
        return [row.item.status == 1 ? _c("span", {
          staticClass: "badge bg-success"
        }, [_vm._v("Activated")]) : _vm._e(), _vm._v(" "), row.item.status == 0 ? _c("span", {
          staticClass: "badge bg-danger"
        }, [_vm._v("Deactivated")]) : _vm._e()];
      }
    }, {
      key: "cell(actions)",
      fn: function fn(row) {
        return [_vm.$can("category_update") ? _c("button", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          staticClass: "btn btn-sm btn-primary",
          attrs: {
            title: _vm.__("edit")
          },
          on: {
            click: function click($event) {
              _vm.edit_record = row.item;
            }
          }
        }, [_c("i", {
          staticClass: "fa fa-pencil-alt"
        })]) : _vm._e(), _vm._v(" "), _vm.$can("category_delete") ? _c("button", {
          directives: [{
            name: "b-tooltip",
            rawName: "v-b-tooltip.hover",
            modifiers: {
              hover: true
            }
          }],
          staticClass: "btn btn-sm btn-danger",
          attrs: {
            title: _vm.__("delete")
          },
          on: {
            click: function click($event) {
              return _vm.deleteCategory(row.index, row.item.id);
            }
          }
        }, [_c("i", {
          staticClass: "fa fa-trash"
        })]) : _vm._e()];
      }
    }])
  }), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "my-1",
    attrs: {
      md: "2"
    }
  }, [_c("label", [_c("b-form-group", {
    staticClass: "mb-0",
    attrs: {
      label: _vm.__("per_page"),
      "label-for": "per-page-select",
      "label-align-sm": "right",
      "label-size": "sm"
    }
  }, [_c("b-form-select", {
    staticClass: "form-control form-select",
    attrs: {
      id: "per-page-select",
      options: _vm.pageOptions,
      size: "sm"
    },
    model: {
      value: _vm.perPage,
      callback: function callback($$v) {
        _vm.perPage = $$v;
      },
      expression: "perPage"
    }
  })], 1)], 1)]), _vm._v(" "), _c("b-col", {
    staticClass: "my-1",
    attrs: {
      md: "4",
      "offset-md": "6"
    }
  }, [_c("label", [_vm._v(_vm._s(_vm.__("total_records")) + " :- " + _vm._s(_vm.totalRows) + " ")]), _vm._v(" "), _c("b-pagination", {
    staticClass: "my-0",
    attrs: {
      "total-rows": _vm.totalRows,
      "per-page": _vm.perPage,
      align: "fill",
      size: "sm"
    },
    on: {
      change: _vm.getCategories
    },
    model: {
      value: _vm.currentPage,
      callback: function callback($$v) {
        _vm.currentPage = $$v;
      },
      expression: "currentPage"
    }
  })], 1)], 1)], 1)])])])]), _vm._v(" "), _vm.create_new || _vm.edit_record ? _c("app-edit-record", {
    attrs: {
      record: _vm.edit_record
    },
    on: {
      modalClose: function modalClose($event) {
        return _vm.hideModal();
      }
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.image_preview[data-v-df3546e8] {\n    margin-top: 5px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_df3546e8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_df3546e8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_df3546e8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Category/Edit.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/Category/Edit.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_df3546e8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=df3546e8&scoped=true */ "./resources/js/views/Category/Edit.vue?vue&type=template&id=df3546e8&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Category/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_df3546e8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css */ "./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_df3546e8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_df3546e8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "df3546e8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Category/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Category/ManageCategories.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/Category/ManageCategories.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ManageCategories_vue_vue_type_template_id_35266163__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageCategories.vue?vue&type=template&id=35266163 */ "./resources/js/views/Category/ManageCategories.vue?vue&type=template&id=35266163");
/* harmony import */ var _ManageCategories_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageCategories.vue?vue&type=script&lang=js */ "./resources/js/views/Category/ManageCategories.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManageCategories_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageCategories_vue_vue_type_template_id_35266163__WEBPACK_IMPORTED_MODULE_0__.render,
  _ManageCategories_vue_vue_type_template_id_35266163__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Category/ManageCategories.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Category/Edit.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Category/Edit.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Category/ManageCategories.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/Category/ManageCategories.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageCategories_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ManageCategories.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/ManageCategories.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageCategories_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Category/Edit.vue?vue&type=template&id=df3546e8&scoped=true":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/Category/Edit.vue?vue&type=template&id=df3546e8&scoped=true ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_df3546e8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_df3546e8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_df3546e8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=df3546e8&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=template&id=df3546e8&scoped=true");


/***/ }),

/***/ "./resources/js/views/Category/ManageCategories.vue?vue&type=template&id=35266163":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/Category/ManageCategories.vue?vue&type=template&id=35266163 ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageCategories_vue_vue_type_template_id_35266163__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageCategories_vue_vue_type_template_id_35266163__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageCategories_vue_vue_type_template_id_35266163__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ManageCategories.vue?vue&type=template&id=35266163 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/ManageCategories.vue?vue&type=template&id=35266163");


/***/ }),

/***/ "./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_df3546e8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Category/Edit.vue?vue&type=style&index=0&id=df3546e8&scoped=true&lang=css");


/***/ })

}]);