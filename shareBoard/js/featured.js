let featuredBarProjects = []

class FeaturedProject{
    constructor(projectData){
        this.project = projectData;
        this.createDomElement();
        this.appendToFeaturedBar();
        this.setupDOMEvents();
    }

    createDomElement(){
        this.domElement = document.createElement("div");

        this.iframe = document.createElement("iframe");
        this.overlayWrapper = document.createElement("div");

        this.interactTrayWrapper = document.createElement("div");
        this.interactTray = document.createElement("span");

        this.heartWrapper = document.createElement("span");
        this.heartIcon = document.createElement("span");
        this.heartCount = document.createElement("span");
        this.heartWrapper.appendChild(this.heartIcon);
        this.heartWrapper.appendChild(this.heartCount);

        this.starWrapper = document.createElement("span");
        this.starIcon = document.createElement("span");
        this.starCount = document.createElement("span");
        this.starWrapper.appendChild(this.starIcon);
        this.starWrapper.appendChild(this.starCount);

        this.interactTray.appendChild(this.heartWrapper);
        this.interactTray.appendChild(this.starWrapper);

        this.interactTrayWrapper.appendChild(this.interactTray);
        this.overlayWrapper.appendChild(this.interactTrayWrapper);

        this.domElement.appendChild(this.iframe);
        this.domElement.appendChild(this.overlayWrapper);


        this.domElement.classList.add("featured-project-display")

        this.iframe.src = "../editor/exec/exec.html";

        this.interactTray.classList.add("interact-tray");
        this.heartWrapper.classList.add("hearts-wrapper");
        this.heartCount.classList.add("heart-count");
        this.heartCount.classList.add("interaction-count");
        this.heartIcon.classList.add("heart-icon");

        this.starWrapper.classList.add("star-wrapper");
        this.starCount.classList.add("star-count");
        this.starCount.classList.add("interaction-count");
        this.starIcon.classList.add("star-icon");

        this.interactTrayWrapper.classList.add("interact-tray-wrapper");

        this.overlayWrapper.classList.add("overlay-wrapper");

        this.heartIcon.innerHTML = "<i class='far fa-heart'></i>";
        this.starIcon.innerHTML = "<i class='far fa-star'></i>";

        this.heartCount.innerHTML = "0";
        this.starCount.innerHTML = "0";
    }

    setupDOMEvents(){
        this.heartIcon.addEventListener("click", function(){
            if(this.project.isLiked()){
                this.project.removeLike();
            }else{
                this.project.like();
            }
        })
        console.log("asd")
        this.starIcon.addEventListener("click", function(){
            console.log(this.project)
            if(this.project.isStared()){
                this.project.removeStar();
            }else{
                this.project.star();
            }
        })
    }

    appendToFeaturedBar(){
        document.querySelector(".featured-project-bar").appendChild(this.domElement);
    }
}

function initFeaturedBar(){
    getShareBoardFeaturedProjects(function (projects) {
        for(let proj of projects) {
            featuredBarProjects.push(new FeaturedProject(proj));
        }
    })
}

