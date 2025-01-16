import { getCode } from "../../executionHelper.js";
import { ProjectType } from "../projectType.js";
import { Filesystem, isFolder, File as FilesystemFile, createFolderEl, cleanFileName } from "./filesystem.js";
import { setupEditor } from "../../codeEditor.js";
class WebType extends ProjectType {
    constructor() {
        super(false);
        this.filesystem = new Filesystem();
        this.filesystem.onFileSystemUpdate = this.updateFilesystemBar;
        this.currentFileId = this.filesystem.defaultFile.id;
    }
    updateFilesystemBar() {
        let folders = this.filesystem.getAll();
        document.querySelector(".file-list").innerHTML = "";
        this.populateHTMLForFolder("root", folders["/"], document.querySelector(".file-list"));
        this.setupFileEventListeners();
    }
    setupFileEventListeners() {
        let list = document.querySelectorAll(".file-list, .folder");
        console.log(list);
        // @ts-ignore
        for (let folder of list) {
            let children = folder.children;
            for (let child of children) {
                if (!child.classList.contains("file")) {
                    continue;
                }
                child.addEventListener("click", (e) => {
                    var _a;
                    // @ts-ignore
                    let target = e.target;
                    if ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("file")) {
                        target = target.parentElement;
                    }
                    console.log(target);
                    this.saveCurrentFile();
                    this.openFile(Number(target.getAttribute("data-id")));
                });
            }
        }
    }
    setupFileFolderButtons() {
        document.querySelector(".new-file-button").addEventListener("click", (e) => {
            this.promptFileCreation(this.filesystem.getAll()["/"]);
        });
        document.querySelector(".new-folder-button").addEventListener("click", (e) => {
            this.promptFolderCreation(this.filesystem.getAll()["/"]);
        });
    }
    setupHeaderButtons() {
        document.querySelector(".current-file-view .trash").addEventListener("click", (e) => {
            let isSure = confirm("Are you sure you want to delete this file?");
            if (!isSure) {
                return;
            }
            this.filesystem.deleteFile(this.filesystem.getAll()["/"], this.currentFileId);
            this.updateFilesystemBar();
        });
    }
    setupAssetDrop() {
        let target = document.querySelector(".remote-assets-filesystem");
        target.addEventListener("drop", (event) => {
            console.log("File(s) dropped");
            event.preventDefault();
            if (event.dataTransfer.items) {
                [...event.dataTransfer.items].forEach((item, i) => {
                    if (item.kind === "file") {
                        const file = item.getAsFile();
                        this.handleDroppedAssetFile(file);
                    }
                });
            }
            else {
                [...event.dataTransfer.files].forEach((file, i) => {
                    this.handleDroppedAssetFile(file);
                });
            }
        });
        target.addEventListener("dragover", (event) => {
            // prevent default to allow drop
            event.preventDefault();
        });
    }
    handleDroppedAssetFile(file) {
        console.log(file.name);
    }
    promptFileCreation(folder) {
        let name = cleanFileName(prompt("Enter a name for the file"));
        if (name == null) {
            return;
        }
        let sec = name.split(".");
        folder[name] = new FilesystemFile(sec[0], sec[1]);
        this.updateFilesystemBar();
    }
    promptFolderCreation(folder) {
        let name = cleanFileName(prompt("Enter a name for the folder"));
        if (name == null || name.length == 0) {
            return;
        }
        folder[name] = {};
        this.updateFilesystemBar();
    }
    openFile(fileId) {
        this.currentFileId = fileId;
        let file = this.filesystem.getFileById(this.currentFileId);
        document.querySelector(".current-file-view .filename").innerHTML = file.name + "." + file.extension;
        setupEditor(file === null || file === void 0 ? void 0 : file.getLanguage());
        writeToEditor(file.content);
    }
    saveCurrentFile() {
        let code = getCode();
        let file = this.filesystem.getFileById(this.currentFileId);
        file.content = code;
    }
    populateHTMLForFolder(name, folder, upperHtml) {
        const sortedKeys = Object.keys(folder).sort((a, b) => {
            if (a.includes(".") && !b.includes(".")) {
                return 1;
            }
            if (b.includes(".") && !a.includes(".")) {
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
        for (let [key, f] of Object.entries(sortedObj)) {
            let frag = f;
            if (isFolder(frag)) {
                let wrapperEl = this.createFolderEl(key, folder);
                upperHtml.appendChild(wrapperEl);
                this.populateHTMLForFolder(key, frag, wrapperEl.querySelector(".folder"));
            }
            else {
                let file = frag;
                if (file.isDeleted) {
                    continue;
                }
                file.appendToHtml(upperHtml);
            }
        }
    }
    createFolderEl(key, folder) {
        var _a, _b;
        let wrapperEl = createFolderEl(key, folder);
        (_a = wrapperEl.querySelector(".buttons .new-file-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            this.promptFileCreation(folder[key]);
        });
        (_b = wrapperEl.querySelector(".buttons .new-folder-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
            this.promptFolderCreation(folder[key]);
        });
        return wrapperEl;
    }
    setupEditor() {
        document.querySelector(".code-pane").innerHTML = `
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
        `;
        this.updateFilesystemBar();
        this.setupFileFolderButtons();
        this.setupHeaderButtons();
        this.setupAssetDrop();
    }
    onLoad() {
        var _a;
        this.filesystem.deserialize((_a = this.projectData) === null || _a === void 0 ? void 0 : _a.files);
        this.currentFileId = this.filesystem.getFile("/index.html").id;
        this.openFile(this.currentFileId);
        this.updateFilesystemBar();
    }
    saveCode() {
        this.saveCurrentFile();
        let serializedFiles = this.filesystem.serialize();
        database.ref("userdata/" + getStoredUser().uid + "/projects/" + this.projectId + "/files").set(serializedFiles);
    }
    run(errorCallback) {
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
    stop() {
    }
    runErrorCallback(content, type) {
    }
    getLanguage() {
        return "javascript";
    }
}
function clearConsole() {
    let consoleOut = document.querySelector(".console-output-pane");
    consoleOut.innerHTML = "";
}
export { WebType };
