import {editor} from "./codeEditor"

interface Logs {
    [log: string] : string;
}

const frame: HTMLIFrameElement | null = document.querySelector('#exec-frame');
const consoleOut = document.querySelector('.console-output-pane');
export const logNames: Logs = {log:"Info",warn:"Warning",error:"Error"};

export function getCode(){
    return editor.state.doc.toString();
}

export function setupEvents(){
    window.addEventListener("message", (event) => {
        let log;
        try {
            log = JSON.parse(event.data);
        }catch (error) {
            return
        }
        console.log("received log from frame: "+log.type+" - "+log.message);


    });

    frame!.addEventListener("load", () => {
        iWindow = frame!.contentWindow;
        console.log(iWindow);
        runCode();
    });
}

