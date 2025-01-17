const dotReplacer = "➽";
const blacklistedChars = [".", "$", "#", "[", "]", "/","\\"];

interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File|Folder
}

class Filesystem{
    private system:System;
    defaultFile:File;
    onFileSystemUpdate:Function;

    constructor() {
        this.system = {
            "/": {
                "index.html": new File("index", "html"),
                "index.js": new File("index", "js"),
                "index.css": new File("index", "css"),
            }
        }
        this.defaultFile = <File>this.system["/"]["index.html"];
        this.onFileSystemUpdate = ()=>{};
    }

    getFile(path:string):File{
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
        return <File>parentFolder[name!]
    }

    getFolder(path:string):Folder{
        let sections = path.split("/");
        sections.pop();
        let parentFolder = this.system["/"];
        for(let folder in sections){
            let next = parentFolder[folder]
            if(isFolder(next)){
                parentFolder = <Folder>next;
            }
        }
        return parentFolder;
    }

    addFile(file:File,location:string){
        this.getFolder(location)[file.name] = file;
        this.onFileSystemUpdate();
    }

    getFileById(id:number):File|null{
        return this.findFile(this.system["/"],id);
    }
    findFile(folder:Folder,id:number):File|null{
        // @ts-ignore
        for (let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                let out = this.findFile(frag,id)
                if(out!==null){
                    return out;
                }
            }
            if(frag.id==id){
                return frag;
            }
        }
        return null;
    }

    deleteFile(folder:Folder,id:number){
        // @ts-ignore
        for (let [key,frag] of Object.entries(folder)){
            if(isFolder(frag)){
                this.deleteFile(frag,id);
            }
            if(frag.id==id){
                frag.isDeleted = true;
                return;
            }
        }
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
                this.serializeFolder(frag,jsonObject[key]);
                continue;
            }
            if(frag.isDeleted){
                continue;
            }
            let serializedName = frag.getSerializedName();
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
            let file = new File(split[0], split[1]);
            file.content = value;
            // @ts-ignore
            folder[split.join(".")] = file;
        }
        return folder
    }
}

const isFolder = (value: Folder|File)=> {
    return !(value instanceof File);
}


class File{
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
            return "https://github.com/GreasyRooster1/QCodeStatic/blob/main/Files/file.png?raw=true"
        }
        if(this.extension=="sys"&&Math.random()<0.1){
            return "https://github.com/GreasyRooster1/QCodeStatic/blob/main/Files/sys.gif?raw=true"
        }
        return "https://github.com/GreasyRooster1/QCodeStatic/blob/main/Files/"+this.extension+".png?raw=true"
    }

    getSerializedName(){
        let name = this.name+dotReplacer+this.extension;
        name = name.replace(".",dotReplacer)
        for(let char in blacklistedChars){
            name.replace(char,"");
        }
        return name;
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

function createFolderEl(key:string,folder:Folder){
    let wrapperEl = document.createElement("div");
    wrapperEl.classList.add("folder-wrapper");
    wrapperEl.innerHTML = `
                    <div class="folder-icon ">
                        <div class="name-icon">
                            <img src="https://github.com/GreasyRooster1/QCodeStatic/blob/main/Files/folder.png?raw=true">
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

export {Filesystem,isFolder,File,Folder,System,createFolderEl,cleanFileName}