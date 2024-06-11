let everyStep;

function isScrolledIntoView(parent,el) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    let parentRect = parent.getBoundingClientRect();
    let parentTop = parentRect.top;
    let parentBottom = parentRect.bottom;

    // Only completely visible elements return true:
    return (elemTop >= parentTop) && (elemBottom <= parentBottom);
}

scrollableSteps.addEventListener("scroll", (e) => {

    everyStep = document.querySelectorAll('.step');

    everyStep.forEach((el) => {
        if(isScrolledIntoView(scrollableSteps,el)){
            el.style.border = "5px solid pink";
        }else{
            el.style.border = "";
        }
    })
});