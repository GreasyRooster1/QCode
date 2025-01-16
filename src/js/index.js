const badgeDisplay = document.querySelector(".badges-display");
const projectsDisplay = document.querySelector(".projects-display");
const lessonsDisplay = document.querySelector(".lessons-display");
const announcementsDisplay = document.querySelector(".announcements-display");
let user = getStoredUser();

function init(){
    loadBadges();
    loadProjects();
    loadLessons();
    loadAnnouncements();
    removeNavHome();
    displayVersion();
    initShareBoard();
}



init();