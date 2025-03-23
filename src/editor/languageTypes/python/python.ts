//arduino.work
import {RunErrCallback} from "../projectType";
import {Language} from "../../codeEditor";
import {defaultCodeArduino, defaultFilesPython, defaultFilesWeb} from "../../../api/util/code";
import {CloudAgentType} from "../cloudAgentType";
import {
    FileSystemInterface, openFile, saveCurrentFile, setupAssetDrop,
    setupFileFolderButtons, setupFileMovement,
    setupFilesystemDom, setupHeaderButtons,
    updateFilesystemBar
} from "../fileSystemInterface";
import {Filesystem} from "../web/filesystem";
import {ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {getStoredUser} from "../../../api/auth";
import {Sketch, startSketchServer} from "../arduino/arduino-api";
import {getCode} from "../../executionHelper";
import {PythonProject, startPythonServer} from "./python-api";
import * as console from "node:console";

class PythonType extends CloudAgentType implements FileSystemInterface{
    project: PythonProject | undefined;
    currentFileId: number;
    filesystem: Filesystem;

    constructor() {
        super();
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
        if(this.project==null){
            return;
        }
        this.setExecStatus("write");
        this.project?.write(getCode())?.then(()=> {
            this.setExecStatus("deserialize");
            this.project?.deserialize().then(()=> {
                this.setExecStatus("execute");
                this.project?.execute().then(()=>{
                    this.setExecStatus("ok");
                }).catch(e => {
                    this.appendLog(e.message.replace("\n","<br>"),"error");
                    this.failExec()
                });
            }).catch(e => {
                this.appendLog(e.message.replace("\n","<br>"),"error");
                this.failExec()
            });
        }).catch(e => {
            this.appendLog(e.message.replace("\n","<br>"),"error");
            this.failExec()
        })
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
        startPythonServer(this.projectId!).then(proj => {
            this.project = proj;
        })
    }
}

export {PythonType};
