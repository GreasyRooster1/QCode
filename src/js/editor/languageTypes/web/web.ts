import { getCode } from "../../executionHelper";
import {ProjectType,RunErrCallback} from "../projectType";
import {Filesystem, Folder, isFolder, FilesystemFile, getFolderDom, cleanFileName} from "./filesystem";
import {Language, setupEditor} from "../../codeEditor";
import {get, ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {getStoredUser} from "../../../api/auth";
import {writeToEditor} from "../../utils/loadUtils";
import {defaultCodeJs, defaultFilesWeb} from "../../../api/util/code";
import {
    FileSystemInterface, openFile, saveCurrentFile, setupAssetDrop,
    setupFileFolderButtons, setupFileMovement, setupFilesystemDom,
    setupHeaderButtons,
    updateFilesystemBar
} from "../fileSystemInterface";

class WebType extends ProjectType implements FileSystemInterface {
    static identifier = "web"
    /* Implements */
    public filesystem:Filesystem
    public currentFileId:number;

    constructor() {
        super(false);
        this.filesystem = new Filesystem("index.html");
        this.filesystem.onFileSystemUpdate = updateFilesystemBar;
        this.filesystem.projectImpl = this;
        this.currentFileId = this.filesystem.defaultFile.id
    }

    setupEditor(): void {
        setupFilesystemDom()
        updateFilesystemBar(this)
        setupFileFolderButtons(this)
        setupHeaderButtons(this)
        setupAssetDrop(this)
        setupFileMovement(this);
    }

    onLoad(){
        this.filesystem.deserialize(this.projectData?.files);
        this.currentFileId=this.filesystem.getFile("/index.html").id;
        openFile(this,this.currentFileId);
        updateFilesystemBar(this);
    }

    onSave(){
        saveCurrentFile(this)
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

    static getProjectDBData(projectName: string, lessonId: string):Promise<Object> {
        let cleanLessonId = lessonId ?? "none"
        let hasLesson = cleanLessonId != "none";
        let data = {
            files:defaultFilesWeb,
            lessonId:lessonId??"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"web",
        }
        return new Promise((resolve, reject) => {
            if (hasLesson) {
                get(ref(db, "lessons/" + lessonId + "/starterFiles")).then((snap) => {
                    if (snap.exists()) {
                        data.files = snap.val();
                        resolve(data)
                        return;
                    }else{
                        resolve(data);
                        return;
                    }
                })
            }else{
                resolve(data);
            }
        });
    }
}
export {WebType};
