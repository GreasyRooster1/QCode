function loadLessons(){
    let lessonsRef = database.ref('lessons');
    lessonsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearLessons();
        console.log(data);
        for(const [lessonId, lessonData] of Object.entries(data)){
            if(lessonData.unlisted){
                continue;
            }
            createLessonElement(lessonId,lessonData);
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
    }else{
        statusDisplay.innerHTML = "not started";
        statusDisplay.classList.add("not-started");
    }

    database.ref("userdata/"+getStoredUser().uid+"/projects/"+lessonId).once("value").then((snapshot)=>{
        if(snapshot.exists()){
            statusDisplay.innerHTML = "started";
            statusDisplay.classList.add("started");
        }
    })
}

function lessonClickHandle(e){
    let linkEl = e.target;
    let uid = getStoredUser().uid;
    let lessonId = linkEl.getAttribute("data-lessonid");
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
        timestamp:Date.now()
    });
    openProjectInEditor(lessonId,getStoredUser().uid,0);
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}
