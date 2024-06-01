const stopElement = document.querySelector('.stop-button');
const frame = document.getElementById('exec-frame');
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
    console.log(event);
});

frame.addEventListener("load", () => {
    iWindow = frame.contentWindow;
    console.log(iWindow);
});