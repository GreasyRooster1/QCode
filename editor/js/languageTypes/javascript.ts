import {ProjectType,RunErrCallback} from "./projectType.js";
import {getCode,setupEvents as setupExecEvents,logNames,runCode,frameContent,frame,stopFrame} from "../executionHelper.js"

// @ts-ignore
import { javascript } from "codemirror/lang-javascript/dist/index.js"
// @ts-ignore
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

class JavascriptType extends ProjectType {
    constructor() {
        super(false);
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
        if(frameContent==undefined){
            frame?.contentWindow?.location?.reload()
        }
        frameContent?.location.reload()
        clearConsole()
    }

    stop(){
        stopFrame();
        clearConsole()
    }

    runErrorCallback(content: string, type: string): void {
        let logEl = document.createElement("console-log");
        let consoleOut = document.querySelector(".console-output-pane")
        while(consoleOut!.children.length > 100){
            consoleOut!.children[consoleOut!.childElementCount-1].remove()
        }
        logEl.setAttribute("type", type);
        logEl.setAttribute("message", content);
        logEl.setAttribute("head", logNames[type]);
        consoleOut!.insertBefore(logEl,consoleOut!.firstChild);

    }

    getLanguage():string {
        return "javascript";
    }
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-output-pane")
    consoleOut!.innerHTML = "";
}

export {JavascriptType};