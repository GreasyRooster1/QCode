import {Sketch, startSketchServer} from "../languageTypes/arduino/arduino-api";

const serverAddress = "http://localhost";
const openProtocol = "qcodecloudagent://";
const globalVersion = "2.0";
const globalPort = "8181";

enum ServerType {
    Arduino = "arduino",
    Python = "python",
}

enum GlobalServerConnectionError{
    CouldNotConnect,
    IncorrectVersion
}

enum GlobalServerStatus{
    Connected,
    IncorrectVersion,
    Failed,
}

function makeGlobalRequest(uri:string,body:string):Promise<string> {
    return makeRequest(uri,body,globalPort,true) as Promise<string>;
}

function makeRequest(uri:string,body:string,port:string,isDataRequest:boolean):Promise<object|string> {
    return new Promise((resolve, reject) => {
        console.log(serverAddress+":"+port + "/" + uri)
        fetch(serverAddress+":"+port + "/" + uri, {
            method: isDataRequest?"GET":"POST",
            body: isDataRequest?undefined:body,
        }).then(async (response: Response) => {
            console.log(response);
            if (response.ok) {
                if(isDataRequest){
                    let text = await response.text()
                    console.log(text)
                    resolve(text);
                }else {
                    let json = await response.json()
                    if (json.success) {
                        resolve(json);
                    } else {
                        console.log(json);
                        reject(json)
                    }
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
        makeGlobalRequest("start/" + type.valueOf(), "").then((port: string) => {
            console.trace(port);
            resolve(port);
        }).catch(e => {
            reject(e);
        })
    })
}

function checkGlobalServer():Promise<string>{
    return new Promise((resolve, reject) => {
        makeGlobalRequest("version","").then((data)=>{
            let ver = data as string;
            console.log(ver);
            if(ver.startsWith(globalVersion)){
                resolve("Connected");
            }else{
                console.log("Incorrect version: "+ver);
                reject(GlobalServerConnectionError.IncorrectVersion);
            }
        }).catch(e => {
            console.error(e);
            reject(GlobalServerConnectionError.CouldNotConnect);
        })
    });
}

function establishAgentConnection(depth:number):Promise<GlobalServerStatus>{
    return new Promise((resolve, reject) => {
        console.log(depth)
        if (depth<1) {
            resolve(GlobalServerStatus.Failed);
            return;
        }
        checkGlobalServer().then(out => {
            resolve(GlobalServerStatus.Connected);
        }).catch(err => {
            console.log(err);
            if (err == GlobalServerConnectionError.CouldNotConnect) {
                window.location.href = openProtocol
                setTimeout(async () => {
                    resolve(await establishAgentConnection(depth-1))
                }, 5000)
            }
            if (err == GlobalServerConnectionError.IncorrectVersion) {
                resolve(GlobalServerStatus.IncorrectVersion);
            }
        });
    });
}

export {makeGlobalRequest,makeRequest,openProtocol,ServerType,startServer,establishAgentConnection,serverAddress,GlobalServerStatus}