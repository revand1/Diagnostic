<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/"
          :class="getRoute() === 'diagnostics' ? 'active' : ''"
          :navText="'Diagnostic Results'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-file-medical text-info text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/patients"
          :class="getRoute() === 'patients' ? 'active' : ''"
          :navText="'Patients'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-head-side-mask text-warning text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/pathologist"
          :class="getRoute() === 'pathologist' ? 'active' : ''"
          :navText="'Pathologist'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-first-order text-primary text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/medtech"
          :class="getRoute() === 'medtech' ? 'active' : ''"
          :navText="'Medtech'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-ge text-danger text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          CONFIGURATION
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/labtest"
          :class="getRoute() === 'labtest' ? 'active' : ''"
          :navText="'Lab Test'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-microscope text-info text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/testcontent"
          :class="getRoute() === 'testcontent' ? 'active' : ''"
          :navText="'Test Content'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-vial text-primary text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/testunit"
          :class="getRoute() === 'testunit' ? 'active' : ''"
          :navText="'Test Unit'"
        >
          <template v-slot:icon>
            <i
              class="fa fa-balance-scale text-warning text-lg opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/signin"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'اشتراك' : 'Sign Out'"
        >
          <template v-slot:icon>
            <i class="fa fa-sign-out text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>

</template>
<script>
import SidenavItem from "./SidenavItem.vue";


export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
