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
    let linkWrapper = document.createElement("div");
    let link = document.createElement("span");

    link.setAttribute("data-lessonid",lessonId);
    link.addEventListener("click",lessonClickHandle);
    link.classList.add("lesson-link");

    link.innerHTML = lessonData.name;

    linkWrapper.classList.add("lesson-link-wrapper")

    linkWrapper.appendChild(link)
    lessonsDisplay.appendChild(linkWrapper);
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
            let starterCode = lessonData.starterCode;
            if(starterCode==="default"){
                starterCode = defaultCode;
            }
            database.ref(ref).child(projectId).set({
                code:starterCode,
                name:lessonData.name,
                lessonId: lessonId,
                currentChapter: 0,
            });
            openProjectInEditor(projectId,uid,0);
        });
    })
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}
