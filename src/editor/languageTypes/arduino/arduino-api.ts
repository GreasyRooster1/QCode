const serverAddress = "http://localhost:8181";
const openProtocol = "qcodecloudagent://";
const expectedVersion = "1.0";

class Sketch{
    readonly name: string;
    constructor(name:string) {
        this.name = name;
        this.makeRequest("create","").catch(e=>{});
    }

    private makeRequest(type:string,body:string):Promise<object> {
        return new Promise((resolve, reject) => {
            fetch(serverAddress + "/" + type + "/" + this.name, {
                method: "POST",
                body: body,
            }).then(async (response: Response) => {
                console.log(response);
                if (response.ok) {
                    let json = await response.json()
                    if(json.success) {
                        resolve(json);
                    }else{
                        console.log(json);
                        reject(json)
                    }
                } else {
                    reject("failed")
                }
            }).catch((e) => {
                reject("failed")
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


export {serverAddress,Sketch,startSketchServer,openProtocol}