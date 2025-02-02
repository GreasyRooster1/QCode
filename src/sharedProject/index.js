import {initNavbar} from "../api/nav/navbar";
import {loadProject, setupFrame} from "./project";
import {initTabs} from "./tabs";
import {initRemix} from "./remix";

function init(){
    initNavbar()
    initTabs();
    setupFrame();
    loadProject();
    initRemix();
}


init();