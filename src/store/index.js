import { createStore } from "vuex";
import moment from "moment";
import { query, collection, getDocs, addDoc,updateDoc,doc,getDoc, deleteDoc, orderBy } from "firebase/firestore"
import db from '../firebase/init.js'

export default createStore({

  state: {
    medtechList:[],
    pathologist:[],
    currentUser:null,
    currentResult:null,
    units:[],
    testContents:[],
    labTest:[],
    patients:[],
    diagnosticResults:[],
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: false,
    showMain: true,
    layout: "default"
  },
  mutations: {
    setMedtech(state,payload){
      state.medtechList = payload
    },
    setPathologist(state,payload)
    {
      state.pathologist = payload
    },
    setCurrentResult(state,payload)
    {
      state.currentResult = payload
    },

    addDiagnosticResult(state,payload){
      let newDiagnostiResult = {}
      newDiagnostiResult.id = payload.id
      newDiagnostiResult.link ="/result/"+ newDiagnostiResult.id
      newDiagnostiResult.contents = payload.testContents
      newDiagnostiResult.note = payload.note
      newDiagnostiResult.requestedDate = payload.requestedDate
      state.labTest.forEach((e)=>{
        if(e.name == payload.labRequest)
        {
          newDiagnostiResult.labRequest = e
        }
      })

      

      state.diagnosticResults.push(newDiagnostiResult)
      console.log(newDiagnostiResult)
    },
    setDiagnosticResults(state,payload)
    {
      state.diagnosticResults = payload
    },

    addPatients(state,payload){
      let nowDate = new Date(Date.now())
      let birthdate = new Date(payload.birthdate)
      let age = nowDate.getFullYear() - birthdate.getFullYear()
      if( nowDate.getMonth() <= birthdate.getMonth() )
      {
        
              age -= 1
          
        
      }

      payload.age = age
      state.patients.push(payload)
    },
    setPatients(state,payload){
      state.patients = payload
    },

    addLabtest(state,payload)
    {
      state.labTest.push(payload)
    },
    setLabTests(state,payload){
      state.labTest = payload
    },
    editLabTest(state,{payload,index}){
      console.log("Index "+ index)
      state.labTest[index] = payload
    },
    removeLabTest(state,payload){
      var newLabTest = state.labTest.filter(function(value){
        return value != payload ;
    })
 
    state.labTest = newLabTest;

    },
    addContent(state,payload){
      state.testContents.push(payload);
    },
    setContents(state,payload){
      state.testContents = payload
    },
    removeContent(state,payload){
      var newContents = state.testContents.filter(function(value){
        return value != payload ;
    })
 
    state.testContents = newContents;

    },
    addUnit(state,payload){
      state.units.push(payload)
    },
    setUnits(state,payload){
      state.units = payload
    },
    removeUnit(state,payload){
      var newUnits = state.units.filter(function(value){
        return value != payload ;
    })
 
    state.units = newUnits;

    },
    SetUser(state,payload)
    {
state.currentUser = payload
    },

    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    //Diagnostic Result
    async getDiagnosticResults({commit})
    {
      const docSnap = await getDocs(query(collection(db, 'DiagnosticResults'), orderBy("requestedDate","desc")));
      let data = []
      docSnap.forEach((doc) => {
        let payload = doc.data()
        payload.id = doc.id
        payload.link = '/result/'+doc.id
        data.push(payload)
      })
      commit("setDiagnosticResults",data)
      console.log("result",data)
    
    },
    //Patients
    async getPatients({commit})
    {
      let nowDate = new Date(Date.now())
      const docSnap = await getDocs(query(collection(db, 'Patients')));
      let data = []
      docSnap.forEach((doc) => {
        let payload = doc.data()
        payload.id = doc.id
        let convertedDate = new Date(Date.parse(payload.birthdate))
        payload.birthdate = moment(convertedDate, 'x').format('MM/DD/YYYY')
        let age = nowDate.getFullYear() - convertedDate.getFullYear()
        if( nowDate.getMonth() <= convertedDate.getMonth() )
        {
          
                age -= 1
            
          
        }
        payload.age = age
        data.push(payload)
 
      })
      commit('setPatients',data)
    },
    async savePatient({commit},payload)
    {
      let data = payload
      const colRef = collection(db, 'Patients')
      const docRef =  await addDoc(colRef, payload)
      data.id = docRef.id
      console.log("Payload",data)
      commit('addPatients',data)
    },

    //UNITS
    async getTestUnit({commit})
    {

      const docSnap = await getDocs(query(collection(db, 'TestUnits')));
      let data = []
      docSnap.forEach((doc) => {
        let payload = doc.data()
        payload.id = doc.id
        data.push(payload)
 
      })
    
      commit('setUnits',data)
    },
    async saveTestUnit({commit},payload)
    {
      let data = payload
      const colRef = collection(db, 'TestUnits')
      const docRef =  await addDoc(colRef, payload)
      data.id = docRef.id
      console.log("Payload",data)
      commit('addUnit',data)
      // await this.dispatch("getTestUnit")
    },

     //Contents
     async getTestContents({commit})
     {
     
       const docSnap = await getDocs(query(collection(db, 'TestContents')));
       let data = []
       docSnap.forEach((doc) => {
         let payload = doc.data()
         payload.id = doc.id

         data.push(payload)
  
       })
       commit('setContents',data)
     },
     async saveTestContent({commit},payload)
     {
       let data = payload
       const colRef = collection(db, 'TestContents')
       const docRef =  await addDoc(colRef, payload)
       data.id = docRef.id
       console.log("Payload",data)
       commit('addContent',data)
     },
       //Lab Test
       async getLabTests({commit})
       {
         console.log("Lab Tests");
         const docSnap = await getDocs(query(collection(db, 'LabTests')));
         let data = []
         docSnap.forEach((doc) => {
           let payload = doc.data()
           payload.id = doc.id
  
           data.push(payload)
    
         })
         commit('setLabTests',data)
       },
       async saveLabTest({commit},payload)
       {
         let data = payload
         const colRef = collection(db, 'LabTests')
         const docRef =  await addDoc(colRef, payload)
         data.id = docRef.id
         console.log("Payload",data)
         commit('addLabtest',data)
       },
       async updateLabTest({commit},payload) {
        console.log("Update Lab Payload",payload)
        let labTest = payload.payload
        await updateDoc(doc(db, 'LabTests', labTest.id), {
        
          name: labTest.name,
          code:labTest.code,
          contents:labTest.contents

        })
        const docSnap = await getDocs(query(collection(db, 'LabTests')));
        let data = []
        docSnap.forEach((doc) => {
          let payload = doc.data()
          payload.id = doc.id

          data.push(payload)
   
        })
        commit('setLabTests',data)
      },
      async getCurrentResult({commit},payload)
      {
        const docSnap = await getDoc(doc(db, 'DiagnosticResults', payload))
        let result = docSnap.data()
      
  

        commit('setCurrentResult',result)
      },



      //Pathologist
      async getPathologist({commit})
      {
        const docSnap = await getDocs(query(collection(db, 'Pathologist')));
        let data = []
        docSnap.forEach((doc) => {
          let payload = doc.data()
          payload.id = doc.id
 
          data.push(payload)
   
        })
        commit('setPathologist',data)
      },
      async savePathologist(_,payload)
       {
        console.log(payload)
         let data = payload
         const colRef = collection(db, 'Pathologist')
         const docRef =  await addDoc(colRef, payload)
         data.id = docRef.id
       this.dispatch("getPathologist")
     
       },
       async updatePathologist(_,payload)
       {
        console.log(payload)
         let data = payload
         await updateDoc(doc(db, 'Pathologist', data.id), {
        
          name: data.name,
          license:data.license,
          signatureImage:data.signatureImage

        })
        this.dispatch("getPathologist")
     
       },
       async deletePathologist(_,id)
       {
        await deleteDoc(doc(db, 'Pathologist', id))
        this.dispatch("getPathologist")
       },

       async deleteRecord(_,{table,id,dispatchName})
       {
        console.log('table',table)
        console.log('id',id)
        await deleteDoc(doc(db, table, id))
        this.dispatch(dispatchName);
    
       },




        //Medtech
      async getMedtech({commit})
      {
        const docSnap = await getDocs(query(collection(db, 'Medtech')));
        let data = []
        docSnap.forEach((doc) => {
          let payload = doc.data()
          payload.id = doc.id
 
          data.push(payload)
   
        })
        commit('setMedtech',data)
      },
      async saveMedtech(_,payload)
       {
        console.log(payload)
         let data = payload
         const colRef = collection(db, 'Medtech')
         const docRef =  await addDoc(colRef, payload)
         data.id = docRef.id
       this.dispatch("getMedtech")
     
       },
       async updateMedtech(_,payload)
       {
        console.log(payload)
         let data = payload
         await updateDoc(doc(db, 'Medtech', data.id), {
        
          name: data.name,
          license:data.license,
          signatureImage:data.signatureImage

        })
        this.dispatch("getMedtech")
     
       },
       async deleteMedtech(_,id)
       {
        await deleteDoc(doc(db, 'Medtech', id))
        this.dispatch("getMedtech")
       }
  },
  getters: {
    getLabtestByValue:(state)=>(value)=>{
      console.log("Contents",state.labTest)
      return state.labTest.indexOf(value)
    },
    getPathologistById: (state) => (id) => {
      return state.pathologist.find(pathologist => pathologist.id === id)
    },
    getPathologistByName: (state) => (name) => {
      return state.pathologist.find(data => data.name === name)
    },
    getMedtechById: (state) => (id) => {
      return state.medtechList.find(pathologist => pathologist.id === id)
    },
    getMedtechByName: (state) => (name) => {
      return state.medtechList.find(data => data.name === name)
    },
  }
});
