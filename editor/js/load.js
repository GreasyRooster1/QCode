let projectId=null;
let userUid = null;
let chapterNum = null;
let isLessonCreator = false;
let hasLesson = true;
const scrollableSteps = document.querySelector('.scrollable-steps');

function loadProjectFromUrlData(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("uid")){
        userUid = searchParams.get("uid");
    }
    if(searchParams.has("projectId")){
        projectId = searchParams.get("projectId");
        if(projectId==="$$lesson$$creator$$"){
            isLessonCreator = true;
            setupLessonCreator();
            return;
        }
    }

    if(searchParams.has("cNum")){
        chapterNum = parseInt(searchParams.get("cNum"));
    }

    if(userUid===getStoredUser().uid){
        loadProjectCode(projectId);
    }
}

function loadProjectCode(id){
    user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+id+"/code").once('value').then((snapshot) => {
        const data = snapshot.val();
        writeToEditor(data);
        database.ref("userdata/"+user.uid+"/projects/"+id+"/lessonId").once('value').then((snapshot) => {
            let lessonId = snapshot.val();
            if (lessonId !== "none") {
                loadLesson(lessonId);
            } else {
                hasLesson = false;
                setupPanes(false);
            }
        });
    });
}

function loadLesson(projectId){
    database.ref("lessons/"+projectId).once('value').then((snapshot) => {
        const data = snapshot.val();
        if(data.chapters[chapterNum]!==null) {
            scrollableSteps.innerHTML = "";
            populateSteps(data)
            scrollToCurrentStep(projectId)
        }else{
            console.log("invalid lesson!");
            setupPanes(false);
        }
    });
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

loadProjectFromUrlData()