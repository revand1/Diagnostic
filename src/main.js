import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/font-awesome.min.css";
import ArgonDashboard from "./argon-dashboard";
// import SmartTable from 'vuejs-smart-table'

const appInstance = createApp(App);
// appInstance.use(SmartTable)
appInstance.use(store);
appInstance.use(router);


appInstance.use(ArgonDashboard);
appInstance.mount("#app");



