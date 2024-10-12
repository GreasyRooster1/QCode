let featuredProjects = [];
let currentFeaturedProject = 0;

let heartInteractCount = document.querySelector(".heart-count");
let starInteractCount = document.querySelector(".star-count");


function initShareBoard(){
    getShareBoardFeaturedProjects(function(projects){
        featuredProjects = projects;
        setCurrentFeaturedProject(0);
        console.log(projects)
    });
}

function setCurrentFeaturedProject(index){
    currentFeaturedProject = index;
    console.log(featuredProjects[0])
    //heartInteractCount.innerHTML = featuredProjects[currentFeaturedProject].likedBy.length;
    //starInteractCount.innerHTML = featuredProjects[currentFeaturedProject].staredBy.length;

}