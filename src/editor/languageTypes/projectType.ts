import {Language, setupEditor} from "../codeEditor";
import {db} from "../../api/firebase";
import {get, ref, set} from "firebase/database";
import {getStoredUser} from "../../api/auth";
import {setupDefaultPanes} from "../panes";
import {showSaveAlert} from "../save";
import {loadLesson} from "../load";
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
    isLessonCreator:boolean;

    constructor(allowShare:boolean) {
        this.allowShare = allowShare;
        this.chapterNum = 0;
        this.isLessonCreator = false;
        this.checkShareAllowed()
    }

    loadProjectData(projectId:string){
        this.projectId = projectId;
        get(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+this.projectId)).then((snapshot:any)=>{
            this.projectData = snapshot.val();
            console.log(this.projectData);
            if(this.projectData!["lessonId"]==="none"){
                this.createPanes(false);
                this.hasLesson = false;
            }else{
                this.createPanes(true);
                loadLesson(this.projectData!["lessonId"]);
                this.hasLesson = true;
            }
        }).then(()=>{
            this.onLoad()
        });
    }

    createPanes(hasLesson:boolean){
        setupDefaultPanes(hasLesson);
    }

    setupEventListeners(){
        document.querySelector(".save-button")?.addEventListener("click", ()=>{
            showSaveAlert()
            this.saveCode();
        })
        document.querySelector(".run-button")?.addEventListener("click", ()=>{
            this.saveCode();
            showSaveAlert()
            this.onRun(this.runErrorCallback);
        })
        document.querySelector(".stop-button")?.addEventListener("click", ()=>{
            this.saveCode();
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
    
    saveMetadata(){
        let user = getStoredUser();
        set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/dateUpdated"),Date.now()/1000);
        if(this.hasLesson) {
            console.log(this.highestViewedStep)
            set(ref(db,"userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep"),this.highestViewedStep);
            set(ref(db,"userdata/"+user.uid+"/projects/"+this.projectId+"/currentChapter"),this.chapterNum);
        }
    }

    saveCode(){
        if(this.isLessonCreator){
            return
        }
        this.onSave()
    }

    /*
    * Abstract methods
    */

    abstract setupEditor():void;

    abstract onLoad():void;

    abstract onSave():void;

    abstract onRun(errorCallback:RunErrCallback):void;

    abstract onStop():void;

    abstract runErrorCallback(content:string,type:string):void;

    abstract getLanguage(): Language;

    static getProjectDBData(projectName: string, lessonId: string):Object {
        throw new TypeError('This method should be overridden by inheriting classes.');
    }
}

export {ProjectType,RunErrCallback};