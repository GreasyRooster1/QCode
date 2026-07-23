import {makeRequest, ServerType, startServer} from "../../utils/cloudAgentAPI";

const arduinoVersion ="1.0";

class Sketch{
    readonly name: string;
    readonly port :string;
    constructor(name:string,port:string) {
        this.name = name;
        this.port = port;
        this.doRequest("create","").catch(e=>{});
    }

    private doRequest(type:string,body:string):Promise<object> {
        return makeRequest(type+"/"+this.name,body,this.port,false) as Promise<object>;
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

    openSerialMonitor():Promise<object>{
        return this.doRequest("serial", "")
    }
}


function checkSketchServer(sketch:Sketch):Promise<Sketch>{
    return new Promise((resolve, reject) => {
        makeRequest("version","",sketch.port,true).then((data)=>{
            let ver = data as string;
            if(ver.startsWith(arduinoVersion)){
                resolve(sketch);
            }else{
                console.log("Incorrect version: "+ver);
                reject(ver);
            }
        })
    });
}

function startSketchServer(name:string):Promise<Sketch>{
    return new Promise((resolve, reject) => {
        startServer(ServerType.Arduino).then((port: string) => {
            let sketch = new Sketch(name, port);
            checkSketchServer(sketch).then((s) => {
                console.log(s);
                resolve(s);
            }).catch(e => {
                reject(e);
            });
        })
    });
}


export {Sketch,startSketchServer}