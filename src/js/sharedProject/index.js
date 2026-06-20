import '@style/navbar.css'
import '@style/global.css'
import '@style/shareBoard/global.css'
import '@style/sharedProject/index.css'

import {initNavbar} from "../api/nav/navbar.js";
import {loadProject, setupFrame} from "./project.js";
import {initTabs} from "./tabs.js";
import {initRemix} from "./remix.js";
import {loadTheme} from "../api/theme.js";

function init(){
    loadTheme()
    document.body.style.display = "block";
    initNavbar()
    initTabs();
    setupFrame();
    loadProject();
    initRemix();
}


init();