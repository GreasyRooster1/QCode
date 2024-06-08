

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
    link.classList.add("lesson-link");

    link.innerHTML = lessonData.name;

    linkWrapper.appendChild(link)
    lessonsDisplay.appendChild(linkWrapper);
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}