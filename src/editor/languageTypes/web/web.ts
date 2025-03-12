import { getCode } from "../../executionHelper";
import {ProjectType,RunErrCallback} from "../projectType";
import {Filesystem, Folder, isFolder, FilesystemFile, createFolderEl, cleanFileName} from "./filesystem";
import {Language, setupEditor} from "../../codeEditor";
import {ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {getStoredUser} from "../../../api/auth";
import {writeToEditor} from "../../utils/loadUtils";
import {defaultCodeJs, defaultFilesWeb} from "../../../api/util/code";
import {FileSystemInterface} from "../fileSystemInterface";

class WebType extends ProjectType implements FileSystemInterface {

    /* Implements */
    filesystem:Filesystem
    currentFileId:number;

    constructor() {
        super(false);
        this.filesystem = new Filesystem();
        this.filesystem.onFileSystemUpdate = this.updateFilesystemBar
        this.currentFileId = this.filesystem.defaultFile.id
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
                <div class="filesystem-container">
                    <div class="default-filesystem filesystem">
                        <div class="filesystem-root">
                            <img src="https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/globe-folder.png">
                            <span>Site</span>
                        </div>
                        <div class="file-list"></div>
                    </div>
                    <div class="remote-assets-filesystem filesystem">
                        <div class="filesystem-root">
                            <img src="https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/gallery-folder.png">
                            <span>Assets</span>
                        </div>
                        <div class="remote-assets"></div>
                    </div>
                </div>
            </div>
            <div class="text-editor-wrapper">
                <div class="current-file-view">
                    <div class="filename">index.html</div>
                    <div class="icons">
                        <div class="trash"><i class="far fa-trash-alt"></i></div>
                    </div>
                </div>
                <div class="code-editor"></div>
            </div>
        </div> 
        `
        updateFilesystemBar()
        setupFileFolderButtons()
        setupHeaderButtons()
        setupAssetDrop()
    }

    onLoad(){
        this.filesystem.deserialize(this.projectData?.files);
        this.currentFileId=this.filesystem.getFile("/index.html").id;
        openFile(this.currentFileId);
        updateFilesystemBar();
    }

    onSave(){
        this.saveCurrentFile()
        let serializedFiles = this.filesystem.serialize();
        set(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+this.projectId+"/files"),serializedFiles);
    }

    onRun(errorCallback:RunErrCallback) {
        this.sendFolderToHTMLHost(this.filesystem.getAll()["/"]);
        let frame = document.getElementById("#exec-frame")! as HTMLIFrameElement
        frame.contentWindow!.location.href = this.getServerAddress();
        //window.open("https://"+this.projectId+"."+getStoredUser().username+".esporterz.com")
    }

    getServerAddress(){
        return "https://"+this.projectId+"."+getStoredUser().username+".esporterz.com";
    }

    sendFolderToHTMLHost(folder:Folder){
        // @ts-ignore
        for(let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                this.sendFolderToHTMLHost(folder[key] as Folder);
            }
            this.sendFileToHTMLHost(frag as FilesystemFile)
        }
    }

    sendFileToHTMLHost(file:FilesystemFile){
        let address = this.getServerAddress()+"/"+file.name+"."+file.extension;
        fetch(address,
            {
                method: "PUT",
                body:file.content,
            }
        ).catch(function(err) {
            console.log('failed to post file @ '+address);
        });
    }

    onStop(){
    }

    runErrorCallback(content: string, type: string): void {
    }

    getLanguage():Language {
        return "javascript";
    }

    static getProjectDBData(projectName: string, lessonId: string):Object {
        return {
            files:defaultFilesWeb,
            lessonId:lessonId??"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"web",
        }
    }
}
export {WebType};
