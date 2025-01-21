import {initNavbar} from "../api/nav/navbar";

let projectDataHeap = [];

function init(){
    initNavbar()
    initFeaturedBar();
    initBulk();
}

window.onload = init;

export {projectDataHeap};