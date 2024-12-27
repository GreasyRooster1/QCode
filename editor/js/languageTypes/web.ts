import {ProjectType,RunErrCallback} from "./projectType.js";

class WebType extends ProjectType {
    constructor() {
        super(false);
    }

    setupEditor(): void {
    }

    onLoad(){
    }

    saveCode(){
    }

    run(errorCallback:RunErrCallback) {
    }

    stop(){
    }

    runErrorCallback(content: string, type: string): void {
    }

    getLanguage():string {
        return "javascript";
    }
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-output-pane")
    consoleOut!.innerHTML = "";
}

export {WebType};
