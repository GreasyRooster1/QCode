//arduino.work
import {RunErrCallback} from "../projectType";
import {Language} from "../../codeEditor";
import {defaultCodeArduino, defaultFilesPython, defaultFilesWeb} from "../../../api/util/code";
import {CloudAgentType} from "../cloudAgentType";
import {
    FileSystemInterface, openFile, saveCurrentFile, setupAssetDrop,
    setupFileFolderButtons,
    setupFilesystemDom, setupHeaderButtons,
    updateFilesystemBar
} from "../fileSystemInterface";
import {Filesystem} from "../web/filesystem";
import {ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {getStoredUser} from "../../../api/auth";

class PythonType extends CloudAgentType implements FileSystemInterface{
    //project: Sketch | undefined;
    currentFileId: number;
    filesystem: Filesystem;

    constructor() {
        super();
        this.filesystem = new Filesystem("index.html");
        this.filesystem.onFileSystemUpdate = updateFilesystemBar;
        this.currentFileId = this.filesystem.defaultFile.id
    }

    setupEditor(): void {
        setupFilesystemDom()
        updateFilesystemBar(this)
        setupFileFolderButtons(this)
        setupHeaderButtons(this)
        setupAssetDrop(this)
        document.querySelector(".filesystem-root span")!.innerHTML = "Project";
    }

    onLoad(){
        this.filesystem.deserialize(this.projectData?.files);
        this.currentFileId=this.filesystem.getFile("/main.py").id;
        openFile(this,this.currentFileId);
        updateFilesystemBar(this);
    }

    onSave(){
        saveCurrentFile(this)
        let serializedFiles = this.filesystem.serialize();
        set(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+this.projectId+"/files"),serializedFiles);
    }

    onRun(errorCallback:RunErrCallback) {
        //todo
    }
    runErrorCallback(content: string, type: string): void {
        this.appendLog(content,type);
    }

    getLanguage():Language {
        return "python";
    }

    static getProjectDBData(projectName: string, lessonId: string):Object {
        return {
            files:defaultFilesPython,
            lessonId:lessonId??"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"python",
        }
    }

    onStop(): void {
    }

    setupAgentConnection(): void {
        //todo
    }
}

export {PythonType};
