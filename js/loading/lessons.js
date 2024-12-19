let defaultRecommendedLessons = [
    "intro-to-js",
    "bouncing-rainbow-squares"
]

function loadLessons(){
    setupLessonChartLink();

    database.ref("userdata/"+getStoredUser().uid+"/recommendedLessons").once('value').then( (snapshot) => {
        let data;
        if(snapshot.exists()){
            data = snapshot.val();
        }else{
            database.ref("userdata/"+getStoredUser().uid+"/recommendedLessons").set(defaultRecommendedLessons);
            data = defaultRecommendedLessons;
        }
        for(let lessonId of data){
            database.ref("lessons/"+lessonId).once("value").then((snapshot) => {
                createLessonElement(lessonId,snapshot.val())
            })
        }
    });
}

function createLessonElement(lessonId,lessonData){
    let link = document.createElement("div");
    let linkWrapper = document.createElement("div");
    let statusDisplay = document.createElement("div");

    linkWrapper.classList.add("lesson-link-wrapper");

    link.setAttribute("data-lessonid",lessonId);
    link.addEventListener("click",lessonClickHandle);
    link.classList.add("lesson-link");

    setupStatusDisplay(statusDisplay,lessonData.isExternal,lessonId);

    link.innerHTML = lessonData.name;

    linkWrapper.appendChild(link)
    linkWrapper.appendChild(statusDisplay);
    lessonsDisplay.appendChild(linkWrapper);
}

function setupStatusDisplay(statusDisplay,isExternal,lessonId){
    statusDisplay.classList.add("status-display");
    if(isExternal){
        statusDisplay.innerHTML = "external";
        statusDisplay.classList.add("external");
        return;
    }
    statusDisplay.innerHTML = "not started";
    statusDisplay.classList.add("not-started");

    database.ref("userdata/"+getStoredUser().uid+"/lessonStatuses/"+lessonId).once("value").then((snapshot)=>{

        if(snapshot.exists()){
            let data= snapshot.val()
            if(data.started) {
                statusDisplay.innerHTML = "started";
                statusDisplay.classList.add("started");
            }
            if(data.completed){
                statusDisplay.innerHTML = "completed";
                statusDisplay.classList.add("completed");
            }
        }
    })
}

function lessonClickHandle(e){
    let linkEl = e.target;
    let lessonId = linkEl.getAttribute("data-lessonid");
    openLesson(lessonId);
}

function openLesson(lessonId){
    let uid = getStoredUser().uid;
    let ref = "userdata/"+uid+"/projects/";
    let projectId = lessonId
    database.ref(ref+projectId).once("value").then(function (snap) {
        if(snap.exists()){
            openProjectInEditor(projectId,uid,snap.val().currentChapter);
            return;
        }
        database.ref("lessons/"+lessonId).once("value").then(function (snap) {
            let lessonData = snap.val();
            if(lessonData.isExternal){
                startExternalLesson(lessonData);
            }else {
                startInternalLesson(ref,lessonId,lessonData)
            }
        });
    })
}

function startExternalLesson(lessonData){
    window.location.href = lessonData.link;
}

function startInternalLesson(ref,lessonId,lessonData){
    let starterCode = lessonData.starterCode;
    if(starterCode==="default"){
        starterCode = defaultCode;
    }
    database.ref(ref).child(lessonId).set({
        code:starterCode,
        name:lessonData.name,
        lessonId: lessonId,
        currentChapter: 0,
        currentStep:1,
        timestamp:Date.now()/1000
    });
    openProjectInEditor(lessonId,getStoredUser().uid,0);
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}

function setupLessonChartLink(){
    document.querySelector(".lessons-chart-link").addEventListener("click", function(){
        window.location.href = "lessons/lessons.html";
    })
}