import {initNavbar} from "../api/nav/navbar";
import {initBulk} from "./bulk";
import {initFeaturedBar} from "./featured";
import {loadTheme} from "../api/theme";

let projectDataHeap = [];

function init(){
    loadTheme()
    initNavbar()
    initFeaturedBar();
    initBulk();
}

window.onload = init;

export {projectDataHeap};