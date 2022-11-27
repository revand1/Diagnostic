<template>
  <div class="py-4 container border mt-2">
    <img src="@/assets/img/excell-lab.png" width="250" alt="">
    <h2 class="text-center mt-2 mb-5">EXCELLAB DIAGNOSTIC CENTER</h2>
    <div class="row border-top p-2">
      <div class="col">
        <span>Patient Name: {{this.currentResult.patient.fullname}}</span> 
      </div>
      <div class="col">
        <span>Age:    {{this.currentResult.patient.age}} </span>
        
      </div>
      <div class="col">
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
    <h4 class="text-center mt-5">Results</h4>
    <div class="row ">
      <div class="table-responsive p-2 mx-2 mb-10">
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
            <div class="col-12 d-flex justify-content-start ">
              <VueQRCodeComponent :text="this.currentLink" size="150" ></VueQRCodeComponent>
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
    let id = this.$route.params.id
    
    const docSnap = await getDoc(doc(db, 'DiagnosticResults', id))
        

        if(docSnap.exists())
        {
          let dbData = docSnap.data()
          let result =  dbData
    let currentResult = {}
    let date = result.requestedDate
    let testContents = result.testContents
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
created(){
 


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

span{
  font-weight: bold;
}

</style>