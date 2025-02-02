import {initNavbar} from "../api/nav/navbar";
import {initBulk} from "./bulk";
import {initFeaturedBar} from "./featured";

let projectDataHeap = [];

function init(){
    initNavbar()
    initFeaturedBar();
    initBulk();
}

window.onload = init;

export {projectDataHeap};