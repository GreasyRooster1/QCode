import {darkMode} from "./chart";

let currentColors = {}
let colors;

function loadColors(){
    let style = window.getComputedStyle(document.body);

    currentColors = {
        background: color(style.getPropertyValue('--canvas-background-color')),
        grid: color(style.getPropertyValue('--grid-color')),
        textColor: color(style.getPropertyValue('--canvas-text-color')),
        inverseTextColor: color(style.getPropertyValue('--canvas-inverse-text-color')),
        lessonCardBorder: color(style.getPropertyValue('--canvas-lesson-card-border')),
        lessonCardBg: color(style.getPropertyValue('--canvas-lesson-card-background')),
        startedAccent:color(style.getPropertyValue('--canvas-started-accent')),
        completedOverlay:color(style.getPropertyValue('--canvas-completed-overlay')),
        lockedOverlay: color(style.getPropertyValue('--canvas-locked-overlay')),
        buttonBorder: color(style.getPropertyValue("--canvas-button-border")),
        lineColor:color(style.getPropertyValue("--canvas-line-color")),
    }
    console.log(currentColors);
}

export {loadColors,currentColors}