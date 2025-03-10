import {getStoredUser} from "../auth";

function lockPageToAuth() {
    if (getStoredUser() === null) {
        console.log(window.location.href);
        if (window.location.href.includes("index.html") || window.location.href.endsWith("/")) {
            window.location.replace("login.html?retUrl=" + btoa(window.location.href));
        } else {
            window.location.href = "login.html?retUrl=" + btoa(window.location.href);
        }
    } else {
        console.log("authorized!");
    }
}

export {lockPageToAuth};