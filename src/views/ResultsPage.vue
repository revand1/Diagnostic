<template>
  <div class="border container" id="container">
    <div class="d-flex justify-content-center"><img class="logo" src="@/assets/img/excell-lab.png" width="250" alt=""/></div>
    <h2 class="text-center mt-2 mb-0" id="title">EXCELLAB DIAGNOSTIC CENTER</h2>
    <h5 class="text-center mt-0 mb-0 " id="subheader">"Quality Matters"</h5>
    <p class="text-center mt-0 mb-0 " id="subheader">JTL Bldg. Daang Maharlika, Brgy. Lanao</p>
    <p class="text-center mt-0 mb-5 " id="address">Kidapawan City</p>
    <div>
    <!-- SOURCE
    <div id="printMe">
      <h1>Print me!</h1>
    </div>
    OUTPUT -->
    <!-- <button @click="print"></button> -->
  </div>
    <div class="row border-top p-2" >
      
      <div class="col">
        <span>Patient Name: {{this.currentResult.patient.fullname}}</span> 
      </div>
      <div class="col-1">
        <span>Age:    {{ isNaN(this.currentResult.patient.age) ?"-": this.currentResult.patient.age}} </span>
        
      </div>
      <div class="col-2">
        <span>Gender: {{this.currentResult.patient.gender}} </span>
      </div>
      <div class="col">
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
    <h4 class="text-center mt-5 resultLabel">Results</h4>
    <div class="row " >
      <div :class="this.currentResult.testContents.length > 12?'col-6 ':'col-12 '" v-for="parent_index in Math.ceil(this.currentResult.testContents.length/12)" :key="parent_index">
        <div class="mb-2" style="overflow:hidden;">
            <table  class="table table-responsive table-bordered mb-0" cellspacing="0">
            <thead>
                <tr>
                <th scope="col" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Content {{ parent_index }}</th>
                <th
                scope="col"
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Result</th>
                <th
                scope="col"
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Ref Range</th>
                <th
                scope="col"
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >Unit</th>
                
                </tr>
                
            </thead>
            <tbody>
              <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                <tr v-for="(item) in Array.from(this.currentResult.testContents).filter((value,index)=> index+1 > (parent_index*12)-12 && index+1 <= parent_index*12 )" :key="item" >
                    <td id="data">{{item.content}}</td>
                    <td id="data"><span>{{item.result}}</span></td>
                    <td id="data">{{item.defaultValue}}</td>
                    <td id="data">
                       {{item.unit}}
                    </td>
                    
                </tr>
                <tr v-if="this.currentResult.testContents.length<=0">
                    <td colspan="3"><p class="text-center"> No Data </p> </td>
                </tr>
                </tbody>
                </table>
                </div>
      </div>
     
    </div>
    <div class="row mt-0">
      <div class="col-12 d-flex justify-content-end mb-0 mr-5 ">
             <div> <span> Note: &nbsp; &nbsp;  </span></div>
             <div><span>{{currentResult.note==''?'None': currentResult.note}}</span></div>
            
        </div>
        <div class="col-12 d-flex justify-content-start ">
              <VueQRCodeComponent id="qr" :text="this.currentLink" :size=100 ></VueQRCodeComponent>
              <VueQRCodeComponent id="qr-sm" :text="this.currentLink" :size=60 ></VueQRCodeComponent>
            </div>
        <div class="col-12 d-flex justify-content-center mb-0">
            <div class="row mt-0" >
              
              <div class="col-6 d-flex justify-content-center" v-if="getPathologist!=undefined">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <img class="img-fluid signature" :src="getPathologist.signatureImage" alt="">
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                     
                <span >{{getPathologist.name}}</span>
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                     
                     <span >License #: {{getPathologist.license}}</span>
                       
                </div>
                  <div class="col-12 d-flex justify-content-center">
                     
                     <span >Pathologist</span>
                       </div>
                </div>
               
              </div>
              <div class="col-6 "  v-if="getMedtech!=undefined">
                <div class="row d-flex justify-content-center">
                  <div class="col-12 d-flex justify-content-center">
                    <img class="img-fluid signature" :src="(getMedtech.signatureImage==null?require('@/assets/img/blank.jpg'):getMedtech.signatureImage)">
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                     
                <span >{{getMedtech.name}}</span>
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                     
                     <span >License #: {{getMedtech.license}}</span>
                       
                </div>
                  <div class="col-12 d-flex justify-content-center">
                     
                     <span >Medical Technologist</span>
                       </div>
                </div>
               
              </div>
            </div>
            
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
created(){
  window.addEventListener('resize', this.onResize)


},
beforeUnmount() {
  window.removeEventListener('resize', this.onResize)
},
methods:{
  onResize() {
    if (window.innerWidth > 960) {
      this.qr_size = 50
    } else {
      this.qr_size = 10
    }
  }
},
data(){
  return{
    qr_size:50,
    output:null,
    currentLink: window.location.href,
    currentResult : {

    }
  }
}

}
</script>

<style lang="css" scoped>
@media print{


  img{
    width: 100px !important;
  }
 .container{
  overflow: hidden;
  height: 5.8465in !important;
  font-size: 8px !important;
  margin: 0px !important;
 }
 th{
  font-size: 8px !important;
  padding: 2px !important;
 }
#data{
  font-size: 8px !important;
  padding: 1px !important;
}
#title{
  font-size: 15px;
  margin: opx !important;
}
#subheader{
  font-size: 8px !important;
}

#address{
  font-size: 8px !important;
  margin-bottom: 2px !important;
}

#qr-sm{
display: block !important;
}

#qr{
display: none !important;
}


.resultLabel{
  font-size: 10px;
  margin-top: 5px !important;
  margin-bottom: 3px !important;
}
 /* td{
  font-size: 7px !important;
} */
}

table{
  border-color: gainsboro;
}

td{
  font-size: 12px !important;
}

#qr-sm{
display: none;
}

span{
  font-weight: bold;
}

</style>