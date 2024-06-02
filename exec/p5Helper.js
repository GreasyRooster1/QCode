
function startP5() {
    window.setup = setup;
    window.draw = draw;
    new p5();
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

function setup(){
    createCanvas(500,500);

    document.getElementById("defaultCanvas0").style.width = "100vmin";
    document.getElementById("defaultCanvas0").style.height = "100vmin";

}

function draw(){
    fill(frameCount%255)
    rect(0,100,100,100);
    if(window.__userGeneratedDrawFunc!==null) {
        window.__userGeneratedDrawFunc.apply();
    }
    console.log(window.__userGeneratedDrawFunc)
}

function __userGeneratedDrawFunc(){

}

window.__userGeneratedDrawFunc = __userGeneratedDrawFunc;