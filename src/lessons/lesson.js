import {db} from "../api/firebase";
import {ref,get} from "firebase/database";
import {getStoredUser} from "../api/auth";
import {lessonsIndex, lockImage, rootLesson} from "./chart";
import {toDataURL} from "./index";
import {openLesson} from "../api/util/projects";
import {camera} from "./chart";
import {arduinoRootId} from "./locking";
import {currentColors} from "./colors";

class Lesson{
    constructor(children){
        this.x = 0;
        this.y = 0;
        this.w = 200;
        this.baseHeight = 250;
        this.h = this.baseHeight;
        this.children = children;
        this.image = null;
        this.metadata = [];
        this.isHovering = false;
        this.selected = false;
        this.completed = false;
        this.started = false;
        this.statusChecked = false;
        this.locked = false;
        this.hasLevelBreak = false;
        this.levelBreakNote = "";
    }

    update(){
        this.draw()
    }

    draw(){

        if(!this.metadata.unlisted) {
            this.checkMouse()
            this.drawBody()
            this.drawLines()
            this.drawImage()
            this.drawTags()
            this.drawTitle()
            this.renderStatus()
            this.renderLevelBreak()
        }else{
            this.drawUnlisted();
            this.drawLines()
        }
        if(this.selected){
            this.drawStart()
        }

    }

    drawTags(){
        if(this.metadata.tags===null||this.metadata.tags===undefined){
            return;
        }
        let tags = this.metadata.tags;
        textSize(15);
        textAlign(LEFT)
        noStroke()
        let pos = 0;
        for (let tag of tags){
            let width = textWidth(tag)+10;
            fill(getTagColor(tag))
            rect(this.x+5+pos,this.y+this.h-22,width,17,10)
            fill(currentColors.inverseTextColor)
            text(tag,this.x+10+pos,this.y+this.h-20,width,17,10)
            pos+=width+5
        }
    }

    checkStatus(){
        get(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+this.id)).then((snapshot)=> {
            let projData = snapshot.val();
            if (snapshot.exists()) {
                this.started = true;
            }else{
                this.statusChecked = true;
                return;
            }
            get(ref(db,"lessons/"+this.id)).then((snap)=> {
                let lessonData = snap.val();
                if (projData.currentChapter>=lessonData.chapters.length-1&&projData.currentStep>=lessonData.chapters[lessonData.chapters.length-1].steps.length) {
                    this.completed = true;
                }
            }).then(()=>{
                this.statusChecked = true;
            });
        });
    }

    drawUnlisted(){
        drawingContext.setLineDash([6]);
        noFill()
        stroke(currentColors.lessonCardBorder);

        strokeWeight(2.5)
        rect(this.x,this.y,this.w,this.h,10);
        drawingContext.setLineDash([]);
    }

    renderStatus(){
        if(this.started) {
            stroke(currentColors.startedAccent);
            noFill()
            strokeWeight(3)
            rect(this.x - 2.5, this.y - 2.5, this.w + 5, this.h + 5, 13);
        }
        if(this.completed) {
            stroke(currentColors.startedAccent);
            fill(currentColors.completedOverlay)
            strokeWeight(3)
            rect(this.x - 2.5, this.y - 2.5, this.w + 5, this.h + 5, 13);
        }
        if(this.locked) {
            stroke(currentColors.lessonCardBorder);
            fill(currentColors.lockedOverlay)
            strokeWeight(3)
            rect(this.x - 2.5, this.y - 2.5, this.w + 5, this.h + 5, 13);
            imageMode(CENTER)
            image(lockImage,this.x+100, this.y+100,120,120)
            imageMode(CORNER)
        }
    }

    drawStart(){
        fill(currentColors.startedAccent);
        strokeWeight(5)
        stroke(currentColors.buttonBorder)
        rect(this.x,this.y+this.h+20,this.w,50,10)
        fill(currentColors.textColor);
        textAlign(CENTER)
        textSize(30)
        text(this.started?"Resume":"Start",this.x+this.w/2,this.y+this.h+55)
    }

    checkMouse(){
        if(this.locked){
            return
        }
        if(camera.mouseCollision(this.x,this.y+this.h+20,this.w,50,10)&&this.selected&&mouseIsPressed){
            openLesson(this.id)
        }

        if(camera.mouseCollision(this.x,this.y,this.w,this.h)){
            this.isHovering = true;
            if(mouseIsPressed){
                this.selected = true;
            }
        }else{
            this.isHovering = false;
            if(mouseIsPressed){
                this.selected = false;
            }
        }

    }

    drawBody(){
        fill(currentColors.lessonCardBg)
        stroke(currentColors.lessonCardBorder);

        strokeWeight(this.isHovering||this.selected?2.5:1.5)
        rect(this.x,this.y,this.w,this.h,10);
    }

    drawImage(){
        if(this.image==null) {
            return;
        }
        image(this.image, this.x+10, this.y+10, 180, 180);
        noFill();
        strokeWeight(10);
        stroke(currentColors.lessonCardBg)
        rect(this.x+10, this.y+10, 180, 180,10)
    }

    drawTitle(){
        if(this.metadata.name==null) {
            return;
        }

        fill(currentColors.textColor);
        noStroke();
        textSize(19)
        let lines = floor(textWidth(this.metadata.name)/this.w)
        this.h = this.baseHeight+lines*20;
        textAlign(CENTER)
        text(this.metadata.name, this.x, this.y+200, this.w, 50);
    }

    drawLines(){
        for(let childId of this.children){
            let child = lessonsIndex[childId]
            if(child===undefined){
                continue;
            }
            stroke(currentColors.lineColor);
            strokeWeight(1.5)
            line(this.x+this.w/2,this.y+this.h,child.x+child.w/2,child.y)
        }
    }

    loadImage(img){
        toDataURL(img,(data)=>{
            this.image = loadImage(data);
        })
    }

    renderLevelBreak(){
        if(!this.hasLevelBreak){
            return;
        }
        //mainYshift / 2
        let breakY = this.y+this.h+(400-this.h)/2;

        stroke(currentColors.grid)
        drawingContext.setLineDash([20]);
        line(this.x-300,breakY,this.x+this.w+300,breakY);
        drawingContext.setLineDash([]);
        fill(currentColors.textColor)
        textAlign(LEFT)
        noStroke()
        textSize(30)
        textStyle(BOLD)
        text(this.levelBreakNote,this.x-300,breakY-5)
        textStyle(NORMAL)
    }
}

