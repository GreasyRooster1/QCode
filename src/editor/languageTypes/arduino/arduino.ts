//arduino.work
import {ProjectType, RunErrCallback} from "../projectType";
import {frame, frameContent, getCode, logNames, runCode, setupEvents as setupExecEvents, stopFrame} from "../../executionHelper";
import {Language} from "../../codeEditor";
import {getStoredUser} from "../../../api/auth";
import {ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {writeToEditor} from "../../utils/loadUtils";
import {createSketch, Sketch} from "./arduino-api";

class ArduinoType extends ProjectType {
    sketch: Sketch | undefined;

    constructor() {
        super(false);
    }

    setupEditor(): void {
        document.querySelector(".console-head")?.setAttribute("style","");
    }

    onLoad(){
        writeToEditor(this.projectData!["code"]);
        this.sketch = createSketch(this.projectId!);
        document.querySelector(".canvas-output-pane")?.remove()
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
        this.sketch?.writeCode(getCode())?.then(()=> {
            this.sketch?.compile().then(()=> {
                this.sketch?.upload();
            });
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
