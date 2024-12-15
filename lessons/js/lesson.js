class Lesson{
    constructor(children){
        this.x = 0;
        this.y = 0;
        this.w = 200;
        this.h = 260;
        this.children = children;
        this.image = null;
        this.metadata = [];
    }
    update(){
        this.draw()
    }
    draw(){
        this.drawBody()
        this.drawLines()
        this.drawImage()
        this.drawTitle()
    }
    drawBody(){
        noStroke();
        fill(255)
        stroke(127);
        strokeWeight(1.5)
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
        textAlign(CENTER)
        text(this.metadata.name, this.x, this.y+200, this.w, 50);
    }
    drawLines(){
        for(let childId of this.children){
            let child = lessonsIndex[childId]
            if(child===undefined){
                continue;
            }
            stroke(127);
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
            if(data.root===true){
                rootLesson = id;
                lessonsIndex[id].y=-height/3;
                lessonsIndex[id].x=-lessonsIndex[id].w/2;
            }
        }
    }).then(()=>{
        next(rootLesson)
    })

}

function loadLessonsMetadata(){
    let dataPoints = ["thumb","name"]
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