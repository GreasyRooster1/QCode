import {ProjectType,RunErrCallback} from "./projectType";
import {getCode,setupEvents as setupExecEvents,logNames,runCode,frameContent,frame,stopFrame} from "../executionHelper"
import {Language} from "../codeEditor";
import {getStoredUser} from "../../api/auth";
import {get, ref, set} from "firebase/database";
import {db} from "../../api/firebase";
import {writeToEditor} from "../utils/loadUtils";
import {clearConsole} from "../codeExecution";
import {defaultCodeJs} from "../../api/util/code";

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

    onSave(){
        let code = getCode();
        let user = getStoredUser();
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/code"),code);
    }

    onRun(errorCallback:RunErrCallback) {
        console.log(frameContent)
        if(frameContent==undefined){
            frame?.contentWindow?.location?.reload()
        }
        frameContent?.location.reload()
        clearConsole()
    }

    onStop(){
        stopFrame();
        clearConsole()
    }

    runErrorCallback(content: string, type: string): void {
        super.appendLog(content,type);
    }

    getLanguage():Language {
        return "javascript";
    }

    static getProjectDBData(projectName: string, lessonId: string):Promise<Object> {
        let cleanLessonId = lessonId ?? "none"
        let hasLesson = cleanLessonId != "none";
        let data = {
            code: defaultCodeJs,
            lessonId: cleanLessonId,
            name: projectName,
            currentChapter: 0,
            currentStep: 0,
            timestamp: Date.now() / 1000,
            language: "javascript",
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
            }
            resolve(data);
        });
    }
}

export {JavascriptType};