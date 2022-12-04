<template>
  <div class="py-4 container border mt-2">
    <div class="d-flex justify-content-center"><img class="logo" src="@/assets/img/excell-lab.png" width="250" alt=""/></div>
    
    <h2 class="text-center mt-2 mb-0 header">EXCELLAB DIAGNOSTIC CENTER</h2>
    <h5 class="text-center mt-0 mb-0 subheader">"Quality Matters"</h5>
    <p class="text-center mt-2 mb-0 ">JTL Bldg. Daang Maharlika, Brgy. Lanao</p>
    <p class="text-center mt-0 mb-5 ">Kidapawan City</p>
    <div class="row border-top p-2 mt-5">
      <div class="col-4">
        <span>Patient Name: {{this.currentResult.patient.fullname}}</span> 
      </div>
      <div class="col-2">
        <span>Age:    {{this.currentResult.patient.age}} </span>
        
      </div>
      <div class="col-2">
        <span>Gender: {{this.currentResult.patient.gender}} </span>
      </div>
      <div class="col-4">
        <span>Address: {{this.currentResult.patient.address}} </span>
      </div>
    </div>
    <div class="row mt-0 border-top border-bottom p-2">
      <div class="col">
        <span>Lab Request: {{this.currentResult.labRequest.name}} </span>
      </div>
      <div class="col">
        <span>Lab Request Code: {{this.currentResult.labRequest.code}} </span>
      </div>
      <div class="col">
        <span>Result Date: {{this.currentResult.requestedDate}} </span>
      </div>
    </div>
    <h4 class="text-center mt-5 header-result">Results</h4>
    <div class="row ">
      <div class="table-responsive p-2 mx-2 mb-5">
            <table class="table align-items-center mb-0">
            <thead>
                <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Content</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Result</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Ref Range</th>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Unit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in this.currentResult.testContents" :key="item">
                    <td>{{item.content}}</td>
                    <td ><span>{{item.result}}</span></td>
                    <td>{{item.defaultValue}}</td>
                    <td>
                       {{item.unit}}
                    </td>
                    
                </tr>
                <tr v-if="this.$store.state.units.length<=0">
                    <td colspan="3"><p class="text-center"> No Data </p> </td>
                </tr>
                </tbody>
                </table>
                </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-end mb-0 mr-5 ">
             <div> <span> Note: &nbsp; &nbsp;  </span></div>
             <div><span>{{currentResult.note==''?'None': currentResult.note}}</span></div>
            
        </div>
        <div class="col-12 d-flex justify-content-center mb-0">
            <div class="row" >
              <div class="col-6 d-flex justify-content-end" v-if="getPathologist!=undefined">
                <div class="row">
                  <div class="col-12 d-flex justify-content-end">
                    <img class="img-fluid signature" :src="getPathologist.signatureImage" alt="">
                  </div>
                  <div class="col-12 d-flex justify-content-end">
                     
                <span >{{getPathologist.name}}</span>
                  </div>
                  <div class="col-12 d-flex justify-content-end">
                     
                     <span >License #: {{getPathologist.license}}</span>
                       
                </div>
                  <div class="col-12 d-flex justify-content-end">
                     
                     <span >Pathologist</span>
                       </div>
                </div>
               
              </div>
              <div class="col-6 "  v-if="getMedtech!=undefined">
                <div class="row d-flex justify-content-start">
                  <div class="col-12 d-flex justify-content-start">
                    <img class="img-fluid signature" :src="(getMedtech.signatureImage==null?require('@/assets/img/blank.jpg'):getMedtech.signatureImage)">
                  </div>
                  <div class="col-12 d-flex justify-content-start">
                     
                <span >{{getMedtech.name}}</span>
                  </div>
                  <div class="col-12 d-flex justify-content-start">
                     
                     <span >License #: {{getMedtech.license}}</span>
                       
                </div>
                  <div class="col-12 d-flex justify-content-start">
                     
                     <span >Medical Technologist</span>
                       </div>
                </div>
               
              </div>
            </div>
            
        </div>
            <div class="col d-flex justify-content-start qr">
              
              <VueQRCodeComponent class="qrImg" :text="this.currentLink" size=100 ></VueQRCodeComponent>
            </div>
        </div>
  </div>
