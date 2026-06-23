import "@style/exec/style.css"

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

const rejectedFunctions = [
    "createCapture",
    "createElement",
    "createP",
    "createSpan",
    "select",
    "createA",
    "createCheckbox",
    "createFileInput",
    "createRadio",
    "createVideo",
    "selectAll",
    "createAudio",
    "createColorPicker",
    "createImg",
    "createSelect",
    "input",
    "createButton",
    "createDiv",
    "createInput",
    "createSlider",
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
    let isWebGl = js.startsWith("// WebGL");
    if (isWebGl) console.log("running in WebGL mode");

    let setup, draw;
    let eventFunctions = [];

    try {
        const wrapped = new Function(`
            ${js}
            return {
                setup: typeof setup === "function" ? setup : undefined,
                draw: typeof draw === "function" ? draw : undefined,
                __events: {
                    ${acceptedFunctions.map(f =>
                        `${f}: typeof ${f} === "function" ? ${f} : undefined`
                    ).join(",\n")}
                }
            };
        `);
        const result = wrapped();
        setup = result.setup;
        draw = result.draw;
        for (let name of acceptedFunctions) {
            if (result.__events[name]) eventFunctions.push(result.__events[name]);
        }
    } catch (e) {
        const stack = (e.stack || "").split("\n");
        console.error(e.message + (stack[0] ? " : " + stack[0] : ""));
        return;
    }

    if (draw === undefined || setup === undefined) {
        console.error("setup and draw must both be defined");
        return;
    }

    startP5(draw,setup,eventFunctions,isWebGl);
}


//helpers


function startP5(drawArg,setupArg,otherFunctions,isWebGL) {
    window.setup = function(){
        createCanvas(500,500, isWebGL?WEBGL:P2D);
        createCanvas = function (){
            console.error("createCanvas is disabled");
        }
        for(let s of rejectedFunctions){

           eval(`
                window['${s}'] = () => {
                    console.error("${s}" + " is disabled");
                }
                `);

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
