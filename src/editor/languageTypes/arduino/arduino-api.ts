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
                body: body,
                mode:"no-cors",
            }).then(async (response: Response) => {
                console.log(response);
                if (response.ok) {
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
        fetch(serverAddress+"/status",{
            method: "GET",
            mode:"no-cors",
        }).then(r => {
            resolve(new Sketch(name));
        }).catch(err=>{
            window.location.href = openProtocol;
            setTimeout(()=>{
                window.location.reload();
            },5000);
        })
    });
}


export {serverAddress,Sketch,startSketchServer}