function loadLessons(next){
    let rootLesson;
    get(ref(db,"lessonChart")).then((snapshot) => {
        for(const [id, data] of Object.entries(snapshot.val())){
            lessonsIndex[id] = new Lesson(data.children);
            lessonsIndex[id].id = id;
            lessonsIndex[id].checkStatus();
            if(data.root===true){
                rootLesson = id;
                lessonsIndex[id].y=height/2-height/3;
                lessonsIndex[id].x=width/2-lessonsIndex[id].w/2;
            }
            if(data.levelBreak!==undefined){
                lessonsIndex[id].hasLevelBreak = true;
                lessonsIndex[id].levelBreakNote = data.levelBreak;
            }

        }
    }).then(()=>{
        next(rootLesson)
    })

}

function loadLessonsMetadata(){
    let dataPoints = ["thumb","name","unlisted","tags"]
    for(const [id, lesson] of Object.entries(lessonsIndex)){
        for(let dp of dataPoints) {
            get(ref(db,"lessons/" + id+"/"+dp)).then((snapshot) => {
                lesson.metadata[dp] = snapshot.val();
                if(dp==="thumb"){
                    if(!snapshot.exists()){
                        lesson.loadImage("https://raw.githubusercontent.com/GreasyRooster1/QCodeStatic/refs/heads/main/Global/404.png");
                        return;
                    }
                    lesson.loadImage(snapshot.val())
                }
            });
        }
    }
}


function solvePosition(id){

    let current = lessonsIndex[id];
    let count = 0;
    let mainYShift = 400;
    let sideYShift = 400;
    let xMargin = 300;

    if(id===rootLesson){
        mainYShift = 500;
        sideYShift = 500;
        xMargin = 900;
    }

    for (let childId of current.children){
        let child = lessonsIndex[childId];
        if(child===undefined){
            count++
            continue;
        }
        if(count===0){
            child.x = current.x;
            child.y = current.y+mainYShift;
        }else{
            child.y = current.y+sideYShift;
            let amt = Math.ceil(count/2);
            if((count+1)%2===0){
                child.x = current.x+xMargin*amt;
            }else{
                child.x = current.x-xMargin*amt;
            }
        }
        solvePosition(childId)
        count++;
    }
}

function propagateLocked(id){
    lessonsIndex[id].locked = true;
    if(!lessonsIndex[id].locked){
        return
    }
    for (let childId of lessonsIndex[id].children) {
        if(childId==="none"){
            continue
        }
        propagateLocked(childId)
    }
}

function getTagColor(tag){
    let tagColors = {
        "game":"#f42cc2",
        "art":"#2399cc",
        "simulation":"#23cc3f",
        "exercise":"#cca523",
        "hard":"#cc234a"
    }
    let id = tag.toLowerCase();
    let col = tagColors[id]
    return col??"#676767"
}
export {solvePosition,loadLessons,loadLessonsMetadata,getTagColor,Lesson,propagateLocked}
