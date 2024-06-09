const lessonsPane = document.querySelector(".lessons-pane");

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
    let linkWrapper = document.createElement("div");
    let link = document.createElement("span");

    link.setAttribute("data-lessonid",lessonId);
    link.classList.add("lesson-link");
    linkWrapper.classList.add("lesson-link-wrapper");
    if(lessonData.unlisted){
        link.classList.add("unlisted");
    }

    link.innerHTML = lessonData.name;

    linkWrapper.appendChild(link)
    lessonsPane.appendChild(linkWrapper);
}

function clearLessons(){
    lessonsPane.innerHTML = "";
}

loadLessons();