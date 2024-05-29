//safe usage of eval() in modules

//todo: stop execution
//maybe run in an iframe??

const stopElement = document.querySelector('.stop-button');

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