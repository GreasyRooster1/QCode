let currentColors = {}
let colors = {
    light:{
      background:0xffffff
    },
    dark:{
        background:0x000000
    }
}

function swapColors(){
    darkMode = !darkMode;

    if(darkMode) {
        currentColors = colors.dark
    }else{
        currentColors = colors.light
    }
}