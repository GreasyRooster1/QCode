import { defaultFilesPython } from "../../../api/util/code";
import { CloudAgentType } from "../cloudAgentType";
import { openFile, saveCurrentFile, setupAssetDrop, setupFileFolderButtons, setupFilesystemDom, setupHeaderButtons, updateFilesystemBar } from "../fileSystemInterface";
import { Filesystem, FilesystemFile } from "../web/filesystem";
import { get, ref, set } from "firebase/database";
import { db } from "../../../api/firebase";
import { getStoredUser } from "../../../api/auth";
import { startPythonServer } from "./python-api";
import { clearConsole } from "../../codeExecution";
class PythonType extends CloudAgentType {
    constructor() {
        super();
        this.filesystem = new Filesystem("index.html");
        this.filesystem.onFileSystemUpdate = updateFilesystemBar;
        this.filesystem.projectImpl = this;
        this.currentFileId = this.filesystem.defaultFile.id;
    }
    setupEditor() {
        super.setupEditor();
        setupFilesystemDom();
        updateFilesystemBar(this);
        setupFileFolderButtons(this);
        setupHeaderButtons(this);
        setupAssetDrop(this);
        document.querySelector(".filesystem-root span").innerHTML = "Project";
        document.querySelector(".filesystem-root img").setAttribute("src", "https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/house-folder.png");
    }
    onLoad() {
        var _a, _b;
        super.onLoad();
        (_a = document.querySelector(".canvas-output-pane")) === null || _a === void 0 ? void 0 : _a.remove();
        this.setupConnection();
        this.filesystem.deserialize((_b = this.projectData) === null || _b === void 0 ? void 0 : _b.files);
        let defaultFile = this.filesystem.getFile("/main.py");
        if (defaultFile == null) {
            this.filesystem.getAll()["/"]["main.py"] = new FilesystemFile("main", "py");
            this.currentFileId = this.filesystem.getFile("/main.py").id;
        }
        else {
            this.currentFileId = defaultFile.id;
        }
        openFile(this, this.currentFileId);
        updateFilesystemBar(this);
        document.querySelector(".console-head").innerHTML = "<div class='console-refresh-button'>Refresh</div>";
        document.querySelector(".console-refresh-button").addEventListener("click", () => {
            this.updateLogs();
        });
    }
    onSave() {
        saveCurrentFile(this);
        let serializedFiles = this.filesystem.serialize();
        set(ref(db, "userdata/" + getStoredUser().uid + "/projects/" + this.projectId + "/files"), serializedFiles);
    }
    onRun(errorCallback) {
        var _a, _b;
        if (this.project == null) {
            return;
        }
        this.setExecStatus("write");
        let serializedFiles = this.filesystem.serialize();
        let stringifiedFiles = JSON.stringify(serializedFiles);
        clearConsole();
        (_b = (_a = this.project) === null || _a === void 0 ? void 0 : _a.write(stringifiedFiles)) === null || _b === void 0 ? void 0 : _b.then(() => {
            var _a;
            this.setExecStatus("deserialize");
            (_a = this.project) === null || _a === void 0 ? void 0 : _a.deserialize().then(() => {
                var _a;
                this.setExecStatus("execute");
                (_a = this.project) === null || _a === void 0 ? void 0 : _a.execute().then(() => {
                    this.setExecStatus("ok");
                    clearInterval(this.logInterval);
                    this.logInterval = setInterval(() => {
                        clearConsole();
                        this.updateLogs();
                    }, 1000);
                }).catch(e => {
                    this.appendLog(e.message.replace("\n", "<br>"), "error");
                    this.failExec();
                });
            }).catch(e => {
                this.appendLog(e.message.replace("\n", "<br>"), "error");
                this.failExec();
            });
        }).catch(e => {
            this.appendLog(e.message.replace("\n", "<br>"), "error");
            this.failExec();
        });
    }
    runErrorCallback(content, type) {
        this.appendLog(content, type);
    }
    getLanguage() {
        return "python";
    }
    updateLogs() {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.collectLogs().then((e) => {
            console.log(e.logs);
            document.querySelector(".console-log-area").innerHTML = e.logs.replace("\n", "<br>");
        }).catch(e => {
            this.appendLog(e.message.replace("\n", "<br>"), "error");
        });
    }
    static getProjectDBData(projectName, lessonId) {
        let cleanLessonId = lessonId !== null && lessonId !== void 0 ? lessonId : "none";
        let hasLesson = cleanLessonId != "none";
        let data = {
            files: defaultFilesPython,
            lessonId: lessonId !== null && lessonId !== void 0 ? lessonId : "none",
            name: projectName,
            currentChapter: 0,
            currentStep: 0,
            timestamp: Date.now() / 1000,
            language: "python",
        };
        return new Promise((resolve, reject) => {
            if (hasLesson) {
                get(ref(db, "lessons/" + lessonId + "/starterFiles")).then((snap) => {
                    if (snap.exists()) {
                        data.files = snap.val();
                        resolve(data);
                        return;
                    }
                    else {
                        resolve(data);
                        return;
                    }
                });
            }
            else {
                resolve(data);
            }
        });
    }
    onStop() {
    }
    setupAgentConnection() {
        startPythonServer(this.projectId).then(proj => {
            this.project = proj;
        });
    }
}
PythonType.identifier = "python";
export { PythonType };
