
interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File|Folder
}


class Filesystem{
    private folders:System;
    defaultFile:File;
    onFileSystemUpdate:Function;

    constructor() {
        this.folders = {
            "/": {
                "index.html": new File("index", "html"),
                "index.js": new File("index", "js"),
                "index.css": new File("index", "css"),
            }
        }
        this.defaultFile = <File>this.folders["/"]["index.html"];
        this.onFileSystemUpdate = ()=>{};
    }

    getFile(path:string):File{
        let sections = path.split("/");
        let name = sections.pop()
        let parentFolder = this.folders["/"];
        for(let folder in sections){
            let next = parentFolder[folder]
            if(isFolder(next)){
                parentFolder = <Folder>next;
            }
        }
        return <File>parentFolder[name!.split(".")[0]]
    }

    getFolder(path:string):Folder{
        let sections = path.split("/");
        sections.pop();
        let parentFolder = this.folders["/"];
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
        return this.findFile(this.folders[id],id);
    }
    findFile(folder:Folder,id:number):File|null{
        // @ts-ignore
        for (let [key,frag] of Object.entries(this.folders["/"])){
            if(isFolder(frag)){
                let out = this.findFile(folder,id)
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
        return this.folders
    }
}

const isFolder = (value: Folder|File)=> {
    if (value.extension)
        return false
    else
        return true;
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
}

export {Filesystem,isFolder,File,Folder,System}