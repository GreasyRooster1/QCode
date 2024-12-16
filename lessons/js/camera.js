class Camera{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.zoom = 1;
    }

    apply(){
        translate(this.x,this.y);
        scale(this.zoom)
    }

    move(){
        if(mouseIsPressed){
            this.x+=(mouseX-pmouseX);
            this.y+=(mouseY-pmouseY);
        }
    }
}