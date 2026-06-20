import { ProjectType } from "../projectType";
import { Filesystem, isFolder } from "./filesystem";
import { get, ref, set } from "firebase/database";
import { db } from "../../../api/firebase";
import { getStoredUser } from "../../../api/auth";
import { defaultFilesWeb } from "../../../api/util/code";
import { openFile, saveCurrentFile, setupAssetDrop, setupFileFolderButtons, setupFileMovement, setupFilesystemDom, setupHeaderButtons, updateFilesystemBar } from "../fileSystemInterface";
class WebType extends ProjectType {
    constructor() {
        super(false);
        this.filesystem = new Filesystem("index.html");
        this.filesystem.onFileSystemUpdate = updateFilesystemBar;
        this.filesystem.projectImpl = this;
        this.currentFileId = this.filesystem.defaultFile.id;
    }
    setupEditor() {
        setupFilesystemDom();
        updateFilesystemBar(this);
        setupFileFolderButtons(this);
        setupHeaderButtons(this);
        setupAssetDrop(this);
        setupFileMovement(this);
    }
    onLoad() {
        var _a;
        this.filesystem.deserialize((_a = this.projectData) === null || _a === void 0 ? void 0 : _a.files);
        this.currentFileId = this.filesystem.getFile("/index.html").id;
        openFile(this, this.currentFileId);
        updateFilesystemBar(this);
    }
    onSave() {
        saveCurrentFile(this);
        let serializedFiles = this.filesystem.serialize();
        set(ref(db, "userdata/" + getStoredUser().uid + "/projects/" + this.projectId + "/files"), serializedFiles);
    }
    onRun(errorCallback) {
        this.sendFolderToHTMLHost(this.filesystem.getAll()["/"]);
        let frame = document.getElementById("#exec-frame");
        frame.contentWindow.location.href = this.getServerAddress();
        //window.open("https://"+this.projectId+"."+getStoredUser().username+".esporterz.com")
    }
    getServerAddress() {
        return "https://" + this.projectId + "." + getStoredUser().username + ".esporterz.com";
    }
    sendFolderToHTMLHost(folder) {
        // @ts-ignore
        for (let [key, frag] of Object.entries(folder)) {
            if (isFolder(frag)) {
                this.sendFolderToHTMLHost(folder[key]);
            }
            this.sendFileToHTMLHost(frag);
        }
    }
    sendFileToHTMLHost(file) {
        let address = this.getServerAddress() + "/" + file.name + "." + file.extension;
        fetch(address, {
            method: "PUT",
            body: file.content,
        }).catch(function (err) {
            console.log('failed to post file @ ' + address);
        });
    }
    onStop() {
    }
    runErrorCallback(content, type) {
    }
    getLanguage() {
        return "javascript";
    }
    static getProjectDBData(projectName, lessonId) {
        let cleanLessonId = lessonId !== null && lessonId !== void 0 ? lessonId : "none";
        let hasLesson = cleanLessonId != "none";
        let data = {
            files: defaultFilesWeb,
            lessonId: lessonId !== null && lessonId !== void 0 ? lessonId : "none",
            name: projectName,
            currentChapter: 0,
            currentStep: 0,
            timestamp: Date.now() / 1000,
            language: "web",
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
}
WebType.identifier = "web";
export { WebType };
