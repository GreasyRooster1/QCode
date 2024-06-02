let lessonId=null;
const scrollableSteps = document.querySelector('.scrollable-steps');

function getLesson(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("lessonId")){
        lessonId = searchParams.get("lessonId");
        loadLesson();
    }
}

function loadLesson(){
    database.ref("lessons/"+lessonId).on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        scrollableSteps.innerHTML = "";
        populateSteps(data)
    });
}

function populateSteps(data){
    for (let step of data.steps) {
        let stepEl = document.createElement("editor-step");
        stepEl.setAttribute("head", step.head);
        stepEl.setAttribute("type", step.type);
        stepEl.innerHTML = step.content;
        scrollableSteps.appendChild(stepEl);
    }
}

getLesson();