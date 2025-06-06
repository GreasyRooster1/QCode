//arduino.work
import {ProjectType, RunErrCallback} from "../projectType";
import {getCode} from "../../executionHelper";
import {Language} from "../../codeEditor";
import {startSketchServer, Sketch} from "./arduino-api";
import {defaultCodeArduino, defaultCodeJs} from "../../../api/util/code";
import {CloudAgentType} from "../cloudAgentType";
import {getStoredUser} from "../../../api/auth";
import {get, ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {clearConsole} from "../../codeExecution";

class ArduinoType extends CloudAgentType {
    static identifier = "arduino"
    sketch: Sketch | undefined;

    constructor() {
        super();
    }

    onRun(errorCallback:RunErrCallback) {
        if(this.sketch==null){
            return;
        }
        clearConsole()
        this.setExecStatus("write");
        this.sketch?.writeCode(getCode())?.then(()=> {
            this.setExecStatus("compile");
            this.sketch?.compile().then(()=> {
                this.setExecStatus("upload");
                this.sketch?.upload().then(()=>{
                    this.setExecStatus("ok");
                }).catch(e => {
                    this.appendLog(e.message.replace("\n","<br>"),"error");
                    this.failExec()
                });
            }).catch(e => {
                this.appendLog(e.message.replace("\n","<br>"),"error");
                this.failExec()
            });
        }).catch(e => {
            this.appendLog(e.message.replace("\n","<br>"),"error");
            this.failExec()
        })
    }
    onLoad() {
        super.onLoad();
        this.setupConnection();
        document.querySelector(".console-head")!.innerHTML = "<div class='serial-monitor-button'>Serial Monitor</div>";
        document.querySelector(".serial-monitor-button")!.addEventListener("click", ()=>{
            this.sketch!.openSerialMonitor();
        })
        document.querySelector(".stop-button")?.remove()
        document.querySelector(".canvas-output-pane")?.remove()
    }

    onSave(){
        let code = getCode();
        let user = getStoredUser();
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/code"),code);
    }

    runErrorCallback(content: string, type: string): void {
        this.appendLog(content,type);
    }

    setupSerialMonitor(){

    }

    getLanguage():Language {
        return "c++";
    }

    static getProjectDBData(projectName: string, lessonId: string):Promise<Object> {
        let cleanLessonId = lessonId ?? "none"
        let hasLesson = cleanLessonId != "none";
        let data = {
            code:defaultCodeArduino,
            lessonId:lessonId??"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"arduino",
        }
        return new Promise((resolve, reject) => {
            if (hasLesson) {
                get(ref(db, "lessons/" + lessonId + "/starterCode")).then((snap) => {
                    if (snap.exists()) {
                        data.code = snap.val();
                        resolve(data)
                        return;
                    }else{
                        resolve(data);
                        return;
                    }
                })
            }else{
                resolve(data);
            }
        });
    }

    onStop(): void {
    }

    setupAgentConnection(): void {
        startSketchServer(this.projectId!).then(sketch => {
            this.sketch = sketch;
        })
    }
}

export {ArduinoType};
