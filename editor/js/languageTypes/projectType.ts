import { setupEditor } from "../codeEditor.js";

interface RunErrCallback {
    (content:string,type:string):void,
}

abstract class ProjectType {
    allowShare:boolean;
    hasLesson: boolean | undefined;
    projectData: { [key: string]: any; } | undefined;
    projectId: string | undefined;
    highestViewedStep: number | undefined;
    currentChapter: number | undefined;

    constructor(allowShare:boolean) {
        this.allowShare = allowShare;
        this.checkShareAllowed()
    }

    loadProjectData(projectId:string){
        this.projectId = projectId;
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+this.projectId).once("value",(snapshot:any)=>{
            this.projectData = snapshot.val();
            console.log(this.projectData);
            if(this.projectData!["lessonId"]==="none"){
                setupPanes(false);
                this.hasLesson = false;
            }else{
                setupPanes(true);
                this.hasLesson = true;
            }
        }).then(()=>{
            this.onLoad()
        });
    }

    setupEventListeners(){
        document.querySelector(".save-button")!.addEventListener("click", ()=>{
            showSaveAlert()
            this.saveCode();
        })
        document.querySelector(".run-button")!.addEventListener("click", ()=>{
            this.saveCode();
            showSaveAlert()
            this.run(this.runErrorCallback);
        })
        document.querySelector(".stop-button")!.addEventListener("click", ()=>{
            this.stop();
        })
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

    /*
    * Abstract methods
    */

    abstract setupEditor():void;

    abstract onLoad():void;

    abstract saveCode():void;

    abstract run(errorCallback:RunErrCallback):void;

    abstract stop():void;

    abstract runErrorCallback(content:string,type:string):void;

    abstract getLanguage(): string;
}

export {ProjectType,RunErrCallback};