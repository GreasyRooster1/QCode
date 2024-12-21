let everyStep;
/**
 * @type {string | number | null}
 */
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

function scrollToCurrentStep(projectId){
    let currentStepRef = database.ref("userdata/"+getStoredUser().uid+"/projects/"+projectId+"/currentStep");

    currentStepRef.once('value').then((snapshot) => {
        let currentStep;
        if(!snapshot.exists()){
            currentStepRef.set(0);
            currentStep = 0;
            console.log("no current step was set, defaulting to 0")
            return;
        }else{
            currentStep = snapshot.val();
        }
        scrollWhenAllImagesAreLoaded(currentStep,currentStepRef);
    });
}

function scrollWhenAllImagesAreLoaded(toStep,ref){
    let currentStepEl = scrollableSteps.querySelector('editor-step[count="'+toStep+'"]');
    let imagesToLoad = [...document.images].filter(x => !x.complete);

    if (imagesToLoad.length === 0) {
        scrollableSteps.scrollTop = currentStepEl.offsetTop;
    } else {
        imagesToLoad.forEach(imageToLoad => {
            imageToLoad.onload = imageToLoad.onerror = () => {
                if ([...document.images].every(x => x.complete)) {
                    if(currentStepEl===null){
                        ref.set(0);
                    }else {
                        scrollableSteps.scrollTop = currentStepEl.offsetTop;
                    }
                }
            };
        });
    }
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