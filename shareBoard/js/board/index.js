let projectDataHeap = [];

function init(){
    initFeaturedBar();
    initBulk();
    removeNavArrow();
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

init();