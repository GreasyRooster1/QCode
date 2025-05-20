import {imageFileTypes, textFileTypes} from "../fileSystemInterface";

const dotReplacer = "➽";
const blacklistedChars = [".", "$", "#", "[", "]", "/","\\"];

interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:FilesystemFile|Folder
}

class Filesystem{
    private system:System;
    defaultFile:FilesystemFile;
    onFileSystemUpdate:Function;
    projectImpl:any;

    constructor(defaultFileName:string) {
        this.system = {
            "/": {
                "index.html": new FilesystemFile("index", "html"),
                "index.js": new FilesystemFile("index", "js"),
                "index.css": new FilesystemFile("index", "css"),
            }
        }
        this.defaultFile = <FilesystemFile>this.system["/"][defaultFileName];
        this.onFileSystemUpdate = ()=>{};
    }

    getFile(path:string):FilesystemFile{
        let sections = path.split("/");
        sections.shift()
        let name = sections.pop();
        let parentFolder = this.system["/"];
        for(let folder of sections){
            let next = parentFolder[folder]
            if(isFolder(next)){
                parentFolder = <Folder>next;
            }
        }
        return <FilesystemFile>parentFolder[name!]
    }

    getFolder(path:string):Folder{
        debugger
        let sections = path.split("/");
        //sections.pop();
        let parentFolder = this.system["/"];
        for(let folder of sections){
            let next = parentFolder[folder]
            if(isFolder(next)){
                parentFolder = <Folder>next;
            }
        }
        return parentFolder;
    }

    addFile(file:FilesystemFile, location:string){
        this.getFolder(location)[file.getFullName()] = file;
        this.onFileSystemUpdate(this.projectImpl);
    }

    getFileById(id:number):FilesystemFile|null{
        return this.findFile(this.system["/"],id);
    }
    getFilePathById(id:number):string|null{
        return this.findFilePath(this.system["/"],id,"/");
    }
    findFile(folder:Folder,id:number):FilesystemFile|null{
        // @ts-ignore
        for (let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                let out = this.findFile(frag as Folder,id)
                if(out!==null){
                    return out;
                }
            }
            if(frag.id==id){
                return frag as FilesystemFile;
            }
        }
        return null;

    }
    findFilePath(folder:Folder,id:number,path:string):string|null {
        // @ts-ignore
        for (let [key, frag] of Object.entries(folder)) {
            if (isFolder(frag)) {
                let out = this.findFilePath(frag as Folder, id,path+"/"+key)
                if (out !== null) {
                    return out;
                }
            }
            if (frag.id == id) {
                return path+"/"+key;
            }
        }
        return null;
    }

    deleteFile(id:number){
        // @ts-ignore
        this.getFileById(id).delete();
    }

    getAll(){
        return this.system
    }

    serialize(){
        let jsonObject = {};
        this.serializeFolder(this.system["/"],jsonObject);
        return jsonObject
    }

    serializeFolder(folder:Folder,jsonObject:any){
        // @ts-ignore
        for (let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                jsonObject[key] = {};
                this.serializeFolder(frag as Folder,jsonObject[key]);
                continue;
            }
            if(frag.isDeleted){
                continue;
            }
            let serializedName = (frag as FilesystemFile).getSerializedName();
            jsonObject[serializedName] = frag.content;
        }
    }

    deserialize(jsonObject:any){
        this.system["/"] = this.deserializeFolder(jsonObject);
        this.defaultFile = this.getFile("/index.html")
    }

    deserializeFolder(jsonObject:any):any{
        let folder = {};
        // @ts-ignore
        for (let [key,value] of Object.entries(jsonObject)){
            if(typeof value === "object"){
                // @ts-ignore
                folder[key]=this.deserializeFolder(value)
                continue;
            }
            let split = key.split(dotReplacer);
            let file = new FilesystemFile(split[0], split[1]);
            file.content = value as string;
            // @ts-ignore
            folder[split.join(".")] = file;
        }
        return folder
    }
}

const isFolder = (value: Folder|FilesystemFile)=> {
    return !(value instanceof FilesystemFile);
}


class FilesystemFile {
    name: string;
    extension: string;
    content:string;
    id:number;
    isDeleted:boolean;
    constructor(name:string, extension: string) {
        this.name = name;
        this.extension = extension;
        this.content = "";
        this.id = Math.random()*999999;
        this.isDeleted = false;
    }

    delete(){
        this.isDeleted = true;
    }

    appendToHtml(upperHtml:any){
        let el = document.createElement("div");
        el.innerHTML = `
            <img class="icon" src="`+this.getIconUrl()+`">
            <span class="filename">`+this.name+"."+this.extension+`</span>
        `
        el.classList.add("file")
        el.classList.add(this.name.replace(" ","-"))
        el.setAttribute("data-filename",this.name+"."+this.extension);
        el.setAttribute("data-id",String(this.id));
        upperHtml.appendChild(el);
    }

    getIconUrl(){
        if(!hasFileIcon(this.extension)){
            return "https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/file.png"
        }
        if(this.extension=="sys"&&Math.random()<0.1){
            return "https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/sys.gif"
        }
        return "https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/"+this.extension+".png"
    }

    getSerializedName(){
        let name = this.name+dotReplacer+this.extension;
        name = name.replace(".",dotReplacer)
        for(let char in blacklistedChars){
            name.replace(char,"");
        }
        return name;
    }

    getFullName(){
        return this.name+"."+this.extension;
    }

    isImage(){
        return imageFileTypes.includes(this.extension)
    }
    isDataFile(){
        return !textFileTypes.includes(this.extension) && !imageFileTypes.includes(this.extension)
    }

    getLanguage(){
         switch(this.extension){
             case "js":
                 return "javascript";
             case "css":
                 return "css";
             case "html":
                 return "html";
             case "py":
                 return "python";
             case "rs":
                 return "rust";
             case "cpp":
                 return "c++";
             case "c":
                 return "c++";
             default:
                 return "text";
         }
    }
}

function getFolderDom(key:string, folder:Folder){
    let wrapperEl = document.createElement("div");
    wrapperEl.classList.add("folder-wrapper");
    wrapperEl.innerHTML = `
                    <div class="folder-icon ">
                        <div class="name-icon">
                            <img src="https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Files/folder.png?raw=true">
                            <span class='name'>${key}</span>
                        </div>
                        <span class="buttons">
                            <i class='far fa-file-alt new-file-button'></i>
                            <i class="far fa-folder new-folder-button"></i>
                        </span>
                    </div>
                    <div class="folder ${key}"></div>
                `
    return wrapperEl
}

function cleanFileName(filename: string){
    let tmp = filename;
    for(let char in blacklistedChars){
        tmp.replace(char,"");
    }
    return tmp.trim();
}

function hasFileIcon(extension:string):boolean{
    let allowedExtensions = ["css","html","ico","jar","jpg","js","mp3","obj","png","py","svg","sys","txt"]
    return allowedExtensions.indexOf(extension) !== -1;

}

export {Filesystem,isFolder,FilesystemFile,Folder,System,getFolderDom,cleanFileName}