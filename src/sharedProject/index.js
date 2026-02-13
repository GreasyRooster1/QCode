import {initNavbar} from "../api/nav/navbar";
import {loadProject, setupFrame} from "./project";
import {initTabs} from "./tabs";
import {checkRemixBlock, initRemix} from "./remix";
import {loadTheme} from "../api/theme";

function init(){
    loadTheme()
    initNavbar()
    initTabs();
    setupFrame();
    loadProject();
    initRemix();
    checkRemixBlock();r
}


init();