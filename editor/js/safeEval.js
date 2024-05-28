//safe usage of eval() in modules

//todo: make console events exit this before completion

function safeEval(src) {
    let consoleStack = eval(`with({window: {},
        document: {},
        eval: {},
        XMLHttpRequest: {},
        globalThis:{},
        Function: {}}) {
            let _defaultConsoleLog = console.log;
            let _consoleLogStack = [];
            console.log = function (...value) {
                _defaultConsoleLog.apply(console, value);
                _consoleLogStack.push(value);
                return _consoleLogStack;
            }
            ${src}}
        `);
    return consoleStack;
}