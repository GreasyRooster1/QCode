let featuredProjects = [];
let currentFeaturedProject = 0;

let heartInteractCount = document.querySelector(".heart-count");
let starInteractCount = document.querySelector(".star-count");

let heartInteractIcon = document.querySelector(".heart-icon>i");
let starInteractIcon = document.querySelector(".star-icon>i");

const shareBoardFrame = document.querySelector('#share-board-exec-frame');

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
        reloadCurrentFeaturedProject()
    })

    starInteractIcon.addEventListener("click", () => {
        if(featuredProjects[currentFeaturedProject].isStared()){
            featuredProjects[currentFeaturedProject].removeStar();
        }else{
            featuredProjects[currentFeaturedProject].star();
        }
        reloadCurrentFeaturedProject()
    })
}

function setCurrentFeaturedProject(index){
    currentFeaturedProject = index;
    if(featuredProjects[currentFeaturedProject].code===null){
        featuredProjects[currentFeaturedProject].loadProjectCode(function(){
            reloadCurrentFeaturedProject();
        });
    }else{
        reloadCurrentFeaturedProject();
    }

}

function reloadCurrentFeaturedProject(){
    heartInteractCount.innerHTML = featuredProjects[currentFeaturedProject].likeCount();
    starInteractCount.innerHTML = featuredProjects[currentFeaturedProject].starCount();

    checkHeartInteractFilled()
    checkStarInteractFilled()

    runShareBoardCode();
}

function checkHeartInteractFilled(){
    let currentProject = featuredProjects[currentFeaturedProject];
    heartInteractIcon.classList.remove("far");
    heartInteractIcon.classList.remove("fas");
    if(currentProject.isLiked()){
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

function runShareBoardCode(){
    if (shareBoardFrame.contentWindow === null) {
        return;
    }

    shareBoardFrame.contentWindow.postMessage(featuredProjects[currentFeaturedProject].code);
}