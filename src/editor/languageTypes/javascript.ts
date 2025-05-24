import {ProjectType,RunErrCallback} from "./projectType";
import {getCode,setupEvents as setupExecEvents,logNames,runCode,frameContent,frame,stopFrame} from "../executionHelper"
import {Language} from "../codeEditor";
import {getStoredUser} from "../../api/auth";
import {ref, set} from "firebase/database";
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

    static getProjectDBData(projectName: string, lessonId: string):Object {
        let cleanLessonId = lessonId??"none"
        let hasLesson = cleanLessonId != "none";
        return {
            code:defaultCodeJs,
            lessonId:cleanLessonId,
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"javascript",
        }
    }
}

export {JavascriptType};