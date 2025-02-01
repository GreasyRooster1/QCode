const serverAddress = "http://localhost:8181";
const openProtocol = "qcodecloudagent://";

class Sketch{
    readonly name: string;
    constructor(name:string) {
        this.name = name;
        this.makeRequest("create","");
    }

    private makeRequest(type:string,body:string):Promise<object> {
        return new Promise((resolve, reject) => {
            fetch(serverAddress + "/" + type + "/" + this.name, {
                method: "POST",
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


function startSketchServer(name:string):Promise<Sketch>{
    return new Promise((resolve, reject) => {
        fetch(serverAddress+"/status").then(r => {
            resolve(new Sketch(name));
        }).catch(err=>{
            window.location.href = openProtocol;
            console.log("test");
        })
    });
}


export {serverAddress,Sketch,startSketchServer}