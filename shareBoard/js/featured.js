let featuredBarProjects = []

class FeaturedProject extends ProjectDisplay{
    constructor(projectData,index) {
        super(projectData,index);
        this.domClass = "featured";
        this.loadCode();
        this.updateClass();
    }
}

function initFeaturedBar(){
    getShareBoardFeaturedProjects(function (projects) {
        let c=0;
        for(let proj of projects) {
            featuredBarProjects.push(new FeaturedProject(proj,c));
            c++;
        }
    })
}

