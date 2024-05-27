import {editor} from './codeEditor.js';

function getCodeFromEditor(){
    return editor.state.doc.toString();
}

function runCode(){
    let code = getCodeFromEditor();
    safeEval(code);
}

document.querySelector(".run-button").addEventListener("click", function() {
    runCode();
});