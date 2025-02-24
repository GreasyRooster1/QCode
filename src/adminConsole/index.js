import {setupButtonEvents} from "./buttons";
import {setupBadge} from "./badges";
import {setupLessons} from "./lessons";
import {lockToAdminAuth} from "./lockToAdminAuth";
import {setupUsers} from "./users";
import {loadTheme} from "../api/theme";


function init(){
    loadTheme()
    setupBadge();
    setupButtonEvents()
    setupLessons();
    lockToAdminAuth()
    setupUsers()
}

window.onload = init;