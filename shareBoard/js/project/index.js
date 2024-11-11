function init(){
    removeNavArrow();
    initTabs();
    setupFrame();
    loadProject();
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

init();