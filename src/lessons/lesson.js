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
        console.log(tags)
        textSize(15);
        textAlign(LEFT)
        noStroke()
        let pos = 0;
        for (let tag of tags){
            let width = textWidth(tag)+10;
            fill(getTagColor(tag))
            rect(this.x+5+pos,this.y+this.h-22,width,17,10)
            fill(255)
            text(tag,this.x+10+pos,this.y+this.h-20,width,17,10)
            pos+=width+5
        }
    }

    checkStatus(){
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+this.id).once("value").then((snapshot)=> {
            let projData = snapshot.val();
            console.log(projData)
            if (snapshot.exists()) {
                this.started = true;
            }else{
                this.statusChecked = true;
                return;
            }
            database.ref("lessons/"+this.id).once("value").then((snap)=> {
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
        stroke(127);

        strokeWeight(2.5)
        rect(this.x,this.y,this.w,this.h,10);
        drawingContext.setLineDash([]);
    }

    renderStatus(){
        if(this.started) {
            stroke("#15e368");
            noFill()
            strokeWeight(3)
            rect(this.x - 2.5, this.y - 2.5, this.w + 5, this.h + 5, 13);
        }
        if(this.completed) {
            stroke("#15e368");
            fill("#15e36877")
            strokeWeight(3)
            rect(this.x - 2.5, this.y - 2.5, this.w + 5, this.h + 5, 13);
        }
    }

    drawStart(){
        fill("#15e368");
        strokeWeight(5)
        stroke("#7fe8a9")
        rect(this.x,this.y+this.h+20,this.w,50,10)
        fill(255);
        textAlign(CENTER)
        textSize(30)
        text(this.started?"Resume":"Start",this.x+this.w/2,this.y+this.h+55)
    }

    checkMouse(){
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
        fill(255)
        stroke(127);

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
        stroke(255)
        rect(this.x+10, this.y+10, 180, 180,10)
    }

    drawTitle(){
        if(this.metadata.name==null) {
            return;
        }

        fill(0);
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
            stroke(0);
            strokeWeight(1.5)
            line(this.x+this.w/2,this.y+this.h,child.x+child.w/2,child.y)
        }
    }

    loadImage(img){
        toDataURL(img,(data)=>{
            this.image = loadImage(data);
        })
    }
}

function loadLessons(next){
    let rootLesson;
    database.ref("lessonChart").once("value").then((snapshot) => {
        for(const [id, data] of Object.entries(snapshot.val())){
            lessonsIndex[id] = new Lesson(data.children);
            lessonsIndex[id].id = id;
            lessonsIndex[id].checkStatus();
            if(data.root===true){
                rootLesson = id;
                lessonsIndex[id].y=height/2-height/3;
                lessonsIndex[id].x=width/2-lessonsIndex[id].w/2;
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
            database.ref("lessons/" + id+"/"+dp).once("value").then((snapshot) => {
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
    let sideYShift = 300;
    let xMargin = 300;
    for (let childId of current.children){
        let child = lessonsIndex[childId];
        if(child===undefined){
            if(count>0) {
                count++;
            }
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
