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
}

function setCurrentFeaturedProject(index){
    currentFeaturedProject = index;

    heartInteractCount.innerHTML = Object.keys(featuredProjects[currentFeaturedProject].likedBy).length;
    starInteractCount.innerHTML = Object.keys(featuredProjects[currentFeaturedProject].staredBy).length;

    checkHeartInteractFilled()
    checkStarInteractFilled()
}

function checkHeartInteractFilled(){
    let currentProject = featuredProjects[currentFeaturedProject];
    heartInteractIcon.classList.remove("far");
    heartInteractIcon.classList.remove("fas");
    if(currentProject.likedBy.hasOwnProperty(getStoredUser().uid)){
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
    if(currentProject.staredBy.hasOwnProperty(getStoredUser().uid)){
        console.log("asd");

        starInteractIcon.classList.add("fas");
    }else{
        starInteractIcon.classList.add("far");
    }
}