const serverAddress = "http://localhost:8080";

class Sketch{
    readonly name: string;
    constructor(name:string) {
        this.name = name;
    }

    private makeRequest(type:string,body:string):Promise<object> {
        return new Promise((resolve, reject) => {
            fetch(serverAddress + "/" + type + "/" + this.name, {
                method: "GET",
                body: body
            }).then(async (response: Response) => {
                if (response.status === 200) {
                    resolve(await response.json());
                } else {
                    reject()
                }
            })
        });
    }

    writeCode(code:string):Promise<object> {
        return this.makeRequest("write", code)
    }

    compile():Promise<object> {
        return this.makeRequest("compile", "")
    }

    upload():Promise<object> {
        return this.makeRequest("upload", "")
    }
}


function createSketch(name:string):Sketch{
    return new Sketch(name);
}

export {serverAddress,Sketch,createSketch}