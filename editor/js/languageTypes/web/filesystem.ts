
interface System{
    [location:string]:Folder
}
interface Folder{
    [name:string]:File
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