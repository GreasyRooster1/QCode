function init(){
    removeNavArrow();
    changeTab("info")
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

init();