import {editor} from "./codeEditor.js"
import {RunErrCallback} from "./languageTypes/projectType.js";

interface Logs {
    [log: string] : string;
}

interface frameLoadCallback {
    ():void
}

const frame: HTMLIFrameElement | null = document.querySelector('#exec-frame');
const consoleOut = document.querySelector('.console-output-pane');
let frameContent: Window | null;
const logNames: Logs = {log:"Info",warn:"Warning",error:"Error"};

function getCode(){
    return editor.state.doc.toString();
}

function setupEvents(frameLoadCallback:frameLoadCallback,errorCallback:RunErrCallback){
    console.log(frame)
    window.addEventListener("message", (event) => {
        let log;
        try {
            log = JSON.parse(event.data);
        }catch (error) {
            return
        }
        console.log("received log from frame: "+log.type+" - "+log.message);

        errorCallback(log.message,log.type);
    });

    frame!.addEventListener("load", () => {
        frameContent = frame!.contentWindow;
        console.log(frameContent);
        frameLoadCallback();
    });
}

function runCode(code:string){
    if (frameContent === null) {
        return;
    }

    //send code to frame
    frameContent.postMessage(code);
}

export {runCode,setupEvents,getCode,logNames,frameContent,frame,frameLoadCallback};