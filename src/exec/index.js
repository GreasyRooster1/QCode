
let parent = null;

const acceptedFunctions = [
    "mousePressed",
    "mouseReleased",
    "mouseClicked",
    "mouseMoved",
    "mouseDragged",
    "doubleClicked",
    "mouseWheel",

    "keyPressed",
    "keyReleased",
    "keyTyped",

    "touchStarted",
    "touchEnded",
]

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
    eval(js);

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


//helpers


function startP5(drawArg,setupArg,otherFunctions) {
    window.setup = function(){
        createCanvas(500,500);
        createCanvas = function (){
            console.error("createCanvas is disabled");
        }
        document.getElementById("defaultCanvas0").style.width = "100vmin";
        document.getElementById("defaultCanvas0").style.height = "100vmin";
        setupArg()
    };

    for(let func of otherFunctions){
        if(acceptedFunctions.includes(func.name)) {
            window[func.name] = func;
        }
    }

    window.draw = drawArg;

    new p5();
}

function __canvasTest(){
    background(0);
    stroke(255);

    for (let i = 0; i < 500; i+=10) {
        let timeRatio = (frameCount % 500-i) / 490;
        let bRat = i/500;

        fill(timeRatio * 255, 0, bRat*255);
        rect(timeRatio * 490, 0, 10, 10);

        fill(0, timeRatio * 255, bRat*255);
        rect(0, timeRatio * 490, 10, 10);
    }

    fill(255);

    ellipse(mouseX,mouseY,10,10);

    textAlign(CENTER);
    text("Welcome back",250,250);
}
