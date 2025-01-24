//yes im using p5 while teaching it at the same time
//no i dont want to know how this can be    done better
import p5 from 'p5';
import {Camera} from "./camera";
import {loadLessons} from "../index/loading/lessons";
import {setupColors} from "./colors";
import {p5 as currentColors} from "p5/lib/p5";

let darkMode = false;
let camera = new Camera(0,0);
let lessonsIndex = [];
let rootLesson;
let font;
new p5((p)=>{
    p.setup=()=>{
        const root = document.documentElement;
        const styles = getComputedStyle(root);
        const navHeight = styles.getPropertyValue("--navbar-height").replace("px","");
        let height = window.innerHeight - navHeight;
        p.textFont("JetBrains Mono")
        p.createCanvas(window.innerWidth,height).parent("#canvas-parent");
        setupColors();
        loadLessons((r)=>{
            rootLesson = r;
            solvePosition(rootLesson);
            loadLessonsMetadata()
            beginCheckingStatuses();
        });

    }

    p.draw=()=>{
        camera.move();
        camera.apply();
        drawBackground(p);
        drawLessons(p);
    }

    p.mouseWheel= (event) =>{
        const s = 1 - (event.delta / 1000);
        camera.zoom *= s;
        const mouse = createVector(p.mouseX, p.mouseY);
        let offset = createVector(camera.x,camera.y);
        offset.sub(mouse).mult(s).add(mouse);
        camera.x = offset.x;
        camera.y = offset.y;
    }

    p.windowResized=() => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
})

function drawLessons(p){
    for(let [id,lesson] of Object.entries(lessonsIndex)){
        lesson.update();
    }
}

function drawBackground(p){
    let spacing = 30;
    p.background(currentColors.background)
    if(camera.zoom<0.5){
        return;
    }
    let w= width/camera.zoom;
    let h= height/camera.zoom;
    let alpha = p.map(camera.zoom,0.5,0.75,0,255)
    for(let i=0;i<w;i+=spacing){
        for(let j=0;j<h;j+=spacing){
            p.noStroke();
            fill(127,alpha);
            let x = i-p.floor(camera.x/camera.zoom/spacing)*spacing;
            let y = j-p.floor(camera.y/camera.zoom/spacing)*spacing;
            p.ellipse(x,y,3,3);
        }
    }
}


export {darkMode,camera,lessonsIndex,rootLesson,font}