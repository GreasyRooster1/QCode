import {darkMode} from "./chart";

let currentColors = {}
let colors;

function loadColors(){
    let style = window.getComputedStyle(document.body);

    currentColors = {
        background: style.getPropertyValue('--canvas-background-color'),
        grid: style.getPropertyValue('--grid-color'),
        textColor: style.getPropertyValue('--canvas-text-color'),
        inverseTextColor: style.getPropertyValue('--canvas-inverse-text-color'),
        lessonCardBorder: style.getPropertyValue('--canvas-lesson-card-border'),
        lessonCardBg: style.getPropertyValue('--canvas-lesson-card-background'),
        startedAccent:style.getPropertyValue('--canvas-started-accent'),
        completedOverlay:style.getPropertyValue('--canvas-completed-overlay'),
        lockedOverlay: style.getPropertyValue('--canvas-locked-overlay'),
        buttonBorder: style.getPropertyValue("--canvas-button-border"),
        lineColor:style.getPropertyValue("--canvas-line-color"),
    }
}

export {loadColors,currentColors}