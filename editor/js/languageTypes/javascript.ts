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

    }

    run(errorCallback:ErrorCallback) {

    }

    stop(){

    }

    runErrorCallback(content: string, type: string): void {
    }
}


export {JavascriptType};