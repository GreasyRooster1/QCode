import {cleanFileName, Filesystem, FilesystemFile, Folder, getFolderDom, isFolder} from "./web/filesystem";
import {writeToEditor} from "../utils/loadUtils";
import {getCode} from "../executionHelper";
import {setupEditor} from "../codeEditor";
import {getURLForProjectFile, sendImageToFileServer} from "../utils/fileServerAPI";

const textFileTypes = ["html","css","js","py","txt","json","bat","cpp","c","rs","ts","jsx","tsx","sh","dat","yaml","toml","xml","","http",""];
const imageFileTypes = ["png","jpg","jpeg","jfif","gif","webp"];

interface FileSystemInterface {
    filesystem:Filesystem
    currentFileId:number;
}

function updateFilesystemBar(impl:any){
    console.trace(impl,impl.filesystem)
    let folders = impl.filesystem.getAll();
    document.querySelector(".file-list")!.innerHTML = "";

    populateHTMLForFolder(impl,"root",folders["/"],document.querySelector(".file-list"),"");
    setupFileEventListeners(impl);
}

function setupFileEventListeners(impl:any){
    let list = document.querySelectorAll(".file-list, .folder")
    console.log(list)
    setupFileMovement(impl);
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
        impl.filesystem.deleteFile(impl.currentFileId);
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
    console.log(systemFile.extension,systemFile.isImage(),systemFile.isDataFile())
    reader.onload = ()=>{
        if(systemFile.isImage()||systemFile.isDataFile()){
            let url = getURLForProjectFile(impl.projectId,systemFile.getFullName());
            sendImageToFileServer(reader.result,url);
            systemFile.content = url;
        }else {
            systemFile.content = reader.result as string;
        }
    }
    if(systemFile.isImage()||systemFile.isDataFile()) {
        reader.readAsArrayBuffer(file);
    }else {
        reader.readAsText(file)
    }
}



function promptFileCreation(impl:any,folder:Folder){
    let name =
        cleanFileName(prompt("Enter a name for the file and its extension:")!);
    if(name == null){
        return;
    }
    let sec = name.split(".")
    if(sec.length==1) {
        folder[name+".txt"] = new FilesystemFile(sec[0],"txt");
    }else {
        folder[name] = new FilesystemFile(sec[0], sec[1]);
    }
    updateFilesystemBar(impl);
}
function promptFolderCreation(impl:any,folder:Folder){
    let name = cleanFileName(prompt("Enter a name for the folder")!);
    if(name == null||name.length==0){
        return;
    }
    if(name in folder){
        alert("folder already exists!");
        return
    }
    folder[name] = {};
    updateFilesystemBar(impl);
}

function openFile(impl:any,fileId:number){
    impl.currentFileId = fileId;
    let file = impl.filesystem.getFileById(impl.currentFileId);
    document.querySelector(".current-file-view .filename")!.innerHTML = file!.getFullName();
    let codeView = document.querySelector(".code-editor")! as HTMLElement;
    let imageView = document.querySelector(".image-view")! as HTMLElement;
    let dataView = document.querySelector(".data-view")! as HTMLElement;
    if(file.isImage()){
        codeView.style.display="none";
        imageView.style.display="flex";
        dataView.style.display="none";
        document.querySelector(".image-view-image")!.setAttribute("src",file.content);
    }else if(file.isDataFile()) {
        codeView.style.display="none";
        imageView.style.display="none";
        dataView.style.display="flex";
        document.querySelector(".data-link")!.setAttribute("href",file.content);
    }else{
        codeView.style.display="block";
        imageView.style.display="none";
        dataView.style.display="none";
        setupEditor(file?.getLanguage())
        writeToEditor(file!.content)
    }
}
function saveCurrentFile(impl:any){
    let code = getCode();
    let file = impl.filesystem.getFileById(impl.currentFileId);
    if(file.isImage()||file.isDataFile()){
        //image cant be edited
    }else {
        file!.content = code;
    }
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
    let imageView = document.createElement("div");
    document.querySelector(".code-editor")!.appendChild(imageView);
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
                    <div class="default-filesystem filesystem folder-wrapper">
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
                <div class="image-view">
                    <img class="image-view-image" alt="stored image" src="https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Global/missing.png">
                </div>
                <div class="data-view">
                    <p>Cant display this file!</p>
                    <a class="data-link" href="https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Global/missing.png">Open in browser...</a>
                </div>
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
            e.stopPropagation();
            saveCurrentFile(impl);
            console.log(el)
            let path;
            const id = parseFloat((e as DragEvent).dataTransfer!.getData("text/plain"));
            if(el.classList.contains("filesystem")){
                moveFileToRoot(impl,id);
                return;
            }
            path = el.querySelector(".folder")!.getAttribute("data-path")!;
            moveFile(impl,id,path);

        });
        el.addEventListener("dragover",(e)=> {
            e.preventDefault();
        });
    });
}

function moveFile(impl:any,id:number,path:string){
    let file = impl.filesystem.getFileById(id);
    let newFile = new FilesystemFile(file.name,file.extension)
    let folder :Folder = impl.filesystem.getFolder(path.substring(1,path.length))

    if(newFile.getFullName() in folder){
        alert("file already exists in this location!");
        return;
    }

    newFile.content = file.content;

    //delete old one
    impl.filesystem.deleteFile(id);
    console.log(path, id, file,folder)

    //put new file at location
    folder[file.getFullName()] = newFile;
    updateFilesystemBar(impl);
}
function moveFileToRoot(impl:any,id:number){
    let file = impl.filesystem.getFileById(id);
    let newFile = new FilesystemFile(file.name,file.extension)
    newFile.content = file.content;

    //delete old one
    impl.filesystem.deleteFile(id);

    //put new file at location
    impl.filesystem.system["/"][file.getFullName()] = file;
    updateFilesystemBar(impl);
}

export {
    FileSystemInterface,
    setupFileMovement,
    setupFilesystemDom,
    createFolderEl,
    populateHTMLForFolder,
    saveCurrentFile,
    openFile,
    promptFolderCreation,
    promptFileCreation,
    handleDroppedAssetFile,
    setupAssetDrop,
    setupHeaderButtons,
    setupFileFolderButtons,
    setupFileEventListeners,
    updateFilesystemBar,
    textFileTypes,
    imageFileTypes
}