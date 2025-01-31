import {projectType, scrollableSteps} from "./load";
import {ref,get} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";

let everyStep;
let highestViewedStepCount;

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
    let currentStepRef = ref(db,"userdata/"+getStoredUser().uid+"/projects/"+projectId+"/currentStep");

    get(currentStepRef).then((snapshot) => {
        let currentStep = 0;
        if(!snapshot.exists()){
            set(currentStepRef,0);
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
//2025: or not

function setupScrollEvent(){
    scrollableSteps.addEventListener("scroll", (e) => {

        everyStep = document.querySelectorAll('.step');

        let high = 0;
        everyStep.forEach((el) => {
            if(isScrolledIntoView(scrollableSteps,el)){
                let stepCount = el.getAttribute("count");
                if(stepCount > high) {
                    high = stepCount;
                }

                el.classList.add(".focused-step")
            }else{
                el.classList.remove(".focused-step")
            }
        })
        projectType.highestViewedStep = high;
    });

}

export {setupScrollEvent,scrollToCurrentStep}