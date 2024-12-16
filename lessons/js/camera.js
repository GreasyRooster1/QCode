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
            cursor(MOVE)
        }else{
            cursor(ARROW)
        }
    }
    collision(r1x,r1y,r1w,r1h,r2x,r2y,r2w,r2h){
        r1x+=this.x*this.zoom;
        r1y+=this.y*this.zoom;
        r1w*=this.zoom;
        r1h*=this.zoom;

        r2x+=this.x*this.zoom;
        r2y+=this.y*this.zoom;
        r2w*=this.zoom;
        r2h*=this.zoom;

        if (r1x + r1w >= r2x &&     // r1 right edge past r2 left
            r1x <= r2x + r2w &&       // r1 left edge past r2 right
            r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
            r1y <= r2y + r2h) {       // r1 bottom edge past r2 top
            return true;
        }
        return false;
    }
    mouseCollision(r1x,r1y,r1w,r1h){

        r1x*=this.zoom;
        r1y*=this.zoom;
        r1x+=this.x;
        r1y+=this.y;
        r1w*=this.zoom;
        r1h*=this.zoom;

        let r2x=mouseX;
        let r2y=mouseY;
        let r2w=1;
        let r2h=1;


        if (r1x + r1w >= r2x &&     // r1 right edge past r2 left
            r1x <= r2x + r2w &&       // r1 left edge past r2 right
            r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
            r1y <= r2y + r2h) {       // r1 bottom edge past r2 top
            return true;
        }
        return false;
    }
}