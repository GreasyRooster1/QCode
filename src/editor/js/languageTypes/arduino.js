//arduino.work
import { ProjectType } from "./projectType.js";
import { frame, frameContent, getCode, logNames, runCode, setupEvents as setupExecEvents, stopFrame } from "../executionHelper.js";
class ArduinoType extends ProjectType {
    constructor() {
        super(false);
    }
    setupEditor() {
        setupExecEvents(() => {
            runCode(getCode());
        }, this.runErrorCallback);
    }
    onLoad() {
        writeToEditor(this.projectData["code"]);
    }
    saveCode() {
        let code = getCode();
        let user = getStoredUser();
        database.ref("userdata/" + user.uid + "/projects/" + this.projectId + "/code").set(code);
        database.ref("userdata/" + user.uid + "/projects/" + this.projectId + "/dateUpdated").set(Date.now() / 1000);
        if (this.hasLesson) {
            console.log(this.highestViewedStep);
            database.ref("userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep").set(this.highestViewedStep);
            database.ref("userdata/" + user.uid + "/projects/" + this.projectId + "/currentChapter").set(this.currentChapter);
        }
    }
    run(errorCallback) {
        var _a, _b;
        console.log(frameContent);
        if (frameContent == undefined) {
            (_b = (_a = frame === null || frame === void 0 ? void 0 : frame.contentWindow) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.reload();
        }
        frameContent === null || frameContent === void 0 ? void 0 : frameContent.location.reload();
        clearConsole();
    }
    stop() {
        stopFrame();
        clearConsole();
    }
    runErrorCallback(content, type) {
        let logEl = document.createElement("console-log");
        let consoleOut = document.querySelector(".console-output-pane");
        while (consoleOut.children.length > 100) {
            consoleOut.children[consoleOut.childElementCount - 1].remove();
        }
        logEl.setAttribute("type", type);
        logEl.setAttribute("message", content);
        logEl.setAttribute("head", logNames[type]);
        consoleOut.insertBefore(logEl, consoleOut.firstChild);
    }
    getLanguage() {
        return "c++";
    }
}
function clearConsole() {
    let consoleOut = document.querySelector(".console-output-pane");
    consoleOut.innerHTML = "";
}
export { ArduinoType };
