<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                
                    <div class="form-floating mb-3">
                    
                    <input type="email" autocomplete="off" class="form-control" id="email" placeholder="Email" v-model="email">
                    <label for="unit">Email</label>
            
                    </div>
                    <div class="form-floating mb-3">
                    
                    <input type="password" autocomplete="off" class="form-control" id="password" placeholder="Password" v-model="password">
                    <label for="unit">Password</label>
            
                    </div>

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="Signin"
                      >Sign in</argon-button>
                    </div>
              
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden sideImg"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <div class="row">
            <div class="col-12 d-flex justify-content-center ">
              <img src="@/assets/img/excell-lab.png" alt="">
            </div>
        </div>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >EXCEL LAB DIAGNOSTIC CENTER</h4>
                <p
                  class="text-white position-relative"
                >"Quality Matters"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { doc,getDoc } from "firebase/firestore"
import db from '../firebase/init.js'
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonButton,
  },
  methods:{
async Signin(){
  console.log("click")
  const docSnap = await getDoc(doc(db, 'Users', 'admin@excellab.com'))
  console.log(this.email)
  console.log(this.password)
    if(this.email==docSnap.data().email && this.password==docSnap.data().password)
    {
      this.$store.commit("SetUser",docSnap.data())
      this.$router.push('/')
    }
    else
    {
      console.log('Account not found')
    }
  }

},

  data(){
return {
  email:'',
  password:''
}
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};

</script>
<style lang="css" scoped>
.sideImg{
  background-size:auto;
}
</style>
