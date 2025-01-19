import {loadBadges} from "./badgeDisplay"
import {loadProjects} from "./loading/projects.js"
import {loadLessons} from "./loading/lessons"
import {addProfileListener, loadUserData} from "./loading/user";
import {loadAnnouncements} from "./loading/announcements";
import {displayVersion} from "./version";
import {initShareBoard, setupShareBoardFrame, setupsShareBoardFrame} from "./shareBoard";
import {getStoredUser} from "../api/auth";
import {setupFeaturedProject} from "./featuredProject";
import {setupNewProjectEvents} from "./newProject";
import {lockPageToAuth} from "../api/util/lockPageToAuth";
import {initNavbar} from "../api/nav/navbar";
import {ProjectLinkElement} from "../api/customElements";


const badgeDisplay = document.querySelector(".badges-display");
const projectsDisplay = document.querySelector(".projects-display");
const lessonsDisplay = document.querySelector(".lessons-display");
const announcementsDisplay = document.querySelector(".announcements-display");

ProjectLinkElement.register()

function init(){
    lockPageToAuth()

    initNavbar({
        hideCollapse:true,
        hideHome:true,
    })
    setupShareBoardFrame();
    addProfileListener()

    loadBadges();
    loadProjects();
    loadLessons();
    loadAnnouncements();
    loadUserData();

    displayVersion();
    initShareBoard();
    setupFeaturedProject()
    setupNewProjectEvents()
}

window.onload = init;

export{
    badgeDisplay,
    projectsDisplay,
    lessonsDisplay,
    announcementsDisplay,
}