<template>
  <div class="py-4 container-fluid">
  <div class="card">
       <div class="card-header pb-0"> 
        <h6>Lab Test</h6>
        <div class="col-12">
            <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" autocomplete="off" class="form-control" id="unit" placeholder="Unit" v-model="this.newTestName">
                    <label for="unit">Test Name</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" autocomplete="off" class="form-control" id="code" placeholder="Code" v-model="this.newTestCode">
                    <label for="code">Test Code</label>
                </div>
            </div>
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Content
            </button>
        </div>
        </div>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0 mx-5">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Content</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Unit</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Normal Value</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in this.newTestContent" :key="item.content">
                <td>{{item.content}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.defaultValue}}</td>
                <td>  <button type="button" class="btn btn-danger" v-on:click="removeUnit(item)">Remove</button></td>
                
            </tr>
            <tr v-if="this.newTestContent.length<=0">
                <td colspan="3"><p class="text-center"> No Data </p> </td>
            </tr>
            </tbody>
            </table>
            </div>
            <div class="container mt-5">
                <div class="row justify-content-end">
                <div class="col-auto">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Clear</button>
                    
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-primary" v-on:click="SaveNewLabTest">Save</button>
                </div>


            </div>
            </div>
           
        </div>
    </div>

    <div class="mt-5">
        <div class="card">
        <div class="card-header pb-0">
        <h6>Lab Test List</h6>
        <div class="col-12">
        </div>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0 mx-5">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lab Test Name</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Lab Test Code</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Content Counts</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in this.$store.state.labTest" :key="item">
              
                <td>{{item.name}}</td>
                <td>{{item.code}}</td>
                <td>{{item.contents.length}}</td>
                <td> <button type="button" class="btn btn-success" v-on:click="EditLabTest(item,index)">Edit</button> <button type="button" class="btn btn-danger" v-on:click="removeUnit(item)">Remove</button></td>
                
            </tr>
            <tr v-if="this.$store.state.labTest.length<=0">
                <td colspan="3"><p class="text-center"> No Data </p> </td>
            </tr>
            </tbody>
            </table>
            </div>
        </div>
    </div>
    </div>
</div>    
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Lab Contents</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-12">
                <div class="form-floating mb-3">
                  
                    <input v-model="this.newContent" autocomplete="off" class="form-control" list="contentList" id="contentListInput" placeholder="Type to search...">
                    <datalist id="contentList">
                    <option v-for="(item) in this.$store.state.testContents" :key="item" :value="item.content"></option>
                    </datalist>
                    <label for="contentList">Content</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                  
                    <input class="form-control" autocomplete="off" v-model="this.newUnit" list="unitList" id="unitListInput" placeholder="Type to search...">
                    <datalist id="unitList">
                    <option v-for="(item) in this.$store.state.units" :key="item" :value="item.code">{{item.unit}}</option>
                    </datalist>
                    <label for="unitList">Unit</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" v-model="this.newDefaultValue" autocomplete="off" class="form-control" id="code" placeholder="Normal Value" >
                    <label for="code">Normal Value</label>
                </div>
            </div>
        </div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" v-on:click="addNewTestContent">Save</button>
      </div>
    </div>
  </div>
</div>


  
</template>

<script>

export default {
    name:"LabTest",
    created(){
      this.$store.dispatch("getLabTests")
    },
    methods:{
        SaveNewLabTest(){
            let newTest = {
                id: this.editId,
                name: this.newTestName,
                code:this.newTestCode,
                contents:this.newTestContent
            }
           
            if(this.editIndex == null){
                this.$store.dispatch("saveLabTest",newTest)
            }
            else if(this.editIndex!== null){
                // this.$store.commit("editLabTest",{payload:newTest,index:this.editIndex})
                this.$store.dispatch("updateLabTest",{payload:newTest,index:this.editIndex})
            }
            this.editIndex = null
            this.newTestName = ""
            this.newTestCode=""
            this.newTestContent=[]
        },
        EditLabTest(value,index){
            console.log("Edit Index " + index)
            this.editIndex = index
            this.editId = value.id
            this.newTestName = value.name
            this.newTestCode = value.code
            this.newTestContent = value.contents
        },
        addNewTestContent(){
            let newTestContent = {
                content: this.newContent,
                unit: this.newUnit,
                defaultValue: this.newDefaultValue
            }
            this.newTestContent.push(newTestContent)
        }
    },
    data(){
        return{
            newTestName:"",
            newTestCode:"",
            newTestContent:[],
            newContent:"",
            newUnit:"",
            newDefaultValue:"",
            editIndex: null,
            editId:""
        }
    }

}
</script>

<style>

</style>