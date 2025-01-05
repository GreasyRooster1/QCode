import { getCode } from "../../executionHelper.js";
import {ProjectType,RunErrCallback} from "../projectType.js";
import {Filesystem, Folder, isFolder,File} from "./filesystem.js";
import {Language, setupEditor} from "../../codeEditor.js";

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
        // @ts-ignore
        for (let folder of list) {
            let children = folder.children;
            for (let child of children) {
                if (!child.classList.contains("file")) {
                    continue;
                }
                child.addEventListener("click", (e: any) => {
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

    setupFileFolderButtons(){
        document.querySelector(".new-file-button")!.addEventListener("click", (e) => {
            this.promptFileCreation(this.filesystem.getAll()["/"])
        })
        document.querySelector(".new-folder-button")!.addEventListener("click", (e) => {
            this.promptFolderCreation(this.filesystem.getAll()["/"])
        })
    }

    promptFileCreation(folder:Folder){
        let name = prompt("Enter a name for the file")
        if(name == null){
            return;
        }
        let sec = name.split(".")
        folder[name] = new File(sec[0],sec[1]);
        this.updateFilesystemBar();
    }
    promptFolderCreation(folder:Folder){
        let name = prompt("Enter a name for the folder")
        if(name == null){
            return;
        }
        folder[name] = {};
        this.updateFilesystemBar();
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

        const sortedKeys = Object.keys(folder).sort((a,b)=>{
            if(a.includes(".")&&!b.includes(".")){
                return 1;
            }
            if(b.includes(".")&&!a.includes(".")){
                return -1;
            }
            return a.localeCompare(b);
        });

        const sortedObj = {};
        for (const key of sortedKeys) {
            // @ts-ignore
            sortedObj[key] = folder[key];
        }

        // @ts-ignore
        for (let [key,f ] of Object.entries(sortedObj)){
            let frag = f as File|Folder
            if(isFolder(frag)){
                let wrapperEl = this.createFolderEl(key,folder)
                upperHtml.appendChild(wrapperEl);
                this.populateHTMLForFolder(key,frag as Folder,wrapperEl.querySelector(".folder"));
            }else{
                (frag as File).appendToHtml(upperHtml);
            }
        }
    }

    createFolderEl(key:string,folder:Folder){
        let wrapperEl = document.createElement("div");
        wrapperEl.classList.add("folder-wrapper");
        wrapperEl.innerHTML = `
                    <div class="folder-icon ">
                        <span class="name-icon">
                            <i class='fas fa-folder-open'></i>
                            <span class='name'>${key}</span>
                        </span>
                        <span class="buttons">
                            <i class='far fa-file-alt new-file-button'></i>
                            <i class="far fa-folder new-folder-button"></i>
                        </span>
                    </div>
                    <div class="folder ${key}"></div>
                `
        wrapperEl.querySelector(".buttons .new-file-button")?.addEventListener("click", (e) => {
            this.promptFileCreation(folder[key] as Folder);
        });
        wrapperEl.querySelector(".buttons .new-folder-button")?.addEventListener("click", (e) => {
            this.promptFolderCreation(folder[key] as Folder);
        });

        return wrapperEl
    }

    setupEditor(): void {
        document.querySelector(".code-pane")!.innerHTML = `
        <div class="code-editor-wrapper">
            <div class="filesystem-sidebar">
                <div class="header">
                    <span>Files</span>
                    <span>
                        <i class='far fa-file-alt new-file-button'></i>
                        <i class="far fa-folder new-folder-button"></i>
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
        this.setupFileFolderButtons()
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
        this.sendFolderToHTMLHost(this.filesystem.getAll()["/"]);
        (document.getElementById("#exec-frame")?).contentWindow
        //window.open("https://"+this.projectId+"."+getStoredUser().username+".esporterz.com")
    }

    sendFolderToHTMLHost(folder:Folder){
        // @ts-ignore
        for(let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                this.sendFolderToHTMLHost(folder[key] as Folder);
            }
            this.sendFileToHTMLHost(frag)
        }
    }

    sendFileToHTMLHost(file:File){
        let address = this.projectId+"."+getStoredUser().username+".esporterz.com/"+file.name+"."+file.extension;
        fetch(address,
            {
                method: "PUT",
                body:file.content,
            }
        ).catch(function(err) {
            console.log('failed to post file @ '+address);
        });
    }

    stop(){
    }

    runErrorCallback(content: string, type: string): void {
    }

    getLanguage():Language {
        return "javascript";
    }
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-output-pane")
    consoleOut!.innerHTML = "";
}

export {WebType};
