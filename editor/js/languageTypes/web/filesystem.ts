
interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File|Folder
}


class Filesystem{
    folders:System;
    constructor() {
        this.folders = {
            "/": {
                "index.html": new File("index", "html"),
            }
        }
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