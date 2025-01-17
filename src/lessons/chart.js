//yes im using p5 while teaching it at the same time
//no i dont want to know how this can be done better

let darkMode = false;
let camera = new Camera(0,0);
let lessonsIndex = [];
let rootLesson;
let font;

function setup(){
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const navHeight = styles.getPropertyValue("--navbar-height").replace("px","");
    let height = window.innerHeight - navHeight;
    textFont("JetBrains Mono")
    createCanvas(window.innerWidth,height).parent("#canvas-parent");
    setupColors();
    loadLessons((r)=>{
        rootLesson = r;
        solvePosition(rootLesson);
        loadLessonsMetadata()
        beginCheckingStatuses();
    });

}

function draw(){
    camera.move();
    camera.apply();
    drawBackground();
    drawLessons();
}

function drawLessons(){
    for(let [id,lesson] of Object.entries(lessonsIndex)){
        lesson.update();
    }
}

function drawBackground(){
    let spacing = 30;
    background(currentColors.background)
    if(camera.zoom<0.5){
        return;
    }
    let w= width/camera.zoom;
    let h= height/camera.zoom;
    let alpha = map(camera.zoom,0.5,0.75,0,255)
    for(let i=0;i<w;i+=spacing){
        for(let j=0;j<h;j+=spacing){
            noStroke();
            fill(127,alpha);
            let x = i-floor(camera.x/camera.zoom/spacing)*spacing;
            let y = j-floor(camera.y/camera.zoom/spacing)*spacing;
            ellipse(x,y,3,3);
        }
    }
}

function mouseWheel(event) {
    const s = 1 - (event.delta / 1000);
    camera.zoom *= s;
    const mouse = createVector(mouseX, mouseY);
    let offset = createVector(camera.x,camera.y);
    offset.sub(mouse).mult(s).add(mouse);
    camera.x = offset.x;
    camera.y = offset.y;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
