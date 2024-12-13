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
}