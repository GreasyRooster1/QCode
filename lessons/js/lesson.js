class Lesson{
    constructor(children){
        this.x = 0;
        this.y = 0;
        this.children = children;
    }
    update(){
        this.draw()
    }
    draw(){
        rect(this.x,this.y,100,100);
        for(let childId of this.children){
            let child = lessonsIndex[childId]
        }
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
            child.y = current.y+200;
        }
        solvePosition(childId)
        count++;
    }
}