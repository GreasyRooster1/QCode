//arduino.work
import {RunErrCallback} from "../projectType";
import {Language} from "../../codeEditor";
import {defaultFilesPython, defaultFilesWeb} from "../../../api/util/code";
import {CloudAgentType} from "../cloudAgentType";
import {
    FileSystemInterface,
    openFile,
    saveCurrentFile,
    setupAssetDrop,
    setupFileFolderButtons,
    setupFilesystemDom,
    setupHeaderButtons,
    updateFilesystemBar
} from "../fileSystemInterface";
import {Filesystem} from "../web/filesystem";
import {get, ref, set} from "firebase/database";
import {db} from "../../../api/firebase";
import {getStoredUser} from "../../../api/auth";
import {PythonProject, startPythonServer} from "./python-api";
import { clearConsole } from "../../codeExecution";

class PythonType extends CloudAgentType implements FileSystemInterface{
    static identifier = "python"
    project: PythonProject | undefined;
    currentFileId: number;
    filesystem: Filesystem;
    logInterval:any;

    constructor() {
        super();
        this.filesystem = new Filesystem("index.html");
        this.filesystem.onFileSystemUpdate = updateFilesystemBar;
        this.filesystem.projectImpl = this;
        this.currentFileId = this.filesystem.defaultFile.id
    }

    setupEditor(): void {
        super.setupEditor();
        setupFilesystemDom()
        updateFilesystemBar(this)
        setupFileFolderButtons(this)
        setupHeaderButtons(this)
        setupAssetDrop(this)
        document.querySelector(".filesystem-root span")!.innerHTML = "Project";
        document.querySelector(".filesystem-root img")!.setAttribute("src","https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/house-folder.png")
    }

    onLoad(){
        super.onLoad();
        document.querySelector(".canvas-output-pane")?.remove()
        this.setupConnection();
        this.filesystem.deserialize(this.projectData?.files);
        this.currentFileId=this.filesystem.getFile("/main.py").id;
        openFile(this,this.currentFileId);
        updateFilesystemBar(this);
        document.querySelector(".console-head")!.innerHTML = "<div class='console-refresh-button'>Refresh</div>";
        document.querySelector(".console-refresh-button")!.addEventListener("click", ()=>{
            this.updateLogs();
        })
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
        let serializedFiles = this.filesystem.serialize();
        let stringifiedFiles = JSON.stringify(serializedFiles);
        clearConsole()
        this.project?.write(stringifiedFiles)?.then(()=> {
            this.setExecStatus("deserialize");
            this.project?.deserialize().then(()=> {
                this.setExecStatus("execute");
                this.project?.execute().then(()=>{
                    this.setExecStatus("ok");
                    clearInterval(this.logInterval)
                    this.logInterval=setInterval(()=>{
                        clearConsole()
                        this.updateLogs();
                    },1000);

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

    updateLogs():void {
        this.project?.collectLogs().then((e:any)=>{
            console.log(e.logs);
            document.querySelector(".console-log-area")!.innerHTML = e.logs.replace("\n", "<br>");
        }).catch(e => {
            this.appendLog(e.message.replace("\n","<br>"),"error");
        });
    }

    static getProjectDBData(projectName: string, lessonId: string):Promise<Object> {
        let cleanLessonId = lessonId ?? "none"
        let hasLesson = cleanLessonId != "none";
        let data = {
            files:defaultFilesPython,
            lessonId:lessonId??"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"python",
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

    onStop(): void {
    }

    setupAgentConnection(): void {
        startPythonServer(this.projectId!).then(proj => {
            this.project = proj;
        })
    }
}

export {PythonType};
