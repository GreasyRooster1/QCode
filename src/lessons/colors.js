import {darkMode} from "./chart";

let currentColors = {}
let colors;

function swapColors(){
    darkMode = !darkMode;

    if(darkMode) {
        currentColors = colors.dark
    }else{
        currentColors = colors.light
    }
}

function setupColors(p){
    colors = {
        light:{
            background:p.color("#ffffff"),
        },
        dark:{
            background:p.color("#000000"),
        }
    }
    currentColors = colors.light;
}
export {setupColors,swapColors}