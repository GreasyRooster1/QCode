import {ProjectType,ErrorCallback} from "./projectType.js";

class JavascriptType extends ProjectType {
    constructor() {
        super(true);
    }

    setupEditor(): void {
    }

    onLoad(){

    }

    saveCode(){

    }

    run(errorCallback:ErrorCallback) {

    }

    stop(){

    }
}


export {JavascriptType};