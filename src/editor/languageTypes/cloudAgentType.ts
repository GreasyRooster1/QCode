//arduino.work
import {ProjectType, RunErrCallback} from "./projectType";
import {frame, frameContent, getCode, logNames, runCode, setupEvents as setupExecEvents, stopFrame} from "../executionHelper";
import {Language} from "../codeEditor";
import {getStoredUser} from "../../api/auth";
import {ref, set} from "firebase/database";
import {db} from "../../api/firebase";
import {writeToEditor} from "../utils/loadUtils";
import {clearConsole} from "../codeExecution";
import {defaultCodeArduino, defaultCodeJs} from "../../api/util/code";
import {establishAgentConnection, GlobalServerStatus} from "../utils/cloudAgentAPI";

const possibleStatuses = ["not-connected","connected","ok","write","compile","upload","execute","deserialize"];

abstract class CloudAgentType extends ProjectType {
    executionStatus: string;
    failedExecution: boolean;
    statusDisplay:HTMLDivElement | undefined;
    statusText:HTMLDivElement | undefined;

    constructor() {
        super(false);
        this.executionStatus = "not-connected";
        this.failedExecution = false;
    }

    setupEditor(): void {
        document.querySelector(".console-head")?.setAttribute("style","");
        document.querySelector(".console-log-area")?.setAttribute("style","flex-direction:column");
        this.statusDisplay = document.querySelector(".output-head")?.appendChild(document.createElement('div'));
        this.statusText = document.querySelector(".output-head")?.appendChild(document.createElement('div'));
        this.statusDisplay?.classList.add("status-display");
        this.statusText?.classList.add("status-text");
        this.updateStatusDisplay()
    }

    onLoad(){
        writeToEditor(this.projectData!["code"]);
        this.setupConnection();
    }

    setupConnection():void{
        establishAgentConnection(3).then(status => {
            if(status==GlobalServerStatus.Connected) {
                this.statusText!.innerHTML="Connected";
                this.setExecStatus("connected")
                this.setupAgentConnection()
            }
            if(status==GlobalServerStatus.IncorrectVersion) {
                this.statusText!.innerHTML="Incorrect Agent Version";
                this.setExecStatus("not-connected")
            }
            if(status==GlobalServerStatus.Failed) {
                this.statusText!.innerHTML="Failed to connect";
                this.setExecStatus("not-connected")
            }
        });
    }

    runErrorCallback(content: string, type: string): void {
        this.appendLog(content,type);
    }

    setExecStatus(status:string) {
        this.executionStatus = status;
        this.failedExecution = false;
        this.updateStatusDisplay()
    }
    failExec(){
        this.failedExecution = true;
        this.updateStatusDisplay()
    }
    updateStatusDisplay(){
        for(let p of possibleStatuses) {
            this.statusDisplay?.classList.remove(p)
            this.statusText?.classList.remove(p)
        }
        this.statusDisplay?.classList?.add(this.executionStatus);
        this.statusText?.classList?.add(this.executionStatus);
        let txt = "";
        if(this.failedExecution){
            if(this.executionStatus == "ok"){
                txt = "Failed"
            }
            if(this.executionStatus == "write"){
                txt = "Failed to write sketch"
            }
            if(this.executionStatus == "compile"){
                txt = "Failed to compile sketch"
            }
            if(this.executionStatus == "upload"){
                txt = "Failed to upload sketch"
            }
            if(this.executionStatus == "not-connected"){
                txt = "Agent not connected"
            }
        }else{
            if(this.executionStatus == "ok"){
                txt = "Success!"
            }
            if(this.executionStatus == "connected"){
                txt = "Connected!"
            }
            if(this.executionStatus == "write"){
                txt = "Writing..."
            }
            if(this.executionStatus == "compile"){
                txt = "Compiling..."
            }
            if(this.executionStatus == "upload"){
                txt = "Uploading..."
            }
            if(this.executionStatus == "not-connected"){
                txt = "Agent not connected"
            }
            if(this.executionStatus == "deserialize"){
                txt = "Deserializing..."
            }
            if(this.executionStatus == "execute"){
                txt = "Executing..."
            }
        }
        this.statusText!.innerHTML = txt;
    }

    //Abstract methods

    abstract setupAgentConnection():void;

}

export {CloudAgentType};
