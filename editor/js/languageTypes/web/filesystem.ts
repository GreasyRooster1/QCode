
interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File|Folder
}


class Filesystem{
    private folders:System;
    onFileSystemUpdate:Function;

    constructor() {
        this.folders = {
            "/": {
                "index.html": new File("index", "html"),
            }
        }
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
    constructor(name:string, extension: string) {
        this.name = name;
        this.extension = extension;
        this.content = "";
    }
}

export {Filesystem}