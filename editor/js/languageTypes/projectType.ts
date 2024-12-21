
interface ErrorCallback {
    (content:string,type:string):void,
}

abstract class ProjectType {
    allowShare:boolean;
    projectData: { [key: string]: any; } | undefined;
    projectId: string | undefined;
    highestViewedStep: number | undefined;
    currentChapter: number | undefined;

    constructor(allowShare:boolean) {
        this.allowShare = allowShare;
    }

    loadProjectData(projectId:string){
        this.projectId = projectId;
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+this.projectId).once("value",(snapshot:any)=>{
            this.projectData = snapshot.val();
            console.log(this.projectData);
            if(this.projectData!["lessonId"]==="none"){
                setupPanes(false);
            }else{
                setupPanes(true);
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
            this.run(this.runErrorCallback);
        })
        document.querySelector(".stop-button")!.addEventListener("click", ()=>{
            this.stop();
        })
    }

    /*
    * Abstract methods
    */

    abstract setupEditor():void;

    abstract onLoad():void;

    abstract saveCode():void;

    abstract run(errorCallback:ErrorCallback):void;

    abstract stop():void;

    abstract runErrorCallback(content:string,type:string):void;
}

export {ProjectType,ErrorCallback};