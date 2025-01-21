import {acceptedFunctions, startP5} from "./p5Helper";

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
    let append = "(";
    for (let i=0; i < acceptedFunctions; i++) {
        append+="_"+acceptedFunctions[i]+":"+acceptedFunctions[i]+", ";
    }
    append+="_draw:draw, _setup:setup})";
    let functions = eval(js+"\n "+append);

    let eventFunctions = [];

    for (let acceptedFunc of acceptedFunctions){
        let funcDef;
        try {
            funcDef = functions.acceptedFunc;
        }catch(e){
            funcDef = undefined;
        }

        if (funcDef !== undefined) {
            eventFunctions.push(funcDef);
        }
    }
    let draw = functions._draw;
    let setup = functions._setup;

    if(draw===undefined||setup===undefined){
        return;
    }

    startP5(draw,setup,eventFunctions);
}

export {runJs}