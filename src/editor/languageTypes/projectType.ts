import {Language, setupEditor} from "../codeEditor";
import {db} from "../../api/firebase";
import {get, ref} from "firebase/database";
import {getStoredUser} from "../../api/auth";
import {setupPanes} from "../panes";
import {showSaveAlert} from "../save";
import {loadLesson, projectType} from "../load";
import {runPopupPreviewCode, showPopup} from "../share";
import {logNames} from "../executionHelper";

interface RunErrCallback {
    (content:string,type:string):void,
}

abstract class ProjectType {
    allowShare:boolean;
    hasLesson: boolean | undefined;
    projectData: { [key: string]: any; } | undefined;
    projectId: string | undefined;
    highestViewedStep: number | undefined;
    chapterNum: number | undefined;

    constructor(allowShare:boolean) {
        this.allowShare = allowShare;
        this.checkShareAllowed()
    }

    loadProjectData(projectId:string){
        this.projectId = projectId;
        get(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+this.projectId)).then((snapshot:any)=>{
            this.projectData = snapshot.val();
            console.log(this.projectData);
            if(this.projectData!["lessonId"]==="none"){
                setupPanes(false);
                this.hasLesson = false;
            }else{
                setupPanes(true);
                loadLesson(this.projectData!["lessonId"]);
                this.hasLesson = true;
            }
        }).then(()=>{
            this.onLoad()
        });
    }

    setupEventListeners(){
        document.querySelector(".save-button")?.addEventListener("click", ()=>{
            showSaveAlert()
            this.saveCode();
        })
        document.querySelector(".run-button")?.addEventListener("click", ()=>{
            this.saveCode();
            showSaveAlert()
            this.run(this.runErrorCallback);
        })
        document.querySelector(".stop-button")?.addEventListener("click", ()=>{
            this.stop();
        })
        document.querySelector('.share-button')?.addEventListener('click', (e) => {
            console.log("sadsd")
            if(!this.allowShare){
                return
            }
            this.saveCode()
            showPopup();
            runPopupPreviewCode();
            this.share();
        });
    }

    checkShareAllowed(){
        if(!this.allowShare){
            document.querySelector(".share-button")!.classList.add("disabled");
        }else{
            document.querySelector(".share-button")!.classList.remove("disabled");
        }
    }

    setupEditorLanguage(){
        setupEditor(this.getLanguage());
    }

    share(){

    }

    appendLog(content: string, type: string){
        let logEl = document.createElement("console-log");
        let consoleOut = document.querySelector(".console-log-area")
        while(consoleOut!.children.length > 100){
            consoleOut!.children[consoleOut!.childElementCount-1].remove()
        }
        logEl.setAttribute("type", type);
        logEl.setAttribute("message", content);
        logEl.setAttribute("head", logNames[type]);
        consoleOut!.insertBefore(logEl,consoleOut!.firstChild);
    }

    /*
    * Abstract methods
    */

    abstract setupEditor():void;

    abstract onLoad():void;

    abstract saveCode():void;

    abstract run(errorCallback:RunErrCallback):void;

    abstract stop():void;

    abstract runErrorCallback(content:string,type:string):void;

    abstract getLanguage(): Language;

    static getProjectDBData(projectName: string, lessonId: string):Object {
        throw new TypeError('This method should be overridden by inheriting classes.');
    }
}

export {ProjectType,RunErrCallback};