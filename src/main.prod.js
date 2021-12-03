import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "./assets/css/global.css";
import "./assets/css/fonts/iconfont.css";

import element from "./elementPartUI";
import "element-ui/lib/theme-chalk/index.css";

import TreeTable from "vue-table-with-tree-grid";
// 富文本编辑器
import VueQuillEditor from "vue-quill-editor";
// require styles

// 导入进度条
import Nprogress from "nprogress";

Vue.use(element);
Vue.config.productionTip = false;

axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// request时开启进度条
axios.interceptors.request.use((config) => {
    // console.log(config);
    Nprogress.start();
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
});
// response时关闭进度条
axios.interceptors.response.use((config) => {
    Nprogress.done();
    return config;
});

Vue.prototype.$http = axios;

Vue.component("tree-table", TreeTable);

Vue.filter("dateFormat", function(originVal) {
    const dt = new Date(originVal);

    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + "").padStart(2, "0");
    const d = (dt.getDate() + "").padStart(2, "0");
    const hh = (dt.getHours() + "").padStart(2, "0");
    const mm = (dt.getMinutes() + "").padStart(2, "0");
    const ss = (dt.getSeconds() + "").padStart(2, "0");

    return `${y}-${m}-${d}-${hh}:${mm}:${ss}`;
});

Vue.use(VueQuillEditor);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");