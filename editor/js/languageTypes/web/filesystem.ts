const dotReplacer = "➽";
const blacklistedChars = [".", "$", "#", "[", "]", "/",];

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
    constructor(name:string, extension: string) {
        this.name = name;
        this.extension = extension;
        this.content = "";
        this.id = Math.random()*999999;
    }

    appendToHtml(upperHtml:any){
        let el = document.createElement("div");
        el.innerHTML = `
            <img class="icon" src="`+this.getIconUrl()+`">
            <span class="filename">`+this.name+"."+this.extension+`</span>
        `
        el.classList.add("file")
        el.classList.add(this.name)
        el.setAttribute("data-filename",this.name+"."+this.extension);
        el.setAttribute("data-id",String(this.id));
        upperHtml.appendChild(el);
    }

    getIconUrl(){
        return "https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/"+this.extension+".png?raw=true"
    }

    getSerializedName(){
        let name = this.name+dotReplacer+this.extension;
        name = name.replace(".",dotReplacer)
        for(let char in blacklistedChars){
            name.replace(char,"");
        }
        return name;
    }
    language(){
        
    }
}

export {Filesystem,isFolder,File,Folder,System}