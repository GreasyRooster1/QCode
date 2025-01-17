import {loadBadges} from "./badgeDisplay"
import {loadProjects} from "./loading/projects.js"
import {loadUserDataToDisplay} from "./loading/user";
import {loadAnnouncements} from "./loading/announcements";
import {displayVersion} from "./version";
import {initShareBoard, setupsShareBoardFrame} from "./shareBoard";
import {getStoredUser} from "../api/auth";
import {setupFeaturedProject} from "./featuredProject";
import {setupNewProjectEvents} from "./newProject";


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
    loadUserDataToDisplay();
    removeNavHome();
    displayVersion();
    initShareBoard();
    setupFeaturedProject()
    setupNewProjectEvents()
    setupsShareBoardFrame()
}



init();