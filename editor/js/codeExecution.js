const stopElement = document.querySelector('.stop-button');
const frame = document.querySelector('#exec-frame');
const consoleOut = document.querySelector('.console-output-pane');
let iWindow = null;
let editor;

onload = function () {
    editor = window.__exportedEditorContext;
}

document.querySelector(".run-button").addEventListener("click", function() {
    runCode();
});

function getCodeFromEditor(){
    return editor.state.doc.toString();
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
    consoleOut.appendChild(logEl);
});

frame.addEventListener("load", () => {
    iWindow = frame.contentWindow;
    console.log(iWindow);
});