<!--
=========================================================
* Vue Argon Dashboard 2 - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-argon-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<template>
  <div
    v-show="this.$store.state.layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[
      this.$store.state.isTransparent,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start'
    ]"
    v-if="this.$store.state.showSidenav&&this.$route.name!='Result'&&this.$route.name!='404'"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- nav -->
    <navbar

      :class="[navClasses]"
      :textWhite="
        this.$store.state.isAbsolute ? 'text-white opacity-8' : 'text-white'
      "
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar&&this.$route.name!='Result'"
    />
    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
// import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  watch:{
    $route: {
      imemediate:true,
      handler(to){
        document.title = process.env.VUE_APP_TITLE + '-' + to.name || process.env.VUE_APP_TITLE
      },
      
    }
  },
  components: {
    Sidenav,
    // Configurator,
    Navbar,
    AppFooter
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"])
  },
  computed: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && !this.$store.state.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && this.$store.state.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4": !this.$store.state.isAbsolute
      };
    }
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    this.$store.dispatch("getLabTests");
    this.$store.dispatch("getTestContents");
    this.$store.dispatch("getTestUnit")
    this.$store.dispatch("getPatients")
    this.$store.dispatch("getDiagnosticResults")
    this.$store.dispatch("getPathologist");
    this.$store.dispatch("getMedtech")
  }
};

</script>
