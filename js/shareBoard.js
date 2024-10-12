let featuredProjects = [];
let currentFeaturedProject = 0;

let heartInteractCount = document.querySelector(".heart-count");
let starInteractCount = document.querySelector(".star-count");


function initShareBoard(){
    getShareBoardFeaturedProjects(function(projects){
        featuredProjects = projects;
        setCurrentFeaturedProject(0);
    });
}

function setCurrentFeaturedProject(index){
    currentFeaturedProject = index;
    console.log(featuredProjects[currentFeaturedProject])
    heartInteractCount.innerHTML = Object.keys(featuredProjects[currentFeaturedProject].likedBy).length;
    starInteractCount.innerHTML = Object.keys(featuredProjects[currentFeaturedProject].staredBy).length;

}