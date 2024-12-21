import {editor} from "./codeEditor.js"
import {RunErrCallback} from "./languageTypes/projectType.js";

interface Logs {
    [log: string] : string;
}

export interface frameLoadCallback {
    ():void
}

const frame: HTMLIFrameElement | null = document.querySelector('#exec-frame');
const consoleOut = document.querySelector('.console-output-pane');
export let frameContent: Window | null;
export const logNames: Logs = {log:"Info",warn:"Warning",error:"Error"};

export function getCode(){
    return editor.state.doc.toString();
}

export function setupEvents(frameLoadCallback:frameLoadCallback,errorCallback:RunErrCallback){
    window.addEventListener("message", (event) => {
        let log;
        try {
            log = JSON.parse(event.data);
        }catch (error) {
            return
        }
        console.log("received log from frame: "+log.type+" - "+log.message);

        errorCallback(log.type,log.message);
    });

    frame!.addEventListener("load", () => {
        frameContent = frame!.contentWindow;
        console.log(frameContent);
        frameLoadCallback();
    });
}

export function runCode(code:string){
    if (frameContent === null) {
        return;
    }

    //send code to frame
    frameContent.postMessage(code);
}