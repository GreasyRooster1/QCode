//arduino.work
import {ProjectType, RunErrCallback} from "../projectType";
import {frame, frameContent, getCode, logNames, runCode, setupEvents as setupExecEvents, stopFrame} from "../../executionHelper";
import {Language} from "../../codeEditor";
import {getStoredUser} from "../../../api/auth";
import {ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {writeToEditor} from "../../utils/loadUtils";
import {startSketchServer, Sketch} from "./arduino-api";

class ArduinoType extends ProjectType {
    sketch: Sketch | undefined;
    executionStatus: string;
    failedExecution: boolean;

    constructor() {
        super(false);
        this.executionStatus = "not connected";
        this.failedExecution = true;
    }

    setupEditor(): void {
        document.querySelector(".console-head")?.setAttribute("style","");
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
        this.executionStatus = "write"
        this.sketch?.writeCode(getCode())?.then(()=> {
            this.executionStatus = "compile"
            this.sketch?.compile().then(()=> {
                this.executionStatus = "upload"
                this.sketch?.upload().then(()=>{
                    this.executionStatus = "ok"
                }).catch(e => {
                    this.failedExecution = true
                });
            }).catch(e => {
                this.failedExecution = true
            });
        }).catch(e => {
            this.failedExecution = true
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
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-output-pane")
    consoleOut!.innerHTML = "";
}

export {ArduinoType};
