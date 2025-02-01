//arduino.work
import {ProjectType, RunErrCallback} from "../projectType";
import {frame, frameContent, getCode, logNames, runCode, setupEvents as setupExecEvents, stopFrame} from "../../executionHelper";
import {Language} from "../../codeEditor";
import {getStoredUser} from "../../../api/auth";
import {ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {writeToEditor} from "../../utils/loadUtils";
import {startSketchServer, Sketch} from "./arduino-api";

const possibleStatuses = ["not-connected","ok","write","compile","upload"];

class ArduinoType extends ProjectType {
    sketch: Sketch | undefined;
    executionStatus: string;
    failedExecution: boolean;
    statusDisplay:HTMLDivElement | undefined;
    statusText:HTMLDivElement | undefined;

    constructor() {
        super(false);
        this.executionStatus = "not connected";
        this.failedExecution = true;
    }

    setupEditor(): void {
        document.querySelector(".console-head")?.setAttribute("style","");
        this.statusDisplay = document.querySelector(".output-head")?.firstElementChild?.appendChild(document.createElement('div'));
        this.statusText = document.querySelector(".output-head")?.firstElementChild?.appendChild(document.createElement('div'));

    }

    onLoad(){
        writeToEditor(this.projectData!["code"]);
        startSketchServer(this.projectId!).then(sketch=>{
            this.sketch = sketch;
            this.executionStatus = "ok"
        });
        document.querySelector(".canvas-output-pane")?.remove()
        document.querySelector(".stop-button")?.remove()
    }

    saveCode(){
        let code = getCode();
        let user = getStoredUser();
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/code"),code);
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/dateUpdated"),Date.now()/1000);
        if(this.hasLesson) {
            console.log(this.highestViewedStep)
            set(ref(db,"userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep"),this.highestViewedStep);
            set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/currentChapter"),this.chapterNum);
        }

    }

    run(errorCallback:RunErrCallback) {
        if(this.sketch==null){
            return;
        }
        this.setExecStatus("write");
        this.sketch?.writeCode(getCode())?.then(()=> {
            this.setExecStatus("compile");
            this.sketch?.compile().then(()=> {
                this.setExecStatus("upload");
                this.sketch?.upload().then(()=>{
                    this.setExecStatus("ok");
                }).catch(e => {
                    this.failExec()
                });
            }).catch(e => {
                this.failExec()
            });
        }).catch(e => {
            this.failExec()
        })
    }

    stop(){
        stopFrame();
        clearConsole()
    }

    runErrorCallback(content: string, type: string): void {
        this.appendLog(content,type);

    }

    getLanguage():Language {
        return "c++";
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
        this.statusDisplay.classList.remove()
    }
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-output-pane")
    consoleOut!.innerHTML = "";
}

export {ArduinoType};
