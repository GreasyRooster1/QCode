import '@style/navbar.css'
import '@style/global.css'
import '@style/shareBoard/global.css'
import '@style/shareBoard/index.css'

import {initNavbar} from "../api/nav/navbar.js";
import {initBulk} from "./bulk.js";
import {initFeaturedBar} from "./featured.js";
import {loadTheme} from "../api/theme.js";

let projectDataHeap = [];

function init(){
    loadTheme()
    document.body.style.display = "block";
    initNavbar()
    initFeaturedBar();
    initBulk();
}

window.onload = init;

export {projectDataHeap};