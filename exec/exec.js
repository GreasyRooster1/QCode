let parent = null;

const oldLog = console.log;
const oldWarn = console.warn;
const oldErr = console.error;

let __userGeneratedDrawFunc;


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

function setup(){
    createCanvas(500,500);

    document.getElementById("defaultCanvas0").style.width = "100vmin";
    document.getElementById("defaultCanvas0").style.height = "100vmin";
}

function drawHandler(){
    if(__userGeneratedDrawFunc!==null&&__userGeneratedDrawFunc!==undefined){
        __userGeneratedDrawFunc()
        debugger;
    }
    window.requestAnimationFrame(drawHandler);
}

window.addEventListener("message", ({ data, source }) => {
    if (parent === null) {
        parent = source;
    }

    runJs(data);
});

function runJs(js){
    //clear dangerous objects and run code
    eval(`
        window=null;
        document=null;
        XMLHttpRequest=null;
        XMLHttpRequestUpload=null;
        runJs=null;
        setup=null;
    `+js);
    try {
        setup();
    }catch (e) {}
    try{
        __userGeneratedDrawFunc = draw;
        drawHandler();
    }catch(e) {}
}

function canvasTest(){
    background(0);
    stroke(255);

    fill(0,0,0);
    rect(0,0,50,50);

    fill(255,0,0);
    rect(450,0,50,50);

    fill(255,255,0);
    rect(450,450,50,50);

    fill(0,255,0);
    rect(0,450,50,50);

    fill(255);
    textAlign(CENTER);
    text("Welcome back",250,250);
}