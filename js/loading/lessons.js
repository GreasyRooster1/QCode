function loadLessons(){
    let lessonsRef = database.ref('lessons');
    lessonsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearLessons();
        console.log(data);
        for(const [lessonId, lessonData] of Object.entries(data)){
            createLessonElement(lessonId,lessonData);
        }
    });
}

function createLessonElement(lessonId,lessonData){
    //check if lesson exists or not
    database.ref("lessons/"+lessonId).once("value").then(function (snap) {
        let data = snap.val();
        if(data.unlisted){
            return;
        }
        let el = document.createElement("div");
        el.setAttribute("data-lessonid",lessonId);
        el.classList.add("lesson-link");
        el.addEventListener("click",lessonClickHandle);
        lessonsDisplay.appendChild(el);
        el.innerHTML = data.name;
    });
}

function lessonClickHandle(e){
    let linkEl = e.target;
    let uid = getStoredUser().uid;
    let lessonId = linkEl.getAttribute("data-lessonid");
    let ref = "userdata/"+uid+"/projects/";
    let projectId = lessonId
    database.ref(ref+projectId).once("value").then(function (snap) {
        if(snap.exists()){
            window.location.href = "editor/editor.html?projectId="+projectId+"&uid="+uid;
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
            });
            window.location.href = "editor/editor.html?projectId="+projectId+"&uid="+getStoredUser().uid;
        });
    })
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}