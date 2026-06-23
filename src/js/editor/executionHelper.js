const frame = document.querySelector('#exec-frame');
let frameContent;
const logNames = { log: "Info", warn: "Warning", error: "Error" };
let frameLoadEvent;
function getCode() {
    // @ts-ignore
    return window.editor.state.doc.toString();
}
function setupEvents(frameLoadCallback, errorCallback) {
    console.log(frame);
    window.addEventListener("message", (event) => {
        let log;
        try {
            log = JSON.parse(event.data);
        }
        catch (error) {
            return;
        }
        console.log("received log from frame: " + log.type + " - " + log.message);
        errorCallback(log.message, log.type);
    });
    frameLoadEvent = () => {
        frameContent = frame.contentWindow;
        console.log(frameContent);
        frameLoadCallback();
    };
    frame.addEventListener("load", frameLoadEvent);
}
function runCode(code) {
    if (frameContent === null) {
        return;
    }
    //send code to frame
    frameContent.postMessage(code);
}
function stopFrame() {
    var _a;
    frame === null || frame === void 0 ? void 0 : frame.removeEventListener("load", frameLoadEvent);
    (_a = frame === null || frame === void 0 ? void 0 : frame.contentWindow) === null || _a === void 0 ? void 0 : _a.location.reload();
    frame === null || frame === void 0 ? void 0 : frame.addEventListener("load", () => {
        frame.addEventListener("load", frameLoadEvent);
    });
}
export { runCode, setupEvents, getCode, logNames, frameContent, frame, stopFrame };
