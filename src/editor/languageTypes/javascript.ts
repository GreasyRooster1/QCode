import {ProjectType,RunErrCallback} from "./projectType";
import {getCode,setupEvents as setupExecEvents,logNames,runCode,frameContent,frame,stopFrame} from "../executionHelper"
import {Language} from "../codeEditor";
import {getStoredUser} from "../../api/auth";
import {ref, set} from "firebase/database";
import {db} from "../../api/firebase";
import {writeToEditor} from "../utils/loadUtils";
import {clearConsole} from "../codeExecution";

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
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/code"),code);
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/dateUpdated"),Date.now()/1000);
        if(this.hasLesson) {
            console.log(this.highestViewedStep)
            set(ref(db,"userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep"),this.highestViewedStep);
            set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/currentChapter"),this.chapterNum);
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
        super.appendLog(content,type);
    }

    getLanguage():Language {
        return "javascript";
    }
}

export {JavascriptType};