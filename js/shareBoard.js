let featuredProjects = [];
let currentFeaturedProject = 0;

let heartInteractCount = document.querySelector(".heart-count");
let starInteractCount = document.querySelector(".star-count");

let heartInteractIcon = document.querySelector(".heart-icon>i");
let starInteractIcon = document.querySelector(".star-icon>i");


function initShareBoard(){
    getShareBoardFeaturedProjects(function(projects){
        featuredProjects = projects;
        setCurrentFeaturedProject(0);
    });
    setupInteractionEvents();
}

function setupInteractionEvents(){
    heartInteractIcon.addEventListener("click", () => {
        if(featuredProjects[currentFeaturedProject].isLiked()){
            featuredProjects[currentFeaturedProject].removeLike();
        }else{
            featuredProjects[currentFeaturedProject].like();
        }
        checkHeartInteractFilled()
    })

    starInteractIcon.addEventListener("click", () => {
        if(featuredProjects[currentFeaturedProject].isStared()){
            featuredProjects[currentFeaturedProject].removeStar();
        }else{
            featuredProjects[currentFeaturedProject].star();
        }
        checkStarInteractFilled()
    })
}

function setCurrentFeaturedProject(index){
    currentFeaturedProject = index;

    heartInteractCount.innerHTML = featuredProjects[currentFeaturedProject].likeCount();
    starInteractCount.innerHTML = featuredProjects[currentFeaturedProject].starCount();

    checkHeartInteractFilled()
    checkStarInteractFilled()
}

function checkHeartInteractFilled(){
    let currentProject = featuredProjects[currentFeaturedProject];
    heartInteractIcon.classList.remove("far");
    heartInteractIcon.classList.remove("fas");
    if(currentProject.isLiked()){
        console.log("asd");
        heartInteractIcon.classList.add("fas");
    }else{
        heartInteractIcon.classList.add("far");
    }
}

function checkStarInteractFilled(){
    let currentProject = featuredProjects[currentFeaturedProject];
    starInteractIcon.classList.remove("far");
    starInteractIcon.classList.remove("fas");
    if(currentProject.isStared()){
        starInteractIcon.classList.add("fas");
    }else{
        starInteractIcon.classList.add("far");
    }
}