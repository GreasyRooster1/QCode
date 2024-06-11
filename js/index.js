const badgeDisplay = document.querySelector(".badges-display");
const projectsDisplay = document.querySelector(".projects-display");
const lessonsDisplay = document.querySelector(".lessons-display");
let user = getStoredUser();

function init(){
    loadBadges();
    loadProjects();
    loadLessons();
    removeNavHome();
    displayVersion()
}

function removeNavHome(){
    let home = document.querySelector(".home-link");
    home.remove();
}

init();