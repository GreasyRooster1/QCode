//yes im using p5 while teaching it at the same time
//no i dont want to know how this can be done better

let darkMode = false;
let camera = new Camera(0,0);

function setup(){
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const navHeight = styles.getPropertyValue("--navbar-height").replace("px","");
    let height = window.innerHeight - navHeight;
    createCanvas(window.innerWidth,height).parent("#canvas-parent");
}

function draw(){
    camera.apply();
    drawBackground();
}

function drawBackground(){
    let spacing = 30;
    for(let i=0;i<width;i+=spacing){
        for(let j=0;j<height;j+=spacing){
            noStroke();
            fill(127);
            ellipse(i,j,3,3);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}