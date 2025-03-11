import {darkMode} from "./chart";

let currentColors = {}
let colors;

function loadColors(){
    let style = window.getComputedStyle(element);

    currentColors = {
        background: style.getPropertyValue('--canvas-background-color'),
        grid: style.getPropertyValue('--grid-color'),

    }
}

export {loadColors,currentColors}