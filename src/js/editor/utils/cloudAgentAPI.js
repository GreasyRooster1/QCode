var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const serverAddress = "http://localhost";
const openProtocol = "qcodecloudagent://";
const globalVersion = "2.0";
const globalPort = "8181";
var ServerType;
(function (ServerType) {
    ServerType["Arduino"] = "arduino";
    ServerType["Python"] = "python";
})(ServerType || (ServerType = {}));
var GlobalServerConnectionError;
(function (GlobalServerConnectionError) {
    GlobalServerConnectionError[GlobalServerConnectionError["CouldNotConnect"] = 0] = "CouldNotConnect";
    GlobalServerConnectionError[GlobalServerConnectionError["IncorrectVersion"] = 1] = "IncorrectVersion";
})(GlobalServerConnectionError || (GlobalServerConnectionError = {}));
var GlobalServerStatus;
(function (GlobalServerStatus) {
    GlobalServerStatus[GlobalServerStatus["Connected"] = 0] = "Connected";
    GlobalServerStatus[GlobalServerStatus["IncorrectVersion"] = 1] = "IncorrectVersion";
    GlobalServerStatus[GlobalServerStatus["Failed"] = 2] = "Failed";
})(GlobalServerStatus || (GlobalServerStatus = {}));
function makeGlobalRequest(uri, body) {
    return makeRequest(uri, body, globalPort, true);
}
function makeRequest(uri, body, port, isDataRequest) {
    debugger;
    return new Promise((resolve, reject) => {
        console.trace(serverAddress + ":" + port + "/" + uri);
        fetch(serverAddress + ":" + port + "/" + uri, {
            method: isDataRequest ? "GET" : "POST",
            body: isDataRequest ? undefined : body,
        }).then((response) => __awaiter(this, void 0, void 0, function* () {
            console.log(response);
            if (response.ok) {
                if (isDataRequest) {
                    let text = yield response.text();
                    console.log(text);
                    resolve(text);
                }
                else {
                    let json = yield response.json();
                    if (json.success) {
                        resolve(json);
                    }
                    else {
                        console.log(json);
                        reject(json);
                    }
                }
            }
            else {
                reject("failed to connect to could agent");
            }
        })).catch((e) => {
            reject("failed to connect to could agent");
        });
    });
}
function startServer(type) {
    return new Promise((resolve, reject) => {
        makeGlobalRequest("start/" + type.valueOf(), "").then((port) => {
            console.trace(port);
            resolve(port);
        }).catch(e => {
            reject(e);
        });
    });
}
function checkGlobalServer() {
    return new Promise((resolve, reject) => {
        makeGlobalRequest("version", "").then((data) => {
            let ver = data;
            console.log(ver);
            if (ver.startsWith(globalVersion)) {
                resolve("Connected");
            }
            else {
                console.log("Incorrect version: " + ver);
                reject(GlobalServerConnectionError.IncorrectVersion);
            }
        }).catch(e => {
            console.error(e);
            reject(GlobalServerConnectionError.CouldNotConnect);
        });
    });
}
function establishAgentConnection(depth) {
    return new Promise((resolve, reject) => {
        console.log(depth);
        if (depth < 1) {
            resolve(GlobalServerStatus.Failed);
            return;
        }
        checkGlobalServer().then(out => {
            resolve(GlobalServerStatus.Connected);
        }).catch(err => {
            console.log(err);
            if (err == GlobalServerConnectionError.CouldNotConnect) {
                window.location.href = openProtocol;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield establishAgentConnection(depth - 1));
                }), 5000);
            }
            if (err == GlobalServerConnectionError.IncorrectVersion) {
                resolve(GlobalServerStatus.IncorrectVersion);
            }
        });
    });
}
export { makeGlobalRequest, makeRequest, openProtocol, ServerType, startServer, establishAgentConnection, serverAddress, GlobalServerStatus };
