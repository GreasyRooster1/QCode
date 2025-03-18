import {loadProjectFromUrlData} from "./load";
import {setupAutoSave} from "./save";
import {setupShareEvents} from "./share";
import {setupClosePopupEvent, setupScrollEvent} from "./steps";
import {initNavbar} from "../api/nav/navbar";
import {StepElement} from "../api/customElements";
import {ConsoleLogElement} from "../api/customElements";
import {loadTheme} from "../api/theme";

StepElement.register();
ConsoleLogElement.register();

function init(){
    loadTheme()
    initNavbar({
        collapsed:true,
        showCollapse:true,
    })
    loadProjectFromUrlData()
    setupAutoSave()
    setupShareEvents()
    setupScrollEvent()
    setupClosePopupEvent()
}

window.onload = init;