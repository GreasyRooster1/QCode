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

function setupColors(){
    colors = {
        light:{
            background:color("#ffffff"),
        },
        dark:{
            background:color("#000000"),
        }
    }
    currentColors = colors.light;
}