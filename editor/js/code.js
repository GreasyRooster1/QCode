import {editor} from './codeEditor.js';

function getCodeFromEditor(){
    return editor.state.doc.toString();
}

export function runCode(){
    let code = getCodeFromEditor();
    console.log(code);
}
