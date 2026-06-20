//arduino.work
import { ProjectType } from "./projectType";
import { writeToEditor } from "../utils/loadUtils";
import { establishAgentConnection, GlobalServerStatus } from "../utils/cloudAgentAPI";
const possibleStatuses = ["not-connected", "connected", "ok", "write", "compile", "upload", "execute", "deserialize"];
class CloudAgentType extends ProjectType {
    constructor() {
        super(false);
        this.executionStatus = "not-connected";
        this.failedExecution = false;
    }
    setupEditor() {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.querySelector(".console-head")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "");
        (_b = document.querySelector(".console-log-area")) === null || _b === void 0 ? void 0 : _b.setAttribute("style", "flex-direction:column");
        this.statusDisplay = (_c = document.querySelector(".output-head")) === null || _c === void 0 ? void 0 : _c.appendChild(document.createElement('div'));
        this.statusText = (_d = document.querySelector(".output-head")) === null || _d === void 0 ? void 0 : _d.appendChild(document.createElement('div'));
        (_e = this.statusDisplay) === null || _e === void 0 ? void 0 : _e.classList.add("status-display");
        (_f = this.statusText) === null || _f === void 0 ? void 0 : _f.classList.add("status-text");
        this.updateStatusDisplay();
    }
    onLoad() {
        writeToEditor(this.projectData["code"]);
    }
    setupConnection() {
        establishAgentConnection(3).then(status => {
            if (status == GlobalServerStatus.Connected) {
                this.statusText.innerHTML = "Connected";
                this.setExecStatus("connected");
                this.setupAgentConnection();
            }
            if (status == GlobalServerStatus.IncorrectVersion) {
                this.statusText.innerHTML = "Incorrect Agent Version";
                this.setExecStatus("not-connected");
            }
            if (status == GlobalServerStatus.Failed) {
                this.statusText.innerHTML = "Failed to connect";
                this.setExecStatus("not-connected");
            }
        });
    }
    runErrorCallback(content, type) {
        this.appendLog(content, type);
    }
    setExecStatus(status) {
        this.executionStatus = status;
        this.failedExecution = false;
        this.updateStatusDisplay();
    }
    failExec() {
        this.failedExecution = true;
        this.updateStatusDisplay();
    }
    updateStatusDisplay() {
        var _a, _b, _c, _d, _e, _f;
        for (let p of possibleStatuses) {
            (_a = this.statusDisplay) === null || _a === void 0 ? void 0 : _a.classList.remove(p);
            (_b = this.statusText) === null || _b === void 0 ? void 0 : _b.classList.remove(p);
        }
        (_d = (_c = this.statusDisplay) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add(this.executionStatus);
        (_f = (_e = this.statusText) === null || _e === void 0 ? void 0 : _e.classList) === null || _f === void 0 ? void 0 : _f.add(this.executionStatus);
        let txt = "";
        if (this.failedExecution) {
            if (this.executionStatus == "ok") {
                txt = "Failed";
            }
            if (this.executionStatus == "write") {
                txt = "Failed to write sketch";
            }
            if (this.executionStatus == "compile") {
                txt = "Failed to compile sketch";
            }
            if (this.executionStatus == "upload") {
                txt = "Failed to upload sketch";
            }
            if (this.executionStatus == "not-connected") {
                txt = "Agent not connected";
            }
        }
        else {
            if (this.executionStatus == "ok") {
                txt = "Success!";
            }
            if (this.executionStatus == "connected") {
                txt = "Connected!";
            }
            if (this.executionStatus == "write") {
                txt = "Writing...";
            }
            if (this.executionStatus == "compile") {
                txt = "Compiling...";
            }
            if (this.executionStatus == "upload") {
                txt = "Uploading...";
            }
            if (this.executionStatus == "not-connected") {
                txt = "Agent not connected";
            }
            if (this.executionStatus == "deserialize") {
                txt = "Deserializing...";
            }
            if (this.executionStatus == "execute") {
                txt = "Executing...";
            }
        }
        this.statusText.innerHTML = txt;
    }
}
export { CloudAgentType };
