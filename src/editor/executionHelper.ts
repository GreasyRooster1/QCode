// @ts-ignore
import {editor} from "./codeEditor.js"
import {RunErrCallback} from "./languageTypes/projectType";

interface Logs {
    [log: string] : string;
}

interface frameLoadCallback {
    ():void
}

const frame: HTMLIFrameElement | null = document.querySelector('#exec-frame');
let frameContent: Window | null;
const logNames: Logs = {log:"Info",warn:"Warning",error:"Error"};
let frameLoadEvent: {():void};

function getCode(){
    // @ts-ignore
    return window.editor.state.doc.toString();
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

    frameLoadEvent = () => {
        frameContent = frame!.contentWindow;
        console.log(frameContent);
        frameLoadCallback();
    }
    frame!.addEventListener("load", frameLoadEvent);
}

function runCode(code:string){
    if (frameContent === null) {
        return;
    }
    //send code to frame
    frameContent.postMessage(code);
}

function stopFrame(){
    frame?.removeEventListener("load",frameLoadEvent)
    frame?.contentWindow?.location.reload();
    frame?.addEventListener("load", ()=>{
        frame!.addEventListener("load", frameLoadEvent);
    });
}

export {runCode,setupEvents,getCode,logNames,frameContent,frame,frameLoadCallback,stopFrame};