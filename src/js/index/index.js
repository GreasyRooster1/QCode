import "@style/global.css"
import "@style/navbar.css"

import "@style/index/index.css"
import "@style/index/panes/leftBar.css"
import "@style/index/panes/rightBar.css"
import "@style/index/panes/centerPane.css"
import "@style/index/projectPopup.css"

import {loadBadges} from "@js/index/badgeDisplay.js"
import {loadProjects} from "@js/index/loading/projects.js"
import {loadLessons} from "@js/index/loading/lessons.js"
import {loadUserData} from "@js/index/loading/user.js";
import {loadAnnouncements} from "@js/index/loading/announcements.js";
import {displayVersion} from "@js/index/version.js";
import {initShareBoard, setupShareBoardFrame} from "@js/index/shareBoard.js";
import {setupNewProjectEvents} from "@js/index/newProject.js";
import {lockPageToAuth} from "@js/api/util/lockPageToAuth.js";
import {initNavbar} from "@js/api/nav/navbar.js";
import {ProjectLinkElement} from "@js/api/customElements.js";
import {loadTheme} from "@js/api/theme.js";


const badgeDisplay = document.querySelector(".badges-display");
const projectsDisplay = document.querySelector(".projects-display");
const lessonsDisplay = document.querySelector(".lessons-display");
const announcementsDisplay = document.querySelector(".announcements-display");

ProjectLinkElement.register()

function init(){
    document.body.style.display = "block";
    lockPageToAuth()
    loadTheme()

    initNavbar({
        hideHome:true,
    })
    setupShareBoardFrame();
    // addProfileListener()

    loadBadges();
    loadProjects();
    loadLessons();
    loadAnnouncements();
    loadUserData();

    displayVersion();
    initShareBoard();
    // setupFeaturedProject()
    setupNewProjectEvents()

}

window.onload = init;

export{
    badgeDisplay,
    projectsDisplay,
    lessonsDisplay,
    announcementsDisplay,
}