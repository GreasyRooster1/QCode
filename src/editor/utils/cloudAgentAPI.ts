import {Sketch, startSketchServer} from "../languageTypes/arduino/arduino-api";

const globalServerAddress = "http://localhost:8181";
const serverAddress = "http://localhost";
const openProtocol = "qcodecloudagent://";
const globalVersion = "2.0";
const globalPort = "8181";

enum ServerType {
    Arduino = "arduino",
    Python = "python",
}

function makeGlobalRequest(uri:string,body:string):Promise<string> {
    return makeRequest(uri,body,globalPort,true) as Promise<string>;
}

function makeRequest(uri:string,body:string,port:string,isDataRequest:boolean):Promise<object|string> {
    return new Promise((resolve, reject) => {
        fetch(globalServerAddress+":"+port + "/" + uri, {
            method: isDataRequest?"GET":"POST",
            body: body,
        }).then(async (response: Response) => {
            console.log(response);
            if (response.ok) {
                if(isDataRequest){
                    resolve(await response.text());
                    return;
                }
                let json = await response.json()
                if(json.success) {
                    resolve(json);
                }else{
                    console.log(json);
                    reject(json)
                }
            } else {
                reject("failed to connect to could agent")
            }
        }).catch((e) => {
            reject("failed to connect to could agent");
        })
    });
}

function startServer(type:ServerType):Promise<string> {
    return new Promise((resolve, reject) => {
        makeGlobalRequest("/start/" + type.valueOf(), "").then((port: string) => {
            console.log(port);
            resolve(port);
        }).catch(e => {
            reject(e);
        })
    })
}

function checkGlobalServer():Promise<string>{
    return new Promise((resolve, reject) => {
        makeRequest("version","",sketch.port,true).then((data)=>{
            let ver = data as string;
            if(ver.startsWith(globalVersion)){
                resolve(sketch);
            }else{
                console.log("Incorrect version: "+ver);
                reject(ver);
            }
        })
    });
}

function establishAgentConnection(depth:number):string{
    if(depth<1){
        return "<a href='github.com/GreasyRooster1/QCodeCloudAgent/releases/latest'>Agent not installed!</a>";
    }
    makeGlobalRequest("status","").then(out=>{
        return "Connected";
    }).catch(err=>{
        if(err=="failed to connect to could agent"){
            window.location.href = openProtocol
            return "Launching... ("+depth+")"
            setTimeout(()=>{
                return establishAgentConnection(depth-1)
            },5000)
        }
        if(err=="incorrect version"){
            return "Incorrect agent version"
        }
    });
}

export {makeGlobalRequest,makeRequest,openProtocol,ServerType,startServer,establishAgentConnection}