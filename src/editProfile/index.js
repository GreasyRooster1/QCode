import {loadTheme} from "../api/theme";
import {lockPageToAuth} from "../api/util/lockPageToAuth";
import {initNavbar} from "../api/nav/navbar";

function init() {
    loadTheme()
    lockPageToAuth()

    initNavbar({
        showCollapse:false
    })
}

window.onload=init