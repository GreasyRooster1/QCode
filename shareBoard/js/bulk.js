
class BulkProject extends ProjectDisplay{
    constructor(projectData,index) {
        super(projectData,index);
        this.domClass = "bulk";
        this.loadCode();
        this.updateClass();
    }
}

new BulkProject();