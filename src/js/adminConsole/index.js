import "@style/global.css"
import "@style/adminConsole/adminConsole.css"
import "@style/adminConsole/dataLists.css"
import "@style/adminConsole/panes/lessons.css"
import "@style/adminConsole/panes/users.css"
import "@style/adminConsole/panes/badge.css"
import "@style/adminConsole/buttons.css"

import {setupButtonEvents} from "./buttons.js";
import {setupBadge} from "./badges.js";
import {setupLessons} from "./lessons.js";
import {lockToAdminAuth} from "./lockToAdminAuth.js";
import {setupUsers} from "./users.js";
import {loadTheme} from "../api/theme.js";


function init(){
    loadTheme()
    setupBadge();
    setupButtonEvents()
    setupLessons();
    lockToAdminAuth()
    setupUsers()
}

window.onload = init;