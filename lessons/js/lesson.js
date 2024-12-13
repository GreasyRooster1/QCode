class Lesson{
    constructor(x,y,parent){
        this.x = x;
        this.y = y;
        this.parent = parent;
    }
    update(){
        this.draw()
    }
    draw(){
        rect(this.x,this.y,100,100);
    }
}

function loadLessons(){

}