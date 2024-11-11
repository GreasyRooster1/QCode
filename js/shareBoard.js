let featuredProjects = null;
let currentFeaturedProject = 0;

let heartInteractCount = document.querySelector(".heart-count");
let starInteractCount = document.querySelector(".star-count");

let heartInteractIcon = document.querySelector(".heart-icon>i");
let starInteractIcon = document.querySelector(".star-icon>i");

let leftArrow = document.querySelector(".slide-arrow.left");
let rightArrow = document.querySelector(".slide-arrow.right");

let moreButton = document.querySelector(".more-button");

const shareBoardFrame = document.querySelector('#share-board-exec-frame');
let iWindow = null;

function initShareBoard(){
    getShareBoardFeaturedProjects(function(projects){
        featuredProjects = projects;
        featuredProjects[currentFeaturedProject].loadProjectCode(function(){
            reloadCurrentFeaturedProject();
            runShareBoardCode()
        });

    });
    setupInteractionEvents();
    setupArrowEvents();
    setupMoreRedirect();
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

function setupArrowEvents(){
    leftArrow.addEventListener("click", () => {
        let next = currentFeaturedProject-1;
        if(next<0){
            next = featuredProjects.length-1;
        }
        changeCurrentFeaturedProject(next);
    });
    rightArrow.addEventListener("click", () => {
        let next = currentFeaturedProject+1;
        if(next>=featuredProjects.length){
            next = 0;
        }
        changeCurrentFeaturedProject(next);
    });
}

function setupMoreRedirect(){
    moreButton.addEventListener("click", () => {
        window.location.href = "./shareBoard/board.html";
    })
}

function changeCurrentFeaturedProject(index){
    currentFeaturedProject = index;
    resetShareBoardFrame()
    if(featuredProjects[currentFeaturedProject].code===null){
        featuredProjects[currentFeaturedProject].loadProjectCode(function(){
            reloadCurrentFeaturedProject();
        });
    }else{
        reloadCurrentFeaturedProject();
    }
    runShareBoardCode();

}

function reloadCurrentFeaturedProject(){
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
function resetShareBoardFrame(){
    iWindow = null;
    shareBoardFrame.contentWindow.location.reload();
}
shareBoardFrame.addEventListener("load", () => {
    iWindow = shareBoardFrame.contentWindow;
    console.log(iWindow);
    runShareBoardCode();
});
function runShareBoardCode(){
    if (iWindow === null||featuredProjects===null) {
        return;
    }

    iWindow.postMessage(featuredProjects[currentFeaturedProject].code);
}

shareBoardFrame.contentWindow.addEventListener("click", () => {
    window.location.href = "./shareBoard/board.html";
})