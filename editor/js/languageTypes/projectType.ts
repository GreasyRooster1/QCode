
interface ErrorCallback {
    (content:string,type:string):void,
}

abstract class ProjectType {
    allowShare:boolean;
    projectData: { [key: string]: any; } | undefined;
    projectId: string | undefined;

    constructor(allowShare:boolean) {
        this.allowShare = allowShare;
    }

    loadProjectData(projectId:string){
        this.projectId = projectId;
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+this.projectId).once("value",(snapshot:any)=>{
            this.projectData = snapshot.val();
        }).then(()=>{
            this.onLoad()
        });
    }

    setupEventListeners(){

    }

    /*
    * Abstract methods
    */

    abstract setupEditor():void;

    abstract onLoad():void;

    abstract saveCode():void;

    abstract run(errorCallback:ErrorCallback):void;

    abstract stop():void;
}

export {ProjectType,ErrorCallback};