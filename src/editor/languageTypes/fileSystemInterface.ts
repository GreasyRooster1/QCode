import {cleanFileName, Filesystem, FilesystemFile, Folder, getFolderDom, isFolder} from "./web/filesystem";
import {writeToEditor} from "../utils/loadUtils";
import {getCode} from "../executionHelper";
import {setupEditor} from "../codeEditor";
import {getURLForProjectFile, sendImageToFileServer} from "../utils/fileServerAPI";

const imageFileTypes = ["png","jpg","jpeg","gif","webp"];

interface FileSystemInterface {
    filesystem:Filesystem
    currentFileId:number;
}

function updateFilesystemBar(impl:any){
    let folders = impl.filesystem.getAll();
    document.querySelector(".file-list")!.innerHTML = "";

    populateHTMLForFolder(impl,"root",folders["/"],document.querySelector(".file-list"),"");
    setupFileEventListeners(impl);

}

function setupFileEventListeners(impl:any){
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
                saveCurrentFile(impl,)
                openFile(impl,Number(target.getAttribute("data-id")!));
            })
        }
    }
    setupFileMovement(impl);
}

function setupFileFolderButtons(impl:any){
    document.querySelector(".new-file-button")!.addEventListener("click", (e) => {
        promptFileCreation(impl,impl.filesystem.getAll()["/"])
    })
    document.querySelector(".new-folder-button")!.addEventListener("click", (e) => {
        promptFolderCreation(impl,impl.filesystem.getAll()["/"])
    })
}

function setupHeaderButtons(impl:any){
    document.querySelector(".current-file-view .trash")!.addEventListener("click", (e) => {
        let isSure = confirm("Are you sure you want to delete this file?");
        if (!isSure) {
            return
        }
        impl.filesystem.deleteFile(impl.filesystem.getAll()["/"],impl.currentFileId);
        updateFilesystemBar(impl)
    })
}

function setupAssetDrop(impl:any){
    let target = document.querySelector(".upload-drop")!
    target.addEventListener("drop", (event:any) => {
        console.log("File(s) dropped");

        event.preventDefault();

        if (event.dataTransfer!.items) {
            [...event.dataTransfer!.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    handleDroppedAssetFile(impl,file!);
                }
            });
        } else {
            [...event.dataTransfer!.files].forEach((file, i) => {
                handleDroppedAssetFile(impl,file)
            });
        }
    });
    target.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
    });
}

function handleDroppedAssetFile(impl:any,file: File){
    console.log(file.name)
    let name = cleanFileName(file.name);
    let sec = name.split(".")
    let systemFile =  new FilesystemFile(sec[0],sec[1]);
    if(name in impl.filesystem.system["/"]){
        if(!confirm("Do you want to override this file?")){
            return;
        }
    }
    impl.filesystem.system["/"][name] =systemFile;
    writeFileFromDrop(impl,systemFile,file);
    updateFilesystemBar(impl);
}

function writeFileFromDrop(impl:any,systemFile:FilesystemFile,file:File){
    let reader = new FileReader()
    let isImage = imageFileTypes.includes(systemFile.extension)
    console.log(systemFile.extension,isImage)
    reader.onload = ()=>{
        if(isImage){
            let url = getURLForProjectFile(impl.projectId,systemFile.name+"."+systemFile.extension);
            sendImageToFileServer(reader.result,url);
            systemFile.content = url;
        }else {
            systemFile.content = reader.result as string;
        }
    }
    if(isImage) {
        reader.readAsArrayBuffer(file);
    }else {
        reader.readAsText(file)
    }
}



function promptFileCreation(impl:any,folder:Folder){
    let name =
        cleanFileName(prompt("Enter a name for the file")!);
    if(name == null){
        return;
    }
    let sec = name.split(".")
    folder[name] = new FilesystemFile(sec[0],sec[1]);
    updateFilesystemBar(impl);
}
function promptFolderCreation(impl:any,folder:Folder){
    let name = cleanFileName(prompt("Enter a name for the folder")!);
    if(name == null||name.length==0){
        return;
    }
    folder[name] = {};
    updateFilesystemBar(impl);
}

function openFile(impl:any,fileId:number){
    impl.currentFileId = fileId;
    let file = impl.filesystem.getFileById(impl.currentFileId);
    document.querySelector(".current-file-view .filename")!.innerHTML = file!.name+"."+file!.extension;
    setupEditor(file?.getLanguage())
    writeToEditor(file!.content)
}
function saveCurrentFile(impl:any){
    let code = getCode();
    let file = impl.filesystem.getFileById(impl.currentFileId);
    file!.content = code;
}

function populateHTMLForFolder(impl:any,name:string,folder:Folder,upperHtml:any,path:string){

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
            let wrapperEl = createFolderEl(impl,key,folder,path+"/"+key)
            upperHtml.appendChild(wrapperEl);
            populateHTMLForFolder(impl,key,frag as Folder,wrapperEl.querySelector(".folder"),path+"/"+key);
        }else{
            let file = frag as FilesystemFile;
            if(file.isDeleted){
                continue;
            }
            file.appendToHtml(upperHtml);
        }
    }
}
function createFolderEl(impl: any, key: string, folder: Folder, path: string){
    let wrapperEl = getFolderDom(key,folder);
    wrapperEl.querySelector(".buttons .new-file-button")?.addEventListener("click", (e) => {
        promptFileCreation(impl,folder[key] as Folder);
    });
    wrapperEl.querySelector(".buttons .new-folder-button")?.addEventListener("click", (e) => {
        promptFolderCreation(impl,folder[key] as Folder);
    });
    wrapperEl.querySelector(".folder")!.setAttribute("data-path",path);
    return wrapperEl;
}

function setupFilesystemDom(){
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
                    <div class="upload-drop">
                        <i class='fas fa-cloud-upload-alt'></i>
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
}

function setupFileMovement(impl:any){
    document.querySelectorAll(".file").forEach((el)=>{
        el.setAttribute("draggable","true");
        el.querySelector("img")!.setAttribute("draggable","false");
        el.addEventListener("dragstart",(e)=>{
            let target =(e.target! as Element);
            (e as DragEvent).dataTransfer!.setData("text/plain",target.getAttribute("data-id")!);
        });
    })
    document.querySelectorAll(".folder-wrapper").forEach((el)=>{
        el.addEventListener("drop",(e)=> {
            let el = (e.target! as Element);
            let path = el.querySelector(".folder")!.getAttribute("data-path");
            const data = (e as DragEvent).dataTransfer!.getData("text/plain");
            let file = impl.filesystem.getFileById(parseFloat(data));
            console.log(path, data, file)
            impl.filesystem.addFile(file, path);
        });
    });
}

export{FileSystemInterface,setupFileMovement,setupFilesystemDom,createFolderEl,populateHTMLForFolder,saveCurrentFile,openFile,promptFolderCreation,promptFileCreation,handleDroppedAssetFile,setupAssetDrop,setupHeaderButtons,setupFileFolderButtons,setupFileEventListeners,updateFilesystemBar}