import {cleanFileName, Filesystem, FilesystemFile, Folder, isFolder} from "./web/filesystem";
import {writeToEditor} from "../utils/loadUtils";
import {getCode} from "../executionHelper";


interface FileSystemInterface {
    filesystem:Filesystem
    currentFileId:number;
}

function updateFilesystemBar(impl:FileSystemInterface){
    let folders = impl.filesystem.getAll();
    document.querySelector(".file-list")!.innerHTML = "";

    populateHTMLForFolder("root",folders["/"],document.querySelector(".file-list"));
    setupFileEventListeners(impl);
}

function setupFileEventListeners(impl:FileSystemInterface){
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
                saveCurrentFile()
                openFile(impl,Number(target.getAttribute("data-id")!));
            })
        }
    }
}

function setupFileFolderButtons(impl:FileSystemInterface){
    document.querySelector(".new-file-button")!.addEventListener("click", (e) => {
        promptFileCreation(impl.filesystem.getAll()["/"])
    })
    document.querySelector(".new-folder-button")!.addEventListener("click", (e) => {
        promptFolderCreation(impl.filesystem.getAll()["/"])
    })
}

function setupHeaderButtons(){
    document.querySelector(".current-file-view .trash")!.addEventListener("click", (e) => {
        let isSure = confirm("Are you sure you want to delete this file?");
        if (!isSure) {
            return
        }
        impl.filesystem.deleteFile(impl.filesystem.getAll()["/"],impl.currentFileId);
        updateFilesystemBar()
    })
}

function setupAssetDrop(){
    let target = document.querySelector(".remote-assets-filesystem")!
    target.addEventListener("drop", (event:any) => {
        console.log("File(s) dropped");

        event.preventDefault();

        if (event.dataTransfer!.items) {
            [...event.dataTransfer!.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    handleDroppedAssetFile(file!);
                }
            });
        } else {
            [...event.dataTransfer!.files].forEach((file, i) => {
                handleDroppedAssetFile(file)
            });
        }
    });
    target.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
    });
}

function handleDroppedAssetFile(file: File){
    console.log(file.name)
}

function promptFileCreation(folder:Folder){
    let name =
        cleanFileName(prompt("Enter a name for the file")!);
    if(name == null){
        return;
    }
    let sec = name.split(".")
    folder[name] = new FilesystemFile(sec[0],sec[1]);
    updateFilesystemBar();
}
function promptFolderCreation(folder:Folder){
    let name = cleanFileName(prompt("Enter a name for the folder")!);
    if(name == null||name.length==0){
        return;
    }
    folder[name] = {};
    updateFilesystemBar();
}

function openFile(impl:FileSystemInterface,fileId:number){
    currentFileId = fileId;
    let file = filesystem.getFileById(currentFileId);
    document.querySelector(".current-file-view .filename")!.innerHTML = file!.name+"."+file!.extension;
    impl.setupEditor(file?.getLanguage())
    writeToEditor(file!.content)
}
function saveCurrentFile(){
    let code = getCode();
    let file = filesystem.getFileById(currentFileId);
    file!.content = code;
}

function populateHTMLForFolder(name:string,folder:Folder,upperHtml:any){

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
        let frag = f as FilesystemFile|Folder
        if(isFolder(frag)){
            let wrapperEl = this.createFolderEl(key,folder)
            upperHtml.appendChild(wrapperEl);
            this.populateHTMLForFolder(key,frag as Folder,wrapperEl.querySelector(".folder"));
        }else{
            let file = frag as FilesystemFile;
            if(file.isDeleted){
                continue;
            }
            file.appendToHtml(upperHtml);
        }
    }
}
function createFolderEl(key:string,folder:Folder){
    let wrapperEl = createFolderEl(key,folder);
    wrapperEl.querySelector(".buttons .new-file-button")?.addEventListener("click", (e) => {
        this.promptFileCreation(folder[key] as Folder);
    });
    wrapperEl.querySelector(".buttons .new-folder-button")?.addEventListener("click", (e) => {
        this.promptFolderCreation(folder[key] as Folder);
    });
    return wrapperEl;
}

export{FileSystemInterface}