import {loadTheme} from "../api/theme";
import {lockPageToAuth} from "../api/util/lockPageToAuth";
import {initNavbar} from "../api/nav/navbar";

function init() {
    lockPageToAuth()

    initNavbar({
        showCollapse:false
    })

    loadUserData()
}

window.onload=init