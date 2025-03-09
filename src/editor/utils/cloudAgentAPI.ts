const globalServerAddress = "http://localhost:8181";
const serverAddress = "http://localhost";
const openProtocol = "qcodecloudagent://";
const expectedVersion = "2.0";
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

export {makeGlobalRequest,makeRequest,openProtocol,ServerType,startServer}