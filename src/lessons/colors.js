import {darkMode} from "./chart";

let currentColors = {}
let colors;

function loadColors(){
    let style = window.getComputedStyle(document.body);

    currentColors = {
        background: style.getPropertyValue('--canvas-background-color'),
        grid: style.getPropertyValue('--grid-color'),
        textColor: style.getPropertyValue('--canvas-text-color'),
        lessonCardBorder: style.getPropertyValue('--canvas-lesson-card-border'),
        startedAccent:style.getPropertyValue('--canvas-started-accent'),
        completedOverlay:style.getPropertyValue('--canvas-completed-overlay'),
    }
}

export {loadColors,currentColors}