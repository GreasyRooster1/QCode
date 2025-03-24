import {makeRequest, ServerType, startServer} from "../../utils/cloudAgentAPI";

const pythonVersion ="1.0";

class PythonProject{
    readonly name: string;
    readonly port :string;
    constructor(name:string,port:string) {
        this.name = name;
        this.port = port;
    }

    private doRequest(type:string,body:string):Promise<object> {
        return makeRequest(type+"/"+this.name,body,this.port,false) as Promise<object>;
    }

    write(serializedFilesystem:string):Promise<object> {
        return this.doRequest("write", serializedFilesystem)
    }


    deserialize():Promise<object> {
        return this.doRequest("deserialize", "")
    }

    execute():Promise<object> {
        return this.doRequest("execute", "")
    }
}


function checkPythonServer(project:PythonProject):Promise<void> {
    return new Promise((resolve, reject) => {
        makeRequest("version","",project.port,true).then((data)=>{
            let ver = data as string;
            if(ver.startsWith(pythonVersion)){
                resolve();
            }else{
                console.log("Incorrect version: "+ver);
                reject(ver);
            }
        })
    });
}

function startPythonServer(name:string):Promise<PythonProject>{
    return new Promise((resolve, reject) => {
        startServer(ServerType.Python).then((port: string) => {
            let sketch = new PythonProject(name, port);
            checkPythonServer(sketch).then(() => {
                console.log(sketch);
                resolve(sketch);
            }).catch(e => {
                reject(e);
            });
        })
    });
}


export {PythonProject,startPythonServer}