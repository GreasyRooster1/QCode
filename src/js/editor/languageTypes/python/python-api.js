import { makeRequest, ServerType, startServer } from "../../utils/cloudAgentAPI";
const pythonVersion = "1.0";
class PythonProject {
    constructor(name, port) {
        this.name = name;
        this.port = port;
    }
    doRequest(type, body) {
        return makeRequest(type + "/" + this.name, body, this.port, false);
    }
    write(serializedFilesystem) {
        console.log(serializedFilesystem);
        return this.doRequest("write", serializedFilesystem);
    }
    deserialize() {
        return this.doRequest("deserialize", "");
    }
    execute() {
        return this.doRequest("execute", "");
    }
    collectLogs() {
        return this.doRequest("log", "");
    }
}
function checkPythonServer(project) {
    return new Promise((resolve, reject) => {
        makeRequest("version", "", project.port, true).then((data) => {
            let ver = data;
            if (ver.startsWith(pythonVersion)) {
                resolve();
            }
            else {
                console.log("Incorrect version: " + ver);
                reject(ver);
            }
        });
    });
}
function startPythonServer(name) {
    return new Promise((resolve, reject) => {
        startServer(ServerType.Python).then((port) => {
            let sketch = new PythonProject(name, port);
            checkPythonServer(sketch).then(() => {
                console.log(sketch);
                resolve(sketch);
            }).catch(e => {
                reject(e);
            });
        });
    });
}
export { PythonProject, startPythonServer };
