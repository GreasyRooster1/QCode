import {ProjectType,ErrorCallback} from "./projectType.js";

class JavascriptType extends ProjectType {
    constructor() {
        super(true);
    }

    setupEditor(): void {

    }

    onLoad(){
        writeToEditor(this.projectData!["code"]);
    }

    saveCode(){
        let code = getCodeFromEditor();
        let user = getStoredUser();
        database.ref("userdata/"+user.uid+"/projects/"+this.projectId+"/code").set(code);
        if(this.hasLesson) {
            console.log(this.highestViewedStep)
            database.ref("userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep").set(this.highestViewedStep);
            database.ref("userdata/"+user.uid+"/projects/"+this.projectId+"/currentChapter").set(this.currentChapter);
        }

    }

    run(errorCallback:ErrorCallback) {

    }

    stop(){

    }

    runErrorCallback(content: string, type: string): void {
    }
}


export {JavascriptType};