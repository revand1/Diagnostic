<template>
   <div class="py-4 container-fluid">
    
    <div class="card">
        <div class="card-header pb-0">
        <h6>Test Unit</h6>
        <div class="col-12">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="clearInput">
                Add Unit
            </button>
        </div>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0 mx-5">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Unit</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Code</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in this.$store.state.units" :key="item.unit">
                <td>{{item.unit}}</td>
                <td>{{item.code}}</td>
                <td>  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#alert" v-on:click="(removeIndex = item.id)">Remove</button></td>
                
            </tr>
            <tr v-if="this.$store.state.units.length<=0">
                <td colspan="3"><p class="text-center"> No Data </p> </td>
            </tr>
            </tbody>
            </table>
            </div>
        </div>
    </div>
   </div>

   <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Test Unit</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" autocomplete="off" class="form-control" id="unit" placeholder="Unit" v-model="unit">
                    <label for="unit">Unit</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" autocomplete="off" class="form-control" id="code" placeholder="Code" v-model="code">
                    <label for="code">Code</label>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer mt-3">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" v-on:click="addUnit">Save</button>
      </div>
    </div>
  </div>
</div>

<div class="modal" id="alert" tabindex="-1" aria-labelledby="alertLabel" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="alert">{{alert.title}}</h5>

      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-12">
              {{alert.message}}
            </div>
        </div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" v-on:click="removeRecord()">Yes</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>

export default {
  
name: "testunit",
created(){
  this.$store.dispatch("getTestUnit")
 
},
methods:{

  removeRecord(){
    if(this.removeIndex!=null)
    {
      this.$store.dispatch("deleteRecord",{table:"TestUnits",id:this.removeIndex,dispatchName:"getTestUnit"})
      this.clearInput
    }

  },
  
    addUnit(){
        if(this.unit != "" || this.code != ""){
          this.$store.dispatch("saveTestUnit",{unit:this.unit,code:this.code})
            // this.$store.commit("addUnit",{unit:this.unit,code:this.code})
    
          this.clearInput()
        }
    },
    removeUnit(data){
        this.$store.commit("removeUnit",data)
    },
    closeAlert(){
        this.alert = false;
    },
    clearInput(){
      this.unit = ""
        this.code =""
        this.alert = true
        this.removeIndex = null
    },
},
data(){
    return{
     
        unit:"",
        code:"",

        removeIndex:null,

        alert:{
          title: "Remove Unit",
          message: "Are you sure you want to remove this Unit ? "
        }
    }
}




}
</script>

<style >

</style>


