//yes im using p5 while teaching it at the same time
//no i dont want to know how this can be done better


function setup(){
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const navHeight = styles.getPropertyValue("--navbar-height").replace("px","");
    let height = window.innerHeight - navHeight;
    createCanvas(window.innerWidth,height).parent("#canvas-parent");
}

function draw(){

}