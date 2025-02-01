const serverAddress = "http://localhost:8080";

class Sketch{
    readonly name: string;
    constructor(name:string) {
        this.name = name;
    }

    private makeRequest(type:string) {
        fetch(serverAddress+"/"+type+"/"+this.name,{
            method:"GET",
            body:
        })
    }

    writeCode(code:string):void{

    }
}


function createSketch(name:string):Sketch{
    return new Sketch(name);
}

export {serverAddress}