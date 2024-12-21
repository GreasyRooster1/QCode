import {ProjectType,RunErrCallback} from "./projectType.js";
import {getCode,setupEvents as setupExecEvents,logNames,runCode,frameContent} from "../executionHelper.js"

class JavascriptType extends ProjectType {
    constructor() {
        super(true);
    }

    setupEditor(): void {
        setupExecEvents(()=>{
            runCode(getCode())
        },this.runErrorCallback);
    }

    onLoad(){
        writeToEditor(this.projectData!["code"]);
    }

    saveCode(){
        let code = getCode();
        let user = getStoredUser();
        database.ref("userdata/"+user.uid+"/projects/"+this.projectId+"/code").set(code);
        database.ref("userdata/"+user.uid+"/projects/"+this.projectId+"/dateUpdated").set(Date.now()/1000);
        if(this.hasLesson) {
            console.log(this.highestViewedStep)
            database.ref("userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep").set(this.highestViewedStep);
            database.ref("userdata/"+user.uid+"/projects/"+this.projectId+"/currentChapter").set(this.currentChapter);
        }

    }

    run(errorCallback:RunErrCallback) {
        console.log(frameContent)
        frameContent?.location.reload();
    }

    stop(){

    }

    runErrorCallback(content: string, type: string): void {
        let logEl = document.createElement("console-log");
        let consoleOut = document.querySelector(".console-output-pane")
        logEl.setAttribute("type", type);
        logEl.setAttribute("message", content);
        logEl.setAttribute("head", logNames[type]);
        consoleOut!.insertBefore(logEl,consoleOut!.firstChild);
    }
}


export {JavascriptType};