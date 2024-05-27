import {editor} from './codeEditor.js';

function getCodeFromEditor(){
    return editor.state.doc.toString();
}

function runCode(){
    let code = getCodeFromEditor();
    let logStack = safeEval(code);
    displayLogStack(logStack);
}

function displayLogStack(logStack){
    for (let log of logStack) {
        //todo: output to a console
    }
}

document.querySelector(".run-button").addEventListener("click", function() {
    runCode();
});