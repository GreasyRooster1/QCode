const openProtocol = "qcodecloudagent://";
const expectedVersion = "1.0";

class Sketch{
    readonly name: string;
    readonly port :string;
    constructor(name:string,port:string) {
        this.name = name;
        this.port = port;
        this.makeRequest("create","").catch(e=>{});
    }

    private makeRequest(type:string,body:string):Promise<object> {
        makeRequest()
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
        try {
            fetch(serverAddress + "/version", {
                method: "GET",
            }).then(async r => {
                if (!r.ok) {
                    reject("failed to connect")
                }
                let text = await r.text()
                console.log("text:", text)
                if (text.startsWith(expectedVersion)) {
                    resolve(new Sketch(name));
                } else {
                    reject("incorrect version")
                }

            }).catch(err => {
                reject("failed to connect")
            })
        }catch (err){
            reject("failed to connect")
        }
    });
}


export {Sketch,startSketchServer,openProtocol}