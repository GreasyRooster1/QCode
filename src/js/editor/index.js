import "@style/global.css"
import "@style/navbar.css"

import "@style/editor/editor.css"
import '@style/editor/lang.css'
import '@style/editor/panes.css'
import '@style/editor/panes/stepPane.css'
import '@style/editor/panes/codePane.css'
import '@style/editor/panes/outputPane.css'
import '@style/editor/lessonCreator.css'
import '@style/editor/share.css'
import '@style/editor/panes/lang/web.css'
import '@style/editor/panes/lang/arduino.css'
import '@style/editor/panes/lang/scratch.css'
import '@style/editor/panes/lang/python.css'

import {loadProjectFromUrlData} from "./load.js";
import {setupAutoSave} from "./save.js";
import {setupShareEvents} from "./share.js";
import {setupClosePopupEvent, setupScrollEvent} from "./steps.js";
import {initNavbar} from "../api/nav/navbar.js";
import {StepElement} from "../api/customElements.js";
import {ConsoleLogElement} from "../api/customElements.js";
import {loadTheme} from "../api/theme.js";
import {getAuthSessionToken} from "./utils/fileServerAPI.ts";
import {lockPageToAuth} from "@js/api/util/lockPageToAuth.js";

StepElement.register();
ConsoleLogElement.register();

function init(){
    document.body.style.display = "block";
    lockPageToAuth()
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
    getAuthSessionToken()
}

window.onload = init;