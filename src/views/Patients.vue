<template>
  <div class="py-4 container-fluid">
    <div class="card">
        <div class="card-header pb-0">
            <h6>Patients</h6>
            <div class="col-12">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i
              class="fa fa-plus text-white text-lg opacity-10"
            ></i>  <span class="ml-5">Add Patients</span>
                </button>
            </div>
        </div>
        <div class="card-body px-0 pt-0 pb-3 mt-5">
            <div class="table-responsive p-0 mx-5">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Full Name</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                            >Age</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                            >Gender</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                            >Date of Birth</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                            >Address</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                            >Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="this.$store.state.patients.length<=0">
                            <td colspan="6"><p class="text-center"> No Data </p> </td>
                        </tr>
                            <tr v-else v-for="(item) in this.$store.state.patients" :key="item.fullname">
                                <td>{{item.fullname}}</td>
                                <td>{{item.age}}</td>
                                <td>{{item.gender}}</td>
                                <td>{{item.birthdate}}</td>
                                <td>{{item.address}}</td>
                                <td>  <button type="button" class="btn btn-danger" v-on:click="removeUnit(item)">Remove</button></td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Patient</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
        <div class="row">
            <div class="col-12">
                <div class="form-floating mb-3">
                    <input type="text" autocomplete="off" class="form-control" id="fullname" placeholder="Full Name" v-model="fullname">
                    <label for="fullname">Full Name</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="date" autocomplete="off" class="form-control" id="birthday" placeholder="Select Date" v-model="birthdate">
                    <label for="birthday">Birth Date</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <select class="form-select" aria-label="Default select example" v-model="gender">
                        <option selected disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label for="fullname">Gender</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating mb-3">
                    <input type="text" autocomplete="off" class="form-control" id="address" placeholder="Address" v-model="address">
                    <label for="address">Address</label>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer mt-3">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" v-on:click="addPatient" data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name:"Patients",
    methods:{
        addPatient(){
            let newPatient = {}
            newPatient.fullname =this.fullname
            newPatient.birthdate = this.birthdate
            newPatient.gender = this.gender
            newPatient.address = this.address
       

       this.$store.commit("addPatients",newPatient)

   
        }

    },
    data(){
        return {
            fullname:'',
            birthdate: '',
            gender:'',
            address:''
        }
    }

}
</script>

<style>

</style>