import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";
import TestUnit from "../views/TestUnit.vue";
import TestContent from "../views/TestContent.vue";
import LabTest from "../views/LabTest.vue";
import Patients from "../views/Patients.vue";
import Diagnostics from "../views/DiagnosticResult.vue";
import Result from "../views/ResultsPage.vue"
import PageNotFound from "../views/404.vue"

const routes = [
  {
    path:"/result/:id",
    name:"Result",
    component: Result
  },
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/diagnostics",
    name: "Diagnostics",
    component: Diagnostics,
  },  
  {
    path:"/patients",
    name: "Patients",
    component: Patients,
  },
  {
    path: "/template",
    name: "Template",
    component: Tables,
  },
  {
    path: "/testunit",
    name: "TestUnit",
    component: TestUnit,
  },
  {
    path: "/testcontent",
    name: "TestContent",
    component: TestContent,
  },
  {
    path: "/labtest",
    name: "LabTest",
    component: LabTest,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  { path: "/:pathMatch(.*)*", name:'404', component: PageNotFound }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to,from,next)=>{
  if(store.state.currentUser == null)
  {
    if (to.path !== '/signin') {
      next('/signin');
    } else {
      next();
    }


  }
  else{
    next()
  }
 
})


export default router;
