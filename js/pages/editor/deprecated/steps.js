let everyStep;
let highestViewedStepCount;
let highestViewedStepEl;

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

//we could add styling to the steps if wanted

scrollableSteps.addEventListener("scroll", (e) => {

    everyStep = document.querySelectorAll('.step');

    highestViewedStepCount = 0;
    everyStep.forEach((el) => {
        if(isScrolledIntoView(scrollableSteps,el)){
            let stepCount = el.getAttribute("count");
            if(stepCount > highestViewedStepCount) {
                highestViewedStepCount = stepCount;
                highestViewedStepEl = el;
            }

            el.classList.add(".focused-step")
        }else{
            el.classList.remove(".focused-step")
        }
    })
});