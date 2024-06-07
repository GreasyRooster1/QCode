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
    let el = document.createElement("div");
    el.setAttribute("data-lessonid",lessonId);
    el.addEventListener("click",lessonClickHandle);
    database.ref("lessons/"+lessonId).once("value").then(function (snap) {
        let data = snap.val();
        el.innerHTML = data.name;
    })
    lessonsDisplay.appendChild(el);
}

function lessonClickHandle(e){
    let link = e.target;
    let uid = getStoredUser().uid;
    let lessonId = link.getAttribute("data-lessonid");
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