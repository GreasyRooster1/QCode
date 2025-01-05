import { getCode } from "../../executionHelper.js";
import {ProjectType,RunErrCallback} from "../projectType.js";
import {Filesystem, Folder, isFolder} from "./filesystem.js";
import {setupEditor} from "../../codeEditor.js";

class WebType extends ProjectType {
    filesystem:Filesystem
    currentFileId:number;

    constructor() {
        super(false);
        this.filesystem = new Filesystem();
        this.filesystem.onFileSystemUpdate = this.updateFilesystemBar
        this.currentFileId = this.filesystem.defaultFile.id
    }

    updateFilesystemBar(){
        let folders = this.filesystem.getAll();
        document.querySelector(".file-list")!.innerHTML = "";

        this.populateHTMLForFolder("root",folders["/"],document.querySelector(".file-list"));
        this.setupFileEventListeners()
    }

    setupFileEventListeners(){
        let list = document.querySelectorAll(".file-list, .folder")
        console.log(list)
        for (let folder of list) {
            let children = folder.children;
            for (let child of children) {
                if (!child.classList.contains("file")) {
                    continue;
                }
                child.addEventListener("click", (e) => {
                    // @ts-ignore
                    let target: HTMLElement = e.target!;
                    if (target.parentElement?.classList.contains("file")) {
                        target = target.parentElement;
                    }
                    console.log(target);
                    this.saveCurrentFile()
                    this.openFile(Number(target.getAttribute("data-id")!));
                })
            }
        }
    }

    openFile(fileId:number){
        this.currentFileId = fileId;
        let file = this.filesystem.getFileById(this.currentFileId);
        document.querySelector(".current-file-view")!.innerHTML = file!.name+"."+file!.extension;
        setupEditor(file?.getLanguage())
        writeToEditor(file!.content)
    }
    saveCurrentFile(){
        let code = getCode();
        let file = this.filesystem.getFileById(this.currentFileId);
        file!.content = code;
    }

    populateHTMLForFolder(name:string,folder:Folder,upperHtml:any){
        // @ts-ignore
        for (let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                let wrapperEl = document.createElement("div");
                wrapperEl.classList.add("folder-wrapper");

                let folderEl = document.createElement("div");
                folderEl.classList.add("folder");
                folderEl.classList.add(key);

                let folderIconEl = document.createElement("div");
                folderIconEl.classList.add("folder-icon");
                folderIconEl.innerHTML = "<i class='fas fa-folder-open'></i> <span class='name'>"+key+"</span>"

                wrapperEl.appendChild(folderIconEl);
                wrapperEl.appendChild(folderEl);
                upperHtml.appendChild(wrapperEl);

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
            <div class="text-editor-wrapper">
                <div class="current-file-view">index.html</div>
                <div class="code-editor"></div>
            </div>
        </div> 
        `
        this.updateFilesystemBar()
    }

    onLoad(){
        this.filesystem.deserialize(this.projectData?.files);
        this.currentFileId=this.filesystem.getFile("/index.html").id;
        this.openFile(this.currentFileId);
        this.updateFilesystemBar();
    }

    saveCode(){
        this.saveCurrentFile()
        let serializedFiles = this.filesystem.serialize();
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+this.projectId+"/files").set(serializedFiles);
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
