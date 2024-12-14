function init(){
    removeNavArrow()
    setupButtons()
}

function setupButtons(){
    document.querySelector(".recenter").addEventListener('click', function(){
        camera.zoom = 1;
        camera.x = 0;
        camera.y = 0;
    })
    document.querySelector(".dark-mode").addEventListener('click', function(){
        swapColors()
    })
}

init();