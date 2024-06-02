
function startP5(draw,setup) {
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
