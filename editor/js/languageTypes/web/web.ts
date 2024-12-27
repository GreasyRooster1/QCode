import {ProjectType,RunErrCallback} from "../projectType.js";
import {Filesystem} from "./filesystem";

class WebType extends ProjectType {
    filesystem:Filesystem

    constructor() {
        super(false);
        this.filesystem = new Filesystem();
    }

    setupEditor(): void {
        document.querySelector(".code-pane")!.innerHTML = `
        <div class="code-editor-wrapper">
            <div class="filesystem-sidebar">
                <div class="header">
                    <span>Files</span>
                    <span>
                    <i class='far fa-file-alt'></i>
                    <i class="far fa-folder"></i>
                    </span>
                </div>
                <div class="file-list">
                </div>
            </div>
            <div class="code-editor"></div>
        </div> 
        `
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
