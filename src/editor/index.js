import {loadLesson, loadProjectFromUrlData} from "./load";
import {setupAutoSave} from "./save";
import {setupShareEvents} from "./share";
import {setupScrollEvent} from "./steps";

function init(){
    loadProjectFromUrlData()
    loadLesson()
    setupAutoSave()
    setupShareEvents()
    setupScrollEvent()
}

window.onload = init;