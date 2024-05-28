//safe usage of eval() in modules

//todo: stop execution

function handleLogOutputs(value,consoleOutputFunction){
    consoleOutputFunction(value);
}

function safeEval(src,consoleOutputFunction) {
    eval(`with({window: {},
        document: {},
        eval: {},
        XMLHttpRequest: {},
        globalThis:{},
        __handleLogOutputsConnection:{func:handleLogOutputs,handle:consoleOutputFunction},
        Function: {}}) {
            let __defaultConsoleLog = console.log;
            console.log = function (...value) {
                //__defaultConsoleLog.apply(console, value);
                __handleLogOutputsConnection.func(value,__handleLogOutputsConnection.handle);
            }
            ${src}}
        `);
}