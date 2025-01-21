import {loadLesson, loadProjectFromUrlData} from "./load";
import {setupAutoSave} from "./save";
import {setupShareEvents} from "./share";
import {setupScrollEvent} from "./steps";
import {initNavbar} from "../api/nav/navbar";


function init(){
    initNavbar({
        collapsed:true,
        showCollapse:true,
    })
    loadProjectFromUrlData()
    setupAutoSave()
    setupShareEvents()
    setupScrollEvent()
}

window.onload = init;