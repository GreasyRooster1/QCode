import {makeRequest} from "../../utils/cloudAgentAPI";


const openProtocol = "qcodecloudagent://";

class Sketch{
    readonly name: string;
    readonly port :string;
    constructor(name:string,port:string) {
        this.name = name;
        this.port = port;
        this.doRequest("create","").catch(e=>{});
    }

    private doRequest(type:string,body:string):Promise<object> {
        return makeRequest(type+"/"+this.name,body,this.port);
    }

    writeCode(code:string):Promise<object> {
        return this.doRequest("write", code)
    }

    compile():Promise<object> {
        return this.doRequest("compile", "")
    }

    upload():Promise<object> {
        return this.doRequest("upload", "")
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