let parent = null;

const oldLog = console.log;
const oldWarn = console.warn;
const oldErr = console.error;

console.log = function (...args) {
    logMessage("log",args);
}

console.warn = function (...args) {
    logMessage("warn",args);
}

console.error = function (...args) {
    logMessage("error",args);
}

//log errors
window.onerror = function(error) {
    logMessage("error",error);
}

function logMessage(type,...args){
    if (parent === null) {
        return;
    }
    let log = {type:type,message:args.join(" ")};
    parent.postMessage(JSON.stringify(log));
}


window.addEventListener("message", ({ data, source }) => {
    if (parent === null) {
        parent = source;
    }

    runJs(data);
});

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

function runJs(js){
    //clear dangerous objects and run code
    eval(`
        XMLHttpRequest=null;
        XMLHttpRequestUpload=null;
        runJs=null;
    `+js);

    let eventFunctions = [];

    for (let acceptedFunc of acceptedFunctions){
        let funcDef;
        try {
            funcDef = eval(acceptedFunc);
        }catch(e){
            funcDef = undefined;
        }

        if (funcDef !== undefined) {
            eventFunctions.push(funcDef);
        }
    }

    if(draw===undefined||setup===undefined){
        return;
    }

    startP5(draw,setup,eventFunctions);
}
