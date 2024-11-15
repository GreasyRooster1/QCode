function init(){
    removeNavArrow();
    initTabs();
    setupFrame();
    loadProject();
    initRemix();
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

init();