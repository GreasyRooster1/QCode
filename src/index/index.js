import {loadBadges} from "./badgeDisplay"
import {loadProjects} from "./loading/projects.js"
import {loadUserDataToDisplay} from "./loading/user";
import {loadAnnouncements} from "./loading/announcements";
import {displayVersion} from "./version";
import {initShareBoard} from "./shareBoard";

import "./featuredProject"
import "./newProject"
import "./shareBoard"


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
}



init();