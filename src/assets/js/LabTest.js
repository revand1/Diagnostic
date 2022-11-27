export default class LabTestClass{
    constructor(){
        this.testname = ""
        this.testcode = ""
        this.contents = []
    }

    get TestName(){
        return this.testname;
    }
    set TestName(value){
        this.testname = value
    }

    get TestCode () { this.testcode}

    set TestCode(value){
        this.testcode = value
    }

    addContents(value){
        this.contents.push(value)
    }


}
