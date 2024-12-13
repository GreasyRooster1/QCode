class Lesson{
    constructor(x,y,children){
        this.x = x;
        this.y = y;
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

}