
class BulkProject extends ProjectDisplay{
    constructor(projectData,index) {
        super(projectData,index);
        this.domClass = "bulk";
        this.parent = ".bulk-projects-bar";
        this.loadCode();
        this.updateClass();
        this.appendToDom()
    }
}

function initBulk() {
    getShareBoardProjects(function (projects) {
        let c=0;
        for(let proj of projects) {
            projectDataHeap.push(new BulkProject(proj,c+projectDataHeap.length));
            c++;
        }
    })
}