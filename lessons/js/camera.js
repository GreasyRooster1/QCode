class Camera{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.zoom = 1;
    }

    apply(){
        translate(this.x+width/2,this.y+height/2);
        scale(this.zoom)
    }

    move(){
        if(mouseIsPressed){
            this.x+=(mouseX-pmouseX);
            this.y+=(mouseY-pmouseY);
        }
    }
}