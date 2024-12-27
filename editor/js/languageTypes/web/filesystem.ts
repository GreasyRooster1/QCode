
interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File
}


class Filesystem{
    private folders:System;
    onFileSystemUpdate:Function;

    constructor() {
        this.folders = {
            "/": {
                "index.html": new File("index", "html"),
            },
            "/js": {
                "index.js": new File("index", "js"),
            }
        }
        this.onFileSystemUpdate = ()=>{};
    }

    getFile(path:string):File|undefined{
        let sections = path.split("/");
        let name = sections.pop()
        let parentFolder = this.folders[sections.join("/")];
        if(name==undefined){
            return undefined;
        }
        // @ts-ignore
        return <File>parentFolder[name]
    }

    getFolder(path:string):Folder{
        let sections = path.split("/");
        sections.pop()
        let parentFolder = sections.join("/");
        return this.folders[parentFolder]
    }

    addFile(file:File,location:string){
        this.getFolder(location)[file.name] = file;
        this.onFileSystemUpdate();
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