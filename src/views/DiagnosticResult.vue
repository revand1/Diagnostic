<template>
  <div class="py-4 container-fluid">
    <div class="card">
        <div class="card-header pb-0">
            <h6>Diagnostic Results</h6>
            <div class="col-12">
                <button @click="clearInputs" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i
              class="fa fa-plus text-white text-lg opacity-10"
            ></i>  <span class="ml-5">Add New Diagnostic</span>
                </button>
            </div>
        </div>
        <div class="card-body px-0 pt-0 pb-3 mt-2">
        </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    
    <div class="card">
        <div class="card-header pb-0">
            <h6>Diagnostics</h6>
           
        </div>
        <div class="card-body px-0 pt-0 pb-3 mt-2">
          <b-pagination
      :currrentPage="1"
      :total-rows="10"
      :per-page="10"
      aria-controls="my-table"
    ></b-pagination>
            <div class="table-responsive p-0 mx-5">
             
            <table class="table align-items-center mb-0">
            <thead>
                <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Requester Name</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Lab Request</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Date Requested</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in this.$store.state.diagnosticResults" :key="item">
                    <td>{{item.patient}}</td>
                    <td>{{item.labRequest}}</td>
                    <td>{{item.requestedDate}}</td>
                    <td>
                       <div class="row">
                        <div class="col-2">
                          <a :href=item.link target="_blank">
                           
                            <button type="button"  class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View Result">
                            <i class="fa fa-eye"></i>
                        
                        </button>
                      </a>
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-placement="bottom" title="View Result QR"  data-bs-target="#qrModal" @click="showQr(item.link)">
                            <i class="fa fa-qrcode"></i>
                        </button>
                         </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-danger">
                            <span>Remove</span>
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
        <h5 class="modal-title" id="exampleModalLabel">Add New Diagnostic Result</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
        <div class="row">
            <div class="col-6">
                <div class="form-floating mb-3">
                    <input v-model="this.patient" autocomplete="off" class="form-control" list="contentList" id="contentListInput" placeholder="Type to search...">
                    <datalist id="contentList">
                    <option v-for="(item) in this.$store.state.patients" :key="item" data-value="{{item}}" :value="item.fullname"></option>
                    </datalist>
               
                    <label for="patient">Patient</label>
                </div>
            </div>
            <div class="col-6">
                <div class="form-floating mb-3">
                    <input @change="changeSelection($event)" v-model="this.labRequest" autocomplete="off" class="form-control" list="labRequest" id="labRequestInput" placeholder="Type to search...">
                    <datalist id="labRequest">
                    <option v-for="(item) in this.$store.state.labTest" :key="item.name" :value="item.name"></option>
                    </datalist>
                    <label for="labRequestInput">Lab Request</label>
                </div>
            </div>
            <div class="col-12">
                <div class="table-responsive p-0 mx-5">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Contents</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Unit</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Normal Value</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in this.populatedTestContents" :key="item.content">
                <td>{{item.content}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.defaultValue}}</td>
                <td> <input v-model="this.populatedTestContents[index].result" type="text" autocomplete="off" class="form-control" id="unit" placeholder="Enter Result Value"/></td>
                
            </tr>
            <tr v-if="this.$store.state.units.length<=0">
                <td colspan="3"><p class="text-center"> No Data </p> </td>
            </tr>
            </tbody>
            </table>
            </div>
            </div>
            
        </div>
        <div class="row" v-if="this.labRequest!=''">
          <div class="col-12">
            <label for="exampleFormControlTextarea1" class="form-label">Note:</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="this.resultNotes" ></textarea>
          </div>

          <div class="col mt-3">
            <input v-model="this.pathologist" autocomplete="off" class="form-control" list="pathologistList" id="contentListInput" placeholder="Select Pathologist">
                    <datalist id="pathologistList">
                    <option v-for="(item) in this.$store.state.pathologist" :key="item" data-value="{{item}}" :value="item.name"></option>
                    </datalist>
               
                    <!-- <label for="patient">Patient</label> -->
          </div>
          <div class="col mt-3">
            <input v-model="this.medtech" autocomplete="off" class="form-control" list="medtechList" id="contentListInput" placeholder="Select Medical Technologist">
                    <datalist id="medtechList">
                    <option v-for="(item) in this.$store.state.medtechList" :key="item" data-value="{{item}}" :value="item.name"></option>
                    </datalist>
          </div>
        </div>
      </div>
      <div class="modal-footer mt-3">    
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button submit" class="btn btn-primary" v-on:click="SaveResult" data-bs-dismiss="modal" :disabled="!isValidated">Save</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="qrModal" tabindex="-1" aria-labelledby="qrModalLabel" aria-hidden="true" data-backdrop="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="qrModalLabel">Please Save QR to Image</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
        <div class="row">
            <div class="col d-flex justify-content-center">
              <VueQRCodeComponent :text="this.currentLink"></VueQRCodeComponent>
            </div>
        </div>
      </div>
      <div class="modal-footer mt-3">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { addDoc,collection } from "firebase/firestore"
  import VueQRCodeComponent from 'vue-qrcode-component'
  import db from '../firebase/init.js'
// Vue.component('qr-code', VueQRCodeComponent)


export default {
  name: "DiagnosticResult",
components:{
  VueQRCodeComponent
},
created(){
 this.patients = this.$store.state.patients
 

},
methods:{

  showQr(link)
  {
    this.currentLink = window.location.hostname+link
  },
    changeSelection(){
        let selectedRequest = null
        this.$store.state.labTest.forEach((e)=>{
            if(e.name == this.labRequest)
            {
                selectedRequest = e;
            }
        })

        this.populatedTestContents = selectedRequest.contents

    },
    async SaveResult(){
    let patientExist = false

   
    
    this.$store.state.patients.forEach((e)=>{
            if(e.fullname == this.patient)
            {
              patientExist = true
              
            }
        })
        if(patientExist)
        {
          let result = {}
        result.testContents = this.populatedTestContents
        result.labRequest = this.labRequest
        result.patient = this.patient
        result.note = this.resultNotes
        result.pathologist = this.pathologist
        result.medtech = this.medtech
        var date = new Date();
	      var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	      var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	      var date_time = current_date+" "+current_time;	
        result.requestedDate = date_time
        const colRef = collection(db, 'DiagnosticResults')
        const docRef =  await addDoc(colRef, result)
        result.id = docRef.id
        this.$store.commit("addDiagnosticResult",result)
        this.$store.dispatch("getDiagnosticResults");
        }
        else
        {
          console.log("not Existed")
        }
        
    },
    clearInputs(){
        this.patient=''
      this.labRequest=''
    this.populatedTestContents.forEach((e)=>{
        e.result = ""
    })
    this.populatedTestContents = []
    }
},
computed:{
isValidated()
{
  let result = false
  if(this.patient!=''&&this.labRequest!=''&&this.populatedTestContents.length!=0)
  {
    result = true
  }
  return result
}
},
data(){
    return {
      validated:false,
    patients:[],
    medtech:'',
    currentLink:'Hello World!',
    patient:'',
    pathologist:'',
      labRequest:'',
      populatedTestContents:[],
      resultNotes:''
    }
}
}
</script>

<style>

</style>