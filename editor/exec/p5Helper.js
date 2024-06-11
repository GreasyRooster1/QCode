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

function startP5(drawArg,setupArg,otherFunctions) {
    window.setup = function(){
        createCanvas(500,500);
        document.getElementById("defaultCanvas0").style.width = "100vmin";
        document.getElementById("defaultCanvas0").style.height = "100vmin";
        setupArg()
    };

    for(let func of otherFunctions){
        console.log(func.name);
        if(acceptedFunctions.includes(func.name)) {
            window[func.name] = func;
        }
    }

    window.draw = drawArg;

    new p5();
}

function canvasTest(){
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
