import {editor} from './codeEditor.js';

function getCodeFromEditor(){
    return editor.state.doc.toString();
}

function runCode(){
    let code = getCodeFromEditor();
    safeEval(code,logConsoleEvent);
}

function logConsoleEvent(message){
    //todo: output to a console

    //console log is overridden in this context
    console.warn("outputted to console: "+message);
}

document.querySelector(".run-button").addEventListener("click", function() {
    runCode();
});