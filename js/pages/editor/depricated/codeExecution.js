const stopButton = document.querySelector('.stop-button');
const runButton = document.querySelector('.run-button');

const frame = document.querySelector('#exec-frame');
const consoleOut = document.querySelector('.console-output-pane');
const logHeads = {log:"Info",warn:"Warning",error:"Error"};
let iWindow = null;
let runningCode = false;

runButton.addEventListener("click", function() {
    resetAllOutputs()
    runningCode = true;
    runCode();
});

stopButton.addEventListener("click", function() {
    resetAllOutputs()
});

function resetAllOutputs(){
    consoleOut.innerHTML = "";
    frame.contentWindow.location.reload();
    iWindow = null;
    runningCode = false;
}

function getCodeFromEditor(){
    return window.editor.state.doc.toString();
}

function runCode(){
    if (iWindow === null) {
        return;
    }

    let code = getCodeFromEditor();

    //send code to frame
    iWindow.postMessage(code);
}


//when we get a message from the frame
window.addEventListener("message", (event) => {
    let log = JSON.parse(event.data);
    console.log("received log from frame: "+log.type+" - "+log.message);

    let logEl = document.createElement("console-log");
    logEl.setAttribute("type", log.type);
    logEl.setAttribute("message", log.message);
    logEl.setAttribute("head", logHeads[log.type]);
    consoleOut.insertBefore(logEl,consoleOut.firstChild);
});

frame.addEventListener("load", () => {
    iWindow = frame.contentWindow;
    console.log(iWindow);
    if(runningCode){
        runCode();
    }
});

window.getCodeFromEditor = getCodeFromEditor;
