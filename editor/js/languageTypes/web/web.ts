import {ProjectType,RunErrCallback} from "../projectType.js";
import {Filesystem, Folder, isFolder} from "./filesystem.js";

class WebType extends ProjectType {
    filesystem:Filesystem

    constructor() {
        super(false);
        this.filesystem = new Filesystem();
        this.filesystem.onFileSystemUpdate = this.updateFilesystemBar

    }

    updateFilesystemBar(){
        let folders = this.filesystem.getAll();

        this.populateHTMLForFolder("root",folders["/"],document.querySelector(".file-list"));
    }
    populateHTMLForFolder(name:string,folder:Folder,upperHtml:any){
        // @ts-ignore
        for (let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                let folderEl = document.createElement("div");
                folderEl.classList.add("folder");
                folderEl.classList.add(name);
                upperHtml.appendChild(folderEl);
                this.populateHTMLForFolder(key,frag,folderEl)
            }else{
                frag.appendToHtml(upperHtml);
            }
        }
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
        this.updateFilesystemBar()
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
