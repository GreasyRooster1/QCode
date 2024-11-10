function init(){
    removeNavArrow();
    initTabs();
    loadProject();
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

init();