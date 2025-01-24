import {setupButtonEvents} from "./buttons";
import {setupBadge} from "./badges";


function init(){
    setupBadge();
    setupButtonEvents()
}

window.onload = init;