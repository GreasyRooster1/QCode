class Lesson{
    constructor(children){
        this.x = 0;
        this.y = 0;
        this.w = 200;
        this.h = 250;
        this.children = children;
        this.metadata=undefined;
        this.image = null;
    }
    update(){
        this.draw()
    }
    draw(){
        this.drawBody()
        this.drawLines()
        if(this.metadata!==undefined){
            this.drawWithData()
        }
    }
    drawBody(){
        noStroke();
        fill(255)
        stroke(127);
        strokeWeight(1.5)
        rect(this.x,this.y,this.w,this.h,10);
    }
    drawWithData(){
        image(this.image, this.x, this.y, this.w, this.h);
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

    loadMetadata(metadata){
        this.metadata = metadata;
        this.image = loadImage(metadata.image);
    }
}

function loadLessons(next){
    let rootLesson;
    database.ref("lessonChart").once("value").then((snapshot) => {
        for(const [id, data] of Object.entries(snapshot.val())){
            lessonsIndex[id] = new Lesson(data.children);
            if(data.root===true){
                rootLesson = id;
            }
        }
    }).then(()=>{
        next(rootLesson)
    })

}

function loadLessonsMetadata(){
    for(const [id, lesson] of Object.entries(lessonsIndex)){
        database.ref("lessons/"+id).once("value").then((snapshot) => {
            lesson.loadMetadata(snapshot.val());
        });
    }
}

function solvePosition(id){
    let current = lessonsIndex[id];
    let count = 0;
    for (let childId of current.children){
        let child = lessonsIndex[childId];
        if(child===undefined){
            continue;
        }
        if(count===0){
            child.x = current.x;
            child.y = current.y+400;
        }
        solvePosition(childId)
        count++;
    }
}