</template>

<script>
import { getDoc,doc } from "firebase/firestore"
import VueQRCodeComponent from 'vue-qrcode-component'
import db from '../firebase/init.js'
export default {
  components:{
  VueQRCodeComponent
},

   async beforeMount(){
    console.log(this.getMedtech)
    let id = this.$route.params.id
    
    const docSnap = await getDoc(doc(db, 'DiagnosticResults', id))
        

        if(docSnap.exists())
        {

          let dbData = docSnap.data()
          let result =  dbData
    let currentResult = {}
    let note = result.note
    let date = result.requestedDate
    currentResult.pathologist = result.pathologist
    currentResult.medtech = result.medtech
    let testContents = result.testContents
    currentResult.patient = {
      fullname: result.patient,
      age: 'N/A',
      gender: 'N/A',
      address: 'N/A'
    }
     this.$store.state.patients.forEach(element => {
      if(element.fullname==result.patient)
       {
          let nowDate = new Date(Date.now())
          let birthdate = new Date(element.birthdate)
          let age = nowDate.getFullYear() - birthdate.getFullYear()
          if( nowDate.getMonth() <= birthdate.getMonth() )
          {
            
                  age -= 1
              
            
          }
          element.age = age
          currentResult.patient = element
       }
  

     this.$store.state.labTest.forEach((element)=>{
      if(element.name==result.labRequest){
        currentResult.labRequest = element
      }
    })
    currentResult.note = note
    currentResult.requestedDate = date
    currentResult.testContents = testContents
    this.currentResult = currentResult
    console.log("currentResult",currentResult.testContents)
    console.log("date",date)
   
    })
          
        }
        else
        {
          window.location.assign('/404')
          // this.$router.push('/404')
        }
  
     
    
  },
  computed:{
    getPathologist()
    {
      console.log(this.currentResult.pathologist)
      let result = {
        name:'-',
        license:'-',
        signatureImage:''
      }
      if(this.$store.getters.getPathologistByName(this.currentResult.pathologist)!=null)
      {
        result=this.$store.getters.getPathologistByName(this.currentResult.pathologist);
      }
      return result
    },
    getMedtech()
    {
      console.log(this.currentResult.medtech)
      let result = {
        name:'-',
        license:'-',
        signatureImage:''
      }
      if(this.$store.getters.getMedtechByName(this.currentResult.medtech)!=null)
      {
        result=this.$store.getters.getMedtechByName(this.currentResult.medtech);
      }
      return result
    }
  },
data(){
  return{
    currentLink: window.location.href,
    currentResult : {

    }
  }
}

}
</script>

<style lang="css" scoped>


@media print {
  .container {
    width: fit-content !important;
    height: 100vh;
    margin: 0px !important;
    padding: 0px !important;
   
  }
  .container > * {
    border-style: none;
  }
  .logo{
    width: 100px;
  }
  .header{
    font-size: 20px;
  }
  .subheader{
    font-size: 15px;
  }
  span{
    font-size: 10px;
  }
  .header-result{
    margin: 2px  !important;
    font-size: 15px;
  }
  td{
    font-size: 8px;
  }
  th{
    font-size: 10px !important;
  }
  .qr{
    position:fixed;
   left:0px;
   bottom:30px;
   width: 10px !important; 

  }
  p{
    font-size: 12px;
    display: block !important;
  }
  .signature{
    width: 100px !important;
  }
}

span{
  font-weight: bold;
}
p{
  display: none;
}
nav{
  display: none !important;;
}
</style>