let projectId=null;
let userUid = null;
let chapterNum = null;
let isLessonCreator = false;
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
    database.ref("userdata/"+user.uid+"/projects/"+id).once('value').then((snapshot) => {
        const data = snapshot.val();
        writeToEditor(data.code);
        if(data.lessonId!=="none"){
            loadLesson(data.lessonId);
        }else{
            setupPanes(false);
        }
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
        if(!snapshot.exists()){
            currentStepRef.set(0);
            console.log("no current step was set, defaulting to 0")
            return;
        }
        let currentStep = snapshot.val();
        scrollWhenAllImagesAreLoaded(currentStep);
    });
}

function scrollWhenAllImagesAreLoaded(toStep){
    let currentStepEl = scrollableSteps.querySelector('editor-step[count="'+toStep+'"]');
    let imagesToLoad = [...document.images].filter(x => !x.complete);

    if (imagesToLoad.length === 0) {
        scrollableSteps.scrollTop = currentStepEl.offsetTop;
    } else {
        imagesToLoad.forEach(imageToLoad => {
            imageToLoad.onload = imageToLoad.onerror = () => {
                if ([...document.images].every(x => x.complete)) {
                    scrollableSteps.scrollTop = currentStepEl.offsetTop;
                }
            };
        });
    }
}

loadProjectFromUrlData()