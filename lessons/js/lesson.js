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
    }
}

function loadLessons(){
    let root;
    database.ref("lessonChart").once("value").then((snapshot) => {
        for(const [id, data] of Object.entries(snapshot.val())){
            lessonsIndex[id] = new Lesson(data.children);
            if(data.root===true){
                root = id;
            }
        }
    })
    return root;
}

function solvePosition(id,isRoot){
    for (let child in lessonsIndex[id].children){

    }
}