import { makeRequest, ServerType, startServer } from "../../utils/cloudAgentAPI";
const arduinoVersion = "1.0";
class Sketch {
    constructor(name, port) {
        this.name = name;
        this.port = port;
        this.doRequest("create", "").catch(e => { });
    }
    doRequest(type, body) {
        return makeRequest(type + "/" + this.name, body, this.port, false);
    }
    writeCode(code) {
        return this.doRequest("write", code);
    }
    compile() {
        return this.doRequest("compile", "");
    }
    upload() {
        return this.doRequest("upload", "");
    }
    openSerialMonitor() {
        return this.doRequest("serial", "");
    }
}
function checkSketchServer(sketch) {
    return new Promise((resolve, reject) => {
        makeRequest("version", "", sketch.port, true).then((data) => {
            let ver = data;
            if (ver.startsWith(arduinoVersion)) {
                resolve(sketch);
            }
            else {
                console.log("Incorrect version: " + ver);
                reject(ver);
            }
        });
    });
}
function startSketchServer(name) {
    return new Promise((resolve, reject) => {
        startServer(ServerType.Arduino).then((port) => {
            let sketch = new Sketch(name, port);
            checkSketchServer(sketch).then((s) => {
                console.log(s);
                resolve(s);
            }).catch(e => {
                reject(e);
            });
        });
    });
}
export { Sketch, startSketchServer };
