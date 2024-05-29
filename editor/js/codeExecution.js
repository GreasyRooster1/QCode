const stopElement = document.querySelector('.stop-button');
let editor;

onload = function () {
    editor = window.__exportedEditorContext;
}

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

//todo: stop execution
//maybe run in an iframe??

function safeEval(src,consoleOutputFunction) {
    eval(`with({window: {},
        document: {},
        eval: {},
        XMLHttpRequest: {},
        globalThis:{},
        __exteriorHandle:{logOutputHandle:consoleOutputFunction,stopButtonElement:stopElement},
        Function: {}}) {
            let __defaultConsoleLog = console.log;
            console.log = function (...value) {
                __exteriorHandle.logOutputHandle(value);
            }
            __exteriorHandle.stopButtonElement.addEventListener('click', function(e){
                throw new Error("received stop command, terminating execution");
                return;
            });
            ${src}}
        `);
}