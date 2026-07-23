import '@style/global.css'
import '@style/navbar.css'
import '@style/editProfile/index.css'

import {loadTheme} from "../api/theme.js";
import {lockPageToAuth} from "../api/util/lockPageToAuth.js";
import {initNavbar} from "../api/nav/navbar.js";
import {loadUserData} from "./load.js";

function init() {
    loadTheme()
    document.body.style.display = "block";
    lockPageToAuth()

    initNavbar({
        showCollapse:false
    })

    loadUserData()
}

window.onload=init