<template >
    <div class="py-4 container-fluid">
        <div class="card">
        <div class="card-header pb-0">
            <h6>Pathologist</h6>
            <div class="col-12">
                <button @click="resetData" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i
              class="fa fa-plus text-white text-lg opacity-10"
            ></i>  <span class="ml-5">Add New Pathologist</span>
                </button>
            </div>
        </div>
        <div class="card-body px-0 pt-0 pb-3 mt-2">
        </div>
    </div>
    <div class="card mt-5">
        <div class="card-header pb-0">
            <h6>Pathologist List</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-3 mt-2">
            <div class="table-responsive p-0 mx-5">
            <table class="table align-items-center mb-0">
            <thead>
                <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >License Number</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in this.$store.state.pathologist" :key="item">
                    <td>{{item.name}}</td>
                    <td>{{item.license}}</td>
                   
                    <td>
                       <div class="row">
                        <div class="col-lg-2 col-md-4">
                    
                           
                            <button type="button"  class="btn btn-warning" data-bs-toggle="modal" data-bs-placement="bottom" title="Modify" data-bs-target="#exampleModal" @click="UpdateRecord(item)">
                            <i class="fa fa-pencil"></i>
                                
                        </button>
                    
                        </div>
                        <div class="col-lg-2 col-md-4">
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-placement="bottom" data-bs-target="#alert" v-on:click="(removeIndex = item.id)">
                                <i class="fa fa-trash-o"></i>
                               
                        </button>
                        </div>
                        
                       </div>
                    </td>
                    
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

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-dialog  modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Pathologist</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
        <div class="row">
            <div class="col-6">
                <div class="form-floating mb-3">
                    <input v-model="this.name" autocomplete="off" class="form-control" id="nameInput" placeholder="Type to search...">
                    <label for="nameInput">Name</label>
                </div>
            </div>
            <div class="col-6">
                <div class="form-floating mb-3">
                    <input v-model="this.license" autocomplete="off" class="form-control" id="licenseInput" placeholder="Type to search...">
                    <label for="licenseInput">License</label>
                </div>
            </div>
        </div>
        <div class="row">
          <div class="col-12">
            <label for="inputFileValue" class="form-label">Signature</label>
            <input @change="fileUpload" class="form-control" type="file" id="inputFileValue" accept="image/png, image/jpeg">
          </div>
          <div class="col-12">
            <img :src="signatureImage" alt="" class="img-thumbnail">
          </div>
        </div>
      </div>
      <div class="modal-footer mt-3">    
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button submit" class="btn btn-primary" v-on:click="saveData" data-bs-dismiss="modal">Save</button>
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
methods:{
    removeRecord(){
    if(this.removeIndex!=null)
    {
      this.$store.dispatch("deleteRecord",{table:"Pathologist",id:this.removeIndex,dispatchName:"getPathologist"})
      this.clearInput
    } },
    deleteRecord(data){
        this.$store.dispatch("deletePathologist",data.id)
    },
UpdateRecord(data){
    let pathologistData = this.$store.getters.getPathologistById(data.id)
    this.mode = 1
    this.editId = data.id
    this.name = pathologistData.name
    this.license = pathologistData.license
    this.signatureImage = pathologistData.signatureImage
},
fileUpload($event){
    console.log($event)
    const fr = new FileReader()
    
  fr.onload = (e)=>{
this.signatureImage =  e.target.result
  }
  fr.readAsDataURL($event.target.files[0])
},
saveData()
{
    let data = new Object
    data.name = this.name
    data.license = this.license
    data.signatureImage = this.signatureImage
    if(this.mode==0)
    {
        this.$store.dispatch('savePathologist',data)
    }
    else
    {
        data.id = this.editId
        this.$store.dispatch('updatePathologist',data)
    }
   this.resetData()
},
resetData(){
    this.mode = 0
    this.editId = null
    this.name='',
    this.license='',
    this.signatureImage=null
}

},
data(){
    return{
        mode:0,
        editId:null,
        name:'',
        license:'',
        signatureImage:null,
        removeIndex:null,

alert:{
  title: "Remove Pathologist",
  message: "Are you sure you want to remove this Pathologist ? "
}
    }
}
}
</script>
<style lang="css">
    
</style>