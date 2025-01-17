
class BulkProject extends ProjectDisplay{
    constructor(projectData,index) {
        super(projectData,index);
        this.domClass = "bulk";
        this.parent = ".bulk-projects-bar";
        this.updateClass();
        this.addPlayOverlay()
        this.addOverlayEvents()
        this.appendToDom();
    }

    addPlayOverlay(){
        this.playIconWrapper = document.createElement("div");
        this.playIcon = document.createElement("span");

        this.playIcon.innerHTML = "<i class='fas fa-play'></i>";

        this.playIconWrapper.classList.add("play-icon-wrapper");
        this.playIcon.classList.add("play-icon");

        this.playIconWrapper.appendChild(this.playIcon);

        this.overlayWrapper.insertBefore(this.playIconWrapper, this.overlayWrapper.lastElementChild);
    }

    addOverlayEvents(){
        this.playIcon.addEventListener("click" ,()=>{
            this.overlayWrapper.style.background = "none";
            this.overlayWrapper.style.pointerEvents = "none";
            this.playIconWrapper.remove();
            this.loadCode();
        })
    }
}

function initBulk() {
    getShareBoardProjects(function (projects) {
        for(let proj of projects) {
            console.log(proj.name)
            console.log(proj.shareDate)
            projectDataHeap.push(new BulkProject(proj,projectDataHeap.length));
        }
    })
}