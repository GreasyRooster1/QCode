
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
        for(let proj of projects) {
            projectDataHeap.push(new BulkProject(proj,projectDataHeap.length));
        }
    })
}