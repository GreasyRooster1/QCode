import {editor} from "./codeEditor"

interface Logs {
    [log: string] : string;
}

const frame: HTMLIFrameElement | null = document.querySelector('#exec-frame');
const consoleOut = document.querySelector('.console-output-pane');
const logHeads: Logs = {log:"Info",warn:"Warning",error:"Error"};

function getCode(){
    return editor.state.doc.toString();
}

function setupEvents(){
    window.addEventListener("message", (event) => {
        let log;
        try {
            log = JSON.parse(event.data);
        }catch (error) {
            return
        }
        console.log("received log from frame: "+log.type+" - "+log.message);

        let logEl = document.createElement("console-log");
        logEl.setAttribute("type", log.type);
        logEl.setAttribute("message", log.message);
        logEl.setAttribute("head", logHeads[log.type]);
        consoleOut!.insertBefore(logEl,consoleOut!.firstChild);
    });

    frame!.addEventListener("load", () => {
        iWindow = frame!.contentWindow;
        console.log(iWindow);
        runCode();
    });
}